import { writable } from "svelte/store";

export const nextChapterData = writable<any>(null);
export const currentChapterData = writable<any>(null);
export const previousChapterData = writable<any>(null);