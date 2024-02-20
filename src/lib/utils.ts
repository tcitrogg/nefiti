import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
    y?: number;
    x?: number;
    start?: number;
    duration?: number;
};

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
    const style = getComputedStyle(node);
    const transform = style.transform === "none" ? "" : style.transform;

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number]
    ) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;

        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;

        return valueB;
    };

    const styleToString = (
        style: Record<string, number | string | undefined>
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str;
            return str + `${key}:${style[key]};`;
        }, "");
    };

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t
            });
        },
        easing: cubicOut
    };
};



// tcitrogg
import axios from "axios";
import { appinfo } from "./config";

export const noOutlineRingStyle = "outline-none ring-0"

export function titleCase(text: string) {
  const start = text.slice(0, 1).toUpperCase()
  const remaining = text.slice(1)
  return `${start}${remaining}`
}

export const getThumbnail = (data:any) => `https://api.allorigins.win/raw?url=https://mangadex.org/covers/${data.id}/${data.thumbnail?.attributes?.fileName}`

// Fetch an image using a proxy server
export const fetchImage = (url:any) => `https://api.allorigins.win/raw?url=${url}`

export const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const getRandomColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;

export const getTimestamp = () => new Date().getTime()

export const sortWithVolume = (data:any) => {
    // Create an object to store the grouped chapters
  const groupedChapters:any = {};

  // Iterate through each chapter
  for (const chapter of data.chapters) {
    let { volume, ...rest } = chapter.attributes; // Extract volume and other attributes
    if (volume === null) volume = 1

    // If the volume doesn't exist in the groupedChapters object, create an empty array
    if (!groupedChapters[volume]) {
      groupedChapters[volume] = [];
    }

    // Push the chapter (with only attributes) into the corresponding volume group
    groupedChapters[volume].push({
      id: chapter.id,
      type: chapter.type,
      ...rest
    });
  }

  // Convert the groupedChapters object into an array of objects
  return Object.entries(groupedChapters).map(([volume, chapters]: [any, any]) => ({
    volume,
    chapters: chapters.sort((a:any, b:any) => Number(a.chapter) - Number(b.chapter)),
  }));
}