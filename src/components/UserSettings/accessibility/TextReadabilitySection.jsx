import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function TextReadabilitySection({
  fontSize,
  setFontSize,
  messageSpacing,
  setMessageSpacing
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
        Text und Lesbarkeit
      </h3>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-amber-100">Chat-Schriftgröße</div>
            <div className="text-xs text-amber-300/70">
              Bestimmt die Schriftgröße für Nachrichten und Überschriften im Chat.
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-[#070709] border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
            {fontSize}px {fontSize === 16 && '(Standard)'}
          </span>
        </div>

        <div className="pt-2">
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-amber-300/60 font-mono mt-1">
            <span>12px</span>
            <span>14px</span>
            <span className="text-amber-400 font-bold">16px (Standard)</span>
            <span>18px</span>
            <span>20px</span>
            <span>24px</span>
          </div>
        </div>

        {fontSize !== 16 && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setFontSize(16)}
              className="text-xs text-amber-400 hover:text-amber-200 flex items-center gap-1 transition font-bold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Auf Standardgröße zurücksetzen (16px)</span>
            </button>
          </div>
        )}
      </div>

      {/* Message Spacing */}
      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-amber-100">Abstand zwischen Nachrichtengruppen</div>
            <div className="text-xs text-amber-300/70">
              Regelt den vertikalen Abstand zwischen Nachrichten verschiedener Nutzer oder Zeitblöcke.
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-[#070709] border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
            {messageSpacing}px {messageSpacing === 16 && '(Standard)'}
          </span>
        </div>

        <div className="pt-2">
          <input
            type="range"
            min="0"
            max="24"
            step="4"
            value={messageSpacing}
            onChange={(e) => setMessageSpacing(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-amber-300/60 font-mono mt-1">
            <span>0px (Kompakt)</span>
            <span>4px</span>
            <span>8px</span>
            <span className="text-amber-400 font-bold">16px</span>
            <span>24px (Weit)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
