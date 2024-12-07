import styles from "./Card.module.css";

const CardSkeletonBlock = ({countOfCards = 1}: {countOfCards?: number}) => {
    return (
        <section style={{ justifyContent: "center", alignContent: "center", height: "auto" }}>
            <section style={{ padding: "0", display: "grid", gridTemplateColumns: "repeat(6, var(--posterWidth))", gap: "15px", height: "auto" }}>
                {Array.from({ length: countOfCards }).map((_, i) => (
                    <div key={i} className={`${styles.card}`}>
                        <div className={`${styles.cardContainer} ${styles.load}`} />
                        <p className={`${styles.cardTitle} ${styles.load}`}>title</p>
                    </div>
                ))}
            </section>
        </section>
    );
};

export default CardSkeletonBlock;
