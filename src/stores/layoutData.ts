// stores/counter.js
import { writable } from 'svelte/store';

// Create a writable store with an initial value of 0
export const layoutData = writable<any[]>([]);

export let storeAsideBarMinimised = writable<boolean>(true)
export let isAsideBarBtnClick = writable<boolean>(false)
// export let lengthOfDataIfAsideBarIsMinimised = writable<number>(3)

export let isSearchMinimised = writable<boolean>(false)

// export const handleSearchMinimised = ()=>{
//     isSearchMinimised.set(!isSearchMinimised)
// }