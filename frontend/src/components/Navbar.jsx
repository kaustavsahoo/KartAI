import React, { useEffect } from "react";
import useLocalStorage from "use-local-storage";

// use link from react router dom
import { Link } from "react-router-dom";

function LoginSignupLogout() {
    const [token, setToken] = useLocalStorage("token");

    function logout() {
        setToken(undefined);
    }

    return token ? (
        <button
            className="hidden md:inline-block md:ml-auto md:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
            onClick={logout}
        >
            Log out
        </button>
    ) : (
        <>
            <a
                className="hidden md:inline-block md:ml-auto md:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                href="/login"
            >
                Sign In
            </a>
            <a
                className="hidden md:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                href="/register"
            >
                Register
            </a></>

    )

}

function Navbar({currentTab}) {
    const tabs = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Chat",
            href: "/chat",
        },
        {
            name: "About",
            href: "/about",
        },
    ];

    return (
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
            <a className="text-3xl font-bold leading-none" href="#">
                <img className="h-10" src="https://www.citypng.com/public/uploads/preview/flipkart-black-white-logo-icon-hd-png-11664325265zfp2docy9s.png" alt="logo" />
            </a>
            <div className="md:hidden">
                <button className="navbar-burger flex items-center text-blue-600 p-3">
                    <svg
                        className="block h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Mobile menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:flex md:mx-auto md:flex md:items-center md:w-auto md:space-x-6">
                {
                    tabs.map((tab, index) => (
                        <li key={index}>
                            <a
                                className={`text-sm font-bold leading-5 ${
                                    currentTab === tab.name
                                        ? "text-blue-600"
                                        : "text-gray-600 hover:text-blue-600"
                                }`}
                                href={tab.href}
                                onClick={() => navigate(tab.href)}
                            >
                                {tab.name}
                            </a>
                        </li>
                    ))
                                            }
            </ul>
            <LoginSignupLogout />
        </nav>

    )
}

export default Navbar;