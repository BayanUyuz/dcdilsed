import React, { useState } from 'react';
import DirectMessagesSidebar from './DirectMessagesSidebar';
import FriendsTabsHeader from './FriendsTabsHeader';
import AddFriendView from './AddFriendView';
import FriendsListView from './FriendsListView';
import ActiveNowSidebar from './ActiveNowSidebar';
import DirectMessageChatView from './DirectMessageChatView';
import { playMessagePingSound } from '../../soundEffects';

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
