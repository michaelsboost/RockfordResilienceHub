# 🏙️ Rockford Resilience Hub

![](https://raw.githubusercontent.com/michaelsboost/RockfordResilienceHub/main/imgs/screenshot.jpeg)

## 🌟 Overview
The **Rockford Resilience Hub** is a **lightweight, offline-first community directory** built to connect residents, responders, and organizations across Rockford, Illinois to essential **local resources for food, shelter, health, safety, and sustainability**.

This single-file web app runs **entirely in your browser** with full offline capability. It’s fast, portable, and open source — designed for **emergency use and long-term community resilience**.

[![MIT License](https://img.shields.io/github/license/michaelsboost/RockfordResilienceHub)](LICENSE) [![GitHub Stars](https://img.shields.io/github/stars/michaelsboost/RockfordResilienceHub)](https://github.com/michaelsboost/RockfordResilienceHub/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/michaelsboost/RockfordResilienceHub)](https://github.com/michaelsboost/RockfordResilienceHub/issues)

> 🛠️ **Built with Alpine.js & TailwindCSS**  
> No frameworks, no dependencies — just clean, resilient web technology.

**Originally Developed by:** [Michael Schwartz](https://michaelsboost.com/)  
**Maintained by:** The Community (as of October 31st, 2025)

---

## 🚀 Launch the App
🌍 **Live Demo:** [Rockford Resilience Hub](https://michaelsboost.com/RockfordResilienceHub/)  
📱 **PWA Ready:** Install on your device for **offline use** during outages or emergencies.

---

## 🧩 Features

### 🔍 Resource Directory
- 150+ verified local resources organized by category and neighborhood.  
- Filter by **type, tag, location, or distance** (when location permissions are granted).  
- Includes food access, housing, emergency aid, digital tools, sustainability, and more.

### ⚠️ Crisis Alert System
- Editable banner for urgent community updates (e.g., outages, closures, aid events).  
- Alert text persists across sessions with LocalStorage.

### 🛠️ Full CRUD Interface
- Add, edit, duplicate, or delete resources directly in the app.  
- Export and import your dataset as JSON or CSV.  
- Supports **verification tracking** and internal notes for maintainers.

### 📡 Offline-First Design
- Uses a service worker for full offline use.  
- All data stored locally in the browser — no servers required.  
- Perfect for **low-connectivity or grid-down** scenarios.

### 🖨️ Print-Optimized View
- Clean, responsive layout for printing and physical distribution.  
- Ideal for community boards or emergency kits.

### 🌙 Dark Mode & Accessibility
- Manual dark/light toggle with saved preference.  
- Updates system theme colors for installed PWAs.  
- Keyboard-navigable interface with ARIA labeling.

---

## 🧰 Technical Stack
- **HTML + Alpine.js** (state & interactivity)
- **TailwindCSS** (custom Roku-purple palette & responsive design)
- **PWA Service Worker** (offline caching)
- **LocalStorage** (persistent resource data)
- **No Build Dependencies** – Just open `index.html`

---

## 🧠 Data Model Highlights
Each resource includes:
```json
{
  "id": "rockford-tool-library",
  "name": "Rockford Tool Library",
  "category": "Self-Reliance Resources",
  "description": "Borrow tools for home repair, gardening, and projects.",
  "address": "415 E State St, Rockford, IL 61104",
  "hours": "Tue–Thu 4pm–7pm, Sat 10am–2pm",
  "contact": "(815) 555-TOOL",
  "website": "",
  "tags": ["tools", "repair", "diy"],
  "neighborhood": "Near East",
  "languages": ["English"],
  "status": "active",
  "verification_date": "2025-10-29"
}
```

---

## ⚡ Getting Started

### 1️⃣ Clone or Download
```bash
git clone https://github.com/michaelsboost/RockfordResilienceHub.git
cd RockfordResilienceHub
```

### 2️⃣ Run Locally
Simply open `index.html` in your browser — everything runs client-side.

### 3️⃣ Optional Build Commands (for maintainers)
If you want to minify or recompile assets:
```bash
npm install
npm run build
```
This will:
- Compile and minify TailwindCSS → `dist/bundle.css`
- Minify inline JS or external scripts → `dist/script.js`

---

## 🤝 Contributing
Community contributions are encouraged!  
Fork the repo and help verify, update, or expand resources for Rockford or your own city.

**Ways to help:**
- 🗺️ Add new resources or categories  
- 🔧 Fix outdated info or hours  
- 🌐 Translate for other languages  
- 🧭 Fork it to create your own city hub  

If this model works for your area, fork the project and customize `resources`, `meta`, and `branding` for your city.

---

## 🪶 License
This project is licensed under the **MIT License**.  
Feel free to use, remix, and deploy it for your community.

---

## ☕ Support the Developer
If this project helps your community, here are some ways you can show support:

[![ko-fi](https://storage.ko-fi.com/cdn/useruploads/d666bcdd-8d38-47d4-b78b-018d4b726d48.png)](https://ko-fi.com/michaelsboost)

* 🎨 [DeviantArt Store](https://deviantart.com/michaelsboost/prints)  
* 👕 [Merch Store](https://michaelsboost.com/gear)  
* 📚 [Learn Design](https://michaelsboost.com/graphicdesign)  
* 🛒 [Visit Store](https://michaelsboost.com/store)  
* 💙 [Support via PayPal](https://michaelsboost.com/donate)  
* 💸 [Support via SquareCash](https://cash.me/$michaelsboost)

Your support helps keep this project free, open-source, and constantly improving. 🚀