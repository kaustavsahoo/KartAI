import React, { useState, useEffect } from "react";
import { API_URL } from "../config.js";
import useLocalStorage from "use-local-storage";

import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate();


    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useLocalStorage("token", "");

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);


    async function sendPostRequest() {
        if (!name || !username || !password) {
            return;
        }

        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username, password }),
        });

        if (!response.ok) {
            console.log("Login failed");
            return;
        }

        const data = await response.json();
        setToken(data.token);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "name") {
            setName(value);
        } else if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        sendPostRequest();
    }

    // Return the JSX code that can render the HTML elements
    return (
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full name
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                </label>
                <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Register
                </button>
            </div>
        </form>
    );
}

function Register() {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://www.citypng.com/public/uploads/preview/flipkart-black-white-logo-icon-hd-png-11664325265zfp2docy9s.png"
                        alt="KartAI"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <RegisterForm />

                    <p className="mt-10 text-center text-sm text-gray-500">
                        By creating an account, you agree to our terms and conditions.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;