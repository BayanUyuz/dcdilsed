import React from 'react';
import { Volume2 } from 'lucide-react';

export default function TtsScreenreaderSection({
  screenReaderSupport,
  setScreenReaderSupport,
  enableTts,
  setEnableTts,
  ttsSpeed,
  setTtsSpeed,
  audioCues,
  setAudioCues,
  isSpeakingTts,
  handleTestTts
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
        Screenreader & Sprachausgabe (TTS)
      </h3>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        {/* Screen Reader Support */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Screenreader-Unterstützung</div>
            <div className="text-xs text-amber-300/70">
              Optimiert ARIA-Labels und Sprachansagen für NVDA, JAWS und Windows-Sprachausgabe.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setScreenReaderSupport(!screenReaderSupport)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              screenReaderSupport ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${screenReaderSupport ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                screenReaderSupport ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* TTS */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <div className="text-sm font-bold text-amber-100">Text-in-Sprache (Text-to-Speech / TTS)</div>
              <div className="text-xs text-amber-300/70">
                Lässt Nachrichten mit dem /tts-Befehl und Benachrichtigungen akustisch vorlesen.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEnableTts(!enableTts)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                enableTts ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${enableTts ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  enableTts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {enableTts && (
            <div className="p-3.5 bg-[#070709] rounded-xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-100">TTS-Vorlesegeschwindigkeit</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { rate: 0.75, label: '0.75x' },
                    { rate: 1.0, label: '1.0x (Normal)' },
                    { rate: 1.25, label: '1.25x' },
                    { rate: 1.5, label: '1.5x' },
                  ].map((sp) => (
                    <button
                      key={sp.rate}
                      type="button"
                      onClick={() => setTtsSpeed(sp.rate)}
                      className={`px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                        ttsSpeed === sp.rate
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black shadow'
                          : 'bg-[#121218] text-amber-200/60 border border-amber-500/20 hover:text-amber-200'
                      }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => handleTestTts()}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                    isSpeakingTts
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 shadow-amber-500/20'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeakingTts ? 'Wird vorgelesen...' : 'TTS live testen'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        {/* Audio Cues */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Barrierefreiheits-Signaltöne (Audio Cues)</div>
            <div className="text-xs text-amber-300/70">
              Spielt dezente akustische Töne bei Navigation oder Fokuswechsel ab.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAudioCues(!audioCues)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              audioCues ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${audioCues ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                audioCues ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
