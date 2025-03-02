import React from "react";
import { useUI } from "./context/UIContext";
// import { Link } from "react-router-dom";
import './MainContent.css'
import Home from "./Home";
import About from "./About";
import Project from "./Project";

export default function MainContent() {
    const { darkMode, sidebarOpen, currentHoverPage, setCurrentHoverPage, currentPage, setCurrentPage } = useUI()

    const handleHoverName = (page) => {
        if (page == 'home') setCurrentHoverPage('home');
        else if (page == 'about') setCurrentHoverPage('about');
        else if (page == 'project') setCurrentHoverPage('project');
        else if (page == '') setCurrentHoverPage("");
    }

    let showContent = <Home />
    if (currentPage == 'home') showContent = <Home />
    else if (currentPage == 'about') showContent = <About />
    else if (currentPage == 'project') showContent = <Project />

    return (
        <>
            <div className={`main_container flex top-15 left-[3.75rem] fixed w-[calc(100vw-3.75rem)] h-[calc(100vh-3.75rem)] ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                <div className={`enlarged_sidebar_container overflow-hidden ${sidebarOpen ? "border-r border-gray-600 w-[16.25rem] left-[3.75rem]" : "w-0"}`} style={darkMode ? {backgroundColor: '#0b111b'} : {backgroundColor: '#e8e8e8'}}>
                    <ul className="navbar_elms_container w-full flex-col">
                        <li className="navbar_elm my-[0.59rem] h-10">
                            <button className={`navbar_elm_link h-full flex items-center pl-3 text-lg cursor-pointer w-full ${currentHoverPage == 'home' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-700"}`} onMouseEnter={() => handleHoverName('home')}
                            onMouseLeave={() => handleHoverName('')}
                            onClick={() => setCurrentPage('home')}
                            >
                                home<span className={`text-gray-500 ${currentHoverPage == 'home' ? "text-orange-400" : darkMode ? "text-gray-500" : "text-gray-500"}`}>.jsx</span>
                            </button>
                        </li>
                        <li className="navbar_elm mt-[1.18rem] h-10">
                            <button className={`navbar_elm_link h-full flex items-center pl-3 text-lg cursor-pointer w-full ${currentHoverPage == 'about' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-700"}`} onMouseEnter={() => handleHoverName('about')}
                            onMouseLeave={() => handleHoverName('')}
                            onClick={() => setCurrentPage('about')}
                            >
                                about<span className={`text-gray-500 ${currentHoverPage == 'about' ? "text-orange-400" : darkMode ? "text-gray-500" : "text-gray-500"}`}>.py</span>
                            </button>
                        </li>
                        <li className="navbar_elm mt-[1.18rem] h-10">
                            <button className={`navbar_elm_link h-full flex items-center pl-3 text-lg cursor-pointer w-full ${currentHoverPage == 'project' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-700"}`} onMouseEnter={() => handleHoverName('project')}
                            onMouseLeave={() => handleHoverName('')}
                            onClick={() => setCurrentPage('project')}
                            >
                                project<span className={`text-gray-500 ${currentHoverPage == 'project' ? "text-orange-400" : darkMode ? "text-gray-500" : "text-gray-500"}`}>.cpp</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={`main_content_container h-[calc(100vh-3.75rem)] top-15 overflow-y-auto fixed ${sidebarOpen ? "w-[calc(100vw-20rem)] left-[20rem]" : "w-[calc(100vw-3.75rem)] left-[3.75rem]"}`}>
                    { showContent }
                </div>
            </div>
        </>
    )
}