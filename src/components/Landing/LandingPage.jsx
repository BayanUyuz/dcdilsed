import React, { useState } from 'react';
import {
  LogIn,
  UserPlus,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import AuthModal from './AuthModal';

export default function LandingPage({ onOpenApp, currentUser, isAuthenticated }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleEnterApp = () => {
    if (!isAuthenticated || !currentUser) {
      openAuth('login');
      return;
    }
    onOpenApp(currentUser);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col justify-between relative overflow-y-auto font-sans select-none">
      {/* Background Royal Gold Ambient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-amber-500/20 via-yellow-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-amber-700/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-neutral-900/90 to-black/90 backdrop-blur-md border border-amber-400/40 p-1.5 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center">
            <img
              src="/dilsed-logo.png"
              alt="DilSed Logo"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            DilSed
          </span>
        </div>

        {/* If already authenticated, show small badge */}
        {isAuthenticated && currentUser && (
          <button
            onClick={handleEnterApp}
            className="flex items-center gap-2 bg-neutral-900/80 hover:bg-neutral-800 border border-amber-500/30 hover:border-amber-400/60 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-200 transition shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Angemeldet als {currentUser.displayName}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </button>
        )}
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-20 relative text-center max-w-4xl mx-auto">
        {/* DilSed Gold Crown & Ring Logo Highlight */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-6 bg-gradient-to-r from-amber-500/30 via-yellow-500/25 to-amber-600/30 rounded-full blur-3xl group-hover:blur-[80px] transition duration-700 opacity-90" />
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-b from-neutral-900/95 via-neutral-950/95 to-black/95 backdrop-blur-2xl border border-amber-400/50 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.25)] flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:border-amber-400">
            <img
              src="/dilsed-logo.png"
              alt="DilSed Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Offizielle Kommunikationsplattform</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow">
          Herzlich willkommen bei DilSed
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed mb-10 font-normal">
          Deine moderne Plattform für kristallklare Sprachräume, Echtzeit-Textchats und sichere Communities – direkt im Browser ohne zusätzliche Installation.
        </p>

        {/* Action Buttons: Pure Black & Gold Login & Register */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {isAuthenticated && currentUser ? (
            <button
              onClick={handleEnterApp}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-neutral-950 font-black px-9 py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
            >
              <span>App öffnen (Als {currentUser.displayName})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              {/* Login Button (Polished Regal Gold) */}
              <button
                onClick={() => openAuth('login')}
                className="w-full sm:w-auto bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#c59b27] hover:from-[#e5c158] hover:via-[#fff3cc] hover:to-[#d4af37] text-neutral-950 font-black px-9 py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Anmelden (Login)</span>
              </button>

              {/* Register Button (Obsidian Black with Gold Border) */}
              <button
                onClick={() => openAuth('register')}
                className="w-full sm:w-auto bg-neutral-950/90 hover:bg-neutral-900 text-amber-200 hover:text-white font-bold px-9 py-4 rounded-2xl border border-amber-500/40 hover:border-amber-400 backdrop-blur-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer shadow-xl shadow-black/60 hover:shadow-amber-500/10"
              >
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>Registrieren (Register)</span>
              </button>
            </>
          )}
        </div>
      </main>

      {/* Clean Minimalist Black & Gold Footer */}
      <footer className="w-full py-6 px-6 border-t border-amber-500/15 z-20 relative text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <img src="/dilsed-logo.png" alt="DilSed" className="w-4 h-4 object-contain" />
          <span className="font-semibold text-neutral-400">DilSed Kommunikationsapp</span>
        </div>
        <div className="text-[11px] text-neutral-500">
          © 2026 DilSed • Alle Rechte vorbehalten.
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        key={authMode}
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setAuthModalOpen(false);
          onOpenApp(user);
        }}
      />
    </div>
  );
}
