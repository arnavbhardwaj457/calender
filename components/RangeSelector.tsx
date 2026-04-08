"use client";

import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RangeSelectorProps = {
  startDate: Date | null;
  endDate: Date | null;
  rangeLabel: string;
  onClear: () => void;
};

export function RangeSelector({ startDate, endDate, rangeLabel, onClear }: RangeSelectorProps) {
  return (
    <section className="glass-card mb-4 flex flex-wrap items-center justify-between gap-3 border-border/70 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-[var(--hero-accent)] text-white">Range</Badge>
        <p className="text-sm font-medium">{rangeLabel}</p>

        {startDate && (
          <Badge className="border-transparent bg-[var(--hero-accent)]/15 text-foreground">
            Start: {format(startDate, "MMM d")}
          </Badge>
        )}

        {endDate && (
          <Badge className="border-transparent bg-[var(--hero-accent-strong)]/15 text-foreground">
            End: {format(endDate, "MMM d")}
          </Badge>
        )}
      </div>

      <Button variant="outline" size="sm" onClick={onClear} disabled={!startDate && !endDate}>
        Clear selection
      </Button>
    </section>
  );
}
