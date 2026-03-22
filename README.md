# 🔦 Taschenlampen-App

Eine einfache Progressive Web App (PWA), die die Handy-Taschenlampe steuert.

## ⚡ Schnellstart

### 1️⃣ App online stellen (EINFACHSTE METHODE):

**Via GitHub Pages:**
1. Gehe zu https://github.com
2. Erstelle neues Repository: `taschenlampe-app`
3. Lade alle Dateien hoch (drag & drop)
4. Settings → Pages → Source: "main" → Save
5. Deine App ist online unter: `https://DEIN-USERNAME.github.io/taschenlampe-app`

### 2️⃣ Auf Handy installieren:

**Android (Chrome):**
- Öffne die URL in Chrome
- Tippe auf "App installieren" oder ⋮ → "Zum Startbildschirm"

**iOS (Safari):**
- Öffne die URL in Safari
- Tippe auf Teilen-Symbol → "Zum Home-Bildschirm"

### 3️⃣ Benutzen:

- Öffne die App vom Homescreen
- Tippe auf den Button = Licht AN/AUS 💡
- Debug-Button (oben rechts) zeigt Logs

## 📋 Dateien

```
taschenlampe-app/
├── index.html      # UI der App
├── app.js          # Taschenlampen-Logik + Debug
├── sw.js           # Service Worker (Offline)
├── manifest.json   # PWA-Config
├── icon-192.png    # App-Icon (klein)
├── icon-512.png    # App-Icon (groß)
└── ANLEITUNG.md    # Ausführliche Anleitung
```

## ⚙️ Funktionen

✅ Ein/Aus-Schalten der Taschenlampe
✅ Funktioniert offline (nach erstem Laden)
✅ Debug-Modus für Fehlersuche
✅ Installierbar wie native App
✅ Automatisches Ausschalten beim Verlassen

## 🧪 Testen

**Lokaler Test:**
```bash
python3 -m http.server 8000
# Dann auf Handy (gleiches WLAN): http://DEINE-IP:8000
```

**Debug-Modus aktivieren:**
- In der App oben rechts auf "Debug" tippen
- Zeigt alle Logs und Fehler

## ⚠️ Wichtig

- **Android:** Nur Chrome Browser unterstützt
- **iOS:** Eingeschränkte Unterstützung (Apple-Limitation)
- **HTTPS erforderlich:** Lokale Tests nur über IP, online über HTTPS
- **Kamera-Berechtigung:** Muss erteilt werden

## 🐛 Probleme?

1. Prüfe Debug-Log in der App
2. Erlaube Kamera-Berechtigung
3. Nutze Chrome (Android) oder Safari (iOS)
4. Siehe `ANLEITUNG.md` für Details

## 📱 Kompatibilität

| Browser | Android | iOS |
|---------|---------|-----|
| Chrome  | ✅      | ❌  |
| Safari  | ❌      | ⚠️  |
| Firefox | ❌      | ❌  |

✅ = Funktioniert  
⚠️ = Eingeschränkt  
❌ = Nicht unterstützt

## 📖 Mehr Infos

Siehe `ANLEITUNG.md` für:
- Detaillierte Installation
- Erweiterte Debug-Optionen
- Fehlerbehebung
- Entwickler-Infos
