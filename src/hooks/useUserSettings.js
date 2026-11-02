import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playMuteSound } from '../soundEffects';
import { DEFAULT_KEYBINDS } from '../components/UserSettings/constants';

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

  // Voice & Video State
  const [voiceSubTab, setVoiceSubTab] = useState('all');
  const [inputDevice, setInputDevice] = useState('default_mic');
  const [outputDevice, setOutputDevice] = useState('default_spk');
  const [micVolume, setMicVolume] = useState(85);
  const [outputVolume, setOutputVolume] = useState(100);
  const [micTestActive, setMicTestActive] = useState(false);
  const [liveMicLevel, setLiveMicLevel] = useState(0);
  const [inputMode, setInputMode] = useState('activity');
  const [autoSensitivity, setAutoSensitivity] = useState(true);
  const [sensitivity, setSensitivity] = useState(-55);
  const [pttKey, setPttKey] = useState('Caps Lock');
  const [isRecordingPttKey, setIsRecordingPttKey] = useState(false);
  const [pttDelay, setPttDelay] = useState(20);
  const [pushToMuteKey, setPushToMuteKey] = useState('Yok');
  const [isRecordingPtmKey, setIsRecordingPtmKey] = useState(false);

  const [cameraDevice, setCameraDevice] = useState('default_cam');
  const [cameraTestActive, setCameraTestActive] = useState(false);
  const [virtualBg, setVirtualBg] = useState('none');
  const [customBgUrl, setCustomBgUrl] = useState('');
  const bgFileInputRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const previewStreamRef = useRef(null);
  const [hardwareCameraAcceleration, setHardwareCameraAcceleration] = useState(true);

  const [streamResolution, setStreamResolution] = useState('1080p');
  const [streamFps, setStreamFps] = useState('60');
  const [includeStreamAudio, setIncludeStreamAudio] = useState(true);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [openH264, setOpenH264] = useState(true);
  const [av1Codec, setAv1Codec] = useState(true);

  const [krispMode, setKrispMode] = useState('krisp');
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [advancedVoiceProcessing, setAdvancedVoiceProcessing] = useState(true);
  const [audioSubsystem, setAudioSubsystem] = useState('standard');
  const [attenuationPercent, setAttenuationPercent] = useState(0);
  const [attenuateOthers, setAttenuateOthers] = useState(true);
  const [attenuateSelf, setAttenuateSelf] = useState(false);
  const [qosPriority, setQosPriority] = useState(false);
  const [diagnosticAudio, setDiagnosticAudio] = useState(false);
  const [soundboardVolume, setSoundboardVolume] = useState(80);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('dilsed_msg_spacing', messageSpacing); }, [messageSpacing]);
  useEffect(() => { localStorage.setItem('dilsed_role_color_style', roleColorStyle); }, [roleColorStyle]);
  useEffect(() => { localStorage.setItem('dilsed_high_contrast', highContrast); }, [highContrast]);
  useEffect(() => { localStorage.setItem('dilsed_saturation', saturation); }, [saturation]);
  useEffect(() => { localStorage.setItem('dilsed_underline_links', underlineLinks); }, [underlineLinks]);
  useEffect(() => { localStorage.setItem('dilsed_reduced_motion', reducedMotionMode); }, [reducedMotionMode]);
  useEffect(() => { localStorage.setItem('dilsed_screen_reader', screenReaderSupport); }, [screenReaderSupport]);
  useEffect(() => { localStorage.setItem('dilsed_tts_enabled', enableTts); }, [enableTts]);
  useEffect(() => { localStorage.setItem('dilsed_tts_speed', ttsSpeed); }, [ttsSpeed]);
  useEffect(() => { localStorage.setItem('dilsed_audio_cues', audioCues); }, [audioCues]);

  useEffect(() => { localStorage.setItem('dilsed_start_on_boot', startOnBoot); }, [startOnBoot]);
  useEffect(() => { localStorage.setItem('dilsed_start_minimized', startMinimized); }, [startMinimized]);
  useEffect(() => { localStorage.setItem('dilsed_minimize_to_tray', minimizeToTray); }, [minimizeToTray]);
  useEffect(() => { localStorage.setItem('dilsed_gpu_accel', gpuAcceleration); }, [gpuAcceleration]);
  useEffect(() => { localStorage.setItem('dilsed_auto_update', autoUpdate); }, [autoUpdate]);
  useEffect(() => { localStorage.setItem('dilsed_dev_mode', devMode); }, [devMode]);

  useEffect(() => { localStorage.setItem('dilsed_keybinds', JSON.stringify(keybinds)); }, [keybinds]);
  useEffect(() => { localStorage.setItem('dilsed_language', language); }, [language]);
  useEffect(() => { localStorage.setItem('dilsed_time_format', timeFormat); }, [timeFormat]);
  useEffect(() => { localStorage.setItem('dilsed_timezone', timeZone); }, [timeZone]);
  useEffect(() => { localStorage.setItem('dilsed_first_day', firstDayOfWeek); }, [firstDayOfWeek]);

  // Mic test level interval
  useEffect(() => {
    let interval = null;
    if (micTestActive) {
      interval = setInterval(() => {
        setLiveMicLevel(Math.floor(20 + Math.random() * 70));
      }, 100);
    } else {
      setLiveMicLevel(0);
    }
    return () => clearInterval(interval);
  }, [micTestActive]);

  // Key recording listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isRecordingPttKey) {
        e.preventDefault();
        e.stopPropagation();
        setPttKey(e.key === ' ' ? 'Space' : e.key.toUpperCase());
        setIsRecordingPttKey(false);
      }
      if (isRecordingPtmKey) {
        e.preventDefault();
        e.stopPropagation();
        setPushToMuteKey(e.key === ' ' ? 'Space' : e.key.toUpperCase());
        setIsRecordingPtmKey(false);
      }
    };
    if (isRecordingPttKey || isRecordingPtmKey) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecordingPttKey, isRecordingPtmKey]);

  useEffect(() => {
    return () => {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    playMuteSound(next);
  };

  const handleToggleDeafen = () => {
    const next = !isDeafened;
    setIsDeafened(next);
    if (next) setIsMuted(true);
    playMuteSound(next);
  };

  const handleToggleCameraTest = async () => {
    if (cameraTestActive) {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((track) => track.stop());
        previewStreamRef.current = null;
      }
      setCameraTestActive(false);
    } else {
      setCameraTestActive(true);
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
          });
          previewStreamRef.current = stream;
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera access fallback:', err.message);
      }
    }
  };

  const handleCustomBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomBgUrl(url);
      setVirtualBg('custom');
    }
  };

  const handleResetVoiceSettings = () => {
    if (confirm('Möchtest du wirklich alle Sprach- und Videoeinstellungen auf die Standardwerte zurücksetzen?')) {
      setInputDevice('default_mic');
      setOutputDevice('default_spk');
      setMicVolume(85);
      setOutputVolume(100);
      setMicTestActive(false);
      setInputMode('activity');
      setAutoSensitivity(true);
      setSensitivity(-55);
      setPttKey('Caps Lock');
      setPttDelay(20);
      setPushToMuteKey('Yok');
      setCameraDevice('default_cam');
      setVirtualBg('none');
      setCustomBgUrl('');
      setHardwareCameraAcceleration(true);
      setStreamResolution('1080p');
      setStreamFps('60');
      setIncludeStreamAudio(true);
      setHardwareAcceleration(true);
      setOpenH264(true);
      setAv1Codec(true);
      setKrispMode('krisp');
      setEchoCancellation(true);
      setAutoGainControl(true);
      setAdvancedVoiceProcessing(true);
      setAudioSubsystem('standard');
      setAttenuationPercent(0);
      setAttenuateOthers(true);
      setAttenuateSelf(false);
      setQosPriority(false);
      setDiagnosticAudio(false);
      setSoundboardVolume(80);
      alert('Sprach- und Videoeinstellungen wurden erfolgreich zurückgesetzt.');
    }
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerImage(event.target.result);
        setHasUnsavedChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

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
      setFontSize(16);
      setMessageSpacing(16);
      setMessageDisplay('cozy');
      setRoleColorStyle('name');
      setShowProfileBadges(true);
      setHighContrast(false);
      setSaturation(100);
      setUnderlineLinks(false);
      setDesaturateRoleColors(false);
      setReducedMotionMode('system');
      setAutoplayGifs(true);
      setAnimateEmojis(true);
      setScreenReaderSupport(false);
      setEnableTts(false);
      setTtsSpeed(1.0);
      setAudioCues(false);
    }
  };

  const handleAddKeybind = () => {
    const newId = 'kb_' + Date.now();
    const newKb = { id: newId, action: 'toggle_mute', key: 'KEINE TASTE ZUGEWIESEN' };
    setKeybinds((prev) => [...prev, newKb]);
    setRecordingKeybindId(newId);
  };

  const handleDeleteKeybind = (id) => {
    setKeybinds((prev) => prev.filter((k) => k.id !== id));
    if (recordingKeybindId === id) setRecordingKeybindId(null);
  };

  const handleUpdateKeybindAction = (id, newAction) => {
    setKeybinds((prev) => prev.map((k) => (k.id === id ? { ...k, action: newAction } : k)));
  };

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
    activeTab, setActiveTab, profileSubTab, setProfileSubTab, selectedServerForProfile,
    setSelectedServerForProfile, displayName, setDisplayName, pronouns, setPronouns, avatar,
    setAvatar, avatarDecoration, setAvatarDecoration, bannerColor1, setBannerColor1, bannerColor2,
    setBannerColor2, bannerImage, setBannerImage, bio, setBio, statusPresence, setStatusPresence,
    statusText, setStatusText, statusEmoji, setStatusEmoji, showStatusEmojiPicker,
    setShowStatusEmojiPicker, serverNickname, setServerNickname, serverAvatar, setServerAvatar,
    hasUnsavedChanges, setHasUnsavedChanges, avatarFileRef, bannerFileRef, usernameInput,
    setUsernameInput, dataUsageAnalytics, setDataUsageAnalytics, allowDmsFromServers,
    setAllowDmsFromServers, desktopNotifications, setDesktopNotifications, selectedTheme,
    setSelectedTheme, messageDisplay, setMessageDisplay, fontSize, setFontSize, messageSpacing,
    setMessageSpacing, roleColorStyle, setRoleColorStyle, showProfileBadges, setShowProfileBadges,
    highContrast, setHighContrast, saturation, setSaturation, underlineLinks, setUnderlineLinks,
    desaturateRoleColors, setDesaturateRoleColors, reducedMotionMode, setReducedMotionMode,
    autoplayGifs, setAutoplayGifs, animateEmojis, setAnimateEmojis, screenReaderSupport,
    setScreenReaderSupport, enableTts, setEnableTts, ttsSpeed, setTtsSpeed, audioCues,
    setAudioCues, isSpeakingTts, startOnBoot, setStartOnBoot, startMinimized, setStartMinimized,
    minimizeToTray, setMinimizeToTray, gpuAcceleration, setGpuAcceleration, autoUpdate,
    setAutoUpdate, devMode, setDevMode, keybinds, setKeybinds, recordingKeybindId,
    setRecordingKeybindId, language, setLanguage, timeFormat, setTimeFormat, timeZone,
    setTimeZone, firstDayOfWeek, setFirstDayOfWeek, voiceSubTab, setVoiceSubTab, inputDevice,
    setInputDevice, outputDevice, setOutputDevice, micVolume, setMicVolume, outputVolume,
    setOutputVolume, micTestActive, setMicTestActive, liveMicLevel, inputMode, setInputMode,
    autoSensitivity, setAutoSensitivity, sensitivity, setSensitivity, pttKey, setPttKey,
    isRecordingPttKey, setIsRecordingPttKey, pttDelay, setPttDelay, pushToMuteKey,
    setPushToMuteKey, isRecordingPtmKey, setIsRecordingPtmKey, cameraDevice, setCameraDevice,
    cameraTestActive, setCameraTestActive, virtualBg, setVirtualBg, customBgUrl, setCustomBgUrl,
    bgFileInputRef, videoPreviewRef, previewStreamRef, hardwareCameraAcceleration,
    setHardwareCameraAcceleration, streamResolution, setStreamResolution, streamFps,
    setStreamFps, includeStreamAudio, setIncludeStreamAudio, hardwareAcceleration,
    setHardwareAcceleration, openH264, setOpenH264, av1Codec, setAv1Codec, krispMode,
    setKrispMode, echoCancellation, setEchoCancellation, autoGainControl, setAutoGainControl,
    advancedVoiceProcessing, setAdvancedVoiceProcessing, audioSubsystem, setAudioSubsystem,
    attenuationPercent, setAttenuationPercent, attenuateOthers, setAttenuateOthers,
    attenuateSelf, setAttenuateSelf, qosPriority, setQosPriority, diagnosticAudio,
    setDiagnosticAudio, soundboardVolume, setSoundboardVolume, handleToggleMute,
    handleToggleDeafen, handleToggleCameraTest, handleCustomBgUpload, handleResetVoiceSettings,
    handleAvatarFile, handleBannerFile, handleSaveProfileChanges, handleResetProfile,
    handleTestTts, handleResetAccessibility, handleAddKeybind, handleDeleteKeybind,
    handleUpdateKeybindAction, handleResetKeybinds, getFormattedTimePreview
  };
}
