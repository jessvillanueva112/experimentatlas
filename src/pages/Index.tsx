import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { EventHub } from "@/components/EventHub";
import { PeerMatching } from "@/components/PeerMatching";
import { SupportHub } from "@/components/SupportHub";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Calendar, 
  Users, 
  MessageCircle, 
  Award, 
  User,
  Sparkles,
  Headphones
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock user data - in a real app this would come from authentication
  const mockUser = {
    name: "Alex Thompson",
    university: "University of British Columbia",
    program: "Computer Science", 
    year: 1,
    profilePhoto: undefined
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "events", label: "Events", icon: Calendar },
    { id: "community", label: "Community", icon: Users },
    { id: "support", label: "Support", icon: Headphones },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "rewards", label: "Rewards", icon: Award },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard user={mockUser} />;
      case "events":
        return <EventHub />;
      case "community":
        return <PeerMatching />;
      case "support":
        return <SupportHub />;
      case "messages":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Messages Coming Soon!</h3>
              <p className="text-muted-foreground">
                Real-time messaging features are in development.
              </p>
            </div>
          </div>
        );
      case "rewards":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rewards System Coming Soon!</h3>
              <p className="text-muted-foreground">
                Gamification and achievement features are in development.
              </p>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Profile Management Coming Soon!</h3>
              <p className="text-muted-foreground">
                Comprehensive profile features are in development.
              </p>
            </div>
          </div>
        );
      default:
        return <Dashboard user={mockUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t z-50">
          <div className="grid grid-cols-7 gap-1 p-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2"
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="pb-20">
          {renderContent()}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex">
        <div className="fixed left-0 top-0 h-full w-64 bg-card border-r z-40">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Atlas
              </h1>
            </div>
            
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="ml-64 flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
