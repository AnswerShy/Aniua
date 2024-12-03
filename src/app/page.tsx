import Card from "@/components/Shared/Card/Card";
import Row from "@/components/Shared/containers/Row";
import SubRow from "@/components/Shared/containers/Subrow";
import { animeCardInterface } from "@/interfaces/animeCardInterface";
import { fetchCommunityChoice } from "@/models/fetchAnimeList";

export default async function Home() {
    const communityChoice = (await fetchCommunityChoice()) as animeCardInterface[];
    return (
        <>
            <section>
                <Row>
                    <SubRow title="Last uploaded episodes" widthState="4/4">
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
                    </SubRow>
                </Row>
                <Row>
                    <SubRow title="Community choice" widthState="3/4">
                        <div className="row-components" style={{padding: "0", display: "grid", gridTemplateColumns: "repeat(5, var(--posterWidth))", gap: "5px", height: "auto"}}>
                            {communityChoice.map((el, index) => (
                                <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
                            ))}
                        </div>
                    </SubRow>
                    <SubRow title="Authors selections" widthState="1/4">
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
                    </SubRow>
                </Row>
            </section>
            <section>
                <Row>
                    <SubRow title="Explore new" widthState="4/4">
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
                    </SubRow>
                </Row>
                <Row>
                    <SubRow title="Last club`s discussion" widthState="4/4">
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
                    </SubRow>
                </Row>
            </section>
        </>
    );
}
