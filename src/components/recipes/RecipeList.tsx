import { useState, useMemo } from 'react';
import { 
  Search, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Info,
  Sparkles,
  Utensils,
  Globe,
  Star,
  Share2,
  Bookmark
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockRecipes, mockPantry, Recipe } from '@/lib/mock-data';
import { suggestSubstitution, scaleRecipe } from '@/lib/ai-logic';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { TraditionalExplorer } from './TraditionalExplorer';
import { cn } from '@/lib/utils';

export function RecipeList() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const [nutritionFilter, setNutritionFilter] = useState('All');
  const [activeMode, setActiveMode] = useState<'traditional' | 'modern'>('traditional');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Low Carb', 'High Protein', 'Vegetarian', 'Gluten Free'];

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter(recipe => {
      const matchesMode = recipe.type === activeMode;
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = nutritionFilter === 'All' || recipe.tags.includes(nutritionFilter);
      return matchesMode && matchesSearch && matchesFilter;
    });
  }, [activeMode, searchQuery, nutritionFilter]);

  const getMissingIngredients = (recipe: Recipe) => {
    return recipe.ingredients.filter((ri: string) => 
      !mockPantry.some(pi => pi.name.toLowerCase().includes(ri.toLowerCase()))
    );
  };

  const handleScale = (delta: number) => {
    const next = servings + delta;
    if (next >= 1) {
      setServings(next);
      toast.info(`Recipe scaled for ${next} servings`, {
        description: "Ingredient quantities adjusted automatically."
      });
    }
  };

  const handleShare = (recipe: Recipe) => {
    toast.success("Shared!", {
      description: `Recipe for ${recipe.title} shared to your social circle.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Explore Recipes</h1>
          <p className="text-slate-500">Discover authentic tastes and modern healthy meals.</p>
        </div>
        
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center shadow-sm">
          <Button
            variant={activeMode === 'traditional' ? "default" : "ghost"}
            className={cn(
              "rounded-xl h-10 px-6 font-bold transition-all",
              activeMode === 'traditional' ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"
            )}
            onClick={() => {
              setActiveMode('traditional');
              setSelectedRecipe(null);
            }}
          >
            <Globe size={18} className="mr-2" />
            Traditional African
          </Button>
          <Button
            variant={activeMode === 'modern' ? "default" : "ghost"}
            className={cn(
              "rounded-xl h-10 px-6 font-bold transition-all",
              activeMode === 'modern' ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"
            )}
            onClick={() => {
              setActiveMode('modern');
              setSelectedRecipe(null);
            }}
          >
            <Sparkles size={18} className="mr-2" />
            Modern Global
          </Button>
        </div>
      </div>

      {activeMode === 'traditional' && !selectedRecipe ? (
        <TraditionalExplorer onSelectRecipe={setSelectedRecipe} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input 
                  placeholder={activeMode === 'traditional' ? "Search traditional dishes..." : "Search global recipes..."}
                  className="pl-10 h-12 rounded-2xl bg-white border-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-[200px] md:max-w-none">
                {filters.map(filter => (
                  <Button 
                    key={filter}
                    variant={nutritionFilter === filter ? "default" : "outline"}
                    className={cn(
                      "rounded-xl h-9 text-[10px] uppercase tracking-wider font-bold shrink-0",
                      nutritionFilter === filter ? "bg-emerald-600 hover:bg-emerald-700" : "border-slate-200 bg-white"
                    )}
                    onClick={() => setNutritionFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4 h-[calc(100vh-280px)] overflow-auto pr-2 custom-scrollbar pb-10">
              {filteredRecipes.map((recipe) => {
                const missing = getMissingIngredients(recipe);
                return (
                  <Card 
                    key={recipe.id} 
                    className={cn(
                      "cursor-pointer transition-all border-none shadow-sm hover:shadow-xl hover:translate-x-1",
                      selectedRecipe?.id === recipe.id ? "ring-2 ring-emerald-600 bg-emerald-50/30" : "bg-white"
                    )}
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <CardContent className="p-0 flex flex-col sm:flex-row">
                      <div className="w-full sm:w-44 h-44 relative">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none" />
                        {recipe.type === 'traditional' && (
                          <div className="absolute bottom-2 left-2">
                             <Badge className="bg-white/90 backdrop-blur-sm text-emerald-800 border-none text-[10px] font-bold">
                               {recipe.country}
                             </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900">{recipe.title}</h3>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                              {recipe.matchRate}% Match
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-slate-400 text-xs font-medium">
                            <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.time}</span>
                            <span className="flex items-center gap-1.5"><Users size={14} /> {servings} servings</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {missing.length === 0 ? (
                              <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
                                <CheckCircle2 size={12} /> Ready to cook
                              </span>
                            ) : (
                              <span className="text-orange-600 text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
                                <AlertCircle size={12} /> {missing.length} missing
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {recipe.tags.slice(0, 2).map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 border-none font-bold">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredRecipes.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No recipes found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          <div className="sticky top-0">
            <AnimatePresence mode="wait">
              {selectedRecipe ? (
                <motion.div
                  key={selectedRecipe.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden h-[calc(100vh-220px)] flex flex-col"
                >
                  <div className="h-64 relative group">
                    <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                       <Button 
                        variant="ghost" 
                        size="icon"
                        className="bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 p-0 text-slate-900 shadow-sm"
                        onClick={() => handleShare(selectedRecipe)}
                      >
                        <Share2 size={18} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 p-0 text-slate-900 shadow-sm"
                        onClick={() => setSelectedRecipe(null)}
                      >
                        <span className="text-2xl">&times;</span>
                      </Button>
                    </div>
                    {selectedRecipe.type === 'traditional' && (
                      <div className="absolute bottom-4 left-6">
                        <Badge className="bg-emerald-600 text-white border-none py-1.5 px-4 rounded-xl text-xs font-bold shadow-lg">
                          Authentic {selectedRecipe.country} Dish
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8 flex-1 overflow-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-900">{selectedRecipe.title}</h2>
                        {selectedRecipe.culturalContext && (
                          <p className="text-slate-500 text-sm mt-2 leading-relaxed italic">
                            "{selectedRecipe.culturalContext}"
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mb-8">
                      <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Time</span>
                        <span className="font-bold text-slate-900 text-sm">{selectedRecipe.time}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Skill</span>
                        <span className="font-bold text-slate-900 text-sm">{selectedRecipe.difficulty}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Calories</span>
                        <span className="font-bold text-slate-900 text-sm">{selectedRecipe.calories || '450 kcal'}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-slate-900 text-sm">4.9</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Utensils size={20} className="text-emerald-600" />
                          Ingredients
                        </h3>
                        <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-xl">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white" onClick={() => handleScale(-1)}>-</Button>
                          <span className="text-sm font-bold w-6 text-center">{servings}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white" onClick={() => handleScale(1)}>+</Button>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {selectedRecipe.ingredients.map((ing: string, i: number) => {
                          const scaled = scaleRecipe(ing, servings, 4);
                          const isMissing = !mockPantry.some(pi => pi.name.toLowerCase().includes(ing.toLowerCase()));
                          const sub = isMissing ? suggestSubstitution(ing) : null;
                          
                          return (
                            <li key={i} className="flex flex-col gap-2">
                              <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "w-3 h-3 rounded-full shadow-inner",
                                    isMissing ? "bg-orange-400" : "bg-emerald-500"
                                  )} />
                                  <span className={cn(
                                    "text-sm font-semibold",
                                    isMissing ? "text-slate-900" : "text-slate-500 line-through decoration-emerald-200"
                                  )}>
                                    {scaled}
                                  </span>
                                </div>
                                {isMissing && <Badge className="bg-orange-50 text-orange-700 text-[10px] border-none font-bold">MISSING</Badge>}
                              </div>
                              {sub && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="ml-6 p-3 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center gap-3 text-xs text-blue-800 font-medium"
                                >
                                  <Sparkles size={16} className="shrink-0 text-blue-500" />
                                  <span>AI Recommendation: {sub} works as a perfect substitute.</span>
                                </motion.div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-emerald-600" />
                        Cooking Steps
                      </h3>
                      <div className="space-y-6">
                        {selectedRecipe.instructions.map((step, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                                {i + 1}
                              </div>
                              {i < selectedRecipe.instructions.length - 1 && (
                                <div className="w-0.5 h-full bg-emerald-100 rounded-full" />
                              )}
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed py-1">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 sticky bottom-0 bg-white pt-4 border-t border-slate-50 mt-10 pb-2">
                      <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95">
                        Start Cooking Mode
                      </Button>
                      <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-slate-200">
                        <Bookmark size={20} className="text-slate-600" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 h-[calc(100vh-220px)] flex flex-col items-center justify-center text-center p-12">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-slate-200 mb-8 animate-pulse">
                    <Utensils size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Choose your flavor</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mt-4 leading-relaxed font-medium">
                    Select a recipe from the list to see ingredients, AI substitutions, and traditional insights.
                  </p>
                  <div className="mt-8 flex gap-2">
                    <Badge variant="outline" className="bg-white border-slate-200 text-slate-400 font-bold px-4 py-1.5 rounded-full">
                      8 Recipes Ready
                    </Badge>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}