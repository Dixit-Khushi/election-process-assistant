import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("WebGL Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/50 border border-white/10 rounded-2xl p-8 text-center text-zinc-400">
          <AlertTriangle size={48} className="text-amber-500/50 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">3D Experience Unavailable</h3>
          <p className="text-sm">Please enable Hardware Acceleration or disable strict fingerprinting shields in your browser settings to view the interactive 3D elements.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
