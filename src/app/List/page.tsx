import { Metadata } from "next";
import { fetchList } from "@/models/fetchAnimeList";
import { animeCardInterface } from "@/interfaces/animeCardInterface";
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
        <section style={{ justifyContent: "center", alignContent: "center", height: "auto" }}>
            <section style={{padding: "0", display: "grid", gridTemplateColumns: "repeat(6, var(--posterWidth))", gap: "15px", height: "auto"}}>
                {anime.map((el, index) => (
                    <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
                ))}
            </section>
        </section>
    );
};

export default listPage;
