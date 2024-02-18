// stores/counter.js
import { writable } from 'svelte/store';

// Create a writable store with an initial value of 0
export const layoutData = writable<any[]>([]);

export let isAsideBarMinimised = writable<boolean>(true)
// export let lengthOfDataIfAsideBarIsMinimised = writable<number>(3)