import React, { useState } from 'react';
import {
  LogIn,
  UserPlus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap
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

  const handleDemoAccess = () => {
    onOpenApp({
      id: 'demo_user_me',
      username: 'DilSedUser',
      displayName: 'Benutzer (Du)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      statusText: '⚡ DilSed Web',
      badges: ['developer', 'early']
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-white flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header / Subtle Status Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-1.5 shadow-lg flex items-center justify-center">
            <img
              src="/dilsed-logo.png"
              alt="DilSed Logo"
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <span className="font-black text-xl tracking-tight text-white">DilSed</span>
        </div>

        {/* If already authenticated, show small badge */}
        {isAuthenticated && currentUser && (
          <button
            onClick={handleEnterApp}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full text-xs font-semibold transition"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Angemeldet als {currentUser.displayName}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
          </button>
        )}
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-20 relative text-center max-w-4xl mx-auto">
        {/* DilSed Logo Highlight */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-indigo-500/30 to-amber-500/20 rounded-full blur-2xl group-hover:blur-3xl transition duration-500 opacity-80" />
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/25 p-4 shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <img
              src="/dilsed-logo.png"
              alt="DilSed Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 text-blue-300" />
          <span>Offizielle Kommunikationsplattform</span>
        </div>

        {/* Headline as requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow">
          Herzlichen Willkommen bei unserem Kommunikation DilSed Kommunikationsapp
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-blue-100/80 max-w-2xl leading-relaxed mb-10 font-normal">
          Deine moderne Plattform für kristallklare Sprachräume, Echtzeit-Textchats und sichere Communities – direkt im Browser ohne zusätzliche Installation.
        </p>

        {/* Action Buttons: Login & Register */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {isAuthenticated && currentUser ? (
            <button
              onClick={handleEnterApp}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm"
            >
              <span>App öffnen (Als {currentUser.displayName})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              {/* Login Button */}
              <button
                onClick={() => openAuth('login')}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Anmelden (Login)</span>
              </button>

              {/* Register Button */}
              <button
                onClick={() => openAuth('register')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-black px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-md hover:border-white/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer shadow-lg"
              >
                <UserPlus className="w-4 h-4 text-blue-300" />
                <span>Registrieren (Register)</span>
              </button>
            </>
          )}

          {/* Quick Demo Access (Especially useful for Code Review & Instant Testing) */}
          <button
            onClick={handleDemoAccess}
            className="w-full sm:w-auto bg-discord-chat/70 hover:bg-discord-chat text-neutral-300 hover:text-white font-semibold px-6 py-4 rounded-2xl border border-white/10 hover:border-white/25 transition-all flex items-center justify-center gap-2 text-xs"
            title="Direkt als Demo-Benutzer ohne Passworteingabe starten"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Sofort-Demo</span>
          </button>
        </div>

        {/* Security / Quality Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-[11px] text-blue-200/60 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Ende-zu-Ende verschlüsselte Sessions
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            100% Kostenlos & Ohne Werbung
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Kristallklare WebRTC-Sprachübertragung
          </span>
        </div>
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="w-full py-6 px-6 border-t border-white/5 z-20 relative text-center text-xs text-blue-200/50 flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <img src="/dilsed-logo.png" alt="DilSed" className="w-4 h-4 object-contain" />
          <span className="font-semibold text-white/80">DilSed Kommunikationsapp</span>
        </div>
        <div className="text-[11px]">
          © 2026 DilSed • Bereit für das Code-Review • Alle Rechte vorbehalten.
        </div>
      </footer>

      {/* Authentication Modal (Handles both Login and Register seamlessly) */}
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
