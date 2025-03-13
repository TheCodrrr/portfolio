import React from "react";
import { useUI } from "./context/UIContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home({ pageLoaded }) {
    const { darkMode } = useUI()
    

    const handleDownload = () => {
        fetch("/resume.pdf") // Adjust URL if hosted externally
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "Aryan_Hansoti_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    };

    return pageLoaded ? (
        <div className={`home_page_container flex flex-col items-center justify-center text-white px-6 h-[100%] ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            {/* Top Section */}
            <div className="flex w-full max-w-7xl gap-8 flex-col md:flex-row items-center justify-center">
                {/* Left: Code Editor Panel */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 space-y-4 pl-1 pt-1">
                    <motion.img
                        src="/profile.jpeg" // Replace with your actual photo
                        alt="Profile"
                        className={`w-45 h-45 rounded-full border-4 shadow-lg ${darkMode ? "border-gray-700" : "border-gray-400"}`}
                        whileHover={{ scale: 1.05 }}
                    />
                    <h1 className="text-3xl font-bold text-blue-400">Hey, I'm Aryan</h1>
                    <p className={darkMode ? "text-gray-400" : "text-black"}>
                        It's not what we do impress others, but how we present!
                    </p>
                    <div className="flex space-x-3">
                        <Link to={`/project`} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 transition cursor-pointer">
                            Preview Projects
                        </Link>
                        <button onClick={handleDownload} className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 transition cursor-pointer">
                            Install Resume
                        </button>
                    </div>
                </div>

                <div className={`relative w-full md:w-1/2 rounded-lg shadow-lg p-4 border h-80 font-mono ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-400"}`}>
                    {/* Code Editor Header */}
                    <div className="flex items-center space-x-2 mb-3">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>

                    {/* Code Block with Line Numbers */}
                    <div className="flex">
                        <pre className="text-gray-200 whitespace-pre leading-relaxed w-full">
                            <div className="line flex">
                                <span className={darkMode ? "text-green-400" : "text-green-500"}>var </span> <span className="text-blue-400">aboutMe </span> <span className={darkMode ? "text-white" : "text-black"}>= </span> <span className={darkMode ? "text-yellow-300" : "text-yellow-500"}>{`{`}</span>
                            </div>
                            <div className={`line flex pl-6 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-yellow-300" : "text-yellow-500"}>name: </span> <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>Aryan Hansoti<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>,
                            </div>
                            <div className={`line flex pl-6 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-yellow-300" : "text-yellow-500"}>role: </span> <span className="text-orange-400"><span className={darkMode ? "text-green-400" : "text-green-500"}>(</span>FrontendDeveloper<span className={darkMode ? "text-green-400" : "text-green-500"}>)</span> =&gt; <span className={darkMode ? "text-green-400" : "text-green-500"}>(</span>FullStackDeveloper<span className={darkMode ? "text-green-400" : "text-green-500"}>)</span></span>,
                            </div>
                            <div className={`line flex pl-6 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-yellow-300" : "text-yellow-500"}>skills: </span>
                            </div>
                            <div className={`line flex pl-12 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-green-400" : "text-green-500"}>[</span>
                            </div>
                            <div className={`line flex pl-18 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>HTML<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>CSS<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>SCSS<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>JavaScript<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>React.js<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>,
                            </div>
                            <div className={`line flex pl-18 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>Node.js<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>Python<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>C++<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>SQL<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span><span className={`flex items-center justify-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Angular.js</span><span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, 
                            </div>
                            <div className={`line flex pl-18 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>TailwindCSS<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span><span className={`flex items-center justify-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Node.js</span><span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>Bootstrap<span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, <span className={darkMode ? "text-green-400" : "text-green-500"}>"</span><span className={`flex items-center justify-center ${darkMode ? "text-gray-500" : "text-gray-400"}`}>MongoDB</span><span className={darkMode ? "text-green-400" : "text-green-500"}>"</span>, 
                            </div>
                            <div className={`line flex pl-12 ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-green-400" : "text-green-500"}>]</span>
                            </div>
                            <div className={`line flex ${darkMode ? "text-white" : "text-black"}`}>
                                <span className={darkMode ? "text-yellow-300" : "text-yellow-500"}>{`}`}</span>;
                            </div>
                        </pre>
                    </div>
                </div>

            </div>

            {/* Bottom Section: Description */}
            <div className="w-full max-w-7xl mt-12 text-center">
                <p className={`text-lg ${darkMode ? "text-gray-300" : "text-black"}`}>
                    I love solving problems through clean and efficient code. Currently diving deeper into
                    full-stack development and exploring new technologies to build impactful solutions.
                </p>
                <button className="mt-4 bg-orange-500 px-6 py-2 rounded-md hover:bg-orange-400 transition cursor-pointer">
                    Read More
                </button>
            </div>
        </div>
    ) : (
        <></>
    )
}
