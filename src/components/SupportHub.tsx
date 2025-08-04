import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search,
  MessageCircle,
  Heart,
  Clock,
  Users,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Globe,
  AlertCircle,
  CheckCircle,
  Send,
  Sparkles,
  HelpCircle,
  Shield,
  Headphones
} from "lucide-react";

interface SupportResource {
  id: number;
  title: string;
  description: string;
  category: string;
  contact: string;
  availability: string;
  languages: string[];
  urgent: boolean;
  type: 'service' | 'person' | 'event' | 'group';
}

interface CheckInPrompt {
  id: number;
  question: string;
  type: 'mood' | 'academic' | 'social' | 'general';
  responses: string[];
}

export function SupportHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showAnonymousForm, setShowAnonymousForm] = useState(false);
  const [checkInResponse, setCheckInResponse] = useState("");

  const languages = ["English", "Français", "中文", "हिन्दी", "العربية", "한국어", "Español"];
  
  const supportResources: SupportResource[] = [
    {
      id: 1,
      title: "UBC Counselling & Psychological Services",
      description: "Professional mental health support, crisis intervention, and workshops",
      category: "Mental Health",
      contact: "604-822-3811",
      availability: "Mon-Fri 8:30am-4:30pm",
      languages: ["English", "Français", "中文"],
      urgent: true,
      type: 'service'
    },
    {
      id: 2,
      title: "International Student Advisor",
      description: "Immigration, visa, and study permit support for international students",
      category: "Administrative",
      contact: "604-822-5020",
      availability: "Mon-Fri 9:00am-4:00pm",
      languages: ["English", "Français", "中文", "हिन्दी", "العربية"],
      urgent: false,
      type: 'person'
    },
    {
      id: 3,
      title: "Peer Academic Success Centre",
      description: "Study skills, time management, and academic planning support",
      category: "Academic",
      contact: "Drop-in or book online",
      availability: "Mon-Fri 10:00am-6:00pm",
      languages: ["English", "Français"],
      urgent: false,
      type: 'service'
    },
    {
      id: 4,
      title: "International Student Welcome Coffee",
      description: "Weekly informal meetup for new international students to connect",
      category: "Social",
      contact: "Student Union Building Lounge",
      availability: "Fridays 3:00pm-5:00pm",
      languages: ["All languages welcome"],
      urgent: false,
      type: 'event'
    },
    {
      id: 5,
      title: "Crisis Support & Wellness",
      description: "24/7 crisis support and immediate mental health assistance",
      category: "Emergency",
      contact: "604-822-3811 (24/7)",
      availability: "Available 24/7",
      languages: ["English", "Français"],
      urgent: true,
      type: 'service'
    },
    {
      id: 6,
      title: "Housing & Residence Life Support",
      description: "Help with housing issues, roommate conflicts, and residence policies",
      category: "Housing",
      contact: "housing.help@ubc.ca",
      availability: "Mon-Fri 8:30am-4:30pm",
      languages: ["English", "Français", "中文"],
      urgent: false,
      type: 'service'
    }
  ];

  const checkInPrompts: CheckInPrompt[] = [
    {
      id: 1,
      question: "How are you feeling about your academic progress this week?",
      type: 'academic',
      responses: ["Great - feeling confident", "Okay - managing well", "Struggling a bit", "Really overwhelmed", "Prefer not to say"]
    },
    {
      id: 2,
      question: "How connected do you feel to your campus community?",
      type: 'social',
      responses: ["Very connected", "Somewhat connected", "Not very connected", "Feeling isolated", "Building connections slowly"]
    },
    {
      id: 3,
      question: "What's your overall mood today?",
      type: 'mood',
      responses: ["Excellent", "Good", "Neutral", "Low", "Need support"]
    }
  ];

  const commonQuestions = [
    "How do I find study groups for my program?",
    "Where can I get help with housing issues?",
    "How do I connect with other international students?",
    "Where do I go for mental health support?",
    "How do I join clubs and activities?",
    "Where can I get academic advising?",
    "How do I get help with visa questions?",
    "Where can I find language exchange partners?"
  ];

  const filteredResources = supportResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mental health':
      case 'emergency':
        return Heart;
      case 'academic':
        return BookOpen;
      case 'social':
        return Users;
      case 'administrative':
        return HelpCircle;
      case 'housing':
        return MapPin;
      default:
        return HelpCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mental health':
        return "bg-pink-100 text-pink-800";
      case 'emergency':
        return "bg-red-100 text-red-800";
      case 'academic':
        return "bg-blue-100 text-blue-800";
      case 'social':
        return "bg-purple-100 text-purple-800";
      case 'administrative':
        return "bg-gray-100 text-gray-800";
      case 'housing':
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleQuickQuestion = (question: string) => {
    setSearchQuery(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Support Hub</h1>
          </div>
          <p className="text-muted-foreground">
            Your multilingual digital assistant for campus support and resources
          </p>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Smart Search
            </TabsTrigger>
            <TabsTrigger value="checkin" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Check-in
            </TabsTrigger>
            <TabsTrigger value="anonymous" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Anonymous Help
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Emergency
            </TabsTrigger>
          </TabsList>

          {/* Smart Search Tab */}
          <TabsContent value="search" className="space-y-6">
            {/* Language Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Language / Langue / 语言
                </CardTitle>
                <CardDescription>
                  Choose your preferred language for support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Badge
                      key={lang}
                      variant={selectedLanguage === lang ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Ask Atlas Anything
                </CardTitle>
                <CardDescription>
                  Describe what you need help with, and I'll find the right resources for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="e.g., 'I need help with housing' or 'feeling overwhelmed with studies'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-lg h-12"
                  />
                </div>
                
                {/* Quick Questions */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Common Questions:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {commonQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-start text-left h-auto p-3 whitespace-normal"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchQuery && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Support Resources ({filteredResources.length} found)
                  </h2>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {selectedLanguage}
                  </Badge>
                </div>

                {filteredResources.map((resource) => {
                  const CategoryIcon = getCategoryIcon(resource.category);
                  return (
                    <Card key={resource.id} className={`hover:shadow-md transition-all duration-200 ${resource.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Badge className={getCategoryColor(resource.category)}>
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {resource.category}
                            </Badge>
                            {resource.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent Support Available
                              </Badge>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{resource.contact}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span>{resource.availability}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <span>{resource.languages.join(", ")}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="default" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact Now
                          </Button>
                          <Button variant="outline" size="sm">
                            Learn More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  Weekly Wellness Check-in
                </CardTitle>
                <CardDescription>
                  How are you doing? Your responses help us provide better support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {checkInPrompts.map((prompt) => (
                  <div key={prompt.id} className="space-y-3">
                    <h3 className="font-medium">{prompt.question}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {prompt.responses.map((response, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start text-left h-auto p-3"
                          onClick={() => setCheckInResponse(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Textarea
                    placeholder="Anything else you'd like to share? (Optional)"
                    className="min-h-[100px]"
                  />
                  <Button className="mt-3" variant="success">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Check-in
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Anonymous Help Tab */}
          <TabsContent value="anonymous" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Anonymous Support Request
                </CardTitle>
                <CardDescription>
                  Request help without sharing your identity. Your privacy is completely protected.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="font-medium text-sm">Privacy Guarantee</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This form is completely anonymous. No personal information is collected or stored. 
                    Responses are reviewed by trained peer ambassadors and counselors.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">What type of support do you need?</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {["Academic", "Mental Health", "Social", "Financial", "Housing", "Other"].map((type) => (
                        <Button key={type} variant="outline" size="sm" className="justify-start">
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Describe your situation (optional)</label>
                    <Textarea
                      placeholder="Share as much or as little as you're comfortable with..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">How urgently do you need support?</label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" className="text-green-700 border-green-200">
                        Not urgent
                      </Button>
                      <Button variant="outline" size="sm" className="text-yellow-700 border-yellow-200">
                        Within a week
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-700 border-red-200">
                        Right away
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full" variant="hero">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Anonymous Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-5 h-5" />
                  Emergency Support
                </CardTitle>
                <CardDescription className="text-red-700">
                  If you're in immediate danger or crisis, please use these resources right away
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-300">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-red-800 mb-2">Crisis Support (24/7)</h3>
                      <p className="text-sm text-red-700 mb-3">
                        Immediate mental health crisis support
                      </p>
                      <Button variant="destructive" size="sm" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call 604-822-3811
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-red-300">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-red-800 mb-2">Emergency Services</h3>
                      <p className="text-sm text-red-700 mb-3">
                        Police, fire, ambulance
                      </p>
                      <Button variant="destructive" size="sm" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Call 911
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Other Crisis Resources:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Crisis Services Canada</span>
                      <span className="font-medium">1-833-456-4566</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BC Mental Health Support</span>
                      <span className="font-medium">310-6789</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Campus Security (UBC)</span>
                      <span className="font-medium">604-822-2222</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}