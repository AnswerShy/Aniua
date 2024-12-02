import Row from "@/components/Shared/containers/Row";
import SubRow from "@/components/Shared/containers/Subrow";

export default function Home() {
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
                        <div className="row-components">ііііііііііііііііііііііііііііііііііііііііііііііі</div>
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
