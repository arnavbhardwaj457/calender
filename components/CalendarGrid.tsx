"use client";

import { AnimatePresence, motion } from "framer-motion";
import { format, isBefore, isSameDay, parseISO, startOfDay } from "date-fns";
import { useMemo, useRef } from "react";

import { DayCell } from "@/components/DayCell";
import { getCalendarDays, getOrderedRange, WEEK_DAYS } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";

type CalendarGridProps = {
  monthDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  disablePastDates: boolean;
  onSelectDate: (date: Date) => void;
  onHoverDate: (date: Date | null) => void;
};

export function CalendarGrid({
  monthDate,
  startDate,
  endDate,
  hoverDate,
  disablePastDates,
  onSelectDate,
  onHoverDate
}: CalendarGridProps) {
  const cellRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const days = useMemo(() => getCalendarDays(monthDate), [monthDate]);
  const panelKey = format(monthDate, "yyyy-MM");
  const today = startOfDay(new Date());

  const previewRange =
    startDate && !endDate && hoverDate ? getOrderedRange(startDate, hoverDate) : null;
  const selectedRange = startDate && endDate ? getOrderedRange(startDate, endDate) : null;

  return (
    <section
      className="glass-card border-border/70 p-3 sm:p-4"
      onKeyDown={(event) => {
        const active = event.target as HTMLElement | null;
        if (!active) {
          return;
        }

        const activeDateISO = active.getAttribute("data-date");
        if (!activeDateISO) {
          return;
        }

        const activeDate = parseISO(activeDateISO);
        const offsets: Record<string, number> = {
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: -7,
          ArrowDown: 7
        };

        if (event.key in offsets) {
          event.preventDefault();
          const targetDate = new Date(activeDate);
          targetDate.setDate(targetDate.getDate() + offsets[event.key]);
          const targetISO = format(targetDate, "yyyy-MM-dd");
          cellRefs.current[targetISO]?.focus();
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelectDate(activeDate);
        }
      }}
    >
      <div className="mb-3 grid grid-cols-7 gap-2">
        {WEEK_DAYS.map((day) => (
          <p
            key={day}
            className="px-1 text-center text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
          >
            {day}
          </p>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={panelKey}
          initial={{ rotateX: -10, opacity: 0, y: 12 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 10, opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ transformOrigin: "top center", perspective: 1000 }}
          className="grid grid-cols-7 gap-2"
          role="grid"
          aria-label={`Calendar for ${format(monthDate, "MMMM yyyy")}`}
        >
          {days.map((day) => {
            const disabledForPast = disablePastDates && isBefore(day.date, today);
            const isDisabled = disabledForPast || !day.isCurrentMonth;
            const isSelectedStart = !!startDate && isSameDay(day.date, startDate);
            const isSelectedEnd = !!endDate && isSameDay(day.date, endDate);
            const isInSelectedRange =
              !!selectedRange &&
              day.date >= selectedRange.start &&
              day.date <= selectedRange.end &&
              !isSelectedStart &&
              !isSelectedEnd;
            const isInPreviewRange =
              !!previewRange &&
              day.date >= previewRange.start &&
              day.date <= previewRange.end &&
              !isSelectedStart &&
              !isSelectedEnd;

            return (
              <div
                key={day.iso}
                className={cn(
                  "rounded-xl",
                  isSelectedStart && "bg-[var(--hero-accent-soft)]",
                  isSelectedEnd && "bg-[var(--hero-accent-faint)]"
                )}
              >
                <DayCell
                  ref={(node) => {
                    cellRefs.current[day.iso] = node;
                  }}
                  dayNumber={Number(format(day.date, "d"))}
                  isoDate={day.iso}
                  isCurrentMonth={day.isCurrentMonth}
                  isToday={day.isToday}
                  isDisabled={isDisabled}
                  isSelectedStart={isSelectedStart}
                  isSelectedEnd={isSelectedEnd}
                  isInRange={isInSelectedRange}
                  isPreviewRange={isInPreviewRange}
                  holidayLabel={day.holidayLabel}
                  onSelect={() => onSelectDate(day.date)}
                  onHover={() => onHoverDate(day.date)}
                  onLeave={() => onHoverDate(null)}
                />
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
