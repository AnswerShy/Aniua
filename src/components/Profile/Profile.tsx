"use client";

import { CustomTitle, Section } from "../Shared/SharedComponents";

import Image from "next/image";
import { Telegram } from "@mui/icons-material";
import useUserProfile from "@/hooks/useUserProfile";

export default function Profile() {
    const userData = useUserProfile();

    return (
        <Section typeOfSection={"Profile"}>
            {userData ? (
                <>
                    <div className="flex flex-col justify-between">
                        <div>
                            <CustomTitle title={userData.username} />
                            <h2 className="text">{userData.first_name ? userData.first_name : "..."}</h2>
                            <h2 className="subText">{userData.description ? userData.description : "..."}</h2>
                        </div>
                        <div>
                            <Telegram sx={{ fontSize: "5rem" }} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        {userData.avatar ? (
                            <Image className="rounded-xl size-64 object-cover" alt="pfp" src={userData.avatar} width={256} height={256} />
                        ) : (
                            <div className="size-64 bg-black rounded-xl"></div>
                        )}
                    </div>
                </>
            ) : (
                <h1>Any user founded</h1>
            )}
        </Section>
    );
}
