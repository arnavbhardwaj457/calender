"use client";

import { addMonths, isSameDay, parseISO, startOfMonth } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getOrderedRange, toISODate } from "@/lib/dateUtils";
import { CALENDAR_STORAGE_KEY, localStorageAdapter } from "@/lib/storage";

type ThemeMode = "light" | "dark";

type CalendarStore = {
  hydrated: boolean;
  currentMonthISO: string;
  rangeStartISO: string | null;
  rangeEndISO: string | null;
  hoverDateISO: string | null;
  notesByRange: Record<string, string>;
  notesByMonth: Record<string, string>;
  themeMode: ThemeMode;
  disablePastDates: boolean;
  heroColor: string;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToCurrentMonth: () => void;
  selectDate: (date: Date) => void;
  clearSelection: () => void;
  setHoverDate: (date: Date | null) => void;
  upsertRangeNote: (rangeKey: string, note: string) => void;
  upsertMonthNote: (monthKey: string, note: string) => void;
  setThemeMode: (themeMode: ThemeMode) => void;
  setDisablePastDates: (enabled: boolean) => void;
  setHeroColor: (hexColor: string) => void;
  setHydrated: (value: boolean) => void;
};

const today = new Date();

function parseStoreDate(isoDate: string | null) {
  return isoDate ? parseISO(isoDate) : null;
}

function shiftMonth(currentMonthISO: string, amount: number) {
  const currentMonth = parseISO(currentMonthISO);
  return toISODate(startOfMonth(addMonths(currentMonth, amount)));
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, get) => ({
      hydrated: false,
      currentMonthISO: toISODate(startOfMonth(today)),
      rangeStartISO: null,
      rangeEndISO: null,
      hoverDateISO: null,
      notesByRange: {},
      notesByMonth: {},
      themeMode: "light",
      disablePastDates: false,
      heroColor: "#2563eb",
      goToPrevMonth: () => {
        set((state) => ({
          currentMonthISO: shiftMonth(state.currentMonthISO, -1)
        }));
      },
      goToNextMonth: () => {
        set((state) => ({
          currentMonthISO: shiftMonth(state.currentMonthISO, 1)
        }));
      },
      goToCurrentMonth: () => {
        set({
          currentMonthISO: toISODate(startOfMonth(today))
        });
      },
      selectDate: (date) => {
        const clicked = toISODate(date);
        const { rangeStartISO, rangeEndISO } = get();

        if (rangeStartISO && rangeEndISO) {
          if (rangeStartISO === rangeEndISO && rangeStartISO === clicked) {
            set({
              rangeStartISO: null,
              rangeEndISO: null,
              hoverDateISO: null
            });
            return;
          }

          set({
            rangeStartISO: clicked,
            rangeEndISO: null,
            hoverDateISO: null
          });
          return;
        }

        if (!rangeStartISO) {
          set({
            rangeStartISO: clicked,
            rangeEndISO: null
          });
          return;
        }

        if (rangeStartISO && !rangeEndISO) {
          const startDate = parseStoreDate(rangeStartISO);
          const clickedDate = parseStoreDate(clicked);

          if (!startDate || !clickedDate) {
            set({
              rangeStartISO: clicked,
              rangeEndISO: null,
              hoverDateISO: null
            });
            return;
          }

          if (isSameDay(startDate, clickedDate)) {
            set({
              rangeStartISO: clicked,
              rangeEndISO: clicked,
              hoverDateISO: null
            });
            return;
          }

          const ordered = getOrderedRange(startDate, clickedDate);
          set({
            rangeStartISO: toISODate(ordered.start),
            rangeEndISO: toISODate(ordered.end),
            hoverDateISO: null
          });
        }
      },
      clearSelection: () => {
        set({
          rangeStartISO: null,
          rangeEndISO: null,
          hoverDateISO: null
        });
      },
      setHoverDate: (date) => {
        set((state) => {
          if (!state.rangeStartISO || state.rangeEndISO) {
            return { hoverDateISO: null };
          }

          return {
            hoverDateISO: date ? toISODate(date) : null
          };
        });
      },
      upsertRangeNote: (rangeKey, note) => {
        set((state) => ({
          notesByRange: {
            ...state.notesByRange,
            [rangeKey]: note
          }
        }));
      },
      upsertMonthNote: (monthKey, note) => {
        set((state) => ({
          notesByMonth: {
            ...state.notesByMonth,
            [monthKey]: note
          }
        }));
      },
      setThemeMode: (themeMode) => {
        set({ themeMode });
      },
      setDisablePastDates: (enabled) => {
        set({ disablePastDates: enabled });
      },
      setHeroColor: (hexColor) => {
        set({ heroColor: hexColor });
      },
      setHydrated: (value) => {
        set({ hydrated: value });
      }
    }),
    {
      name: CALENDAR_STORAGE_KEY,
      storage: createJSONStorage(() => localStorageAdapter),
      partialize: (state) => ({
        currentMonthISO: state.currentMonthISO,
        rangeStartISO: state.rangeStartISO,
        rangeEndISO: state.rangeEndISO,
        notesByRange: state.notesByRange,
        notesByMonth: state.notesByMonth,
        themeMode: state.themeMode,
        disablePastDates: state.disablePastDates,
        heroColor: state.heroColor
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      }
    }
  )
);
