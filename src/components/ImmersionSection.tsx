import { motion } from 'motion/react';
import { Book, Play, Podcast, MessageCircle, Calendar } from 'lucide-react';

const IMMERSION_CONTENT = [
  { id: '1', title: 'Stories', description: 'Improve your reading', icon: Book, color: 'text-purple-500', bg: 'bg-purple-100' },
  { id: '2', title: 'Videos', description: 'Learn with videos', icon: Play, color: 'text-green-500', bg: 'bg-green-100' },
  { id: '3', title: 'Podcasts', icon: Podcast, description: 'Listen and understand', color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: '4', title: 'Conversations', icon: MessageCircle, description: 'Speak with confidence', color: 'text-indigo-500', bg: 'bg-indigo-100' },
  { id: '5', title: 'Live Events', icon: Calendar, description: 'Practice live', color: 'text-accent', bg: 'bg-red-100' },
];

export default function ImmersionSection({ onSelect }: { onSelect: () => void }) {
  return (
    <div className="py-8">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-3 leading-normal">
        Learn through immersion
        <span className="w-2 h-2 bg-primary rounded-full"></span>
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        {IMMERSION_CONTENT.map((content) => (
          <motion.div
            key={content.id}
            whileHover={{ y: -5 }}
            onClick={onSelect}
            className="p-3 md:p-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shrink-0 ${content.bg}`}>
              <content.icon className={`w-5 h-5 md:w-6 md:h-6 ${content.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xs md:text-sm font-bold text-slate-800 leading-tight truncate">{content.title}</p>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-medium leading-tight mt-1 hidden xs:block">{content.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
