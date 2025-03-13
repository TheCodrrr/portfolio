import React from "react";
import { motion } from "framer-motion";

const commits = [
  { date: "2023-05-12", message: "Learned Basics of Python 🐍", hash: "a1b2c3d" },
  { date: "2023-07-08", message: "Started with Data Structures 📚", hash: "d4e5f6g" },
  { date: "2023-09-21", message: "Explored Web Development 🌍", hash: "h7i8j9k" },
  { date: "2024-01-15", message: "Built My First Full-Stack Project 🚀", hash: "l0m1n2o" },
  { date: "2024-03-01", message: "Diving into Machine Learning 🤖", hash: "p3q4r5s" },
];

export default function About({ pageLoaded }) {
  return pageLoaded ? (
    <div className="h-screen w-full flex bg-gray-900 text-gray-200 font-mono">
      {/* Left Side - Personal Details */}
      <div className="w-2/3 p-6 border-r border-gray-700">
        {/* Title */}
        <h1 className="text-xl text-green-400">📜 About Me</h1>
        <div className="mt-4 text-sm space-y-3">
          <p><span className="text-blue-400">// School:</span> DPS Gandhinagar</p>
          <p><span className="text-blue-400">// College:</span> Nirma University</p>
          <p><span className="text-blue-400">// Degree:</span> B.Tech in CSE (2027)</p>
          <p><span className="text-blue-400">// Interests:</span> Web Dev, AI, Open Source</p>
          <p><span className="text-blue-400">// Skills:</span> JavaScript, Python, C++, React, Node.js</p>
        </div>
      </div>

      {/* Right Side - GitHub Commit History */}
      <div className="w-1/3 p-6">
        <h1 className="text-xl text-yellow-400">📌 Commit History</h1>
        <div className="mt-4 space-y-4 border-l-2 border-gray-700 pl-4">
          {commits.map((commit, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col space-y-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <p className="text-sm text-gray-400">{commit.date}</p>
              <p className="text-green-400">commit <span className="text-gray-500">{commit.hash}</span></p>
              <p className="text-yellow-300">{commit.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
