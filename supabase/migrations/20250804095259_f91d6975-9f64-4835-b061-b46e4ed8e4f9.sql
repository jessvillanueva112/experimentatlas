-- Wellness tracking system
CREATE TABLE public.wellness_checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood_rating INTEGER NOT NULL CHECK (mood_rating >= 1 AND mood_rating <= 10),
  stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
  homesickness_level INTEGER NOT NULL CHECK (homesickness_level >= 1 AND homesickness_level <= 10),
  sleep_quality INTEGER NOT NULL CHECK (sleep_quality >= 1 AND sleep_quality <= 10),
  academic_stress INTEGER NOT NULL CHECK (academic_stress >= 1 AND academic_stress <= 10),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Risk scoring system
CREATE TABLE public.risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wellness_score DECIMAL(3,2) NOT NULL, -- 40% weight (0.00-1.00)
  engagement_score DECIMAL(3,2) NOT NULL, -- 35% weight (0.00-1.00)
  academic_score DECIMAL(3,2) NOT NULL, -- 25% weight (0.00-1.00)
  overall_risk_level TEXT NOT NULL CHECK (overall_risk_level IN ('low', 'mild', 'moderate', 'severe')),
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Peer ambassador interventions
CREATE TABLE public.peer_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ambassador_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  trigger_reason TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  introduction_approach TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'responded', 'resolved', 'escalated')),
  intervention_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Engagement tracking for risk assessment
CREATE TABLE public.user_engagement_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- login, adventure_start, adventure_complete, event_rsvp, checkin_complete, etc.
  feature_used TEXT, -- dashboard, adventures, events, community, etc.
  session_duration INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wellness_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peer_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_engagement_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wellness_checkins
CREATE POLICY "Users can view their own wellness check-ins" 
ON public.wellness_checkins 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wellness check-ins" 
ON public.wellness_checkins 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wellness check-ins" 
ON public.wellness_checkins 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for risk_assessments
CREATE POLICY "Users can view their own risk assessments" 
ON public.risk_assessments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create risk assessments" 
ON public.risk_assessments 
FOR INSERT 
WITH CHECK (true);

-- RLS Policies for peer_interventions
CREATE POLICY "Users can view interventions they're part of" 
ON public.peer_interventions 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() = ambassador_id);

CREATE POLICY "System can create peer interventions" 
ON public.peer_interventions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Ambassadors can update interventions they're assigned to" 
ON public.peer_interventions 
FOR UPDATE 
USING (auth.uid() = ambassador_id);

-- RLS Policies for user_engagement_logs
CREATE POLICY "Users can view their own engagement logs" 
ON public.user_engagement_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can track user engagement" 
ON public.user_engagement_logs 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE TRIGGER update_peer_interventions_updated_at
  BEFORE UPDATE ON public.peer_interventions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_wellness_checkins_user_created 
ON public.wellness_checkins(user_id, created_at DESC);

CREATE INDEX idx_risk_assessments_user_calculated 
ON public.risk_assessments(user_id, calculated_at DESC);

CREATE INDEX idx_peer_interventions_status 
ON public.peer_interventions(status, created_at DESC);

CREATE INDEX idx_user_engagement_logs_user_action 
ON public.user_engagement_logs(user_id, action_type, created_at DESC);