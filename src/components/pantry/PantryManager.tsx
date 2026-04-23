import { useState, useRef } from 'react';
import { 
  Search, 
  Plus, 
  Camera, 
  Trash2, 
  History, 
  Calendar,
  AlertCircle,
  Scan,
  Refrigerator
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { mockPantry } from '@/lib/mock-data';
import { normalizeIngredient } from '@/lib/ai-logic';
import { motion, AnimatePresence } from 'framer-motion';

interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expiryDate: string;
  daysLeft: number;
  icon: string;
  isNormalized?: boolean;
}

export function PantryManager() {
  const [pantry, setPantry] = useState<PantryItem[]>(mockPantry);
  const [search, setSearch] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPantry = pantry.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (e.target as any).elements.itemInput.value;
    if (!input) return;

    const normalized = normalizeIngredient(input);
    const newItem: PantryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: normalized.name,
      category: 'Produce',
      quantity: '1 unit',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      daysLeft: 7,
      icon: '🥗',
      isNormalized: normalized.isNormalized
    };

    setPantry([newItem, ...pantry]);
    (e.target as any).reset();
    
    if (normalized.isNormalized) {
      toast.success(`Recognized "${input}" as "${normalized.name}"`, {
        description: "NLP engine matched the synonym."
      });
    } else {
      toast.success(`Added ${normalized.name} to pantry`);
    }
  };

  const handleVisualSearch = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setTimeout(() => {
        setIsScanning(false);
        const identified = "Red Bell Pepper";
        toast.success(`Image Analysis Complete!`, {
          description: `Identified: ${identified}. Adding to pantry...`
        });
        setPantry([{
          id: Math.random().toString(36).substr(2, 9),
          name: identified,
          category: 'Produce',
          quantity: '2 units',
          expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          daysLeft: 5,
          icon: '🫑'
        }, ...pantry]);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Digital Pantry</h1>
          <p className="text-slate-500">Manage your ingredients and track expiration dates.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200" onClick={() => toast.info("Exporting pantry list...")}>
            <History size={18} className="mr-2" /> History
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl" onClick={handleVisualSearch}>
            <Camera size={18} className="mr-2" /> Visual Search
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search your pantry..." 
            className="pl-10 h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <form onSubmit={handleAddItem} className="flex gap-2">
          <Input 
            name="itemInput"
            placeholder="Add new ingredient..." 
            className="h-12 w-full md:w-64 rounded-xl"
          />
          <Button type="submit" className="h-12 w-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white p-0">
            <Plus size={24} />
          </Button>
        </form>
      </div>

      {isScanning && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl flex flex-col items-center text-center gap-4"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm relative">
            <Scan size={32} className="animate-pulse" />
            <div className="absolute inset-0 border-2 border-emerald-400 rounded-full animate-ping" />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 text-lg">Analyzing Image...</h3>
            <p className="text-emerald-700">Our AI is identifying ingredients from your photo.</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {filteredPantry.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group overflow-hidden border-slate-200 hover:border-emerald-200 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-emerald-50 transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-1">
                          {item.name}
                          {item.isNormalized && <Badge variant="secondary" className="text-[10px] h-4 bg-blue-50 text-blue-600 border-none">AI Match</Badge>}
                        </h4>
                        <p className="text-xs text-slate-500">{item.category} • {item.quantity}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => setPantry(pantry.filter(p => p.id !== item.id))}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar size={12} />
                      <span>Exp: {item.expiryDate}</span>
                    </div>
                    <span className={cn(
                      "font-semibold px-2 py-0.5 rounded-full",
                      item.daysLeft <= 3 ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {item.daysLeft} days left
                    </span>
                  </div>
                  
                  {item.daysLeft <= 3 && (
                    <div className="mt-3 p-2 bg-orange-50 border border-orange-100 rounded-lg flex items-center gap-2 text-[10px] text-orange-800 font-medium">
                      <AlertCircle size={12} />
                      AI Suggestion: Use in Stir Fry today!
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredPantry.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <Refrigerator size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Your pantry is empty</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">Start adding ingredients or use Visual Search to scan your fridge.</p>
          <Button className="mt-6 bg-slate-900 text-white rounded-xl">Add First Item</Button>
        </div>
      )}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}