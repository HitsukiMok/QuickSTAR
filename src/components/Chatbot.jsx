import React, { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-purple-600 text-white rounded-full shadow-lg shadow-purple-500/40 hover:bg-purple-700 hover:scale-110 transition-all duration-300 z-50 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot size={28} />
      </button>

      {/* Chat window */}
      <div 
        className={`fixed bottom-6 right-6 w-[350px] h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right z-50 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-purple-600 text-white">
          <div className="flex items-center space-x-2">
            <Bot size={24} />
            <span className="font-semibold text-lg">AI Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-purple-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Chat area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-purple-50 dark:bg-slate-900">
          <div className="flex">
            <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%] text-sm text-slate-700 dark:text-slate-300">
              Hello! I'm your QuickSTAR AI assistant. How can I help you interpret the dashboard data today?
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-purple-100 dark:border-slate-700">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask about underserved regions..."
              className="w-full pl-4 pr-12 py-3 bg-purple-50 dark:bg-slate-900 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:text-slate-200"
              disabled
            />
            <button className="absolute right-2 top-2 p-1.5 bg-purple-600 text-white rounded-full hover:bg-purple-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
