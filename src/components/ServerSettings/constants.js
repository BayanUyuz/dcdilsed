export const DEFAULT_ROLES = [
  {
    id: 'r_admin',
    name: 'Administrator',
    color: '#5865F2',
    isAdmin: true,
    canManageChannels: true,
    canKick: true,
    membersCount: 1,
  },
  {
    id: 'r_mod',
    name: 'Moderator',
    color: '#23a55a',
    isAdmin: false,
    canManageChannels: true,
    canKick: true,
    membersCount: 0,
  },
  {
    id: 'r_everyone',
    name: '@everyone',
    color: '#949ba4',
    isAdmin: false,
    canManageChannels: false,
    canKick: false,
    membersCount: 1,
  },
];

export const INITIAL_MEMBERS_LIST = [
  {
    id: 'current_user_me',
    name: 'Benutzer (Du)',
    username: 'DilsedUser',
    role: 'Eigentümer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    joined: 'Heute',
  },
];

export const INITIAL_AUTOMOD_RULES = {
  blockProfanity: true,
  blockSpam: true,
  blockPhishingLinks: true,
  blockMentionSpam: true,
};
