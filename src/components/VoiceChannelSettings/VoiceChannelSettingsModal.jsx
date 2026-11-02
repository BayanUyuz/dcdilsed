import React from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import VoiceChannelSidebar from './VoiceChannelSidebar';
import VoiceOverviewTab from './tabs/VoiceOverviewTab';
import VoicePermissionsTab from './tabs/VoicePermissionsTab';
import VoiceInvitesTab from './tabs/VoiceInvitesTab';
import VoiceIntegrationsTab from './tabs/VoiceIntegrationsTab';
import { useVoiceChannelSettings } from './useVoiceChannelSettings';

export default function VoiceChannelSettingsModal({
  isOpen,
  onClose,
  channel,
  onUpdateChannel,
  onDeleteChannel,
  serverRoles = [],
}) {
  const state = useVoiceChannelSettings(channel, isOpen, onUpdateChannel, onClose);

  if (!isOpen || !channel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in select-none">
      <div className="bg-[#0c0c10] border border-amber-500/25 w-full max-w-4xl h-[88vh] rounded-2xl flex overflow-hidden shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#121217] border border-amber-500/30 flex items-center justify-center text-amber-200 hover:text-amber-100 hover:scale-105 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <VoiceChannelSidebar
          channel={channel}
          activeTab={state.activeTab}
          setActiveTab={state.setActiveTab}
          setShowDeleteConfirm={state.setShowDeleteConfirm}
        />

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#08080a] relative">
          {state.activeTab === 'overview' && (
            <VoiceOverviewTab
              channelName={state.channelName}
              setChannelName={state.setChannelName}
              channelTopic={state.channelTopic}
              setChannelTopic={state.setChannelTopic}
              userLimit={state.userLimit}
              setUserLimit={state.setUserLimit}
              bitrate={state.bitrate}
              setBitrate={state.setBitrate}
              videoQuality={state.videoQuality}
              setVideoQuality={state.setVideoQuality}
              region={state.region}
              setRegion={state.setRegion}
              isPushToTalkRequired={state.isPushToTalkRequired}
              setIsPushToTalkRequired={state.setIsPushToTalkRequired}
              setHasChanges={state.setHasChanges}
            />
          )}

          {state.activeTab === 'permissions' && (
            <VoicePermissionsTab
              isPrivate={state.isPrivate}
              setIsPrivate={state.setIsPrivate}
              selectedRoleId={state.selectedRoleId}
              setSelectedRoleId={state.setSelectedRoleId}
              rolePermissions={state.rolePermissions}
              handleTogglePermission={state.handleTogglePermission}
              setHasChanges={state.setHasChanges}
              serverRoles={serverRoles}
            />
          )}

          {state.activeTab === 'invites' && (
            <VoiceInvitesTab
              invites={state.invites}
              handleCreateInvite={state.handleCreateInvite}
              handleCopyInvite={state.handleCopyInvite}
              handleDeleteInvite={state.handleDeleteInvite}
              copiedInvite={state.copiedInvite}
            />
          )}

          {state.activeTab === 'integrations' && (
            <VoiceIntegrationsTab channel={channel} />
          )}

          {/* Floating Unsaved Changes Bar */}
          {state.hasChanges && (
            <div className="sticky bottom-0 left-0 right-0 bg-[#0c0c10] border-2 border-amber-500/50 shadow-2xl rounded-2xl p-4 flex items-center justify-between z-30 animate-in slide-in-from-bottom-4">
              <span className="text-xs text-amber-200 font-bold">
                Vorsicht — du hast ungespeicherte Änderungen!
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={state.handleReset}
                  className="text-xs text-amber-300/70 hover:text-amber-200 font-medium cursor-pointer"
                >
                  Zurücksetzen
                </button>
                <button
                  type="button"
                  onClick={state.handleSaveChanges}
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg shadow-amber-500/25 transition cursor-pointer"
                >
                  Änderungen speichern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {state.showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#0c0c10] border border-red-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Kanal löschen</h3>
            </div>
            <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
              Möchtest du <strong className="text-white">#{channel.name}</strong> wirklich
              löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => state.setShowDeleteConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white rounded-xl bg-[#15151e] border border-neutral-700 cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteChannel(channel.id);
                  state.setShowDeleteConfirm(false);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/30"
              >
                <Trash2 className="w-4 h-4" />
                <span>Kanal löschen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
