import React from 'react';
import { Radio, Keyboard } from 'lucide-react';

export default function VoiceInputModeSection({
  inputMode,
  setInputMode,
  autoSensitivity,
  setAutoSensitivity,
  sensitivity,
  setSensitivity,
  pttKey,
  isRecordingPttKey,
  setIsRecordingPttKey,
  pttDelay,
  setPttDelay
}) {
  return (
    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
      <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">EINGABEMODUS</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label
          onClick={() => setInputMode('activity')}
          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
            inputMode === 'activity'
              ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/15'
              : 'border-amber-500/20 bg-[#070709] hover:bg-[#121218]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <input
              type="radio"
              name="inputMode"
              checked={inputMode === 'activity'}
              onChange={() => setInputMode('activity')}
              className="accent-amber-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-amber-100">Sprachaktivierung</span>
          </div>
          <Radio className="w-4 h-4 text-emerald-400" />
        </label>

        <label
          onClick={() => setInputMode('ptt')}
          className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
            inputMode === 'ptt'
              ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/15'
              : 'border-amber-500/20 bg-[#070709] hover:bg-[#121218]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <input
              type="radio"
              name="inputMode"
              checked={inputMode === 'ptt'}
              onChange={() => setInputMode('ptt')}
              className="accent-amber-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-amber-100">Push-to-Talk</span>
          </div>
          <Keyboard className="w-4 h-4 text-amber-400" />
        </label>
      </div>

      {inputMode === 'activity' ? (
        <div className="pt-2 border-t border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-100 font-medium">Eingabeempfindlichkeit automatisch ermitteln</span>
            <input
              type="checkbox"
              checked={autoSensitivity}
              onChange={(e) => setAutoSensitivity(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          {!autoSensitivity && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">EMPFINDLICHKEIT</span>
                <span className="text-amber-200 font-bold">{sensitivity} dB</span>
              </div>
              <input
                type="range"
                min={-100}
                max={0}
                value={sensitivity}
                onChange={(e) => setSensitivity(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="pt-2 border-t border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-100">TASTENKOMBINATION</div>
              <div className="text-[11px] text-amber-300/70">Taste gedrückt halten, um zu sprechen.</div>
            </div>
            <button
              type="button"
              onClick={() => setIsRecordingPttKey(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                isRecordingPttKey
                  ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
                  : 'bg-[#070709] text-amber-200 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              {isRecordingPttKey ? 'Taste drücken...' : pttKey}
            </button>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">PUSH-TO-TALK VERZÖGERUNG BEIM LOSLASSEN</span>
              <span className="text-amber-200 font-bold">{pttDelay} ms</span>
            </div>
            <input
              type="range"
              min={0}
              max={2000}
              step={10}
              value={pttDelay}
              onChange={(e) => setPttDelay(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
