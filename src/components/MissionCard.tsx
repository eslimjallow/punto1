import { motion } from 'motion/react';
import { Trophy, ChevronRight } from 'lucide-react';
import { DAILY_MISSIONS } from '../constants';

interface MissionCardProps {
  onContinue: () => void;
}

export default function MissionCard({ onContinue }: MissionCardProps) {
  const mission = DAILY_MISSIONS[0];
  const percentage = (mission.progress / mission.goal) * 100;

  return (
    <div className="relative overflow-hidden bg-primary rounded-3xl p-8 text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full -ml-10 -mb-10 blur-2xl"></div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 items-center">
        <div>
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 leading-normal">
            Daily Mission
          </span>
          <h2 className="text-3xl font-black mb-6 leading-tight">
            {mission.title}
          </h2>
          
          <div className="space-y-4 max-w-sm">
            <div className="flex justify-between items-end mb-1">
               <span className="text-sm font-bold text-white/80">{mission.progress} / {mission.goal}</span>
            </div>
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${percentage}%` }}
                 transition={{ duration: 1, ease: "easeOut" }}
                 className="h-full bg-secondary rounded-full"
               />
            </div>
            
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-secondary" />
                <span className="text-sm font-black">{mission.reward.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black">🪙 {mission.reward.gems} coins</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-56 h-56 relative group">
             {/* Character SVG or Placeholder */}
             <div className="w-full h-full bg-white/10 rounded-3xl border-2 border-white/20 p-4 relative overflow-hidden">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="w-full h-full flex items-center justify-center text-8xl"
                >
                  🏰
                </motion.div>
                <div className="absolute bottom-2 right-2 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-black">
                   LEVEL 5
                </div>
             </div>
          </div>
          <button 
            onClick={onContinue}
            className="game-button-secondary mt-8 w-full cursor-pointer"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
