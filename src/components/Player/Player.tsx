"use client";
import styles from "./Player.module.css";
import { EpisodeListInterface } from "@/interfaces/animeEpisodeListInterface";
import { CustomButton, Dropdown, Section } from "@/components/Shared/SharedComponents";
import { useCallback, useEffect, useState } from "react";
import { Episode } from "@/models/fetchAnimePlayer";

interface PlayerProps {
    episodesList: EpisodeListInterface[];
}

interface Video {
    studio: string;
    video_url: string;
    poster: string;
}

interface episodeProps {
    studio: string;
    videos: Video[];
}

interface EpisodeProps {
    [studioName: string]: episodeProps;
}

const Player = ({ episodesList }: PlayerProps) => {
    const [chooseStudio, setChooseStudio] = useState<number>(0);
    const [studiosList, setStudioList] = useState<string[]>([])

    const [episodeUrl, setEpisodeUrl] = useState<string | null>(null);

    const [episodeTitle, setEpisodeTitle] = useState<string | null>(null)
    const [episodeJPTitle, setEpisodeJPTitle] = useState<string | null>(null)

    const [playerLoad, setPlayerLoad] = useState<boolean>(false)

    const handleEpisode = useCallback(async (id: number, episode: number) => {
        setPlayerLoad(true)
        const newEpisode = (await Episode(id)) as EpisodeProps;
        setEpisodeUrl(newEpisode[chooseStudio].videos[0].video_url);

        console.log(newEpisode)

        const studios = Object.entries(newEpisode).map(([, value]) => value.studio);
        setStudioList(studios)
        console.log(studios)

        setEpisodeTitle(episodesList[episode].title.ua)
        setEpisodeJPTitle(episodesList[episode].title.jp)
    }, [episodesList, chooseStudio])

    useEffect(() => {
        setPlayerLoad(false)
    }, [episodeUrl])

    useEffect(() => {
        if (episodesList && episodesList.length > 0 && episodesList[0].id) {
            setStudioList([]);
            handleEpisode(episodesList[0].id, 0); 
        } else {
            setEpisodeTitle("Any player founded");
        }
    }, [episodesList, handleEpisode]);

    return (
        <Section>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>{episodeTitle}</h1>
                <h2>{episodeJPTitle}</h2>
            </div>
            <div className={styles.playerWrapper}>
                <div className={styles.playerButtonsWrapper}>
                    {studiosList && studiosList.length > 1 ? <Dropdown className={styles.playerButton} currentState={chooseStudio.toString()} assetsList={studiosList} changeState={setChooseStudio} /> : null}
                </div>
                {!playerLoad ? <iframe className={styles.playerFrame} src={episodeUrl ? episodeUrl : undefined} /> : <div className={styles.playerFrame}></div>}
            </div>
            <div className={styles.episodeWrapper}>
                {episodesList.map((element, index) => (
                    <CustomButton key={index} onClick={() => handleEpisode(element.id, index)}>
                        {element.episode_number}
                    </CustomButton>
                ))}
            </div>
        </Section>
    );
};

export default Player;
