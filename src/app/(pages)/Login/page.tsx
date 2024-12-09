"use client";

import { useState } from "react";

import { useRouter } from "next/navigation"
import { Section, CustomButton } from "@/components/Shared/SharedComponents";

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
        console.log(process.env.NEXT_PUBLIC_BASE_URL)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
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
        <Section>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <CustomButton type="submit">Login</CustomButton>
                {error && <p>{error}</p>}
            </form>
        </Section>
    );
}
