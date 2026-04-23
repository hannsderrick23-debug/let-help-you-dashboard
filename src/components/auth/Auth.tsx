import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefHat, Mail, Lock, User, Globe, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface AuthProps {
  onLogin: (userData: any) => void;
}

export function Auth({ onLogin }: AuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: 'Nigeria'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (type: 'login' | 'signup') => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const userData = {
        name: type === 'login' ? 'Alex Johnson' : formData.name,
        email: formData.email,
        country: formData.country,
        isPremium: true
      };
      onLogin(userData);
      toast.success(type === 'login' ? "Welcome back!" : "Account created successfully!", {
        description: `Logged in as ${userData.name}`
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md border-none shadow-2xl rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
        <CardHeader className="space-y-4 pt-10 pb-6 text-center">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-200">
            <ChefHat size={32} />
          </div>
          <div>
            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">SmartChef AI</CardTitle>
            <CardDescription className="text-slate-500 font-medium mt-1">
              Dual-mode recipe platform for authentic tastes.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1.5 rounded-2xl h-12">
              <TabsTrigger value="login" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="alex@example.com" 
                    className="pl-10 h-12 rounded-2xl border-slate-200 bg-white"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-2xl border-slate-200 bg-white"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl mt-4 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                onClick={() => handleSubmit('login')}
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Sign In"}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="Alex Johnson" 
                    className="pl-10 h-12 rounded-2xl border-slate-200 bg-white"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input 
                    id="email-signup" 
                    name="email"
                    type="email" 
                    placeholder="alex@example.com" 
                    className="pl-10 h-12 rounded-2xl border-slate-200 bg-white"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password-signup" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      id="password-signup" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 h-12 rounded-2xl border-slate-200 bg-white"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Home Country</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select 
                      id="country" 
                      name="country"
                      className="w-full pl-10 pr-4 h-12 rounded-2xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none"
                      onChange={handleInputChange}
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-2xl mt-4 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                onClick={() => handleSubmit('signup')}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="pb-10 flex justify-center border-t border-slate-50 pt-6">
          <p className="text-xs text-slate-400 font-medium">
            By signing up, you agree to our <span className="text-emerald-600 cursor-pointer">Terms of Service</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}