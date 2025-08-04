import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Brain, 
  Home, 
  Moon, 
  BookOpen,
  CheckCircle,
  Sparkles
} from "lucide-react";

interface WellnessData {
  mood: number;
  stress: number;
  homesickness: number;
  sleep: number;
  academicStress: number;
  notes: string;
}

export const WellnessCheckin = () => {
  const [checkinData, setCheckinData] = useState<WellnessData>({
    mood: 5,
    stress: 5,
    homesickness: 5,
    sleep: 5,
    academicStress: 5,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const submitCheckin = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Submit wellness check-in
      const { error: checkinError } = await supabase
        .from('wellness_checkins')
        .insert({
          user_id: user.id,
          mood_rating: checkinData.mood,
          stress_level: checkinData.stress,
          homesickness_level: checkinData.homesickness,
          sleep_quality: checkinData.sleep,
          academic_stress: checkinData.academicStress,
          notes: checkinData.notes
        });

      if (checkinError) throw checkinError;

      // Log engagement for risk assessment
      await supabase
        .from('user_engagement_logs')
        .insert({
          user_id: user.id,
          action_type: 'checkin_complete',
          feature_used: 'wellness_checkin'
        });

      setIsCompleted(true);
      toast({
        title: "Check-in Complete! 🌟",
        description: "Thank you for sharing. You've earned 25 XP!",
      });

      // TODO: Trigger risk assessment calculation
      setTimeout(() => {
        setIsCompleted(false);
        setCheckinData({
          mood: 5,
          stress: 5,
          homesickness: 5,
          sleep: 5,
          academicStress: 5,
          notes: ''
        });
      }, 3000);

    } catch (error: any) {
      console.error('Error submitting check-in:', error);
      toast({
        title: "Error",
        description: "Failed to submit check-in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSliderColor = (value: number, isInverted = false) => {
    if (isInverted) {
      if (value >= 8) return "text-green-600";
      if (value >= 6) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (value <= 3) return "text-green-600";
      if (value <= 6) return "text-yellow-600";
      return "text-red-600";
    }
  };

  const getEmoji = (value: number, type: string) => {
    if (type === 'mood') {
      if (value >= 8) return "😊";
      if (value >= 6) return "😐";
      if (value >= 4) return "😕";
      return "😢";
    }
    if (type === 'stress' || type === 'academic') {
      if (value <= 3) return "😌";
      if (value <= 6) return "😐";
      return "😰";
    }
    if (type === 'homesickness') {
      if (value <= 3) return "🏠";
      if (value <= 6) return "😊";
      return "💙";
    }
    if (type === 'sleep') {
      if (value >= 8) return "😴";
      if (value >= 6) return "😊";
      return "😵";
    }
    return "😊";
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Check-in Complete!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for taking care of your wellbeing. Your response helps us support you better.
          </p>
          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-sm">
              <Sparkles className="w-4 h-4 inline mr-2" />
              You've earned 25 XP for completing your wellness check-in!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Wellness Check-in
        </CardTitle>
        <CardDescription>
          Take a moment to reflect on how you're feeling. This helps us provide better support.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Mood */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500" />
            <label className="text-sm font-medium">
              Overall Mood {getEmoji(checkinData.mood, 'mood')}
            </label>
            <span className={`text-lg font-bold ${getSliderColor(checkinData.mood, true)}`}>
              {checkinData.mood}/10
            </span>
          </div>
          <Slider
            value={[checkinData.mood]}
            onValueChange={(value) => setCheckinData(prev => ({ ...prev, mood: value[0] }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Very Low</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Stress Level */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-purple-500" />
            <label className="text-sm font-medium">
              Stress Level {getEmoji(checkinData.stress, 'stress')}
            </label>
            <span className={`text-lg font-bold ${getSliderColor(checkinData.stress)}`}>
              {checkinData.stress}/10
            </span>
          </div>
          <Slider
            value={[checkinData.stress]}
            onValueChange={(value) => setCheckinData(prev => ({ ...prev, stress: value[0] }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Very Relaxed</span>
            <span>Very Stressed</span>
          </div>
        </div>

        {/* Homesickness */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Home className="w-5 h-5 text-blue-500" />
            <label className="text-sm font-medium">
              Homesickness {getEmoji(checkinData.homesickness, 'homesickness')}
            </label>
            <span className={`text-lg font-bold ${getSliderColor(checkinData.homesickness)}`}>
              {checkinData.homesickness}/10
            </span>
          </div>
          <Slider
            value={[checkinData.homesickness]}
            onValueChange={(value) => setCheckinData(prev => ({ ...prev, homesickness: value[0] }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Not at all</span>
            <span>Very homesick</span>
          </div>
        </div>

        {/* Sleep Quality */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-indigo-500" />
            <label className="text-sm font-medium">
              Sleep Quality {getEmoji(checkinData.sleep, 'sleep')}
            </label>
            <span className={`text-lg font-bold ${getSliderColor(checkinData.sleep, true)}`}>
              {checkinData.sleep}/10
            </span>
          </div>
          <Slider
            value={[checkinData.sleep]}
            onValueChange={(value) => setCheckinData(prev => ({ ...prev, sleep: value[0] }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Very Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Academic Stress */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-green-500" />
            <label className="text-sm font-medium">
              Academic Stress {getEmoji(checkinData.academicStress, 'academic')}
            </label>
            <span className={`text-lg font-bold ${getSliderColor(checkinData.academicStress)}`}>
              {checkinData.academicStress}/10
            </span>
          </div>
          <Slider
            value={[checkinData.academicStress]}
            onValueChange={(value) => setCheckinData(prev => ({ ...prev, academicStress: value[0] }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Very Relaxed</span>
            <span>Very Stressed</span>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-4">
          <label className="text-sm font-medium">
            Anything else you'd like to share? (Optional)
          </label>
          <Textarea
            value={checkinData.notes}
            onChange={(e) => setCheckinData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Share what's on your mind, any challenges you're facing, or positive moments from your day..."
            rows={3}
          />
        </div>

        <Button 
          onClick={submitCheckin}
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Complete Check-in"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your responses are confidential and help us provide personalized support. 
          You can skip this anytime.
        </p>
      </CardContent>
    </Card>
  );
};