import { useState, useMemo } from 'react';
import { 
  Globe, 
  MapPin, 
  Search, 
  ArrowRight,
  Info,
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { countries, mockRecipes, Recipe } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TraditionalExplorerProps {
  onSelectRecipe: (recipe: Recipe) => void;
  initialCountry?: string;
}

export function TraditionalExplorer({ onSelectRecipe, initialCountry }: TraditionalExplorerProps) {
  const [selectedCountry, setSelectedCountry] = useState(initialCountry || 'Nigeria');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCountryData = useMemo(() => 
    countries.find(c => c.name === selectedCountry), 
    [selectedCountry]
  );

  const countryRecipes = useMemo(() => 
    mockRecipes.filter(r => r.country === selectedCountry),
    [selectedCountry]
  );

  const filteredCountries = useMemo(() => 
    countries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar: Country Selection */}
      <div className="lg:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <Input 
            placeholder="Search country..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-white border-slate-200"
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">African Countries</h3>
            <Globe size={14} className="text-emerald-600" />
          </div>
          <div className="max-h-[500px] overflow-auto custom-scrollbar">
            {filteredCountries.map((country) => (
              <button
                key={country.name}
                onClick={() => setSelectedCountry(country.name)}
                className={cn(
                  "w-full px-4 py-3 flex items-center justify-between text-left transition-colors",
                  selectedCountry === country.name 
                    ? "bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600" 
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <span className="font-medium text-sm">{country.name}</span>
                <ChevronRight size={14} className={cn(
                  "transition-transform",
                  selectedCountry === country.name ? "text-emerald-600" : "text-slate-300"
                )} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Dishes */}
      <div className="lg:col-span-3 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
              <MapPin size={16} />
              <span className="text-xs uppercase tracking-widest">Region: {selectedCountry}</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Traditional Dishes</h2>
            <p className="text-slate-500 mt-1">Discover the authentic flavors of {selectedCountry}.</p>
          </div>
          <div className="flex gap-2">
             <Badge variant="outline" className="rounded-lg px-3 py-1 border-slate-200 text-slate-600">
               {countryRecipes.length} Authentic Recipes
             </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {countryRecipes.length > 0 ? (
              countryRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 shadow-sm uppercase tracking-wider">
                        {recipe.country}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-slate-900">{recipe.title}</h3>
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none">
                        {recipe.matchRate}% Match
                      </Badge>
                    </div>
                    
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                      {recipe.culturalContext}
                    </p>

                    <div className="flex items-center gap-4 mb-6 text-slate-400 text-xs font-medium">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.time}</span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" /> {recipe.difficulty}
                      </span>
                    </div>

                    <Button 
                      onClick={() => onSelectRecipe(recipe)}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-12 font-bold group"
                    >
                      View Authentic Recipe
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 py-20 flex flex-col items-center justify-center text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4">
                  <Globe size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Expanding our menu...</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                  We are currently gathering authentic recipes for {selectedCountry}. Check back soon!
                </p>
                <Button 
                  variant="outline" 
                  className="mt-6 rounded-xl"
                  onClick={() => setSelectedCountry('Nigeria')}
                >
                  Explore Nigeria instead
                </Button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Country Dishes (Mocked as expandable list) */}
        {currentCountryData && (
          <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Other {selectedCountry} Favorites</h3>
              <div className="flex flex-wrap gap-2">
                {currentCountryData.dishes.map((dish) => (
                  <Badge key={dish} className="bg-emerald-800/50 hover:bg-emerald-700 text-emerald-50 border-emerald-700/50 px-4 py-2 text-sm rounded-xl">
                    {dish}
                  </Badge>
                ))}
              </div>
              <p className="mt-6 text-emerald-100/70 text-sm max-w-xl">
                The culinary landscape of {selectedCountry} is rich and diverse. Our AI is learning to recreate these traditional dishes while suggesting the best local ingredients.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-800/20 rounded-full blur-3xl -ml-24 -mb-24" />
          </div>
        )}
      </div>
    </div>
  );
}