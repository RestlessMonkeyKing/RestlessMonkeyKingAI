import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface InputAreaProps {
  onSend: (content: string) => void;
  isLoading: boolean;
  isReady: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading, isReady }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading && isReady) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 sticky bottom-0 z-10">
      <div className="max-w-4xl mx-auto relative">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-gray-100/50 p-2 rounded-[24px] border border-gray-200 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:bg-white focus-within:shadow-lg transition-all duration-300 ease-out">
          <div className="pl-3 pb-3 text-orange-500">
            <Sparkles size={20} strokeWidth={2} />
          </div>
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isReady ? "Ask the Monkey King..." : "Summoning the King..."}
            className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 px-2 max-h-[150px] min-h-[24px] text-[16px] text-gray-900 placeholder:text-gray-400 leading-relaxed"
            rows={1}
            disabled={isLoading || !isReady}
          />
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            disabled={!input.trim() || isLoading || !isReady}
            type="submit"
            className={`p-2.5 rounded-full mb-0.5 transition-all duration-200 ${
              input.trim() 
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-white shadow-md hover:shadow-lg hover:scale-105' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} strokeWidth={2.5} className={input.trim() ? 'ml-0.5' : ''} />
          </motion.button>
        </form>
        
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
            Powered by RestlessMonkey King AI
          </p>
        </div>
      </div>
    </div>
  );
};
