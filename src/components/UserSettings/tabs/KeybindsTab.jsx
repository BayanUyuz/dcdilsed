import React from 'react';
import { Keyboard } from 'lucide-react';
import KeybindsSection from '../KeybindsSection';

export default function KeybindsTab({
  keybinds,
  setKeybinds,
  recordingKeybindId,
  setRecordingKeybindId,
  onResetKeybinds,
  onAddKeybind,
  onDeleteKeybind,
  onUpdateKeybindAction
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
          <Keyboard className="w-6 h-6 text-amber-400" />
          <span>Tastenbelegungen</span>
        </h2>
        <p className="text-xs text-amber-300/70">
          Passe alle deine Tastenkürzel an einem zentralen Ort an, speichere und verwalte sie.
        </p>
      </div>

      <KeybindsSection
        keybinds={keybinds}
        setKeybinds={setKeybinds}
        recordingKeybindId={recordingKeybindId}
        setRecordingKeybindId={setRecordingKeybindId}
        onResetKeybinds={onResetKeybinds}
        onAddKeybind={onAddKeybind}
        onDeleteKeybind={onDeleteKeybind}
        onUpdateKeybindAction={onUpdateKeybindAction}
        isEmbedded={false}
      />
    </div>
  );
}
