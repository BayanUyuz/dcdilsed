export const ROLES_LIST = [
  { id: '@everyone', name: '@everyone', color: '#949ba4' },
  { id: 'r_admin', name: 'Administrator', color: '#5865F2' },
  { id: 'r_mod', name: 'Moderator', color: '#23a55a' },
  { id: 'r_vip', name: 'VIP-Unterstützer', color: '#eb459e' },
];

export const PERMISSION_CONFIGS = [
  {
    key: 'view',
    title: 'Kanal anzeigen',
    desc: 'Erlaubt Mitgliedern, diesen Sprachkanal in der Kanalliste zu sehen.'
  },
  {
    key: 'connect',
    title: 'Verbinden',
    desc: 'Erlaubt Mitgliedern, sich mit diesem Sprachkanal zu verbinden und andere zu hören.'
  },
  {
    key: 'speak',
    title: 'Sprechen',
    desc: 'Erlaubt Mitgliedern, in diesem Sprachkanal ihr Mikrofon zu verwenden.'
  },
  {
    key: 'video',
    title: 'Video & Bildschirmübertragung',
    desc: 'Erlaubt Mitgliedern, ihre Kamera einzuschalten oder ihren Bildschirm zu teilen.'
  },
  {
    key: 'voiceActivity',
    title: 'Sprachaktivierung nutzen',
    desc: 'Erlaubt Mitgliedern, ohne Push-to-Talk mit automatischer Spracherkennung zu sprechen.'
  },
  {
    key: 'prioritySpeaker',
    title: 'Prioritäts-Sprecher',
    desc: 'Wenn dieses Mitglied spricht, wird die Lautstärke anderer Teilnehmer automatisch reduziert.'
  },
  {
    key: 'muteMembers',
    title: 'Mitglieder stummschalten',
    desc: 'Erlaubt es, andere Mitglieder in diesem Sprachraum serverseitig stummzuschalten.'
  },
  {
    key: 'deafenMembers',
    title: 'Mitglieder taubschalten',
    desc: 'Erlaubt es, die Kopfhörer anderer Mitglieder in diesem Sprachraum stummzuschalten.'
  },
  {
    key: 'moveMembers',
    title: 'Mitglieder verschieben',
    desc: 'Erlaubt es, Mitglieder in andere Sprachräume zu verschieben.'
  },
];
