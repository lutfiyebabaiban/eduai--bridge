# 🎓 EduAI-Bridge

> **Teorik bilgi ile sektör beklentileri arasındaki köprü.**

EduAI-Bridge, üniversite öğrencilerinin özgeçmişlerini veya ilgi alanlarını analiz ederek hedefledikleri kariyer için eksik olan **soft** ve **hard** yetenekleri tespit eden ve kişiselleştirilmiş bir öğrenme yol haritası sunan yapay zeka destekli mobil uygulamadır.

---

## 🚀 Demo & Yayın

| Platform | Link |
|----------|------|
| 🌐 Web Demo | [eduai-bridge.web.app](https://eduai-bridge.web.app) *(yakında)* |
| 📱 Google Play | *Yakında* |
| 🎥 Demo Video | *2-3 dk tanıtım videosu — yakında* |

---

## ✨ Özellikler

- 📄 **CV Analizi** — Özgeçmişinizi yükleyin, AI eksik becerilerinizi tespit etsin
- 🎯 **Kariyer Hedefleme** — Hedef pozisyonunuzu seçin, size özel yol haritası alın
- 🗺️ **Kişisel Yol Haritası** — Haftalık/aylık öğrenme planı
- 💡 **Soft & Hard Skill Analizi** — İki boyutlu beceri değerlendirmesi
- 📚 **Kaynak Önerileri** — Kurs, kitap, proje önerileri
- 📊 **İlerleme Takibi** — Skill gelişiminizi görsel olarak izleyin

---

## 🛠️ Teknoloji Stack

Detaylar için → [`tech-stack.md`](./tech-stack.md)

- **Frontend:** Flutter (Dart)
- **Backend:** Firebase + Node.js
- **AI:** Claude API (Anthropic)
- **State Management:** Riverpod
- **Auth:** Firebase Authentication

---

## 📁 Proje Yapısı

```
eduai-bridge/
├── README.md
├── idea.md
├── user-flow.md
├── tech-stack.md
├── features/
│   ├── onboarding/
│   ├── cv_upload/
│   ├── skill_analysis/
│   ├── roadmap/
│   └── progress/
├── lib/
│   ├── main.dart
│   ├── models/
│   ├── services/
│   ├── screens/
│   └── widgets/
└── pubspec.yaml
```

---

## ⚙️ Kurulum

```bash
# Repoyu klonla
git clone https://github.com/kullanici-adi/eduai-bridge.git
cd eduai-bridge

# Bağımlılıkları yükle
flutter pub get

# Firebase yapılandırmasını ekle
# google-services.json → android/app/
# GoogleService-Info.plist → ios/Runner/

# .env dosyasını oluştur
cp .env.example .env
# ANTHROPIC_API_KEY=sk-...

# Uygulamayı çalıştır
flutter run
```

---

## 👤 Kullanıcı Akışı

Detaylar için → [`user-flow.md`](./user-flow.md)

---

## 💡 Fikir & Problem

Detaylar için → [`idea.md`](./idea.md)

---

## 📄 Lisans

MIT License — özgürce kullanabilirsiniz.
