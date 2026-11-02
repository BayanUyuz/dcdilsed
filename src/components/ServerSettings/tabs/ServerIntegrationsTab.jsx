import React from 'react';
import { Plus, Webhook, Trash2 } from 'lucide-react';

export default function ServerIntegrationsTab({ webhooksList, setWebhooksList }) {
  const handleAddWebhook = () => {
    const name = prompt('Webhook-Name:');
    if (name) {
      setWebhooksList((p) => [
        ...p,
        { id: 'wh_' + Date.now(), name, channel: '#allgemein', url: `https://discord.com/api/webhooks/${Date.now()}` }
      ]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-white">Integrationen & Webhooks</h2>
        <button
          onClick={handleAddWebhook}
          className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Webhook erstellen</span>
        </button>
      </div>
      <p className="text-xs text-discord-textMuted mb-6">
        Verwende Webhooks, um automatische Benachrichtigungen von GitHub, Supabase oder Bots zu empfangen.
      </p>

      {webhooksList.length === 0 ? (
        <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-channels/40 rounded-xl border border-dashed border-discord-divider/30">
          Keine aktiven Webhook-Integrationen vorhanden.
        </div>
      ) : (
        <div className="space-y-3">
          {webhooksList.map((wh) => (
            <div
              key={wh.id}
              className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Webhook className="w-4 h-4 text-discord-green" />
                  <span>{wh.name}</span>
                  <span className="text-[10px] bg-discord-darkest px-2 py-0.5 rounded text-discord-textMuted">
                    {wh.channel}
                  </span>
                </div>
                <div className="text-[10px] text-discord-textMuted font-mono mt-1 truncate max-w-sm">
                  {wh.url}
                </div>
              </div>
              <button
                onClick={() => setWebhooksList((p) => p.filter((x) => x.id !== wh.id))}
                className="text-discord-red hover:bg-discord-red/20 p-1.5 rounded transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
