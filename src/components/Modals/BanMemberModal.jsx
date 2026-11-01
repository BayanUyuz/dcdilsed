import React, { useState } from 'react';
import { X, Ban } from 'lucide-react';

export default function BanMemberModal({ isOpen, onClose, member, serverName, onConfirmBan }) {
  const [reason, setReason] = useState('');
  const [deleteMessageDays, setDeleteMessageDays] = useState('24h');

  if (!isOpen || !member) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmBan(member, reason.trim() || 'Verstoß gegen die Server-Regeln', deleteMessageDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-discord-divider/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Ban className="w-5 h-5 text-discord-red" />
            <span>'{member.displayName}' bannen</span>
          </div>
          <button
            onClick={onClose}
            className="text-discord-textMuted hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-discord-textNormal leading-relaxed mb-4">
          Möchtest du <strong className="text-white">@{member.displayName}</strong> wirklich von{' '}
          <strong className="text-white">{serverName || 'diesem Server'}</strong> bannen? Die Person kann erst wieder beitreten, wenn der Bann aufgehoben wird.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Delete Message History */}
          <div>
            <label className="block text-[11px] font-bold text-discord-textMuted uppercase mb-1.5">
              NACHRICHTENVERLAUF LÖSCHEN
            </label>
            <div className="space-y-1.5 bg-discord-chat p-2.5 rounded-xl border border-discord-divider/40 text-xs">
              {[
                { id: 'none', label: 'Keine Nachrichten löschen' },
                { id: '24h', label: 'Nachrichten der letzten 24 Stunden' },
                { id: '7d', label: 'Nachrichten der letzten 7 Tage' },
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 text-discord-textNormal cursor-pointer hover:text-white">
                  <input
                    type="radio"
                    name="deleteMessages"
                    checked={deleteMessageDays === opt.id}
                    onChange={() => setDeleteMessageDays(opt.id)}
                    className="accent-discord-blurple"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-[11px] font-bold text-discord-textMuted uppercase mb-1.5">
              GRUND FÜR DEN BANN (OPTIONAL)
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="z. B. Schwerer Regelverstoß, unerlaubte Werbung oder Spam..."
              className="w-full bg-discord-chat border border-discord-divider/60 rounded-xl p-3 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-red resize-none"
              maxLength={200}
            />
            <div className="text-right text-[10px] text-discord-textMuted mt-1">
              {reason.length}/200
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-discord-divider/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white hover:underline transition"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-discord-red hover:bg-red-600 text-white transition shadow-md flex items-center gap-1.5"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Bannen</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
