# 👑 DilSed Web — Modern Gerçek Zamanlı İletişim Platformu

> **DilSed Web**, modern web teknolojileri (React 18, Vite, Tailwind CSS, Supabase Realtime ve WebRTC) kullanılarak geliştirilmiş, yüksek performanslı ve modüler mimariye sahip bir gerçek zamanlı sesli ve yazılı iletişim platformudur.

---

## 🌟 Öne Çıkan Özellikler

### 💬 1. Gerçek Zamanlı Mesajlaşma & Topluluk Kanalları
- **Gerçek Zamanlı Sohbet (Supabase Realtime):** Kanal bazlı anlık mesajlaşma ve çoklu sekme / kullanıcı senkronizasyonu.
- **Tepkiler (Reactions):** Emojilerle mesajlara dinamik tepki verme ve sayaç takibi.
- **Dosya ve Medya Paylaşımı:** Canlı dosya ve GIF gönderme desteği.
- **Kanal ve Kategori Yönetimi:** Metin ve ses kanallarını kategorilendirme, sürükleme ve sıralama.

### 🎙️ 2. WebRTC Canlı Ses Odaları & Ekran Paylaşımı
- **1080p 60FPS Ekran Paylaşımı:** Tarayıcı içi `getDisplayMedia` API'si ile sıfır eklenti gerektiren ekran yayını.
- **Kamera Desteği:** Entegre web kamerası görüntü aktarımı.
- **Dahili Soundboard (Web Audio API):** Korna, Ördek, Ba-Dum-Tss ve Alkış ses efektleri.
- **Krisp Gürültü Engelleme:** Akıllı gürültü engelleme simülasyonu ve aktif konuşmacı tespiti (`activeSpeakerId`).

### 🛡️ 3. Kapsamlı Moderasyon & Güvenlik
- **Moderatör Görünümü (ModView):** Üye rolleri, denetim kaydı (Audit Log), moderasyon notları ve mesaj geçmişi.
- **Rol & İzin Sistemi:** Yönetici, Moderatör, Geliştirici, VIP Destekçi ve @everyone rolleri.
- **Ceza Mekanizmaları:** Süreli susturma (Timeout), sunucu geneli sustur/sağırlaştır (Server Mute/Deafen), Kick ve Ban.

### 🎨 4. Lüks Siyah & Asil Altın Tasarım Sistemi
- **Royal Obsidian & Gold:** Özel `#070709`, `#0c0c10` zeminler, `amber-400` / `amber-500` altın vurgular.
- **Kişiselleştirilebilir Profil:** Banner renk gradyanları, avatar dekorasyonları ve özel durum emojileri.
- **Çoklu Dil Desteği:** Türkçe, Almanca, İngilizce dahil çoklu dilde anlık arayüz desteği.

---

## 🏛️ Mimari ve Modüler Yapı

Proje, yazılım mühendisliği ilkelerine ve **Single Responsibility (Tek Sorumluluk Prensibi)** standardına uygun olarak modüler bileşenlere ve Custom Hook katmanlarına ayrılmıştır. Projedeki her kaynak kod dosyası maksimum okunabilirlik ve sürdürülebilirlik için **250 satırın altında** tutulmaktadır:

```
src/
├── hooks/                      # Mantık ve durum yönetimi (Custom Hooks < 250 satır)
│   ├── useServers.js           # Sunucu & kanal CRUD işlemleri
│   ├── useVoiceState.js        # Ses odası ve WebRTC durumu
│   ├── useModeration.js        # Moderasyon, roller, ban & kick
│   ├── useUserSettings.js      # Kullanıcı profili, arayüz & temalar
│   ├── useUserAudioSettings.js  # Ses aygıtları, mikrofon ve klavye kısayolları
│   ├── useChatMessages.js      # Gerçek zamanlı mesajlaşma & Supabase eşitleme
│   └── useModalState.js        # Modalların durum yönetimi
│
├── components/                 # Modüler sunum bileşenleri (Her dosya < 250 satır)
│   ├── ChannelSidebar/         # Sunucu başlığı, kanal listesi & ses kontrol doku
│   ├── Chat/                   # Sohbet başlığı, mesaj öğeleri & mesaj giriş çubuğu
│   ├── Common/                 # Ortak alt kullanıcı paneli ve avatarlar
│   ├── DirectMessages/         # Arkadaş listesi, DM kenar çubuğu & DM sohbeti
│   ├── Landing/                # Karşılama sayfası ve QR destekli kimlik doğrulama
│   ├── Modals/                 # Modüler sunucu, moderasyon ve üye pencereleri
│   ├── ServerSettings/         # 14 bağımsız sunucu ayar sekmesi ve sabitleri
│   ├── UserSettings/           # Profil, erişilebilirlik, ses ve sistem sekmeleri
│   ├── Voice/                  # Canlı ses ızgarası, kontrol çubuğu & soundboard
│   └── VoiceChannelSettings/   # Ses kanalı izin ve bit hızı ayarları
│
├── data/                       # Başlangıç ve demo verileri
├── soundEffects.js             # Web Audio API ses motoru
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
