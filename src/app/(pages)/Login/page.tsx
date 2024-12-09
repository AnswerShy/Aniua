"use client";

import { useState } from "react";

import { useRouter } from "next/navigation"
import { Section, CustomButton } from "@/components/Shared/SharedComponents";

// interface loginResponse {
//     user_token: string,
//     message: string,
//     success: boolean
// }

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const resJson = await res.json();
                if (resJson.success) {
                    document.cookie = `authToken=${resJson.user_token}; max-age=${7*24*60*60}; Secure; SameSite=Strict; Path=/;`;
                    setError("Успішний вхід");
                    router.push("/");
                } else {
                    setError(resJson.message);
                }
            } else {
                setError("Login failed");
            }
        } catch (e) {
            console.error(`Something went wrong: ${e}`);
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
