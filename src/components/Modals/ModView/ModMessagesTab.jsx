import React from 'react';

export default function ModMessagesTab({ userMessages = [] }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-1">
          LETZTE NACHRICHTEN DES BENUTZERS
        </h3>
        <p className="text-xs text-discord-textNormal">
          Übersicht der zuletzt in Kanälen gesendeten Nachrichten.
        </p>
      </div>

      <div className="space-y-2">
        {userMessages.length === 0 ? (
          <div className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 text-xs text-white">
            <div className="text-[11px] text-discord-textMuted mb-1">#allgemeiner-chat • Gestern 19:42</div>
            <div>Hallo zusammen! Das Projekt macht tolle Fortschritte, lasst uns heute Abend im Sprachkanal treffen.</div>
          </div>
        ) : (
          userMessages.map((msg, i) => (
            <div
              key={i}
              className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 text-xs text-white"
            >
              <div className="text-[11px] text-discord-textMuted mb-1">{msg.channel || '#allgemein'} • {msg.timestamp}</div>
              <div>{msg.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
