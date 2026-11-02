import React, { useState, useEffect } from 'react';
import DirectMessagesSidebar from './DirectMessagesSidebar';
import FriendsTabsHeader from './FriendsTabsHeader';
import AddFriendView from './AddFriendView';
import FriendsListView from './FriendsListView';
import ActiveNowSidebar from './ActiveNowSidebar';
import DirectMessageChatView from './DirectMessageChatView';
import { playMessagePingSound } from '../../soundEffects';
import {
  subscribeToNetworkSync,
  broadcastFriendRequest,
  broadcastDm
} from '../../supabaseClient';

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
  const [activeTab, setActiveTab] = useState('online');
  const [activeFriendId, setActiveFriendId] = useState(null);
  const [dmInput, setDmInput] = useState('');
  const [addFriendInput, setAddFriendInput] = useState('');
  const [addFriendSuccess, setAddFriendSuccess] = useState(false);

  const activeFriend = friends.find((f) => f.id === activeFriendId);

  const filteredFriends = friends.filter((f) => {
    if (activeTab === 'online') return f.status !== 'offline';
    return true;
  });

  // Supabase Realtime Listener for Friend Requests and Incoming DMs
  useEffect(() => {
    if (!currentUser?.id) return;

    const unsub = subscribeToNetworkSync(
      currentUser,
      (req) => {
        const fromUser = req.fromUser;
        if (!fromUser || fromUser.id === currentUser.id) return;

        const newFriend = {
          id: fromUser.id,
          username: fromUser.username,
          displayName: fromUser.displayName || fromUser.username,
          avatar: fromUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          status: 'online',
          statusText: fromUser.statusText || '⚡ DilSed Web',
          category: 'all',
          messages: []
        };

        setFriends((prev) => {
          if (prev.some((f) => f.id === newFriend.id || f.username?.toLowerCase() === newFriend.username?.toLowerCase())) {
            return prev.map((f) => (f.id === newFriend.id ? { ...f, status: 'online' } : f));
          }
          return [...prev, newFriend];
        });
        playMessagePingSound();
      },
      (msg) => {
        if (!msg || msg.senderId === currentUser.id) return;

        setFriends((prev) => {
          const exists = prev.some((f) => f.id === msg.senderId);
          if (exists) {
            return prev.map((f) => {
              if (f.id === msg.senderId) {
                const msgs = f.messages || [];
                if (msgs.some((m) => m.id === msg.id)) return f;
                return { ...f, messages: [...msgs, { ...msg, isMe: false }] };
              }
              return f;
            });
          }

          const newFriend = {
            id: msg.senderId,
            username: msg.author,
            displayName: msg.author,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            status: 'online',
            statusText: '⚡ DilSed Web',
            category: 'all',
            messages: [{ ...msg, isMe: false }]
          };
          return [...prev, newFriend];
        });
        playMessagePingSound();
      }
    );

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, [currentUser?.id, currentUser?.username]);

  const handleSendDm = async (e) => {
    e?.preventDefault();
    if (!dmInput.trim() || !activeFriendId || !activeFriend) return;

    const textToSend = dmInput.trim();
    setDmInput('');

    const newMsg = await broadcastDm(currentUser, activeFriend.id, textToSend);

    setFriends((prev) =>
      prev.map((f) => {
        if (f.id === activeFriendId) {
          const msgs = f.messages || [];
          return { ...f, messages: [...msgs, { ...newMsg, isMe: true }] };
        }
        return f;
      })
    );
    playMessagePingSound();
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (!addFriendInput.trim()) return;

    const target = addFriendInput.trim();
    await broadcastFriendRequest(currentUser, target);

    const newFriend = {
      id: 'f_' + target.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      username: target,
      displayName: target.split('#')[0] || target,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      status: 'online',
      statusText: '⚡ DilSed Web',
      category: 'all',
      messages: []
    };

    setFriends((prev) => {
      if (prev.some((f) => f.username?.toLowerCase() === target.toLowerCase())) return prev;
      return [...prev, newFriend];
    });

    setAddFriendInput('');
    setAddFriendSuccess(true);
    setTimeout(() => setAddFriendSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex min-w-0 h-full">
      <DirectMessagesSidebar
        friends={friends}
        activeFriendId={activeFriendId}
        setActiveFriendId={setActiveFriendId}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDeafened={isDeafened}
        setIsDeafened={setIsDeafened}
        onOpenSettings={onOpenSettings}
      />

      {activeFriendId === null ? (
        <div className="flex-1 bg-[#0a0a0d] flex flex-col min-w-0">
          <FriendsTabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 flex overflow-hidden">
            {activeTab === 'add' ? (
              <AddFriendView
                addFriendInput={addFriendInput}
                setAddFriendInput={setAddFriendInput}
                handleAddFriend={handleAddFriend}
                addFriendSuccess={addFriendSuccess}
                currentUser={currentUser}
              />
            ) : (
              <FriendsListView
                activeTab={activeTab}
                filteredFriends={filteredFriends}
                friends={friends}
                setActiveFriendId={setActiveFriendId}
                setActiveTab={setActiveTab}
              />
            )}

            <ActiveNowSidebar friends={friends} />
          </div>
        </div>
      ) : (
        <DirectMessageChatView
          activeFriend={activeFriend}
          currentUser={currentUser}
          dmInput={dmInput}
          setDmInput={setDmInput}
          handleSendDm={handleSendDm}
        />
      )}
    </div>
  );
}
