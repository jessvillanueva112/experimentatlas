import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users,
  MessageCircle,
  UserPlus,
  Settings,
  Heart,
  BookOpen,
  Music,
  Coffee,
  Globe,
  Star,
  MapPin,
  Clock,
  Sparkles,
  Filter,
  Shuffle,
  Briefcase
} from "lucide-react";

interface PeerProfile {
  id: number;
  name: string;
  profilePhoto?: string;
  program: string;
  year: number;
  university: string;
  bio: string;
  interests: string[];
  languages: string[];
  location: string;
  matchPercentage: number;
  isOnline: boolean;
  mutualConnections: number;
  studyGoals: string[];
  personalityType: string;
  connectionType: 'not_connected' | 'pending' | 'connected' | 'blocked';
}

interface Connection {
  id: number;
  peer: PeerProfile;
  connectionDate: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export function PeerMatching() {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const suggestedPeers: PeerProfile[] = [
    {
      id: 1,
      name: "Maria Santos",
      program: "Computer Science",
      year: 1,
      university: "UBC Vancouver",
      bio: "International student from Brazil passionate about coding and soccer. Looking for study partners and friends to explore Vancouver!",
      interests: ["Programming", "Soccer", "Gaming", "Hiking", "Brazilian Culture"],
      languages: ["Portuguese", "English", "Spanish"],
      location: "UBC Campus Housing",
      matchPercentage: 94,
      isOnline: true,
      mutualConnections: 3,
      studyGoals: ["Form study groups", "Practice English", "Academic success"],
      personalityType: "Outgoing & Collaborative",
      connectionType: 'not_connected'
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      program: "Engineering",
      year: 1,
      university: "UBC Vancouver",
      bio: "From Egypt, love robotics and basketball. Always up for deep conversations about technology and culture.",
      interests: ["Robotics", "Basketball", "Photography", "Middle Eastern Culture", "AI"],
      languages: ["Arabic", "English", "French"],
      location: "Off-campus (Kitsilano)",
      matchPercentage: 87,
      isOnline: false,
      mutualConnections: 1,
      studyGoals: ["Technical projects", "Cultural exchange", "Professional networking"],
      personalityType: "Thoughtful & Ambitious",
      connectionType: 'not_connected'
    },
    {
      id: 3,
      name: "Jin Kim",
      program: "Business Administration",
      year: 2,
      university: "UBC Vancouver",
      bio: "Korean-Canadian business student with a passion for entrepreneurship and cooking. Mentor for first-year students.",
      interests: ["Entrepreneurship", "Cooking", "Tennis", "K-pop", "Investing"],
      languages: ["Korean", "English", "Mandarin"],
      location: "Downtown Vancouver",
      matchPercentage: 83,
      isOnline: true,
      mutualConnections: 5,
      studyGoals: ["Mentorship", "Business networking", "Cultural bridge"],
      personalityType: "Mentoring & Supportive",
      connectionType: 'not_connected'
    },
    {
      id: 4,
      name: "Priya Sharma",
      program: "Psychology",
      year: 1,
      university: "UBC Vancouver",
      bio: "Mental health advocate from India. Love yoga, meditation, and helping others find their balance in university life.",
      interests: ["Mental Health", "Yoga", "Meditation", "Bollywood Dance", "Volunteering"],
      languages: ["Hindi", "English", "Punjabi"],
      location: "UBC Campus Housing",
      matchPercentage: 78,
      isOnline: true,
      mutualConnections: 2,
      studyGoals: ["Wellness support", "Study-life balance", "Community service"],
      personalityType: "Empathetic & Mindful",
      connectionType: 'not_connected'
    }
  ];

  const connections: Connection[] = [
    {
      id: 1,
      peer: {
        id: 5,
        name: "Sofia Rodriguez",
        program: "Biology",
        year: 1,
        university: "UBC Vancouver",
        bio: "Pre-med student from Spain",
        interests: ["Medicine", "Research", "Flamenco", "Travel"],
        languages: ["Spanish", "English", "Catalan"],
        location: "UBC Campus Housing",
        matchPercentage: 91,
        isOnline: true,
        mutualConnections: 4,
        studyGoals: ["Pre-med prep", "Research opportunities"],
        personalityType: "Driven & Caring",
        connectionType: 'connected'
      },
      connectionDate: "2024-01-10",
      lastMessage: "Hey! Want to study for the biology midterm together tomorrow?",
      lastMessageTime: "2 hours ago",
      unreadCount: 2
    },
    {
      id: 2,
      peer: {
        id: 6,
        name: "David Chen",
        program: "Computer Science",
        year: 2,
        university: "UBC Vancouver",
        bio: "CS student and coding bootcamp mentor",
        interests: ["Web Development", "Gaming", "Anime", "Ramen"],
        languages: ["Mandarin", "English"],
        location: "Off-campus (Richmond)",
        matchPercentage: 88,
        isOnline: false,
        mutualConnections: 7,
        studyGoals: ["Technical mentorship", "Industry connections"],
        personalityType: "Helpful & Technical",
        connectionType: 'connected'
      },
      connectionDate: "2024-01-08",
      lastMessage: "Thanks for the coding help! The project is finally working 🎉",
      lastMessageTime: "1 day ago",
      unreadCount: 0
    }
  ];

  const interestFilters = [
    "Academic", "Sports", "Arts", "Technology", "Culture", "Music", 
    "Food", "Travel", "Gaming", "Wellness", "Business", "Science"
  ];

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-success";
    if (percentage >= 80) return "text-warning";
    return "text-muted-foreground";
  };

  const getConnectionStatusButton = (peer: PeerProfile) => {
    switch (peer.connectionType) {
      case 'connected':
        return <Button variant="outline" size="sm">Message</Button>;
      case 'pending':
        return <Button variant="ghost" size="sm">Pending</Button>;
      case 'blocked':
        return <Button variant="ghost" size="sm" disabled>Blocked</Button>;
      default:
        return <Button variant="default" size="sm">Connect</Button>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Peer Community</h1>
          <p className="text-muted-foreground">Connect with students who share your interests and goals</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discover" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Connections
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              Study Groups
            </TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Find Your Match
                </CardTitle>
                <CardDescription>
                  Filter by interests and goals to find the best peer connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interestFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant={selectedFilters.includes(filter) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedFilters(prev =>
                          prev.includes(filter)
                            ? prev.filter(f => f !== filter)
                            : [...prev, filter]
                        );
                      }}
                    >
                      {filter}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Shuffle className="w-4 h-4 mr-2" />
                    Randomize
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Peer Suggestions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suggestedPeers.map((peer) => (
                <Card key={peer.id} className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={peer.profilePhoto} />
                          <AvatarFallback className="text-lg">
                            {peer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {peer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{peer.name}</h3>
                          <Badge variant="outline" className={getMatchColor(peer.matchPercentage)}>
                            <Star className="w-3 h-3 mr-1" />
                            {peer.matchPercentage}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {peer.program} • Year {peer.year}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {peer.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {peer.mutualConnections} mutual connections
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {peer.bio}
                    </p>

                    {/* Languages */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {peer.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        Interests
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {peer.interests.slice(0, 6).map((interest, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                        {peer.interests.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{peer.interests.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Study Goals */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        Study Goals
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {peer.studyGoals.map((goal, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Match Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Compatibility</span>
                        <span className={getMatchColor(peer.matchPercentage)}>
                          {peer.matchPercentage}%
                        </span>
                      </div>
                      <Progress value={peer.matchPercentage} className="h-2" />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      {getConnectionStatusButton(peer)}
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Connections ({connections.length})</h2>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Find More Peers
              </Button>
            </div>

            <div className="space-y-4">
              {connections.map((connection) => (
                <Card key={connection.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {connection.peer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {connection.peer.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{connection.peer.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {connection.peer.matchPercentage}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {connection.peer.program} • Year {connection.peer.year}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {connection.lastMessage}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {connection.lastMessageTime}
                        </span>
                        {connection.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground">
                            {connection.unreadCount}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Study Buddy Matching */}
              <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Find Study Buddies</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Get matched with peers in your courses for study sessions
                  </p>
                  <Button className="w-full">
                    Start Matching
                  </Button>
                </CardContent>
              </Card>

              {/* Group Study Sessions */}
              <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Join Study Groups</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Find or create study groups for your subjects
                  </p>
                  <Button variant="outline" className="w-full">
                    Browse Groups
                  </Button>
                </CardContent>
              </Card>

              {/* Peer Mentorship */}
              <Card className="border-2 border-dashed border-green-300 hover:border-green-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Get a Mentor</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Connect with upper-year students for guidance
                  </p>
                  <Button variant="outline" className="w-full">
                    Find Mentors
                  </Button>
                </CardContent>
              </Card>

              {/* Language Exchange */}
              <Card className="border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Language Exchange</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Practice languages with native speakers
                  </p>
                  <Button variant="outline" className="w-full">
                    Start Exchange
                  </Button>
                </CardContent>
              </Card>

              {/* Career Connections */}
              <Card className="border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Briefcase className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Career Network</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Connect with peers for career opportunities
                  </p>
                  <Button variant="outline" className="w-full">
                    Build Network
                  </Button>
                </CardContent>
              </Card>

              {/* Social Meetups */}
              <Card className="border-2 border-dashed border-pink-300 hover:border-pink-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Coffee className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Social Meetups</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Join casual meetups and social activities
                  </p>
                  <Button variant="outline" className="w-full">
                    Join Meetups
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}