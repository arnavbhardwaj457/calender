import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function normalizeHex(hex: string) {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    return clean
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }

  return clean.slice(0, 6);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function adjustHex(hex: string, amount: number) {
  const normalized = normalizeHex(hex);
  const r = clamp(parseInt(normalized.slice(0, 2), 16) + amount, 0, 255);
  const g = clamp(parseInt(normalized.slice(2, 4), 16) + amount, 0, 255);
  const b = clamp(parseInt(normalized.slice(4, 6), 16) + amount, 0, 255);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
}

export function hexToRgba(hex: string, alpha: number) {
  const normalized = normalizeHex(hex);
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha, 0, 1)})`;
}
