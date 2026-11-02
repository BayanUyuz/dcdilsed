import React from 'react';
import { Bot } from 'lucide-react';

export default function VoiceIntegrationsTab() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">
          Integrationen & Webhooks
        </h1>
        <p className="text-xs text-discord-textMuted">
          Verwalte Sprachraum-Aktivitäten und Bot-Integrationen.
        </p>
      </div>

      <div className="p-4 bg-discord-darkest/60 border border-discord-divider/40 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-discord-blurple/20 text-discord-blurple flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">Sprachraum-Bots</div>
            <div className="text-xs text-discord-textMuted">
              Steuere den Zugriff von Musik-, Aufnahme- und Aktivitäts-Bots auf diesen Raum.
            </div>
          </div>
        </div>

        <button
          type="button"
          className="px-3.5 py-1.5 rounded-xl bg-discord-channels hover:bg-discord-hoverChannel text-white text-xs font-semibold border border-discord-divider/40 transition"
        >
          Verwalten
        </button>
      </div>
    </div>
  );
}
