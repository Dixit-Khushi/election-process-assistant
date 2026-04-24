import { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Search, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeClaim } from '../../lib/gemini';

export default function MisinfoShield() {
  const [query, setQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsScanning(true);
    setResult(null);

    try {
      const analysis = await analyzeClaim(query);
      setResult(analysis);
    } catch (error) {
      console.error("Failed to analyze:", error);
      setResult({
        status: 'warning',
        title: 'Error',
        description: 'Failed to connect to the intelligence network.',
        source: 'System'
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-2xl p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-indigo-500/10 blur-3xl rounded-full" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Shield size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Misinformation Shield</h2>
            <p className="text-sm text-zinc-400">Scan claims, rumors, or headlines against verified election data.</p>
          </div>
        </div>

        <form onSubmit={handleScan} className="relative mb-6" aria-label="Misinformation Scanner Form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'Can I vote by text message?'"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-32 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            disabled={isScanning}
            aria-label="Enter a claim or rumor to analyze"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} aria-hidden="true" />
          
          <button
            type="submit"
            disabled={isScanning || !query.trim()}
            aria-label="Analyze Claim"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isScanning ? (
              <>
                <Activity className="animate-spin" size={16} />
                Scanning
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center py-8 text-indigo-400 space-y-4"
            >
              <div className="relative">
                <Shield size={48} className="opacity-20" />
                <motion.div
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-1 bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                />
              </div>
              <p className="text-sm font-mono tracking-widest uppercase animate-pulse">Cross-referencing databases...</p>
            </motion.div>
          )}

          {result && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl border ${
                result.status === 'danger' ? 'bg-red-500/10 border-red-500/20' :
                result.status === 'warning' ? 'bg-amber-500/10 border-amber-500/20' :
                'bg-emerald-500/10 border-emerald-500/20'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full mt-1 ${
                  result.status === 'danger' ? 'bg-red-500/20 text-red-400' :
                  result.status === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {result.status === 'danger' ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    result.status === 'danger' ? 'text-red-400' :
                    result.status === 'warning' ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {result.title}
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                    {result.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    <Shield size={12} />
                    Source: {result.source}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
