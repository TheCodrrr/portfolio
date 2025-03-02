import React, { useState } from "react";
import { useUI } from "./context/UIContext";
import './Project.css'

const projects = [
  {
    name: "Vaccine Management",
    codeIcon: "fa-brands fa-python",
    file: "vaccine_management.py",
    image: "/images/chat.png",
    iconColor: "text-yellow-400",
    technologies: ["Python", "Tkinter", "SQL"],
    description: "A real-time chat application with instant messaging.",
    video: "/videos/chat-demo.mp4",
    code: `const sendMessage = (msg) => {\n  console.log("User:", msg);\n};\n\nsendMessage("Hello!");`,
},
{
    name: "Tic Tac Toe",
    codeIcon: "fa-brands fa-angular",
    file: "tic_tac_toe.ts",
    image: "/images/reviews.png",
    iconColor: "text-red-600",
    technologies: ["Angular.JS", "Typescript", "HTML", "CSS"],
    description: "A platform that gathers and analyzes product reviews.",
    video: "/videos/reviews-demo.mp4",
    code: `const getReviews = async () => {\n  const data = await fetch("https://api.reviews.com");\n  return data.json();\n};\n\ngetReviews();`,
},
{
    name: "Spotify Clone",
    file: "spotify.jsx",
    codeIcon: "fa-brands fa-react",
    iconColor: "text-blue-700",
    image: "../public/project1.png",
    technologies: ["ReactJS", "HTML", "CSS"],
    description:
    "A music streaming platform that mimics Spotify's functionality.",
    video: "/videos/spotify-demo.mp4",
    code: `const playMusic = () => {\n  console.log("Playing music...");\n};\n\nplayMusic();`,
},
{
    name: "Website Templates",
    file: "designs.css",
    image: "/images/stress.png",
    codeIcon: "fa-brands fa-css3",
    iconColor: "text-blue-400",
    technologies: ["HTML", "CSS"],
    description: "An AI-driven app that creates stress relief plans.",
    video: "/videos/stress-demo.mp4",
    code: `const generatePlan = (user) => {\n  return \`Hello \${user}, here’s your daily routine!\`;
};\n\ngeneratePlan("Aryan");`,
  },
];

export default function Project() {
    const { darkMode } = useUI()
    const [openTabs, setOpenTabs] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [executing, setExecuting] = useState(false);
    const [videoBtnText, setVideoBtnText] = useState("Execute");
    const [videoBtnIcon, setVideoBtnIcon] = useState("fas fa-play mr-2")

  const openProject = (project) => {
    if (!openTabs.some((tab) => tab.name === project.name)) {
      setOpenTabs([...openTabs, project]);
    }
    setActiveTab(project);
    setExecuting(false);
  };

  const closeTab = (project) => {
    const filteredTabs = openTabs.filter((tab) => tab.name !== project.name);
    setOpenTabs(filteredTabs);
    if (activeTab?.name === project.name) {
      setActiveTab(
        filteredTabs.length ? filteredTabs[filteredTabs.length - 1] : null
      );
    }
    setExecuting(false);
  };

//   console.log(JSON.stringify(openTabs))

  const handleVideoExecution = () => {
    setExecuting(!executing)
    if (videoBtnText === "Execute") {
        setVideoBtnText("Cancel");
        setVideoBtnIcon("fa fa-xmark mr-2");
    }
    else {
        setVideoBtnText("Execute");
        setVideoBtnIcon("fas fa-play mr-2");
    }
  }

  return (
    <div className="project_page_container text-white h-full">
      {/* Code Editor Container */}
      <div className={`flex border shadow-lg overflow-hidden h-full ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}>
        {/* Code Editor (Left Side) */}
        <div className="flex-1 flex flex-col h-full">
          {/* Tab Bar */}
          <div className={`flex items-center border-b px-2 pt-2 text-sm space-x-2 overflow-x-auto ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-500"}`}>
            {openTabs.length === 0 ? (
              <span className={`px-4 ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                Welcome - Select a project
              </span>
            ) : (
              openTabs.map((tab) => (
                <div
                key={tab.name}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-t-md cursor-pointer ${
                    activeTab?.name === tab.name
                    ? darkMode
                        ? "bg-gray-700 text-yellow-400"
                        : "bg-gray-300 text-blue-600"
                    : darkMode
                    ? "bg-gray-900 text-gray-400 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                >
                <i className={tab.codeIcon + " " + tab.iconColor}></i>
                <span>{tab.file}</span>
                <button
                    onClick={(event) => {
                    event.stopPropagation();
                    closeTab(tab);
                    }}
                    className={`ml-2 hover:text-red-400 flex ${
                    darkMode ? "text-gray-500" : "text-gray-600"
                    }`}
                >
                    <i className="fas fa-times"></i>
                </button>
                </div>
              ))
            )}
          </div>

          {/* Project Details & Code Area */}
          <div className={`text-sm font-mono overflow-auto flex-1 p-4 project_code ${darkMode ? "text-gray-200 bg-gray-900" : "text-gray-800 bg-gray-200"}`}>
            {activeTab ? (
              <div className="flex flex-col space-y-4">
                {/* Upper Section: Image, Title, Tech, Buttons */}
                <div className={`flex space-x-4 p-6 rounded-md items-center ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <img
                    src={activeTab.image}
                    alt={activeTab.name}
                    className="w-50 h-50 rounded-md object-cover border border-gray-600"
                  />
                  <div className="flex flex-col flex-1 pl-5 h-50">
                    <h3 className="text-3xl font-bold text-yellow-400 flex py-3">
                      {activeTab.name}
                    </h3>
                    <p className={`text-sm flex ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
                      Technologies: {activeTab.technologies.join(", ")}
                    </p>
                    <div className="flex space-x-3 mt-2">
                      <button className={`px-3 py-1 rounded-md flex items-center cursor-pointer ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}>
                        <i className="fas fa-thumbs-up mr-2"></i> Like
                      </button>
                      <button className={`px-3 py-1 rounded-md flex items-center cursor-pointer ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-900"}`}>
                        <i className="fas fa-share mr-2"></i> Share
                      </button>
                      <button
                        onClick={handleVideoExecution}
                        className={`px-3 py-1 bg-green-700 hover:bg-green-600 rounded-md text-gray-200 flex items-center cursor-pointer`}
                      >
                        <i className={videoBtnIcon}></i> { videoBtnText }
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lower Section: Description (Replaced by Video on Execute) */}
                <div className={`p-3 rounded-md ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  {executing ? (
                    <video controls className="w-full rounded-md">
                      <source src={activeTab.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p className={darkMode ? "text-gray-300" : "text-gray-900"}>{activeTab.description}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <i className="fas fa-code text-6xl text-gray-600 mb-4"></i>
                <p className="text-lg">Welcome to the Project Editor</p>
                <p className="text-sm mt-1">
                  Select a project from the sidebar to start coding!
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Right Sidebar (Projects) */}
        <div className={`w-1/4 border-l border-gray-700 p-3 text-sm ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <h2 className={`uppercase mb-2 text-xl ${darkMode ? "text-gray-400" : "text-gray-700" }`}>Projects</h2>
          {projects.map((project, index) => (
            <div
            key={index}
            onClick={() => openProject(project)}
            className={`flex items-center space-x-2 p-2 my-3 rounded-md cursor-pointer ${
              activeTab?.name === project.name
                ? darkMode
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-300 text-blue-600"
                : darkMode
                ? "text-gray-300 hover:bg-gray-700"
                : "text-gray-800 hover:bg-gray-300"
            }`}
          >
            <i className={`fas fa-folder ${darkMode ? "text-yellow-500" : "text-blue-500"}`}></i>
            <span>{project.name}</span>
          </div>
          
          ))}
        </div>
      </div>
    </div>
  );
}
