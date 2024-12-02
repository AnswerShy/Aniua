import Banner from "@/components/Banner/FullScreenBanner";
import fetchAnime from "@/models/fetchAnimeBanner";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import Player from "@/components/Player/Player";

import { EpisodeList } from "@/models/fetchAnimePlayer"

export default async function AnimePage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const data = await fetchAnime(slug);
    const list = await EpisodeList(slug)
    return (
        <>
            <Banner bannerImage={data.poster} bannerTitle={data.title} bannerDesc={data.description} bannerGenres={data.genres} bannerYear={data.year} />
            <InfoBlock infoData={data} />
            <Player episodesList={list}/>
        </>
    );
}
