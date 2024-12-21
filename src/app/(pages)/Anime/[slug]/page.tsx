import Banner from "@/components/Banner/FullScreenBanner";
import fetchAnime from "@/models/fetchAnimeBanner";
import InfoBlock from "@/components/InfoBlock/InfoBlock";
import Player from "./Components/Player";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = params;
    return {
        title: `${slug.toUpperCase()} - Aniua`,
        description: `Дивитись аніме на Aniua онлайн у високій якості`,
    };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await fetchAnime(slug);
  return (
    <>
      <Banner bannerImage={data.poster} bannerTitle={data.title} bannerDesc={data.description} bannerGenres={data.genres} bannerYear={data.year} />
      <InfoBlock infoData={data} />
      <Player slug={slug} />
    </>
  );
}
