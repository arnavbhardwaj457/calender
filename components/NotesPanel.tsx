"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type NotesPanelProps = {
  monthLabel: string;
  monthNote: string;
  rangeLabel: string;
  rangeNote: string;
  hasRangeSelection: boolean;
  onMonthNoteChange: (note: string) => void;
  onRangeNoteChange: (note: string) => void;
};

export function NotesPanel({
  monthLabel,
  monthNote,
  rangeLabel,
  rangeNote,
  hasRangeSelection,
  onMonthNoteChange,
  onRangeNoteChange
}: NotesPanelProps) {
  const [activeTab, setActiveTab] = useState<"range" | "month">(hasRangeSelection ? "range" : "month");
  const resolvedTab = hasRangeSelection ? activeTab : "month";

  return (
    <Card className="h-full border-white/35">
      <CardHeader className="space-y-3">
        <CardTitle className="font-serif text-2xl">Notes</CardTitle>
        <CardDescription>Saved automatically to localStorage.</CardDescription>
        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/55 p-1">
          <Button
            size="sm"
            variant={resolvedTab === "range" ? "default" : "ghost"}
            className={cn("flex-1", resolvedTab === "range" && "shadow")}
            onClick={() => setActiveTab("range")}
            disabled={!hasRangeSelection}
          >
            Date Range
          </Button>
          <Button
            size="sm"
            variant={resolvedTab === "month" ? "default" : "ghost"}
            className={cn("flex-1", resolvedTab === "month" && "shadow")}
            onClick={() => setActiveTab("month")}
          >
            Month
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {resolvedTab === "range" ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-[var(--hero-accent)] text-white">Range note</Badge>
              <p className="text-sm text-muted-foreground">{rangeLabel}</p>
            </div>
            <Textarea
              value={rangeNote}
              onChange={(event) => onRangeNoteChange(event.target.value)}
              placeholder="Add plans, reminders, or goals for the selected range."
              aria-label="Notes for selected date range"
              className="min-h-[220px] resize-none"
              disabled={!hasRangeSelection}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                Monthly note
              </Badge>
              <p className="text-sm text-muted-foreground">{monthLabel}</p>
            </div>
            <Textarea
              value={monthNote}
              onChange={(event) => onMonthNoteChange(event.target.value)}
              placeholder="Capture monthly goals, habits, and highlights."
              aria-label="Notes for current month"
              className="min-h-[220px] resize-none"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
