import React, { useState } from 'react';
import { X, Shield, Lock, MessageSquare, Check } from 'lucide-react';

export default function ServerPrivacyModal({ isOpen, onClose, server }) {
  const [allowDms, setAllowDms] = useState(true);
  const [shareActivity, setShareActivity] = useState(true);

  if (!isOpen || !server) return null;

  const handleSave = () => {
    alert(`Datenschutzeinstellungen für ${server.name} aktualisiert!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-discord-divider/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-discord-green" />
            <h2 className="text-lg font-bold text-white">
              Datenschutzeinstellungen für {server.name}
            </h2>
          </div>
          <p className="text-xs text-discord-textMuted mb-6">
            Lege fest, wie Mitglieder auf diesem Server mit dir interagieren können.
          </p>

          <div className="space-y-4">
            {/* Allow DMs */}
            <div className="bg-discord-darkest/70 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white mb-0.5">
                  Direktnachrichten (DMs)
                </div>
                <div className="text-[11px] text-discord-textMuted leading-relaxed max-w-xs">
                  Mitglieder dieses Servers können dir Direktnachrichten senden, auch wenn sie nicht auf deiner Freundesliste sind.
                </div>
              </div>
              <input
                type="checkbox"
                checked={allowDms}
                onChange={(e) => setAllowDms(e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>

            {/* Share Activity */}
            <div className="bg-discord-darkest/70 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white mb-0.5">
                  Aktivitätsstatus
                </div>
                <div className="text-[11px] text-discord-textMuted leading-relaxed max-w-xs">
                  Mitglieder dieses Servers können sehen, welche Spiele du spielst oder was du auf Spotify hörst.
                </div>
              </div>
              <input
                type="checkbox"
                checked={shareActivity}
                onChange={(e) => setShareActivity(e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition shadow"
            >
              Anwenden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
