import { animeCardInterface } from "@/interfaces/animeCardInterface";

export async function fetchAnimeList(page: number = 1) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list?page=${page}`, {
        method: "GET",
        cache: "force-cache",
        next: { revalidate: 3600 },
    });

    const anime: animeCardInterface[] = await response.json();
    return anime
}
