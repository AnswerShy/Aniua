"use client";
import Image from "next/image";
import { animeBannerInterface } from "@/interfaces/animeBannerInteface";
import { useState } from "react";

import descriptionCutter from "@/utils/custom/descriptionCutter";
import Link from "next/link";

import styles from "./InfoBlock.module.css"
import { Section } from "../Shared/SharedComponents";

interface Props {
    infoData: animeBannerInterface;
}

const genres = (year: number, genres: animeBannerInterface["genres"]) => {
    return (
        <div className="flex gap-5 mt-[12.5px] w-max">
            <p>{year}</p>
            <p>•</p>
            {genres.length > 0 ? (
                genres.map((el, index) => (
                    <Link key={index} href={`/list/${el.slug}`}>
                        {el.title}
                    </Link>
                ))
            ) : (
                <p>unknow genres (?)</p>
            )}
        </div>
    );
};

const InfoBlock: React.FC<Props> = ({ infoData }) => {
    const slicedText = descriptionCutter(infoData.description, 50);

    const [displaedText, setFullDescription] = useState(slicedText);
    const [isFullTextDisplayed, setIsFullTextDisplayed] = useState(false);

    const descHandler = () => {
        const moreLessButton = document.getElementById("descriptionButton");
        if (isFullTextDisplayed) {
            setFullDescription(slicedText);
            if (moreLessButton) moreLessButton.innerHTML = " ...More";
            document.getElementById("desc")?.classList.add("text-justify");
            setIsFullTextDisplayed(false);
        } else {
            setFullDescription(infoData.description);
            if (moreLessButton) moreLessButton.innerHTML = " ...Less";
            document.getElementById("desc")?.classList.remove("text-justify");
            setIsFullTextDisplayed(true);
        }
    };

    return (
        <Section typeOfSection={"flexThreeCols"}>
            <div className="flex flex-col w-full md:w-[250px]">
                <Image src={infoData.poster} alt={infoData.title} className="rounded-xl self-center" height={350} width={250} />
                <button className="w-full py-2.5 rounded-xl bg-b_t mt-5 text-white text-2xl">add to</button>
            </div>

            <div className="w-full sm:w-min lg:w-min xl:w-[670px]">
                <h1>{infoData.title}</h1>
                {genres(infoData.year, infoData.genres)}

                <h1>Description</h1>
                <p id="desc" className="mt-[12.5px]">
                    {displaedText}
                    <a onClick={descHandler} id="descriptionButton">
                        {" ...More"}
                    </a>
                </p>
            </div>

            <div className="w-full lg:w-[270px]">
                <div>
                    <h1>Rate</h1>
                    <p className="">{infoData.mal_score}</p>
                </div>
                <div className="">
                    <h1>Details</h1>
                    <div className={styles.subBlock}>
                        <span className={styles.subRow}>
                            <p>Type: </p>
                            <a className={styles.subText}>{infoData.type.title}</a>
                        </span>
                        <span className={styles.subRow}>
                            <p>Status: </p>
                            <a className={styles.subText}>{infoData.status}</a>
                        </span>
                        <span className={styles.subRow}>
                            <p>Episodes: </p>
                            <a className={styles.subText}>
                                {infoData.episode.present ? infoData.episode.present : "?"} / {infoData.episode.last ? infoData.episode.last : "?"}
                            </a>
                        </span>
                        <span className={styles.subRow}>
                            <p>Studio: </p>
                            <a className={styles.subText}>{infoData.studio ? infoData.studio : "Unknown"}</a>
                        </span>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default InfoBlock;
