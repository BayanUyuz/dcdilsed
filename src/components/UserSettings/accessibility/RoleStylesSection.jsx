import React from 'react';

export default function RoleStylesSection({
  roleColorStyle,
  setRoleColorStyle,
  showProfileBadges,
  setShowProfileBadges
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
        Anzeigenamen & Rollenfarben
      </h3>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div>
          <div className="text-sm font-bold text-amber-100 mb-1">Rollenfarben anzeigen</div>
          <div className="text-xs text-amber-300/70 mb-3">
            Wähle, wie Benutzernamen mit ihren jeweiligen Server-Rollenfarben hervorgehoben werden.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'name', label: 'Im Anzeigenamen anzeigen', desc: 'Name leuchtet direkt in Rollenfarbe' },
              { id: 'dot', label: 'Als Punkt anzeigen', desc: 'Farbiger Punkt neben dem Namen' },
              { id: 'none', label: 'Rollenfarben ausblenden', desc: 'Standardmäßige Textfarbe' },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setRoleColorStyle(opt.id)}
                className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                  roleColorStyle === opt.id
                    ? 'bg-amber-500/15 border-amber-400 text-amber-100 ring-1 ring-amber-400 font-bold shadow-md'
                    : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:border-amber-500/40 hover:text-amber-200'
                }`}
              >
                <span className="text-xs font-bold text-amber-200 mb-1">{opt.label}</span>
                <span className="text-[10px] text-amber-300/60">{opt.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[1px] bg-amber-500/20" />

        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-amber-100">Profilabzeichen und Avatar-Dekorationen anzeigen</div>
            <div className="text-xs text-amber-300/70">
              Zeigt Avatar-Dekorationen, Kronen und Profil-Badges im Chat an.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowProfileBadges(!showProfileBadges)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
              showProfileBadges ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full ${showProfileBadges ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                showProfileBadges ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
