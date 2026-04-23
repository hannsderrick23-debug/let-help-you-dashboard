import { Sparkles, ArrowRight, Zap, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function MealPrep() {
  const commonIngredients = ["Onions", "Garlic", "Olive Oil", "Bell Peppers"];
  
  return (
    <div className="space-y-6">
      <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-emerald-500 text-white border-none mb-4">ML Optimization Active</Badge>
          <h1 className="text-4xl font-bold mb-4">Meal Prep Optimization</h1>
          <p className="text-emerald-100 text-lg mb-6">
            Our AI analyzed your pantry and selected recipes. We've optimized the workflow to minimize waste and save you 45 minutes of prep time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 h-12 rounded-xl">
              Generate Prep List
            </Button>
            <Button variant="outline" className="border-emerald-700 text-white hover:bg-emerald-800 font-bold h-12 rounded-xl">
              Custom Optimization
            </Button>
          </div>
        </div>
        <div className="absolute top-10 right-10 opacity-10">
          <Zap size={200} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <RefreshCcw size={24} className="text-emerald-600" />
            Common Prep Ingredients
          </h2>
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Ingredient</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Used In</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Total Quantity</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {commonIngredients.map((ing, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">{ing}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(j => (
                            <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                              <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${j}`} alt="Recipe" />
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">350g total</td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="text-emerald-600 font-bold p-0">Prep Now</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Efficiency Insights</h2>
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">Waste Reduction</span>
                  <span className="text-sm font-bold text-emerald-600">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-slate-100 [&>div]:bg-emerald-600" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-600">Time Optimization</span>
                  <span className="text-sm font-bold text-blue-600">85%</span>
                </div>
                <Progress value={85} className="h-2 bg-slate-100 [&>div]:bg-blue-600" />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">Smart Tip</h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Pre-chopping all your <span className="text-emerald-600 font-bold">Onions</span> and <span className="text-emerald-600 font-bold">Garlic</span> together will save you approximately 12 minutes of active prep time.
                </p>
              </div>

              <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-bold">
                Download Prep PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: any) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", className)}>
      {children}
    </span>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}