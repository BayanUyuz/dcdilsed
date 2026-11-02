import React from 'react';
import { Check } from 'lucide-react';

export default function ServerOnboardingTab({
  welcomeEnabled,
  setWelcomeEnabled,
  welcomeMessage,
  setWelcomeMessage
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Onboarding & Willkommens-Bildschirm</h2>
      <p className="text-xs text-discord-textMuted mb-6">
        Begrüße neue Mitglieder mit einem übersichtlichen Einstieg und empfohlenen Kanälen.
      </p>

      <div className="bg-discord-channels/60 rounded-xl p-5 border border-discord-divider/30 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-discord-divider/30">
          <div>
            <div className="text-xs font-bold text-white">Willkommens-Bildschirm aktivieren</div>
            <div className="text-[10px] text-discord-textMuted">Erleichtert neuen Mitgliedern die Orientierung</div>
          </div>
          <input
            type="checkbox"
            checked={welcomeEnabled}
            onChange={(e) => setWelcomeEnabled(e.target.checked)}
            className="w-4 h-4 accent-discord-green cursor-pointer"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            WILLKOMMENSNACHRICHT DES SERVERS
          </label>
          <textarea
            rows={3}
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            className="w-full bg-discord-darkest rounded p-3 text-xs text-white border border-discord-divider/30 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-2">
            EMPFOHLENE KANÄLE FÜR NEUE MITGLIEDER
          </label>
          <div className="space-y-2">
            {['#regeln-und-info', '#ankündigungen', '#allgemein'].map((ch, i) => (
              <div key={i} className="flex items-center gap-2 bg-discord-darkest p-2 rounded text-xs text-white">
                <Check className="w-3.5 h-3.5 text-discord-green" />
                <span>{ch}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => alert('Onboarding- und Willkommenseinstellungen gespeichert!')}
          className="bg-discord-green hover:bg-discord-green/90 text-white px-5 py-2 rounded text-xs font-semibold transition cursor-pointer"
        >
          Einstellungen speichern
        </button>
      </div>
    </div>
  );
}
