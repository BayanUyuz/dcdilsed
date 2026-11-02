import React from 'react';
import { Monitor } from 'lucide-react';
import KeybindsSection from '../KeybindsSection';

export default function SystemTab({
  startOnBoot,
  setStartOnBoot,
  startMinimized,
  setStartMinimized,
  minimizeToTray,
  setMinimizeToTray,
  gpuAcceleration,
  setGpuAcceleration,
  autoUpdate,
  setAutoUpdate,
  devMode,
  setDevMode,
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
          <Monitor className="w-6 h-6 text-amber-400" />
          <span>Windows- & Systemeinstellungen</span>
        </h2>
        <p className="text-xs text-amber-300/70">
          Konfiguriere, wie DilSed beim Systemstart, im Infobereich (Tray) und im Hintergrund arbeitet.
        </p>
      </div>

      <div>
        <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2.5">
          Systemstart-Verhalten
        </h3>
        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
          {/* DilSed beim Systemstart automatisch öffnen */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-100">DilSed beim Windows-Start öffnen</div>
              <div className="text-xs text-amber-300/70 leading-relaxed">
                Startet DilSed automatisch beim Hochfahren deines PCs, damit du sofort mit deinen Freunden verbunden bist.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStartOnBoot(!startOnBoot)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                startOnBoot ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${startOnBoot ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  startOnBoot ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-[1px] bg-amber-500/20" />

          {/* Minimiert starten */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-100">Minimiert starten</div>
              <div className="text-xs text-amber-300/70 leading-relaxed">
                Startet DilSed unaufdringlich im System-Tray, ohne das Hauptfenster in den Vordergrund zu holen.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStartMinimized(!startMinimized)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                startMinimized ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${startMinimized ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  startMinimized ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2.5">
          Fenster-Schließverhalten
        </h3>
        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-100">In den Infobereich (Tray) minimieren</div>
              <div className="text-xs text-amber-300/70 leading-relaxed">
                Beim Klick auf das Schließen-Kreuz (X) bleibt DilSed im Hintergrund aktiv und empfängt weiterhin Benachrichtigungen.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMinimizeToTray(!minimizeToTray)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                minimizeToTray ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${minimizeToTray ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  minimizeToTray ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2.5">
          Hardware & Erweitertes System
        </h3>
        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-100">Hardwarebeschleunigung (GPU)</div>
              <div className="text-xs text-amber-300/70 leading-relaxed">
                Nutzt deine Grafikkarte für flüssigere Animationen und schnellere Reaktionszeiten.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGpuAcceleration(!gpuAcceleration)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                gpuAcceleration ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${gpuAcceleration ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  gpuAcceleration ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-[1px] bg-amber-500/20" />

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-100">Automatische Updates im Hintergrund</div>
              <div className="text-xs text-amber-300/70 leading-relaxed">
                Lädt die neuesten DilSed-Updates leise herunter und wendet sie beim Neustart an.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoUpdate(!autoUpdate)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                autoUpdate ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${autoUpdate ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  autoUpdate ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-[1px] bg-amber-500/20" />

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-bold text-amber-100">Entwicklermodus</div>
              <div className="text-xs text-amber-300/70 leading-relaxed">
                Ermöglicht das schnelle Kopieren von Benutzer-, Kanal- und Server-IDs per Rechtsklick.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDevMode(!devMode)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                devMode ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full ${devMode ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                  devMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <KeybindsSection
          keybinds={keybinds}
          setKeybinds={setKeybinds}
          recordingKeybindId={recordingKeybindId}
          setRecordingKeybindId={setRecordingKeybindId}
          onResetKeybinds={onResetKeybinds}
          onAddKeybind={onAddKeybind}
          onDeleteKeybind={onDeleteKeybind}
          onUpdateKeybindAction={onUpdateKeybindAction}
          isEmbedded={true}
        />
      </div>
    </div>
  );
}
