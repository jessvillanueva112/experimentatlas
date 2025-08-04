import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Filter,
  BookOpen,
  Coffee,
  Briefcase,
  Heart,
  Settings,
  Star,
  ChevronRight
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  tags: string[];
  isRegistered: boolean;
  isFeatured: boolean;
}

export function EventHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "academic", label: "Academic", icon: BookOpen },
    { id: "social", label: "Social", icon: Coffee },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "wellness", label: "Wellness", icon: Heart },
    { id: "administrative", label: "Admin", icon: Settings }
  ];

  const events: Event[] = [
    {
      id: 1,
      title: "International Student Welcome Mixer",
      description: "Join us for an evening of networking, cultural exchange, and making new friends! Light refreshments will be provided.",
      category: "social",
      date: "2024-01-15",
      time: "6:00 PM - 9:00 PM",
      location: "Student Union Building, Room 201",
      organizer: "International Student Association",
      attendees: 45,
      maxAttendees: 100,
      tags: ["networking", "cultural", "food"],
      isRegistered: false,
      isFeatured: true
    },
    {
      id: 2,
      title: "Academic Writing Workshop",
      description: "Improve your academic writing skills with tips from writing center experts. Perfect for first-year students.",
      category: "academic",
      date: "2024-01-16",
      time: "2:00 PM - 4:00 PM",
      location: "Library, Room 204",
      organizer: "Writing Center",
      attendees: 23,
      maxAttendees: 30,
      tags: ["writing", "academic", "skills"],
      isRegistered: true,
      isFeatured: false
    },
    {
      id: 3,
      title: "Resume Building Workshop",
      description: "Learn how to create a compelling resume that stands out to Canadian employers. Includes individual feedback sessions.",
      category: "career",
      date: "2024-01-17",
      time: "1:00 PM - 3:00 PM",
      location: "Career Services Center",
      organizer: "Career Services",
      attendees: 31,
      maxAttendees: 40,
      tags: ["resume", "career", "employment"],
      isRegistered: false,
      isFeatured: true
    },
    {
      id: 4,
      title: "Mindfulness Meditation Session",
      description: "Reduce stress and improve focus through guided meditation. No experience necessary - all are welcome!",
      category: "wellness",
      date: "2024-01-18",
      time: "12:00 PM - 1:00 PM",
      location: "Wellness Center, Meditation Room",
      organizer: "Student Wellness",
      attendees: 18,
      maxAttendees: 25,
      tags: ["meditation", "stress", "wellness"],
      isRegistered: false,
      isFeatured: false
    },
    {
      id: 5,
      title: "Biology Study Group",
      description: "Weekly study group for BIOL 101 students. We review lecture materials and work through practice problems together.",
      category: "academic",
      date: "2024-01-19",
      time: "4:00 PM - 6:00 PM",
      location: "Life Sciences Building, Room 105",
      organizer: "Biology Students Association",
      attendees: 8,
      maxAttendees: 15,
      tags: ["study group", "biology", "peer learning"],
      isRegistered: true,
      isFeatured: false
    },
    {
      id: 6,
      title: "Tax Information Session for International Students",
      description: "Learn about Canadian tax requirements and how to file your first tax return as an international student.",
      category: "administrative",
      date: "2024-01-20",
      time: "3:00 PM - 4:30 PM",
      location: "Student Services Building, Auditorium",
      organizer: "Student Financial Services",
      attendees: 67,
      maxAttendees: 150,
      tags: ["taxes", "finance", "international"],
      isRegistered: false,
      isFeatured: true
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredEvents = events.filter(event => event.isFeatured);

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || Calendar;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: "bg-blue-100 text-blue-800",
      social: "bg-purple-100 text-purple-800",
      career: "bg-green-100 text-green-800",
      wellness: "bg-pink-100 text-pink-800",
      administrative: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Hub</h1>
          <p className="text-muted-foreground">Discover events, workshops, and activities tailored to your interests</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events, workshops, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="w-fit">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2 text-xs sm:text-sm"
                >
                  <category.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Featured Events */}
        {selectedCategory === "all" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Featured Events</h2>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => {
                const CategoryIcon = getCategoryIcon(event.category);
                return (
                  <Card key={event.id} className="hover:shadow-md transition-all duration-200 border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <Badge className={getCategoryColor(event.category)}>
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {event.category}
                        </Badge>
                        <Star className="w-4 h-4 text-warning fill-current" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees}/{event.maxAttendees} registered</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {event.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button 
                        className="w-full" 
                        variant={event.isRegistered ? "outline" : "default"}
                      >
                        {event.isRegistered ? "Registered ✓" : "Register"}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All Events List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {selectedCategory === "all" ? "All Events" : `${categories.find(c => c.id === selectedCategory)?.label} Events`}
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredEvents.length} events found
            </span>
          </div>
          
          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const CategoryIcon = getCategoryIcon(event.category);
              return (
                <Card key={event.id} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <Badge className={getCategoryColor(event.category)}>
                            <CategoryIcon className="w-3 h-3 mr-1" />
                            {event.category}
                          </Badge>
                          {event.isFeatured && <Star className="w-4 h-4 text-warning fill-current" />}
                        </div>
                        
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(event.date).toLocaleDateString()} • {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.attendees}/{event.maxAttendees} attending
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {event.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 lg:w-auto">
                        <Button 
                          variant={event.isRegistered ? "outline" : "default"}
                          className="w-full lg:w-auto"
                        >
                          {event.isRegistered ? "Registered ✓" : "Register"}
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full lg:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}