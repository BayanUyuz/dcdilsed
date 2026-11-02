import React from 'react';
import { Globe, Users, ChevronRight } from 'lucide-react';

export default function AudienceStep({ handleSelectAudience, setStep }) {
  return (
    <div className="flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Erzähle uns etwas mehr über deinen Server
        </h2>
        <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-6">
          Um dir bei der Einrichtung zu helfen: Ist der Server für dich und ein paar Freunde oder für eine größere Community gedacht?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSelectAudience('community')}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-amber-500/20 bg-[#101014] hover:bg-[#16161e] hover:border-amber-400/50 transition font-semibold text-white text-sm text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Für einen Club oder eine Community</div>
                <div className="text-xs text-amber-200/50">Für eine größere Gruppe oder öffentlich</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
          </button>

          <button
            onClick={() => handleSelectAudience('friends')}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-amber-500/20 bg-[#101014] hover:bg-[#16161e] hover:border-amber-400/50 transition font-semibold text-white text-sm text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Für mich und meine Freunde</div>
                <div className="text-xs text-amber-200/50">Ein privater Ort nur für enge Freunde</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>

      <div className="bg-[#070709] px-6 py-4 flex items-center justify-between border-t border-amber-500/15">
        <button
          type="button"
          onClick={() => setStep('templates')}
          className="text-xs font-semibold text-amber-200/70 hover:text-white hover:underline cursor-pointer"
        >
          Zurück
        </button>
        <button
          type="button"
          onClick={() => setStep('customize')}
          className="text-xs text-amber-200/60 hover:text-amber-300 cursor-pointer"
        >
          Nicht sicher? <span className="underline">Diese Frage vorerst überspringen.</span>
        </button>
      </div>
    </div>
  );
}
