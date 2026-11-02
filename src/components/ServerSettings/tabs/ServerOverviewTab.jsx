import React from 'react';
import { Upload } from 'lucide-react';

export default function ServerOverviewTab({
  serverName,
  setServerName,
  serverIcon,
  setServerIcon,
  serverBanner,
  setServerBanner,
  serverThemeColor,
  setServerThemeColor,
  systemChannel,
  setSystemChannel,
  afkTimeout,
  setAfkTimeout,
  onSave
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Server-Übersicht & Design</h2>
      <p className="text-xs text-discord-textMuted mb-6">
        Passe den Namen, das Symbol, das Farbschema und die Systemkanäle deines Servers an.
      </p>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative group cursor-pointer">
          <img
            src={serverIcon || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150'}
            alt="Server icon"
            className="w-24 h-24 rounded-full object-cover border-2 border-discord-blurple shadow-xl"
          />
          <button
            type="button"
            onClick={() => {
              const url = prompt('Neue Server-Icon-URL eingeben:', serverIcon);
              if (url) setServerIcon(url);
            }}
            className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white font-bold transition cursor-pointer"
          >
            <Upload className="w-5 h-5 mb-1" />
            ÄNDERN
          </button>
        </div>
        <div className="flex-1">
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            SERVERNAME
          </label>
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            className="w-full bg-discord-darkest rounded px-3 py-2 text-sm text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
          />
        </div>
      </div>

      {/* Server Theme Accent Color */}
      <div className="mb-6 bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30">
        <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-2">
          SERVER-AKZENTFARBE
        </label>
        <div className="flex items-center gap-2.5">
          {['#5865F2', '#23a55a', '#f0b232', '#eb459e', '#ed4245', '#9b59b6', '#3498db', '#1abc9c'].map((col) => (
            <button
              key={col}
              onClick={() => setServerThemeColor(col)}
              className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                serverThemeColor === col ? 'border-white scale-110 shadow' : 'border-transparent'
              }`}
              style={{ backgroundColor: col }}
            />
          ))}
        </div>
      </div>

      {/* Server Banner & Splash */}
      <div className="mb-6">
        <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-2">
          SERVER-BANNER & WILLKOMMENS-DESIGN
        </label>
        <div className="h-32 rounded-xl overflow-hidden border border-discord-divider/30 relative group shadow-lg">
          <img
            src={serverBanner || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600'}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => {
              const url = prompt('Neue Server-Banner-URL eingeben:', serverBanner);
              if (url) setServerBanner(url);
            }}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-semibold transition cursor-pointer"
          >
            Banner-Bild ändern
          </button>
        </div>
      </div>

      {/* Channels setup */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            KANAL FÜR SYSTEMNACHRICHTEN
          </label>
          <select
            value={systemChannel}
            onChange={(e) => setSystemChannel(e.target.value)}
            className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:outline-none cursor-pointer"
          >
            <option value="allgemein">#allgemein</option>
            <option value="ankündigungen">#ankündigungen</option>
            <option value="willkommen">#willkommen</option>
          </select>
        </div>
        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            AFK-TIMEOUT
          </label>
          <select
            value={afkTimeout}
            onChange={(e) => setAfkTimeout(e.target.value)}
            className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:outline-none cursor-pointer"
          >
            <option value="60">1 Minute</option>
            <option value="300">5 Minuten (Standard)</option>
            <option value="900">15 Minuten</option>
            <option value="1800">30 Minuten</option>
            <option value="3600">1 Stunde</option>
          </select>
        </div>
      </div>

      <button
        onClick={onSave}
        className="bg-discord-green hover:bg-discord-green/90 text-white font-semibold px-6 py-2 rounded text-xs transition shadow cursor-pointer"
      >
        Änderungen speichern
      </button>
    </div>
  );
}
