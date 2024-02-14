import axios from "axios";
import { appinfo } from "./config";

export const noOutlineRingStyle = "outline-none ring-0"

export function titleCase(text: string) {
  const start = text.slice(0, 1)
  const remaining = text.slice(1)
  return `${start}${remaining}`
}

export function getThumbnail(data:any){
  const imgSrc = `https://mangadex.org/covers/${data.id}/${data.thumbnail?.attributes?.fileName}`
  // console.log(imgSrc)
  return imgSrc
}

export async function getMangaPages() {
  
}