"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

import { Card } from "@/components/ui/card";

type HeroImageProps = {
  monthDate: Date;
  onThemeColorExtracted: (hexColor: string) => void;
};

type HeroSlide = {
  src: string;
  title: string;
  subtitle: string;
};

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero/dawn.svg",
    title: "Golden Dawn",
    subtitle: "Plan bright starts and purposeful finishes."
  },
  {
    src: "/hero/forest.svg",
    title: "Evergreen Focus",
    subtitle: "Keep momentum steady all month."
  },
  {
    src: "/hero/ocean.svg",
    title: "Deep Blue Drift",
    subtitle: "Balance calm routines with big wins."
  },
  {
    src: "/hero/sand.svg",
    title: "Sunlit Horizon",
    subtitle: "Leave room for ideas to stretch."
  }
];

function rgbToHex(r: number, g: number, b: number) {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`;
}

function extractDominantColor(image: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return "#2563eb";
  }

  canvas.width = 36;
  canvas.height = 36;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;

  for (let index = 0; index < data.length; index += 8) {
    const alpha = data[index + 3];
    if (alpha < 120) {
      continue;
    }

    r += data[index];
    g += data[index + 1];
    b += data[index + 2];
    count += 1;
  }

  if (!count) {
    return "#2563eb";
  }

  return rgbToHex(Math.round(r / count), Math.round(g / count), Math.round(b / count));
}

export function HeroImage({ monthDate, onThemeColorExtracted }: HeroImageProps) {
  const activeSlide = useMemo(() => HERO_SLIDES[monthDate.getMonth() % HERO_SLIDES.length], [monthDate]);
  const monthKey = `${monthDate.getFullYear()}-${monthDate.getMonth() + 1}`;

  return (
    <Card className="calendar-texture relative overflow-hidden border-white/30">
      <motion.div
        key={monthKey}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative h-full min-h-[240px] w-full"
      >
        <Image
          src={activeSlide.src}
          alt={activeSlide.title}
          fill
          priority
          className="rounded-2xl object-cover"
          onLoad={(event) => {
            onThemeColorExtracted(extractDominantColor(event.currentTarget as HTMLImageElement));
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="font-serif text-2xl">{activeSlide.title}</p>
          <p className="mt-1 text-sm text-white/85">{activeSlide.subtitle}</p>
        </div>
      </motion.div>
    </Card>
  );
}
