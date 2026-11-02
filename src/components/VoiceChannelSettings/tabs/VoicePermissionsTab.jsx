import React from 'react';
import { Lock, Unlock, X, Minus, Check } from 'lucide-react';
import { ROLES_LIST, PERMISSION_CONFIGS } from '../constants';

export default function VoicePermissionsTab({
  isPrivate,
  setIsPrivate,
  selectedRoleId,
  setSelectedRoleId,
  rolePermissions,
  togglePermission,
  setHasChanges
}) {
  const currentRolePerms = rolePermissions[selectedRoleId] || {};

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">
          Kanalberechtigungen & Zugriff
        </h1>
        <p className="text-xs text-discord-textMuted">
          Lege fest, wer diesen Sprachraum sehen, betreten und darin sprechen darf.
        </p>
      </div>

      {/* PRIVATER KANAL SWITCH */}
      <div
        onClick={() => {
          setIsPrivate(!isPrivate);
          setHasChanges(true);
        }}
        className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
          isPrivate
            ? 'bg-discord-blurple/10 border-discord-blurple'
            : 'bg-discord-darkest/60 border-discord-divider/40 hover:bg-discord-darkest'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isPrivate ? 'bg-discord-blurple text-white' : 'bg-discord-channels text-discord-textMuted'
            }`}
          >
            {isPrivate ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
          </div>
          <div>
            <div className="font-bold text-white text-sm flex items-center gap-2">
              <span>Privater Sprachraum</span>
              {isPrivate && (
                <span className="text-[10px] bg-discord-blurple/30 text-discord-blurple px-2 py-0.5 rounded-full font-bold">
                  GESCHÜTZT
                </span>
              )}
            </div>
            <div className="text-xs text-discord-textMuted leading-relaxed">
              Nur ausgewählte Rollen und Mitglieder können diesen privaten Sprachraum sehen und betreten.
            </div>
          </div>
        </div>

        <div
          className={`w-12 h-6 rounded-full p-1 transition flex items-center ${
            isPrivate ? 'bg-discord-blurple justify-end' : 'bg-discord-channels justify-start'
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-md" />
        </div>
      </div>

      {/* ROLLEN & MITGLIEDER LISTE */}
      <div>
        <div className="text-[11px] font-bold text-discord-textMuted uppercase mb-2">
          ROLLEN ODER MITGLIEDER
        </div>
        <div className="flex flex-wrap gap-2">
          {ROLES_LIST.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRoleId(role.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                selectedRoleId === role.id
                  ? 'bg-discord-blurple text-white border-discord-blurple shadow-md'
                  : 'bg-discord-darkest/60 border-discord-divider/40 text-discord-textNormal hover:bg-discord-darkest'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: role.color }}
              />
              <span>{role.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ERWEITERTE BERECHTIGUNGSTABELLE */}
      <div className="bg-discord-darkest/60 border border-discord-divider/40 rounded-2xl overflow-hidden">
        <div className="p-3 bg-discord-channels/40 border-b border-discord-divider/30 flex items-center justify-between text-xs">
          <span className="font-bold text-white">
            BERECHTIGUNGEN FÜR {ROLES_LIST.find((r) => r.id === selectedRoleId)?.name}
          </span>
          <span className="text-[11px] text-discord-textMuted">
            [Rot: Verweigern] &bull; [Grau: Neutral] &bull; [Grün: Erlauben]
          </span>
        </div>

        <div className="divide-y divide-discord-divider/20">
          {PERMISSION_CONFIGS.map((perm) => {
            const isGranted = currentRolePerms[perm.key] === true;
            const isDenied = currentRolePerms[perm.key] === false;

            return (
              <div
                key={perm.key}
                className="p-3.5 flex items-center justify-between gap-4 hover:bg-discord-channels/30 transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white leading-tight">
                    {perm.title}
                  </div>
                  <div className="text-[11px] text-discord-textMuted mt-0.5 leading-normal">
                    {perm.desc}
                  </div>
                </div>

                {/* Tri-state Button Control */}
                <div className="flex items-center bg-discord-darkest border border-discord-divider/60 rounded-xl p-0.5 gap-0.5 flex-shrink-0">
                  {/* Red X (Deny) */}
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.key, false)}
                    className={`w-7 h-6 rounded-lg flex items-center justify-center transition ${
                      isDenied
                        ? 'bg-discord-red text-white'
                        : 'text-discord-textMuted hover:text-white'
                    }`}
                    title="Nicht erlauben"
                  >
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  {/* Gray Dash (Neutral / Inherit) */}
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.key, undefined)}
                    className={`w-7 h-6 rounded-lg flex items-center justify-center transition ${
                      !isGranted && !isDenied
                        ? 'bg-discord-channels text-white'
                        : 'text-discord-textMuted hover:text-white'
                    }`}
                    title="Standard verwenden"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  {/* Green Check (Allow) */}
                  <button
                    type="button"
                    onClick={() => togglePermission(perm.key, true)}
                    className={`w-7 h-6 rounded-lg flex items-center justify-center transition ${
                      isGranted
                        ? 'bg-discord-green text-white'
                        : 'text-discord-textMuted hover:text-white'
                    }`}
                    title="Erlauben"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
