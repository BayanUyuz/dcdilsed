import React from 'react';
import { X } from 'lucide-react';

import ServerSettingsSidebar from './ServerSettingsSidebar';
import ServerOverviewTab from './tabs/ServerOverviewTab';
import ServerTagTab from './tabs/ServerTagTab';
import ServerRolesTab from './tabs/ServerRolesTab';
import ServerEmojisTab from './tabs/ServerEmojisTab';
import ServerStickersTab from './tabs/ServerStickersTab';
import ServerAuditTab from './tabs/ServerAuditTab';
import ServerAutoModTab from './tabs/ServerAutoModTab';
import ServerOnboardingTab from './tabs/ServerOnboardingTab';
import ServerBansTab from './tabs/ServerBansTab';
import ServerTemplateTab from './tabs/ServerTemplateTab';
import ServerIntegrationsTab from './tabs/ServerIntegrationsTab';
import ServerMembersTab from './tabs/ServerMembersTab';
import ServerInvitesTab from './tabs/ServerInvitesTab';
import ServerDeleteTab from './tabs/ServerDeleteTab';
import { useServerSettingsState } from './useServerSettingsState';

export default function ServerSettingsModal({
  isOpen,
  onClose,
  server,
  onUpdateServer,
  onDeleteServer,
}) {
  const state = useServerSettingsState(server, onUpdateServer);

  if (!isOpen || !server) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in select-none">
      <div className="bg-[#0c0c10] border border-amber-500/25 w-full max-w-5xl h-[88vh] rounded-2xl flex overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#121217] border border-amber-500/30 flex items-center justify-center text-amber-200 hover:text-amber-100 hover:scale-105 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <ServerSettingsSidebar
          server={server}
          activeTab={state.activeTab}
          setActiveTab={state.setActiveTab}
        />

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#08080a]">
          {state.activeTab === 'overview' && (
            <ServerOverviewTab
              server={server}
              serverName={state.serverName}
              setServerName={state.setServerName}
              serverIcon={state.serverIcon}
              setServerIcon={state.setServerIcon}
              serverBanner={state.serverBanner}
              setServerBanner={state.setServerBanner}
              serverThemeColor={state.serverThemeColor}
              setServerThemeColor={state.setServerThemeColor}
              systemChannel={state.systemChannel}
              setSystemChannel={state.setSystemChannel}
              afkTimeout={state.afkTimeout}
              setAfkTimeout={state.setAfkTimeout}
              handleSaveOverview={state.handleSaveOverview}
            />
          )}

          {state.activeTab === 'tag' && (
            <ServerTagTab
              serverTag={state.serverTag}
              setServerTag={state.setServerTag}
              vanityUrl={state.vanityUrl}
              setVanityUrl={state.setVanityUrl}
              copiedVanity={state.copiedVanity}
              setCopiedVanity={state.setCopiedVanity}
              handleSaveOverview={state.handleSaveOverview}
            />
          )}

          {state.activeTab === 'roles' && (
            <ServerRolesTab
              roles={state.roles}
              activeRoleId={state.activeRoleId}
              setActiveRoleId={state.setActiveRoleId}
              currentRole={state.currentRole}
              handleAddNewRole={state.handleAddNewRole}
              updateRoleProperty={state.updateRoleProperty}
            />
          )}

          {state.activeTab === 'emojis' && (
            <ServerEmojisTab
              emojis={state.emojis}
              newEmojiName={state.newEmojiName}
              setNewEmojiName={state.setNewEmojiName}
              newEmojiChar={state.newEmojiChar}
              setNewEmojiChar={state.setNewEmojiChar}
              handleAddEmoji={state.handleAddEmoji}
            />
          )}

          {state.activeTab === 'stickers' && (
            <ServerStickersTab
              stickers={state.stickers}
              newStickerName={state.newStickerName}
              setNewStickerName={state.setNewStickerName}
              newStickerDesc={state.newStickerDesc}
              setNewStickerDesc={state.setNewStickerDesc}
              newStickerEmoji={state.newStickerEmoji}
              setNewStickerEmoji={state.setNewStickerEmoji}
              handleAddSticker={state.handleAddSticker}
            />
          )}

          {state.activeTab === 'audit' && <ServerAuditTab auditLogs={state.auditLogs} />}

          {state.activeTab === 'automod' && (
            <ServerAutoModTab
              autoModRules={state.autoModRules}
              setAutoModRules={state.setAutoModRules}
            />
          )}

          {state.activeTab === 'onboarding' && (
            <ServerOnboardingTab
              welcomeEnabled={state.welcomeEnabled}
              setWelcomeEnabled={state.setWelcomeEnabled}
              welcomeMessage={state.welcomeMessage}
              setWelcomeMessage={state.setWelcomeMessage}
              server={server}
            />
          )}

          {state.activeTab === 'template' && (
            <ServerTemplateTab
              templateName={state.templateName}
              setTemplateName={state.setTemplateName}
              templateDesc={state.templateDesc}
              setTemplateDesc={state.setTemplateDesc}
              templateUrl={state.templateUrl}
              copiedTemplate={state.copiedTemplate}
              setCopiedTemplate={state.setCopiedTemplate}
            />
          )}

          {state.activeTab === 'integrations' && (
            <ServerIntegrationsTab webhooksList={state.webhooksList} />
          )}

          {state.activeTab === 'members' && (
            <ServerMembersTab
              memberSearch={state.memberSearch}
              setMemberSearch={state.setMemberSearch}
              membersList={state.membersList}
              handleKickMember={state.handleKickMember}
              handleBanMember={state.handleBanMember}
            />
          )}

          {state.activeTab === 'invites' && (
            <ServerInvitesTab
              invitesList={state.invitesList}
              handleRevokeInvite={state.handleRevokeInvite}
            />
          )}

          {state.activeTab === 'bans' && (
            <ServerBansTab bansList={state.bansList} handleUnban={state.handleUnban} />
          )}

          {state.activeTab === 'delete' && (
            <ServerDeleteTab
              server={server}
              onClose={onClose}
              onDeleteServer={onDeleteServer}
            />
          )}
        </div>
      </div>
    </div>
  );
}
