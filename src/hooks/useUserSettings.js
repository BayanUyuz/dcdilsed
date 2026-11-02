import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DEFAULT_KEYBINDS } from '../components/UserSettings/constants';
import { useUserAudioSettings } from './useUserAudioSettings';

export function useUserSettings({
  currentUser,
  setCurrentUser,
  themeConfig,
  setThemeConfig,
  servers = [],
  isMuted = false,
  setIsMuted = () => {},
  isDeafened = false,
  setIsDeafened = () => {},
}) {
  const [activeTab, setActiveTab] = useState('profile');

  // Sub-hook for voice, camera and soundboard settings
  const audio = useUserAudioSettings({ isMuted, setIsMuted, isDeafened, setIsDeafened });

  // Profile State
  const [profileSubTab, setProfileSubTab] = useState('user');
  const [selectedServerForProfile, setSelectedServerForProfile] = useState(servers[0]?.id || 'server_main');

  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Benutzer');
  const [pronouns, setPronouns] = useState(currentUser?.pronouns || 'er/ihn');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
  const [avatarDecoration, setAvatarDecoration] = useState(currentUser?.avatarDecoration || 'neon_ring');
  const [bannerColor1, setBannerColor1] = useState(currentUser?.bannerColor1 || '#5865f2');
  const [bannerColor2, setBannerColor2] = useState(currentUser?.bannerColor2 || '#eb459e');
  const [bannerImage, setBannerImage] = useState(currentUser?.bannerImage || '');
  const [bio, setBio] = useState(currentUser?.bio || 'Willkommen auf meinem Profil bei DilSed!');

  const [statusPresence, setStatusPresence] = useState(currentUser?.status || 'online');
  const [statusText, setStatusText] = useState(currentUser?.statusText || '⚡ Unterwegs auf DilSed Web');
  const [statusEmoji, setStatusEmoji] = useState(currentUser?.statusEmoji || '⚡');
  const [showStatusEmojiPicker, setShowStatusEmojiPicker] = useState(false);

  const [serverNickname, setServerNickname] = useState(currentUser?.serverNicknames?.[selectedServerForProfile] || '');
  const [serverAvatar, setServerAvatar] = useState(currentUser?.serverAvatars?.[selectedServerForProfile] || '');

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const avatarFileRef = useRef(null);
  const bannerFileRef = useRef(null);

  // Account, Privacy, Notifications
  const [usernameInput, setUsernameInput] = useState(currentUser?.username || 'dilseduser');
  const [dataUsageAnalytics, setDataUsageAnalytics] = useState(true);
  const [allowDmsFromServers, setAllowDmsFromServers] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);

  // Appearance State
  const [selectedTheme, setSelectedTheme] = useState(themeConfig?.theme || 'dark');
  const [messageDisplay, setMessageDisplay] = useState(themeConfig?.messageDisplay || 'cozy');
  const [fontSize, setFontSize] = useState(themeConfig?.fontSize || 16);

  // Accessibility State
  const [messageSpacing, setMessageSpacing] = useState(() => parseInt(localStorage.getItem('dilsed_msg_spacing') || '16', 10));
  const [roleColorStyle, setRoleColorStyle] = useState(() => localStorage.getItem('dilsed_role_color_style') || 'name');
  const [showProfileBadges, setShowProfileBadges] = useState(true);
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('dilsed_high_contrast') === 'true');
  const [saturation, setSaturation] = useState(() => parseInt(localStorage.getItem('dilsed_saturation') || '100', 10));
  const [underlineLinks, setUnderlineLinks] = useState(() => localStorage.getItem('dilsed_underline_links') === 'true');
  const [desaturateRoleColors, setDesaturateRoleColors] = useState(false);
  const [reducedMotionMode, setReducedMotionMode] = useState(() => localStorage.getItem('dilsed_reduced_motion') || 'system');
  const [autoplayGifs, setAutoplayGifs] = useState(true);
  const [animateEmojis, setAnimateEmojis] = useState(true);
  const [screenReaderSupport, setScreenReaderSupport] = useState(() => localStorage.getItem('dilsed_screen_reader') === 'true');
  const [enableTts, setEnableTts] = useState(() => localStorage.getItem('dilsed_tts_enabled') === 'true');
  const [ttsSpeed, setTtsSpeed] = useState(() => parseFloat(localStorage.getItem('dilsed_tts_speed') || '1.0'));
  const [audioCues, setAudioCues] = useState(() => localStorage.getItem('dilsed_audio_cues') === 'true');
  const [isSpeakingTts, setIsSpeakingTts] = useState(false);

  // System State
  const [startOnBoot, setStartOnBoot] = useState(() => localStorage.getItem('dilsed_start_on_boot') === 'true');
  const [startMinimized, setStartMinimized] = useState(() => localStorage.getItem('dilsed_start_minimized') === 'true');
  const [minimizeToTray, setMinimizeToTray] = useState(() => localStorage.getItem('dilsed_minimize_to_tray') !== 'false');
  const [gpuAcceleration, setGpuAcceleration] = useState(() => localStorage.getItem('dilsed_gpu_accel') !== 'false');
  const [autoUpdate, setAutoUpdate] = useState(() => localStorage.getItem('dilsed_auto_update') !== 'false');
  const [devMode, setDevMode] = useState(() => localStorage.getItem('dilsed_dev_mode') === 'true');

  // Keybinds State
  const [keybinds, setKeybinds] = useState(() => {
    try {
      const saved = localStorage.getItem('dilsed_keybinds');
      return saved ? JSON.parse(saved) : DEFAULT_KEYBINDS;
    } catch {
      return DEFAULT_KEYBINDS;
    }
  });
  const [recordingKeybindId, setRecordingKeybindId] = useState(null);

  // Language & Time State
  const [language, setLanguage] = useState(() => localStorage.getItem('dilsed_language') || 'de');
  const [timeFormat, setTimeFormat] = useState(() => localStorage.getItem('dilsed_time_format') || 'auto');
  const [timeZone, setTimeZone] = useState(() => localStorage.getItem('dilsed_timezone') || 'Europe/Istanbul');
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(() => localStorage.getItem('dilsed_first_day') || 'auto');

  // Persistence Effects
  useEffect(() => {
    const items = {
      dilsed_msg_spacing: messageSpacing, dilsed_role_color_style: roleColorStyle,
      dilsed_high_contrast: highContrast, dilsed_saturation: saturation,
      dilsed_underline_links: underlineLinks, dilsed_reduced_motion: reducedMotionMode,
      dilsed_screen_reader: screenReaderSupport, dilsed_tts_enabled: enableTts,
      dilsed_tts_speed: ttsSpeed, dilsed_audio_cues: audioCues,
      dilsed_start_on_boot: startOnBoot, dilsed_start_minimized: startMinimized,
      dilsed_minimize_to_tray: minimizeToTray, dilsed_gpu_accel: gpuAcceleration,
      dilsed_auto_update: autoUpdate, dilsed_dev_mode: devMode,
      dilsed_keybinds: JSON.stringify(keybinds), dilsed_language: language,
      dilsed_time_format: timeFormat, dilsed_timezone: timeZone,
      dilsed_first_day: firstDayOfWeek
    };
    Object.entries(items).forEach(([k, v]) => localStorage.setItem(k, v));
  }, [
    messageSpacing, roleColorStyle, highContrast, saturation, underlineLinks,
    reducedMotionMode, screenReaderSupport, enableTts, ttsSpeed, audioCues,
    startOnBoot, startMinimized, minimizeToTray, gpuAcceleration, autoUpdate,
    devMode, keybinds, language, timeFormat, timeZone, firstDayOfWeek
  ]);

  const handleFileUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => { setter(ev.target.result); setHasUnsavedChanges(true); };
      reader.readAsDataURL(file);
    }
  };
  const handleAvatarFile = (e) => handleFileUpload(e, setAvatar);
  const handleBannerFile = (e) => handleFileUpload(e, setBannerImage);

  const handleSaveProfileChanges = () => {
    setCurrentUser((prev) => ({
      ...prev,
      displayName,
      pronouns,
      avatar,
      avatarDecoration,
      bannerColor1,
      bannerColor2,
      bannerImage,
      bio,
      status: statusPresence,
      statusText,
      statusEmoji,
      serverNicknames: {
        ...(prev.serverNicknames || {}),
        [selectedServerForProfile]: serverNickname,
      },
      serverAvatars: {
        ...(prev.serverAvatars || {}),
        [selectedServerForProfile]: serverAvatar,
      }
    }));

    if (setThemeConfig) {
      setThemeConfig({
        theme: selectedTheme,
        messageDisplay,
        fontSize,
      });
    }

    setHasUnsavedChanges(false);
    confetti({ particleCount: 50, spread: 60 });
    alert('🎉 Deine Profiländerungen wurden erfolgreich gespeichert!');
  };

  const handleResetProfile = () => {
    setDisplayName(currentUser?.displayName || 'Benutzer');
    setPronouns(currentUser?.pronouns || 'er/ihn');
    setAvatar(currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
    setAvatarDecoration(currentUser?.avatarDecoration || 'neon_ring');
    setBannerColor1(currentUser?.bannerColor1 || '#5865f2');
    setBannerColor2(currentUser?.bannerColor2 || '#eb459e');
    setBannerImage(currentUser?.bannerImage || '');
    setBio(currentUser?.bio || '');
    setStatusPresence(currentUser?.status || 'online');
    setStatusText(currentUser?.statusText || '');
    setStatusEmoji(currentUser?.statusEmoji || '⚡');
    setHasUnsavedChanges(false);
  };

  const handleTestTts = (customText) => {
    if (!('speechSynthesis' in window)) {
      alert('Dein Browser unterstützt die Web Speech API (Text-to-Speech) nicht.');
      return;
    }
    window.speechSynthesis.cancel();
    const textToSpeak = customText || 'DilSed Barrierefreiheits-Sprachausgabe ist bereit und funktioniert einwandfrei.';
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'en-US' ? 'en-US' : 'de-DE';
    utterance.rate = ttsSpeed;
    utterance.onstart = () => setIsSpeakingTts(true);
    utterance.onend = () => setIsSpeakingTts(false);
    utterance.onerror = () => setIsSpeakingTts(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetAccessibility = () => {
    if (confirm('Möchtest du wirklich alle Barrierefreiheits-Einstellungen auf die Standardwerte zurücksetzen?')) {
      setFontSize(16); setMessageSpacing(16); setMessageDisplay('cozy'); setRoleColorStyle('name');
      setShowProfileBadges(true); setHighContrast(false); setSaturation(100); setUnderlineLinks(false);
      setDesaturateRoleColors(false); setReducedMotionMode('system'); setAutoplayGifs(true);
      setAnimateEmojis(true); setScreenReaderSupport(false); setEnableTts(false); setTtsSpeed(1.0); setAudioCues(false);
    }
  };

  const handleAddKeybind = () => {
    const newId = 'kb_' + Date.now();
    setKeybinds((prev) => [...prev, { id: newId, action: 'toggle_mute', key: 'KEINE TASTE ZUGEWIESEN' }]);
    setRecordingKeybindId(newId);
  };
  const handleDeleteKeybind = (id) => {
    setKeybinds((prev) => prev.filter((k) => k.id !== id));
    if (recordingKeybindId === id) setRecordingKeybindId(null);
  };
  const handleUpdateKeybindAction = (id, newAction) => setKeybinds((prev) => prev.map((k) => (k.id === id ? { ...k, action: newAction } : k)));
  const handleResetKeybinds = () => {
    if (confirm('Möchtest du wirklich alle Tastenbelegungen auf die Standardwerte zurücksetzen?')) {
      setKeybinds(DEFAULT_KEYBINDS);
      setRecordingKeybindId(null);
    }
  };

  const getFormattedTimePreview = (formatType) => {
    const d = new Date();
    if (formatType === '12h') return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    if (formatType === '24h') return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });
    if (language === 'en-US' || language === 'en-GB') return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' (Automatisch - 12h)';
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' (Automatisch - 24h)';
  };

  return {
    activeTab, setActiveTab, profileSubTab, setProfileSubTab, selectedServerForProfile, setSelectedServerForProfile,
    displayName, setDisplayName, pronouns, setPronouns, avatar, setAvatar, avatarDecoration, setAvatarDecoration,
    bannerColor1, setBannerColor1, bannerColor2, setBannerColor2, bannerImage, setBannerImage, bio, setBio,
    statusPresence, setStatusPresence, statusText, setStatusText, statusEmoji, setStatusEmoji, showStatusEmojiPicker, setShowStatusEmojiPicker,
    serverNickname, setServerNickname, serverAvatar, setServerAvatar, hasUnsavedChanges, setHasUnsavedChanges,
    avatarFileRef, bannerFileRef, usernameInput, setUsernameInput, dataUsageAnalytics, setDataUsageAnalytics,
    allowDmsFromServers, setAllowDmsFromServers, desktopNotifications, setDesktopNotifications, selectedTheme, setSelectedTheme,
    messageDisplay, setMessageDisplay, fontSize, setFontSize, messageSpacing, setMessageSpacing, roleColorStyle, setRoleColorStyle,
    showProfileBadges, setShowProfileBadges, highContrast, setHighContrast, saturation, setSaturation, underlineLinks, setUnderlineLinks,
    desaturateRoleColors, setDesaturateRoleColors, reducedMotionMode, setReducedMotionMode, autoplayGifs, setAutoplayGifs,
    animateEmojis, setAnimateEmojis, screenReaderSupport, setScreenReaderSupport, enableTts, setEnableTts, ttsSpeed, setTtsSpeed,
    audioCues, setAudioCues, isSpeakingTts, startOnBoot, setStartOnBoot, startMinimized, setStartMinimized,
    minimizeToTray, setMinimizeToTray, gpuAcceleration, setGpuAcceleration, autoUpdate, setAutoUpdate, devMode, setDevMode,
    keybinds, setKeybinds, recordingKeybindId, setRecordingKeybindId, language, setLanguage, timeFormat, setTimeFormat,
    timeZone, setTimeZone, firstDayOfWeek, setFirstDayOfWeek, ...audio,
    handleAvatarFile, handleBannerFile, handleSaveProfileChanges, handleResetProfile, handleTestTts, handleResetAccessibility,
    handleAddKeybind, handleDeleteKeybind, handleUpdateKeybindAction, handleResetKeybinds, getFormattedTimePreview
  };
}
