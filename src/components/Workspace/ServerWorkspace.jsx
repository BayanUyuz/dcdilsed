import React from 'react';
import { FolderPlus, Compass, Plus } from 'lucide-react';
import ServerSidebar from '../ServerSidebar';
import ChannelSidebar from '../ChannelSidebar';
import VoiceRoomView from '../Voice/VoiceRoomView';
import ChatArea from '../ChatArea';
import MemberList from '../MemberList';

export default function ServerWorkspace({
  servers,
  activeServerId,
  setActiveServerId,
  activeChannelId,
  setActiveChannelId,
  currentServer,
  activeChannelObj,
  connectedVoiceChannel,
  setConnectedVoiceChannel,
  isVoiceRoomViewActive,
  setIsVoiceRoomViewActive,
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  messages,
  handleSendMessage,
  handleAddReaction,
  showMemberList,
  setShowMemberList,
  members,
  userTimeouts,
  userMutes,
  verifiedUsers,
  serverMutedUsers,
  serverDeafenedUsers,
  mentionTarget,
  setMentionTarget,
  handleOpenMemberContextMenu,
  handleViewProfile,
  setIsAddServerOpen,
  setIsExploreOpen,
  setIsSettingsOpen,
  setIsServerSettingsOpen,
  setIsCreateChannelOpen,
  setCreateChannelCategoryId,
  setIsInviteOpen,
  setIsCreateEventOpen,
  setIsAppDirectoryOpen,
  setIsNotificationsOpen,
  setIsPrivacyOpen,
  setIsCreateCategoryOpen,
  setIsEditServerProfileOpen,
  setSelectedVoiceChannelForSettings,
  setIsHomeActive
}) {
  return (
    <div className="flex-1 flex min-w-0 h-full">
      <ServerSidebar
        servers={servers}
        activeServerId={activeServerId}
        onSelectServer={(serverId) => {
          setActiveServerId(serverId);
          setIsVoiceRoomViewActive(false);
          const targetServer = servers.find((s) => s.id === serverId);
          if (targetServer) {
            const allChs = (targetServer.categories || []).flatMap((c) => c.channels || []);
            const firstText = allChs.find((c) => c.type === 'text') || allChs[0];
            setActiveChannelId(firstText?.id || null);
          }
        }}
        onOpenAddServer={() => setIsAddServerOpen(true)}
        onOpenExplore={() => setIsExploreOpen(true)}
      />

      {currentServer ? (
        <>
          <ChannelSidebar
            server={currentServer}
            activeChannelId={activeChannelId}
            onSelectChannel={(channelId) => {
              setActiveChannelId(channelId);
              setIsVoiceRoomViewActive(false);
            }}
            connectedVoiceChannel={connectedVoiceChannel}
            setConnectedVoiceChannel={setConnectedVoiceChannel}
            currentUser={currentUser}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
            isDeafened={isDeafened}
            setIsDeafened={setIsDeafened}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenServerSettings={() => setIsServerSettingsOpen(true)}
            onOpenCreateChannel={(catId) => {
              setCreateChannelCategoryId(catId || null);
              setIsCreateChannelOpen(true);
            }}
            onOpenVoiceRoomView={() => setIsVoiceRoomViewActive(true)}
            onOpenInvite={() => setIsInviteOpen(true)}
            onOpenCreateEvent={() => setIsCreateEventOpen(true)}
            onOpenAppDirectory={() => setIsAppDirectoryOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenCreateCategory={() => setIsCreateCategoryOpen(true)}
            onOpenEditServerProfile={() => setIsEditServerProfileOpen(true)}
            serverMutedUsers={serverMutedUsers}
            serverDeafenedUsers={serverDeafenedUsers}
            onOpenVoiceChannelSettings={(ch) => setSelectedVoiceChannelForSettings(ch)}
          />

          {isVoiceRoomViewActive && connectedVoiceChannel ? (
            <div className="flex-1 flex flex-col min-w-0 h-full relative">
              <VoiceRoomView
                voiceChannel={connectedVoiceChannel}
                currentUser={currentUser}
                onDisconnect={() => {
                  setConnectedVoiceChannel(null);
                  setIsVoiceRoomViewActive(false);
                }}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                isDeafened={isDeafened}
                setIsDeafened={setIsDeafened}
                members={members}
                serverMutedUsers={serverMutedUsers}
                serverDeafenedUsers={serverDeafenedUsers}
                onOpenContextMenu={handleOpenMemberContextMenu}
              />
              <button
                onClick={() => setIsVoiceRoomViewActive(false)}
                className="absolute top-3 right-16 bg-[#0c0c10]/80 hover:bg-[#0c0c10] text-xs text-amber-200 px-3 py-1.5 rounded-lg border border-amber-500/30 transition z-30 font-semibold cursor-pointer"
              >
                Zum Textchat wechseln
              </button>
            </div>
          ) : activeChannelObj ? (
            <ChatArea
              channel={activeChannelObj}
              messages={messages[activeChannelObj.id] || messages[activeChannelId] || []}
              onSendMessage={handleSendMessage}
              onAddReaction={handleAddReaction}
              currentUser={currentUser}
              showMemberList={showMemberList}
              setShowMemberList={setShowMemberList}
              supabaseConnected={true}
              onOpenContextMenu={handleOpenMemberContextMenu}
              onSelectMember={handleViewProfile}
              mentionTarget={mentionTarget}
              setMentionTarget={setMentionTarget}
            />
          ) : (
            <main className="flex-1 bg-discord-chat flex flex-col items-center justify-center p-8 text-center select-none">
              <div className="w-16 h-16 rounded-2xl bg-[#0a0a0d] border border-amber-500/20 flex items-center justify-center mb-4 text-discord-textMuted shadow-lg shadow-amber-500/5">
                <FolderPlus className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Keine Kanäle auf diesem Server</h3>
              <p className="text-xs text-amber-200/60 max-w-sm mb-6">
                Erstelle deinen ersten Kanal oder eine Kategorie, um Unterhaltungen zu starten.
              </p>
              <button
                onClick={() => {
                  setCreateChannelCategoryId(null);
                  setIsCreateChannelOpen(true);
                }}
                className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                Kanal erstellen
              </button>
            </main>
          )}

          {showMemberList && !isVoiceRoomViewActive && (
            <MemberList
              members={members}
              onSelectMember={handleViewProfile}
              onOpenContextMenu={handleOpenMemberContextMenu}
              userTimeouts={userTimeouts}
              userMutes={userMutes}
              verifiedUsers={verifiedUsers}
              serverMutedUsers={serverMutedUsers}
              serverDeafenedUsers={serverDeafenedUsers}
            />
          )}
        </>
      ) : (
        <div className="flex-1 bg-[#09090c] flex flex-col items-center justify-center p-8 text-center select-none relative overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="w-20 h-20 rounded-3xl bg-[#0e0e13] border border-amber-500/40 flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(212,175,55,0.15)] relative z-10">
            <Compass className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent relative z-10">
            Keine Server vorhanden
          </h2>
          <p className="text-xs text-amber-200/60 max-w-md mb-6 leading-relaxed relative z-10">
            Du bist derzeit auf keinem Server. Erstelle deine eigene Community von Grund auf neu oder entdecke öffentliche Server!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <button
              onClick={() => setIsAddServerOpen(true)}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-amber-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Server erstellen</span>
            </button>
            <button
              onClick={() => setIsExploreOpen(true)}
              className="bg-[#121217] hover:bg-[#1a1a22] border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400 px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95 shadow-md shadow-amber-500/5 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Öffentliche Server entdecken</span>
            </button>
            <button
              onClick={() => setIsHomeActive(true)}
              className="bg-[#121217] hover:bg-[#1a1a22] border border-white/10 text-neutral-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer"
            >
              Direktnachrichten (DMs)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
