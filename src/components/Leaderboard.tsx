import { motion } from 'motion/react';
import { Trophy, ChevronRight, TrendingUp } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Mariana', xp: 950, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana' },
  { rank: 2, name: 'Alex (tú)', xp: 820, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', current: true },
  { rank: 3, name: 'Carlos', xp: 610, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos' },
  { rank: 4, name: 'Sofia', xp: 480, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia' },
  { rank: 5, name: 'Daniel', xp: 320, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel' },
];

interface LeaderboardProps {
  onViewAll: () => void;
}

export default function Leaderboard({ onViewAll }: LeaderboardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-border shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-secondary/20 rounded-lg">
             <Trophy className="w-5 h-5 text-secondary" />
           </div>
           <h3 className="font-bold leading-normal">Weekly Challenge</h3>
        </div>
        <button 
          onClick={onViewAll}
          className="text-primary text-sm font-bold flex items-center gap-1 leading-normal cursor-pointer hover:underline"
        >
          View all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {MOCK_LEADERBOARD.map((user) => (
          <div 
            key={user.rank} 
            className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
              user.current ? 'bg-primary/5 border border-primary/20' : 'hover:bg-slate-50'
            }`}
          >
            <span className={`w-6 text-sm font-black text-center ${
              user.rank === 1 ? 'text-yellow-500' : 
              user.rank === 2 ? 'text-slate-400' : 
              user.rank === 3 ? 'text-orange-400' : 'text-slate-400'
            }`}>
              {user.rank}
            </span>
            
            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
               <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <p className={`text-sm font-bold ${user.current ? 'text-primary' : 'text-slate-700'} leading-normal`}>
                {user.name}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-black text-slate-900 leading-normal">{user.xp} XP</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-100 italic">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 leading-normal uppercase tracking-wider">
           <span>Competition ends in:</span>
           <div className="flex items-center gap-1 text-slate-900">
             <TrendingUp className="w-3 h-3 text-green-500" />
             <span>3d 12h 45m</span>
           </div>
        </div>
      </div>
    </div>
  );
}
