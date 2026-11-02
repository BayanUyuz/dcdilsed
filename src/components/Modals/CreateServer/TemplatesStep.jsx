import React from 'react';
import {
  Sparkles,
  Gamepad2,
  GraduationCap,
  BookOpen,
  Users,
  Palette,
  Globe,
  ChevronRight
} from 'lucide-react';

export default function TemplatesStep({ handleSelectTemplate, setStep }) {
  return (
    <div className="flex flex-col">
      <div className="p-6 pb-4">
        <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Erstelle deinen Server
        </h2>
        <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-5">
          Dein Server ist der Ort, an dem du mit deinen Freunden abhängst. Erstelle deinen eigenen Server und leg los.
        </p>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {/* Primary: Create My Own */}
          <button
            onClick={() => handleSelectTemplate('Meine')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-amber-500/30 bg-[#121217] hover:bg-[#181822] hover:border-amber-400/60 transition font-semibold text-white text-sm group shadow-sm shadow-amber-500/5 active:scale-[0.99] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span>Selbst erstellen</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
          </button>

          <div className="text-[11px] font-bold text-amber-300/70 uppercase pt-3 pb-1 tracking-wider">
            STARTE MIT EINER VORLAGE
          </div>

          {/* Gaming */}
          <button
            onClick={() => handleSelectTemplate('Gaming')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span>Gaming</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
          </button>

          {/* School Club */}
          <button
            onClick={() => handleSelectTemplate('Schul-Club')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>Schul-Club</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
          </button>

          {/* Study Group */}
          <button
            onClick={() => handleSelectTemplate('Lerngruppe')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center shadow">
                <BookOpen className="w-5 h-5" />
              </div>
              <span>Lerngruppe</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
          </button>

          {/* Friends */}
          <button
            onClick={() => handleSelectTemplate('Freunde')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow">
                <Users className="w-5 h-5" />
              </div>
              <span>Freunde</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
          </button>

          {/* Artists & Creators */}
          <button
            onClick={() => handleSelectTemplate('Künstler & Designer')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow">
                <Palette className="w-5 h-5" />
              </div>
              <span>Künstler & Designer</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
          </button>

          {/* Local Community */}
          <button
            onClick={() => handleSelectTemplate('Lokale Community')}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shadow">
                <Globe className="w-5 h-5" />
              </div>
              <span>Lokale Community</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
          </button>
        </div>
      </div>

      {/* Bottom Join a server bar */}
      <div className="bg-[#070709] px-6 py-4 flex flex-col items-center border-t border-amber-500/15">
        <div className="text-xs font-semibold text-amber-200/80 mb-2">
          Hast du bereits eine Einladung?
        </div>
        <button
          onClick={() => setStep('join')}
          className="w-full bg-[#14141a] hover:bg-[#1a1a24] text-amber-200 hover:text-white py-2.5 rounded-xl text-xs font-bold transition border border-amber-500/20 hover:border-amber-400/50 cursor-pointer"
        >
          Einem Server beitreten
        </button>
      </div>
    </div>
  );
}
