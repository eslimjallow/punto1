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
    <div className="h-20 bg-white/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between border-b border-border lg:ml-64">
      <div className="flex flex-col min-w-0">
        <h1 className="text-lg md:text-xl font-bold font-sans truncate">Hola, Alex! 👋</h1>
        <p className="text-[10px] md:text-sm text-slate-500 font-medium truncate">Ready for your mission?</p>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-1 md:gap-3 bg-slate-100 px-2 md:px-4 py-1.5 md:py-2 rounded-full">
          <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
          <div className="hidden sm:flex items-baseline gap-1">
            <span className="font-black text-slate-700 text-xs md:text-base">{energy}/30</span>
          </div>
          <button 
            onClick={onAddEnergy}
            className="text-primary font-black text-sm md:text-lg ml-1 md:ml-2 cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1 md:gap-3 bg-slate-100 px-2 md:px-4 py-1.5 md:py-2 rounded-full">
          <Gem className="w-4 h-4 md:w-5 md:h-5 text-purple-500 fill-purple-500" />
          <span className="font-black text-slate-700 text-xs md:text-base">{userGems}</span>
          <button 
            onClick={onAddGems}
            className="text-primary font-black text-sm md:text-lg ml-1 md:ml-2 cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1 md:gap-3 bg-slate-100 px-4 py-2 rounded-full">
          <Coins className="w-5 h-5 text-secondary fill-secondary" />
          <span className="font-black text-slate-700">{userXp.toLocaleString()}</span>
          <button 
            onClick={onAddXp}
            className="text-primary font-black text-lg ml-2 cursor-pointer"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4 border-l border-slate-200 pl-2 md:pl-6 h-8">
          <button 
            onClick={() => alert("No new notifications")}
            className="relative text-slate-400 hover:text-primary transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
          </button>
          
          <div 
            onClick={() => alert("Profile settings coming soon!")}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-primary overflow-hidden cursor-pointer"
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
