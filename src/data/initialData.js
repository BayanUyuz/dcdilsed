export const currentUser = {
  id: 'current_user_me',
  username: 'DilsedUser',
  displayName: 'Benutzer',
  discriminator: '2026',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  status: 'online', // 'online' | 'idle' | 'dnd' | 'offline'
  statusText: '⚡ DilSed Web',
  badges: ['developer', 'early']
};

// Standardmäßiger DilSed-Community-Server im edlen Schwarz & Gold
export const initialServers = [
  {
    id: 'server_dilsed_official',
    name: 'DilSed Community',
    acronym: 'DS',
    icon: '/dilsed-logo.png',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    unread: 0,
    audience: 'community',
    template: 'Freunde',
    categories: [
      {
        id: 'cat_dilsed_text',
        name: 'TEXTKANÄLE',
        channels: [
          { id: 'c_willkommen', name: 'willkommen', type: 'text', description: 'Willkommen bei DilSed!' },
          { id: 'c_allgemein', name: 'allgemein', type: 'text', description: 'Allgemeine Unterhaltungen und Austausch' },
          { id: 'c_ankuendigungen', name: 'ankündigungen', type: 'text', description: 'Neuigkeiten und Plattform-Updates' }
        ]
      },
      {
        id: 'cat_dilsed_voice',
        name: 'SPRACHKANÄLE',
        channels: [
          { id: 'v_lounge', name: 'Lounge & Talk', type: 'voice', userLimit: 15 },
          { id: 'v_gaming', name: 'Gaming Zone', type: 'voice', userLimit: 8 }
        ]
      }
    ]
  }
];

// Start-Nachrichten
export const initialMessages = {
  c_willkommen: [
    {
      id: 'm_welcome_1',
      author: {
        id: 'bot_dilsed',
        username: 'DilSed Bot',
        displayName: 'DilSed Bot',
        avatar: '/dilsed-logo.png',
        isBot: true,
        role: 'Bot',
        roleColor: '#f59e0b',
      },
      content: 'Willkommen auf dem offiziellen DilSed-Server! 👑 Hier kannst du in Echtzeit chatten, Sprachräume betreten und deine eigene Community aufbauen.',
      timestamp: 'Heute um 12:00',
      reactions: [
        { emoji: '👑', count: 3, users: [] },
        { emoji: '✨', count: 5, users: [] },
        { emoji: '🔥', count: 2, users: [] }
      ]
    }
  ]
};

// Nur der angemeldete Benutzer – keine Beispiel-Mitglieder
export const initialMembers = [
  {
    id: 'current_user_me',
    username: 'DilsedUser',
    displayName: 'Benutzer (Du)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    isBot: false,
    roleCategory: 'ONLINE — 1',
    role: 'Mitglied',
    roleColor: '#fde68a',
    status: 'online',
    customStatus: '⚡ DilSed Web'
  }
];

// Keine Beispiel-Freunde
export const initialFriends = [];

// Öffentliche Server-Verzeichnis (Explore Modal)
export const exploreServersData = [
  {
    id: 'exp_1',
    name: 'Deutsche Entwickler-Community',
    description: 'Deutschlands aktivster Server für Softwareentwicklung, Web-Dev, KI, Karriere und Open-Source-Projekte.',
    members: '48.250 Mitglieder',
    online: '12.430 Online',
    icon: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'exp_2',
    name: 'Next.js & Vite Builders',
    description: 'Entwickler, die mit modernen JavaScript-Ökosystemen, React 19, Tailwind CSS und Supabase arbeiten.',
    members: '32.100 Mitglieder',
    online: '8.920 Online',
    icon: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'exp_3',
    name: 'Design & UI/UX Deutschland',
    description: 'Interface-Design, Prototyping, Figma-Tipps, Design-Systeme und Portfolio-Feedback.',
    members: '19.400 Mitglieder',
    online: '4.150 Online',
    icon: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    verified: false
  }
];

export function createExploreServerInstance(exploreServer) {
  return {
    id: exploreServer.id,
    name: exploreServer.name,
    acronym: exploreServer.name.slice(0, 2).toUpperCase(),
    icon: exploreServer.icon,
    banner: exploreServer.banner,
    unread: 0,
    categories: [
      {
        id: 'cat_exp_1',
        name: 'ALLGEMEINE KANÄLE',
        channels: [
          { id: 'c_exp_welcome', name: 'willkommen', type: 'text', description: 'Willkommen in der Community!' },
          { id: 'c_exp_chat', name: 'allgemein', type: 'text', description: 'Allgemeiner Chat.' }
        ]
      },
      {
        id: 'cat_exp_2',
        name: 'SPRACHKANÄLE',
        channels: [
          { id: 'v_exp_lounge', name: 'Community-Lounge', type: 'voice', userLimit: 20 }
        ]
      }
    ]
  };
}
