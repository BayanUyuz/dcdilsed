import { useState } from 'react';

export function useServerSettingsState(server, onUpdateServer) {
  const [activeTab, setActiveTab] = useState('overview');

  // Overview & Theme state
  const [serverName, setServerName] = useState(server?.name || '');
  const [serverIcon, setServerIcon] = useState(server?.icon || '');
  const [serverBanner, setServerBanner] = useState(server?.banner || '');
  const [serverThemeColor, setServerThemeColor] = useState(server?.themeColor || '#5865F2');
  const [systemChannel, setSystemChannel] = useState('allgemein');
  const [afkTimeout, setAfkTimeout] = useState('300');

  // Server Tag & Vanity URL state
  const [serverTag, setServerTag] = useState(server?.tag || 'TR-TOPLULUK');
  const [vanityUrl, setVanityUrl] = useState(server?.vanityUrl || 'topluluk-tr');
  const [copiedVanity, setCopiedVanity] = useState(false);

  // Roles state
  const [roles, setRoles] = useState([
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
  ]);
  const [activeRoleId, setActiveRoleId] = useState('r_admin');

  // Emojis state
  const [emojis, setEmojis] = useState([]);
  const [newEmojiName, setNewEmojiName] = useState('');
  const [newEmojiChar, setNewEmojiChar] = useState('');

  // Stickers state
  const [stickers, setStickers] = useState([]);
  const [newStickerName, setNewStickerName] = useState('');
  const [newStickerDesc, setNewStickerDesc] = useState('');
  const [newStickerEmoji, setNewStickerEmoji] = useState('🌟');

  // Members state
  const [memberSearch, setMemberSearch] = useState('');
  const [membersList, setMembersList] = useState([
    {
      id: 'current_user_me',
      name: 'Benutzer (Du)',
      username: 'DilsedUser',
      role: 'Eigentümer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      joined: 'Heute',
    },
  ]);

  // Invites, Bans, AutoMod, Templates, Webhooks, Audit
  const [invitesList, setInvitesList] = useState([]);
  const [bansList, setBansList] = useState([]);
  const [autoModRules, setAutoModRules] = useState({
    blockProfanity: true,
    blockSpam: true,
    blockPhishingLinks: true,
    blockMentionSpam: true,
  });
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Willkommen in unserer Community! Schau dir unsere empfohlenen Kanäle an, um loszulegen.'
  );
  const [templateName, setTemplateName] = useState('Community-Server-Vorlage');
  const [templateDesc, setTemplateDesc] = useState(
    'Fertiges Template mit Text-, Sprachkanälen, Rollen und AutoMod-Regeln.'
  );
  const [templateUrl, setTemplateUrl] = useState('https://dilsed.new/aB8xQz');
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [webhooksList, setWebhooksList] = useState([]);
  const [auditLogs, setAuditLogs] = useState([
    { user: 'Du', action: 'Server erstellt und eingerichtet', time: 'Heute' },
  ]);

  const currentRole = roles.find((r) => r.id === activeRoleId) || roles[0];

  const handleSaveOverview = () => {
    onUpdateServer({
      ...server,
      name: serverName,
      icon: serverIcon,
      banner: serverBanner,
      themeColor: serverThemeColor,
      tag: serverTag,
      vanityUrl,
    });
    alert('Servereinstellungen und Design erfolgreich gespeichert!');
  };

  const handleAddNewRole = () => {
    const newRole = {
      id: 'r_' + Date.now(),
      name: 'Neue Rolle',
      color: '#3498db',
      isAdmin: false,
      canManageChannels: false,
      canKick: false,
      membersCount: 0,
    };
    setRoles((prev) => [...prev, newRole]);
    setActiveRoleId(newRole.id);
  };

  const updateRoleProperty = (property, value) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === activeRoleId ? { ...r, [property]: value } : r))
    );
  };

  const handleAddEmoji = (e) => {
    e.preventDefault();
    if (!newEmojiName.trim() || !newEmojiChar.trim()) return;
    setEmojis((prev) => [
      ...prev,
      {
        id: 'e_' + Date.now(),
        name: `:${newEmojiName.trim()}:`,
        emoji: newEmojiChar.trim(),
        author: 'Du',
      },
    ]);
    setNewEmojiName('');
    setNewEmojiChar('');
  };

  const handleAddSticker = (e) => {
    e.preventDefault();
    if (!newStickerName.trim()) return;
    setStickers((prev) => [
      ...prev,
      {
        id: 'st_' + Date.now(),
        name: newStickerName.trim(),
        description: newStickerDesc.trim(),
        image: newStickerEmoji,
      },
    ]);
    setNewStickerName('');
    setNewStickerDesc('');
  };

  const handleRevokeInvite = (code) => {
    setInvitesList((prev) => prev.filter((inv) => inv.code !== code));
  };

  const handleUnban = (id) => {
    setBansList((prev) => prev.filter((b) => b.id !== id));
    alert('Bann für den Benutzer erfolgreich aufgehoben.');
  };

  const handleKickMember = (id, name) => {
    if (confirm(`Soll ${name} wirklich vom Server gekickt werden?`)) {
      setMembersList((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleBanMember = (id, name) => {
    const reason = prompt(`Grund für die Verbannung von ${name}:`, 'Regelverstoß');
    if (reason) {
      setMembersList((prev) => prev.filter((m) => m.id !== id));
      setBansList((prev) => [
        ...prev,
        { id: 'b_' + Date.now(), name: `${name}#0000`, reason, date: 'Heute' },
      ]);
    }
  };

  return {
    activeTab,
    setActiveTab,
    serverName,
    setServerName,
    serverIcon,
    setServerIcon,
    serverBanner,
    setServerBanner,
    serverThemeColor,
    setServerThemeColor,
    systemChannel,
    setSystemChannel,
    afkTimeout,
    setAfkTimeout,
    serverTag,
    setServerTag,
    vanityUrl,
    setVanityUrl,
    copiedVanity,
    setCopiedVanity,
    roles,
    activeRoleId,
    setActiveRoleId,
    currentRole,
    emojis,
    newEmojiName,
    setNewEmojiName,
    newEmojiChar,
    setNewEmojiChar,
    stickers,
    newStickerName,
    setNewStickerName,
    newStickerDesc,
    setNewStickerDesc,
    newStickerEmoji,
    setNewStickerEmoji,
    memberSearch,
    setMemberSearch,
    membersList,
    invitesList,
    bansList,
    autoModRules,
    setAutoModRules,
    welcomeEnabled,
    setWelcomeEnabled,
    welcomeMessage,
    setWelcomeMessage,
    templateName,
    setTemplateName,
    templateDesc,
    setTemplateDesc,
    templateUrl,
    copiedTemplate,
    setCopiedTemplate,
    webhooksList,
    setWebhooksList,
    auditLogs,
    handleSaveOverview,
    handleAddNewRole,
    updateRoleProperty,
    handleAddEmoji,
    handleAddSticker,
    handleRevokeInvite,
    handleUnban,
    handleKickMember,
    handleBanMember,
  };
}
