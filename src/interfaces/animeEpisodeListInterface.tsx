export interface EpisodeListInterface {
    id: number,
    episode_number: number,
    title: {
      ua: string | null,
      en: string | null,
      jp: string | null
    },
    poster: string,
    is_filler: boolean,
    recap: boolean,
    duration: number,
    rating: {
      likes: number,
      dislikes: number
    },
    description: string
}