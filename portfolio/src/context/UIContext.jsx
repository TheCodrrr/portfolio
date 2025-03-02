import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export function UIProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentHoverPage, setCurrentHoverPage] = useState("");
    const [currentPage, setCurrentPage] = useState("home");


    return (
        <UIContext.Provider value={{ darkMode, setDarkMode, sidebarOpen, setSidebarOpen, currentHoverPage, setCurrentHoverPage, currentPage, setCurrentPage }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    return useContext(UIContext);
}
