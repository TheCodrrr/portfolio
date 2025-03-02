import { useUI } from "./context/UIContext";
import './Navbar.css'
import { Link } from "react-router-dom";

export default function Navbar() {
    const { darkMode, setDarkMode } = useUI()

    return (
        <div className={`w-[100%] flex items-center justify-between shadow-md border-b px-1 border-gray-700 h-15 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <Link to={`/`} className="text-2xl font-bold text-orange-400 w-25 ml-2">Myse.lf</Link>
        
        <div className="relative w-1/3">
            <input
            type="text"
            placeholder="Search editor"
            className={`w-full rounded-md border focus:outline-none h-10 ${darkMode ? 'bg-gray-900 border-gray-600 hover:bg-gray-800 focus:border-gray-200 text-white' : 'bg-white border-gray-900 hover:bg-gray-200 text-gray-800'}`}
            style={{padding: '0 10px'}}
            />
        </div>
        
        <div className="flex items-center gap-3 pr-3">
            {/* <button className="h-10 mr-10" style={{backgroundColor: 'red'}}>
                <div className="app">
                <div className="circle" />
                <label htmlFor="switch" />
                </div>
            </button> */}

            <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-10 items-center justify-center aspect-square transition duration-300 cursor-pointer bg-gray-800 rounded-md hover:bg-gray-700 btn_mode ${darkMode ? "" : ""}`}
            >
                <span className={`circle transition duration-300 ${darkMode ? "darkMode" : ""}`}/>
                <span className={`switch transition duration-300 ${darkMode ? "darkMode" : ""}`}/>
            </button>
        </div>
    
        </div>
    );
}
