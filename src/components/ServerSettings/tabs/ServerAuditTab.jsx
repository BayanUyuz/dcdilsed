import React from 'react';

export default function ServerAuditTab({ auditLogs }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Audit-Log (Aktivitätsprotokoll)</h2>
      <p className="text-xs text-discord-textMuted mb-6">
        Protokoll der letzten administrativen Aktionen auf diesem Server.
      </p>

      <div className="space-y-2">
        {auditLogs.map((log, i) => (
          <div
            key={i}
            className="bg-discord-darkest p-3 rounded-lg border border-discord-divider/30 flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-bold text-white">{log.user}</span>{' '}
              <span className="text-discord-textMuted">{log.action}</span>
            </div>
            <span className="text-discord-textMuted text-[10px]">{log.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
