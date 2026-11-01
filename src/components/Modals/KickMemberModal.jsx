import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function KickMemberModal({ isOpen, onClose, member, serverName, onConfirmKick }) {
  const [reason, setReason] = useState('');

  if (!isOpen || !member) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmKick(member, reason.trim() || 'Regelverstoß');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-discord-divider/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <AlertTriangle className="w-5 h-5 text-discord-red" />
            <span>'{member.displayName}' kicken</span>
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
          <strong className="text-white">{serverName || 'diesem Server'}</strong> kicken? Mit einem Einladungslink kann die Person erneut beitreten.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-discord-textMuted uppercase mb-1.5">
              GRUND FÜR DEN KICK (OPTIONAL)
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="z. B. Verstoß gegen Community-Regeln, Spam..."
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
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Kicken</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
