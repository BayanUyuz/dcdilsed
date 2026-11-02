import React from 'react';
import { Sliders } from 'lucide-react';

export default function AccessibilityPreview({
  currentUser,
  fontSize,
  messageDisplay,
  messageSpacing,
  roleColorStyle,
  showProfileBadges,
  highContrast,
  saturation,
  underlineLinks,
  desaturateRoleColors
}) {
  return (
    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Live-Chat-Vorschau für Barrierefreiheit</span>
        </span>
        <span className="text-[11px] text-amber-300/60 font-mono">
          {fontSize}px · {messageDisplay === 'cozy' ? 'Gemütlich' : 'Kompakt'} · Abstand: {messageSpacing}px
        </span>
      </div>

      <div
        style={{ filter: `grayscale(${100 - saturation}%)` }}
        className={`rounded-xl p-4 bg-[#070709] transition-all ${
          highContrast
            ? 'border-2 border-amber-400 ring-2 ring-amber-400/30 contrast-125'
            : 'border border-amber-500/20'
        }`}
      >
        {/* Message 1 */}
        {messageDisplay === 'cozy' ? (
          <div className="flex items-start gap-3 select-text" style={{ fontSize: `${fontSize}px` }}>
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-amber-500/30"
            />
            <div className="min-w-0 flex-1 leading-snug">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`font-bold transition-colors flex items-center gap-1 ${
                    roleColorStyle === 'name'
                      ? desaturateRoleColors ? 'text-amber-300' : 'text-amber-400'
                      : 'text-amber-100'
                  }`}
                >
                  {roleColorStyle === 'dot' && (
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${
                        desaturateRoleColors ? 'bg-amber-300' : 'bg-amber-400'
                      }`}
                    />
                  )}
                  {currentUser?.displayName || 'Benutzer'}
                </span>
                {showProfileBadges && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 font-bold uppercase tracking-wider border border-amber-500/30">
                    Administrator
                  </span>
                )}
                <span className="text-[11px] text-amber-300/60 font-normal">Heute um 14:45</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed">
                Willkommen im DilSed-Barrierefreiheitslabor! Schriftgröße, Zeilenabstände und Farbsättigung können hier direkt getestet werden.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-baseline gap-2 select-text font-mono" style={{ fontSize: `${fontSize}px` }}>
            <span className="text-[11px] text-amber-300/60 flex-shrink-0">14:45</span>
            <span
              className={`font-bold flex items-center gap-1 flex-shrink-0 ${
                roleColorStyle === 'name'
                  ? desaturateRoleColors ? 'text-amber-300' : 'text-amber-400'
                  : 'text-amber-100'
              }`}
            >
              {roleColorStyle === 'dot' && (
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    desaturateRoleColors ? 'bg-amber-300' : 'bg-amber-400'
                  }`}
                />
              )}
              {currentUser?.displayName || 'Benutzer'}:
            </span>
            <span className="text-amber-100/90 font-sans">
              Kompakter DilSed-Modus aktiv. Einzeilige Darstellung im IRC-Stil mit ausgeblendeten Avataren.
            </span>
          </div>
        )}

        {/* Message 2 */}
        <div
          style={{ marginTop: `${messageSpacing}px`, fontSize: `${fontSize}px` }}
          className={
            messageDisplay === 'cozy'
              ? 'flex items-start gap-3 select-text pt-1'
              : 'flex items-baseline gap-2 select-text font-mono'
          }
        >
          {messageDisplay === 'cozy' ? (
            <>
              <div className="w-10 flex-shrink-0" />
              <div className="min-w-0 flex-1 leading-snug">
                <p className="text-amber-100/90">
                  Weitere Informationen findest du auf unserer{' '}
                  <span
                    className={`cursor-pointer transition ${
                      underlineLinks ? 'underline font-semibold text-amber-300' : 'text-amber-400 hover:underline'
                    }`}
                  >
                    https://dilsed.com/accessibility
                  </span>{' '}
                  Hilfeseite.
                </p>
              </div>
            </>
          ) : (
            <>
              <span className="text-[11px] text-amber-300/60 flex-shrink-0">14:46</span>
              <span className="font-bold text-amber-100 flex-shrink-0">{currentUser?.displayName || 'Benutzer'}:</span>
              <span className="text-amber-100/90 font-sans">
                Link-Unterstützung:{' '}
                <span
                  className={`cursor-pointer ${
                    underlineLinks ? 'underline font-semibold text-amber-300' : 'text-amber-400 hover:underline'
                  }`}
                >
                  https://dilsed.com/accessibility
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
