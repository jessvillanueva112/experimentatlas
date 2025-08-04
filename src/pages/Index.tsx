import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Dashboard } from "@/components/Dashboard";
import { EventHub } from "@/components/EventHub";
import { PeerSupport } from "@/components/PeerMatching";
import { SupportHub } from "@/components/SupportHub";
import Adventures from "@/components/Adventures";
import Rewards from "@/components/Rewards";
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
  Headphones,
  LogOut,
  Map
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userProfile, setUserProfile] = useState(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      
      setUserProfile({
        name: data.display_name || `${data.first_name} ${data.last_name}`,
        university: data.university,
        program: data.program || "Not specified",
        year: data.year_of_study || 1,
        profilePhoto: data.avatar_url
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback data
      setUserProfile({
        name: user?.email?.split('@')[0] || 'Student',
        university: "University",
        program: "Not specified",
        year: 1,
        profilePhoto: undefined
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "adventures", label: "Adventures", icon: Map },
    { id: "events", label: "Events", icon: Calendar },
    { id: "community", label: "Community", icon: Users },
    { id: "support", label: "Support", icon: Headphones },
    { id: "rewards", label: "Rewards", icon: Award },
    { id: "profile", label: "Profile", icon: User },
  ];

  const renderContent = () => {
    if (!userProfile) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return <Dashboard user={userProfile} />;
      case "adventures":
        return <Adventures />;
      case "events":
        return <EventHub />;
      case "community":
        return <PeerSupport />;
      case "support":
        return <SupportHub />;
      case "rewards":
        return <Rewards />;
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
        return <Dashboard user={userProfile} />;
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Atlas
                </h1>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
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
