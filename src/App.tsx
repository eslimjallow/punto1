/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import MissionCard from './components/MissionCard';
import LessonPath from './components/LessonPath';
import Leaderboard from './components/Leaderboard';
import ImmersionSection from './components/ImmersionSection';
import LessonModal from './components/LessonModal';
import { AnimatePresence } from 'motion/react';
import { INITIAL_LESSONS } from './constants';

export default function App() {
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [userXp, setUserXp] = useState(1250);
  const [userGems, setUserGems] = useState(320);
  const [energy, setEnergy] = useState(25);

  const handleLessonComplete = (xp: number) => {
    if (energy <= 0) {
      alert("No energy left! Wait for refill or use gems.");
      setSelectedLessonId(null);
      return;
    }
    setUserXp(prev => prev + xp);
    setUserGems(prev => prev + 50); // Bonus gems on completion
    setEnergy(prev => Math.max(0, prev - 2));
    setSelectedLessonId(null);
  };

  const handleRefillEnergy = () => {
    if (userGems >= 100) {
      setUserGems(prev => prev - 100);
      setEnergy(30);
    } else {
      alert("Not enough gems to refill energy! You need 100 gems.");
    }
  };

  const handleAddGems = () => {
    setUserGems(prev => prev + 100);
  };

  const handleAddXp = () => {
    setUserXp(prev => prev + 100);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-8">
              <MissionCard onContinue={() => setSelectedLessonId('1')} />
              <LessonPath onSelectLesson={(id) => setSelectedLessonId(id)} />
            </div>
            
            <div className="space-y-8">
              <Leaderboard onViewAll={() => setActiveTab('ranking')} />
              
              <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 relative overflow-hidden">
                 <div className="relative z-10">
                   <h4 className="text-primary font-black mb-2 leading-tight">Invite your friends</h4>
                   <p className="text-xs text-slate-500 font-bold mb-4 leading-normal">
                     Earn 50 gems for every friend who joins!
                   </p>
                   <button 
                     onClick={() => {
                        alert("Invite code copied! Send this to your friends: QUEST-582");
                     }}
                     className="game-button-primary !py-2 !px-4 text-xs w-full cursor-pointer"
                   >
                     INVITE FRIENDS
                   </button>
                 </div>
                 <div className="absolute -bottom-4 -right-4 text-6xl opacity-10 rotate-12">
                   🤝
                 </div>
              </div>
            </div>
          </div>
        );
      case 'learn':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-800">Learning Path</h2>
            <LessonPath onSelectLesson={(id) => setSelectedLessonId(id)} />
          </div>
        );
      case 'ranking':
          return (
            <div className="max-w-2xl mx-auto space-y-8">
               <h2 className="text-2xl font-black text-slate-800">Global Ranking</h2>
               <Leaderboard onViewAll={() => {}} />
               <div className="p-8 bg-white rounded-3xl border border-border shadow-sm text-center space-y-4">
                  <div className="text-5xl">🏆</div>
                  <h3 className="text-xl font-bold">You are in the Top 10%</h3>
                  <p className="text-slate-500 italic">Keep practicing to reach the Diamond League.</p>
                  <button onClick={() => setActiveTab('home')} className="game-button-primary">BACK TO MISSIONS</button>
               </div>
            </div>
          );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="text-6xl">🚧</div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-widest">{activeTab} section is under construction</h2>
            <p className="text-slate-500 font-medium">We are working hard to bring you more English quests!</p>
            <button 
              onClick={() => setActiveTab('home')}
              className="game-button-primary"
            >
              BACK TO HOME
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopNav 
          userXp={userXp} 
          userGems={userGems} 
          energy={energy}
          onAddEnergy={handleRefillEnergy}
          onAddGems={handleAddGems}
          onAddXp={handleAddXp}
        />
        
        <div className="flex-1 overflow-y-auto px-8 py-8 h-[calc(100vh-80px)] scrollbar-hide ml-64">
          <div className="max-w-6xl mx-auto space-y-8 pb-12">
            
            {renderContent()}

            {activeTab === 'home' && <ImmersionSection onSelect={() => setActiveTab('learn')} />}
            
          </div>
        </div>
      </main>

      <AnimatePresence>
        {selectedLessonId && (
          <LessonModal 
            lesson={INITIAL_LESSONS.find(l => l.id === selectedLessonId)!} 
            onClose={() => setSelectedLessonId(null)}
            onComplete={handleLessonComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
