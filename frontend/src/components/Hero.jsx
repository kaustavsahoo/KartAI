import { useNavigate } from "react-router";
import useLocalStorage from "use-local-storage";

function Hero() {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage("token");

    function handleClick() {
        if (token)
            navigate("/chat");
        else
            navigate("/login");
    }

    return (
        <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
            <div className="max-w-xl mx-auto lg:max-w-screen-xl">
                <div className="mb-16 lg:max-w-lg lg:mb-0">
                    <div className="max-w-xl mb-6">
                        <div>
                            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-yellow-900 uppercase rounded-full bg-yellow-400">
                                Brand new
                            </p>
                        </div>
                        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                            Discover Your Personalized Fashion Ensembles with KartAI
                        </h2>
                        <p className="text-base text-gray-700 md:text-lg">
                            Elevate your style with the latest fashion trends
                        </p>
                    </div>
                    <div className="flex items-center">
                        <a
                            onClick={handleClick}
                            className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
                <img
                    src="https://kitwind.io/assets/kometa/full-browser.png"
                    className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Hero;