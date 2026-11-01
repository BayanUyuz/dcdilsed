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

// Keine Beispiel-Server – Benutzer kann eigene Server und Kanäle erstellen
export const initialServers = [];

// Keine Beispiel-Nachrichten
export const initialMessages = {};

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
    roleColor: '#949ba4',
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
