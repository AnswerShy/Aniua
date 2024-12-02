export const EpisodeList = async (slug: string) => {
    const request = await fetch(`https://api.aniua.top/anime/${slug}/episodes`)
    if (!request.ok) {
        throw new Error(`Failed to fetch: ${request.status}`);
    }
    const result = await request.json();
    return result.episodes
}

export const Episode = async (id: number) => {
    const request = await fetch(`https://api.aniua.top/episode/get/${id}`)
    if (!request.ok) {
        throw new Error(`Failed to fetch: ${request.status}`);
    }
    const result = await request.json();
    return result.players
}