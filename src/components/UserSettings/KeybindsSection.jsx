import React from 'react';
import { Keyboard, Plus, Trash2, RotateCcw } from 'lucide-react';
import { KEYBIND_ACTIONS } from './constants';

export default function KeybindsSection({
  keybinds,
  setKeybinds,
  recordingKeybindId,
  setRecordingKeybindId,
  onResetKeybinds,
  onAddKeybind,
  onDeleteKeybind,
  onUpdateKeybindAction,
  isEmbedded = false
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-amber-500/20">
        <div>
          <h3 className="text-sm font-black text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-400" />
            <span>Tastenbelegungen</span>
          </h3>
          <p className="text-xs text-amber-300/70 mt-0.5">
            Belege häufig genutzte Aktionen mit Tastenkürzeln für blitzschnelle Bedienung.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddKeybind}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 text-xs font-black flex items-center justify-center gap-1.5 transition shadow-md shadow-amber-500/20 active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tastenbelegung hinzufügen</span>
        </button>
      </div>

      {keybinds.length === 0 ? (
        <div className="p-8 text-center bg-[#0c0c10] rounded-xl border border-dashed border-amber-500/30">
          <Keyboard className="w-8 h-8 text-amber-400/50 mx-auto mb-2" />
          <p className="text-xs text-amber-300/70">Noch keine Tastenkürzel belegt.</p>
          <button
            onClick={onAddKeybind}
            className="mt-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 text-xs font-black cursor-pointer shadow-md shadow-amber-500/20"
          >
            Erstes Tastenkürzel anlegen
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {keybinds.map((kb) => {
            const isRecording = recordingKeybindId === kb.id;
            return (
              <div
                key={kb.id}
                className={`p-3.5 rounded-xl border transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isRecording
                    ? 'bg-amber-500/15 border-amber-400 shadow-lg ring-1 ring-amber-400'
                    : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                {/* Aktionsauswahl */}
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block mb-1">
                    Aktion
                  </label>
                  <select
                    value={kb.action}
                    onChange={(e) => onUpdateKeybindAction(kb.id, e.target.value)}
                    className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg px-2.5 py-2 border border-amber-500/30 outline-none focus:border-amber-400 cursor-pointer font-medium"
                  >
                    {KEYBIND_ACTIONS.map((act) => (
                      <option key={act.value} value={act.value}>
                        {act.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tastenbelegung Aufnahmetaste */}
                <div className="min-w-[190px]">
                  <label className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block mb-1">
                    Tastenbelegung
                  </label>
                  <button
                    type="button"
                    onClick={() => setRecordingKeybindId(isRecording ? null : kb.id)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs font-mono font-bold transition flex items-center justify-center gap-2 select-none cursor-pointer ${
                      isRecording
                        ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                        : 'bg-[#070709] hover:bg-[#121218] border-amber-500/30 text-amber-200'
                    }`}
                    title={isRecording ? 'Zum Abbrechen ESC drücken' : 'Klicken, um eine neue Taste aufzunehmen'}
                  >
                    <Keyboard className={`w-3.5 h-3.5 ${isRecording ? 'text-red-400 animate-bounce' : 'text-amber-400'}`} />
                    <span>{isRecording ? 'Taste drücken...' : kb.key || 'NICHT BELEGT'}</span>
                  </button>
                </div>

                {/* Löschen-Button */}
                <div className="flex items-end justify-end pt-1 md:pt-4">
                  <button
                    type="button"
                    onClick={() => onDeleteKeybind(kb.id)}
                    className="p-2 rounded-lg text-amber-300/60 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition cursor-pointer"
                    title="Diese Tastenbelegung entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Auf Standard zurücksetzen */}
      <div className="flex items-center justify-between pt-2 text-xs">
        <span className="text-[11px] text-amber-300/60">
          Tipp: Tastenbelegungen funktionieren im Hintergrund, während die App geöffnet ist.
        </span>
        <button
          type="button"
          onClick={onResetKeybinds}
          className="text-amber-400 hover:text-amber-200 flex items-center gap-1.5 transition font-bold cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Auf Standard zurücksetzen</span>
        </button>
      </div>
    </div>
  );
}
