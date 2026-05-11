import { motion } from 'motion/react';
import { 
  Zap, 
  Gem, 
  Coins, 
  Bell
} from 'lucide-react';

interface TopNavProps {
  userXp: number;
  userGems: number;
  energy: number;
  onAddEnergy: () => void;
  onAddGems: () => void;
  onAddXp: () => void;
}

export default function TopNav({ userXp, userGems, energy, onAddEnergy, onAddGems, onAddXp }: TopNavProps) {
  return (
    <div className="h-20 bg-white/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between border-b border-border ml-64">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold font-sans">Hola, Alex! 👋</h1>
        <p className="text-sm text-slate-500 font-medium">Ready for your daily mission?</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full">
          <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <div className="flex items-baseline gap-1">
            <span className="font-black text-slate-700">{energy}/30</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">in 10:45</span>
          </div>
          <button 
            onClick={onAddEnergy}
            className="text-primary font-black text-lg ml-2 cursor-pointer hover:scale-125 transition-transform"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full">
          <Gem className="w-5 h-5 text-purple-500 fill-purple-500" />
          <span className="font-black text-slate-700">{userGems}</span>
          <button 
            onClick={onAddGems}
            className="text-primary font-black text-lg ml-2 cursor-pointer hover:scale-125 transition-transform"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full">
          <Coins className="w-5 h-5 text-secondary fill-secondary" />
          <span className="font-black text-slate-700">{userXp.toLocaleString()}</span>
          <button 
            onClick={onAddXp}
            className="text-primary font-black text-lg ml-2 cursor-pointer hover:scale-125 transition-transform"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200 pl-6 h-8">
          <button 
            onClick={() => alert("No new notifications")}
            className="relative text-slate-400 hover:text-primary transition-colors cursor-pointer"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white"></span>
          </button>
          
          <div 
            onClick={() => alert("Profile settings coming soon!")}
            className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden cursor-pointer hover:scale-110 transition-transform"
          >
             <img 
               src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
               alt="User Avatar" 
               className="w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
