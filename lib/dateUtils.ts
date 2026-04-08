import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek
} from "date-fns";

export type OrderedRange = {
  start: Date;
  end: Date;
};

export type CalendarDay = {
  date: Date;
  iso: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  holidayLabel: string | null;
};

export const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const HOLIDAY_MOCK: Record<string, string> = {
  "01-01": "New Year",
  "02-14": "Valentine's Day",
  "03-17": "St. Patrick's Day",
  "05-26": "Memorial Day",
  "07-04": "Independence Day",
  "09-01": "Labor Day",
  "10-31": "Halloween",
  "11-27": "Thanksgiving",
  "12-25": "Christmas"
};

export function toISODate(date: Date) {
  return format(startOfDay(date), "yyyy-MM-dd");
}

export function parseISODate(iso: string | null) {
  return iso ? startOfDay(parseISO(iso)) : null;
}

export function getMonthKey(date: Date) {
  return format(date, "yyyy-MM");
}

export function getOrderedRange(startDate: Date, endDate: Date): OrderedRange {
  if (startDate <= endDate) {
    return { start: startOfDay(startDate), end: startOfDay(endDate) };
  }

  return { start: startOfDay(endDate), end: startOfDay(startDate) };
}

export function getRangeKey(startDate: Date, endDate: Date) {
  const ordered = getOrderedRange(startDate, endDate);
  return `${toISODate(ordered.start)}__${toISODate(ordered.end)}`;
}

export function getRangeLabel(startDate: Date | null, endDate: Date | null) {
  if (!startDate && !endDate) {
    return "No range selected";
  }

  if (startDate && !endDate) {
    return `${format(startDate, "EEE, MMM d")} (select end date)`;
  }

  if (startDate && endDate && isSameDay(startDate, endDate)) {
    return format(startDate, "EEE, MMM d");
  }

  if (startDate && endDate) {
    const ordered = getOrderedRange(startDate, endDate);
    return `${format(ordered.start, "MMM d")} - ${format(ordered.end, "MMM d, yyyy")}`;
  }

  return "No range selected";
}

export function isDateInRange(date: Date, startDate: Date | null, endDate: Date | null) {
  if (!startDate || !endDate) {
    return false;
  }

  const ordered = getOrderedRange(startDate, endDate);
  return isWithinInterval(date, ordered);
}

export function getCalendarDays(monthDate: Date): CalendarDay[] {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => ({
    date,
    iso: toISODate(date),
    isCurrentMonth: format(date, "yyyy-MM") === format(monthDate, "yyyy-MM"),
    isToday: isSameDay(date, new Date()),
    holidayLabel: HOLIDAY_MOCK[format(date, "MM-dd")] ?? null
  }));
}
