# 📅 Interactive Wall Calendar

A production-ready interactive wall calendar built with Next.js App Router, featuring animated date-range selection, dynamic theming, and persistent notes.

🔗 **Live Demo:** https://wall-calendar-tuf-six.vercel.app/

---

## 🚀 Overview

This project was built as part of a frontend engineering challenge to transform a static wall calendar design into a fully interactive, responsive, and user-friendly web component.

It focuses on **clean UI design, smooth user interactions, and thoughtful UX details**, while maintaining a scalable component architecture.

---

## ✨ Key Features

### 📆 Wall Calendar Experience

* Hero image panel acting as a visual anchor
* Monthly calendar grid with clear hierarchy
* Integrated notes section

### 🎯 Date Range Selection

* Start & end date highlighting
* Continuous range visualization
* Hover preview before selection
* Reverse & same-day selection support
* Reset behavior on repeated clicks

### 📝 Notes System

* Add notes for selected date ranges
* Monthly notes support
* Persistent storage using localStorage

### 🎨 Dynamic Theming

* Extracts dominant colors from hero image
* Applies theme across UI for consistency
* Dark / Light mode toggle

### ⚡ UX Enhancements

* Today indicator
* Holiday markers (mock data)
* Smooth page-flip month transitions
* Micro-interactions (click ripple, scaling)
* Keyboard navigation (arrows + Enter/Space)
* Optional "disable past dates" toggle

### 📱 Fully Responsive

* Desktop: structured multi-panel layout
* Mobile: stacked, touch-friendly experience

---

## 🛠 Tech Stack

* **Next.js (App Router + TypeScript)**
* **Tailwind CSS**
* **Zustand** – state management
* **Framer Motion** – animations
* **date-fns** – date utilities
* **localStorage** – persistence

---

## 🧩 Architecture

The project follows a modular and reusable component structure:

```text
app/
components/
  Calendar.tsx
  CalendarGrid.tsx
  DayCell.tsx
  RangeSelector.tsx
  NotesPanel.tsx
  HeroImage.tsx
  Header.tsx
lib/
  dateUtils.ts
  storage.ts
store/
  useCalendarStore.ts
```

* Centralized state using Zustand
* Separation of UI and logic via `lib/` utilities
* Component-driven design for scalability

---

## ⚙️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

---

## 🚀 Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Deployment

This project is fully optimized for deployment on Vercel:

1. Push to GitHub / GitLab / Bitbucket
2. Import into Vercel
3. Deploy (auto-detects Next.js)

No environment variables required.

---

## 🎯 Highlights

* Focus on **UX polish and interaction design**
* Handles **edge cases** like reverse selection & same-day selection
* Clean and scalable **component architecture**
* Fully **frontend-only** solution as per challenge constraints

---

## 📌 Author

**Arnav Bhardwaj**

---

## 🙌 Acknowledgment

Built as part of a frontend engineering challenge to demonstrate UI engineering, state management, and responsive design skills.
