import { motion } from 'motion/react';
import { Star, Lock } from 'lucide-react';
import { INITIAL_LESSONS } from '../constants';
import { Headset, MessageSquare, BookOpen, PenTool } from 'lucide-react';

const ICON_MAP = {
  listening: Headset,
  speaking: MessageSquare,
  reading: BookOpen,
  writing: PenTool,
};

const COLOR_MAP = {
   listening: 'bg-purple-100 text-purple-600 border-purple-200',
   speaking: 'bg-green-100 text-green-600 border-green-200',
   reading: 'bg-blue-100 text-blue-600 border-blue-200',
   writing: 'bg-orange-100 text-orange-600 border-orange-200',
}

const LINE_COLOR_MAP = {
   listening: 'border-purple-200',
   speaking: 'border-green-200',
   reading: 'border-blue-200',
   writing: 'border-orange-200',
}

export default function LessonPath({ onSelectLesson }: { onSelectLesson: (id: string) => void }) {
  return (
    <div className="py-12">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3 leading-normal">
        Your learning path
        <span className="w-2 h-2 bg-primary rounded-full"></span>
      </h3>

      <div className="relative flex justify-between items-start gap-4">
        {INITIAL_LESSONS.map((lesson, index) => {
          const Icon = ICON_MAP[lesson.type as keyof typeof ICON_MAP] || BookOpen;
          
          return (
            <div key={lesson.id} className="flex-1 flex flex-col items-center group relative">
              {/* Connector line */}
              {index < INITIAL_LESSONS.length - 1 && (
                <div className={`absolute top-10 left-[70%] w-full border-t-4 border-dashed ${LINE_COLOR_MAP[lesson.type as keyof typeof LINE_COLOR_MAP] || 'border-slate-200'} -z-0`}></div>
              )}

              <motion.button
                onClick={() => !lesson.isLocked && onSelectLesson(lesson.id)}
                whileHover={!lesson.isLocked ? { scale: 1.1, y: -5 } : {}}
                whileTap={!lesson.isLocked ? { scale: 0.95 } : {}}
                className={`relative z-10 w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg transition-all ${
                  lesson.isLocked 
                    ? 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed' 
                    : `${COLOR_MAP[lesson.type as keyof typeof COLOR_MAP]} cursor-pointer`
                }`}
              >
                {lesson.isLocked ? (
                  <Lock className="w-8 h-8" />
                ) : (
                  <Icon className="w-8 h-8" />
                )}
                
                {!lesson.isLocked && (
                  <div className="absolute -bottom-2 right-0 bg-white text-primary w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-xs font-black shadow-sm">
                    {index + 1}
                  </div>
                )}
              </motion.button>

              <div className="mt-4 text-center">
                <span className={`text-sm font-bold block mb-1 ${lesson.isLocked ? 'text-slate-400' : 'text-slate-700'}`}>
                  {lesson.title}
                </span>

                <div className="flex gap-1 justify-center">
                  {[...Array(3)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < lesson.stars 
                          ? 'text-secondary fill-secondary' 
                          : 'text-slate-200 fill-slate-200'
                      }`} 
                    />
                  ))}
                </div>
                
                {lesson.isLocked && (
                  <span className="text-[10px] font-black uppercase text-slate-400 mt-2 block tracking-widest leading-normal">
                    Locked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
