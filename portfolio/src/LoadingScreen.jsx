import React, { useEffect, useState } from "react";
import { useUI } from "./context/UIContext";

const packages = [
  "[1/12] Fetching package metadata from multiple registry sources (npm, yarn, pnpm, local cache, and fallback mirrors), verifying SSL certificates, ensuring network connectivity, checking system proxy settings, and retrying failed requests up to 5 times before falling back to cached versions...",
  "[2/12] Resolving dependencies, analyzing package trees, checking for potential version mismatches, handling peer dependencies, identifying circular dependencies, ensuring compatibility with installed global packages, running deduplication on node_modules, and attempting to optimize package hoisting for minimal duplication...",
  "[3/12] Downloading packages from secure CDNs and registry mirrors, validating package signatures, verifying SHA-256 checksums, handling potential corruption issues, retrying failed downloads due to network instability, calculating estimated download time based on connection speed, and ensuring partial downloads resume correctly...",
  "[4/12] Installing eslint (7.2 MB) – downloading additional rule sets, applying project-specific linting configurations, scanning for deprecated rules, ensuring compatibility with Prettier, checking for workspace-based overrides, and validating eslint.rc configuration file for best practices...",
  "[4/12] Installing typescript (10.4 MB) – setting up compiler options, initializing tsconfig.json, generating declaration files, running type checks against installed dependencies, verifying strict mode enforcement, and ensuring backward compatibility with ES5/ES6/ESNext target versions...",
  "[4/12] Installing webpack (8.3 MB) – configuring bundler settings, resolving import/export tree, handling code-splitting optimizations, tree-shaking unused modules, generating hashed output filenames for cache busting, and optimizing bundle size by applying gzip and Brotli compression...",
  "[5/12] Compiling source files – transpiling JSX, processing TypeScript to JavaScript, optimizing Babel transforms, generating intermediate build artifacts, handling dynamic import syntax, integrating polyfills for legacy browser support, and applying minification steps to reduce overall script size...",
  "[5/12] Optimizing assets – compressing images (JPEG, PNG, SVG, WebP), inlining critical CSS, generating optimized font subsets, lazy-loading non-essential assets, resolving CORS issues for external resource loading, and verifying CDN delivery efficiency...",
  "[6/12] Verifying integrity – cross-checking installed versions against lockfile, re-running dependency graph checks, ensuring no mismatched versions in node_modules, detecting potential tampering or corruption, and resolving hash mismatches via automatic reinstall...",
  "[7/12] Running post-install scripts – executing preconfigured hooks, updating global binaries, handling special-case installations like husky for Git hooks, verifying script execution permissions, and ensuring installed dependencies adhere to project configurations...",
  "[8/12] Cleaning up temporary files – removing unnecessary logs, deleting redundant cache files, optimizing storage allocation, purging old versions of dependencies, ensuring proper symlink resolution, and freeing up disk space for future installs...",
  "[9/12] Finalizing build process – generating production-ready files, validating minified scripts, running additional optimization passes for performance, and preparing for deployment by stripping development-only dependencies...",
  "[10/12] Checking for runtime compatibility – scanning system environment, ensuring required Node.js version is installed, verifying compatibility with package.json engines field, checking for missing native bindings, and applying appropriate shims where necessary...",
  "[11/12] Running security checks – scanning installed packages for known vulnerabilities, generating security audit reports, checking for CVE advisories, validating sandboxed execution environments, and prompting for updates if necessary...",
  "[12/12] Generating final output – preparing launch environment, applying final patches, ensuring module resolution correctness, performing deep package tree validation, and ensuring hot-reload compatibility for development mode...",
  "✔ Download complete. Finalizing setup – verifying execution paths, ensuring correct binary linking, running final permission checks, and confirming all installed dependencies are in sync...",
  "✔ Environment variables set. Applying user-specific preferences, ensuring correct shell initialization, validating path resolution, and confirming proper runtime execution settings...",
  "✔ Build successful! Launching application – initializing runtime modules, warming up caches, checking for first-time setup requirements, and finalizing execution environment...",
  "🚀 Application started successfully! Server is now running on http://localhost:3000, watching for file changes, enabling live reload, and monitoring performance metrics for development mode..."
];



export default function LoadingScreen({ onComplete }) {
  const { darkMode } = useUI()
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0); // Progress indicator

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < 19) { 
        setLogs((prevLogs) => [...prevLogs, `> ${packages[index] || "..."}`]);
        setProgress(((index + 1) / 19) * 100);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 200); // Small delay for a smooth transition
      }
    }, 2000 / 30); // Ensures animation completes in exactly 4 seconds
  
    return () => clearInterval(interval);
  }, [onComplete]);
  
  

  return (
    <div className={`loading_screen_container top-[3.75rem] left-[3.75rem] w-[calc(100vw-3.75rem)] h-[calc(100vh-3.75rem)] ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      <div className={`fixed h-full text-green-400 p-3 font-mono text-[0.7rem] overflow-y-auto z-50 flex flex-col items-start ${darkMode ? "bg-gray-900 text-green-400" : "bg-white text-green-600"}`}>
        <pre className="text-left leading-tight break-words whitespace-pre-wrap w-full">
          {logs.map((log, i) => (
            <span key={i} className="animate-fadeIn block my-2">{log}</span>
          ))}
        </pre>
        <div className={`mt-4 text-left w-full ${darkMode ? "text-green-400" : "text-green-600"}`}>
          Download Progress: [{progress.toFixed(1)}%] {progress < 100 ? "⏳" : "✅"}
        </div>
      </div>
    </div>
  );
}
