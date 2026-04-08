"use client";

import { format } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type HeaderProps = {
  monthDate: Date;
  themeMode: "light" | "dark";
  disablePastDates: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onToggleTheme: () => void;
  onTogglePastDates: (enabled: boolean) => void;
};

export function Header({
  monthDate,
  themeMode,
  disablePastDates,
  onPrevMonth,
  onNextMonth,
  onToday,
  onToggleTheme,
  onTogglePastDates
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-border/80 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Interactive Wall Calendar
          </p>
          <h1 className="font-serif text-3xl font-medium leading-tight sm:text-4xl">
            {format(monthDate, "MMMM yyyy")}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrevMonth}
            aria-label="Go to previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={onToday} className="hidden sm:inline-flex">
            <CalendarDays className="h-4 w-4" />
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={onToday} className="sm:hidden" aria-label="Go to current month">
            <CalendarDays className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNextMonth} aria-label="Go to next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/55 px-3 py-2">
          <span className="text-sm font-medium">Disable past dates</span>
          <Switch
            checked={disablePastDates}
            onCheckedChange={onTogglePastDates}
            aria-label="Toggle disabled past dates"
          />
        </div>

        <Button variant="ghost" onClick={onToggleTheme} className="justify-start sm:justify-center">
          {themeMode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {themeMode === "dark" ? "Light mode" : "Dark mode"}
        </Button>
      </div>
    </header>
  );
}
