"use client";

import { motion } from "framer-motion";
import { type CSSProperties, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type DayCellProps = {
  dayNumber: number;
  isoDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isInRange: boolean;
  isPreviewRange: boolean;
  holidayLabel: string | null;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
};

export const DayCell = forwardRef<HTMLButtonElement, DayCellProps>(
  (
    {
      dayNumber,
      isoDate,
      isCurrentMonth,
      isToday,
      isDisabled,
      isSelectedStart,
      isSelectedEnd,
      isInRange,
      isPreviewRange,
      holidayLabel,
      onSelect,
      onHover,
      onLeave
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const isSelected = isSelectedStart || isSelectedEnd;
    const backgroundStyle: CSSProperties = {};

    if (isSelectedStart) {
      backgroundStyle.backgroundColor = "var(--hero-accent)";
      backgroundStyle.color = "white";
    }

    if (isSelectedEnd) {
      backgroundStyle.backgroundColor = "var(--hero-accent-strong)";
      backgroundStyle.color = "white";
    }

    if (!isSelected && isInRange) {
      backgroundStyle.backgroundColor = "var(--hero-accent-soft)";
    }

    if (!isSelected && !isInRange && isPreviewRange) {
      backgroundStyle.backgroundColor = "var(--hero-accent-faint)";
    }

    return (
      <motion.button
        ref={ref}
        type="button"
        data-date={isoDate}
        disabled={isDisabled}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onFocus={onHover}
        onBlur={onLeave}
        onPointerDown={(event) => {
          if (isDisabled) {
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * 1.6;
          const nextRipple: Ripple = {
            id: Date.now() + Math.random(),
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
            size
          };

          setRipples((previous) => [...previous, nextRipple]);
          window.setTimeout(() => {
            setRipples((previous) => previous.filter((ripple) => ripple.id !== nextRipple.id));
          }, 460);
        }}
        onClick={onSelect}
        whileTap={{ scale: isDisabled ? 1 : 0.96 }}
        whileHover={{ scale: isDisabled ? 1 : 1.03 }}
        transition={{ type: "spring", stiffness: 420, damping: 25 }}
        aria-label={`${isoDate}${holidayLabel ? `, ${holidayLabel}` : ""}`}
        aria-pressed={isSelected || isInRange}
        aria-current={isToday ? "date" : undefined}
        className={cn(
          "group relative isolate h-14 w-full overflow-hidden rounded-xl border border-transparent text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hero-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "bg-white/55 shadow-sm dark:bg-slate-800/55",
          isCurrentMonth ? "text-foreground" : "text-muted-foreground",
          isDisabled && "cursor-not-allowed opacity-40",
          !isDisabled && "hover:shadow-md",
          isSelected && "shadow-lg ring-1 ring-black/10 dark:ring-white/20"
        )}
        style={backgroundStyle}
      >
        <span className="relative z-10">{dayNumber}</span>

        {isToday && (
          <span className="absolute bottom-1 left-1/2 z-10 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose-500" />
        )}

        {holidayLabel && (
          <span
            className="absolute right-1.5 top-1.5 z-10 h-2 w-2 rounded-full bg-emerald-500"
            title={holidayLabel}
            aria-label={holidayLabel}
          />
        )}

        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full bg-white/45 dark:bg-white/20"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              animation: "ripple 460ms ease-out forwards"
            }}
          />
        ))}
      </motion.button>
    );
  }
);

DayCell.displayName = "DayCell";
