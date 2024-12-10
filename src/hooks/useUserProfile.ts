import { useEffect, useState } from "react";
import { UserProfileInterface } from "@/interfaces/userProfile";

const useUserProfile = () => {
    const [userData, setUserData] = useState<UserProfileInterface | null>(null);

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

        fetchData();
    }, []);

    return userData;
}

export default useUserProfile