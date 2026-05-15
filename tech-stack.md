# 🛠️ tech-stack.md — EduAI-Bridge

## Teknoloji Yığını

### 📱 Frontend (Mobil Uygulama)

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|----------|----------------|
| **Flutter** | 3.x | Cross-platform mobil geliştirme |
| **Dart** | 3.x | Uygulama dili |
| **Riverpod** | 2.x | State management |
| **Go Router** | 13.x | Navigasyon yönetimi |
| **Dio** | 5.x | HTTP istekleri |
| **Flutter Animate** | 4.x | Animasyonlar |
| **Lottie** | 3.x | Loading / başarı animasyonları |

### 🔥 Backend & Altyapı

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| **Firebase Auth** | Kullanıcı kimlik doğrulama (Google + E-posta) |
| **Cloud Firestore** | Kullanıcı profili, yol haritası, ilerleme verisi |
| **Firebase Storage** | CV/PDF dosya depolama |
| **Cloud Functions** | AI API çağrıları (Node.js) |
| **Firebase Hosting** | Web demo yayını |

### 🤖 Yapay Zeka

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| **Anthropic Claude API** | Skill analizi, yol haritası üretimi, kaynak önerileri |
| **claude-sonnet-4-20250514** | Ana model (hız/kalite dengesi) |

**AI Prompt Stratejisi:**
```
Sistem: Sen bir kariyer koçusun. Kullanıcının CV'sini ve hedef pozisyonunu analiz et.
Çıktı: JSON formatında { hardSkillGaps, softSkillGaps, weeklyPlan, resources }
```

### 📊 Analitik & İzleme

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| **Firebase Analytics** | Kullanıcı davranışı takibi |
| **Crashlytics** | Hata raporlama |
| **Firebase Performance** | Uygulama performans izleme |

---

## Mimari

```
┌─────────────────────────────────────────┐
│           Flutter Uygulaması             │
│  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  Screens  │  │ Widgets  │  │Models  │ │
│  └────┬─────┘  └──────────┘  └────────┘ │
│       │                                  │
│  ┌────▼──────────────────────────────┐   │
│  │         Riverpod Providers         │   │
│  └────┬──────────────────────────────┘   │
│       │                                  │
│  ┌────▼──────────────────────────────┐   │
│  │           Service Layer            │   │
│  │  AuthService │ AIService │ DBService│  │
│  └────┬──────────────────────────────┘   │
└───────┼──────────────────────────────────┘
        │
   ┌────▼──────────────────────────┐
   │         Firebase               │
   │  Auth │ Firestore │ Storage    │
   │  Functions (Node.js)           │
   └────┬──────────────────────────┘
        │
   ┌────▼──────────────────────────┐
   │      Anthropic Claude API      │
   └───────────────────────────────┘
```

---

## Klasör Yapısı (Flutter)

```
lib/
├── main.dart
├── app/
│   ├── router.dart
│   └── theme.dart
├── features/
│   ├── onboarding/
│   │   ├── screens/
│   │   └── widgets/
│   ├── auth/
│   │   ├── screens/
│   │   └── providers/
│   ├── cv_upload/
│   │   ├── screens/
│   │   └── services/
│   ├── skill_analysis/
│   │   ├── models/
│   │   ├── screens/
│   │   └── providers/
│   ├── roadmap/
│   │   ├── models/
│   │   ├── screens/
│   │   └── widgets/
│   └── progress/
│       ├── screens/
│       └── providers/
├── shared/
│   ├── widgets/
│   ├── models/
│   └── utils/
└── services/
    ├── firebase_service.dart
    ├── ai_service.dart
    └── storage_service.dart
```

---

## Ortam Değişkenleri (.env)

```env
ANTHROPIC_API_KEY=sk-ant-...
FIREBASE_PROJECT_ID=eduai-bridge
```

## Bağımlılıklar (pubspec.yaml — özet)

```yaml
dependencies:
  flutter_riverpod: ^2.5.0
  go_router: ^13.0.0
  dio: ^5.4.0
  firebase_core: ^3.0.0
  firebase_auth: ^5.0.0
  cloud_firestore: ^5.0.0
  firebase_storage: ^12.0.0
  flutter_animate: ^4.5.0
  file_picker: ^8.0.0
  lottie: ^3.1.0
```
