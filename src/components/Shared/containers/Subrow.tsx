import React from "react";
import styles from "./RowAndSubrow.module.css"

const SubRow: React.FC<{
    widthState?: "1/4" | "2/4" | "3/4" | "4/4";
    title: string;
    children: React.ReactNode;
}> = ({ widthState = "4/4", title, children }) => {

    const widthClasses: { [key: string]: string } = {
        "1/4": "25%",
        "2/4": "50%", // Tailwind uses fractions for 2/4
        "3/4": "75%",
        "4/4": "100%",
    };
    return (
        <div 
            style={{width: `${widthClasses[widthState]}`}}
        >
            <p className={styles.subrowTitle}>{title}</p>
            <div className="subrow-components">{children}</div>
        </div>
    );
};

export default SubRow;
