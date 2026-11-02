import React from 'react';
import { Check } from 'lucide-react';

export const AVAILABLE_ROLES = [
  { id: 'r_admin', name: 'Administrator', color: '#5865F2', desc: 'Besitzt alle Berechtigungen.' },
  { id: 'r_mod', name: 'Moderator', color: '#23a55a', desc: 'Kann Mitglieder stummschalten, kicken und bannen.' },
  { id: 'r_dev', name: 'Entwickler', color: '#f0b232', desc: 'Verwaltet Bots und API-Integrationen.' },
  { id: 'r_vip', name: 'VIP-Unterstützer', color: '#eb459e', desc: 'Exklusive Sprachräume und Farb-Vorteile.' },
  { id: 'r_member', name: 'Mitglied', color: '#949ba4', desc: 'Standard-Zugriff auf Chat und Sprachräume.' },
];

export default function ModRolesTab({ member, onToggleRole }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-2">
          SERVER-ROLLEN
        </h3>
        <p className="text-xs text-discord-textNormal mb-4">
          Weise diesem Mitglied Rollen zu oder entferne sie mit einem Klick.
        </p>
      </div>

      <div className="space-y-2">
        {AVAILABLE_ROLES.map((role) => {
          const hasRole = member.role === role.name;
          return (
            <div
              key={role.id}
              onClick={() => onToggleRole(member, role)}
              className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                hasRole
                  ? 'bg-discord-blurple/10 border-discord-blurple'
                  : 'bg-discord-channels/40 border-discord-divider/30 hover:bg-discord-channels/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: role.color }}
                />
                <div>
                  <div className="font-semibold text-white text-xs">
                    {role.name}
                  </div>
                  <div className="text-[11px] text-discord-textMuted">
                    {role.desc}
                  </div>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                  hasRole
                    ? 'bg-discord-blurple border-discord-blurple text-white'
                    : 'border-discord-divider/80 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
