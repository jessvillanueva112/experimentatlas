import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { SecureTextarea } from "@/components/ui/secure-textarea";
import { 
  MapPin, 
  Users, 
  Briefcase, 
  Heart, 
  Coffee, 
  Star,
  Trophy,
  Play,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface Adventure {
  id: string;
  title: string;
  description: string;
  category: 'social' | 'career' | 'wellness' | 'academic' | 'exploration';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: AdventureStep[];
  rewards: {
    xp: number;
    badges: string[];
    unlocks?: string[];
  };
  progress?: number;
  isCompleted?: boolean;
  isUnlocked?: boolean;
}

interface AdventureStep {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'reflection' | 'choice' | 'interaction';
  isCompleted?: boolean;
  data?: any;
}

const Adventures = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [activeAdventure, setActiveAdventure] = useState<Adventure | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userProgress, setUserProgress] = useState<Record<string, any>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadAdventures();
    loadUserProgress();
  }, [user]);

  const loadAdventures = () => {
    // Sample adventures - in production, these would come from the database
    const sampleAdventures: Adventure[] = [
      {
        id: 'first-friend',
        title: 'Your First Peer Connection',
        description: 'Break the ice and make your first meaningful connection on campus',
        category: 'social',
        difficulty: 'beginner',
        estimatedTime: '15-20 minutes',
        steps: [
          {
            id: 'profile-prep',
            title: 'Prepare Your Profile',
            description: 'Add your interests, skills, and what you\'re looking for in a connection',
            type: 'action'
          },
          {
            id: 'explore-matches',
            title: 'Explore Potential Matches',
            description: 'Browse through peer profiles and find someone with common interests',
            type: 'interaction'
          },
          {
            id: 'practice-message',
            title: 'Practice Your First Message',
            description: 'Use our AI assistant to craft the perfect icebreaker message',
            type: 'action'
          },
          {
            id: 'send-request',
            title: 'Send Connection Request',
            description: 'Take the leap and send your first connection request',
            type: 'action'
          },
          {
            id: 'reflect',
            title: 'Reflect on the Experience',
            description: 'Share how it felt and what you learned from this experience',
            type: 'reflection'
          }
        ],
        rewards: {
          xp: 100,
          badges: ['Social Pioneer', 'First Connection'],
          unlocks: ['Group Chat Adventure', 'Event RSVP Adventure']
        },
        isUnlocked: true
      },
      {
        id: 'career-kickstart',
        title: 'Career Kick-Start',
        description: 'Set up your professional profile and explore career opportunities',
        category: 'career',
        difficulty: 'intermediate',
        estimatedTime: '30-45 minutes',
        steps: [
          {
            id: 'upload-resume',
            title: 'Upload Your Resume',
            description: 'Add your current resume and get AI-powered feedback',
            type: 'action'
          },
          {
            id: 'explore-jobs',
            title: 'Explore Job Opportunities',
            description: 'Browse through campus jobs and internship opportunities',
            type: 'interaction'
          },
          {
            id: 'mock-interview',
            title: 'Practice Interview Skills',
            description: 'Schedule a mock interview session with a peer mentor',
            type: 'action'
          }
        ],
        rewards: {
          xp: 150,
          badges: ['Career Explorer', 'Professional Ready'],
          unlocks: ['Networking Adventure']
        },
        isUnlocked: false
      },
      {
        id: 'city-explorer',
        title: 'City Explorer',
        description: 'Discover your new city and find your favorite local spots',
        category: 'exploration',
        difficulty: 'beginner',
        estimatedTime: '2-3 hours',
        steps: [
          {
            id: 'transit-pass',
            title: 'Get Your Transit Pass',
            description: 'Learn how to get and use public transportation',
            type: 'action'
          },
          {
            id: 'local-event',
            title: 'Attend a Local Event',
            description: 'RSVP for a community event or local gathering',
            type: 'action'
          },
          {
            id: 'hidden-gem',
            title: 'Find a Hidden Gem',
            description: 'Discover a special place recommended by other students',
            type: 'interaction'
          }
        ],
        rewards: {
          xp: 120,
          badges: ['City Navigator', 'Local Explorer'],
          unlocks: ['Cultural Bridge Adventure']
        },
        isUnlocked: true
      }
    ];

    setAdventures(sampleAdventures);
  };

  const loadUserProgress = async () => {
    if (!user) return;

    // In production, load actual user progress from database
    setUserProgress({
      completedAdventures: [],
      currentAdventures: [],
      totalXP: 0,
      badges: []
    });
  };

  const startAdventure = (adventure: Adventure) => {
    setActiveAdventure(adventure);
    setCurrentStep(0);
  };

  const completeStep = async (stepId: string) => {
    if (!activeAdventure) return;

    const updatedSteps = activeAdventure.steps.map(step =>
      step.id === stepId ? { ...step, isCompleted: true } : step
    );

    setActiveAdventure({
      ...activeAdventure,
      steps: updatedSteps
    });

    // Move to next step
    if (currentStep < activeAdventure.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Adventure completed
      completeAdventure();
    }

    toast({
      title: "Step Completed!",
      description: "Great progress! Keep going.",
    });
  };

  const completeAdventure = async () => {
    if (!activeAdventure || !user) return;

    // In production, save completion to database and award XP/badges
    toast({
      title: "Adventure Completed! 🎉",
      description: `You earned ${activeAdventure.rewards.xp} XP and unlocked new adventures!`,
    });

    setActiveAdventure(null);
    setCurrentStep(0);
  };

  const getCategoryIcon = (category: Adventure['category']) => {
    switch (category) {
      case 'social': return Users;
      case 'career': return Briefcase;
      case 'wellness': return Heart;
      case 'exploration': return MapPin;
      default: return Star;
    }
  };

  const getDifficultyColor = (difficulty: Adventure['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (activeAdventure) {
    const currentStepData = activeAdventure.steps[currentStep];
    const progress = ((currentStep + 1) / activeAdventure.steps.length) * 100;

    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setActiveAdventure(null)}
              className="mb-4"
            >
              ← Back to Adventures
            </Button>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                {React.createElement(getCategoryIcon(activeAdventure.category), {
                  className: "w-6 h-6 text-primary"
                })}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{activeAdventure.title}</h1>
                <p className="text-muted-foreground">{activeAdventure.description}</p>
              </div>
            </div>
            <Progress value={progress} className="mb-6" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-primary">Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
                {currentStepData.title}
              </CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStepData.type === 'action' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Complete this action to move to the next step:
                  </p>
                  <Button onClick={() => completeStep(currentStepData.id)}>
                    Complete Step
                  </Button>
                </div>
              )}

              {currentStepData.type === 'reflection' && (
                <div className="space-y-4">
                  <SecureTextarea
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                    placeholder="Share your thoughts and reflections..."
                    maxLength={1000}
                    sanitize={true}
                  />
                  <Button onClick={() => completeStep(currentStepData.id)}>
                    Share Reflection
                  </Button>
                </div>
              )}

              {currentStepData.type === 'interaction' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Interact with the platform to complete this step:
                  </p>
                  <Button onClick={() => completeStep(currentStepData.id)}>
                    Continue
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                >
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  {currentStep + 1} of {activeAdventure.steps.length} steps
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-accent rounded-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Adventures</h1>
              <p className="text-muted-foreground">
                Embark on guided journeys to build connections, develop skills, and explore opportunities
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userProgress.totalXP || 0}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userProgress.completedAdventures?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userProgress.badges?.length || 0}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventures.map((adventure) => {
            const IconComponent = getCategoryIcon(adventure.category);
            
            return (
              <Card key={adventure.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <Badge 
                          variant="secondary" 
                          className={`${getDifficultyColor(adventure.difficulty)} text-white`}
                        >
                          {adventure.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {adventure.estimatedTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{adventure.title}</CardTitle>
                  <CardDescription>{adventure.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Coffee className="w-4 h-4" />
                      {adventure.steps.length} steps
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Rewards:</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{adventure.rewards.xp} XP</Badge>
                        {adventure.rewards.badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => startAdventure(adventure)}
                      disabled={!adventure.isUnlocked}
                    >
                      {adventure.isUnlocked ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Adventure
                        </>
                      ) : (
                        'Locked'
                      )}
                    </Button>
                  </div>
                </CardContent>
                {adventure.isCompleted && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Adventures;