import { 
  LayoutDashboard, 
  Refrigerator, 
  UtensilsCrossed, 
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  LogOut,
  Sparkles,
  Map
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: any;
  onLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, user, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pantry', label: 'My Pantry', icon: Refrigerator },
    { id: 'recipes', label: 'Explore', icon: UtensilsCrossed },
    { id: 'meal-prep', label: 'Meal Prep', icon: ChefHat },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-slate-100 z-50 transition-all duration-300 flex flex-col shadow-sm",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-3 font-black text-xl text-emerald-600 tracking-tight">
            <div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <ChefHat size={22} />
            </div>
            <span>SmartChef</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "rounded-xl hover:bg-slate-50",
            isOpen ? "ml-auto" : "mx-auto"
          )}
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </Button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-[20px] transition-all group relative",
              activeTab === item.id 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <item.icon className={cn(
              "shrink-0",
              activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-slate-600"
            )} size={22} />
            {isOpen && <span className="font-bold tracking-tight">{item.label}</span>}
            {activeTab === item.id && !isOpen && (
               <div className="absolute right-0 w-1.5 h-6 bg-emerald-600 rounded-l-full" />
            )}
          </button>
        ))}

        <div className="pt-8 px-2">
           <div className={cn(
             "p-4 rounded-3xl bg-emerald-50 border border-emerald-100/50 relative overflow-hidden",
             !isOpen && "hidden"
           )}>
              <div className="relative z-10">
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Current Region</p>
                <div className="flex items-center gap-2">
                  <Map size={14} className="text-emerald-600" />
                  <p className="text-sm font-bold text-emerald-900">{user.country}</p>
                </div>
              </div>
              <Sparkles className="absolute -right-2 -bottom-2 text-emerald-100 w-12 h-12 rotate-12" />
           </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-50 space-y-2">
        <button className={cn(
          "w-full flex items-center gap-4 p-4 rounded-[20px] text-slate-500 hover:bg-slate-50 transition-all",
          !isOpen && "justify-center"
        )}>
          <Settings size={22} className="text-slate-400" />
          {isOpen && <span className="font-bold tracking-tight">Settings</span>}
        </button>
        <button 
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-[20px] text-red-500 hover:bg-red-50 transition-all",
            !isOpen && "justify-center"
          )}
        >
          <LogOut size={22} />
          {isOpen && <span className="font-bold tracking-tight">Logout</span>}
        </button>
      </div>
    </aside>
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