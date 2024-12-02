export interface animeCardInterface {
    id: number;
    title: string;
    episode: {present: number, last: number},
    poster: string;
    status: string;
    slug: string;
}