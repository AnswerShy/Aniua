"use client";
import styles from "./Header.module.css";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from "@/components/Shared/DropDown/DropDown";
import TransitionLink from "@/utils/onClickAnimation";

import isLoggined from "@/utils/auth";

export default function Header() {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState("");
    const [isLogginedSession, setIsLoggined] = useState(false);

    useEffect(() => {
        if (pathname === "/") {
            setCurrentPath("Home");
        } else if (pathname.slice(1).startsWith("Anime/")) {
            const anime = pathname.slice(7).replaceAll("-", " ");
            setCurrentPath(anime);
        } else {
            setCurrentPath(pathname.slice(1));
        }
    }, [pathname]);

    useEffect(() => {
        setIsLoggined(isLoggined());
    }, []);

    const paths = {
        home: "/",
        list: "/List",
        onepiece: "/Anime/one-piece",
    };

    return (
        <header className={styles.headerWrapper}>
            <div className={`${styles.header} ${styles.left}`}>
                <TransitionLink className={styles.button} url={`/`}>
                    ANIUA
                </TransitionLink>
                {currentPath !== "" ? <Dropdown currentState={currentPath} actionList={paths} /> : null}
            </div>
            <div className={`${styles.header} ${styles.right}`}>
                <div className={styles.button}>366/|\</div>
                <div className={styles.button}>
                    <NotificationsOutlinedIcon sx={{ fontSize: "35px" }} />
                </div>
                {isLogginedSession ? (
                    <div className={`${styles.button} ${styles.pfpContainer}`}>
                        <div className={styles.pfp} style={{ backgroundImage: "url(/pfp.jpg)" }}></div>
                    </div>
                ) : (
                    <TransitionLink className={styles.button} url={`/Login`}>
                        login
                    </TransitionLink>
                )}
            </div>
        </header>
    );
}
