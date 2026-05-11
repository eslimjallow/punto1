import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Info, Sparkles, ChevronRight, Mic, MicOff, Volume2 } from 'lucide-react';
import { getTranslationExercise, checkTranslation, evaluateSpeech } from '../services/geminiService';
import { Lesson } from '../types';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
  onComplete: (xp: number) => void;
}

export default function LessonModal({ lesson, onClose, onComplete }: LessonModalProps) {
  const [exercise, setExercise] = useState<{ sentence: string; expectedTranslation: string; hint: string } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<{ isCorrect: boolean; feedback: string; score: number; accuracy?: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    loadNewExercise();
  }, [lesson.id]);

  const loadNewExercise = async () => {
    setLoading(true);
    setExercise(null);
    setResult(null);
    setUserInput('');
    setTranscription('');
    // Use lesson title or type as topic for variety
    const data = await getTranslationExercise(lesson.type, lesson.title);
    setExercise(data);
    setLoading(false);
  };

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setTranscription(speechToText);
      handleSpeechEvaluation(speechToText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleSpeechEvaluation = async (text: string) => {
    if (!exercise) return;
    setSubmitting(true);
    const evaluation = await evaluateSpeech(exercise.expectedTranslation, text);
    setResult(evaluation);
    setSubmitting(false);
  };

  const handleSubmit = async () => {
    if (!userInput.trim() || !exercise) return;
    
    setSubmitting(true);
    const evaluation = await checkTranslation(exercise.sentence, userInput, exercise.expectedTranslation);
    setResult(evaluation);
    setSubmitting(false);
  };

  const playSentence = () => {
    if (!exercise) return;
    const utterance = new SpeechSynthesisUtterance(exercise.expectedTranslation);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white w-full max-w-2xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full md:h-auto max-h-[100vh] md:max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center ${
              lesson.type === 'speaking' ? 'bg-green-100' : 'bg-primary/10'
            }`}>
              {lesson.type === 'speaking' ? <Mic className="w-5 h-5 md:w-6 md:h-6 text-green-600" /> : <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />}
            </div>
            <div>
              <h3 className="font-black text-base md:text-lg text-slate-800 leading-tight">{lesson.title} Session</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase leading-tight tracking-widest mt-0.5">{lesson.type} Practice</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary border-t-transparent rounded-full"
              />
              <p className="text-slate-400 font-bold italic text-sm">Lexi is preparing your quest...</p>
            </div>
          ) : exercise ? (
            <div className="space-y-6 md:space-y-8">
              {/* Question */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {lesson.type === 'speaking' ? 'Repeat this sentence' : 'Translate this sentence'}
                </label>
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border-2 border-slate-200 group relative">
                  <p className="text-xl md:text-2xl font-bold text-slate-800 italic leading-relaxed text-center">
                    "{lesson.type === 'speaking' ? exercise.expectedTranslation : exercise.sentence}"
                  </p>
                  
                  {lesson.type === 'speaking' && (
                    <button 
                      onClick={playSentence}
                      className="absolute top-4 right-4 p-2 bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-primary transition-colors shadow-sm"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className="space-y-4">
                {lesson.type === 'speaking' ? (
                  <div className="flex flex-col items-center gap-6 py-4">
                    <motion.button
                      animate={isRecording ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 rgba(88, 44, 255, 0.4)", "0 0 0 20px rgba(88, 44, 255, 0)", "0 0 0 0 rgba(88, 44, 255, 0)"] } : {}}
                      transition={isRecording ? { repeat: Infinity, duration: 2 } : {}}
                      onClick={isRecording ? () => recognitionRef.current?.stop() : startSpeechRecognition}
                      disabled={!!result || submitting}
                      className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                        isRecording ? 'bg-accent text-white shadow-lg' : 'bg-primary text-white shadow-xl hover:scale-105'
                      } ${ (!!result || submitting) ? 'opacity-50 grayscale cursor-not-allowed' : '' }`}
                    >
                      {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                    </motion.button>
                    
                    <div className="text-center">
                      <p className={`font-bold transition-colors ${isRecording ? 'text-accent' : 'text-slate-400'}`}>
                        {isRecording ? 'Listening... Speak now!' : result ? 'Analysis Complete' : 'Click the mic to speak'}
                      </p>
                      {transcription && (
                        <p className="mt-4 text-lg font-medium text-primary bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                          "{transcription}"
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Type your translation here..."
                      disabled={!!result}
                      className="w-full h-32 bg-white border-2 border-slate-200 rounded-2xl p-6 text-lg font-medium focus:border-primary focus:ring-0 transition-all resize-none placeholder:text-slate-300"
                    />
                    
                    {!result && (
                      <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-xl text-sm italic">
                        <Info className="w-4 h-4 shrink-0" />
                        <span>Hint: {exercise.hint}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl flex items-start gap-4 ${
                      result.isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'
                    }`}
                  >
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className={`font-black text-lg leading-tight mb-1 ${result.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {result.isCorrect ? 'Excellent Work!' : 'Not quite right'}
                      </p>
                      <p className={`text-sm font-medium leading-relaxed ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {result.feedback}
                      </p>
                      {result.accuracy !== undefined && (
                        <div className="mt-3 flex items-center gap-2">
                           <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: `${result.accuracy}%` }} />
                           </div>
                           <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">{result.accuracy}% Accuracy</span>
                        </div>
                      )}
                    </div>
                    {(result.isCorrect || lesson.type === 'speaking') && (
                      <div className="ml-auto text-center shrink-0">
                        <p className={`text-2xl font-black ${result.isCorrect ? 'text-green-600' : 'text-slate-400'}`}>+{result.score}</p>
                        <p className="text-[10px] font-black uppercase text-slate-400">XP</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between gap-4">
          {!result ? (
            <>
              {lesson.type !== 'speaking' && (
                <button 
                  onClick={handleSubmit}
                  disabled={submitting || !userInput.trim()}
                  className={`game-button-primary w-full flex items-center justify-center gap-2 ${
                    (submitting || !userInput.trim()) ? 'opacity-50 grayscale' : ''
                  }`}
                >
                  {submitting ? 'CHECKING...' : 'CHECK ANSWER'}
                </button>
              )}
            </>
          ) : (
            <>
              {result.isCorrect || lesson.type === 'speaking' ? (
                <button 
                  onClick={() => onComplete(result.isCorrect ? result.score : 10)}
                  className="game-button-primary w-full flex items-center justify-center gap-2 shadow-[0_4px_0_0_#22C55E] bg-green-500 hover:bg-green-600"
                >
                  COMPLETE LESSON <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  onClick={loadNewExercise}
                  className="game-button-secondary w-full"
                >
                  TRY ANOTHER
                </button>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
