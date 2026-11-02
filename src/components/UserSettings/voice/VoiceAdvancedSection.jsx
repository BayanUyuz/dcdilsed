import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function VoiceAdvancedSection({
  krispMode,
  setKrispMode,
  echoCancellation,
  setEchoCancellation,
  autoGainControl,
  setAutoGainControl,
  advancedVoiceProcessing,
  setAdvancedVoiceProcessing,
  attenuationPercent,
  setAttenuationPercent,
  attenuateOthers,
  setAttenuateOthers,
  attenuateSelf,
  setAttenuateSelf,
  audioSubsystem,
  setAudioSubsystem,
  qosPriority,
  setQosPriority,
  diagnosticAudio,
  setDiagnosticAudio,
  handleResetVoiceSettings
}) {
  return (
    <div className="space-y-6 pt-4 border-t border-amber-500/20">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
        ERWEITERTE SPRACHVERARBEITUNG & NETZWERKEINSTELLUNGEN
      </div>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-200">RAUSCHUNTERDRÜCKUNG (KRISP-TECHNOLOGIE)</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">KI-gestützt</span>
          </div>
          <p className="text-[11px] text-amber-300/70">
            Filtert Tastaturgeräusche, Lüfter, Atmung und Raumhall in Echtzeit aus deinem Mikrofon.
          </p>

          <div className="grid grid-cols-3 gap-2 pt-1">
            {[
              { id: 'krisp', label: 'Krisp (Erweiterte KI)', desc: 'Volle Raum-Isolation' },
              { id: 'standard', label: 'Standard-Filter', desc: 'Klassisches Noise Gate' },
              { id: 'none', label: 'Aus', desc: 'Unbearbeitetes Audiosignal' },
            ].map((k) => (
              <div
                key={k.id}
                onClick={() => setKrispMode(k.id)}
                className={`p-3 rounded-xl border cursor-pointer transition text-center ${
                  krispMode === k.id
                    ? 'border-amber-400 bg-amber-500/15 text-amber-100 shadow-md ring-1 ring-amber-400'
                    : 'border-amber-500/20 bg-[#070709] text-amber-300/60 hover:text-amber-200 hover:border-amber-500/40'
                }`}
              >
                <div className="text-xs font-bold text-amber-100">{k.label}</div>
                <div className="text-[10px] text-amber-300/60 mt-0.5">{k.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
          <div>
            <div className="text-xs font-bold text-amber-100">Echounterdrückung (Echo Cancellation)</div>
            <div className="text-[11px] text-amber-300/70">Verhindert Rückkopplungen von deinen Lautsprechern in das Mikrofon.</div>
          </div>
          <input
            type="checkbox"
            checked={echoCancellation}
            onChange={(e) => setEchoCancellation(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
          <div>
            <div className="text-xs font-bold text-amber-100">Automatische Verstärkungsregelung (AGC)</div>
            <div className="text-[11px] text-amber-300/70">Hebt leises Flüstern an und dämpft plötzliche laute Töne automatisch ab.</div>
          </div>
          <input
            type="checkbox"
            checked={autoGainControl}
            onChange={(e) => setAutoGainControl(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
          <div>
            <div className="text-xs font-bold text-amber-100">Erweiterte Sprachverarbeitung</div>
            <div className="text-[11px] text-amber-300/70">Aktiviert Klangverbesserungsfilter für kristallklare Sprachwiedergabe.</div>
          </div>
          <input
            type="checkbox"
            checked={advancedVoiceProcessing}
            onChange={(e) => setAdvancedVoiceProcessing(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="pt-3 border-t border-amber-500/20 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-extrabold text-amber-400 uppercase text-[10px]">DÄMPFUNG (ATTENUATION)</span>
            <span className="text-amber-200 font-bold">%{attenuationPercent}</span>
          </div>
          <p className="text-[11px] text-amber-300/70">
            Verringert automatisch die Lautstärke anderer Programme (Spiele, Musik), wenn jemand spricht.
          </p>
          <input
            type="range"
            min={0}
            max={100}
            value={attenuationPercent}
            onChange={(e) => setAttenuationPercent(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="space-y-2 pt-2 text-xs text-amber-100">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs">Lautstärke anderer Programme senken, wenn andere sprechen</span>
              <input
                type="checkbox"
                checked={attenuateOthers}
                onChange={(e) => setAttenuateOthers(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs">Lautstärke anderer Programme senken, wenn ich spreche</span>
              <input
                type="checkbox"
                checked={attenuateSelf}
                onChange={(e) => setAttenuateSelf(e.target.checked)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="pt-3 border-t border-amber-500/20 space-y-2">
          <label className="text-[10px] font-extrabold text-amber-400 uppercase block">
            AUDIO-SUBSYSTEM
          </label>
          <select
            value={audioSubsystem}
            onChange={(e) => setAudioSubsystem(e.target.value)}
            className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
          >
            <option value="standard">Standard (Neueste & stabile WebAudio-Engine)</option>
            <option value="legacy">Legacy (Vollständige Kompatibilität für ältere Soundkarten)</option>
            <option value="experimental">Experimentell (Ultra-niedrige Latenz-Engine)</option>
          </select>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
          <div>
            <div className="text-xs font-bold text-amber-100">Dienstgüte (QoS) – Hohe Paketpriorität</div>
            <div className="text-[11px] text-amber-300/70">Signalisiert deinem Router, DilSed-Sprachpakete mit höchster Priorität zu übertragen.</div>
          </div>
          <input
            type="checkbox"
            checked={qosPriority}
            onChange={(e) => setQosPriority(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
          <div>
            <div className="text-xs font-bold text-amber-100">Diagnose-Audioaufzeichnung</div>
            <div className="text-[11px] text-amber-300/70">Speichert lokale Protokolle zur Analyse von Audio- und Verbindungsproblemen.</div>
          </div>
          <input
            type="checkbox"
            checked={diagnosticAudio}
            onChange={(e) => setDiagnosticAudio(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-start">
        <button
          type="button"
          onClick={handleResetVoiceSettings}
          className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sprach- und Videoeinstellungen auf Standard zurücksetzen</span>
        </button>
      </div>
    </div>
  );
}
