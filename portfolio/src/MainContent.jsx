import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useUI } from "./context/UIContext";
import "./MainContent.css";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import LoadingScreen from "./LoadingScreen"; // Import the loading component

export default function MainContent() {
    const { darkMode, sidebarOpen, currentHoverPage, setCurrentHoverPage } = useUI();
    const location = useLocation(); // Detect route changes
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 2000); // Show loading for 4 seconds
        return () => clearTimeout(timer);
    }, [location.pathname]); // Trigger when path changes

    const handleHoverName = (page) => {
        setCurrentHoverPage(page);
    };

    return (
        <>
            {loading && <LoadingScreen onComplete={() => setLoading(false)} />} {/* Show loading effect */}

            <div className={`main_container flex top-15 left-[3.75rem] fixed w-[calc(100vw-3.75rem)] h-[calc(100vh-3.75rem)] ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                {/* Sidebar Navigation */}
                <div className={`enlarged_sidebar_container overflow-hidden ${sidebarOpen ? "border-r border-gray-600 w-[16.25rem] left-[3.75rem]" : "w-0"}`} style={darkMode ? { backgroundColor: '#0b111b' } : { backgroundColor: '#e8e8e8' }}>
                    <ul className="navbar_elms_container w-full flex-col">
                        <li className="navbar_elm my-[0.59rem] h-10">
                            <Link to="/" className={`navbar_elm_link h-full flex items-center pl-3 text-lg cursor-pointer w-full ${currentHoverPage === 'home' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-700"}`}
                                onMouseEnter={() => handleHoverName('home')}
                                onMouseLeave={() => handleHoverName('')}>
                                home<span className={currentHoverPage === 'home' ? "text-orange-400" : "text-gray-500"}>.jsx</span>
                            </Link>
                        </li>
                        <li className="navbar_elm mt-[1.18rem] h-10">
                            <Link to="/about" className={`navbar_elm_link h-full flex items-center pl-3 text-lg cursor-pointer w-full ${currentHoverPage === 'about' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-700"}`}
                                onMouseEnter={() => handleHoverName('about')}
                                onMouseLeave={() => handleHoverName('')}>
                                about<span className={currentHoverPage === 'about' ? "text-orange-400" : "text-gray-500"}>.py</span>
                            </Link>
                        </li>
                        <li className="navbar_elm mt-[1.18rem] h-10">
                            <Link to="/project" className={`navbar_elm_link h-full flex items-center pl-3 text-lg cursor-pointer w-full ${currentHoverPage === 'project' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-700"}`}
                                onMouseEnter={() => handleHoverName('project')}
                                onMouseLeave={() => handleHoverName('')}>
                                project<span className={currentHoverPage === 'project' ? "text-orange-400" : "text-gray-500"}>.cpp</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className={`main_content_container h-[calc(100vh-3.75rem)] top-15 overflow-y-auto fixed ${sidebarOpen ? "w-[calc(100vw-20rem)] left-[20rem]" : "w-[calc(100vw-3.75rem)] left-[3.75rem]"}`}>
                    <Routes>
                        <Route path="/" element={<Home pageLoaded = {!loading} />} />
                        <Route path="/about" element={<About pageLoaded = {!loading} />} />
                        <Route path="/project" element={<Project pageLoaded = {!loading} />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
