import React from "react";
import { useUI } from "./context/UIContext";

const socialLinks = [
  { name: "GitHub", icon: "fab fa-github", url: "https://github.com/yourusername" },
  { name: "LinkedIn", icon: "fab fa-linkedin", url: "https://linkedin.com/in/yourusername" },
  { name: "Twitter", icon: "fab fa-twitter", url: "https://twitter.com/yourusername" },
  { name: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com/yourusername" },
  { name: "LeetCode", icon: "fas fa-code", url: "https://leetcode.com/yourusername" },
  { name: "Gmail", icon: "fas fa-envelope", url: "mailto:your.email@gmail.com" },
  { name: "Facebook", icon: "fab fa-facebook", url: "https://facebook.com/yourusername" },
];

export default function About() {
  const { darkMode } = useUI();

  return (
    <div className={`h-full flex flex-col ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-900"}`}>
      {/* Fake Terminal Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-yellow-400 text-sm">
        <span className="text-red-500">🔴</span>
        <span>about-me.js</span>
        <span className="text-green-500">🟢</span>
      </div>

      <div className="flex h-full">
        {/* Sidebar with Line Numbers */}
        <div className="p-4 text-gray-400 text-sm border-r border-gray-700">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="py-0.5">{i + 1}</div>
          ))}
        </div>

        {/* Code Editor Content */}
        <div className="p-6 w-full">
          <pre className="text-lg">
            <span className="text-blue-400">const</span> <span className="text-green-400">aboutMe</span> <span className="text-pink-400">=</span> {"{"}
          </pre>
          <pre className="pl-6">
            <span className="text-yellow-400">"name"</span>: <span className="text-green-400">"Aryan Hansoti"</span>,
          </pre>
          <pre className="pl-6">
            <span className="text-yellow-400">"role"</span>: <span className="text-green-400">"Full Stack Developer"</span>,
          </pre>
          <pre className="pl-6">
            <span className="text-yellow-400">"university"</span>: <span className="text-green-400">"Nirma University"</span>,
          </pre>
          <pre className="pl-6">
            <span className="text-yellow-400">"interests"</span>: ["Web Dev", "Machine Learning", "Open Source"],
          </pre>
          <pre>{"}"}</pre>

          {/* Social Media Links */}
          <div className="mt-6">
            <pre className="text-lg">
              <span className="text-blue-400">const</span> <span className="text-green-400">socialLinks</span> <span className="text-pink-400">=</span> {"["}
            </pre>
            {socialLinks.map((social, index) => (
              <pre key={index} className="pl-6">
                {"{"} <span className="text-yellow-400">"name"</span>: <span className="text-green-400">"{social.name}"</span>, 
                <span className="text-yellow-400"> "url"</span>: <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  "{social.url}"
                </a> {"}"},
              </pre>
            ))}
            <pre>{"]"}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
