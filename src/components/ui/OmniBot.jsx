import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PRE_PROGRAMMED_RESPONSES = [
  {
    keywords: ["register", "how to register", "sign up"],
    response: "You can register to vote online, by mail, or in person. Deadlines vary by state. Do you need the specific deadline for your state?"
  },
  {
    keywords: ["mail", "absentee", "vote by mail"],
    response: "To vote by mail, you must request an absentee ballot. All registered voters can vote by mail in some states, while others require an excuse. Ensure you mail it back before Election Day!"
  },
  {
    keywords: ["id", "identification", "bring"],
    response: "Voter ID laws vary. 36 states require some form of ID at the polls. It's best to bring a valid Driver's License, State ID, or Passport just in case."
  },
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello citizen! I am Omni-Bot, your personal election assistant. How can I help you navigate the democratic process today?"
  }
];

export default function OmniBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Omni-Bot. Ask me anything about the election process, voting laws, or candidates." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput("");
    setIsTyping(true);

    // Simulated AI Processing
    setTimeout(() => {
      let aiResponse = "I'm not entirely sure about that specific detail. I recommend checking your local election office website for the most accurate information.";
      
      const lowerInput = userMessage.toLowerCase();
      
      // Simple keyword matching for hackathon simulation
      for (const item of PRE_PROGRAMMED_RESPONSES) {
        if (item.keywords.some(kw => lowerInput.includes(kw))) {
          aiResponse = item.response;
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/50 hover:bg-blue-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Bot size={28} />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-8 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col rounded-2xl glass-panel border border-white/20 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Bot className="text-blue-400" size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    Omni-Bot <Sparkles size={14} className="text-blue-400" />
                  </h3>
                  <p className="text-xs text-zinc-400">Civic Intelligence Agent</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'user' ? 'bg-indigo-500/20' : 'bg-blue-500/20'
                  }`}>
                    {msg.role === 'user' ? <User size={16} className="text-indigo-400"/> : <Bot size={16} className="text-blue-400"/>}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-white/10 text-zinc-100 rounded-tl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Bot size={16} className="text-blue-400"/>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 rounded-tl-sm flex gap-1.5">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-blue-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-blue-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-blue-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about elections..."
                  className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
