// src/app/login/page.tsx
"use client"
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function LoginPage() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        };

        try {
            const { data } = await axios.post("/api/agent/auth/login", payload);
            alert(JSON.stringify(data));
            router.push("/dashboard");
        } catch (e) {
            const error = e as AxiosError;
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <h2 className='font-bold text-xl'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            <style jsx>{`
                .login-container {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 2rem;
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    text-align: center;
                    margin-bottom: 1rem;
                }
                .input-group {
                    margin-bottom: 1rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                }
                input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button:hover {
                    background-color: #005bb5;
                }
            `}</style>
        </div>
    );
}
