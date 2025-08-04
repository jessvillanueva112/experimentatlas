import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  Award, 
  Bell, 
  Search,
  Globe,
  BookOpen,
  Heart,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    university: string;
    program: string;
    year: number;
    profilePhoto?: string;
  };
}

export function Dashboard({ user }: DashboardProps) {
  const quickActions = [
    { icon: Calendar, label: "Events", description: "Find events & activities", color: "bg-primary" },
    { icon: Users, label: "Community", description: "Connect with peers", color: "bg-accent" },
    { icon: MessageCircle, label: "Messages", description: "Your conversations", color: "bg-success" },
    { icon: Award, label: "Rewards", description: "Your achievements", color: "bg-warning" },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "International Student Welcome Mixer",
      date: "Today, 6:00 PM",
      location: "Student Union Building",
      attendees: 45,
      category: "Social"
    },
    {
      id: 2,
      title: "Academic Writing Workshop",
      date: "Tomorrow, 2:00 PM", 
      location: "Library Room 204",
      attendees: 23,
      category: "Academic"
    },
    {
      id: 3,
      title: "Peer Study Group - Biology",
      date: "Friday, 4:00 PM",
      location: "Life Sciences Building",
      attendees: 8,
      category: "Study"
    }
  ];

  const peerSuggestions = [
    {
      name: "Maria Santos",
      program: "Computer Science",
      year: 1,
      interests: ["Programming", "Gaming", "Soccer"],
      matchPercentage: 92
    },
    {
      name: "Ahmed Hassan", 
      program: "Engineering",
      year: 1,
      interests: ["Robotics", "Basketball", "Photography"],
      matchPercentage: 87
    },
    {
      name: "Jin Kim",
      program: "Business",
      year: 2,
      interests: ["Entrepreneurship", "Tennis", "Cooking"],
      matchPercentage: 83
    }
  ];

  const achievements = [
    { title: "Welcome Warrior", description: "Completed profile setup", earned: true },
    { title: "Social Butterfly", description: "Connected with 3 peers", earned: true },
    { title: "Event Explorer", description: "Attended first campus event", earned: false },
    { title: "Study Squad", description: "Joined a study group", earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Atlas
                </h1>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <Globe className="w-3 h-3 mr-1" />
                Multi-lingual Support
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src={user.profilePhoto} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-muted-foreground">
                {user.program} • Year {user.year} • {user.university}
              </p>
            </div>
            <Button variant="hero" className="w-fit">
              Complete Your Weekly Check-in
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Access</CardTitle>
                <CardDescription>Jump to what you need most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all"
                    >
                      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{action.label}</div>
                        <div className="text-xs text-muted-foreground">{action.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events tailored to your interests</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.attendees} attending
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary">{event.category}</Badge>
                    <Button variant="outline" size="sm">Join</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Peer Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Peer Connections
                </CardTitle>
                <CardDescription>Students you might connect with</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {peerSuggestions.map((peer, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{peer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium">{peer.name}</h4>
                        <p className="text-sm text-muted-foreground">{peer.program} • Year {peer.year}</p>
                      </div>
                      <Badge variant="outline" className="text-success">
                        {peer.matchPercentage}% match
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {peer.interests.map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  Your Progress
                </CardTitle>
                <CardDescription>Keep building your campus experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-success' : 'bg-muted'
                    }`}>
                      <Star className={`w-4 h-4 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}