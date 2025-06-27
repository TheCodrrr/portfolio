import React, { useState } from "react";
import { useUI } from "./context/UIContext";
import "./Project.css";
import { motion } from "framer-motion";

const projects = [
  {
    name: "Tic Tac Toe",
    codeIcon: "fa-brands fa-angular",
    file: "tic_tac_toe.game.ts",
    image: "/project1.png",
    iconColor: "text-red-600",
    technologies: ["Angular.JS", "Typescript", "HTML", "CSS"],
    description: "A single-player Tic Tac Toe game with two difficulty levels—Easy and Hard—powered by hardcoded logic to simulate an intelligent opponent.",
    video: "../public/project2.mp4",
    githubUrl: "https://github.com/TheCodrrr/tic-tac-toe",
    features: [
      "Play against an AI in single-player mode.",
      "Choose between Easy and Hard difficulty.",
      "AI logic adapts moves based on game state.",
      "Clean and responsive user interface.",
    ],
    status: "completed",
    video: "uJYox4wqr9Y",
  },
  {
    name: "Spotify Clone",
    file: "spotify.clone.jsx",
    codeIcon: "fa-brands fa-react",
    iconColor: "text-blue-700",
    image: "/project2.png",
    technologies: ["ReactJS", "HTML", "CSS"],
    description:
      "A music streaming web app that replicates core Spotify features, allowing users to explore and play songs from curated playlists with real-time data integration.",
    video: "../public/project3.mp4",
    githubUrl: "https://github.com/TheCodrrr/spotify-clone",
    features: [
      "Music player with playback controls",
      "User playlist creation and management",
      "Artist and album browsing",
      "Personalized recommendations",
    ],
    status: "completed",
    video: "7i3m6nPbJ7c",
  },
  {
    name: "Crop Finance Pro",
    file: "farmer_app.service.py",
    codeIcon: "fa-brands fa-python",
    iconColor: "text-green-500",
    image: "/project3.png",
    technologies: ["Flask", "Spring Boot", "ReactJS", "ML Models"],
    description:
      "A web platform that bridges the gap between farmers and banks by enabling loan approvals based on AI-generated credit scores using agricultural and financial data.",
    video: "../public/project4.mp4",
    githubUrl: "https://github.com/TheCodrrr/Farmer-Helping-Team",
    features: [
      "AI-based credit score generation",
      "Integration with external agri-data APIs",
      "Multilingual voice-enabled chatbot (supports Hindi)",
      "Email notifications on loan status",
    ],
    collaborative: true,
    status: "completed",
    video: "ACmA0cTqpiQ",
  }
];

const upcomingProjects = [
  {
    name: "Lodge",
    file: "lodge.service.jsx",
    codeIcon: "fa-brands fa-react",
    iconColor: "text-purple-600",
    image: "/project-placeholder.png",
    technologies: ["ReactJS", "Node.js", "MongoDB", "Express.js"],
    description: "A service based website which will primarily serve the purpose of guiding users through various government services, necessary steps to be taken in case of accidents, emergencies or incidents.",
    githubUrl: "https://github.com/TheCodrrr/lodge",
    features: [
      "Guided navigation for government services",
      "Emergency response protocols",
      "Incident reporting tools",
      "Legal actions resource library for users",
      "Multilingual support"
    ],
    status: "upcoming",
    expectedCompletion: "Q2 2024"
  }
];

export default function Project({ pageLoaded }) {
  const { darkMode } = useUI();
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [videoBtnText, setVideoBtnText] = useState("View Demo");
  const [videoBtnIcon, setVideoBtnIcon] = useState("fas fa-play-circle text-lg");
  const [copySuccess, setCopySuccess] = useState("");
  const [copyTimeout, setCopyTimeout] = useState(null);
  const openProject = (project) => {
    if (!openTabs.some((tab) => tab.name === project.name)) {
      setOpenTabs([...openTabs, project]);
    }
    setActiveTab(project);
    setExecuting(false);
    // Reset demo button state when switching projects
    setVideoBtnText("View Demo");
    setVideoBtnIcon("fas fa-play-circle text-lg");
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

  const extractYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : url; // fallback: if url is just the ID
  }


  const handleVideoExecution = () => {
    setExecuting(!executing);
    if (!executing) {
      setVideoBtnText("Close Demo");
      setVideoBtnIcon("fas fa-stop-circle text-lg");
    } else {
      setVideoBtnText("View Demo");
      setVideoBtnIcon("fas fa-play-circle text-lg");
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        // Clear any existing timeout
        if (copyTimeout) clearTimeout(copyTimeout);
        
        setCopySuccess("Copied!");
        
        // Set a new timeout to clear the message after 2 seconds
        const timeout = setTimeout(() => {
          setCopySuccess("");
        }, 2000);
        
        setCopyTimeout(timeout);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return pageLoaded ? (
    <div className="project_page_container text-white h-full">
      {/* Code Editor Container */}
      <div
        className={`flex border shadow-lg overflow-hidden h-full ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"
        }`}
      >
        {/* Code Editor (Left Side) */}
        <div className="flex-1 flex flex-col h-full">
          {/* Tab Bar */}
          <div
            className={`flex items-center border-b px-2 pt-2 text-sm space-x-2 overflow-x-auto ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-100 border-gray-500"
            }`}
          >
            {openTabs.length === 0 ? (
              <span
                className={`px-4 ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Welcome - Select a project
              </span>
            ) : (
              openTabs.map((tab) => (   
              <motion.div
                  key={tab.name}
                  onClick={() => {
                    setActiveTab(tab);
                    setExecuting(false);
                    setVideoBtnText("View Demo");
                    setVideoBtnIcon("fas fa-play-circle text-lg");
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-t-md cursor-pointer ${
                    activeTab?.name === tab.name
                      ? darkMode
                        ? "bg-gray-700 text-yellow-400"
                        : "bg-gray-300 text-blue-600"
                      : darkMode
                      ? "bg-gray-900 text-gray-400 hover:bg-gray-700"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
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
                </motion.div>
              ))
            )}
          </div>

          {/* Project Details & Code Area */}
          <div
            className={`text-sm font-mono overflow-auto flex-1 p-2 sm:p-4 project_code ${
              darkMode
                ? "text-gray-200 bg-gray-900"
                : "text-gray-800 bg-gray-200"
            }`}
          >
            {activeTab ? (
              <motion.div
                className="flex flex-col space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Upper Section: Image, Title, Tech, Buttons */}
                <div
                  className={`flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-3 sm:p-6 rounded-md ${
                    darkMode ? "bg-gray-800 bg-opacity-90" : "bg-gray-100"
                  } shadow-lg`}
                >
                  <div className="w-full md:w-1/3 flex justify-center">
                    <img
                      src={activeTab.image}
                      alt={activeTab.name}
                      className="aspect-square w-full max-w-[200px] md:max-w-[250px] rounded-md object-cover border border-gray-600 shadow-md"
                    />
                  </div>
                  <div className="flex flex-col flex-1 pl-0 md:pl-5 h-50">
                    <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 flex py-2 sm:py-3 flex-wrap">
                      {activeTab.name}
                      {activeTab.collaborative && (
                        <span className="ml-2 bg-blue-600 text-xs py-1 px-2 rounded-full flex items-center" title="Collaborative Project">
                          <i className="fas fa-users mr-1"></i>
                          <span className="text-xs font-normal">Team</span>
                        </span>
                      )}
                    </h3>

                    {/* Technology badges */}
                    <div className="mb-4 sm:mb-6">
                      <p
                        className={`text-sm flex mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                      >
                        <i className="fas fa-code-branch mr-2"></i>
                        Technologies:
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-3 min-h-[40px] py-2 z-5 relative">
                        {activeTab.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium inline-flex items-center justify-center ${
                              darkMode
                                ? "bg-gray-700 text-gray-200 border border-gray-600"
                                : "bg-gray-300 text-gray-800 border border-gray-400"
                            } hover:shadow-lg z-5`}
                            style={{ minWidth: "fit-content" }}
                            whileHover={{ 
                              scale: 1.1, 
                              y: -3,
                              zIndex: 20 
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>                    {/* View Demo Button and GitHub Button */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 mt-auto justify-start">
                      {!activeTab.hideDemo && activeTab.status === "completed" && (
                        <motion.button
                          onClick={handleVideoExecution}
                          className={`px-5 py-2 rounded-md text-gray-200 flex items-center justify-center md:max-w-[180px] ${
                            executing
                              ? "bg-gradient-to-r from-purple-700 to-red-500 hover:from-purple-600 hover:to-red-400"
                              : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
                          } shadow-lg border border-opacity-50 ${
                            executing ? "border-red-400" : "border-blue-300"
                          }`}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: executing 
                              ? "0px 0px 12px rgba(255,100,100,0.6)" 
                              : "0px 0px 12px rgba(100,200,255,0.6)"
                          }}
                          whileTap={{ scale: 0.98 }}
                          animate={{
                            boxShadow: executing
                              ? ["0px 0px 0px rgba(255,100,100,0)", "0px 0px 8px rgba(255,100,100,0.5)", "0px 0px 0px rgba(255,100,100,0)"]
                              : ["0px 0px 0px rgba(100,200,255,0)", "0px 0px 8px rgba(100,200,255,0.5)", "0px 0px 0px rgba(100,200,255,0)"]
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 10,
                            boxShadow: {
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "loop"
                            }
                          }}
                        >
                          <i className={videoBtnIcon}></i> 
                          <span className="font-medium ml-2">{videoBtnText}</span>
                        </motion.button>
                      )}
                        {/* GitHub Button */}
                      {activeTab.githubUrl && (
                        <motion.a
                          href={activeTab.githubUrl}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`px-5 py-2 rounded-md text-gray-200 flex items-center justify-center shadow-lg md:max-w-[160px] ${
                            darkMode
                              ? "bg-gradient-to-r from-purple-900 to-indigo-800 hover:from-purple-800 hover:to-indigo-700 border border-indigo-700"
                              : "bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-purple-700 hover:to-indigo-600 border border-indigo-500"
                          }`}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0px 0px 12px rgba(129,140,248,0.5)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <i className="fab fa-github text-lg"></i>
                          <span className="font-medium ml-2">GitHub</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Details and Video Section Combined */}
                <div
                  className={`p-3 sm:p-5 rounded-md ${
                    darkMode ? "bg-gray-800 bg-opacity-90" : "bg-gray-100"
                  } shadow-lg backdrop-blur-sm border mb-[150px] ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                >
                  {executing ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full"
                    >
                      <div className="w-full rounded-md shadow-lg border-2 border-gray-600 overflow-hidden">
                        <iframe
                          className="w-full aspect-video"
                          src={`https://www.youtube.com/embed/${extractYouTubeID(activeTab.video)}`}
                          title="YouTube video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4
                        className={`text-md font-semibold mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <i className="fas fa-info-circle mr-2"></i>
                        Project Description
                      </h4>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-900"
                        } mb-4 text-base`}
                      >
                        {activeTab.description}
                      </p>

                      {/* Key Features */}
                      <div
                        className={`${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        } p-3 sm:p-4 rounded-md mt-6`}
                      >
                        <h5
                          className={`text-sm font-semibold mb-2 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          <i className="fas fa-list-check mr-2"></i> Key
                          Features
                        </h5>
                        {activeTab.features && (
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeTab.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                className="flex items-center"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="text-green-400 mr-2">✓</span>
                                <span
                                  className={`text-xs ${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                  }`}
                                >
                                  {feature}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <i className="fas fa-code text-4xl sm:text-6xl text-gray-600 mb-4"></i>
                <p className="text-base sm:text-lg text-center px-4">Welcome to the Project Explorer</p>
                <p className="text-xs sm:text-sm mt-1 text-center px-4">
                  Select a project from the sidebar to start exploring!
                </p>
              </motion.div>
            )}
          </div>
        </div>        {/* Right Sidebar (Projects) - Always on right for desktop, bottom for mobile */}
        <div
          className={`hidden md:block md:w-1/4 border-l border-gray-700 p-3 text-sm ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2
            className={`uppercase mb-3 text-xl flex items-center ${
              darkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            <i className="fas fa-folder-open mr-2"></i> Projects
          </h2>
          
          {/* Completed Projects Section */}
          <div className="space-y-2 mb-6">
            <h3 className={`text-sm font-semibold mb-2 flex items-center ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}>
              <i className="fas fa-check-circle mr-2"></i>
              Completed
            </h3>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                onClick={() => openProject(project)}
                className={`flex items-center space-x-2 p-2 sm:p-3 rounded-md cursor-pointer transition-all 
                  ${
                  activeTab?.name === project.name
                    ? darkMode
                      ? "bg-gray-700 text-yellow-400 shadow-md"
                      : "bg-gray-300 text-blue-600 shadow-md"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-300"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={`${project.codeIcon} ${project.iconColor}`}></i>
                <span className="text-xs sm:text-sm truncate">{project.name}</span>
                {project.collaborative && (
                  <i className="fas fa-users ml-1 text-xs text-blue-400" title="Collaborative Project"></i>
                )}
              </motion.div>
            ))}
          </div>

          {/* Upcoming Projects Section */}
          <div className="space-y-2">
            <h3 className={`text-sm font-semibold mb-2 flex items-center ${
              darkMode ? "text-amber-400" : "text-amber-600"
            }`}>
              <i className="fas fa-clock mr-2"></i>
              Upcoming
            </h3>
            {upcomingProjects.map((project, index) => (
              <motion.div
                key={index}
                onClick={() => openProject(project)}
                className={`flex items-center space-x-2 p-2 sm:p-3 rounded-md cursor-pointer transition-all 
                  ${
                  activeTab?.name === project.name
                    ? darkMode
                      ? "bg-gray-700 text-yellow-400 shadow-md"
                      : "bg-gray-300 text-blue-600 shadow-md"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-800 hover:bg-gray-300"
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={`${project.codeIcon} ${project.iconColor}`}></i>
                <span className="text-xs sm:text-sm truncate">{project.name}</span>
                {project.collaborative && (
                  <i className="fas fa-users ml-1 text-xs text-blue-400" title="Collaborative Project"></i>
                )}
              </motion.div>
            ))}
          </div>
        </div>
          {/* Mobile Projects Bar (shown at bottom on small screens only when scrolled to bottom) */}
          <div
            className={`md:hidden w-full border-t border-gray-700 p-3 z-[9999] text-sm fixed bottom-0 left-0 
              transition-all duration-300 ease-in-out
              ${darkMode ? "bg-gray-800" : "bg-gray-100"} 
              `}
          >
            <h2
              className={`uppercase mb-2 text-lg flex items-center justify-center ${
                darkMode ? "text-gray-400" : "text-gray-700"
              }`}
            >
              <i className="fas fa-folder-open mr-2"></i> Projects
            </h2>
            
            {/* Completed Projects */}
            <div className="mb-3">
              <h3 className={`text-xs font-semibold mb-2 text-center ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}>
                <i className="fas fa-check-circle mr-1"></i>
                Completed
              </h3>
              <div className="flex flex-wrap gap-2 justify-center overflow-x-auto">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    onClick={() => openProject(project)}
                    className={`flex items-center space-x-1 p-1.5 rounded-md cursor-pointer transition-all 
                      max-w-[30%] flex-grow
                      ${
                      activeTab?.name === project.name
                        ? darkMode
                          ? "bg-gray-700 text-yellow-400 shadow-md"
                          : "bg-gray-300 text-blue-600 shadow-md"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-800 hover:bg-gray-300"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className={`${project.codeIcon} ${project.iconColor}`}></i>
                    <span className="text-xs truncate">{project.name}</span>
                    {project.collaborative && (
                      <i className="fas fa-users ml-1 text-xs text-blue-400" title="Collaborative Project"></i>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Projects */}
            <div>
              <h3 className={`text-xs font-semibold mb-2 text-center ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`}>
                <i className="fas fa-clock mr-1"></i>
                Upcoming
              </h3>
              <div className="flex flex-wrap gap-2 justify-center overflow-x-auto pb-safe">
                {upcomingProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    onClick={() => openProject(project)}
                    className={`flex items-center space-x-1 p-1.5 rounded-md cursor-pointer transition-all 
                      max-w-[45%] flex-grow
                      ${
                      activeTab?.name === project.name
                        ? darkMode
                          ? "bg-gray-700 text-yellow-400 shadow-md"
                          : "bg-gray-300 text-blue-600 shadow-md"
                        : darkMode
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-800 hover:bg-gray-300"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className={`${project.codeIcon} ${project.iconColor}`}></i>
                    <span className="text-xs truncate">{project.name}</span>
                    {project.collaborative && (
                      <i className="fas fa-users ml-1 text-xs text-blue-400" title="Collaborative Project"></i>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
