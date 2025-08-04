import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Gift, 
  Coffee, 
  Medal, 
  Zap,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Heart,
  Award
} from "lucide-react";

interface UserStats {
  totalXP: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  badges: Badge[];
  streaks: Streak[];
  achievements: Achievement[];
  recentActivity: Activity[];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: Date;
  category: 'social' | 'academic' | 'wellness' | 'exploration' | 'career';
}

interface Streak {
  id: string;
  name: string;
  current: number;
  best: number;
  type: 'daily_checkin' | 'weekly_events' | 'peer_connections' | 'adventures';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  xpReward: number;
  isCompleted: boolean;
  category: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  xpEarned: number;
  timestamp: Date;
}

const Rewards = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadUserStats();
  }, [user]);

  const loadUserStats = async () => {
    if (!user) return;

    // In production, this would fetch from the database
    // For now, using sample data
    const sampleStats: UserStats = {
      totalXP: 1250,
      level: 8,
      currentLevelXP: 250,
      nextLevelXP: 500,
      badges: [
        {
          id: 'first-connection',
          name: 'Social Pioneer',
          description: 'Made your first peer connection',
          icon: 'users',
          rarity: 'common',
          earnedAt: new Date('2024-08-01'),
          category: 'social'
        },
        {
          id: 'event-attender',
          name: 'Event Explorer',
          description: 'Attended 5 campus events',
          icon: 'calendar',
          rarity: 'rare',
          earnedAt: new Date('2024-08-02'),
          category: 'social'
        },
        {
          id: 'career-ready',
          name: 'Career Ready',
          description: 'Completed career preparation adventure',
          icon: 'briefcase',
          rarity: 'epic',
          earnedAt: new Date('2024-08-03'),
          category: 'career'
        }
      ],
      streaks: [
        {
          id: 'daily-checkin',
          name: 'Daily Check-in',
          current: 7,
          best: 12,
          type: 'daily_checkin'
        },
        {
          id: 'weekly-events',
          name: 'Weekly Events',
          current: 3,
          best: 5,
          type: 'weekly_events'
        }
      ],
      achievements: [
        {
          id: 'social-butterfly',
          title: 'Social Butterfly',
          description: 'Connect with 10 different peers',
          progress: 6,
          total: 10,
          xpReward: 200,
          isCompleted: false,
          category: 'social'
        },
        {
          id: 'adventure-seeker',
          title: 'Adventure Seeker',
          description: 'Complete 5 adventures',
          progress: 2,
          total: 5,
          xpReward: 300,
          isCompleted: false,
          category: 'exploration'
        },
        {
          id: 'wellness-warrior',
          title: 'Wellness Warrior',
          description: 'Complete wellness check-ins for 30 days',
          progress: 14,
          total: 30,
          xpReward: 250,
          isCompleted: false,
          category: 'wellness'
        }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'adventure_completed',
          description: 'Completed "Your First Peer Connection" adventure',
          xpEarned: 100,
          timestamp: new Date('2024-08-04T10:30:00')
        },
        {
          id: '2',
          type: 'event_attended',
          description: 'Attended Coffee Chat with International Students',
          xpEarned: 50,
          timestamp: new Date('2024-08-03T14:00:00')
        },
        {
          id: '3',
          type: 'daily_checkin',
          description: 'Completed daily wellness check-in',
          xpEarned: 25,
          timestamp: new Date('2024-08-04T09:00:00')
        }
      ]
    };

    setUserStats(sampleStats);
    setLoading(false);
  };

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-300';
      case 'rare': return 'text-blue-600 border-blue-300';
      case 'epic': return 'text-purple-600 border-purple-300';
      case 'legendary': return 'text-yellow-600 border-yellow-300';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  const getCategoryIcon = (category: Badge['category']) => {
    switch (category) {
      case 'social': return Users;
      case 'academic': return Target;
      case 'wellness': return Heart;
      case 'exploration': return Star;
      case 'career': return Trophy;
      default: return Award;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your achievements...</p>
        </div>
      </div>
    );
  }

  if (!userStats) return null;

  const levelProgress = (userStats.currentLevelXP / userStats.nextLevelXP) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Rewards & Progress</h1>
              <p className="text-muted-foreground">
                Track your achievements, earn badges, and celebrate your growth
              </p>
            </div>
          </div>

          {/* Level Progress */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Level {userStats.level}</h3>
                  <p className="text-muted-foreground">
                    {userStats.currentLevelXP} / {userStats.nextLevelXP} XP to next level
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{userStats.totalXP}</p>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                </div>
              </div>
              <Progress value={levelProgress} className="h-3" />
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Medal className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.badges.length}</p>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.streaks[0]?.current || 0}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">
                  {userStats.achievements.filter(a => a.isCompleted).length}
                </p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{userStats.level}</p>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="streaks">Streaks</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="badges" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userStats.badges.map((badge) => {
                const IconComponent = getCategoryIcon(badge.category);
                
                return (
                  <Card key={badge.id} className={`border-2 ${getRarityColor(badge.rarity)}`}>
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{badge.name}</CardTitle>
                      <CardDescription>{badge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={getRarityColor(badge.rarity)}>
                          {badge.rarity}
                        </Badge>
                        {badge.earnedAt && (
                          <p className="text-sm text-muted-foreground">
                            {badge.earnedAt.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="space-y-4">
              {userStats.achievements.map((achievement) => (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{achievement.title}</h3>
                        <p className="text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">
                          {achievement.xpReward} XP
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {achievement.progress} / {achievement.total}
                        </p>
                      </div>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.total) * 100} 
                      className="mb-2"
                    />
                    {achievement.isCompleted && (
                      <Badge className="bg-green-500">Completed</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="streaks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userStats.streaks.map((streak) => (
                <Card key={streak.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      {streak.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-orange-500">
                          {streak.current} days
                        </p>
                        <p className="text-sm text-muted-foreground">Current streak</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{streak.best}</p>
                        <p className="text-sm text-muted-foreground">Best streak</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-4">
              {userStats.recentActivity.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +{activity.xpEarned} XP
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Rewards;