export const PRESET_ICONS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80'
];

export function generateTemplateCategories(templateName) {
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
}
