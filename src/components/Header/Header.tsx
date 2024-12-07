"use client";
import styles from "./Header.module.css";


import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dropdown } from "../Shared/SharedComponents";
import clsx from "clsx";

import { isLoggined, TransitionLink } from "@/utils/customUtils";
import { MenuIcon, NotificationsOutlinedIcon, ArrowForwardIcon } from "@/utils/icons"

export default function Header() {
    const pathname = usePathname();
    const [currentPath, setCurrentPath] = useState("");
    const [isLogginedSession, setIsLoggined] = useState(false);
    const [isMenuOpened, setMenuOpened] = useState(false);

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

    const menuHandler = () => {
        setMenuOpened((prev) => !prev);
    };

    useEffect(() => {
        setIsLoggined(isLoggined());
    }, []);

    const paths = {
        home: "/",
        list: "/List",
        onepiece: "/Anime/one-piece",
    };

    return (
        <header>
            <nav
                className={clsx(`${styles.headerMobile}`, isMenuOpened ? "bg-c01dp" : "bg-transparent01dp")}
                onClick={() => {
                    menuHandler();
                }}
            >
                <MenuIcon sx={{ fontSize: "35px" }} />
                <div>{currentPath}</div>
            </nav>
            <nav className={clsx(`${styles.sideMenu} ${styles.headerDesktop}`, isMenuOpened ? "translate-x-0" : "-translate-x-full")}>
                <div className={`${styles.leftHeader}`}>
                    <TransitionLink url={`/`}>ANIUA</TransitionLink>
                    {currentPath !== "" ? <Dropdown currentState={currentPath} actionList={paths} /> : null}
                </div>
                <div className={`${styles.topMenu}`}>
                    {Object.entries(paths).map(([key, action]) => (
                        <TransitionLink url={action} key={key} isVision={menuHandler}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TransitionLink>
                    ))}
                </div>
                <div className="flex flex-row-reverse items-center md:flex-row md:gap-4">
                    {isLogginedSession ? (
                        <>
                            <div>366/|\</div>
                            <div>
                                <NotificationsOutlinedIcon sx={{ fontSize: "1.5rem" }} />
                            </div>
                            <div className={`${styles.button} ${styles.pfpContainer}`}>
                                <div className={styles.pfp} style={{ backgroundImage: "url(/pfp.jpg)" }}></div>
                            </div>
                        </>
                    ) : (
                        <TransitionLink url={`/Login`}>Login<ArrowForwardIcon sx={{ fontSize: "35px"}}/></TransitionLink>  
                    )}
                </div>
            </nav>
        </header>
    );
}
