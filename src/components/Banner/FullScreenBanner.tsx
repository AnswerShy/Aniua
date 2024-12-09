"use client";

import Link from "next/link";
import descriptionCutter from "@/utils/custom/descriptionCutter";
import { animeBannerInterface } from "@/interfaces/animeBannerInteface";
import styles from "./FullScreenBanner.module.css"
import Image from "next/image";
import { Section } from "../Shared/SharedComponents";


interface Banner_props {
    bannerImage: string | null;
    bannerTitle: string | null;
    bannerYear?: number | null;
    bannerGenres?: [{ title: string; slug: string }] | null;
    bannerDesc: string;
    bannerChar?: string | null;
    bannerTypeNews?: boolean;
}


const genresDisplay = (genres: animeBannerInterface["genres"]): JSX.Element | null => {
    return genres ? (
        <>
            {genres.map((el, index) => (
                <Link key={index} href={`/list/${el.slug}`}>
                    {el.title}
                </Link>
            ))}
        </>
    ) : null;
};

const Banner: React.FC<Banner_props> = ({ bannerImage, bannerTitle, bannerYear, bannerGenres, bannerDesc, bannerTypeNews = false }) => {
    return (
        <Section typeOfSection={"Banner"}>
            <Image src={bannerImage ? bannerImage : ""} className={styles.bannerImage} alt="animeImage" fill objectFit={'cover'}/>
            {/* <div className={styles.bannerImage} style={{ backgroundImage: `url(${bannerImage})` }}></div> */}
            <div className={styles.bannerInfoContainer}>
                <h1 className={styles.bannerTitle}>{bannerTitle}</h1>
                {bannerTypeNews ? null : (
                    <div className={`${styles.bannerBaseInfo} ${styles.bannerText}`}>
                        <p>{bannerYear ? bannerYear : null}</p>
                        <span>•</span>
                        {bannerGenres && bannerGenres.length > 0 ? genresDisplay(bannerGenres) : <p>unknow genres (?)</p>}
                    </div>
                )}
                <p className={`${styles.bannerDescription} ${styles.bannerText}`}>{descriptionCutter(bannerDesc, 25)}...</p>
            </div>
            {/* {bannerChar ? <div className="bannerChar" style={{ backgroundImage: `url(${bannerChar})` }}></div> : null} */}
        </Section>
    );
};

export default Banner;
