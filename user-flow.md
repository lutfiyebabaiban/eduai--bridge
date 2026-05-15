# 🗺️ user-flow.md — EduAI-Bridge

## Kullanıcı Akışı (User Flow)

```
[Uygulama Açılışı]
        │
        ▼
[Onboarding Ekranları]  ──► 3 slayt: Sorun → Çözüm → Başla
        │
        ▼
[Kayıt / Giriş]  ──► Google ile Giriş veya E-posta
        │
        ▼
[Profil Kurulum Sihirbazı]
        │
        ├── Adım 1: Kişisel Bilgiler (İsim, Üniversite, Bölüm, Sınıf)
        ├── Adım 2: Kariyer Hedefi Seçimi (Frontend Dev, Data Scientist, PM, vb.)
        ├── Adım 3: Mevcut Beceri Seviyesi (Başlangıç / Orta / İleri)
        └── Adım 4: CV Yükleme (Opsiyonel) veya Beceri Listesi Girişi
                │
                ▼
        [AI Analiz Ekranı]  ──► "Becerileriniz analiz ediliyor..." loading
                │
                ▼
        [Skill Gap Raporu]
                │
                ├── 🔴 Eksik Hard Skills (örn: Docker, TypeScript, SQL)
                ├── 🟡 Geliştirilmesi Gereken Soft Skills (örn: Sunum, Takım çalışması)
                └── 🟢 Mevcut Güçlü Yönler
                        │
                        ▼
                [Yol Haritası Görünümü]
                        │
                        ├── 📅 Haftalık Plan (bu hafta ne öğreneceğim)
                        ├── 📆 Aylık Hedefler (30-60-90 gün planı)
                        └── 📚 Kaynak Önerileri (kurs, video, proje)
                                │
                                ▼
                        [Ana Dashboard]
                                │
                                ├── 📊 İlerleme Göstergesi (%)
                                ├── 🏆 Kazanılan Rozetler
                                ├── 📝 Günlük Görevler
                                └── 🔔 Hatırlatmalar
```

---

## Ekran Listesi

| # | Ekran Adı | Açıklama |
|---|-----------|----------|
| 1 | Splash Screen | Logo animasyonu, 2 sn |
| 2 | Onboarding | 3 sayfalık tanıtım kaydırması |
| 3 | Auth Screen | Google / E-posta girişi |
| 4 | Profile Setup | 4 adımlı sihirbaz |
| 5 | CV Upload | PDF yükleme veya manuel giriş |
| 6 | AI Analysis | Analiz beklerken loading ekranı |
| 7 | Skill Gap Report | Eksik beceriler raporu |
| 8 | Roadmap View | Zaman çizelgesi görünümü |
| 9 | Dashboard | Ana ekran, ilerleme takibi |
| 10 | Resource Detail | Önerilen kurs/kaynak detayı |
| 11 | Progress Screen | Tamamlanan milestone'lar |
| 12 | Settings | Bildirim, profil düzenleme |

---

## Temel Kullanıcı Senaryosu

### Senaryo: Mehmet, 3. sınıf Bilgisayar Mühendisliği öğrencisi

1. Uygulamayı açar, Google ile giriş yapar
2. Hedefini seçer: **"Frontend Developer"**
3. CV'sini yükler (HTML/CSS bildiğini gösteriyor)
4. AI analiz eder:
   - ❌ **Eksik:** React, TypeScript, Git, REST API
   - ⚠️ **Geliştirilmeli:** Takım iletişimi, dokümantasyon yazımı
5. 12 haftalık yol haritası oluşturulur
6. İlk hafta görevi: "React resmi dokümantasyonu oku + To-Do App yap"
7. Görevi tamamlar → rozet kazanır → sonraki adıma geçer
