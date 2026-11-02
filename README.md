# 👑 DilSed Web — Moderne Echtzeit-Kommunikationsplattform

> **DilSed Web** ist eine moderne, hochleistungsfähige und modulare Echtzeit-Kommunikationsplattform für Sprach- und Textchats, entwickelt mit modernen Webtechnologien (React 18, Vite, Tailwind CSS, Supabase Realtime und WebRTC).

---

## 🌟 Hauptfunktionen

### 💬 1. Echtzeit-Messaging & Community-Kanäle
- **Echtzeit-Chat (Supabase Realtime):** Kanalbasiertes Instant Messaging und nahtlose Synchronisation über mehrere Tabs und Benutzer hinweg.
- **Reaktionen (Reactions):** Dynamische Emoji-Reaktionen auf Nachrichten mit Zähler-Tracking in Echtzeit.
- **Datei- und Medienfreigabe:** Unterstützung für das Versenden von Bildern, Anhängen und GIFs.
- **Kanal- und Kategoriemanagement:** Text- und Sprachkanäle flexibel kategorisieren, sortieren und verwalten.

### 🎙️ 2. WebRTC Live-Sprachräume & Bildschirmfreigabe
- **1080p 60FPS Bildschirmfreigabe:** Browser-native Bildschirmübertragung via `getDisplayMedia`-API ohne zusätzliche Plugins.
- **Kamera-Unterstützung:** Integrierte Webcam-Videoübertragung für direkte Konferenzen.
- **Integriertes Soundboard (Web Audio API):** Lufthorn, Enten-Quak, Ba-Dum-Tss und Applaus-Soundeffekte.
- **Krisp Rauschunterdrückung:** Intelligente Rauschunterdrückungs-Simulation und aktive Sprechererkennung (`activeSpeakerId`).

### 🛡️ 3. Umfassende Moderation & Sicherheit
- **Moderator-Ansicht (ModView):** Mitgliederrollen, detailliertes Audit-Log (Prüfprotokoll), Moderationsnotizen und Nachrichtenverlauf.
- **Rollen- & Berechtigungssystem:** Vollständig konfigurierbare Administrator-, Moderator-, Entwickler-, VIP-Unterstützer- und @everyone-Rollen.
- **Sanktionsmechanismen:** Zeitstrafen (Timeout), serverweites Stummschalten/Taubschalten (Server Mute/Deafen), Kick und Ban.

### 🎨 4. Luxuriöses Schwarz & Edles Gold Design-System
- **Royal Obsidian & Gold:** Maßgeschneiderte Edel-Hintergründe in `#070709`, `#0c0c10` mit eleganten `amber-400` / `amber-500` Gold-Akzenten.
- **Individuelles Benutzerprofil:** Banner-Farbverläufe, Avatar-Dekorationen und benutzerdefinierte Status-Emojis.
- **Mehrsprachige Unterstützung:** Vollständige Lokalisierungsunterstützung für Deutsch, Türkisch, Englisch und weitere Sprachen.

---

## 🏛️ Architektur und modularer Aufbau

Das Projekt folgt den Best Practices des Software Engineerings und dem **Single-Responsibility-Prinzip (SRP)**, aufgeteilt in modulare UI-Komponenten und Custom-Hook-Schichten. Jede Quellcodedatei im Projekt wird für maximale Übersichtlichkeit und Wartbarkeit strikt **unter 250 Zeilen** gehalten:

```
src/
├── hooks/                      # Logik & Zustandsverwaltung (Custom Hooks < 250 Zeilen)
│   ├── useServers.js           # Server- & Kanal-CRUD-Operationen
│   ├── useVoiceState.js        # Sprachraum- und WebRTC-Status
│   ├── useModeration.js        # Moderation, Rollen, Ban & Kick
│   ├── useUserSettings.js      # Benutzerprofil, Oberfläche & Themes
│   ├── useUserAudioSettings.js  # Audiogeräte, Mikrofon & Tastaturkürzel
│   ├── useChatMessages.js      # Echtzeit-Messaging & Supabase-Synchronisation
│   └── useModalState.js        # Zustandsverwaltung der Modale
│
├── components/                 # Modulare UI-Komponenten (Jede Datei < 250 Zeilen)
│   ├── ChannelSidebar/         # Server-Header, Kanalliste & Sprach-Dock
│   ├── Chat/                   # Chat-Header, Nachrichtenelemente & Eingabeleiste
│   ├── Common/                 # Gemeinsames Benutzer-Dock & Avatare
│   ├── DirectMessages/         # Freundesliste, DM-Seitenleiste & DM-Chat
│   ├── Landing/                # Landing-Page mit QR-unterstützter Authentifizierung
│   ├── Modals/                 # Modulare Server-, Moderations- & Mitglieder-Fenster
│   ├── ServerSettings/         # 14 unabhängige Servereinstellungs-Reiter & Konstanten
│   ├── UserSettings/           # Profil-, Barrierefreiheits-, Audio- & System-Reiter
│   ├── Voice/                  # Live-Sprachgitter, Kontrollleiste & Soundboard
│   └── VoiceChannelSettings/   # Sprachkanal-Berechtigungen & Bitraten-Einstellungen
│
├── data/                       # Initiale Demo- und Ausgangsdaten
├── soundEffects.js             # Web Audio API Sound-Engine
└── supabaseClient.js           # Supabase-Client & Broadcast-Manager
```

---

## 🚀 Installation und Ausführung

Um das Projekt in der lokalen Entwicklungsumgebung auszuführen:

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build
```

---

## 📄 Lizenz
Dieses Projekt ist lizenziert. © 2026 DilSed — Alle Rechte vorbehalten.
