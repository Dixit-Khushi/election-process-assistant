import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Loader } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Vote, ChevronDown } from 'lucide-react';

import Timeline3D from './components/3d/Timeline3D';
import OmniBot from './components/ui/OmniBot';
import MisinfoShield from './components/ui/MisinfoShield';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function App() {
  const scrollToExplore = () => {
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Canvas */}
        <div className="absolute inset-0 z-0">
          <ErrorBoundary>
            <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 8], fov: 45 }}>
              <color attach="background" args={['#050505']} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              
              <Suspense fallback={null}>
                {/* Optional: Add a slow rotating abstract shape here in the background */}
                <mesh position={[0, 0, -5]}>
                  <torusGeometry args={[3, 0.5, 16, 100]} />
                  <meshStandardMaterial color="#4f46e5" wireframe opacity={0.1} transparent />
                </mesh>
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-20 h-20 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 backdrop-blur-md"
          >
            <Vote size={40} className="text-indigo-400" />
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Vox <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Populi</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl leading-relaxed"
          >
            A next-generation intelligence platform designed to gamify, simplify, and secure the democratic process. Explore the 3D timeline, consult the Omni-Bot, and verify facts instantly.
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={scrollToExplore}
            className="group flex flex-col items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors"
          >
            Explore Platform
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown size={20} className="group-hover:text-indigo-400 transition-colors" />
            </motion.div>
          </motion.button>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="explore" className="relative py-32 px-4 border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Timeline Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                Interactive Module
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Holographic Election Timeline</h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Traditional timelines are boring. Interact with the spatial representation of the election process. Click on the glowing nodes to reveal critical deadlines, requirements, and action items for each phase of the democratic cycle.
              </p>
            </div>
            
            <div className="h-[500px] w-full rounded-2xl border border-white/10 overflow-hidden relative bg-black/20">
              <ErrorBoundary>
                <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 8], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
                  <Timeline3D />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
              </ErrorBoundary>
              <div className="absolute bottom-4 right-4 text-xs text-zinc-500 pointer-events-none">
                * Drag to rotate view
              </div>
            </div>
          </div>

          {/* Misinfo Shield Feature */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Combat Fake News</h2>
            <p className="text-zinc-400 leading-relaxed mb-12 max-w-2xl">
              In an era of rampant misinformation, our built-in shield cross-references claims against official election databases to protect voter integrity.
            </p>
            <MisinfoShield />
          </div>

        </div>
      </section>

      {/* OmniBot UI Overlay */}
      <OmniBot />

      {/* Loading Overlay for 3D elements */}
      <Loader />
    </div>
  );
}

export default App;
