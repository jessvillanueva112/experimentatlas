import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Heart,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Calendar,
  BookOpen,
  Users,
  Sparkles
} from "lucide-react";

interface CheckInNotification {
  id: number;
  type: 'wellness' | 'academic' | 'social' | 'transition';
  title: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
  triggerReason: string;
  actionLabel: string;
  dismissible: boolean;
}

export function ProactiveNotifications() {
  const [notifications, setNotifications] = useState<CheckInNotification[]>([
    {
      id: 1,
      type: 'wellness',
      title: 'Weekly Wellness Check-in',
      message: "It's been a week since your last check-in. How are you feeling today?",
      urgency: 'medium',
      triggerReason: 'Scheduled weekly check-in',
      actionLabel: 'Quick Check-in (2 min)',
      dismissible: true
    },
    {
      id: 2,
      type: 'transition',
      title: 'First Month Support',
      message: "You're approaching your first month at UBC! This is a common time when students need extra support. Want to connect with someone?",
      urgency: 'medium',
      triggerReason: 'Timeline-based transition support',
      actionLabel: 'Connect with Peer Mentor',
      dismissible: true
    },
    {
      id: 3,
      type: 'academic',
      title: 'Midterm Season Approaching',
      message: "Midterms are coming up in 2 weeks. Let's make sure you have the study support you need.",
      urgency: 'low',
      triggerReason: 'Calendar-based academic support',
      actionLabel: 'Find Study Groups',
      dismissible: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'wellness':
        return Heart;
      case 'academic':
        return BookOpen;
      case 'social':
        return Users;
      case 'transition':
        return Sparkles;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">Gentle Nudge</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Check-in Time</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs">When You're Ready</Badge>;
      default:
        return null;
    }
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Proactive Support</h3>
        <Badge variant="outline" className="text-xs">
          {notifications.length} check-in{notifications.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {notifications.map((notification) => {
        const IconComponent = getNotificationIcon(notification.type);
        return (
          <Card 
            key={notification.id} 
            className={`border-l-4 ${getNotificationColor(notification.urgency)} transition-all duration-300 hover:shadow-md`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getUrgencyBadge(notification.urgency)}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.triggerReason}
                      </span>
                    </div>
                  </div>
                </div>
                
                {notification.dismissible && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {notification.message}
              </p>
              
              <div className="flex gap-2">
                <Button 
                  variant="default" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  {notification.actionLabel}
                </Button>
                <Button variant="outline" size="sm">
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
      
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Your Wellbeing Matters</p>
              <p className="text-xs text-muted-foreground">
                These gentle check-ins help us support you better. You can adjust frequency in settings.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}