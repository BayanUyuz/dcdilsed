import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function ServerAutoModTab({ autoModRules, setAutoModRules }) {
  const rules = [
    { key: 'blockProfanity', title: 'Beleidigende & unangemessene Sprache blockieren', desc: 'KI-Filter erkennt Beleidigungen und Hassrede automatisch.' },
    { key: 'blockSpam', title: 'Spam & wiederholte Nachrichten blockieren', desc: 'Verwarnt Konten bei Text-Spam sofort und löscht Nachrichten.' },
    { key: 'blockPhishingLinks', title: 'Verdächtige & Phishing-Links blockieren', desc: 'Erkennt unbekannte oder betrügerische Links und blockiert diese.' },
    { key: 'blockMentionSpam', title: 'Massen-Erwähnungen (@mentions) verhindern', desc: 'Blockiert Nachrichten mit mehr als 5 Benutzer-Erwähnungen auf einmal.' },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="w-6 h-6 text-discord-blurple" />
        <h2 className="text-xl font-bold text-white">AutoMod (Automatische Moderation)</h2>
      </div>
      <p className="text-xs text-discord-textMuted mb-6">
        Blockiere schädliche Inhalte, Spam und Phishing-Links automatisch vor dem Senden.
      </p>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.key}
            className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
          >
            <div className="max-w-md">
              <div className="text-xs font-bold text-white mb-0.5">{rule.title}</div>
              <div className="text-[10px] text-discord-textMuted">{rule.desc}</div>
            </div>
            <input
              type="checkbox"
              checked={autoModRules[rule.key]}
              onChange={(e) =>
                setAutoModRules((p) => ({ ...p, [rule.key]: e.target.checked }))
              }
              className="w-4 h-4 accent-discord-blurple cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
