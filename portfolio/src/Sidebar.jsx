import React, { useState } from "react";
import { useUI } from "./context/UIContext";
import './Sidebar.css'


export default function Sidebar() {
    // const
    const { darkMode, sidebarOpen, setSidebarOpen, currentHoverPage, setCurrentHoverPage, currentPage, setCurrentPage } = useUI();
    const [page, setPage] = useState('project');

    const handleHoverIcon = (page) => {
        if (page == 'home') setCurrentHoverPage('home');
        else if (page == 'about') setCurrentHoverPage('about');
        else if (page == 'project') setCurrentHoverPage('project');
        else if (page == '') setCurrentHoverPage("");
    }

    const toggleProject = () => {
        setCurrentPage('project')
    }
    // console.log(darkMode);

    return (
        <>
            <div className={`fixed top-0 left-0 h-full w-[3.75rem] border-r shadow-lg z-50 flex items-center border-gray-700 flex-col ${darkMode ? "bg-gray-900" : "bg-white"}`}>
                <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`flex h-10 items-center justify-center aspect-square cursor-pointer rounded-md sidebar_button flex-col my-[0.59rem] overflow-hidden ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"}`}
                >
                    <div className={`btn_bars h-1 w-6 my-[0.1rem] rounded-sm ${sidebarOpen ? "activate_bars activate_bars1" : ""} ${darkMode ? "bg-white" : "bg-gray-800"}`}></div>
                    <div className={`btn_bars h-1 w-6 my-[0.1rem] rounded-sm ${sidebarOpen ? "activate_bars activate_bars2" : ""} ${darkMode ? "bg-white" : "bg-gray-800"}`}></div>
                    <div className={`btn_bars h-1 w-6 my-[0.1rem] rounded-sm ${sidebarOpen ? "activate_bars activate_bars3" : ""} ${darkMode ? "bg-white" : "bg-gray-800"}`}></div>
                </button>

                <span className="w-full h-[0.05rem] bg-gray-600"></span>

                <button 
                className={`flex h-10 items-center justify-center aspect-square cursor-pointer rounded-md sidebar_button my-[0.59rem]`}
                onMouseEnter={() => handleHoverIcon('home')}
                onMouseLeave={() => handleHoverIcon('')}
                onClick={() => setCurrentPage('home')}
                >
                    <i className={`fa-solid fa-house text-lg ${currentHoverPage === 'home' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-800"}`}></i>
                </button>
                <button 
                className={`flex h-10 items-center justify-center aspect-square cursor-pointer rounded-md sidebar_button my-[0.59rem]`}
                onMouseEnter={() => handleHoverIcon('about')}
                onMouseLeave={() => handleHoverIcon('')}
                onClick={() => setCurrentPage('about')}
                >
                    <i className={`fa-solid fa-book text-lg 
                        ${currentHoverPage === 'about' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-800"}`}
                    ></i>
                </button>
                <button 
                onClick={toggleProject}
                className={`flex h-10 items-center justify-center aspect-square cursor-pointer rounded-md sidebar_button my-[0.59rem]`}
                onMouseEnter={() => handleHoverIcon('project')}
                onMouseLeave={() => handleHoverIcon('')}
                >
                    {/* { currentPage != 'project' ? (
                        <i className={`fas fa-laptop-code text-lg ${currentHoverPage === 'project' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-800"}`}></i>
                    ) : (
                        <i className={`fa-solid fa-folder-open text-lg ${currentHoverPage === 'project' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-800"}`}></i>
                    ) } */}
                    <i className={`fas fa-laptop-code text-lg ${currentHoverPage === 'project' ? "text-orange-400" : darkMode ? "text-white" : "text-gray-800"}`}></i>
                </button>
            </div>
        </>
    )
}