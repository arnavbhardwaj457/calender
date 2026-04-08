"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { type CSSProperties, useEffect, useMemo } from "react";

import { CalendarGrid } from "@/components/CalendarGrid";
import { Header } from "@/components/Header";
import { HeroImage } from "@/components/HeroImage";
import { NotesPanel } from "@/components/NotesPanel";
import { RangeSelector } from "@/components/RangeSelector";
import { getMonthKey, getRangeKey, getRangeLabel, parseISODate } from "@/lib/dateUtils";
import { adjustHex, hexToRgba } from "@/lib/utils";
import { useCalendarStore } from "@/store/useCalendarStore";

export function Calendar() {
  const {
    hydrated,
    currentMonthISO,
    rangeStartISO,
    rangeEndISO,
    hoverDateISO,
    notesByRange,
    notesByMonth,
    themeMode,
    disablePastDates,
    heroColor,
    goToPrevMonth,
    goToNextMonth,
    goToCurrentMonth,
    selectDate,
    clearSelection,
    setHoverDate,
    upsertRangeNote,
    upsertMonthNote,
    setThemeMode,
    setDisablePastDates,
    setHeroColor
  } = useCalendarStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  const monthDate = parseISODate(currentMonthISO) ?? new Date();
  const startDate = parseISODate(rangeStartISO);
  const endDate = parseISODate(rangeEndISO);
  const hoverDate = parseISODate(hoverDateISO);

  const monthKey = getMonthKey(monthDate);
  const rangeLabel = getRangeLabel(startDate, endDate);
  const monthLabel = format(monthDate, "MMMM yyyy");
  const activeRangeKey = startDate
    ? getRangeKey(startDate, endDate ?? startDate)
    : null;

  const themeStyle = useMemo(
    () =>
      ({
        "--hero-accent": heroColor,
        "--hero-accent-strong": adjustHex(heroColor, -34),
        "--hero-accent-soft": hexToRgba(heroColor, 0.24),
        "--hero-accent-faint": hexToRgba(heroColor, 0.14)
      }) as CSSProperties,
    [heroColor]
  );

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="glass-card h-[560px] animate-pulse border-border/40" />
      </div>
    );
  }

  return (
    <motion.div
      style={themeStyle}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto max-w-7xl"
    >
      <section className="glass-card overflow-hidden border-white/35">
        <Header
          monthDate={monthDate}
          themeMode={themeMode}
          disablePastDates={disablePastDates}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          onToday={goToCurrentMonth}
          onToggleTheme={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
          onTogglePastDates={setDisablePastDates}
        />

        <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <HeroImage monthDate={monthDate} onThemeColorExtracted={setHeroColor} />
          </div>

          <div className="lg:col-span-5">
            <RangeSelector
              startDate={startDate}
              endDate={endDate}
              rangeLabel={rangeLabel}
              onClear={clearSelection}
            />
            <CalendarGrid
              monthDate={monthDate}
              startDate={startDate}
              endDate={endDate}
              hoverDate={hoverDate}
              disablePastDates={disablePastDates}
              onSelectDate={selectDate}
              onHoverDate={setHoverDate}
            />
          </div>

          <div className="lg:col-span-3">
            <NotesPanel
              monthLabel={monthLabel}
              monthNote={notesByMonth[monthKey] ?? ""}
              rangeLabel={rangeLabel}
              rangeNote={activeRangeKey ? notesByRange[activeRangeKey] ?? "" : ""}
              hasRangeSelection={Boolean(startDate)}
              onMonthNoteChange={(note) => upsertMonthNote(monthKey, note)}
              onRangeNoteChange={(note) => {
                if (!activeRangeKey) {
                  return;
                }
                upsertRangeNote(activeRangeKey, note);
              }}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
