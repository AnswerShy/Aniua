import React from "react";
import styles from "./Section.module.css"

interface SectionProps {
    children: React.ReactNode;
    isGrid?: boolean;
}


const Section: React.FC<SectionProps> = ({ children, isGrid = false }) => {
    return (
        <section style={{ justifyContent: "center", alignContent: "center", height: "auto" }}>
            <section className={isGrid ? styles.gridSectionStyle : styles.flexSectionStyle}>
                {children}
            </section>
        </section>
    );
};

export default Section;
