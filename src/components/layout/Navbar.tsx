import { Bell, Search, User, Share2, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  onToggleSidebar: () => void;
  user: any;
}

export function Navbar({ onToggleSidebar, user }: NavbarProps) {
  const handleShare = () => {
    toast.success("Sharing options opened!", {
      description: "You can share your pantry and recipes to Facebook, Instagram, and more."
    });
  };

  const initials = user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
          <Input 
            placeholder="Search recipes, ingredients, or cultural facts..." 
            className="pl-11 bg-slate-50 border-none h-12 rounded-2xl ring-offset-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
           <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-50 relative">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-50" onClick={handleShare}>
            <Share2 size={20} className="text-slate-600" />
          </Button>
        </div>
        
        <div className="h-8 w-px bg-slate-100 mx-2" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-2 focus:outline-none group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.country}</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-black border-4 border-emerald-50 shadow-lg shadow-emerald-100 group-hover:scale-105 transition-transform">
                {initials}
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 rounded-[24px] p-2 border-slate-100 shadow-2xl" align="end">
            <DropdownMenuLabel className="px-4 py-3">
              <p className="text-sm font-bold text-slate-900">My Account</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="rounded-xl px-4 py-2.5 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
              <User className="mr-3 h-4 w-4" />
              <span className="font-bold">Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl px-4 py-2.5 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
              <SettingsIcon className="mr-3 h-4 w-4" />
              <span className="font-bold">Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-50" />
            <DropdownMenuItem className="rounded-xl px-4 py-2.5 focus:bg-red-50 focus:text-red-600 cursor-pointer text-red-500">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}