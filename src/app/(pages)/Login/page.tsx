"use client";

import { useState } from "react";
import CustomButton from "@/components/Shared/Button/Button";
import { useRouter } from "next/navigation"

interface loginResponse {
    user_token: string,
    message: string,
    success: boolean
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const myHeaders = new Headers();
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        try {
            const res = await fetch(`${process.env.BASE_URL}login/`, {
                method: "POST",
                headers: myHeaders,
                body: formdata,
            });
            if (res.ok) {
                const resJson = await res.json() as loginResponse
                if(resJson.success) {
                    document.cookie = `authToken=${resJson.user_token}; max-age=${7*24*60*60}; Secure; SameSite=Strict; Path=/;`;
                    setError("Успішний вхід")
                    router.push("/")
                }
                else {
                    setError(resJson.message)
                }
                
            } else {
                console.log("Invalid credentials");
                setError("error");
            }
        } catch (e) {
            console.log(`Something went wrong: ${e}`);
        }
    };

    return (
        <section style={{ justifyContent: "center" }}>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <CustomButton type="submit">Login</CustomButton>
                {error && <p>{error}</p>}
            </form>
        </section>
    );
}
