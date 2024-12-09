import React from "react";
import styles from "./Section.module.css"

interface SectionProps {
    children: React.ReactNode;
    typeOfSection?: "grid" | "flex" | "flexThreeCols" | "Banner";
}


const Section: React.FC<SectionProps> = ({ children, typeOfSection = "flex" }) => {
    const widthClasses: { [key: string]: string } = {
        "grid": styles.gridSectionStyle,
        "flex": styles.flexSectionStyle,
        "flexThreeCols": styles.flexThreeColsSectionStyle,
        "Banner": styles.bannerSectionStyle,
    };
    return (
        <section style={{ justifyContent: "center", alignContent: "center", height: "auto" }}>
            <section className={widthClasses[typeOfSection]}>
                {children}
            </section>
        </section>
    );
};

export default Section;
