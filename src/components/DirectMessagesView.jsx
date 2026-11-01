import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  Phone,
  Video,
  Pin,
  UserPlus,
  Search,
  MoreVertical,
  Check,
  Send,
  Smile,
  Gift,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMessagePingSound } from '../soundEffects';

export default function DirectMessagesView({
  friends,
  setFriends,
  currentUser,
  onOpenSettings,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
}) {
  const [activeTab, setActiveTab] = useState('online'); // 'online' | 'all' | 'pending' | 'add'
  const [activeFriendId, setActiveFriendId] = useState(null);
  const [dmInput, setDmInput] = useState('');
  const [addFriendInput, setAddFriendInput] = useState('');
  const [addFriendSuccess, setAddFriendSuccess] = useState(false);

  const activeFriend = friends.find((f) => f.id === activeFriendId);

  const filteredFriends = friends.filter((f) => {
    if (activeTab === 'online') return f.status !== 'offline';
    return true;
  });

  const handleSendDm = (e) => {
    e?.preventDefault();
    if (!dmInput.trim() || !activeFriendId) return;

    const newMsg = {
      id: 'dm_' + Date.now(),
      author: currentUser.displayName,
      content: dmInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setFriends((prev) =>
      prev.map((f) => {
        if (f.id === activeFriendId) {
          return {
            ...f,
            messages: [...(f.messages || []), newMsg],
          };
        }
        return f;
      })
    );

    setDmInput('');
    playMessagePingSound();

    // Simulated reply after 1.5 seconds if friend exists
    if (!activeFriend) return;
    const friendName = activeFriend.displayName;
    setTimeout(() => {
      const replyMsg = {
        id: 'reply_' + Date.now(),
        author: friendName,
        content: 'Sieht super aus! Die DilSed Web-Version läuft wirklich sehr flüssig. 👍',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };

      setFriends((prev) =>
        prev.map((f) => {
          if (f.id === activeFriendId) {
            return {
              ...f,
              messages: [...(f.messages || []), replyMsg],
            };
          }
          return f;
        })
      );
      playMessagePingSound();
    }, 1500);
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!addFriendInput.trim()) return;

    const newFriend = {
      id: 'f_' + Date.now(),
      username: addFriendInput.trim(),
      displayName: addFriendInput.trim().split('#')[0] || addFriendInput.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      statusText: 'Neuer Freund hinzugefügt',
      category: 'all',
      messages: []
    };

    setFriends((prev) => [...prev, newFriend]);
    setAddFriendInput('');
    setAddFriendSuccess(true);
    setTimeout(() => setAddFriendSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex min-w-0 h-full">
      {/* DM Sidebar */}
      <aside className="w-60 bg-discord-channels flex flex-col select-none flex-shrink-0 border-r border-discord-darkest/20">
        {/* Search header */}
        <div className="h-12 px-3 flex items-center border-b border-discord-darkest/30 shadow-sm">
          <button
            onClick={() => setActiveFriendId(null)}
            className="w-full h-7 bg-discord-darkest rounded text-xs text-discord-textMuted px-2 flex items-center justify-between hover:text-discord-textNormal"
          >
            <span>Finde oder starte eine Unterhaltung</span>
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* DM Navigation Items */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          <button
            onClick={() => setActiveFriendId(null)}
            className={`w-full px-3 py-2 rounded-md flex items-center gap-3 text-sm transition ${
              activeFriendId === null
                ? 'bg-amber-400/15 text-amber-300 font-semibold border-l-2 border-amber-400 shadow-sm'
                : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Freunde</span>
          </button>

          {/* Direct Messages Header */}
          <div className="pt-4 pb-1 px-3 text-[11px] font-bold text-discord-textMuted tracking-wider uppercase flex items-center justify-between">
            <span>DIREKTNACHRICHTEN</span>
            <button
              onClick={() => {
                setActiveFriendId(null);
                setActiveTab('add');
              }}
              title="DM erstellen"
              className="hover:text-white"
            >
              <UserPlus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DM Friend Items */}
          {friends.map((friend) => {
            const isActive = activeFriendId === friend.id;
            return (
              <button
                key={friend.id}
                onClick={() => setActiveFriendId(friend.id)}
                className={`w-full px-2 py-2 rounded-md flex items-center gap-3 text-sm transition group ${
                  isActive
                    ? 'bg-amber-400/15 text-amber-300 font-semibold border-l-2 border-amber-400 shadow-sm'
                    : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={friend.avatar}
                    alt={friend.displayName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-channels ${
                      friend.status === 'online'
                        ? 'bg-discord-green'
                        : friend.status === 'idle'
                        ? 'bg-discord-yellow'
                        : friend.status === 'dnd'
                        ? 'bg-discord-red'
                        : 'bg-[#747f8d]'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="truncate font-medium text-discord-textHeader">
                    {friend.displayName}
                  </div>
                  <div className="truncate text-xs text-discord-textMuted">
                    {friend.statusText}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* User Dock */}
        <div className="h-[52px] bg-discord-userdock px-2 flex items-center justify-between flex-shrink-0">
          <div
            onClick={onOpenSettings}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-discord-hoverChannel cursor-pointer transition flex-1 min-w-0"
          >
            <div className="relative flex-shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-discord-green border-2 border-discord-userdock" />
            </div>
            <div className="truncate min-w-0">
              <div className="text-sm font-semibold text-white truncate leading-tight">
                {currentUser.displayName}
              </div>
              <div className="text-[11px] text-discord-textMuted truncate">
                {currentUser.statusText}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      {activeFriendId === null ? (
        /* Friends Dashboard */
        <div className="flex-1 bg-discord-chat flex flex-col min-w-0">
          {/* Top Bar Tabs */}
          <header className="h-12 px-4 border-b border-discord-darkest/30 flex items-center justify-between shadow-sm select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-discord-textMuted pr-3 border-r border-discord-divider">
                <Users className="w-5 h-5 text-discord-textMuted" />
                <span className="font-semibold text-white text-sm">Freunde</span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('online')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeTab === 'online'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold'
                      : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeTab === 'all'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold'
                      : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
                  }`}
                >
                  Alle
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    activeTab === 'pending'
                      ? 'bg-amber-400/20 text-amber-300 font-semibold'
                      : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
                  }`}
                >
                  Ausstehend
                </button>
                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-3 py-1 rounded-lg transition font-bold ${
                    activeTab === 'add'
                      ? 'bg-amber-400/30 text-amber-300 border border-amber-400/50'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:from-amber-300 hover:to-amber-400 shadow-md'
                  }`}
                >
                  Freund hinzufügen
                </button>
              </div>
            </div>
          </header>

          {/* Friends Content */}
          <div className="flex-1 flex overflow-hidden">
            {activeTab === 'add' ? (
              /* Add Friend Screen */
              <div className="flex-1 p-6">
                <h3 className="text-white font-bold text-base uppercase mb-1">
                  FREUND HINZUFÜGEN
                </h3>
                <p className="text-xs text-discord-textMuted mb-4">
                  Du kannst Freunde mit ihrem Benutzernamen hinzufügen.
                </p>

                <form onSubmit={handleAddFriend} className="max-w-xl">
                  <div className="relative bg-discord-darkest rounded-lg flex items-center px-4 py-2.5 border border-discord-darkest focus-within:border-discord-blurple">
                    <input
                      type="text"
                      value={addFriendInput}
                      onChange={(e) => setAddFriendInput(e.target.value)}
                      placeholder="Benutzernamen eingeben (z. B. Wumpus#0001)"
                      className="bg-transparent flex-1 text-sm text-white placeholder-discord-textMuted focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!addFriendInput.trim()}
                      className="bg-discord-blurple hover:bg-discord-blurpleHover disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded transition"
                    >
                      Freundschaftsanfrage senden
                    </button>
                  </div>
                </form>

                {addFriendSuccess && (
                  <div className="mt-3 text-sm text-discord-green flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Freundschaftsanfrage erfolgreich gesendet und zur Freundesliste hinzugefügt!</span>
                  </div>
                )}
              </div>
            ) : (
              /* Friends List */
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-xs font-bold text-discord-textMuted uppercase mb-3">
                  {activeTab === 'online'
                    ? `ONLINE — ${filteredFriends.length}`
                    : `ALLE FREUNDE — ${friends.length}`}
                </div>

                {filteredFriends.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-20 text-discord-blurple" />
                    <p className="font-bold text-white text-sm mb-1">Keine Freunde gefunden</p>
                    <p className="text-xs text-discord-textMuted mb-6 max-w-sm mx-auto">
                      Niemand ist gerade hier. Füge Freunde über ihren DilSed-Benutzernamen hinzu!
                    </p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="bg-discord-green hover:bg-discord-greenHover text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow"
                    >
                      Freund hinzufügen
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filteredFriends.map((f) => (
                      <div
                        key={f.id}
                        className="group flex items-center justify-between p-2.5 hover:bg-discord-chathover rounded-lg transition border-t border-discord-divider/20"
                      >
                        <div
                          onClick={() => setActiveFriendId(f.id)}
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          <div className="relative">
                            <img
                              src={f.avatar}
                              alt={f.displayName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-chat ${
                                f.status === 'online'
                                  ? 'bg-discord-green'
                                  : f.status === 'idle'
                                  ? 'bg-discord-yellow'
                                  : f.status === 'dnd'
                                  ? 'bg-discord-red'
                                  : 'bg-[#747f8d]'
                              }`}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-white">
                              {f.displayName}
                            </div>
                            <div className="text-xs text-discord-textMuted">
                              {f.statusText}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveFriendId(f.id)}
                            className="w-9 h-9 rounded-full bg-discord-channels flex items-center justify-center text-discord-textNormal hover:text-white hover:bg-discord-hoverChannel transition"
                            title="Nachricht senden"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`${f.displayName} wird angerufen...`)}
                            className="w-9 h-9 rounded-full bg-discord-channels flex items-center justify-center text-discord-textNormal hover:text-white hover:bg-discord-hoverChannel transition"
                            title="Sprachanruf"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Active Now Sidebar */}
            <div className="w-80 border-l border-discord-darkest/30 p-4 hidden xl:block">
              <h3 className="font-bold text-white text-base mb-3">
                Jetzt aktiv
              </h3>
              {friends.filter((f) => f.status !== 'offline').length > 0 ? (
                <div className="space-y-3">
                  {friends
                    .filter((f) => f.status !== 'offline')
                    .map((f) => (
                      <div
                        key={f.id}
                        className="bg-discord-channels/40 border border-discord-divider/30 rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={f.avatar}
                            alt={f.displayName}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {f.displayName}
                            </div>
                            <div className="text-xs text-discord-textMuted">
                              {f.statusText || 'Online'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 px-4 bg-discord-channels/20 rounded-xl border border-dashed border-discord-divider/30 text-discord-textMuted text-xs">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30 text-discord-blurple" />
                  <p className="font-semibold text-white mb-1">Hier ist es im Moment ruhig</p>
                  <p className="text-[11px] leading-relaxed">
                    Wenn Freunde online Aktivitäten starten oder Musik hören, siehst du sie hier.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Active Direct Message Conversation */
        <div className="flex-1 bg-discord-chat flex flex-col min-w-0">
          <header className="h-12 px-4 border-b border-discord-darkest/30 flex items-center justify-between shadow-sm select-none">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src={activeFriend.avatar}
                  alt={activeFriend.displayName}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-discord-chat ${
                    activeFriend.status === 'online'
                      ? 'bg-discord-green'
                      : activeFriend.status === 'idle'
                      ? 'bg-discord-yellow'
                      : 'bg-discord-red'
                  }`}
                />
              </div>
              <h2 className="font-bold text-white text-base truncate">
                {activeFriend.displayName}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-discord-textMuted">
              <button
                onClick={() => alert(`${activeFriend.displayName} wird angerufen...`)}
                className="hover:text-white transition"
                title="Sprachanruf starten"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => alert(`Videoanruf mit ${activeFriend.displayName} wird gestartet...`)}
                className="hover:text-white transition"
                title="Videoanruf starten"
              >
                <Video className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* DM Messages Feed */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div className="pt-6 pb-4 border-b border-discord-divider/30">
              <img
                src={activeFriend.avatar}
                alt={activeFriend.displayName}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h1 className="text-2xl font-bold text-white mb-1">
                {activeFriend.displayName}
              </h1>
              <p className="text-sm text-discord-textMuted">
                Dies ist der Beginn deines Direktnachrichtenverlaufs mit {activeFriend.displayName}.
              </p>
            </div>

            {activeFriend.messages?.map((msg) => (
              <div key={msg.id} className="flex gap-4 px-2 py-1">
                <img
                  src={msg.isMe ? currentUser.avatar : activeFriend.avatar}
                  alt={msg.author}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">
                      {msg.author}
                    </span>
                    <span className="text-[11px] text-discord-textMuted">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="text-sm text-discord-textNormal mt-0.5">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DM Input Bar */}
          <div className="px-4 pb-6 pt-1 select-none">
            <form
              onSubmit={handleSendDm}
              className="bg-discord-input rounded-lg flex items-center px-4 py-2.5 focus-within:ring-1 focus-within:ring-discord-blurple"
            >
              <input
                type="text"
                value={dmInput}
                onChange={(e) => setDmInput(e.target.value)}
                placeholder={`Nachricht an @${activeFriend.displayName}`}
                className="bg-transparent flex-1 text-sm text-discord-textNormal placeholder-discord-textMuted/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!dmInput.trim()}
                className="text-discord-blurple disabled:opacity-40 hover:text-white p-1 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
