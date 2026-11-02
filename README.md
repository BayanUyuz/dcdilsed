# 👑 DilSed Web — Modern Gerçek Zamanlı İletişim Platformu

> **DilSed Web**, modern web teknolojileri (React 18, Vite, Tailwind CSS, Supabase Realtime ve WebRTC) kullanılarak geliştirilmiş, yüksek performanslı ve modüler mimariye sahip bir gerçek zamanlı sesli ve yazılı iletişim platformudur.

---

## 🌟 Öne Çıkan Özellikler

### 💬 1. Gerçek Zamanlı Mesajlaşma & Topluluk Kanalları
- **Echtzeit-Chat (Supabase Realtime):** Kanal bazlı anlık mesajlaşma ve çoklu sekme / kullanıcı senkronizasyonu.
- **Tepkiler (Reactions):** Emojilerle mesajlara dinamik tepki verme ve sayaç takibi.
- **Dosya ve Medya Paylaşımı:** Canlı dosya ve GIF gönderme desteği.
- **Kanal ve Kategori Yönetimi:** Metin ve ses kanallarını kategorilendirme, sürükleme ve sıralama.

### 🎙️ 2. WebRTC Canlı Ses Odaları & Ekran Paylaşımı
- **1080p 60FPS Ekran Paylaşımı:** Tarayıcı içi `getDisplayMedia` API'si ile sıfır eklenti gerektiren ekran yayını.
- **Kamera Desteği:** Entegre web kamerası görüntü aktarımı.
- **Dahili Soundboard (Web Audio API):** Lufthorn, Enten-Quak, Ba-Dum-Tss ve Applaus ses efektleri.
- **Krisp Rauschunterdrückung:** Rauschunterdrückung simülasyonu ve aktif konuşmacı tespiti (`activeSpeakerId`).

### 🛡️ 3. Kapsamlı Moderasyon & Güvenlik
- **Mod-Ansicht (Moderasyon Paneli):** Üye rolleri, denetim kaydı (Audit Log), moderasyon notları ve mesaj geçmişi.
- **Rol & İzin Sistemi:** Administrator, Moderator, Entwickler, VIP-Unterstützer ve @everyone rolleri.
- **Ceza Mekanizmaları:** Süreli susturma (Timeout), sunucu geneli sustur/sağırlaştır (Server Mute/Deafen), Kick ve Ban.

### 🎨 4. Lüks Siyah & Asil Altın Tasarım Sistemi
- **Royal Obsidian & Gold:** Özel `#070709`, `#0c0c10` zeminler, `amber-400` / `amber-500` altın vurgular.
- **Kişiselleştirilebilir Profil:** Banner renk gradyanları, avatar dekorasyonları ve özel durum emojileri.
- **34 Dil Desteği:** Türkçe, Almanca, İngilizce dahil 34 dilde anlık arayüz desteği.

---

## 🏛️ Mimari ve Modüler Yapı

Proje, yazılım mühendisliği ilkelerine ve **Single Responsibility (Tek Sorumluluk Prensibi)** standardına uygun olarak modüler bileşenlere ve Custom Hook katmanlarına ayrılmıştır:

```
src/
├── hooks/                      # Mantık ve durum yönetimi (Custom Hooks)
│   ├── useServers.js           # Sunucu & kanal CRUD işlemleri
│   ├── useVoiceState.js        # Ses odası ve WebRTC durumu
│   ├── useModeration.js        # Moderasyon, roller, ban & kick
│   ├── useUserSettings.js      # Kullanıcı profili, ses/video & temalar
│   ├── useChatMessages.js      # Gerçek zamanlı mesajlaşma & Supabase eşitleme
│   └── useModalState.js        # Modalların durum yönetimi
│
├── components/                 # Modüler sunum bileşenleri (< 250 satır)
│   ├── ChannelSidebar/         # Sunucu başlığı, kanal listesi & ses doku
│   ├── Chat/                   # Chat başlığı, mesaj öğeleri & mesaj giriş çubuğu
│   ├── Common/                 # Ortak alt kullanıcı doku
│   ├── DirectMessages/         # Arkadaş listesi, DM kenar çubuğu & DM sohbeti
│   ├── Modals/                 # Modüler sunucu ve üye pencereleri
│   ├── ServerSettings/         # 14 bağımsız sunucu ayar sekmesi
│   ├── UserSettings/           # Profil, erişilebilirlik, ses ve sistem sekmeleri
│   ├── Voice/                  # Canlı ses ızgarası, kontrol çubuğu & soundboard
│   └── VoiceChannelSettings/   # Ses kanalı izin ve bit hızı ayarları
│
├── data/                       # Varsayılan başlangıç verileri
└── supabaseClient.js           # Supabase istemcisi ve Broadcast yöneticisi
```

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel geliştirme ortamınızda çalıştırmak için:

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim (Production) derlemesi alın
npm run build
```

---

## 📄 Lisans
Bu proje lisanslıdır. © 2026 DilSed — Tüm hakları saklıdır.
