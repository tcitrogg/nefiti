import { json } from "@sveltejs/kit"

export function GET({ params }) {
    const { imgUrl } = params;
    return json(imgUrl)
}