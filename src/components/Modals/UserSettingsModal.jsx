import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Check,
  Database,
  Mic,
  Volume2,
  Shield,
  ShieldCheck,
  User,
  Palette,
  Copy,
  Sliders,
  Bell,
  Keyboard,
  Globe,
  LogOut,
  QrCode,
  Key,
  Smartphone,
  Video,
  Moon,
  Sun,
  Camera,
  Eye,
  Lock,
  MessageSquare,
  Monitor,
  Cpu,
  Layers,
  Sparkles,
  Download,
  AlertTriangle,
  Clock,
  Radio,
  FileText,
  Upload,
  Smile,
  Trash2,
  RotateCcw,
  RefreshCw,
  Flame,
  Award,
  Headphones,
  MicOff,
  VolumeX,
  Volume1,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Plus,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SUPABASE_URL, SUPABASE_KEY } from '../../supabaseClient';
import {
  playJoinVoiceSound,
  playLeaveVoiceSound,
  playMessagePingSound,
  playMuteSound,
  playAirhornSound
} from '../../soundEffects';

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
  const [activeTab, setActiveTab] = useState('profile'); // Default directly to Profiles as requested

  // ==================== PROFILE BEARBEITEN STATE ====================
  const [profileSubTab, setProfileSubTab] = useState('user'); // 'user' | 'server'
  const [selectedServerForProfile, setSelectedServerForProfile] = useState(servers[0]?.id || 'server_main');

  // Profile Form Fields
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Benutzer');
  const [pronouns, setPronouns] = useState(currentUser?.pronouns || 'er/ihn');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150');
  const [avatarDecoration, setAvatarDecoration] = useState(currentUser?.avatarDecoration || 'neon_ring');
  const [bannerColor1, setBannerColor1] = useState(currentUser?.bannerColor1 || '#5865f2');
  const [bannerColor2, setBannerColor2] = useState(currentUser?.bannerColor2 || '#eb459e');
  const [bannerImage, setBannerImage] = useState(currentUser?.bannerImage || '');
  const [bio, setBio] = useState(currentUser?.bio || '⚡ Entwickelt mit Vite, TailwindCSS und Supabase auf DilSed Web.');
  
  // Custom Status & Online Presence
  const [statusPresence, setStatusPresence] = useState(currentUser?.status || 'online'); // 'online' | 'idle' | 'dnd' | 'offline'
  const [statusText, setStatusText] = useState(currentUser?.statusText || '⚡ Unterwegs auf DilSed Web');
  const [statusEmoji, setStatusEmoji] = useState(currentUser?.statusEmoji || '⚡');
  const [statusClearTime, setStatusClearTime] = useState('never'); // 'today' | '4h' | '1h' | '30m' | 'never'
  const [showStatusEmojiPicker, setShowStatusEmojiPicker] = useState(false);

  // Server Specific Profile Fields
  const [serverNickname, setServerNickname] = useState(currentUser?.serverNicknames?.[selectedServerForProfile] || '');
  const [serverAvatar, setServerAvatar] = useState(currentUser?.serverAvatars?.[selectedServerForProfile] || '');

  // Unsaved changes tracking
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Hidden File Input Refs
  const avatarFileRef = useRef(null);
  const bannerFileRef = useRef(null);

  // 1. HESAP STATE
  const [usernameInput, setUsernameInput] = useState(currentUser?.username || 'dilseduser');
  const [is2FAEnabled, setIs2FAEnabled] = useState(currentUser?.twoFactorEnabled || false);
  const [show2FAWizard, setShow2FAWizard] = useState(false);
  const [twoFACodeInput, setTwoFACodeInput] = useState('');

  // 2. DATENSCHUTZ & PRIVATSPHÄRE STATE
  const [dataUsageAnalytics, setDataUsageAnalytics] = useState(true);
  const [personalizationData, setPersonalizationData] = useState(true);
  const [screenReaderTelemetry, setScreenReaderTelemetry] = useState(false);
  const [dataRequested, setDataRequested] = useState(false);

  // 3. NACHRICHTENBERECHTIGUNGEN STATE
  const [safeDmLevel, setSafeDmLevel] = useState('protect_all');
  const [allowDmsFromServers, setAllowDmsFromServers] = useState(true);
  const [filterSpamDms, setFilterSpamDms] = useState(true);
  const [autoLinkPreviews, setAutoLinkPreviews] = useState(true);

  // 4. BENACHRICHTIGUNGEN STATE
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [soundMessages, setSoundMessages] = useState(true);
  const [soundVoice, setSoundVoice] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  // 5. SES VE GÖRÜNTÜ STATE
  const [voiceSubTab, setVoiceSubTab] = useState('all'); // 'all' | 'audio' | 'video' | 'stream' | 'advanced' | 'sounds'
  const [inputDevice, setInputDevice] = useState('default_mic');
  const [outputDevice, setOutputDevice] = useState('default_spk');
  const [micVolume, setMicVolume] = useState(85);
  const [outputVolume, setOutputVolume] = useState(100);
  const [micTestActive, setMicTestActive] = useState(false);
  const [liveMicLevel, setLiveMicLevel] = useState(0);
  const [inputMode, setInputMode] = useState('activity'); // 'activity' | 'ptt'
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
  const [screenCaptureMethod, setScreenCaptureMethod] = useState('latest');
  const [openH264, setOpenH264] = useState(true);
  const [av1Codec, setAv1Codec] = useState(true);

  const [krispMode, setKrispMode] = useState('krisp'); // 'krisp' | 'standard' | 'none'
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [advancedVoiceProcessing, setAdvancedVoiceProcessing] = useState(true);
  const [audioSubsystem, setAudioSubsystem] = useState('standard'); // 'standard' | 'legacy' | 'experimental'
  const [attenuationPercent, setAttenuationPercent] = useState(0);
  const [attenuateOthers, setAttenuateOthers] = useState(true);
  const [attenuateSelf, setAttenuateSelf] = useState(false);
  const [qosPriority, setQosPriority] = useState(false);
  const [diagnosticAudio, setDiagnosticAudio] = useState(false);

  const [soundboardVolume, setSoundboardVolume] = useState(80);

  // Live bouncing mic meter simulation
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

  // Key recorder for PTT shortcut
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

  // Handle Mute & Deafen toggles with live sound feedback
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    playMuteSound(next);
  };

  const handleToggleDeafen = () => {
    const next = !isDeafened;
    setIsDeafened(next);
    if (next) {
      setIsMuted(true);
    }
    playMuteSound(next);
  };

  // Camera test stream toggle
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
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
          });
          previewStreamRef.current = stream;
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera access fallback (simulated active):', err.message);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

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
      setScreenCaptureMethod('latest');
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

  // 6. GÖRÜNÜM STATE
  const [selectedTheme, setSelectedTheme] = useState(themeConfig?.theme || 'dark');
  const [messageDisplay, setMessageDisplay] = useState(themeConfig?.messageDisplay || 'cozy');
  const [fontSize, setFontSize] = useState(themeConfig?.fontSize || 16);

  // ==================== 7. BARRIEREFREIHEIT STATE ====================
  const [messageSpacing, setMessageSpacing] = useState(() => {
    return parseInt(localStorage.getItem('dilsed_msg_spacing') || '16', 10);
  });
  const [roleColorStyle, setRoleColorStyle] = useState(() => {
    return localStorage.getItem('dilsed_role_color_style') || 'name'; // 'name' | 'dot' | 'none'
  });
  const [showProfileBadges, setShowProfileBadges] = useState(true);

  // Farbe und Kontrast
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('dilsed_high_contrast') === 'true';
  });
  const [saturation, setSaturation] = useState(() => {
    return parseInt(localStorage.getItem('dilsed_saturation') || '100', 10);
  });
  const [underlineLinks, setUnderlineLinks] = useState(() => {
    return localStorage.getItem('dilsed_underline_links') === 'true';
  });
  const [desaturateRoleColors, setDesaturateRoleColors] = useState(false);

  // Reduzierte Bewegung
  const [reducedMotionMode, setReducedMotionMode] = useState(() => {
    return localStorage.getItem('dilsed_reduced_motion') || 'system'; // 'system' | 'enabled' | 'disabled'
  });
  const [autoplayGifs, setAutoplayGifs] = useState(true);
  const [animateEmojis, setAnimateEmojis] = useState(true);

  // Ses ve Ekran Okuyucusu
  const [screenReaderSupport, setScreenReaderSupport] = useState(false);
  const [enableTts, setEnableTts] = useState(true);
  const [ttsSpeed, setTtsSpeed] = useState(1);
  const [audioCues, setAudioCues] = useState(false);
  const [isSpeakingTts, setIsSpeakingTts] = useState(false);

  const [accessSubTab, setAccessSubTab] = useState('all'); // 'all' | 'text' | 'density' | 'color' | 'motion' | 'screenreader'

  // Persist accessibility states
  useEffect(() => {
    localStorage.setItem('dilsed_msg_spacing', messageSpacing);
  }, [messageSpacing]);
  useEffect(() => {
    localStorage.setItem('dilsed_role_color_style', roleColorStyle);
  }, [roleColorStyle]);
  useEffect(() => {
    localStorage.setItem('dilsed_high_contrast', highContrast);
  }, [highContrast]);
  useEffect(() => {
    localStorage.setItem('dilsed_saturation', saturation);
  }, [saturation]);
  useEffect(() => {
    localStorage.setItem('dilsed_underline_links', underlineLinks);
  }, [underlineLinks]);
  useEffect(() => {
    localStorage.setItem('dilsed_reduced_motion', reducedMotionMode);
  }, [reducedMotionMode]);

  // Sync font size and display density with themeConfig
  useEffect(() => {
    if (setThemeConfig) {
      setThemeConfig((prev) => ({
        ...prev,
        fontSize,
        messageDisplay,
      }));
    }
  }, [fontSize, messageDisplay]);

  // Live TTS speak test
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
      setEnableTts(true);
      setTtsSpeed(1);
      setAudioCues(false);
    }
  };

  // 8. SYSTEM (WINDOWS-EINSTELLUNGEN) STATE
  const [startOnBoot, setStartOnBoot] = useState(() => {
    return localStorage.getItem('dilsed_start_on_boot') !== 'false';
  });
  const [startMinimized, setStartMinimized] = useState(() => {
    return localStorage.getItem('dilsed_start_minimized') === 'true';
  });
  const [minimizeToTray, setMinimizeToTray] = useState(() => {
    return localStorage.getItem('dilsed_minimize_to_tray') !== 'false';
  });
  const [gpuAcceleration, setGpuAcceleration] = useState(() => {
    return localStorage.getItem('dilsed_gpu_accel') !== 'false';
  });
  const [autoUpdate, setAutoUpdate] = useState(() => {
    return localStorage.getItem('dilsed_auto_update') !== 'false';
  });
  const [devMode, setDevMode] = useState(() => {
    return localStorage.getItem('dilsed_dev_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('dilsed_start_on_boot', startOnBoot);
  }, [startOnBoot]);
  useEffect(() => {
    localStorage.setItem('dilsed_start_minimized', startMinimized);
  }, [startMinimized]);
  useEffect(() => {
    localStorage.setItem('dilsed_minimize_to_tray', minimizeToTray);
  }, [minimizeToTray]);
  useEffect(() => {
    localStorage.setItem('dilsed_gpu_accel', gpuAcceleration);
  }, [gpuAcceleration]);
  useEffect(() => {
    localStorage.setItem('dilsed_auto_update', autoUpdate);
  }, [autoUpdate]);
  useEffect(() => {
    localStorage.setItem('dilsed_dev_mode', devMode);
  }, [devMode]);

  // ==================== TASTENBELEGUNGEN (KEYBINDS) ====================
  const DEFAULT_KEYBINDS = [
    { id: 'kb_1', action: 'toggle_mute', key: 'CTRL + SHIFT + M' },
    { id: 'kb_2', action: 'toggle_deafen', key: 'CTRL + SHIFT + D' },
    { id: 'kb_3', action: 'ptt', key: 'CAPS LOCK' },
    { id: 'kb_4', action: 'ptm', key: 'CTRL + SHIFT + U' },
    { id: 'kb_5', action: 'toggle_camera', key: 'CTRL + SHIFT + V' },
    { id: 'kb_6', action: 'toggle_screenshare', key: 'CTRL + SHIFT + S' },
    { id: 'kb_7', action: 'play_soundboard', key: 'CTRL + SHIFT + H' },
  ];

  const KEYBIND_ACTIONS = [
    { value: 'toggle_mute', label: 'Stummschaltung umschalten' },
    { value: 'toggle_deafen', label: 'Taubschaltung umschalten' },
    { value: 'ptt', label: 'Push-to-Talk (Normal)' },
    { value: 'ptt_priority', label: 'Push-to-Talk (Priorität)' },
    { value: 'ptm', label: 'Push-to-Mute' },
    { value: 'toggle_camera', label: 'Kamera ein-/ausschalten' },
    { value: 'toggle_screenshare', label: 'Bildschirmübertragung umschalten' },
    { value: 'toggle_overlay', label: 'Game-Overlay umschalten' },
    { value: 'play_soundboard', label: 'Soundboard abspielen (Lufthorn)' },
  ];

  const [keybinds, setKeybinds] = useState(() => {
    try {
      const saved = localStorage.getItem('dilsed_keybinds');
      return saved ? JSON.parse(saved) : DEFAULT_KEYBINDS;
    } catch {
      return DEFAULT_KEYBINDS;
    }
  });

  const [recordingKeybindId, setRecordingKeybindId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('dilsed_keybinds', JSON.stringify(keybinds));
    } catch {}
  }, [keybinds]);

  // Key recorder for keybinds table
  useEffect(() => {
    if (!recordingKeybindId) return;

    const handleKeybindRecord = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Skip lone modifier keys
      if (['Control', 'Shift', 'Alt', 'Meta'].includes(e.key)) return;

      if (e.key === 'Escape') {
        setRecordingKeybindId(null);
        return;
      }

      const parts = [];
      if (e.ctrlKey) parts.push('CTRL');
      if (e.altKey) parts.push('ALT');
      if (e.shiftKey) parts.push('SHIFT');
      if (e.metaKey) parts.push('META');

      let mainKey = e.key.toUpperCase();
      if (mainKey === ' ') mainKey = 'SPACE';
      if (!parts.includes(mainKey)) {
        parts.push(mainKey);
      }

      const combo = parts.join(' + ');

      setKeybinds((prev) =>
        prev.map((kb) => (kb.id === recordingKeybindId ? { ...kb, key: combo } : kb))
      );
      setRecordingKeybindId(null);
    };

    window.addEventListener('keydown', handleKeybindRecord, true);
    return () => window.removeEventListener('keydown', handleKeybindRecord, true);
  }, [recordingKeybindId]);

  // Live trigger when keybind shortcuts pressed
  useEffect(() => {
    const handleGlobalKeybindTrigger = (e) => {
      if (recordingKeybindId || isRecordingPttKey || isRecordingPtmKey) return;
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

      const parts = [];
      if (e.ctrlKey) parts.push('CTRL');
      if (e.altKey) parts.push('ALT');
      if (e.shiftKey) parts.push('SHIFT');
      if (e.metaKey) parts.push('META');

      let mainKey = e.key.toUpperCase();
      if (mainKey === ' ') mainKey = 'SPACE';
      if (!parts.includes(mainKey) && !['CONTROL', 'SHIFT', 'ALT', 'META'].includes(mainKey)) {
        parts.push(mainKey);
      }
      const combo = parts.join(' + ');

      const matched = keybinds.find((kb) => kb.key === combo);
      if (matched) {
        e.preventDefault();
        if (matched.action === 'toggle_mute') {
          handleToggleMute();
        } else if (matched.action === 'toggle_deafen') {
          handleToggleDeafen();
        } else if (matched.action === 'play_soundboard') {
          playAirhornSound();
        } else if (matched.action === 'toggle_camera') {
          handleToggleCameraTest();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeybindTrigger);
    return () => window.removeEventListener('keydown', handleGlobalKeybindTrigger);
  }, [keybinds, recordingKeybindId, isRecordingPttKey, isRecordingPtmKey, isMuted, isDeafened, cameraTestActive]);

  const handleAddKeybind = () => {
    const newId = 'kb_' + Date.now();
    const newKb = {
      id: newId,
      action: 'toggle_mute',
      key: 'KEINE TASTE ZUGEWIESEN',
    };
    setKeybinds((prev) => [...prev, newKb]);
    setRecordingKeybindId(newId);
  };

  const handleDeleteKeybind = (id) => {
    setKeybinds((prev) => prev.filter((k) => k.id !== id));
    if (recordingKeybindId === id) setRecordingKeybindId(null);
  };

  const handleUpdateKeybindAction = (id, newAction) => {
    setKeybinds((prev) =>
      prev.map((k) => (k.id === id ? { ...k, action: newAction } : k))
    );
  };

  const handleResetKeybinds = () => {
    if (confirm('Möchtest du wirklich alle Tastenbelegungen auf die Standardwerte zurücksetzen?')) {
      setKeybinds(DEFAULT_KEYBINDS);
      setRecordingKeybindId(null);
    }
  };

  // ==================== 9. SPRACHE & ZEIT STATE ====================
  const DISCORD_LANGUAGES = [
    { code: 'tr', native: 'Türkçe', english: 'Turkish', flag: '🇹🇷' },
    { code: 'en-US', native: 'English, US', english: 'English, US', flag: '🇺🇸' },
    { code: 'en-GB', native: 'English, UK', english: 'English, UK', flag: '🇬🇧' },
    { code: 'de', native: 'Deutsch', english: 'German', flag: '🇩🇪' },
    { code: 'fr', native: 'Français', english: 'French', flag: '🇫🇷' },
    { code: 'es-ES', native: 'Español', english: 'Spanish', flag: '🇪🇸' },
    { code: 'it', native: 'Italiano', english: 'Italian', flag: '🇮🇹' },
    { code: 'pt-BR', native: 'Português do Brasil', english: 'Portuguese, Brazilian', flag: '🇧🇷' },
    { code: 'ru', native: 'Русский', english: 'Russian', flag: '🇷🇺' },
    { code: 'uk', native: 'Українська', english: 'Ukrainian', flag: '🇺🇦' },
    { code: 'pl', native: 'Polski', english: 'Polish', flag: '🇵🇱' },
    { code: 'nl', native: 'Nederlands', english: 'Dutch', flag: '🇳🇱' },
    { code: 'ja', native: '日本語', english: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', native: '한국어', english: 'Korean', flag: '🇰🇷' },
    { code: 'zh-CN', native: '简体中文', english: 'Chinese, Simplified', flag: '🇨🇳' },
    { code: 'zh-TW', native: '繁體中文', english: 'Chinese, Traditional', flag: '🇹🇼' },
    { code: 'ar', native: 'العربية', english: 'Arabic', flag: '🇸🇦' },
    { code: 'hi', native: 'हिन्दी', english: 'Hindi', flag: '🇮🇳' },
    { code: 'sv-SE', native: 'Svenska', english: 'Swedish', flag: '🇸🇪' },
    { code: 'no', native: 'Norsk', english: 'Norwegian', flag: '🇳🇴' },
    { code: 'da', native: 'Dansk', english: 'Danish', flag: '🇩🇰' },
    { code: 'fi', native: 'Suomi', english: 'Finnish', flag: '🇫🇮' },
    { code: 'cs', native: 'Čeština', english: 'Czech', flag: '🇨🇿' },
    { code: 'el', native: 'Ελληνικά', english: 'Greek', flag: '🇬🇷' },
    { code: 'hu', native: 'Magyar', english: 'Hungarian', flag: '🇭🇺' },
    { code: 'ro', native: 'Română', english: 'Romanian', flag: '🇷🇴' },
    { code: 'vi', native: 'Tiếng Việt', english: 'Vietnamese', flag: '🇻🇳' },
    { code: 'id', native: 'Bahasa Indonesia', english: 'Indonesian', flag: '🇮🇩' },
    { code: 'th', native: 'ไทย', english: 'Thai', flag: '🇹🇭' },
    { code: 'he', native: 'עברית', english: 'Hebrew', flag: '🇮🇱' },
    { code: 'bg', native: 'Български', english: 'Bulgarian', flag: '🇧🇬' },
    { code: 'hr', native: 'Hrvatski', english: 'Croatian', flag: '🇭🇷' },
    { code: 'lt', native: 'Lietuvių', english: 'Lithuanian', flag: '🇱🇹' },
    { code: 'sk', native: 'Slovenčina', english: 'Slovak', flag: '🇸🇰' },
  ];

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('dilsed_language') || 'de';
  });
  const [timeFormat, setTimeFormat] = useState(() => {
    return localStorage.getItem('dilsed_time_format') || 'auto'; // 'auto' | '12h' | '24h'
  });
  const [timeZone, setTimeZone] = useState(() => {
    return localStorage.getItem('dilsed_timezone') || 'Europe/Istanbul';
  });
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(() => {
    return localStorage.getItem('dilsed_first_day') || 'auto';
  });
  const [languageSearch, setLanguageSearch] = useState('');
  const [langSubTab, setLangSubTab] = useState('all'); // 'all' | 'language' | 'time'

  useEffect(() => {
    localStorage.setItem('dilsed_language', language);
  }, [language]);
  useEffect(() => {
    localStorage.setItem('dilsed_time_format', timeFormat);
  }, [timeFormat]);
  useEffect(() => {
    localStorage.setItem('dilsed_timezone', timeZone);
  }, [timeZone]);
  useEffect(() => {
    localStorage.setItem('dilsed_first_day', firstDayOfWeek);
  }, [firstDayOfWeek]);

  const getFormattedTimePreview = (formatType) => {
    const d = new Date();
    if (formatType === '12h') {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    if (formatType === '24h') {
      return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    // auto:
    if (language === 'en-US' || language === 'en-GB') {
      return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' (Automatisch - 12h)';
    }
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' (Automatisch - 24h)';
  };

  useEffect(() => {
    return () => {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const renderKeybindsSection = (isEmbedded = false) => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-amber-500/20">
        <div>
          <h3 className="text-sm font-black text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-amber-400" />
            <span>Tastenbelegungen</span>
          </h3>
          <p className="text-xs text-amber-300/70 mt-0.5">
            Belege häufig genutzte Aktionen mit Tastenkürzeln für blitzschnelle Bedienung.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddKeybind}
          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 text-xs font-black flex items-center justify-center gap-1.5 transition shadow-md shadow-amber-500/20 active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tastenbelegung hinzufügen</span>
        </button>
      </div>

      {keybinds.length === 0 ? (
        <div className="p-8 text-center bg-[#0c0c10] rounded-xl border border-dashed border-amber-500/30">
          <Keyboard className="w-8 h-8 text-amber-400/50 mx-auto mb-2" />
          <p className="text-xs text-amber-300/70">Noch keine Tastenkürzel belegt.</p>
          <button
            onClick={handleAddKeybind}
            className="mt-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 text-xs font-black cursor-pointer shadow-md shadow-amber-500/20"
          >
            Erstes Tastenkürzel anlegen
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {keybinds.map((kb) => {
            const isRecording = recordingKeybindId === kb.id;
            return (
              <div
                key={kb.id}
                className={`p-3.5 rounded-xl border transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isRecording
                    ? 'bg-amber-500/15 border-amber-400 shadow-lg ring-1 ring-amber-400'
                    : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                {/* Aktionsauswahl */}
                <div className="flex-1 min-w-[200px]">
                  <label className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block mb-1">
                    Aktion
                  </label>
                  <select
                    value={kb.action}
                    onChange={(e) => handleUpdateKeybindAction(kb.id, e.target.value)}
                    className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg px-2.5 py-2 border border-amber-500/30 outline-none focus:border-amber-400 cursor-pointer font-medium"
                  >
                    {KEYBIND_ACTIONS.map((act) => (
                      <option key={act.value} value={act.value}>
                        {act.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tastenbelegung Aufnahmetaste */}
                <div className="min-w-[190px]">
                  <label className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block mb-1">
                    Tastenbelegung
                  </label>
                  <button
                    type="button"
                    onClick={() => setRecordingKeybindId(isRecording ? null : kb.id)}
                    className={`w-full px-3 py-2 rounded-lg border text-xs font-mono font-bold transition flex items-center justify-center gap-2 select-none cursor-pointer ${
                      isRecording
                        ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                        : 'bg-[#070709] hover:bg-[#121218] border-amber-500/30 text-amber-200'
                    }`}
                    title={isRecording ? 'Zum Abbrechen ESC drücken' : 'Klicken, um eine neue Taste aufzunehmen'}
                  >
                    <Keyboard className={`w-3.5 h-3.5 ${isRecording ? 'text-red-400 animate-bounce' : 'text-amber-400'}`} />
                    <span>{isRecording ? 'Taste drücken...' : kb.key || 'NICHT BELEGT'}</span>
                  </button>
                </div>

                {/* Löschen-Button */}
                <div className="flex items-end justify-end pt-1 md:pt-4">
                  <button
                    type="button"
                    onClick={() => handleDeleteKeybind(kb.id)}
                    className="p-2 rounded-lg text-amber-300/60 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition cursor-pointer"
                    title="Diese Tastenbelegung entfernen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Auf Standard zurücksetzen */}
      <div className="flex items-center justify-between pt-2 text-xs">
        <span className="text-[11px] text-amber-300/60">
          Tipp: Tastenbelegungen funktionieren im Hintergrund, während die App geöffnet ist.
        </span>
        <button
          type="button"
          onClick={handleResetKeybinds}
          className="text-amber-400 hover:text-amber-200 flex items-center gap-1.5 transition font-bold cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Auf Standard zurücksetzen</span>
        </button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  // Handle avatar file upload
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

  // Handle banner file upload
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

  // Save profile changes
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
      twoFactorEnabled: is2FAEnabled,
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

  const AVATAR_DECORATIONS = [
    { id: 'none', label: 'Keine', border: 'border-transparent' },
    { id: 'neon_ring', label: 'Neon-Ring', border: 'border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]' },
    { id: 'sakura', label: 'Kirschblüten', border: 'border-pink-400 ring-2 ring-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.8)]' },
    { id: 'fire_flame', label: 'Flammenrahmen', border: 'border-amber-500 ring-2 ring-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]' },
    { id: 'cyber_glitch', label: 'Cyber-Glitch', border: 'border-purple-500 ring-2 ring-indigo-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]' },
  ];

  const POPULAR_STATUS_EMOJIS = ['⚡', '🎧', '🎮', '💻', '🔥', '✨', '💤', '🍕', '🚀', '🐱'];

  return (
    <div className="fixed inset-0 z-50 flex bg-[#08080b] text-neutral-200 animate-in fade-in select-none">
      {/* ----------------- LEFT NAVIGATION SIDEBAR ----------------- */}
      <div className="w-64 bg-[#050507] flex flex-col items-end py-10 pr-6 flex-shrink-0 border-r border-amber-500/15 overflow-y-auto custom-scrollbar">
        <div className="w-52 space-y-1 text-xs font-medium">
          {/* USER SETTINGS */}
          <div className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase px-2 mb-1">
            BENUTZEREINSTELLUNGEN
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Profile (Profil bearbeiten)</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'account'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <User className="w-3.5 h-3.5 text-amber-400" />
            <span>Mein Konto</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Datenschutz & Privatsphäre</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Nachrichtenberechtigungen</span>
          </button>

          {/* APP SETTINGS */}
          <div className="text-[10px] font-extrabold text-amber-400 tracking-wider uppercase px-2 pt-3 mb-1">
            APP-EINSTELLUNGEN
          </div>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Benachrichtigungen</span>
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'voice'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span>Sprache & Video</span>
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'appearance'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Erscheinungsbild</span>
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'accessibility'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Barrierefreiheit</span>
          </button>
          <button
            onClick={() => setActiveTab('keybinds')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'keybinds'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Tastenbelegungen</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'system'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span>Windows & System</span>
          </button>
          <button
            onClick={() => setActiveTab('language')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'language'
                ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Sprache & Zeit</span>
          </button>

          <div className="h-[1px] bg-amber-500/20 my-2" />

          {/* LOG OUT */}
          <button
            onClick={() => {
              if (confirm('Möchtest du dich wirklich von DilSed abmelden?')) {
                onLogout();
                onClose();
              }
            }}
            className="w-full text-left px-2.5 py-1.5 rounded text-red-400 hover:bg-red-500/15 transition flex items-center gap-2 font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Abmelden</span>
          </button>
        </div>
      </div>

      {/* ----------------- RIGHT MAIN CONTENT AREA ----------------- */}
      <div className="flex-1 flex overflow-y-auto px-8 py-10 relative bg-[#08080b]">
        <div className="w-full max-w-4xl pb-16">
          {/* ==================== PROFILE-TAB (PROFILE BEARBEITEN) ==================== */}
          {activeTab === 'profile' && (
            <div>
              <div className="mb-4">
                <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  Profile
                </h2>
                <p className="text-xs text-amber-300/70 font-medium">
                  Passe dein Aussehen, deine Biografie und deinen Status auf DilSed oder für bestimmte Server an.
                </p>
              </div>

              {/* Unter-Tabs: [Benutzerprofil] [Serverprofile] */}
              <div className="flex items-center gap-4 border-b border-amber-500/20 pb-3 mb-6">
                <button
                  onClick={() => setProfileSubTab('user')}
                  className={`pb-1 text-sm font-bold transition border-b-2 ${
                    profileSubTab === 'user'
                      ? 'border-amber-400 text-amber-200'
                      : 'border-transparent text-amber-300/60 hover:text-amber-200'
                  }`}
                >
                  Benutzerprofil (Global)
                </button>
                <button
                  onClick={() => setProfileSubTab('server')}
                  className={`pb-1 text-sm font-bold transition border-b-2 ${
                    profileSubTab === 'server'
                      ? 'border-amber-400 text-amber-200'
                      : 'border-transparent text-amber-300/60 hover:text-amber-200'
                  }`}
                >
                  Server-Profile (Serverspezifisch)
                </button>
              </div>

              {/* Hidden File Inputs for Avatar & Banner */}
              <input
                ref={avatarFileRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFile}
                className="hidden"
              />
              <input
                ref={bannerFileRef}
                type="file"
                accept="image/*"
                onChange={handleBannerFile}
                className="hidden"
              />

              {/* Two Column Layout: Editor (Left) & Real-time Profile Card Preview (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Edit Controls */}
                <div className="lg:col-span-7 space-y-5">
                  {profileSubTab === 'server' && (
                    <div className="bg-[#0c0c10] p-4 rounded-xl border border-amber-500/20 mb-2">
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
                        WÄHLE EINEN SERVER
                      </label>
                      <select
                        value={selectedServerForProfile}
                        onChange={(e) => setSelectedServerForProfile(e.target.value)}
                        className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none"
                      >
                        {servers.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* 1. Display Name */}
                  <div>
                    <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
                      {profileSubTab === 'user' ? 'ANZEIGENAME' : 'SERVER-SPITZNAME'}
                    </label>
                    <input
                      type="text"
                      value={profileSubTab === 'user' ? displayName : serverNickname}
                      onChange={(e) => {
                        if (profileSubTab === 'user') setDisplayName(e.target.value);
                        else setServerNickname(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Dein Name auf DilSed"
                      className="w-full bg-[#0c0c10] rounded-lg px-3.5 py-2.5 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
                    />
                  </div>

                  {/* 2. Pronouns (Zamirler) */}
                  {profileSubTab === 'user' && (
                    <div>
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
                        PRONOMEN
                      </label>
                      <input
                        type="text"
                        value={pronouns}
                        onChange={(e) => {
                          setPronouns(e.target.value);
                          setHasUnsavedChanges(true);
                        }}
                        placeholder="z. B. er/ihn, sie/ihr, they/them"
                        className="w-full bg-[#0c0c10] rounded-lg px-3.5 py-2.5 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
                      />
                    </div>
                  )}

                  {/* 3. Avatar & Avatar Decoration */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-amber-200">Profilbild (Avatar)</div>
                        <div className="text-[10px] text-amber-300/60 font-medium">Lade ein Bild von deinem Computer hoch oder gib eine URL ein.</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => avatarFileRef.current?.click()}
                          className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 px-3.5 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Bild auswählen</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Avatar-Bild-URL:', avatar);
                            if (url) {
                              setAvatar(url);
                              setHasUnsavedChanges(true);
                            }
                          }}
                          className="bg-[#121217] hover:bg-[#181820] text-amber-300 text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 font-bold"
                        >
                          URL
                        </button>
                      </div>
                    </div>

                    {/* Avatar Decorations */}
                    <div>
                      <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>AVATAR-DEKORATION</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {AVATAR_DECORATIONS.map((dec) => (
                          <div
                            key={dec.id}
                            onClick={() => {
                              setAvatarDecoration(dec.id);
                              setHasUnsavedChanges(true);
                            }}
                            className={`p-2 rounded-lg border text-center cursor-pointer transition flex flex-col items-center justify-center ${
                              avatarDecoration === dec.id
                                ? 'bg-[#15151e] border-amber-400 font-bold text-amber-200 shadow-md shadow-amber-500/20'
                                : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:text-amber-200'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full mb-1 ${dec.border} overflow-hidden bg-neutral-900`}>
                              <img src={avatar} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-[9px] leading-tight truncate">{dec.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Profile Theme & Banner */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div>
                      <div className="text-xs font-bold text-amber-200 mb-1">Profil-Design & Banner</div>
                      <div className="text-[10px] text-amber-300/60 font-medium mb-3">Lege die Hintergrund-Farbverläufe oder ein Banner-Bild für dein Profil fest.</div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">PRIMÄRFARBE</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={bannerColor1}
                              onChange={(e) => {
                                setBannerColor1(e.target.value);
                                setHasUnsavedChanges(true);
                              }}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                            />
                            <span className="font-mono text-xs text-amber-200 uppercase font-bold">{bannerColor1}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">SEKUNDÄRFARBE (VERLAUF)</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={bannerColor2}
                              onChange={(e) => {
                                setBannerColor2(e.target.value);
                                setHasUnsavedChanges(true);
                              }}
                              className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                            />
                            <span className="font-mono text-xs text-amber-200 uppercase font-bold">{bannerColor2}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => bannerFileRef.current?.click()}
                          className="bg-[#121217] hover:bg-[#181820] text-amber-300 text-xs px-3.5 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1.5 font-bold"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Banner-Bild hochladen</span>
                        </button>
                        {bannerImage && (
                          <button
                            type="button"
                            onClick={() => {
                              setBannerImage('');
                              setHasUnsavedChanges(true);
                            }}
                            className="text-red-400 text-xs hover:underline flex items-center gap-1 font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Banner entfernen</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5. Über mich (Biografie) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
                        ÜBER MICH (BIOGRAFIE)
                      </label>
                      <span className="text-[10px] text-amber-300/60 font-mono">{bio.length}/190</span>
                    </div>
                    <textarea
                      rows={3}
                      maxLength={190}
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value);
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Erzähle etwas über dich..."
                      className="w-full bg-[#0c0c10] rounded-xl p-3 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
                    />
                  </div>

                  {/* 6. Custom Status & Presence */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div>
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
                        BENUTZERDEFINIERTER STATUS & EMOJI
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setShowStatusEmojiPicker(!showStatusEmojiPicker)}
                            className="w-9 h-9 rounded-lg bg-[#070709] border border-amber-500/30 flex items-center justify-center text-lg hover:scale-105 transition"
                            title="Emoji auswählen"
                          >
                            {statusEmoji || '⚡'}
                          </button>

                          {showStatusEmojiPicker && (
                            <div className="absolute top-11 left-0 bg-[#0c0c10] border border-amber-500/30 rounded-xl p-2.5 shadow-2xl z-30 flex flex-wrap gap-1.5 w-44 animate-in fade-in zoom-in-95">
                              {POPULAR_STATUS_EMOJIS.map((em) => (
                                <button
                                  key={em}
                                  type="button"
                                  onClick={() => {
                                    setStatusEmoji(em);
                                    setShowStatusEmojiPicker(false);
                                    setHasUnsavedChanges(true);
                                  }}
                                  className="text-lg p-1.5 hover:bg-amber-400/15 rounded-lg transition hover:scale-110"
                                >
                                  {em}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <input
                          type="text"
                          value={statusText}
                          onChange={(e) => {
                            setStatusText(e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Was machst du gerade?"
                          className="flex-1 bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/25 focus:border-amber-400 focus:outline-none font-medium"
                        />
                      </div>
                    </div>

                    {/* Online Presence Status Selector */}
                    <div>
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
                        ONLINE-STATUS
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'online', label: 'Online', color: 'bg-emerald-400' },
                          { id: 'idle', label: 'Abwesend', color: 'bg-amber-400' },
                          { id: 'dnd', label: 'Bitte nicht stören', color: 'bg-red-500' },
                          { id: 'offline', label: 'Unsichtbar', color: 'bg-neutral-600' },
                        ].map((pr) => (
                          <div
                            key={pr.id}
                            onClick={() => {
                              setStatusPresence(pr.id);
                              setHasUnsavedChanges(true);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg border cursor-pointer transition flex items-center gap-2 ${
                              statusPresence === pr.id
                                ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-bold shadow-md shadow-amber-500/15'
                                : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:text-amber-200'
                            }`}
                          >
                            <span className={`w-2.5 h-2.5 rounded-full ${pr.color} flex-shrink-0`} />
                            <span className="text-[11px] truncate font-medium">{pr.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Real-time Live Profile Card Preview */}
                <div className="lg:col-span-5 sticky top-4">
                  <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-2">
                    VORSCHAU
                  </div>

                  {/* Profile Card Container */}
                  <div className="w-full bg-[#0c0c10] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 relative">
                    {/* Banner */}
                    <div
                      className="h-28 w-full relative transition-all duration-300"
                      style={{
                        background: bannerImage
                          ? `url(${bannerImage}) center/cover no-repeat`
                          : `linear-gradient(135deg, ${bannerColor1}, ${bannerColor2})`
                      }}
                    />

                    {/* Avatar & Badges Area */}
                    <div className="px-4 pb-4 relative">
                      <div className="flex items-end justify-between -mt-12 mb-3">
                        {/* Avatar with decoration */}
                        <div className="relative">
                          <div
                            className={`w-20 h-20 rounded-full border-4 border-[#0c0c10] overflow-hidden bg-neutral-900 transition-all ${
                              AVATAR_DECORATIONS.find((d) => d.id === avatarDecoration)?.border || ''
                            }`}
                          >
                            <img src={avatar} alt="Preview Avatar" className="w-full h-full object-cover" />
                          </div>
                          {/* Online Status Dot */}
                          <span
                            className={`absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-[#0c0c10] ${
                              statusPresence === 'online'
                                ? 'bg-emerald-400'
                                : statusPresence === 'idle'
                                ? 'bg-amber-400'
                                : statusPresence === 'dnd'
                                ? 'bg-red-500'
                                : 'bg-neutral-600'
                            }`}
                          />
                        </div>

                        {/* Badges container */}
                        <div className="bg-[#121217] rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow border border-amber-500/20">
                          <img src="/dilsed-logo.png" alt="DilSed" className="w-4 h-4 object-contain" title="DilSed Mitglied" />
                          <span title="Aktiver Entwickler" className="text-xs">⚡</span>
                          <span title="Früher Unterstützer" className="text-xs">👑</span>
                          <span title="HypeSquad Bravery" className="text-xs">🛡️</span>
                        </div>
                      </div>

                      {/* User Info Box */}
                      <div className="bg-[#070709] rounded-xl p-3.5 space-y-3 border border-amber-500/20">
                        <div>
                          <div className="font-black text-amber-200 text-base leading-tight">
                            {displayName || 'Benutzer'}
                          </div>
                          <div className="text-xs text-amber-300/60 flex items-center gap-1 font-medium">
                            <span>@{usernameInput || 'benutzer'}</span>
                            {pronouns && (
                              <>
                                <span>•</span>
                                <span className="text-[11px] text-amber-200/60">{pronouns}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Custom Status Display */}
                        {statusText && (
                          <div className="text-xs text-amber-300 flex items-center gap-1.5 py-1 border-t border-b border-amber-500/15 font-medium">
                            <span>{statusEmoji}</span>
                            <span className="truncate">{statusText}</span>
                          </div>
                        )}

                        {/* About Me / Bio */}
                        {bio && (
                          <div>
                            <div className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                              ÜBER MICH
                            </div>
                            <div className="text-xs text-amber-100/90 whitespace-pre-wrap leading-relaxed font-normal">
                              {bio}
                            </div>
                          </div>
                        )}

                        {/* Membership info */}
                        <div>
                          <div className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                            DILSED-MITGLIED
                          </div>
                          <div className="text-[11px] text-amber-300/60 flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Mitglied seit 12. Oktober 2026</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Unsaved Changes Bar */}
              {hasUnsavedChanges && (
                <div className="fixed bottom-4 left-72 right-12 bg-[#0c0c10] text-amber-200 px-5 py-3 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.95),0_0_20px_rgba(245,158,11,0.25)] border border-amber-500/40 flex items-center justify-between z-50 animate-in slide-in-from-bottom-5">
                  <span className="text-xs font-bold text-amber-200">
                    Vorsicht – du hast ungespeicherte Änderungen!
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleResetProfile}
                      className="text-xs text-amber-300/70 hover:text-amber-200 hover:underline font-bold"
                    >
                      Zurücksetzen
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProfileChanges}
                      className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 px-4 py-1.5 rounded-lg text-xs font-black transition shadow-md shadow-amber-500/25"
                    >
                      Änderungen speichern
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 1. HESAP ==================== */}
          {activeTab === 'account' && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-6">Mein Konto</h2>
              <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                  <div>
                    <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">BENUTZERNAME</div>
                    <div className="text-xs font-bold text-amber-100">@{usernameInput}</div>
                  </div>
                  <button onClick={() => { const u = prompt('Neuer Benutzername:', usernameInput); if (u) setUsernameInput(u); }} className="bg-[#121217] hover:bg-amber-400/10 text-xs text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 transition">Bearbeiten</button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">E-MAIL</div>
                    <div className="text-xs font-bold text-amber-100">{currentUser?.email || 'ornek@dilsed.web'}</div>
                  </div>
                  <button onClick={() => alert('Bestätigungslink wurde an deine E-Mail gesendet.')} className="bg-[#121217] hover:bg-amber-400/10 text-xs text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 transition">Bearbeiten</button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. DATENSCHUTZ & PRIVATSPHÄRE ==================== */}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">Datenschutz & Privatsphäre</h2>
              <p className="text-xs text-amber-300/70 mb-6">Verwalte, wie deine Daten erfasst werden, und behalte die volle Kontrolle über deine Privatsphäre.</p>
              <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-100">Daten zur Verbesserung von DilSed verwenden</span>
                  <input type="checkbox" checked={dataUsageAnalytics} onChange={(e) => setDataUsageAnalytics(e.target.checked)} className="w-4 h-4 accent-amber-500 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 3. NACHRICHTENBERECHTIGUNGEN ==================== */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">Nachrichtenberechtigungen</h2>
              <p className="text-xs text-amber-300/70 mb-6">Filtere unerwünschte Direktnachrichten.</p>
              <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-100">Direktnachrichten von Servermitgliedern erlauben</span>
                  <input type="checkbox" checked={allowDmsFromServers} onChange={(e) => setAllowDmsFromServers(e.target.checked)} className="w-4 h-4 accent-amber-500 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 4. BENACHRICHTIGUNGEN ==================== */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">Benachrichtigungseinstellungen</h2>
              <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-100">Desktop-Benachrichtigungen aktivieren</span>
                  <input type="checkbox" checked={desktopNotifications} onChange={(e) => setDesktopNotifications(e.target.checked)} className="w-4 h-4 accent-amber-500 cursor-pointer" />
                </div>
              </div>
            </div>
          )}

          {/* ==================== 5. SES VE GÖRÜNTÜ ==================== */}
          {activeTab === 'voice' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1">Sprach- & Videoeinstellungen</h2>
                <p className="text-xs text-amber-300/70">
                  Konfiguriere dein Mikrofon, Lautsprecher, Webcam und Bildschirmübertragung.
                </p>
              </div>

              {/* Sub-Tabs Navigation Filter */}
              <div className="flex items-center gap-2 border-b border-amber-500/20 pb-3 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'all', label: 'Alle' },
                  { id: 'audio', label: 'Spracheinstellungen' },
                  { id: 'mute_deafen', label: 'Stummschalten & Taubschalten' },
                  { id: 'video', label: 'Kameraeinstellungen' },
                  { id: 'stream', label: 'Streameinstellungen' },
                  { id: 'advanced', label: 'Erweiterte Einstellungen' },
                  { id: 'sounds', label: 'Sounds & Effekte' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setVoiceSubTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      voiceSubTab === tab.id
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                        : 'bg-[#0e0e13] text-amber-200/70 border border-amber-500/20 hover:bg-amber-400/10 hover:text-amber-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* SECTION 1: AUDIO-EINSTELLUNGEN (EINGABE- & AUSGABEGERÄTE) */}
              {(voiceSubTab === 'all' || voiceSubTab === 'audio') && (
                <div className="space-y-6">
                  <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    SPRACHEINSTELLUNGEN (EINGABE & AUSGABE)
                  </div>

                  {/* Device Selectors & Volume Sliders Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Input Device (Microphone) */}
                    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                      <label className="text-[11px] font-extrabold text-amber-400 uppercase flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Mic className="w-3.5 h-3.5 text-emerald-400" />
                          <span>EINGABEGERÄT (MIKROFON)</span>
                        </span>
                      </label>
                      <select
                        value={inputDevice}
                        onChange={(e) => setInputDevice(e.target.value)}
                        className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
                      >
                        <option value="default_mic">Standard - Mikrofon (Realtek(R) Audio)</option>
                        <option value="mic_intel">Mikrofonarray (Intel® Smart Sound Technologie)</option>
                        <option value="mic_hyperx">Headset-Mikrofon (HyperX Cloud II Wireless)</option>
                        <option value="mic_vbaudio">Virtuelles Audiokabel (VB-Audio Virtual Cable)</option>
                        <option value="mic_usb">Externes Studio-Mikrofon (Rode NT-USB / Blue Yeti)</option>
                      </select>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[10px] font-extrabold text-amber-400 uppercase">EINGANGSLAUTSTÄRKE</span>
                          <span className="text-amber-200 font-bold">%{micVolume}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={micVolume}
                          onChange={(e) => setMicVolume(parseInt(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Output Device (Speakers/Headset) */}
                    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                      <label className="text-[11px] font-extrabold text-amber-400 uppercase flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>AUSGABEGERÄT (LAUTSPRECHER / KOPFHÖRER)</span>
                        </span>
                      </label>
                      <select
                        value={outputDevice}
                        onChange={(e) => setOutputDevice(e.target.value)}
                        className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
                      >
                        <option value="default_spk">Standard - Lautsprecher (Realtek(R) Audio)</option>
                        <option value="spk_hyperx">Kopfhörer (HyperX Cloud II Wireless Headset)</option>
                        <option value="spk_optical">Realtek Digital Output (Optischer Ausgang)</option>
                        <option value="spk_hdmi">Monitor-Lautsprecher (NVIDIA High Definition Audio)</option>
                      </select>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[10px] font-extrabold text-amber-400 uppercase">AUSGANGSLAUTSTÄRKE</span>
                          <span className="text-amber-200 font-bold">%{outputVolume}</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={outputVolume}
                          onChange={(e) => setOutputVolume(parseInt(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mic Test Box */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-amber-200 mb-0.5">MIKROFONTEST ("LASS DICH HÖREN")</div>
                        <p className="text-[11px] text-amber-300/70">
                          Hört sich etwas seltsam an? Teste dein Mikrofon und höre dir deine eigene Stimme an.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMicTestActive(!micTestActive)}
                        className={`px-4 py-2 rounded-lg text-xs font-black transition shadow-md cursor-pointer ${
                          micTestActive
                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                            : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 shadow-amber-500/20'
                        }`}
                      >
                        {micTestActive ? 'Test beenden' : 'Mikrofon testen'}
                      </button>
                    </div>

                    {/* Segmented LED Audio Level Meter */}
                    <div className="h-4 bg-[#070709] rounded-md overflow-hidden flex items-center px-1 gap-1 border border-amber-500/30">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const stepValue = (i + 1) * 4.16;
                        const isLit = micTestActive && liveMicLevel >= stepValue;
                        const isHigh = i > 18;
                        const isMed = i > 12 && i <= 18;
                        return (
                          <div
                            key={i}
                            className={`flex-1 h-2 rounded-sm transition-all duration-75 ${
                              isLit
                                ? isHigh
                                  ? 'bg-red-500 shadow-sm shadow-red-500'
                                  : isMed
                                  ? 'bg-amber-400 shadow-sm shadow-amber-400'
                                  : 'bg-emerald-400 shadow-sm shadow-emerald-400'
                                : 'bg-white/5'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Eingabemodus (Sprachaktivierung / Push-to-Talk) */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">EINGABEMODUS</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Voice Activity Mode */}
                      <label
                        onClick={() => setInputMode('activity')}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          inputMode === 'activity'
                            ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/15'
                            : 'border-amber-500/20 bg-[#070709] hover:bg-[#121218]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="inputMode"
                            checked={inputMode === 'activity'}
                            onChange={() => setInputMode('activity')}
                            className="accent-amber-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-amber-100">Sprachaktivierung</span>
                        </div>
                        <Radio className="w-4 h-4 text-emerald-400" />
                      </label>

                      {/* Push to Talk Mode */}
                      <label
                        onClick={() => setInputMode('ptt')}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          inputMode === 'ptt'
                            ? 'border-amber-400 bg-amber-500/10 shadow-md shadow-amber-500/15'
                            : 'border-amber-500/20 bg-[#070709] hover:bg-[#121218]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="radio"
                            name="inputMode"
                            checked={inputMode === 'ptt'}
                            onChange={() => setInputMode('ptt')}
                            className="accent-amber-500 cursor-pointer"
                          />
                          <span className="text-xs font-bold text-amber-100">Push-to-Talk</span>
                        </div>
                        <Keyboard className="w-4 h-4 text-amber-400" />
                      </label>
                    </div>

                    {/* Mode Specific Controls */}
                    {inputMode === 'activity' ? (
                      <div className="pt-2 border-t border-amber-500/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-amber-100 font-medium">Eingabeempfindlichkeit automatisch ermitteln</span>
                          <input
                            type="checkbox"
                            checked={autoSensitivity}
                            onChange={(e) => setAutoSensitivity(e.target.checked)}
                            className="w-4 h-4 accent-amber-500 cursor-pointer"
                          />
                        </div>

                        {!autoSensitivity && (
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">EMPFINDLICHKEIT</span>
                              <span className="text-amber-200 font-bold">{sensitivity} dB</span>
                            </div>
                            <input
                              type="range"
                              min={-100}
                              max={0}
                              value={sensitivity}
                              onChange={(e) => setSensitivity(parseInt(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-amber-500/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-amber-100">TASTENKOMBINATION</div>
                            <div className="text-[11px] text-amber-300/70">Taste gedrückt halten, um zu sprechen.</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsRecordingPttKey(true)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                              isRecordingPttKey
                                ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
                                : 'bg-[#070709] text-amber-200 border-amber-500/30 hover:border-amber-400'
                            }`}
                          >
                            {isRecordingPttKey ? 'Taste drücken...' : pttKey}
                          </button>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">PUSH-TO-TALK VERZÖGERUNG BEIM LOSLASSEN</span>
                            <span className="text-amber-200 font-bold">{pttDelay} ms</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={2000}
                            step={10}
                            value={pttDelay}
                            onChange={(e) => setPttDelay(parseInt(e.target.value))}
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION 2: STUMM- & TAUBSTEUERUNG */}
              {(voiceSubTab === 'all' || voiceSubTab === 'mute_deafen' || voiceSubTab === 'audio') && (
                <div className="space-y-4 pt-4 border-t border-amber-500/20">
                  <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center justify-between">
                    <span>STUMM- UND TAUBSCHALTUNG</span>
                    <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      Live synchronisiert
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 1. MIKROFONU SUSTUR / SUSTURMAYI KALDIR */}
                    <div className={`p-4 rounded-2xl border transition shadow-lg ${
                      isMuted
                        ? 'bg-red-500/10 border-red-500/40'
                        : 'bg-[#0c0c10] border-amber-500/20'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isMuted ? 'bg-red-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
                          }`}>
                            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-100">Mikrofonstatus</div>
                            <div className={`text-[11px] font-semibold ${isMuted ? 'text-red-400' : 'text-emerald-400'}`}>
                              {isMuted ? 'Stummgeschaltet (Mikrofon aus)' : 'Aktiv & Bereit'}
                            </div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isMuted ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {isMuted ? 'STUMM' : 'AKTIV'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow cursor-pointer ${
                          isMuted
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {isMuted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                        <span>{isMuted ? 'Stummschaltung aufheben' : 'Mikrofon stummschalten'}</span>
                      </button>

                      <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs">
                        <span className="text-amber-300/70 text-[11px]">Push-to-Mute Tastenkürzel:</span>
                        <button
                          type="button"
                          onClick={() => setIsRecordingPtmKey(true)}
                          className="px-2.5 py-1 rounded bg-[#070709] text-amber-200 text-[11px] font-mono border border-amber-500/30 hover:border-amber-400 cursor-pointer"
                        >
                          {isRecordingPtmKey ? 'Taste drücken...' : pushToMuteKey}
                        </button>
                      </div>
                    </div>

                    {/* 2. TAUB- & ENTTÄUBUNGSSTEUERUNG */}
                    <div className={`p-4 rounded-2xl border transition shadow-lg ${
                      isDeafened
                        ? 'bg-red-500/10 border-red-500/40'
                        : 'bg-[#0c0c10] border-amber-500/20'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isDeafened ? 'bg-red-500 text-white' : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            <Headphones className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-amber-100">Kopfhörer / Audioausgabe</div>
                            <div className={`text-[11px] font-semibold ${isDeafened ? 'text-red-400' : 'text-amber-300'}`}>
                              {isDeafened ? 'Taubgeschaltet (Alle Töne aus)' : 'Töne aktiv & hörbar'}
                            </div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          isDeafened ? 'bg-red-500/20 text-red-400' : 'bg-amber-400/20 text-amber-300'
                        }`}>
                          {isDeafened ? 'TAUB' : 'AKTIV'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleToggleDeafen}
                        className={`w-full py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 shadow cursor-pointer ${
                          isDeafened
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-neutral-950'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        <Headphones className="w-4 h-4" />
                        <span>{isDeafened ? 'Taubschaltung aufheben' : 'Kopfhörer taubschalten'}</span>
                      </button>

                      <div className="mt-3 pt-3 border-t border-amber-500/20 text-[11px] text-amber-300/70">
                        Wenn du dich taub schaltest, wird dein Mikrofon automatisch mit stummgeschaltet.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: KAMERA-EINSTELLUNGEN (KAMERA & VIDEO) */}
              {(voiceSubTab === 'all' || voiceSubTab === 'video') && (
                <div className="space-y-6 pt-4 border-t border-amber-500/20">
                  <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    KAMERAEINSTELLUNGEN & VIDEOVORSCHAU
                  </div>

                  {/* Camera Device Picker */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                    <label className="text-[11px] font-extrabold text-amber-400 uppercase flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>KAMERAGERÄT</span>
                    </label>
                    <select
                      value={cameraDevice}
                      onChange={(e) => setCameraDevice(e.target.value)}
                      className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
                    >
                      <option value="default_cam">Standard - Integrierte HD-Webcam (1bcf:28c1)</option>
                      <option value="cam_obs">OBS Virtual Camera (Virtuelle Kamera)</option>
                      <option value="cam_logitech">Logitech C920 HD Pro Webcam</option>
                      <option value="cam_droid">DroidCam / Iriun Webcam</option>
                    </select>
                  </div>

                  {/* Video Preview Box */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-amber-100">VIDEOVORSCHAU</div>
                        <div className="text-[11px] text-amber-300/70">Teste live, wie dein Videobild für andere aussieht.</div>
                      </div>
                      <button
                        type="button"
                        onClick={handleToggleCameraTest}
                        className={`px-4 py-2 rounded-lg text-xs font-black transition shadow-md cursor-pointer ${
                          cameraTestActive
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 shadow-amber-500/20'
                        }`}
                      >
                        {cameraTestActive ? 'Vorschau beenden' : 'Video testen'}
                      </button>
                    </div>

                    {/* Preview Screen */}
                    <div className="relative w-full aspect-video max-h-72 bg-neutral-950 rounded-2xl overflow-hidden border border-amber-500/30 flex items-center justify-center shadow-inner">
                      {cameraTestActive ? (
                        <>
                          <video
                            ref={videoPreviewRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                          />
                          {/* Live Overlay Badges */}
                          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-200 flex items-center gap-1.5 border border-amber-500/30">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>CANLI • 1080p 30FPS</span>
                          </div>

                          {virtualBg !== 'none' && (
                            <div className="absolute bottom-3 right-3 bg-[#0c0c10]/90 border border-amber-500/30 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-amber-200">
                              Hintergrundfilter: {virtualBg}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 text-amber-300/60">
                          <Video className="w-12 h-12 mb-2 text-amber-400/40" />
                          <div className="text-xs font-bold text-amber-200">Kameratest nicht gestartet</div>
                          <div className="text-[11px] max-w-xs mt-1">
                            Klicke auf „Video testen“, um die Vorschau zu starten.
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Virtual Background Selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
                          VIRTUELLER KAMERAHINTERGRUND
                        </span>
                        <button
                          type="button"
                          onClick={() => bgFileInputRef.current?.click()}
                          className="text-[11px] text-amber-400 hover:underline font-bold cursor-pointer"
                        >
                          + Eigenen Hintergrund hinzufügen
                        </button>
                        <input
                          type="file"
                          ref={bgFileInputRef}
                          onChange={handleCustomBgUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                        {[
                          { id: 'none', label: 'Keine', color: 'bg-neutral-800' },
                          { id: 'blur', label: 'Verschwommen', color: 'bg-neutral-600 backdrop-blur' },
                          { id: 'bg_blue', label: 'DilSed Altın', color: 'bg-gradient-to-tr from-amber-600 to-amber-400' },
                          { id: 'bg_cyber', label: 'Obsidian Glow', color: 'bg-gradient-to-tr from-neutral-900 to-amber-900' },
                          { id: 'bg_space', label: 'Weltraum', color: 'bg-gradient-to-tr from-neutral-950 to-neutral-900' },
                          { id: 'bg_library', label: 'Bibliothek', color: 'bg-amber-950' },
                        ].map((bg) => (
                          <div
                            key={bg.id}
                            onClick={() => setVirtualBg(bg.id)}
                            className={`p-2 rounded-xl border text-center cursor-pointer transition flex flex-col items-center gap-1.5 ${
                              virtualBg === bg.id
                                ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                                : 'border-amber-500/20 bg-[#070709] hover:bg-[#121218]'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg ${bg.color} border border-amber-500/30`} />
                            <span className="text-[10px] font-bold text-amber-200 truncate max-w-full">
                              {bg.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {customBgUrl && (
                        <div className="mt-2 p-2 bg-[#070709] rounded-xl border border-amber-500/30 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Eigener Hintergrund geladen
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setCustomBgUrl('');
                              setVirtualBg('none');
                            }}
                            className="text-[11px] text-red-400 hover:underline cursor-pointer"
                          >
                            Entfernen
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Camera Hardware Acceleration */}
                    <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-amber-100">Hardwarebeschleunigung für Videoverarbeitung</div>
                        <div className="text-[11px] text-amber-300/70">Verarbeitet das Kamerabild auf der GPU, um die CPU-Last zu minimieren.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={hardwareCameraAcceleration}
                        onChange={(e) => setHardwareCameraAcceleration(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: STREAMING-EINSTELLUNGEN (BILDSCHIRMÜBERTRAGUNG) */}
              {(voiceSubTab === 'all' || voiceSubTab === 'stream') && (
                <div className="space-y-6 pt-4 border-t border-amber-500/20">
                  <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    STREAM- & BILDSCHIRMÜBERTRAGUNGSEINSTELLUNGEN
                  </div>

                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    {/* Stream Quality / Resolution */}
                    <div>
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase block mb-1.5">
                        STREAM-AUFLÖSUNG
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {['720p', '1080p', '1440p', 'source'].map((res) => (
                          <button
                            key={res}
                            type="button"
                            onClick={() => setStreamResolution(res)}
                            className={`py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                              streamResolution === res
                                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                                : 'bg-[#070709] text-amber-200/60 border-amber-500/20 hover:text-amber-200 hover:border-amber-500/40'
                            }`}
                          >
                            {res === 'source' ? 'Quelle (Original)' : res}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stream FPS */}
                    <div>
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase block mb-1.5">
                        BILDRATE (FPS)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {['15', '30', '60'].map((fps) => (
                          <button
                            key={fps}
                            type="button"
                            onClick={() => setStreamFps(fps)}
                            className={`py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                              streamFps === fps
                                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                                : 'bg-[#070709] text-amber-200/60 border-amber-500/20 hover:text-amber-200 hover:border-amber-500/40'
                            }`}
                          >
                            {fps} FPS
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3 pt-2 border-t border-amber-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-amber-100">Systemsounds in Stream übertragen</div>
                          <div className="text-[11px] text-amber-300/70">Teile Spiel- und Videosounds in bester Qualität mit deinen Zuschauern.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={includeStreamAudio}
                          onChange={(e) => setIncludeStreamAudio(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-amber-100">Hardwarebeschleunigung für Bildschirm-Encoding (GPU)</div>
                          <div className="text-[11px] text-amber-300/70">Verwendet NVIDIA NVENC oder AMD VCE Hardware-Encoder deiner Grafikkarte.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={hardwareAcceleration}
                          onChange={(e) => setHardwareAcceleration(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">OpenH264 Video-Codec verwenden</div>
                          <div className="text-[11px] text-discord-textMuted">Unterstützung für den OpenH264-Codec von Cisco Systems Inc.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={openH264}
                          onChange={(e) => setOpenH264(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-amber-100">Modernster AV1 Video-Encoder</div>
                          <div className="text-[11px] text-amber-300/70">Liefert gestochen scharfe Videoübertragungen bei geringerer Bandbreite.</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={av1Codec}
                          onChange={(e) => setAv1Codec(e.target.checked)}
                          className="w-4 h-4 accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: ERWEITERTE AUDIO-EINSTELLUNGEN */}
              {(voiceSubTab === 'all' || voiceSubTab === 'advanced') && (
                <div className="space-y-6 pt-4 border-t border-amber-500/20">
                  <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    ERWEITERTE SPRACHVERARBEITUNG & NETZWERKEINSTELLUNGEN
                  </div>

                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    {/* Krisp Noise Suppression 3-way radio */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-bold text-amber-200">RAUSCHUNTERDRÜCKUNG (KRISP-TECHNOLOGIE)</span>
                        </div>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">KI-gestützt</span>
                      </div>
                      <p className="text-[11px] text-amber-300/70">
                        Filtert Tastaturgeräusche, Lüfter, Atmung und Raumhall in Echtzeit aus deinem Mikrofon.
                      </p>

                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {[
                          { id: 'krisp', label: 'Krisp (Erweiterte KI)', desc: 'Volle Raum-Isolation' },
                          { id: 'standard', label: 'Standard-Filter', desc: 'Klassisches Noise Gate' },
                          { id: 'none', label: 'Aus', desc: 'Unbearbeitetes Audiosignal' },
                        ].map((k) => (
                          <div
                            key={k.id}
                            onClick={() => setKrispMode(k.id)}
                            className={`p-3 rounded-xl border cursor-pointer transition text-center ${
                              krispMode === k.id
                                ? 'border-amber-400 bg-amber-500/15 text-amber-100 shadow-md ring-1 ring-amber-400'
                                : 'border-amber-500/20 bg-[#070709] text-amber-300/60 hover:text-amber-200 hover:border-amber-500/40'
                            }`}
                          >
                            <div className="text-xs font-bold text-amber-100">{k.label}</div>
                            <div className="text-[10px] text-amber-300/60 mt-0.5">{k.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Echo Cancellation */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                      <div>
                        <div className="text-xs font-bold text-amber-100">Echounterdrückung (Echo Cancellation)</div>
                        <div className="text-[11px] text-amber-300/70">Verhindert Rückkopplungen von deinen Lautsprechern in das Mikrofon.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={echoCancellation}
                        onChange={(e) => setEchoCancellation(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Auto Gain Control */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                      <div>
                        <div className="text-xs font-bold text-amber-100">Automatische Verstärkungsregelung (AGC)</div>
                        <div className="text-[11px] text-amber-300/70">Hebt leises Flüstern an und dämpft plötzliche laute Töne automatisch ab.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoGainControl}
                        onChange={(e) => setAutoGainControl(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Advanced Voice Processing */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                      <div>
                        <div className="text-xs font-bold text-amber-100">Erweiterte Sprachverarbeitung</div>
                        <div className="text-[11px] text-amber-300/70">Aktiviert Klangverbesserungsfilter für kristallklare Sprachwiedergabe.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={advancedVoiceProcessing}
                        onChange={(e) => setAdvancedVoiceProcessing(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Dämpfung (Attenuation) */}
                    <div className="pt-3 border-t border-amber-500/20 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-amber-400 uppercase text-[10px]">DÄMPFUNG (ATTENUATION)</span>
                        <span className="text-amber-200 font-bold">%{attenuationPercent}</span>
                      </div>
                      <p className="text-[11px] text-amber-300/70">
                        Verringert automatisch die Lautstärke anderer Programme (Spiele, Musik), wenn jemand spricht.
                      </p>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={attenuationPercent}
                        onChange={(e) => setAttenuationPercent(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />

                      <div className="space-y-2 pt-2 text-xs text-amber-100">
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-xs">Lautstärke anderer Programme senken, wenn andere sprechen</span>
                          <input
                            type="checkbox"
                            checked={attenuateOthers}
                            onChange={(e) => setAttenuateOthers(e.target.checked)}
                            className="w-4 h-4 accent-amber-500 cursor-pointer"
                          />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-xs">Lautstärke anderer Programme senken, wenn ich spreche</span>
                          <input
                            type="checkbox"
                            checked={attenuateSelf}
                            onChange={(e) => setAttenuateSelf(e.target.checked)}
                            className="w-4 h-4 accent-amber-500 cursor-pointer"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Audio Subsystem */}
                    <div className="pt-3 border-t border-amber-500/20 space-y-2">
                      <label className="text-[10px] font-extrabold text-amber-400 uppercase block">
                        AUDIO-SUBSYSTEM
                      </label>
                      <select
                        value={audioSubsystem}
                        onChange={(e) => setAudioSubsystem(e.target.value)}
                        className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
                      >
                        <option value="standard">Standard (Neueste & stabile WebAudio-Engine)</option>
                        <option value="legacy">Legacy (Vollständige Kompatibilität für ältere Soundkarten)</option>
                        <option value="experimental">Experimentell (Ultra-niedrige Latenz-Engine)</option>
                      </select>
                    </div>

                    {/* QoS High Priority */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                      <div>
                        <div className="text-xs font-bold text-amber-100">Dienstgüte (QoS) – Hohe Paketpriorität</div>
                        <div className="text-[11px] text-amber-300/70">Signalisiert deinem Router, DilSed-Sprachpakete mit höchster Priorität zu übertragen.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={qosPriority}
                        onChange={(e) => setQosPriority(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    {/* Diagnostic Audio */}
                    <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                      <div>
                        <div className="text-xs font-bold text-amber-100">Diagnose-Audioaufzeichnung</div>
                        <div className="text-[11px] text-amber-300/70">Speichert lokale Protokolle zur Analyse von Audio- und Verbindungsproblemen.</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={diagnosticAudio}
                        onChange={(e) => setDiagnosticAudio(e.target.checked)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Reset Voice Settings Button */}
                  <div className="pt-2 flex justify-start">
                    <button
                      type="button"
                      onClick={handleResetVoiceSettings}
                      className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Sprach- und Videoeinstellungen auf Standard zurücksetzen</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION 6: TÖNE & BENACHRICHTIGUNGEN (SOUNDBOARD & EFFEKTE) */}
              {(voiceSubTab === 'all' || voiceSubTab === 'sounds') && (
                <div className="space-y-6 pt-4 border-t border-amber-500/20">
                  <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    AUDIO-EVENTS & BENACHRICHTIGUNGSTÖNE
                  </div>

                  {/* Soundboard Volume */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-extrabold text-amber-400 uppercase text-[10px]">SOUNDBOARD-LAUTSTÄRKE</span>
                      <span className="text-amber-200 font-bold">%{soundboardVolume}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={soundboardVolume}
                      onChange={(e) => setSoundboardVolume(parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Audio Cue Preview Buttons */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                    <div className="text-xs font-bold text-amber-200 mb-1">DILSED BENACHRICHTIGUNGS- & SOUNDTEST</div>
                    <p className="text-[11px] text-amber-300/70 mb-3">
                      Klicke auf die Schaltflächen, um die Soundeffekte live anzuhören.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => playJoinVoiceSound()}
                        className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <span>Kanal beigetreten</span>
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110" />
                      </button>

                      <button
                        type="button"
                        onClick={() => playLeaveVoiceSound()}
                        className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <span>Kanal verlassen</span>
                        <Volume2 className="w-3.5 h-3.5 text-red-400 group-hover:scale-110" />
                      </button>

                      <button
                        type="button"
                        onClick={() => playMuteSound(true)}
                        className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <span>Stummgeschaltet</span>
                        <MicOff className="w-3.5 h-3.5 text-red-400 group-hover:scale-110" />
                      </button>

                      <button
                        type="button"
                        onClick={() => playMuteSound(false)}
                        className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <span>Stummschaltung aufgehoben</span>
                        <Mic className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110" />
                      </button>

                      <button
                        type="button"
                        onClick={() => playMessagePingSound()}
                        className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <span>Nachrichtenton</span>
                        <Bell className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110" />
                      </button>

                      <button
                        type="button"
                        onClick={() => playAirhornSound()}
                        className="p-2.5 rounded-xl bg-[#070709] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-100 transition flex items-center justify-between group cursor-pointer"
                      >
                        <span>Soundboard (Lufthorn)</span>
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 6. GÖRÜNÜM ==================== */}
          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">Erscheinungsbild</h2>
              <p className="text-xs text-amber-300/70 mb-6">Passe das Erscheinungsbild der DilSed-Oberfläche an deine persönlichen Vorlieben an.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'dark', label: 'Dunkel (Obsidian)' },
                    { id: 'midnight', label: 'Mitternachtsgold' },
                    { id: 'light', label: 'Klassisch' },
                  ].map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id)}
                      className={`p-4 rounded-xl border text-center cursor-pointer transition ${
                        selectedTheme === t.id
                          ? 'border-amber-400 bg-amber-500/15 text-amber-200 font-black shadow-md shadow-amber-500/15 ring-1 ring-amber-400'
                          : 'border-amber-500/20 bg-[#0c0c10] text-amber-300/60 hover:text-amber-200 hover:border-amber-500/40'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wider font-extrabold">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== 7. BARRIEREFREIHEIT ==================== */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
                  <Eye className="w-6 h-6 text-amber-400" />
                  <span>Barrierefreiheit</span>
                </h2>
                <p className="text-xs text-amber-300/70">
                  Passe DilSed an deine individuellen Seh-, Farb-, Bewegungs- und Screenreader-Bedürfnisse an.
                </p>
              </div>

              {/* Schnellauswahl-Unterkategorien */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-amber-500/20">
                {[
                  { id: 'all', label: 'Alle' },
                  { id: 'text', label: 'Text & Lesbarkeit' },
                  { id: 'density', label: 'Visuelle Dichte' },
                  { id: 'roles', label: 'Anzeigenamen-Stile' },
                  { id: 'color', label: 'Farbe & Kontrast' },
                  { id: 'motion', label: 'Reduzierte Bewegung' },
                  { id: 'tts', label: 'Sprachausgabe & Screenreader' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setAccessSubTab(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      accessSubTab === st.id
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                        : 'bg-[#0e0e13] text-amber-200/70 border border-amber-500/20 hover:bg-amber-400/10 hover:text-amber-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* ==================== LIVE-CHAT-VORSCHAU ==================== */}
              <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>Live-Chat-Vorschau für Barrierefreiheit</span>
                  </span>
                  <span className="text-[11px] text-amber-300/60 font-mono">
                    {fontSize}px · {messageDisplay === 'cozy' ? 'Gemütlich' : 'Kompakt'} · Abstand: {messageSpacing}px
                  </span>
                </div>

                <div
                  style={{
                    filter: `grayscale(${100 - saturation}%)`,
                  }}
                  className={`rounded-xl p-4 bg-[#070709] transition-all ${
                    highContrast
                      ? 'border-2 border-amber-400 ring-2 ring-amber-400/30 contrast-125'
                      : 'border border-amber-500/20'
                  }`}
                >
                  {/* Mesaj 1 */}
                  {messageDisplay === 'cozy' ? (
                    <div className="flex items-start gap-3 select-text" style={{ fontSize: `${fontSize}px` }}>
                      <img
                        src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-amber-500/30"
                      />
                      <div className="min-w-0 flex-1 leading-snug">
                        <div className="flex items-center gap-2 mb-1">
                          {/* Görünen Ad & Rol Rengi Stili */}
                          <span
                            className={`font-bold transition-colors flex items-center gap-1 ${
                              roleColorStyle === 'name'
                                ? desaturateRoleColors
                                  ? 'text-amber-300'
                                  : 'text-amber-400'
                                : 'text-amber-100'
                            }`}
                          >
                            {roleColorStyle === 'dot' && (
                              <span
                                className={`w-2 h-2 rounded-full inline-block ${
                                  desaturateRoleColors ? 'bg-amber-300' : 'bg-amber-400'
                                }`}
                              />
                            )}
                            {currentUser?.displayName || 'Benutzer'}
                          </span>
                          {showProfileBadges && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 font-bold uppercase tracking-wider border border-amber-500/30">
                              Administrator
                            </span>
                          )}
                          <span className="text-[11px] text-amber-300/60 font-normal">
                            Heute um 14:45
                          </span>
                        </div>
                        <p className="text-amber-100/90 leading-relaxed">
                          Willkommen im DilSed-Barrierefreiheitslabor! Schriftgröße, Zeilenabstände und Farbsättigung können hier direkt getestet werden.
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Kompakt Mod */
                    <div className="flex items-baseline gap-2 select-text font-mono" style={{ fontSize: `${fontSize}px` }}>
                      <span className="text-[11px] text-amber-300/60 flex-shrink-0">
                        14:45
                      </span>
                      <span
                        className={`font-bold flex items-center gap-1 flex-shrink-0 ${
                          roleColorStyle === 'name'
                            ? desaturateRoleColors
                              ? 'text-amber-300'
                              : 'text-amber-400'
                            : 'text-amber-100'
                        }`}
                      >
                        {roleColorStyle === 'dot' && (
                          <span
                            className={`w-2 h-2 rounded-full inline-block ${
                              desaturateRoleColors ? 'bg-amber-300' : 'bg-amber-400'
                            }`}
                          />
                        )}
                        {currentUser?.displayName || 'Benutzer'}:
                      </span>
                      <span className="text-amber-100/90 font-sans">
                        Kompakter DilSed-Modus aktiv. Einzeilige Darstellung im IRC-Stil mit ausgeblendeten Avataren.
                      </span>
                    </div>
                  )}

                  {/* Nachricht 2 (mit Abstand zwischen Nachrichtengruppen) */}
                  <div
                    style={{
                      marginTop: `${messageSpacing}px`,
                      fontSize: `${fontSize}px`,
                    }}
                    className={
                      messageDisplay === 'cozy'
                        ? 'flex items-start gap-3 select-text pt-1'
                        : 'flex items-baseline gap-2 select-text font-mono'
                    }
                  >
                    {messageDisplay === 'cozy' ? (
                      <>
                        <div className="w-10 flex-shrink-0" />
                        <div className="min-w-0 flex-1 leading-snug">
                          <p className="text-amber-100/90">
                            Weitere Informationen findest du auf unserer{' '}
                            <span
                              className={`cursor-pointer transition ${
                                underlineLinks
                                  ? 'underline font-semibold text-amber-300'
                                  : 'text-amber-400 hover:underline'
                              }`}
                            >
                              https://dilsed.com/accessibility
                            </span>{' '}
                            Hilfeseite.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-[11px] text-amber-300/60 flex-shrink-0">
                          14:46
                        </span>
                        <span className="font-bold text-amber-100 flex-shrink-0">
                          {currentUser?.displayName || 'Benutzer'}:
                        </span>
                        <span className="text-amber-100/90 font-sans">
                          Link-Unterstützung:{' '}
                          <span
                            className={`cursor-pointer ${
                              underlineLinks
                                ? 'underline font-semibold text-amber-300'
                                : 'text-amber-400 hover:underline'
                            }`}
                          >
                            https://dilsed.com/accessibility
                          </span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ==================== 1. TEXT & LESBARKEIT ==================== */}
              {(accessSubTab === 'all' || accessSubTab === 'text') && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                    Text und Lesbarkeit
                  </h3>

                  {/* Schriftgröße-Schieberegler */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Chat-Schriftgröße</div>
                        <div className="text-xs text-amber-300/70">
                          Bestimmt die Schriftgröße für Nachrichten und Überschriften im Chat.
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-[#070709] border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
                        {fontSize}px {fontSize === 16 && '(Standard)'}
                      </span>
                    </div>

                    <div className="pt-2">
                      <input
                        type="range"
                        min="12"
                        max="24"
                        step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-amber-300/60 font-mono mt-1">
                        <span>12px</span>
                        <span>14px</span>
                        <span className="text-amber-400 font-bold">16px (Standard)</span>
                        <span>18px</span>
                        <span>20px</span>
                        <span>24px</span>
                      </div>
                    </div>

                    {fontSize !== 16 && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => setFontSize(16)}
                          className="text-xs text-amber-400 hover:text-amber-200 flex items-center gap-1 transition font-bold cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Auf Standardgröße zurücksetzen (16px)</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Abstand zwischen Nachrichtengruppen */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Abstand zwischen Nachrichtengruppen</div>
                        <div className="text-xs text-amber-300/70">
                          Regelt den vertikalen Abstand zwischen Nachrichten verschiedener Nutzer oder Zeitblöcke.
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-[#070709] border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
                        {messageSpacing}px {messageSpacing === 16 && '(Standard)'}
                      </span>
                    </div>

                    <div className="pt-2">
                      <input
                        type="range"
                        min="0"
                        max="24"
                        step="4"
                        value={messageSpacing}
                        onChange={(e) => setMessageSpacing(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-amber-300/60 font-mono mt-1">
                        <span>0px (Kompakt)</span>
                        <span>4px</span>
                        <span>8px</span>
                        <span className="text-amber-400 font-bold">16px</span>
                        <span>24px (Weit)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 2. VISUELLE DICHTE ==================== */}
              {(accessSubTab === 'all' || accessSubTab === 'density') && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                    Visuelle Dichte (Nachrichtenansicht)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Rahat (Cozy) */}
                    <div
                      onClick={() => setMessageDisplay('cozy')}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        messageDisplay === 'cozy'
                          ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                          : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-amber-100">Gemütlich (Cozy)</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              messageDisplay === 'cozy' ? 'border-amber-400 bg-amber-400' : 'border-amber-500/30'
                            }`}
                          >
                            {messageDisplay === 'cozy' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                          </div>
                        </div>
                        <p className="text-xs text-amber-300/70 leading-relaxed">
                          Moderne und großzügige Ansicht. Große Avatare, klare Zeilenabstände und lesefreundliche Nachrichten.
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-400/30 border border-amber-500/40" />
                        <div className="h-2 w-24 bg-amber-500/20 rounded" />
                      </div>
                    </div>

                    {/* Kompakt (Compact) */}
                    <div
                      onClick={() => setMessageDisplay('compact')}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        messageDisplay === 'compact'
                          ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                          : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-amber-100">Kompakt (Compact)</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              messageDisplay === 'compact' ? 'border-amber-400 bg-amber-400' : 'border-amber-500/30'
                            }`}
                          >
                            {messageDisplay === 'compact' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                          </div>
                        </div>
                        <p className="text-xs text-amber-300/70 leading-relaxed">
                          Klassischer IRC-Stil. Avatare werden ausgeblendet, Zeit und Name stehen in einer Zeile. Mehr Text auf einen Blick.
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center gap-2">
                        <div className="h-2 w-8 bg-amber-500/20 rounded" />
                        <div className="h-2 w-28 bg-amber-500/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 3. ANZEIGENAMEN-STILE ==================== */}
              {(accessSubTab === 'all' || accessSubTab === 'roles') && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                    Anzeigenamen & Rollenfarben
                  </h3>

                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div>
                      <div className="text-sm font-bold text-amber-100 mb-1">Rollenfarben anzeigen</div>
                      <div className="text-xs text-amber-300/70 mb-3">
                        Wähle, wie Benutzernamen mit ihren jeweiligen Server-Rollenfarben hervorgehoben werden.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'name', label: 'Im Anzeigenamen anzeigen', desc: 'Name leuchtet direkt in Rollenfarbe' },
                          { id: 'dot', label: 'Als Punkt anzeigen', desc: 'Farbiger Punkt neben dem Namen' },
                          { id: 'none', label: 'Rollenfarben ausblenden', desc: 'Standardmäßige Textfarbe' },
                        ].map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => setRoleColorStyle(opt.id)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                              roleColorStyle === opt.id
                                ? 'bg-amber-500/15 border-amber-400 text-amber-100 ring-1 ring-amber-400 font-bold shadow-md'
                                : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:border-amber-500/40 hover:text-amber-200'
                            }`}
                          >
                            <span className="text-xs font-bold text-amber-200 mb-1">{opt.label}</span>
                            <span className="text-[10px] text-amber-300/60">{opt.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Profil-Abzeichen und Avatar-Rahmen anzeigen */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Profilabzeichen und Avatar-Dekorationen anzeigen</div>
                        <div className="text-xs text-amber-300/70">
                          Zeigt Avatar-Dekorationen, Kronen und Profil-Badges im Chat an.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowProfileBadges(!showProfileBadges)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          showProfileBadges ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${showProfileBadges ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            showProfileBadges ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 4. FARBE & KONTRAST ==================== */}
              {(accessSubTab === 'all' || accessSubTab === 'color') && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                    Farbe und Kontrast
                  </h3>

                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    {/* Hoher Kontrast Modus */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Hoher Kontrast (High Contrast)</div>
                        <div className="text-xs text-amber-300/70">
                          Verstärkt den Kontrast zwischen Texten, Schaltflächen und Rändern für bessere Lesbarkeit.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHighContrast(!highContrast)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          highContrast ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${highContrast ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            highContrast ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Sättigungsregler */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-amber-100">Farbsättigung (Saturation)</div>
                          <div className="text-xs text-amber-300/70">
                            Passe die Intensität aller Farben an (0% Graustufen / Schwarz-Weiß, 100% volle Farbe).
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-[#070709] border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
                          %{saturation}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={saturation}
                        onChange={(e) => setSaturation(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-amber-300/60 font-mono">
                        <span>0% (Schwarz-Weiß)</span>
                        <span>%50</span>
                        <span className="text-amber-400 font-bold">100% (Volle Sättigung)</span>
                      </div>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Links unterstreichen */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Links immer unterstreichen</div>
                        <div className="text-xs text-amber-300/70">
                          Hebt Weblinks im Text dauerhaft durch eine Unterstreichung hervor.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUnderlineLinks(!underlineLinks)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          underlineLinks ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${underlineLinks ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            underlineLinks ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Rollenfarben-Sättigung reduzieren */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Rollenfarben-Sättigung reduzieren</div>
                        <div className="text-xs text-amber-300/70">
                          Wandelt grelle Neon-Namen in sanftere, augenschonende Pastelltöne um.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDesaturateRoleColors(!desaturateRoleColors)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          desaturateRoleColors ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${desaturateRoleColors ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            desaturateRoleColors ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 5. REDUZIERTE BEWEGUNG ==================== */}
              {(accessSubTab === 'all' || accessSubTab === 'motion') && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                    Reduzierte Bewegung (Reduced Motion)
                  </h3>

                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    <div>
                      <div className="text-sm font-bold text-amber-100 mb-1">Modus für reduzierte Bewegung</div>
                      <div className="text-xs text-amber-300/70 mb-3">
                        Schränkt Animationen bei Übergängen, Dialogen und Bildläufen ein.
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: 'system', label: 'Mit System synchronisieren', desc: 'Verwendet die Systemeinstellung' },
                          { id: 'enabled', label: 'Aktivieren', desc: 'Stoppt Animationen und Bewegungen' },
                          { id: 'disabled', label: 'Deaktivieren', desc: 'Alle Animationen und Bewegungen aktiv' },
                        ].map((m) => (
                          <div
                            key={m.id}
                            onClick={() => setReducedMotionMode(m.id)}
                            className={`p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                              reducedMotionMode === m.id
                                ? 'bg-amber-500/15 border-amber-400 text-amber-100 ring-1 ring-amber-400 font-bold shadow-md'
                                : 'bg-[#070709] border-amber-500/20 text-amber-300/60 hover:border-amber-500/40 hover:text-amber-200'
                            }`}
                          >
                            <span className="text-xs font-bold text-amber-200 mb-1">{m.label}</span>
                            <span className="text-[10px] text-amber-300/60">{m.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Otomatik GIF Oynatma */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">GIFs und Sticker automatisch abspielen</div>
                        <div className="text-xs text-amber-300/70">
                          Spielt animierte GIFs und Sticker automatisch ab. Wenn deaktiviert, nur beim Daraufzeigen mit der Maus.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAutoplayGifs(!autoplayGifs)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          autoplayGifs ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${autoplayGifs ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            autoplayGifs ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Animasyonlu Emojileri Oynat */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Animierte Emojis abspielen</div>
                        <div className="text-xs text-amber-300/70">
                          Animiert dynamische Emojis automatisch im Chat.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAnimateEmojis(!animateEmojis)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          animateEmojis ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${animateEmojis ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            animateEmojis ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 6. SES VE EKRAN OKUYUCUSU ==================== */}
              {(accessSubTab === 'all' || accessSubTab === 'tts') && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                    Screenreader & Sprachausgabe (TTS)
                  </h3>

                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                    {/* Screenreader-Unterstützung */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Screenreader-Unterstützung</div>
                        <div className="text-xs text-amber-300/70">
                          Optimiert ARIA-Labels und Sprachansagen für NVDA, JAWS und Windows-Sprachausgabe.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setScreenReaderSupport(!screenReaderSupport)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          screenReaderSupport ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${screenReaderSupport ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            screenReaderSupport ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Metin Okuma (TTS) */}
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <div>
                          <div className="text-sm font-bold text-amber-100">Text-in-Sprache (Text-to-Speech / TTS)</div>
                          <div className="text-xs text-amber-300/70">
                            Lässt Nachrichten mit dem /tts-Befehl und Benachrichtigungen akustisch vorlesen.
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEnableTts(!enableTts)}
                          className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                            enableTts ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full ${enableTts ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                              enableTts ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {enableTts && (
                        <div className="p-3.5 bg-[#070709] rounded-xl border border-amber-500/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-100">TTS-Vorlesegeschwindigkeit</span>
                            <div className="flex items-center gap-1.5">
                              {[
                                { rate: 0.75, label: '0.75x' },
                                { rate: 1.0, label: '1.0x (Normal)' },
                                { rate: 1.25, label: '1.25x' },
                                { rate: 1.5, label: '1.5x' },
                              ].map((sp) => (
                                <button
                                  key={sp.rate}
                                  type="button"
                                  onClick={() => setTtsSpeed(sp.rate)}
                                  className={`px-2 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                                    ttsSpeed === sp.rate
                                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-black shadow'
                                      : 'bg-[#121218] text-amber-200/60 border border-amber-500/20 hover:text-amber-200'
                                  }`}
                                >
                                  {sp.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => handleTestTts()}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md ${
                                isSpeakingTts
                                  ? 'bg-emerald-600 text-white animate-pulse'
                                  : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 shadow-amber-500/20'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>{isSpeakingTts ? 'Wird vorgelesen...' : 'TTS live testen'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="h-[1px] bg-amber-500/20" />

                    {/* Barrierefreiheits-Audiohinweise */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-bold text-amber-100">Barrierefreiheits-Signaltöne (Audio Cues)</div>
                        <div className="text-xs text-amber-300/70">
                          Spielt dezente akustische Töne bei Navigation oder Fokuswechsel ab.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAudioCues(!audioCues)}
                        className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                          audioCues ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full ${audioCues ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                            audioCues ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Auf Standard zurücksetzen */}
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={handleResetAccessibility}
                  className="px-3.5 py-2 rounded-xl bg-[#0c0c10] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-400 hover:text-amber-200 transition flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Alle Barrierefreiheits-Einstellungen zurücksetzen</span>
                </button>
              </div>
            </div>
          )}

          {/* ==================== 8. SYSTEM (WINDOWS-EINSTELLUNGEN) ==================== */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
                  <Monitor className="w-6 h-6 text-amber-400" />
                  <span>Windows- & Systemeinstellungen</span>
                </h2>
                <p className="text-xs text-amber-300/70">
                  Konfiguriere, wie DilSed beim Systemstart, im Infobereich (Tray) und im Hintergrund arbeitet.
                </p>
              </div>

              {/* 1. SYSTEMSTART-VERHALTEN */}
              <div>
                <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2.5">
                  Systemstart-Verhalten
                </h3>
                <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                  {/* DilSed beim Systemstart automatisch öffnen */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-amber-100">DilSed beim Windows-Start öffnen</div>
                      <div className="text-xs text-amber-300/70 leading-relaxed">
                        Startet DilSed automatisch beim Hochfahren deines PCs, damit du sofort mit deinen Freunden verbunden bist.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStartOnBoot(!startOnBoot)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                        startOnBoot ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${startOnBoot ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                          startOnBoot ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="h-[1px] bg-amber-500/20" />

                  {/* Minimiert starten */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-amber-100">Minimiert starten</div>
                      <div className="text-xs text-amber-300/70 leading-relaxed">
                        Startet DilSed unaufdringlich im System-Tray, ohne das Hauptfenster in den Vordergrund zu holen.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStartMinimized(!startMinimized)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                        startMinimized ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${startMinimized ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                          startMinimized ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. VERHALTEN BEIM SCHLIESSEN */}
              <div>
                <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2.5">
                  Fenster-Schließverhalten
                </h3>
                <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-amber-100">In den Infobereich (Tray) minimieren</div>
                      <div className="text-xs text-amber-300/70 leading-relaxed">
                        Beim Klick auf das Schließen-Kreuz (X) bleibt DilSed im Hintergrund aktiv und empfängt weiterhin Benachrichtigungen.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMinimizeToTray(!minimizeToTray)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                        minimizeToTray ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${minimizeToTray ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                          minimizeToTray ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. DONANIM VE PERFORMANS */}
              <div>
                <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2.5">
                  Hardware & Erweitertes System
                </h3>
                <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-amber-100">Hardwarebeschleunigung (GPU)</div>
                      <div className="text-xs text-amber-300/70 leading-relaxed">
                        Nutzt deine Grafikkarte für flüssigere Animationen und schnellere Reaktionszeiten.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGpuAcceleration(!gpuAcceleration)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                        gpuAcceleration ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${gpuAcceleration ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                          gpuAcceleration ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="h-[1px] bg-amber-500/20" />

                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-amber-100">Automatische Updates im Hintergrund</div>
                      <div className="text-xs text-amber-300/70 leading-relaxed">
                        Lädt die neuesten DilSed-Updates leise herunter und wendet sie beim Neustart an.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAutoUpdate(!autoUpdate)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                        autoUpdate ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${autoUpdate ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                          autoUpdate ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="h-[1px] bg-amber-500/20" />

                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-amber-100">Entwicklermodus</div>
                      <div className="text-xs text-amber-300/70 leading-relaxed">
                        Ermöglicht das schnelle Kopieren von Benutzer-, Kanal- und Server-IDs per Rechtsklick.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDevMode(!devMode)}
                      className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 flex-shrink-0 cursor-pointer ${
                        devMode ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/30' : 'bg-[#070709] border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${devMode ? 'bg-neutral-950' : 'bg-neutral-400'} transition-transform duration-200 shadow-md ${
                          devMode ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. SYSTEM-TASTENBELEGUNGEN & SHORTCUTS */}
              <div className="pt-2">
                {renderKeybindsSection(true)}
              </div>
            </div>
          )}

          {/* ==================== TASTENBELEGUNGEN REGISTERKARTE ==================== */}
          {activeTab === 'keybinds' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
                  <Keyboard className="w-6 h-6 text-amber-400" />
                  <span>Tastenbelegungen</span>
                </h2>
                <p className="text-xs text-amber-300/70">
                  Passe alle deine Tastenkürzel an einem zentralen Ort an, speichere und verwalte sie.
                </p>
              </div>

              {renderKeybindsSection(false)}
            </div>
          )}

          {/* ==================== 9. SPRACHE & ZEIT ==================== */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
                  <Globe className="w-6 h-6 text-amber-400" />
                  <span>Sprache & Zeit</span>
                </h2>
                <p className="text-xs text-amber-300/70">
                  Passe die Oberflächensprache, das Zeitformat (12/24 Std.) und regionale Einstellungen an.
                </p>
              </div>

              {/* Schnellauswahl-Unterkategorien */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-amber-500/20">
                {[
                  { id: 'all', label: 'Alle' },
                  { id: 'time', label: 'Zeit- & Datumsformat' },
                  { id: 'language', label: `Sprachauswahl (${DISCORD_LANGUAGES.length} Sprachen)` },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setLangSubTab(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      langSubTab === st.id
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                        : 'bg-[#0e0e13] text-amber-200/70 border border-amber-500/20 hover:bg-amber-400/10 hover:text-amber-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* ==================== 1. ZEIT- & UHRZEITFORMAT ==================== */}
              {(langSubTab === 'all' || langSubTab === 'time') && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Zeit- & Datumsformat</span>
                    </h3>
                    <p className="text-xs text-amber-300/70">
                      Wähle, wie Uhrzeiten in Chatnachrichten, Profilen und Events dargestellt werden.
                    </p>
                  </div>

                  {/* 3er-Auswahlkarten (Automatisch / 12 Stunden / 24 Stunden) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Otomatik */}
                    <div
                      onClick={() => setTimeFormat('auto')}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        timeFormat === 'auto'
                          ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                          : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-amber-100">Automatisch</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              timeFormat === 'auto'
                                ? 'border-amber-400 bg-amber-400'
                                : 'border-amber-500/30'
                            }`}
                          >
                            {timeFormat === 'auto' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                          </div>
                        </div>
                        <p className="text-xs text-amber-300/70 leading-relaxed mb-3">
                          Verwendet das Standardformat der gewählten Sprache und deines Betriebssystems.
                        </p>
                      </div>
                      <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
                        <span className="text-amber-300/70">Aktuelle Uhrzeit:</span>
                        <span className="font-mono font-bold text-amber-400">
                          {getFormattedTimePreview('auto')}
                        </span>
                      </div>
                    </div>

                    {/* 12-Stunden-Format */}
                    <div
                      onClick={() => setTimeFormat('12h')}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        timeFormat === '12h'
                          ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                          : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-amber-100">12-Stunden-Format</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              timeFormat === '12h'
                                ? 'border-amber-400 bg-amber-400'
                                : 'border-amber-500/30'
                            }`}
                          >
                            {timeFormat === '12h' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                          </div>
                        </div>
                        <p className="text-xs text-amber-300/70 leading-relaxed mb-3">
                          Zeigt Uhrzeiten im AM/PM-Format an (z. B. 02:45 PM).
                        </p>
                      </div>
                      <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
                        <span className="text-amber-300/70">Aktuelle Uhrzeit:</span>
                        <span className="font-mono font-bold text-amber-400">
                          {getFormattedTimePreview('12h')}
                        </span>
                      </div>
                    </div>

                    {/* 24-Stunden-Format */}
                    <div
                      onClick={() => setTimeFormat('24h')}
                      className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                        timeFormat === '24h'
                          ? 'bg-amber-500/15 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                          : 'bg-[#0c0c10] border-amber-500/20 hover:border-amber-500/40'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-amber-100">24-Stunden-Format</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              timeFormat === '24h'
                                ? 'border-amber-400 bg-amber-400'
                                : 'border-amber-500/30'
                            }`}
                          >
                            {timeFormat === '24h' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950" />}
                          </div>
                        </div>
                        <p className="text-xs text-amber-300/70 leading-relaxed mb-3">
                          Zeigt Uhrzeiten standardmäßig im 24-Stunden-Format an (z. B. 14:45).
                        </p>
                      </div>
                      <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px]">
                        <span className="text-amber-300/70">Aktuelle Uhrzeit:</span>
                        <span className="font-mono font-bold text-amber-400">
                          {getFormattedTimePreview('24h')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Live-Chat-Nachrichten-Vorschaukarte */}
                  <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-2.5">
                      Live-Vorschau des Chat-Zeitstempels
                    </span>
                    <div className="flex items-start gap-3 p-3 bg-[#070709] rounded-lg border border-amber-500/20">
                      <img
                        src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-amber-500/30"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-bold text-amber-100 text-sm">
                            {currentUser?.displayName || 'Benutzer'}
                          </span>
                          <span className="text-[11px] text-amber-300/60 font-mono">
                            Heute um {getFormattedTimePreview(timeFormat)}
                          </span>
                        </div>
                        <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                          Viel Spaß auf den Sprach- und Textkanälen von DilSed! Der Zeitstempel aktualisiert sich sofort nach deiner Auswahl.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Zeitzone und erster Tag der Woche */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20">
                      <label className="text-xs font-bold text-amber-200 block mb-1">Zeitzone</label>
                      <p className="text-[11px] text-amber-300/70 mb-2">
                        Zeitzone zur Berechnung von Events und Zeitstempeln.
                      </p>
                      <select
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg px-3 py-2 border border-amber-500/30 outline-none focus:border-amber-400 cursor-pointer font-medium"
                      >
                        <option value="Europe/Istanbul">Europe/Istanbul (UTC+03:00 - Türkei)</option>
                        <option value="UTC">UTC (Koordinierte Weltzeit)</option>
                        <option value="Europe/London">Europe/London (GMT/BST - Großbritannien)</option>
                        <option value="Europe/Berlin">Europe/Berlin (MEZ - Deutschland/Frankreich)</option>
                        <option value="America/New_York">America/New_York (EST/EDT - New York)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PST/PDT - Kalifornien)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST - Japan)</option>
                        <option value="Asia/Dubai">Asia/Dubai (GST - Dubai)</option>
                      </select>
                    </div>

                    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20">
                      <label className="text-xs font-bold text-amber-200 block mb-1">Erster Tag der Woche</label>
                      <p className="text-[11px] text-amber-300/70 mb-2">
                        Beginn der Woche in Kalendern und geplanten Events.
                      </p>
                      <select
                        value={firstDayOfWeek}
                        onChange={(e) => setFirstDayOfWeek(e.target.value)}
                        className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg px-3 py-2 border border-amber-500/30 outline-none focus:border-amber-400 cursor-pointer font-medium"
                      >
                        <option value="auto">Automatisch (Regionaler Standard)</option>
                        <option value="monday">Montag</option>
                        <option value="sunday">Sonntag</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== 2. SPRACHAUSWAHL (ALLE 34 SPRACHEN) ==================== */}
              {(langSubTab === 'all' || langSubTab === 'language') && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                    <div>
                      <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-amber-400" />
                        <span>Sprachauswahl</span>
                      </h3>
                      <p className="text-xs text-amber-300/70">
                        Wähle die Sprache für die DilSed-Oberfläche. Die Änderung wird sofort übernommen.
                      </p>
                    </div>

                    {/* Sprach-Suchleiste */}
                    <div className="relative min-w-[220px]">
                      <Search className="w-3.5 h-3.5 text-amber-400/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={languageSearch}
                        onChange={(e) => setLanguageSearch(e.target.value)}
                        placeholder={`${DISCORD_LANGUAGES.length} Sprachen durchsuchen...`}
                        className="w-full bg-[#070709] text-xs text-amber-100 rounded-lg pl-8 pr-3 py-2 border border-amber-500/30 outline-none focus:border-amber-400 placeholder:text-amber-300/40 font-medium"
                      />
                    </div>
                  </div>

                  {/* Diller Grid'i (34 Dil) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {DISCORD_LANGUAGES.filter(
                      (l) =>
                        l.native.toLowerCase().includes(languageSearch.toLowerCase()) ||
                        l.english.toLowerCase().includes(languageSearch.toLowerCase()) ||
                        l.code.toLowerCase().includes(languageSearch.toLowerCase())
                    ).map((langItem) => {
                      const isSelected = language === langItem.code;
                      return (
                        <div
                          key={langItem.code}
                          onClick={() => {
                            setLanguage(langItem.code);
                            confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
                          }}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400 shadow-md shadow-amber-500/15'
                              : 'bg-[#0c0c10] border-amber-500/20 hover:bg-amber-400/5 hover:border-amber-500/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-xl flex-shrink-0 select-none">{langItem.flag}</span>
                            <div className="min-w-0">
                              <div className={`text-xs font-bold truncate ${isSelected ? 'text-amber-200' : 'text-amber-100'}`}>
                                {langItem.native}
                              </div>
                              <div className="text-[10px] text-amber-300/60 truncate">
                                {langItem.english}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition ${
                              isSelected
                                ? 'border-amber-400 bg-amber-400 text-neutral-950'
                                : 'border-amber-500/30'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Close Button top right */}
        <div className="absolute top-10 right-6 flex flex-col items-center">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-amber-500/40 text-amber-400 hover:border-amber-300 hover:text-amber-200 hover:bg-amber-400/15 flex items-center justify-center transition shadow-md shadow-amber-500/10"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] text-amber-400 font-extrabold mt-1">ESC</span>
        </div>
      </div>
    </div>
  );
}
