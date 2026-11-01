import React, { useState } from 'react';
import { X, Search, Check, Copy, Link, Sparkles, UserPlus } from 'lucide-react';

export default function InviteServerModal({ isOpen, onClose, server, friends = [] }) {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedFriends, setInvitedFriends] = useState({});

  if (!isOpen || !server) return null;

  const inviteLink = `https://dilsed.gg/${server.id || 'community-invite'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInviteFriend = (friendId) => {
    setInvitedFriends((prev) => ({ ...prev, [friendId]: true }));
  };

  const filteredFriends = friends.filter((f) =>
    f.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h2 className="text-lg font-bold text-white mb-1">
            Lade Freunde auf den Server {server.name} ein
          </h2>
          <p className="text-xs text-discord-textMuted mb-4">
            Lade einen Freund direkt ein oder teile den Einladungslink unten.
          </p>

          {/* Search Friends input */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Freunde suchen"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:ring-1 focus:ring-discord-blurple"
            />
            <Search className="w-3.5 h-3.5 text-discord-textMuted absolute right-3 top-2.5 pointer-events-none" />
          </div>

          {/* Friends List with Quick Invite */}
          <div className="max-h-44 overflow-y-auto space-y-1 mb-5 pr-1">
            {filteredFriends.length === 0 ? (
              <div className="py-6 text-center text-xs text-discord-textMuted bg-discord-darkest/40 rounded-xl border border-discord-divider/20">
                Keine Freunde zum Einladen gefunden. Teile den Link unten!
              </div>
            ) : (
              filteredFriends.map((friend) => {
              const isInvited = invitedFriends[friend.id];
              return (
                <div
                  key={friend.id}
                  className="flex items-center justify-between p-2 rounded hover:bg-discord-hoverChannel transition"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={friend.avatar}
                      alt={friend.displayName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {friend.displayName}
                      </div>
                      <div className="text-[10px] text-discord-textMuted">
                        @{friend.username}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInviteFriend(friend.id)}
                    disabled={isInvited}
                    className={`px-3 py-1 rounded text-xs font-semibold transition ${
                      isInvited
                        ? 'bg-discord-green/20 text-discord-green border border-discord-green/40'
                        : 'bg-discord-blurple hover:bg-discord-blurpleHover text-white'
                    }`}
                  >
                    {isInvited ? 'Eingeladen' : 'Einladen'}
                  </button>
                </div>
              );
            })
            )}
          </div>

          {/* Invite Link Box */}
          <div>
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              ODER SENDE EINEN SERVER-EINLADUNGSLINK
            </label>
            <div className="flex items-center bg-discord-darkest rounded-lg p-1 border border-discord-darkest focus-within:border-discord-blurple">
              <input
                type="text"
                readOnly
                value={inviteLink}
                className="bg-transparent flex-1 text-xs text-white px-2 py-1 font-mono focus:outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-4 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition shadow"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopiert!' : 'Kopieren'}</span>
              </button>
            </div>
            <p className="text-[10px] text-discord-textMuted mt-1.5">
              Dein Einladungslink ist für 7 Tage gültig.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
