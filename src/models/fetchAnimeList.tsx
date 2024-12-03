import { animeCardInterface } from "@/interfaces/animeCardInterface";

export const fetchList = async(): Promise<animeCardInterface[]> => {
    const res = await fetch(`https://api.aniua.top/filter/`, {
        method: "GET",
        cache: "force-cache",
        next: {
            revalidate: 3600,
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
    }
    const finalRes = await res.json();
    return finalRes.titles as animeCardInterface[];
}

export const fetchCommunityChoice = async(): Promise<animeCardInterface[]> => {
    const res = await fetch(`https://api.aniua.top/filter/?limit=5&order=rating`, {
        method: "GET",
        cache: "force-cache",
        next: {
            revalidate: 3600,
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
    }
    const finalRes = await res.json();
    return finalRes.titles as animeCardInterface[];
}