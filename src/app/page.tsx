import { Card, Row, SubRow, Section } from "@/components/Shared/SharedComponents";
import { animeCardInterface } from "@/interfaces/animeCardInterface";
import { fetchCommunityChoice } from "@/models/fetchAnimeList";

export default async function Home() {
    const communityChoice = (await fetchCommunityChoice()) as animeCardInterface[];
    return (
        <>
            <Section>
                <Row>
                    <SubRow title="Last uploaded episodes" widthState="4/4">
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
                    </SubRow>
                </Row>
                <Row>
                    <SubRow title="Community choice" widthState="3/4">
                        {communityChoice.map((el, index) => (
                            <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
                        ))}
                    </SubRow>
                    <SubRow title="Authors selections" widthState="1/4">
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
                    </SubRow>
                </Row>
            </Section>
            <Section>
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
            </Section>
        </>
    );
}
