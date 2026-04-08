# Interactive Wall Calendar

Production-ready Next.js App Router project for an interactive wall calendar with animated date-range selection, hero-synced theming, and localStorage-backed notes.

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- shadcn/ui-style components
- date-fns
- Zustand (state management)
- localStorage (persistence)
- Framer Motion (animations)

## Features

- Wall-calendar style layout with:
  - Hero image panel
  - Month/year header
  - 7-column calendar grid
  - Notes panel
- Date range selection:
  - Start/end styling
  - In-between highlight
  - Hover preview animation
  - Reverse selection support
  - Same-day selection support
  - Reset behavior on repeated click
- Notes:
  - Notes per selected date range
  - Monthly notes
  - Auto-saved and restored from localStorage
- UX polish:
  - Today indicator
  - Holiday markers (mock data)
  - Month prev/next + today jump
  - Page-flip month animation
  - Click ripple + subtle scale micro-interactions
  - Keyboard navigation in grid (arrows + Enter/Space)
  - Optional disable past dates toggle
- Theming:
  - Hero image dominant color extraction
  - Dynamic accent tokens applied across the UI
  - Dark/light mode toggle
- Deployment-ready:
  - Vercel-ready configuration
  - Custom title + favicon

## Folder Structure

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

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Production

Build and run:

```bash
npm run build
npm run start
```

## Deploy on Vercel

1. Push this project to a Git provider (GitHub/GitLab/Bitbucket).
2. Import the repository in Vercel.
3. Framework preset should auto-detect as Next.js.
4. Click Deploy.

No extra env variables are required for this project.
