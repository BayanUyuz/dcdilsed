import React from 'react';
import { X } from 'lucide-react';
import { useUserSettings } from '../../hooks/useUserSettings';

import UserSettingsSidebar from './UserSettingsSidebar';
import ProfileTab from './tabs/ProfileTab';
import AccountTab from './tabs/AccountTab';
import PrivacyTab from './tabs/PrivacyTab';
import MessagesTab from './tabs/MessagesTab';
import NotificationsTab from './tabs/NotificationsTab';
import VoiceVideoTab from './tabs/VoiceVideoTab';
import AppearanceTab from './tabs/AppearanceTab';
import AccessibilityTab from './tabs/AccessibilityTab';
import KeybindsTab from './tabs/KeybindsTab';
import SystemTab from './tabs/SystemTab';
import LanguageTab from './tabs/LanguageTab';

export default function UserSettingsModal({
  isOpen,
  onClose,
  currentUser,
  setCurrentUser,
  onLogout,
  themeConfig,
  setThemeConfig,
  servers = [],
  isMuted = false,
  setIsMuted = () => {},
  isDeafened = false,
  setIsDeafened = () => {},
}) {
  const s = useUserSettings({
    currentUser, setCurrentUser, themeConfig, setThemeConfig, servers,
    isMuted, setIsMuted, isDeafened, setIsDeafened
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-[#08080b] text-neutral-200 animate-in fade-in select-none">
      <UserSettingsSidebar
        activeTab={s.activeTab}
        setActiveTab={s.setActiveTab}
        onClose={onClose}
        onLogout={onLogout}
      />

      <div className="flex-1 bg-[#070709] px-10 py-10 overflow-y-auto custom-scrollbar relative">
        <div className="w-full max-w-4xl pb-16">
          {s.activeTab === 'profile' && (
            <ProfileTab
              profileSubTab={s.profileSubTab} setProfileSubTab={s.setProfileSubTab} servers={servers}
              selectedServerForProfile={s.selectedServerForProfile} setSelectedServerForProfile={s.setSelectedServerForProfile}
              displayName={s.displayName} setDisplayName={s.setDisplayName} pronouns={s.pronouns} setPronouns={s.setPronouns}
              avatar={s.avatar} setAvatar={s.setAvatar} avatarDecoration={s.avatarDecoration}
              setAvatarDecoration={s.setAvatarDecoration} bannerColor1={s.bannerColor1} setBannerColor1={s.setBannerColor1}
              bannerColor2={s.bannerColor2} setBannerColor2={s.setBannerColor2} bannerImage={s.bannerImage}
              setBannerImage={s.setBannerImage} bio={s.bio} setBio={s.setBio} statusPresence={s.statusPresence}
              setStatusPresence={s.setStatusPresence} statusText={s.statusText} setStatusText={s.setStatusText}
              statusEmoji={s.statusEmoji} setStatusEmoji={s.setStatusEmoji} showStatusEmojiPicker={s.showStatusEmojiPicker}
              setShowStatusEmojiPicker={s.setShowStatusEmojiPicker} serverNickname={s.serverNickname}
              setServerNickname={s.setServerNickname} serverAvatar={s.serverAvatar} setServerAvatar={s.setServerAvatar}
              avatarFileRef={s.avatarFileRef} bannerFileRef={s.bannerFileRef} handleAvatarFile={s.handleAvatarFile}
              handleBannerFile={s.handleBannerFile} currentUser={currentUser} setHasUnsavedChanges={s.setHasUnsavedChanges}
            />
          )}

          {s.activeTab === 'account' && (
            <AccountTab currentUser={currentUser} usernameInput={s.usernameInput} setUsernameInput={s.setUsernameInput} />
          )}

          {s.activeTab === 'privacy' && (
            <PrivacyTab
              dataUsageAnalytics={s.dataUsageAnalytics} setDataUsageAnalytics={s.setDataUsageAnalytics}
              allowDmsFromServers={s.allowDmsFromServers} setAllowDmsFromServers={s.setAllowDmsFromServers}
            />
          )}

          {s.activeTab === 'messages' && <MessagesTab />}

          {s.activeTab === 'notifications' && (
            <NotificationsTab
              desktopNotifications={s.desktopNotifications} setDesktopNotifications={s.setDesktopNotifications}
            />
          )}

          {(s.activeTab === 'voice' || s.activeTab === 'voice_video') && (
            <VoiceVideoTab
              voiceSubTab={s.voiceSubTab} setVoiceSubTab={s.setVoiceSubTab} inputDevice={s.inputDevice}
              setInputDevice={s.setInputDevice} outputDevice={s.outputDevice} setOutputDevice={s.setOutputDevice}
              micVolume={s.micVolume} setMicVolume={s.setMicVolume} outputVolume={s.outputVolume}
              setOutputVolume={s.setOutputVolume} micTestActive={s.micTestActive} setMicTestActive={s.setMicTestActive}
              liveMicLevel={s.liveMicLevel} inputMode={s.inputMode} setInputMode={s.setInputMode}
              autoSensitivity={s.autoSensitivity} setAutoSensitivity={s.setAutoSensitivity} sensitivity={s.sensitivity}
              setSensitivity={s.setSensitivity} pttKey={s.pttKey} isRecordingPttKey={s.isRecordingPttKey}
              setIsRecordingPttKey={s.setIsRecordingPttKey} pttDelay={s.pttDelay} setPttDelay={s.setPttDelay}
              isMuted={isMuted} handleToggleMute={s.handleToggleMute} pushToMuteKey={s.pushToMuteKey}
              isRecordingPtmKey={s.isRecordingPtmKey} setIsRecordingPtmKey={s.setIsRecordingPtmKey}
              isDeafened={isDeafened} handleToggleDeafen={s.handleToggleDeafen} cameraDevice={s.cameraDevice}
              setCameraDevice={s.setCameraDevice} cameraTestActive={s.cameraTestActive}
              handleToggleCameraTest={s.handleToggleCameraTest} videoPreviewRef={s.videoPreviewRef}
              virtualBg={s.virtualBg} setVirtualBg={s.setVirtualBg} bgFileInputRef={s.bgFileInputRef}
              handleCustomBgUpload={s.handleCustomBgUpload} customBgUrl={s.customBgUrl} setCustomBgUrl={s.setCustomBgUrl}
              hardwareCameraAcceleration={s.hardwareCameraAcceleration} setHardwareCameraAcceleration={s.setHardwareCameraAcceleration}
              streamResolution={s.streamResolution} setStreamResolution={s.setStreamResolution} streamFps={s.streamFps}
              setStreamFps={s.setStreamFps} includeStreamAudio={s.includeStreamAudio} setIncludeStreamAudio={s.setIncludeStreamAudio}
              hardwareAcceleration={s.hardwareAcceleration} setHardwareAcceleration={s.setHardwareAcceleration}
              openH264={s.openH264} setOpenH264={s.setOpenH264} av1Codec={s.av1Codec} setAv1Codec={s.setAv1Codec}
              krispMode={s.krispMode} setKrispMode={s.setKrispMode} echoCancellation={s.echoCancellation}
              setEchoCancellation={s.setEchoCancellation} autoGainControl={s.autoGainControl}
              setAutoGainControl={s.setAutoGainControl} advancedVoiceProcessing={s.advancedVoiceProcessing}
              setAdvancedVoiceProcessing={s.setAdvancedVoiceProcessing} attenuationPercent={s.attenuationPercent}
              setAttenuationPercent={s.setAttenuationPercent} attenuateOthers={s.attenuateOthers}
              setAttenuateOthers={s.setAttenuateOthers} attenuateSelf={s.attenuateSelf} setAttenuateSelf={s.setAttenuateSelf}
              audioSubsystem={s.audioSubsystem} setAudioSubsystem={s.setAudioSubsystem} qosPriority={s.qosPriority}
              setQosPriority={s.setQosPriority} diagnosticAudio={s.diagnosticAudio} setDiagnosticAudio={s.setDiagnosticAudio}
              handleResetVoiceSettings={s.handleResetVoiceSettings} soundboardVolume={s.soundboardVolume}
              setSoundboardVolume={s.setSoundboardVolume}
            />
          )}

          {s.activeTab === 'appearance' && (
            <AppearanceTab
              selectedTheme={s.selectedTheme} setSelectedTheme={s.setSelectedTheme}
              messageDisplay={s.messageDisplay} setMessageDisplay={s.setMessageDisplay}
              fontSize={s.fontSize} setFontSize={s.setFontSize} currentUser={currentUser}
              setThemeConfig={setThemeConfig}
            />
          )}

          {s.activeTab === 'accessibility' && (
            <AccessibilityTab
              currentUser={currentUser} fontSize={s.fontSize} setFontSize={s.setFontSize}
              messageDisplay={s.messageDisplay} setMessageDisplay={s.setMessageDisplay}
              messageSpacing={s.messageSpacing} setMessageSpacing={s.setMessageSpacing}
              roleColorStyle={s.roleColorStyle} setRoleColorStyle={s.setRoleColorStyle}
              showProfileBadges={s.showProfileBadges} setShowProfileBadges={s.setShowProfileBadges}
              highContrast={s.highContrast} setHighContrast={s.setHighContrast}
              saturation={s.saturation} setSaturation={s.setSaturation}
              underlineLinks={s.underlineLinks} setUnderlineLinks={s.setUnderlineLinks}
              desaturateRoleColors={s.desaturateRoleColors} setDesaturateRoleColors={s.setDesaturateRoleColors}
              reducedMotionMode={s.reducedMotionMode} setReducedMotionMode={s.setReducedMotionMode}
              autoplayGifs={s.autoplayGifs} setAutoplayGifs={s.setAutoplayGifs}
              animateEmojis={s.animateEmojis} setAnimateEmojis={s.setAnimateEmojis}
              screenReaderSupport={s.screenReaderSupport} setScreenReaderSupport={s.setScreenReaderSupport}
              enableTts={s.enableTts} setEnableTts={s.setEnableTts} ttsSpeed={s.ttsSpeed}
              setTtsSpeed={s.setTtsSpeed} audioCues={s.audioCues} setAudioCues={s.setAudioCues}
              isSpeakingTts={s.isSpeakingTts} handleTestTts={s.handleTestTts}
              handleResetAccessibility={s.handleResetAccessibility}
            />
          )}

          {s.activeTab === 'keybinds' && (
            <KeybindsTab
              keybinds={s.keybinds} recordingKeybindId={s.recordingKeybindId}
              setRecordingKeybindId={s.setRecordingKeybindId} handleAddKeybind={s.handleAddKeybind}
              handleDeleteKeybind={s.handleDeleteKeybind} handleUpdateKeybindAction={s.handleUpdateKeybindAction}
              handleResetKeybinds={s.handleResetKeybinds} setKeybinds={s.setKeybinds}
            />
          )}

          {s.activeTab === 'system' && (
            <SystemTab
              startOnBoot={s.startOnBoot} setStartOnBoot={s.setStartOnBoot} startMinimized={s.startMinimized}
              setStartMinimized={s.setStartMinimized} minimizeToTray={s.minimizeToTray}
              setMinimizeToTray={s.setMinimizeToTray} gpuAcceleration={s.gpuAcceleration}
              setGpuAcceleration={s.setGpuAcceleration} autoUpdate={s.autoUpdate}
              setAutoUpdate={s.setAutoUpdate} devMode={s.devMode} setDevMode={s.setDevMode}
              keybinds={s.keybinds} setKeybinds={s.setKeybinds} recordingKeybindId={s.recordingKeybindId}
              setRecordingKeybindId={s.setRecordingKeybindId} onResetKeybinds={s.handleResetKeybinds}
              onAddKeybind={s.handleAddKeybind} onDeleteKeybind={s.handleDeleteKeybind}
              onUpdateKeybindAction={s.handleUpdateKeybindAction}
            />
          )}

          {s.activeTab === 'language' && (
            <LanguageTab
              language={s.language} setLanguage={s.setLanguage} timeFormat={s.timeFormat}
              setTimeFormat={s.setTimeFormat} timeZone={s.timeZone} setTimeZone={s.setTimeZone}
              firstDayOfWeek={s.firstDayOfWeek} setFirstDayOfWeek={s.setFirstDayOfWeek}
              getFormattedTimePreview={s.getFormattedTimePreview}
            />
          )}
        </div>

        {/* Floating Unsaved Changes Bar */}
        {s.hasUnsavedChanges && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c0c10] border border-amber-500/40 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.2)] px-5 py-3 flex items-center justify-between gap-6 z-50 animate-in slide-in-from-bottom-4 w-full max-w-lg">
            <span className="text-xs font-bold text-amber-200">
              Achtung — Du hast ungespeicherte Änderungen!
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={s.handleResetProfile}
                className="text-xs text-amber-300 hover:underline px-2 py-1 font-semibold cursor-pointer"
              >
                Zurücksetzen
              </button>
              <button
                type="button"
                onClick={s.handleSaveProfileChanges}
                className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-md shadow-amber-500/25 cursor-pointer"
              >
                Änderungen speichern
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ESC Close Button */}
      <div className="absolute top-6 right-6 flex flex-col items-center">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full border border-amber-500/30 hover:border-amber-400 text-amber-400 hover:text-white flex items-center justify-center transition mb-1 bg-[#0c0c10] shadow cursor-pointer"
          title="Schließen"
        >
          <X className="w-5 h-5" />
        </button>
        <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider">
          ESC
        </span>
      </div>
    </div>
  );
}
