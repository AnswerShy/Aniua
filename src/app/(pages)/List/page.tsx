import { Metadata } from "next";
import { fetchList } from "@/models/fetchAnimeList";
import { animeCardInterface } from "@/interfaces/animeCardInterface";
import { Section } from "@/components/Shared/SharedComponents";
import Card from "@/components/Shared/Card/Card";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Список аніме на Aniua",
        description: `Дивитись аніме на Aniua онлайн у високій якості`,
    };
}

const listPage: React.FC<animeCardInterface> = async () => {
    const anime = (await fetchList()) as animeCardInterface[];
    return (
        <Section isGrid={true}>
            {anime.map((el, index) => (
                <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
            ))}
        </Section>
    );
};

export default listPage;
