import { motion } from 'motion/react';
import { 
  BarChart, 
  Book, 
  Home, 
  ShoppingBag, 
  Trophy, 
  User, 
  Users,
  Flame
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'learn', label: 'Learn', icon: Book },
  { id: 'challenges', label: 'Challenges', icon: Trophy },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'ranking', label: 'Ranking', icon: BarChart },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'profile', label: 'Profile', icon: User },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col text-white fixed left-0 top-0 overflow-y-auto">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Trophy className="text-secondary w-6 h-6" />
        </div>
        <span className="text-xl font-black uppercase tracking-wider">
          English <span className="text-secondary">Quest</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors font-semibold group cursor-pointer ${
              item.id === activeTab 
                ? 'bg-sidebar-active text-white' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-white/5 rounded-2xl p-4 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-2">Daily Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">14</span>
              <span className="text-sm text-slate-400 font-bold">days</span>
            </div>
            <p className="text-xs text-green-400 font-bold mt-2 font-mono">Keep it up!</p>
          </div>
          <Flame className="absolute -right-2 top-0 w-24 h-24 text-accent/10 -rotate-12 group-hover:text-accent/20 transition-all duration-500" />
          <div className="mt-4">
             {/* Character placeholder */}
             <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full border-4 border-primary flex items-center justify-center">
                <span className="text-3xl">🤖</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
