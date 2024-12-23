import { Card, Row, SubRow, Section } from "@/components/Shared/SharedComponents";
import AnimeServiceInstance from "@/app/api";

export default async function Home() {
    const communityChoice = await AnimeServiceInstance.fetchCommunityChoice();
    return (
        <>
            <Section>
                <Row>
                    <SubRow title="Last uploaded episodes" widthState="4/4">
                        <div className="row-components">in backend dev</div>
                    </SubRow>
                </Row>
                <Row>
                    <SubRow title="Community choice" widthState="3/4">
                        {communityChoice.map((el, index) => (
                            <Card key={index} image={el.poster} title={el.title} slug={el.slug}></Card>
                        ))}
                    </SubRow>
                    <SubRow title="Authors selections" widthState="1/4">
                        <div className="row-components">in backend dev</div>
                    </SubRow>
                </Row>
            </Section>
            <Section>
                <Row>
                    <SubRow title="Explore new" widthState="4/4">
                        <div className="row-components">in backend dev</div>
                    </SubRow>
                </Row>
                <Row>
                    <SubRow title="Last club`s discussion" widthState="4/4">
                        <div className="row-components">in backend dev</div>
                    </SubRow>
                </Row>
            </Section>
        </>
    );
}
