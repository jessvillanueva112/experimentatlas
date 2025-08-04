import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

// Rate limiting storage
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation functions
function validateUserId(userId: string): boolean {
  if (!userId || typeof userId !== 'string') return false;
  // UUID validation pattern
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(userId);
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize rate limit
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  userLimit.count++;
  return true;
}

interface RiskFactors {
  // Wellness metrics (40% weight)
  moodTrend: number; // -1 to 1 (declining to improving)
  stressLevel: number; // 1-10
  homesickness: number; // 1-10
  sleepQuality: number; // 1-10 (inverted for risk)
  
  // Engagement metrics (35% weight) 
  loginFrequency: number; // logins per week
  featureUsage: number; // actions per session
  checkinCompletion: number; // % of prompted check-ins completed
  
  // Academic metrics (25% weight)
  academicStress: number; // 1-10
  deadlineAnxiety: number; // 1-10
  gradeWorries: number; // 1-10
}

type RiskLevel = 'low' | 'mild' | 'moderate' | 'severe';

function calculateRiskScore(factors: RiskFactors): { level: RiskLevel, scores: any } {
  // Wellness score (lower is higher risk)
  const wellnessScore = (
    (10 - factors.moodTrend * 5) * 0.3 +
    factors.stressLevel * 0.3 +
    factors.homesickness * 0.2 + 
    (10 - factors.sleepQuality) * 0.2
  ) / 10;

  // Engagement score (lower is higher risk)
  const engagementScore = (
    (5 - Math.min(factors.loginFrequency, 5)) * 0.4 +
    (3 - Math.min(factors.featureUsage, 3)) * 0.3 +
    (1 - factors.checkinCompletion) * 0.3
  );

  // Academic score  
  const academicScore = (
    factors.academicStress * 0.4 +
    factors.deadlineAnxiety * 0.3 +
    factors.gradeWorries * 0.3
  ) / 10;

  const overallScore = 
    wellnessScore * 0.4 + 
    engagementScore * 0.35 + 
    academicScore * 0.25;

  let level: RiskLevel;
  if (overallScore >= 0.8) level = 'severe';
  else if (overallScore >= 0.6) level = 'moderate';  
  else if (overallScore >= 0.4) level = 'mild';
  else level = 'low';

  return { 
    level, 
    scores: { 
      wellness: wellnessScore, 
      engagement: engagementScore, 
      academic: academicScore, 
      overall: overallScore 
    }
  };
}

async function calculateUserRisk(supabase: any, userId: string) {
  // Get recent wellness data
  const { data: wellnessData } = await supabase
    .from('wellness_checkins')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(7); // Last 7 check-ins

  // Get engagement data
  const { data: engagementData } = await supabase
    .from('user_engagement_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false });

  if (!wellnessData || wellnessData.length === 0) {
    return null; // Can't assess without data
  }

  // Calculate wellness trends
  const latestWellness = wellnessData[0];
  const avgMood = wellnessData.reduce((sum, w) => sum + w.mood_rating, 0) / wellnessData.length;
  const moodTrend = wellnessData.length > 1 ? 
    (latestWellness.mood_rating - wellnessData[wellnessData.length - 1].mood_rating) / 5 : 0;

  // Calculate engagement metrics
  const loginDays = new Set(engagementData?.filter(e => e.action_type === 'login')
    .map(e => new Date(e.created_at).toDateString())).size || 0;
  
  const avgSessionActions = engagementData?.length ? 
    engagementData.filter(e => e.action_type !== 'login').length / loginDays || 1 : 1;

  const checkinCount = engagementData?.filter(e => e.action_type === 'checkin_complete').length || 0;
  const checkinCompletion = Math.min(checkinCount / 2, 1); // Expect 2 per week

  const riskFactors: RiskFactors = {
    moodTrend,
    stressLevel: latestWellness.stress_level,
    homesickness: latestWellness.homesickness_level,
    sleepQuality: latestWellness.sleep_quality,
    loginFrequency: loginDays,
    featureUsage: avgSessionActions,
    checkinCompletion,
    academicStress: latestWellness.academic_stress,
    deadlineAnxiety: latestWellness.academic_stress, // Using academic stress as proxy
    gradeWorries: latestWellness.academic_stress // Using academic stress as proxy
  };

  return calculateRiskScore(riskFactors);
}

async function logRiskAssessment(supabase: any, userId: string, riskLevel: RiskLevel) {
  if (riskLevel === 'low') return;

  // For severe risk cases, log for professional referral (hash user ID for privacy)
  if (riskLevel === 'severe') {
    const hashedUserId = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(userId + 'risk_salt_2024')
    );
    const hashedHex = Array.from(new Uint8Array(hashedUserId))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    
    console.log(`Severe risk detected for user hash ${hashedHex.substring(0, 8)} - professional referral recommended`);
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client identifier for rate limiting
  const clientIP = req.headers.get('cf-connecting-ip') || 
                   req.headers.get('x-forwarded-for') || 
                   'unknown';
  
  // Check rate limit
  if (!checkRateLimit(clientIP)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
      { 
        status: 429, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all users who have wellness data
    const { data: users } = await supabaseClient
      .from('wellness_checkins')
      .select('user_id')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    const uniqueUsers = [...new Set(users?.map(u => u.user_id) || [])];
    
    // Limit batch size for security
    if (uniqueUsers.length > 100) {
      uniqueUsers.splice(100);
    }
    
    const results = [];

    for (const userId of uniqueUsers) {
      try {
        const riskAssessment = await calculateUserRisk(supabaseClient, userId);
        
        if (riskAssessment) {
          // Save risk assessment
          const { error } = await supabaseClient
            .from('risk_assessments')
            .insert({
              user_id: userId,
              wellness_score: riskAssessment.scores.wellness,
              engagement_score: riskAssessment.scores.engagement,
              academic_score: riskAssessment.scores.academic,
              overall_risk_level: riskAssessment.level
            });

          if (!error) {
            // Log risk assessment for monitoring
            await logRiskAssessment(supabaseClient, userId, riskAssessment.level);
          }

          results.push({
            userId,
            riskLevel: riskAssessment.level,
            scores: riskAssessment.scores
          });
        }
      } catch (userError) {
        console.error(`Error processing user ${userId}:`, userError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        processedUsers: results.length,
        results: results.slice(0, 5) // Return first 5 for debugging
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in calculate-risk-scores function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});