import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { SecureInput } from '@/components/ui/secure-input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Mail, Lock, User, MapPin, GraduationCap } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Sign in form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  // Sign up form state
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    university: '',
    homeCountry: ''
  });

  // Redirect authenticated users
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input: string) => {
    return input.trim().replace(/[<>]/g, '');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(signInData.email)) {
      return;
    }

    if (signInData.password.length < 6) {
      return;
    }

    setIsLoading(true);
    
    await signIn(
      sanitizeInput(signInData.email), 
      signInData.password
    );
    
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(signUpData.email)) {
      return;
    }

    if (signUpData.password.length < 6) {
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      return;
    }

    if (!signUpData.firstName.trim() || !signUpData.lastName.trim()) {
      return;
    }

    if (!signUpData.university.trim() || !signUpData.homeCountry.trim()) {
      return;
    }

    setIsLoading(true);
    
    const userData = {
      first_name: sanitizeInput(signUpData.firstName).slice(0, 50),
      last_name: sanitizeInput(signUpData.lastName).slice(0, 50),
      university: sanitizeInput(signUpData.university).slice(0, 100),
      home_country: sanitizeInput(signUpData.homeCountry).slice(0, 50),
      display_name: sanitizeInput(`${signUpData.firstName} ${signUpData.lastName}`).slice(0, 100)
    };

    await signUp(
      sanitizeInput(signUpData.email),
      signUpData.password,
      userData
    );
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Atlas
            </h1>
          </div>
          <p className="text-muted-foreground">
            Your comprehensive student support platform
          </p>
        </div>

        <Card className="shadow-strong">
          <CardHeader className="text-center">
            <CardTitle>Welcome to Atlas</CardTitle>
            <CardDescription>
              Connect, learn, and thrive in your academic journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <SecureInput
                      id="signin-email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={signInData.email}
                      onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      maxLength={255}
                      className="transition-all duration-200"
                      sanitize={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <SecureInput
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      minLength={6}
                      maxLength={128}
                      className="transition-all duration-200"
                      sanitize={false}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        First Name
                      </Label>
                      <SecureInput
                        id="signup-firstname"
                        type="text"
                        placeholder="John"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                        maxLength={50}
                        sanitize={true}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <SecureInput
                        id="signup-lastname"
                        type="text"
                        placeholder="Smith"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                        maxLength={50}
                        sanitize={true}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <SecureInput
                      id="signup-email"
                      type="email"
                      placeholder="your.email@university.edu"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      maxLength={255}
                      sanitize={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-university" className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      University
                    </Label>
                    <SecureInput
                      id="signup-university"
                      type="text"
                      placeholder="University of British Columbia"
                      value={signUpData.university}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, university: e.target.value }))}
                      required
                      maxLength={100}
                      sanitize={true}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-country" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Home Country
                    </Label>
                    <Select 
                      value={signUpData.homeCountry}
                      onValueChange={(value) => setSignUpData(prev => ({ ...prev, homeCountry: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your home country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="south_korea">South Korea</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </Label>
                    <SecureInput
                      id="signup-password"
                      type="password"
                      placeholder="Create a secure password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      minLength={6}
                      maxLength={128}
                      sanitize={false}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <SecureInput
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      minLength={6}
                      maxLength={128}
                      sanitize={false}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;