export const DEFAULT_KEYBINDS = [
  { id: 'kb_1', action: 'toggle_mute', key: 'CTRL + SHIFT + M' },
  { id: 'kb_2', action: 'toggle_deafen', key: 'CTRL + SHIFT + D' },
  { id: 'kb_3', action: 'ptt', key: 'CAPS LOCK' },
  { id: 'kb_4', action: 'ptm', key: 'CTRL + SHIFT + U' },
  { id: 'kb_5', action: 'toggle_camera', key: 'CTRL + SHIFT + V' },
  { id: 'kb_6', action: 'toggle_screenshare', key: 'CTRL + SHIFT + S' },
  { id: 'kb_7', action: 'play_soundboard', key: 'CTRL + SHIFT + H' },
];

export const KEYBIND_ACTIONS = [
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

export const AVATAR_DECORATIONS = [
  { id: 'none', label: 'Keine', border: 'border-transparent' },
  { id: 'neon_ring', label: 'Neon-Ring', border: 'border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]' },
  { id: 'sakura', label: 'Kirschblüten', border: 'border-pink-400 ring-2 ring-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.8)]' },
  { id: 'fire_flame', label: 'Flammenrahmen', border: 'border-amber-500 ring-2 ring-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]' },
  { id: 'cyber_glitch', label: 'Cyber-Glitch', border: 'border-purple-500 ring-2 ring-indigo-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]' },
];

export const POPULAR_STATUS_EMOJIS = ['⚡', '🎧', '🎮', '💻', '🔥', '✨', '💤', '🍕', '🚀', '🐱'];

export const DISCORD_LANGUAGES = [
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
