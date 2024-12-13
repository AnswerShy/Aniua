import { useEffect, useState } from "react";
import { UserProfileInterface } from "@/interfaces/userProfile";
import { isLoggined } from "@/utils/customUtils";

const useUserProfile = () => {
    const [userData, setUserData] = useState<UserProfileInterface | null>(null);
    const userToken: string | boolean = isLoggined();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/profile");
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userToken) fetchData();
    }, [userToken]);

    return userData;
};

export default useUserProfile;
