import { animeBannerInterface } from "@/interfaces/animeBannerInteface";

const fetchAnime = async (slug: string): Promise<animeBannerInterface> => {
    const res = await fetch(`https://api.aniua.top/anime/${slug}`, {
        method: "GET",
        cache: "force-cache",
        next: {
            revalidate: 3600,
        },
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
    }
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    return res.json();
}
export default fetchAnime