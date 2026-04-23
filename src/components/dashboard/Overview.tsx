import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Refrigerator, 
  Utensils, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  Globe
} from 'lucide-react';
import { mockRecipes, mockPantry } from '@/lib/mock-data';
import { motion } from 'framer-motion';

interface OverviewProps {
  onNavigate: (tab: string) => void;
  user: any;
}

export function Overview({ onNavigate, user }: OverviewProps) {
  const expiringSoon = mockPantry.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diff = expiryDate.getTime() - today.getTime();
    return diff < (1000 * 60 * 60 * 24 * 3); // 3 days
  });

  // Filter recommendations based on user country
  const regionalFavorites = mockRecipes.filter(r => r.country === user.country);
  const generalModern = mockRecipes.filter(r => r.type === 'modern');

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <MapPin size={16} className="text-emerald-600" />
            Personalized for you in <span className="text-slate-900 font-bold">{user.country}</span>
          </p>
        </div>
        <div className="bg-emerald-50 px-4 py-2 rounded-2xl flex items-center gap-3 border border-emerald-100">
           <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <Sparkles size={20} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">AI Status</p>
              <p className="text-xs font-bold text-emerald-900 italic">"Learning your tastes..."</p>
           </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Pantry Items', value: mockPantry.length, icon: Refrigerator, color: 'emerald', sub: '+4 this week' },
          { label: 'Expiring Soon', value: expiringSoon.length, icon: AlertTriangle, color: 'orange', sub: 'Action required' },
          { label: 'Recipes Ready', value: '12', icon: Utensils, color: 'blue', sub: 'Based on pantry' },
          { label: 'Savings', value: '$42', icon: TrendingUp, color: 'purple', sub: 'This month' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-14 h-14 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <stat.icon size={28} />
                </div>
              </div>
              <div className={`mt-4 flex items-center text-xs text-${stat.color}-600 font-bold uppercase tracking-widest`}>
                <span>{stat.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Traditional Regional Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Globe className="text-orange-500" size={24} />
                  Taste of {user.country}
                </h2>
                <p className="text-slate-500 text-sm mt-1">Authentic traditional recipes from your region.</p>
              </div>
              <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 font-bold" onClick={() => onNavigate('recipes')}>
                Explore Africa <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(regionalFavorites.length > 0 ? regionalFavorites : mockRecipes.filter(r => r.type === 'traditional').slice(0, 2)).map((recipe) => (
                <motion.div 
                  key={recipe.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-2xl transition-all duration-500"
                  onClick={() => onNavigate('recipes')}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-widest">
                        {recipe.matchRate}% Match
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-600 transition-colors">{recipe.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5"><Sparkles size={14} /> {recipe.difficulty}</span>
                    </div>
                    <Button className="w-full mt-6 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl h-12 font-bold transition-all shadow-lg shadow-slate-200">
                      View Recipe
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Modern Recommendations */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="text-blue-500" size={24} />
                  Modern Global Trends
                </h2>
                <p className="text-slate-500 text-sm mt-1">Healthy, trendy, and AI-optimized for your diet.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generalModern.slice(0, 2).map((recipe) => (
                <motion.div 
                  key={recipe.id}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-2xl transition-all duration-500"
                  onClick={() => onNavigate('recipes')}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 shadow-sm uppercase tracking-widest">
                        Modern Choice
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">{recipe.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5"><Sparkles size={14} /> {recipe.difficulty}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Kitchen Insights</h2>
            <Card className="border-none shadow-sm rounded-[32px] overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  {expiringSoon.map((item) => (
                    <div key={item.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 group-hover:bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest">Expires in {item.daysLeft} days</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-600 font-black text-[10px] uppercase tracking-wider hover:bg-emerald-50 rounded-xl">
                        USE IT
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="p-5 bg-slate-50/50 rounded-b-[32px] border-t border-slate-50">
                  <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">
                    AI identified <span className="text-emerald-600">3 recipes</span> to minimize waste.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-emerald-900 text-white border-none shadow-2xl rounded-[40px] overflow-hidden relative group">
            <CardContent className="p-8 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                 <ChefHat size={32} className="text-emerald-300" />
              </div>
              <h3 className="font-black text-2xl mb-3 tracking-tight">Smart Optimization</h3>
              <p className="text-emerald-100/80 text-sm mb-8 leading-relaxed font-medium">
                Save <span className="text-white font-bold">45 minutes</span> this week by combining preparation for 3 different recipes.
              </p>
              <Button className="w-full bg-white text-emerald-900 hover:bg-emerald-50 border-none font-black h-14 rounded-2xl transition-all shadow-xl shadow-emerald-950/20 active:scale-95" onClick={() => onNavigate('meal-prep')}>
                Start Optimization Mode
              </Button>
            </CardContent>
            {/* Animated decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-800 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-1000" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-700 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-1000" />
          </Card>

          <Card className="bg-slate-900 text-white border-none shadow-2xl rounded-[40px] overflow-hidden relative p-8">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Regional Alert</span>
             </div>
             <h4 className="text-lg font-bold mb-2">New Recipe in {user.country}!</h4>
             <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Discover the seasonal secrets of authentic {user.country} harvest meals, trending now in your region.
             </p>
             <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-white font-bold h-12 rounded-2xl">
                Check it out
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChefHat(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0 5.11 5.11 0 0 1 1.05 1.54 4 4 0 0 1 1.41 7.87" />
      <path d="M6 14h12l-2 8H8l-2-8Z" />
    </svg>
  );
}