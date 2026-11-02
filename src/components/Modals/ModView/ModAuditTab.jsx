import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';

export default function ModAuditTab() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-1">
          SICHERHEITS- & AUDIT-LOGS
        </h3>
        <p className="text-xs text-discord-textNormal">
          Verstöße, Verwarnungen und Moderationsprotokolle dieses Benutzers.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 flex items-start gap-3 text-xs">
          <div className="w-7 h-7 rounded-lg bg-discord-green/20 text-discord-green flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Keine Auffälligkeiten</div>
            <div className="text-discord-textMuted text-[11px]">
              Dieser Benutzer hat bisher gegen keine AutoMod- oder Moderationsregeln verstoßen.
            </div>
            <div className="text-[10px] text-discord-textMuted mt-1">Heute 12:45</div>
          </div>
        </div>

        <div className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 flex items-start gap-3 text-xs">
          <div className="w-7 h-7 rounded-lg bg-discord-blurple/20 text-discord-blurple flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold">Server-Regeln akzeptiert</div>
            <div className="text-discord-textMuted text-[11px]">
              Das Mitglied hat die Willkommensprüfung und den 2FA-Sicherheitscheck erfolgreich bestanden.
            </div>
            <div className="text-[10px] text-discord-textMuted mt-1">04. Jun. 2023, 15:30</div>
          </div>
        </div>
      </div>
    </div>
  );
}
