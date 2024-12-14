"use client";

import { CustomTitle, Section } from "../Shared/SharedComponents";
import styles from "./Profile.module.css"
import Image from "next/image";
import { Telegram } from "@mui/icons-material";
import useUserProfile from "@/hooks/useUserProfile";

export default function Profile() {
    const userData = useUserProfile();

    return (
        <Section typeOfSection={"Profile"}>
            {userData ? (
                <>
                    <div className={styles.profileRowUp}>
                        <div>
                            <CustomTitle title={userData.username} />
                            <h2 className="text">{userData.first_name ? userData.first_name : "..."}</h2>
                            <h2 className="subText">{userData.description ? userData.description : "..."}</h2>
                        </div>
                        {userData.avatar ? (
                            <Image className="rounded-xl size-32 md:size-64 object-cover" alt="pfp" src={userData.avatar} width={256} height={256} />
                        ) : (
                            <div className="size-32 md:size-64 bg-black rounded-xl"></div>
                        )}
                    </div>

                    <div className={styles.profileRowDown}>
                        <div>
                            <Telegram sx={{ fontSize: "5rem" }} />
                        </div>
                        <div className="size-64 rounded-xl bg-slate-400">
                            s
                        </div>
                    </div>
                </>
            ) : (
                <h1>Any user founded</h1>
            )}
        </Section>
    );
}
