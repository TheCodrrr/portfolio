import React, { useEffect, useState } from "react";
import { useUI } from "./context/UIContext";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useWindowWidth from "./hooks/windowWidthHook";

export default function Home({ pageLoaded }) {
    const width = useWindowWidth();
    const { darkMode } = useUI()
    const navigate = useNavigate();
    const [typingComplete, setTypingComplete] = useState(false);
    const [cursor, setCursor] = useState(true);
    
    // Blinking cursor effect
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursor(prev => !prev);
        }, 500);
        
        // Start code typing animation
        const timer = setTimeout(() => {
            setTypingComplete(true);
        }, 1800);
        
        return () => {
            clearInterval(cursorInterval);
            clearTimeout(timer);
        };
    }, []);

    const handleDownload = () => {
        fetch("/my_resume.pdf") // Adjust URL if hosted externally
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
        <div className={`home_page_container flex flex-col items-center justify-center text-white px-3 sm:px-6 py-8 sm:py-10 h-[100%] ${darkMode ? "bg-gray-900" : "bg-slate-100"}`}>
            {/* Top Section */}
            <div className="flex w-full max-w-7xl gap-4 sm:gap-6 md:gap-8 flex-col md:flex-row items-center justify-center">
                {/* Left: Profile Section */}
                <motion.div 
                    className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/3 space-y-5 sm:space-y-6 pl-0 sm:pl-1 pt-3 pb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className={`relative rounded-full overflow-hidden border-4 shadow-xl ${darkMode ? "border-blue-600" : "border-blue-500"} mb-2`}
                        style={{ minWidth: '130px', minHeight: '130px' }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src="/profile.jpeg"
                            alt="Profile"
                            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover"
                        />
                    </motion.div>
                    
                    <motion.h1 
                        className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent py-1 leading-normal min-h-[2em] flex items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        Hey, I'm Aryan
                    </motion.h1>
                    
                    { width > 770 ? (
                        <>
                            <motion.p 
                                className={`text-base sm:text-lg italic ${darkMode ? "text-gray-300" : "text-gray-700"} py-1 leading-relaxed min-h-[3em] w-full px-2 sm:px-0`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                "It's not what we do impress others, but how we present!"
                            </motion.p>
                            <motion.div 
                                className="flex sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2 w-full sm:w-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{overflow: "visible"}}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <motion.button 
                                    onClick={() => navigate('/project')} 
                                    className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex items-center justify-center sm:justify-start space-x-2 font-medium w-full sm:w-auto"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Preview Projects</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.button>
                                
                                <motion.button 
                                    onClick={handleDownload} 
                                    className="bg-gradient-to-r from-gray-700 to-gray-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-md hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg transform hover:-translate-y-1 flex items-center justify-center sm:justify-start space-x-2 font-medium w-full sm:w-auto"
                                    style={{overflow: "visible"}}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span>Install Resume</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        </>
                    ) : null}
                    
                </motion.div>

                {/* Right: Code Editor Panel */}
                <motion.div 
                    className={`relative w-full md:w-1/2 rounded-lg shadow-2xl border ${darkMode ? "bg-[#1e1e1e] border-gray-700" : "bg-[#f7f8fa] border-gray-300"}`}
                    style={{ height: "auto", minHeight: "300px", maxHeight: "420px" }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Code Editor Header */}
                    <div className={`flex items-center justify-between px-2 sm:px-4 py-2 border-b ${darkMode ? "border-gray-700 bg-[#252526]" : "border-gray-300 bg-[#e6e6e6]"}`}>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></span>
                            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></span>
                        </div>
                        <div className={`text-xs font-medium truncate max-w-[150px] sm:max-w-none ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            aboutMe.js - Visual Studio Code
                        </div>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 sm:h-4 sm:w-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </div>
                    </div>

                    {/* Code Block with Line Numbers */}
                    <div className="flex overflow-auto max-h-[280px] sm:max-h-[320px] md:max-h-[380px] p-2 sm:p-4 font-mono text-xs sm:text-sm">
                        {/* Line Numbers */}
                        <div className={`select-none pr-2 sm:pr-4 text-right ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                            {Array.from({ length: 13 }).map((_, i) => (
                                <div key={i} className="leading-relaxed">{i + 1}</div>
                            ))}
                        </div>

                        {/* Code Content */}
                        <pre className={`whitespace-pre leading-relaxed w-full overflow-x-auto ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="line flex">
                                        <span className={darkMode ? "text-[#4ec9b0]" : "text-green-600"}>var </span> 
                                        <span className={darkMode ? "text-[#9cdcfe]" : "text-blue-600"}>aboutMe</span> 
                                        <span className={darkMode ? "text-white" : "text-black"}> = </span> 
                                        <span className={darkMode ? "text-[#d4d4d4]" : "text-gray-800"}>{`{`}</span>
                                    </div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.2 }}
                                    >
                                        <div className={`line flex pl-6`}>
                                            <span className={darkMode ? "text-[#9cdcfe]" : "text-blue-500"}>name: </span> 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}>"Aryan Hansoti"</span>,
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.2 }}
                                    >
                                        <div className={`line flex pl-6`}>
                                            <span className={darkMode ? "text-[#9cdcfe]" : "text-blue-500"}>role: </span> 
                                            <span className={darkMode ? "text-[#dcdcaa]" : "text-yellow-600"}>
                                                (</span><span className={darkMode ? "text-[#4ec9b0]" : "text-green-600"}>FrontendDeveloper</span><span className={darkMode ? "text-[#dcdcaa]" : "text-yellow-600"}>) =&gt; (</span><span className={darkMode ? "text-[#4ec9b0]" : "text-green-600"}>FullStackDeveloper</span><span className={darkMode ? "text-[#dcdcaa]" : "text-yellow-600"}>)</span>,
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6, duration: 0.2 }}
                                    >
                                        <div className={`line flex pl-6`}>
                                            <span className={darkMode ? "text-[#9cdcfe]" : "text-blue-500"}>skills: </span>
                                            <span className={darkMode ? "text-[#d4d4d4]" : "text-gray-800"}>[</span>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 0.8, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-12`}>
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}>"HTML"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "CSS"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "SCSS"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "JavaScript"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "React.js"</span>,
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.0, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-12`}>
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "MongoDB"</span>,
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "Python"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "C++"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "SQL"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "TailwindCSS"</span>,
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.2, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-12`}>
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}>"Bootstrap"</span>,
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "Git"</span>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.4, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-6`}>
                                            <span className={darkMode ? "text-[#d4d4d4]" : "text-gray-800"}>]</span>,
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.6, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-6`}>
                                            <span className={darkMode ? "text-[#9cdcfe]" : "text-blue-500"}>currentlyLearning: </span> 
                                            <span className={darkMode ? "text-[#d4d4d4]" : "text-gray-800"}>[</span>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.7, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-12`}>
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}>"Node.js"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "ExpressJS"</span>, 
                                            <span className={darkMode ? "text-[#ce9178]" : "text-orange-500"}> "React Native"</span>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.8, duration: 0.3 }}
                                    >
                                        <div className={`line flex pl-6`}>
                                            <span className={darkMode ? "text-[#d4d4d4]" : "text-gray-800"}>]</span>,
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: typingComplete ? 1 : 0 }}
                                        transition={{ delay: 1.9, duration: 0.3 }}
                                    >
                                        <div className="line flex">
                                            <span className={darkMode ? "text-[#d4d4d4]" : "text-gray-800"}>{'};'}</span>
                                            <span className={cursor ? "opacity-100" : "opacity-0"}>|</span>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </pre>
                    </div>
                </motion.div>
            </div>
        </div>
    ) : (
        <></>
    )
}
