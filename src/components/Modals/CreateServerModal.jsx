import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ChevronRight,
  Gamepad2,
  Users,
  GraduationCap,
  Sparkles,
  Upload,
  BookOpen,
  Palette,
  Compass,
  Camera,
  Trash2,
  CheckCircle,
  HelpCircle,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playJoinVoiceSound } from '../../soundEffects';

export default function CreateServerModal({
  isOpen,
  onClose,
  onCreateServer,
  onJoinInvite,
  currentUser
}) {
  const [step, setStep] = useState('templates'); // 'templates' | 'audience' | 'customize' | 'join'
  const [selectedTemplate, setSelectedTemplate] = useState('Meine');
  const [audienceType, setAudienceType] = useState('friends'); // 'friends' | 'community'
  const [serverName, setServerName] = useState('');
  const [serverIcon, setServerIcon] = useState('');
  const [inviteInput, setInviteInput] = useState('');
  const [inviteError, setInviteError] = useState('');
  const fileInputRef = useRef(null);

  // Set default server name based on current user
  useEffect(() => {
    if (currentUser?.displayName) {
      setServerName(`${currentUser.displayName}s Server`);
    } else {
      setServerName('Neuer DilSed-Server');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setServerIcon(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    if (templateName === 'Meine') {
      setServerName(`${currentUser?.displayName || 'Benutzer'}s Server`);
    } else {
      setServerName(`${templateName}-Server`);
    }
    setStep('audience');
  };

  const handleSelectAudience = (type) => {
    setAudienceType(type);
    setStep('customize');
  };

  // Generate complete channels tailored to the chosen template
  const generateTemplateCategories = (templateName) => {
    const time = Date.now();
    switch (templateName) {
      case 'Gaming':
        return [
          {
            id: `cat_game_text_${time}`,
            name: 'GAMING-KANÄLE',
            channels: [
              { id: `c_lobi_${time}`, name: 'lobby', type: 'text', description: 'Spiel-Einladungen und allgemeiner Chat' },
              { id: `c_klipler_${time}`, name: 'clips-und-highlights', type: 'text', description: 'Beste Spielmomente und Clips' },
              { id: `c_yama_${time}`, name: 'patch-notes', type: 'text', description: 'Spiel-Updates und Patches' }
            ]
          },
          {
            id: `cat_game_voice_${time}`,
            name: 'SPRACHKANÄLE',
            channels: [
              { id: `v_squad1_${time}`, name: 'Squad #1 (Rangliste)', type: 'voice', userLimit: 5 },
              { id: `v_squad2_${time}`, name: 'Squad #2 (Casual)', type: 'voice', userLimit: 5 },
              { id: `v_chill_${time}`, name: 'Lobby & Talk', type: 'voice', userLimit: 15 }
            ]
          }
        ];

      case 'Schul-Club':
        return [
          {
            id: `cat_school_info_${time}`,
            name: 'INFOS & ANKÜNDIGUNGEN',
            channels: [
              { id: `c_rules_${time}`, name: 'regeln-und-info', type: 'text', description: 'Club-Satzung und Infos' },
              { id: `c_ann_${time}`, name: 'ankuendigungen', type: 'text', description: 'Events und Treffen' }
            ]
          },
          {
            id: `cat_school_text_${time}`,
            name: 'TEXTKANÄLE',
            channels: [
              { id: `c_genel_${time}`, name: 'allgemeiner-chat', type: 'text', description: 'Chat für alle Mitglieder' },
              { id: `c_projeler_${time}`, name: 'club-projekte', type: 'text', description: 'Projekt- und Vorbereitungsbereich' }
            ]
          },
          {
            id: `cat_school_voice_${time}`,
            name: 'SPRACHKANÄLE',
            channels: [
              { id: `v_meeting_${time}`, name: 'Club-Versammlung', type: 'voice', userLimit: 30 },
              { id: `v_work_${time}`, name: 'Arbeitsraum', type: 'voice', userLimit: 10 }
            ]
          }
        ];

      case 'Lerngruppe':
        return [
          {
            id: `cat_study_text_${time}`,
            name: 'LERNEN & AUSTAUSCH',
            channels: [
              { id: `c_genel_${time}`, name: 'allgemeiner-chat', type: 'text', description: 'Allgemeiner Chat' },
              { id: `c_notlar_${time}`, name: 'lernunterlagen', type: 'text', description: 'PDFs und Notizen' },
              { id: `c_soru_${time}`, name: 'fragen-und-hilfe', type: 'text', description: 'Fragen und Antworten' }
            ]
          },
          {
            id: `cat_study_voice_${time}`,
            name: 'SPRACHRÄUME',
            channels: [
              { id: `v_silent_${time}`, name: 'Stille Bibliothek (Pomodoro)', type: 'voice', userLimit: 25 },
              { id: `v_group_${time}`, name: 'Projekt-Besprechung', type: 'voice', userLimit: 8 }
            ]
          }
        ];

      case 'Künstler & Designer':
        return [
          {
            id: `cat_art_text_${time}`,
            name: 'DESIGN & KUNST',
            channels: [
              { id: `c_genel_${time}`, name: 'allgemeiner-chat', type: 'text', description: 'Austausch über Kunst und Design' },
              { id: `c_galeri_${time}`, name: 'werke-galerie', type: 'text', description: 'Eigene Zeichnungen und Kreationen' },
              { id: `c_feedback_${time}`, name: 'feedback-und-kritik', type: 'text', description: 'Konstruktives Feedback' }
            ]
          },
          {
            id: `cat_art_voice_${time}`,
            name: 'LIVE-STREAM & ATELIER',
            channels: [
              { id: `v_draw_${time}`, name: 'Zeichnen & Live-Stream', type: 'voice', userLimit: 12 },
              { id: `v_music_${time}`, name: 'Musik & Chill', type: 'voice', userLimit: 15 }
            ]
          }
        ];

      case 'Lokale Community':
        return [
          {
            id: `cat_comm_text_${time}`,
            name: 'COMMUNITY-KANÄLE',
            channels: [
              { id: `c_welcome_${time}`, name: 'willkommen', type: 'text', description: 'Begrüßung neuer Mitglieder' },
              { id: `c_genel_${time}`, name: 'allgemeiner-chat', type: 'text', description: 'Regionales Kennenlernen' },
              { id: `c_etkinlik_${time}`, name: 'events-und-treffen', type: 'text', description: 'Lokale Treffen und Aktionen' }
            ]
          },
          {
            id: `cat_comm_voice_${time}`,
            name: 'SPRACHKANÄLE',
            channels: [
              { id: `v_lounge_${time}`, name: 'Community-Treffpunkt', type: 'voice', userLimit: 30 }
            ]
          }
        ];

      case 'Freunde':
      default:
        return [
          {
            id: `cat_friends_text_${time}`,
            name: 'TEXTKANÄLE',
            channels: [
              { id: `c_genel_${time}`, name: 'allgemein', type: 'text', description: 'Austausch über alles Mögliche' },
              { id: `c_memes_${time}`, name: 'memes', type: 'text', description: 'Bilder, Memes und Videos' },
              { id: `c_muzik_${time}`, name: 'musik-tipps', type: 'text', description: 'Song-Empfehlungen' }
            ]
          },
          {
            id: `cat_friends_voice_${time}`,
            name: 'SPRACHKANÄLE',
            channels: [
              { id: `v_genel_${time}`, name: 'Haupt-Sprachraum', type: 'voice', userLimit: 10 },
              { id: `v_oyun_${time}`, name: 'Gaming-Raum', type: 'voice', userLimit: 8 }
            ]
          }
        ];
    }
  };

  const handleFinalCreate = (e) => {
    e.preventDefault();
    if (!serverName.trim()) return;

    const initials = serverName
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();

    const newServer = {
      id: 'server_' + Date.now(),
      name: serverName.trim(),
      acronym: initials || 'DS',
      icon: serverIcon || null,
      banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80',
      unread: 0,
      audience: audienceType,
      template: selectedTemplate,
      categories: generateTemplateCategories(selectedTemplate),
    };

    onCreateServer(newServer);
    playJoinVoiceSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    onClose();
    setStep('templates');
    setServerIcon('');
  };

  // Handle Joining an existing server by invite link
  const handleJoinByInvite = (e) => {
    e.preventDefault();
    setInviteError('');

    const trimmed = inviteInput.trim();
    if (!trimmed) {
      setInviteError('Bitte gib einen gültigen Einladungslink oder Code ein.');
      return;
    }

    if (onJoinInvite) {
      onJoinInvite(trimmed);
      playJoinVoiceSound();
      confetti({ particleCount: 60 });
      onClose();
      setStep('templates');
      setInviteInput('');
    } else {
      alert(`Mit der Einladung "${trimmed}" bist du dem Server erfolgreich beigetreten!`);
      onClose();
    }
  };

  // Quick preset icons
  const PRESET_ICONS = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#0a0a0d] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.18)] w-full max-w-md overflow-hidden relative border border-amber-500/30 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-200/60 hover:text-amber-400 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ----------------- STEP 1: TEMPLATES ----------------- */}
        {step === 'templates' && (
          <div className="flex flex-col">
            <div className="p-6 pb-4">
              <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                Erstelle deinen Server
              </h2>
              <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-5">
                Dein Server ist der Ort, an dem du mit deinen Freunden abhängst. Erstelle deinen eigenen Server und leg los.
              </p>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
                {/* Primary: Create My Own */}
                <button
                  onClick={() => handleSelectTemplate('Meine')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-amber-500/30 bg-[#121217] hover:bg-[#181822] hover:border-amber-400/60 transition font-semibold text-white text-sm group shadow-sm shadow-amber-500/5 active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span>Selbst erstellen</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
                </button>

                <div className="text-[11px] font-bold text-amber-300/70 uppercase pt-3 pb-1 tracking-wider">
                  STARTE MIT EINER VORLAGE
                </div>

                {/* Gaming */}
                <button
                  onClick={() => handleSelectTemplate('Gaming')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <span>Gaming</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
                </button>

                {/* School Club */}
                <button
                  onClick={() => handleSelectTemplate('Schul-Club')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span>Schul-Club</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
                </button>

                {/* Study Group */}
                <button
                  onClick={() => handleSelectTemplate('Lerngruppe')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center shadow">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span>Lerngruppe</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
                </button>

                {/* Friends */}
                <button
                  onClick={() => handleSelectTemplate('Freunde')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow">
                      <Users className="w-5 h-5" />
                    </div>
                    <span>Freunde</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
                </button>

                {/* Artists & Creators */}
                <button
                  onClick={() => handleSelectTemplate('Künstler & Designer')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shadow">
                      <Palette className="w-5 h-5" />
                    </div>
                    <span>Künstler & Designer</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
                </button>

                {/* Local Community */}
                <button
                  onClick={() => handleSelectTemplate('Lokale Community')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#101014] hover:bg-[#16161e] hover:border-amber-500/30 transition font-semibold text-white text-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shadow">
                      <Globe className="w-5 h-5" />
                    </div>
                    <span>Lokale Community</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-amber-300 transition" />
                </button>
              </div>
            </div>

            {/* Bottom Join a server bar */}
            <div className="bg-[#070709] px-6 py-4 flex flex-col items-center border-t border-amber-500/15">
              <div className="text-xs font-semibold text-amber-200/80 mb-2">
                Hast du bereits eine Einladung?
              </div>
              <button
                onClick={() => setStep('join')}
                className="w-full bg-[#14141a] hover:bg-[#1a1a24] text-amber-200 hover:text-white py-2.5 rounded-xl text-xs font-bold transition border border-amber-500/20 hover:border-amber-400/50"
              >
                Einem Server beitreten
              </button>
            </div>
          </div>
        )}

        {/* ----------------- STEP 2: AUDIENCE ----------------- */}
        {step === 'audience' && (
          <div className="flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                Erzähle uns etwas mehr über deinen Server
              </h2>
              <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-6">
                Um dir bei der Einrichtung zu helfen: Ist der Server für dich und ein paar Freunde oder für eine größere Community gedacht?
              </p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSelectAudience('community')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-amber-500/20 bg-[#101014] hover:bg-[#16161e] hover:border-amber-400/50 transition font-semibold text-white text-sm text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Für einen Club oder eine Community</div>
                      <div className="text-xs text-amber-200/50">Für eine größere Gruppe oder öffentlich</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
                </button>

                <button
                  onClick={() => handleSelectAudience('friends')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-amber-500/20 bg-[#101014] hover:bg-[#16161e] hover:border-amber-400/50 transition font-semibold text-white text-sm text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Für mich und meine Freunde</div>
                      <div className="text-xs text-amber-200/50">Ein privater Ort nur für enge Freunde</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </div>

            <div className="bg-[#070709] px-6 py-4 flex items-center justify-between border-t border-amber-500/15">
              <button
                type="button"
                onClick={() => setStep('templates')}
                className="text-xs font-semibold text-amber-200/70 hover:text-white hover:underline"
              >
                Zurück
              </button>
              <button
                type="button"
                onClick={() => setStep('customize')}
                className="text-xs text-amber-200/60 hover:text-amber-300"
              >
                Nicht sicher? <span className="underline">Diese Frage vorerst überspringen.</span>
              </button>
            </div>
          </div>
        )}

        {/* ----------------- STEP 3: CUSTOMIZE ----------------- */}
        {step === 'customize' && (
          <form onSubmit={handleFinalCreate} className="flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                Passe deinen Server an
              </h2>
              <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-6">
                Gib deinem neuen Server einen Namen und ein Symbol. Du kannst dies jederzeit später ändern.
              </p>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Server Icon Selector */}
              <div className="flex flex-col items-center mb-5">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer w-20 h-20 rounded-2xl border-2 border-dashed border-amber-500/40 hover:border-amber-400 flex items-center justify-center overflow-hidden transition shadow-lg bg-[#0e0e12]"
                >
                  {serverIcon ? (
                    <img
                      src={serverIcon}
                      alt="Icon"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-amber-200/70 group-hover:text-amber-300 transition">
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">HOCHLADEN</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-amber-300 text-[9px] font-bold transition">
                    <Upload className="w-4 h-4 mb-0.5" />
                    ÄNDERN
                  </div>
                </div>

                {serverIcon && (
                  <button
                    type="button"
                    onClick={() => setServerIcon('')}
                    className="text-[11px] text-discord-red hover:underline mt-2 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Symbol entfernen</span>
                  </button>
                )}

                {/* Quick Preset Icons */}
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="text-[10px] text-amber-200/60 uppercase font-bold mr-1">Beispiele:</span>
                  {PRESET_ICONS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setServerIcon(preset)}
                      className="w-6 h-6 rounded-full overflow-hidden border border-amber-500/30 hover:scale-110 transition"
                    >
                      <img src={preset} alt="Preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Server Name Field */}
              <div className="mb-4">
                <label className="text-[11px] font-bold text-amber-300/80 uppercase block mb-1 tracking-wider">
                  SERVERNAME <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder="Servernamen eingeben"
                  className="w-full bg-[#121216] rounded-xl px-3.5 py-2.5 text-sm text-white border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                />
              </div>

              {/* Guidelines Notice */}
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Mit der Erstellung eines Servers akzeptierst du die{' '}
                <a
                  href="https://discord.com/guidelines"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:text-amber-300 hover:underline font-semibold"
                >
                  Community-Richtlinien
                </a>{' '}
                von DilSed.
              </p>
            </div>

            <div className="bg-[#070709] px-6 py-4 flex items-center justify-between border-t border-amber-500/15">
              <button
                type="button"
                onClick={() => setStep('audience')}
                className="text-xs font-semibold text-amber-200/70 hover:text-white hover:underline"
              >
                Zurück
              </button>
              <button
                type="submit"
                disabled={!serverName.trim()}
                className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-amber-500/20 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                Erstellen
              </button>
            </div>
          </form>
        )}

        {/* ----------------- STEP 4: JOIN A SERVER ----------------- */}
        {step === 'join' && (
          <form onSubmit={handleJoinByInvite} className="flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
                Einem Server beitreten
              </h2>
              <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-6">
                Gib unten einen Einladungslink oder Code ein, um einem vorhandenen Server beizutreten.
              </p>

              {inviteError && (
                <div className="mb-4 p-2.5 rounded bg-discord-red/20 border border-discord-red/50 text-discord-red text-xs">
                  {inviteError}
                </div>
              )}

              <div className="mb-4">
                <label className="text-[11px] font-bold text-amber-300/80 uppercase block mb-1 tracking-wider">
                  EINLADUNGSLINK <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={inviteInput}
                  onChange={(e) => setInviteInput(e.target.value)}
                  placeholder="https://discord.gg/hTKz9a oder hTKz9a"
                  className="w-full bg-[#121216] rounded-xl px-3.5 py-2.5 text-sm text-white border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                />
              </div>

              {/* Sample Invites Helper Box */}
              <div className="bg-[#101014] rounded-xl p-3 border border-amber-500/20 text-xs space-y-1">
                <div className="text-[10px] font-bold text-amber-300/80 uppercase mb-1">
                  EINLADUNGEN SEHEN ETWA SO AUS:
                </div>
                <div className="text-neutral-300 font-mono text-[11px]">hTKz9a</div>
                <div className="text-neutral-300 font-mono text-[11px]">https://discord.gg/hTKz9a</div>
                <div className="text-neutral-300 font-mono text-[11px]">https://discord.gg/entwickler-community</div>
              </div>
            </div>

            <div className="bg-[#070709] px-6 py-4 flex items-center justify-between border-t border-amber-500/15">
              <button
                type="button"
                onClick={() => setStep('templates')}
                className="text-xs font-semibold text-amber-200/70 hover:text-white hover:underline"
              >
                Zurück
              </button>
              <button
                type="submit"
                disabled={!inviteInput.trim()}
                className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-amber-500/20 disabled:opacity-50 active:scale-95 cursor-pointer"
              >
                Server beitreten
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
