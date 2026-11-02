import React from 'react';
import { Plus } from 'lucide-react';

export default function ServerRolesTab({
  roles,
  activeRoleId,
  setActiveRoleId,
  currentRole,
  onAddNewRole,
  updateRoleProperty
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Rollen & Berechtigungen</h2>
          <p className="text-xs text-discord-textMuted">
            Weise Mitgliedern Rollen zu und passe deren Berechtigungen und Farben an.
          </p>
        </div>
        <button
          onClick={onAddNewRole}
          className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Rolle erstellen</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-discord-darkest p-4 rounded-xl border border-discord-divider/30">
        {/* Roles sidebar */}
        <div className="space-y-1 border-r border-discord-divider/30 pr-3">
          <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-2">
            ROLLEN — {roles.length}
          </div>
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRoleId(r.id)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition cursor-pointer ${
                activeRoleId === r.id
                  ? 'bg-discord-activeChannel text-white font-semibold'
                  : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: r.color }}
                />
                <span className="truncate">{r.name}</span>
              </div>
              <span className="text-[10px] text-discord-textMuted">{r.membersCount}</span>
            </button>
          ))}
        </div>

        {/* Role details */}
        <div className="col-span-2 space-y-4 pl-2">
          <div>
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              ROLLENNAME
            </label>
            <input
              type="text"
              value={currentRole.name}
              onChange={(e) => updateRoleProperty('name', e.target.value)}
              className="w-full bg-discord-chat rounded px-3 py-1.5 text-xs text-white border border-discord-divider/40 focus:border-discord-blurple focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1.5">
              ROLLENFARBE
            </label>
            <div className="flex items-center gap-2">
              {['#5865F2', '#23a55a', '#f0b232', '#eb459e', '#ed4245', '#9b59b6', '#3498db'].map((c) => (
                <button
                  key={c}
                  onClick={() => updateRoleProperty('color', c)}
                  className={`w-7 h-7 rounded-full border-2 transition cursor-pointer ${
                    currentRole.color === c ? 'border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-discord-divider/30 space-y-3">
            <div className="text-[10px] font-bold text-discord-textMuted uppercase">
              GRUNDLEGENDE BERECHTIGUNGEN
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Administrator</div>
                <div className="text-[10px] text-discord-textMuted">Verwaltet alle Kanäle und Servereinstellungen uneingeschränkt</div>
              </div>
              <input
                type="checkbox"
                checked={currentRole.isAdmin}
                onChange={(e) => updateRoleProperty('isAdmin', e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Kanäle verwalten</div>
                <div className="text-[10px] text-discord-textMuted">Kann neue Kanäle erstellen, bearbeiten oder löschen</div>
              </div>
              <input
                type="checkbox"
                checked={currentRole.canManageChannels}
                onChange={(e) => updateRoleProperty('canManageChannels', e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Mitglieder kicken</div>
                <div className="text-[10px] text-discord-textMuted">Kann Mitglieder, die gegen Regeln verstoßen, vom Server entfernen</div>
              </div>
              <input
                type="checkbox"
                checked={currentRole.canKick}
                onChange={(e) => updateRoleProperty('canKick', e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
