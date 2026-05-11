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
import { INITIAL_LESSONS, NAVIGATION_ITEMS } from './constants';
import { Home, Book, Trophy, Users, BarChart, User } from 'lucide-react';

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
            <Leaderboard onViewAll={() => { }} />
            <div className="p-8 bg-white rounded-3xl border border-border shadow-sm text-center space-y-4">
              <div className="text-5xl">🏆</div>
              <h3 className="text-xl font-bold">You are in the Top 10%</h3>
              <p className="text-slate-500 italic">Keep practicing to reach the Diamond League.</p>
              <button onClick={() => setActiveTab('home')} className="game-button-primary">BACK TO MISSIONS</button>
            </div>
          </div>
        );
      case 'challenges':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-800 italic uppercase tracking-wider">Active Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'The Polyglot', desc: 'Reach 500 XP in one day', progress: 120, total: 500, icon: '🔥' },
                { title: 'Chatterbox', desc: 'Complete 10 speaking lessons', progress: 3, total: 10, icon: '🗣️' },
                { title: 'Bookworm', desc: 'Read 5 stories in one week', progress: 1, total: 5, icon: '📚' },
                { title: 'Elite Streak', desc: 'Maintain a 30-day streak', progress: 14, total: 30, icon: '🛡️' },
              ].map((c, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{c.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{c.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{c.desc}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Progress</span>
                      <span>{Math.round((c.progress / c.total) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${(c.progress / c.total) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'friends':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-800">Your Connection</h2>
              <button className="game-button-primary !py-2 !px-4 text-xs">ADD FRIEND</button>
            </div>
            <div className="bg-white rounded-3xl border border-border overflow-hidden">
              {[
                { name: 'Sarah Miller', level: 12, xp: 2450, online: true },
                { name: 'James Wilson', level: 8, xp: 1200, online: false },
                { name: 'Elena Petrova', level: 15, xp: 3890, online: true },
                { name: 'Lucas Rossi', level: 5, xp: 450, online: false },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0 border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${f.name}`} alt={f.name} />
                    </div>
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${f.online ? 'bg-green-500' : 'bg-slate-300'}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{f.name}</h4>
                    <p className="text-xs text-slate-500 font-bold">Level {f.level} • {f.xp} XP</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-primary transition-colors italic font-bold text-xs uppercase tracking-widest">Profile</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'shop':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-slate-800">Diamond Store</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Streak Freeze', desc: 'Allows your streak to remain active for one day of inactivity.', price: 200, img: '❄️' },
                { name: 'Energy Refill', desc: 'Instantly refills your energy to maximum.', price: 100, img: '⚡' },
                { name: 'Double XP', desc: 'Earn double XP for all lessons for the next 30 minutes.', price: 150, img: '💎' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex flex-col items-center text-center space-y-4 hover:shadow-xl transition-all">
                  <span className="text-6xl">{item.img}</span>
                  <div>
                    <h4 className="font-black text-slate-800">{item.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  <button 
                    onClick={() => {
                        if (userGems >= item.price) {
                            setUserGems(prev => prev - item.price);
                            alert(`You bought ${item.name}!`);
                        } else {
                            alert("Not enough gems!");
                        }
                    }}
                    className="game-button-secondary w-full flex items-center justify-center gap-2"
                  >
                    <span className="font-black">{item.price}</span>
                    <span className="text-xs">GEMS</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                  <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Gold League</span>
               </div>
               <div className="w-32 h-32 rounded-full border-4 border-primary p-1 bg-white shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full object-cover" />
                  </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-black text-slate-800">Alex Jallow</h2>
                  <p className="text-slate-500 font-medium">Learning English since May 2024</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                    <div className="text-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                       <p className="text-2xl font-black text-primary">{userXp.toLocaleString()}</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total XP</p>
                    </div>
                    <div className="text-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                       <p className="text-2xl font-black text-secondary">14</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Streak</p>
                    </div>
                    <div className="text-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                       <p className="text-2xl font-black text-accent">5</p>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Level</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="col-span-2 bg-white p-8 rounded-[2rem] border border-border shadow-sm">
                  <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-wider">Achievements</h3>
                  <div className="grid grid-cols-4 gap-4">
                     {['🎖️', '🥈', '🌟', '🛡️', '⚡', '🏆', '🔥', '📚'].map((emoji, i) => (
                       <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center text-3xl border-2 ${i < 5 ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-100 grayscale opacity-30'}`}>
                          {emoji}
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-sidebar p-8 rounded-[2rem] text-white space-y-6">
                  <h3 className="text-lg font-black uppercase tracking-widest">Statistics</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Lessons', val: '124' },
                      { label: 'Words Learned', val: '850' },
                      { label: 'Perfect Days', val: '8' },
                      { label: 'Time Spent', val: '12.5h' },
                    ].map((s, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase leading-normal tracking-wider">{s.label}</span>
                        <span className="font-black text-secondary">{s.val}</span>
                      </div>
                    ))}
                  </div>
               </div>
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8F9FF]">
      {/* Desktop Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        className="hidden lg:flex"
      />
      
      {/* Mobile/Tablet Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-sidebar border-t border-white/10 z-50 flex items-center justify-around px-2">
        {NAVIGATION_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon === 'Home' ? Home : item.icon === 'Book' ? Book : item.icon === 'Trophy' ? Trophy : item.icon === 'Users' ? Users : item.icon === 'BarChart' ? BarChart : User;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === item.id ? 'text-secondary' : 'text-slate-400'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </button>
          )
        })}
      </div>

      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <TopNav 
          userXp={userXp} 
          userGems={userGems} 
          energy={energy}
          onAddEnergy={handleRefillEnergy}
          onAddGems={handleAddGems}
          onAddXp={handleAddXp}
        />
        
        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8 h-[calc(100vh-80px)] scrollbar-hide lg:ml-64">
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
