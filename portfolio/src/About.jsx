import { Globe, Database, Server, Code, Layout, PieChart, BarChart, LineChart, Copy, Check, GitBranch, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { useUI } from "./context/UIContext";
import * as d3 from 'd3';
import Chart from 'chart.js/auto';

const About = ({ pageLoaded }) => {
  const { darkMode } = useUI();
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);
  const radarChartRef = useRef(null);
  const [charts, setCharts] = useState([]);
  const [copiedLink, setCopiedLink] = useState(null);
  const [expandedSkills, setExpandedSkills] = useState({});
  const [expandedCharts, setExpandedCharts] = useState({});

  const toggleSkillExpansion = (skillName) => {
    setExpandedSkills(prev => {
      const isExpanding = !prev[skillName];
      
      // Schedule chart creation after state update and DOM render
      if (isExpanding) {
        setTimeout(() => {
          createTechSkillChart(skillName);
        }, 100);
      } else {
        // Destroy chart if it exists
        if (expandedCharts[skillName]) {
          expandedCharts[skillName].destroy();
          setExpandedCharts(prev => {
            const newCharts = {...prev};
            delete newCharts[skillName];
            return newCharts;
          });
        }
      }
      
      return {
        ...prev,
        [skillName]: isExpanding
      };
    });
  };

  const skillsData = [
    { skill: ".js", level: 90 },
    { skill: ".cpp", level: 80 },
    { skill: ".py", level: 80 },
    { skill: ".c", level: 60 },
    { skill: ".ts", level: 50 }
  ];
  
  const frameworkData = {
    labels: ['React', 'TailwindCSS', 'Bootstrap', 'Angular'],
    datasets: [{
      data: [40, 20, 20, 20],
      backgroundColor: darkMode ? 
        ['#f97316', '#84cc16', '#06b6d4', '#8b5cf6'] : 
        ['#ea580c', '#65a30d', '#0891b2', '#7c3aed'],
      borderColor: darkMode ? '#1f2937' : '#f8fafc',
      borderWidth: 2
    }]
  };
  
  const skillSetData = {
    labels: ['Frontend', 'Backend', 'Database'],
    datasets: [{
      label: 'Skill Level',
      data: [80, 50, 50],
      backgroundColor: darkMode ? 'rgba(249, 115, 22, 0.2)' : 'rgba(37, 99, 235, 0.2)',
      borderColor: darkMode ? '#f97316' : '#2563eb',
      borderWidth: 2,
      pointBackgroundColor: darkMode ? '#f97316' : '#2563eb',
      pointBorderColor: darkMode ? '#f1f5f9' : '#0f172a',
      pointHoverBackgroundColor: darkMode ? '#fff' : '#000',
      pointHoverBorderColor: darkMode ? '#f97316' : '#2563eb'
    }]
  };

  const techSkills = [
    { 
      name: "Frontend Development", 
      icon: <Globe className="w-5 h-5" />, 
      progress: 70,
      expandable: true,
      subSkills: [
        { name: "HTML/CSS", progress: 85 },
        { name: "JavaScript", progress: 60 },
        { name: "React", progress: 65 },
        { name: "Angular", progress: 40 }
      ]
    },
    { 
      name: "Backend Development", 
      icon: <Server className="w-5 h-5" />, 
      progress: 50,
      expandable: true,
      subSkills: [
        { name: "Node.js", progress: 40 },
        { name: "Express", progress: 25 },
        { name: "REST APIs", progress: 60 },
        { name: "Authentication", progress: 55 }
      ]
    },
    { 
      name: "Database Management", 
      icon: <Database className="w-5 h-5" />, 
      progress: 45,
      expandable: true,
      subSkills: [
        { name: "SQL", progress: 75 },
        { name: "MongoDB", progress: 60 },
        { name: "Database Design", progress: 55 }
      ]
    },
    { 
      name: "Web Development", 
      icon: <Code className="w-5 h-5" />, 
      progress: 50,
      expandable: false
    },
    { 
      name: "DSA", 
      icon: <GitBranch className="w-5 h-5" />, 
      progress: 35,
      expandable: false
    },
    { 
      name: "App Development", 
      icon: <Layout className="w-5 h-5" />, 
      progress: 10,
      expandable: true,
      subSkills: [
        { name: "React Native", progress: 10 },
        { name: "Mobile UI/UX", progress: 5 }
      ]
    },
  ];

  // Function to get progress color based on percentage
  const getProgressColor = (progress) => {
    if (progress >= 80) return darkMode ? '#22c55e' : '#16a34a'; // Green
    if (progress >= 60) return darkMode ? '#84cc16' : '#65a30d'; // Lime green
    if (progress >= 40) return darkMode ? '#f97316' : '#ea580c'; // Orange
    return darkMode ? '#f59e0b' : '#d97706'; // Amber for lower values
  };

  // Function to get progress label
  const getProgressLabel = (progress) => {
    if (progress < 30) return "Just Started";
    if (progress < 60) return "In Progress";
    if (progress < 80) return "Proficient";
    return "Expert";
  };

  const socialLinks = [
    { name: "GitHub", icon: <i className="fab fa-github"></i>, url: "https://github.com/TheCodrrr" },
    { name: "LinkedIn", icon: <i className="fab fa-linkedin"></i>, url: "https://www.linkedin.com/in/aryan-hansoti/" },
    { name: "Email", icon: <i className="fas fa-envelope"></i>, url: "mailto:aryanhansoti36@gmail.com" },
    { name: "Instagram", icon: <i className="fab fa-instagram"></i>, url: "https://www.instagram.com/yours.r.yan/" },
    { name: "Leetcode", icon: <i className="fas fa-keyboard"></i>, url: "https://leetcode.com/u/The_Codrr/" },
  ];
  
  useEffect(() => {
    if (pageLoaded && chartRef.current) {
      d3.select(chartRef.current).selectAll('*').remove();
      
      const margin = { top: 20, right: 30, bottom: 80, left: 40 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = 250 - margin.top - margin.bottom;
      
      const svg = d3.select(chartRef.current)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height + margin.top + margin.bottom)
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      const x = d3.scaleBand()
        .domain(skillsData.map(d => d.skill))
        .range([0, width])
        .padding(0.3);
      
      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
      
      svg.selectAll('.bar')
        .data(skillsData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.skill))
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.level))
        .attr('height', d => height - y(d.level))
        .attr('rx', 4)
        .attr('fill', darkMode ? '#f97316' : '#2563eb')
        .attr('opacity', 0.8);
      
      svg.selectAll('.label')
        .data(skillsData)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.skill) + x.bandwidth() / 2)
        .attr('y', d => y(d.level) + (height - y(d.level)) / 2)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('transform', d => `rotate(-90, ${x(d.skill) + x.bandwidth() / 2}, ${y(d.level) + (height - y(d.level)) / 2})`)
        .text(d => `${d.level}%`)
        .attr('fill', 'white')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('text-shadow', '1px 1px 3px rgba(0,0,0,0.3)');
      
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('fill', darkMode ? '#f1f5f9' : '#1f2937')
        .style('font-size', '13px')
        .style('font-weight', '600')
        .attr('transform', 'translate(-5,10) rotate(-15)')
        .attr('text-anchor', 'end');
      
      svg.append('g')
        .call(d3.axisLeft(y).ticks(5))
        .selectAll('text')
        .attr('fill', darkMode ? '#9ca3af' : '#4b5563')
        .style('font-size', '12px');
      
      svg.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y)
          .ticks(5)
          .tickSize(-width)
          .tickFormat('')
        )
        .selectAll('line')
        .attr('stroke', darkMode ? '#374151' : '#e5e7eb')
        .attr('stroke-opacity', 0.5);
    }
  }, [pageLoaded, darkMode, skillsData]);

  useEffect(() => {
    if (!pageLoaded) return;
    
    charts.forEach(chart => chart.destroy());
    const newCharts = [];
    
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext('2d');
      const pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: frameworkData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 15,
              bottom: 10,
              left: 0,
              right: 0
            }
          },
          plugins: {
            legend: {
              position: 'right',
              align: 'center',
              labels: {
                padding: 15,
                color: darkMode ? '#f1f5f9' : '#0f172a',
                font: {
                  family: 'monospace',
                  size: 12
                },
                boxWidth: 15,
                boxHeight: 15
              }
            },
            title: {
              display: true,
              text: 'Framework Experience',
              color: darkMode ? '#f1f5f9' : '#0f172a',
              padding: {
                top: 10,
                bottom: 15
              },
              font: {
                family: 'monospace',
                // padding: 10,
                size: 16
              }
            },
            tooltip: {
              backgroundColor: darkMode ? '#374151' : '#f8fafc',
              titleColor: darkMode ? '#f1f5f9' : '#0f172a',
              bodyColor: darkMode ? '#f1f5f9' : '#0f172a',
              borderColor: darkMode ? '#4b5563' : '#e2e8f0',
              borderWidth: 1
            }
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      });
      newCharts.push(pieChart);
    }
    
    if (radarChartRef.current) {
      const ctx = radarChartRef.current.getContext('2d');
      const radarChart = new Chart(ctx, {
        type: 'radar',
        data: skillSetData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.2
            }
          },
          scales: {
            r: {
              suggestedMin: 0, // Ensure minimum starts at 0
              suggestedMax: 100, // Ensure maximum goes to 100
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: {
                stepSize: 20,
                color: darkMode ? '#9ca3af' : '#6b7280',
                backdropColor: 'transparent',
                font: {
                  size: 10
                },
                showLabelBackdrop: false,
                z: 1
              },
              angleLines: {
                color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                lineWidth: 1
              },
              grid: {
                color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                circular: true
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: darkMode ? '#374151' : '#f8fafc',
              titleColor: darkMode ? '#f1f5f9' : '#0f172a',
              bodyColor: darkMode ? '#f1f5f9' : '#0f172a',
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw}/100`;
                }
              }
            }
          },
          animation: {
            duration: 2000
          }
        }
      });
      newCharts.push(radarChart);
    }
    
    setCharts(newCharts);
    
    return () => {
      newCharts.forEach(chart => chart.destroy());
    };
  }, [pageLoaded, darkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (pageLoaded && chartRef.current) {
        d3.select(chartRef.current).selectAll('*').remove();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageLoaded]);

  useEffect(() => {
    if (copiedLink !== null) {
      const timer = setTimeout(() => {
        setCopiedLink(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [copiedLink]);

  useEffect(() => {
    Object.keys(expandedSkills).forEach(skillName => {
      if (expandedSkills[skillName]) {
        createTechSkillChart(skillName);
      }
    });
  }, [darkMode]);

  useEffect(() => {
    return () => {
      Object.values(expandedCharts).forEach(chart => {
        if (chart) chart.destroy();
      });
    };
  }, []);

  const createTechSkillChart = (skillName) => {
    const skill = techSkills.find(s => s.name === skillName);
    if (!skill || !skill.expandable) return;
    
    const chartCanvas = document.getElementById(`${skillName.replace(/\s+/g, '-')}-chart`);
    if (!chartCanvas) return;
    
    // Destroy existing chart if it exists
    if (expandedCharts[skillName]) {
      expandedCharts[skillName].destroy();
    }
    
    const ctx = chartCanvas.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: skill.subSkills.map(s => s.name),
        datasets: [{
          label: skillName,
          data: skill.subSkills.map(s => s.progress),
          backgroundColor: darkMode ? 'rgba(249, 115, 22, 0.2)' : 'rgba(37, 99, 235, 0.2)',
          borderColor: darkMode ? '#f97316' : '#2563eb',
          borderWidth: 1,
          pointBackgroundColor: darkMode ? '#f97316' : '#2563eb',
          pointBorderColor: darkMode ? '#f1f5f9' : '#0f172a'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 0, // Ensure minimum starts at 0
            suggestedMax: 100, // Ensure maximum goes to 100
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              backdropColor: 'transparent',
              color: darkMode ? '#9ca3af' : '#6b7280',
              font: {
                size: 10
              },
              showLabelBackdrop: false,
              z: 1
            },
            grid: {
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              circular: true
            },
            angleLines: {
              color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              lineWidth: 1
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
    
    setExpandedCharts(prev => ({
      ...prev,
      [skillName]: newChart
    }));
  };

  return pageLoaded ? (
    <div className={`min-h-screen p-6 font-mono ${
      darkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-gray-800"
    }`}>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className={`border rounded-lg overflow-hidden ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-[#f7f8fa]"
        }`}>
          <div className={`px-4 py-2 flex items-center gap-2 border-b ${
            darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-[#e6e6e6]"
          }`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>about.jsx</span>
          </div>
          <div className="p-6 space-y-8">
            <section>
              <h2 className={`text-xl font-semibold mb-4 border-b pb-2 ${
                darkMode ? "border-gray-700 text-orange-400" : "border-gray-200 text-blue-600"
              }`}>
                <span className={darkMode ? "text-white" : "text-green-600"}>const</span> Education
              </h2>
              <div className={`space-y-4 pl-4 border-l-2 ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <h3 className={darkMode ? "font-semibold text-orange-400" : "font-semibold text-green-500"}>Nirma University <b><i>ITNU</i></b></h3>
                  <p className={darkMode ? "text-sm text-gray-300" : "text-sm text-gray-600"}>Bachelor of Technology in Computer Science & Engineering</p>
                  <p className={darkMode ? "text-xs text-gray-400" : "text-xs text-gray-500"}>2023 - Present</p>
                </div>
                <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                  <h3 className={darkMode ? "font-semibold text-orange-400" : "font-semibold text-green-500"}>Vision International School of Excecllence</h3>
                  <p className={darkMode ? "text-sm text-gray-300" : "text-sm text-gray-600"}>Science Stream</p>
                  <p className={darkMode ? "text-xs text-gray-400" : "text-xs text-gray-500"}>2021 - 2023</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className={`text-xl font-semibold mb-4 border-b pb-2 ${
                darkMode ? "border-gray-700 text-orange-400" : "border-gray-200 text-blue-600"
              }`}>
                <span className={darkMode ? "text-white" : "text-green-600"}>const</span> SkillsVisualization
              </h2>
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="mb-4">
                  <code className={darkMode ? "text-green-400" : "text-green-600"}>
                    // Visual representation of my skill proficiency
                  </code>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-opacity-70 rounded-lg p-4 border border-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg transform transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                      borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)'
                    }}>
                    <h3 className={`text-base font-medium mb-3 flex items-center gap-2 ${
                      darkMode ? "text-orange-400" : "text-blue-600"
                    }`}>
                      <BarChart size={18} /> Language Proficiency
                    </h3>
                    <div ref={chartRef} className="w-full h-56"></div>
                  </div>
                  <div className="bg-opacity-70 rounded-lg p-5 border border-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg transform transition-all hover:scale-[1.02] space-y-3"
                    style={{
                      backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                      borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)'
                    }}>
                    <h3 className={`text-base font-medium mb-3 flex items-center gap-2 ${
                      darkMode ? "text-orange-400" : "text-blue-600"
                    }`}>
                      <PieChart size={18} /> Framework Distribution
                    </h3>
                    <div className="h-48 px-2 flex justify-center items-center">
                      <canvas ref={pieChartRef}></canvas>
                    </div>
                  </div>
                  <div className="md:col-span-2 bg-opacity-70 rounded-lg p-4 border border-opacity-20 backdrop-filter backdrop-blur-sm shadow-lg transform transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                      borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)'
                    }}>
                    <h3 className={`text-base font-medium mb-3 flex items-center gap-2 ${
                      darkMode ? "text-orange-400" : "text-blue-600"
                    }`}>
                      <LineChart size={18} /> Skill Balance
                    </h3>
                    <div className="h-64 flex justify-center">
                      <canvas ref={radarChartRef}></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h2 className={`text-xl font-semibold mb-4 border-b pb-2 ${
                darkMode ? "border-gray-700 text-orange-400" : "border-gray-200 text-blue-600"
              }`}>
                <span className={darkMode ? "text-white" : "text-green-600"}>const</span> TechSkills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-auto">
                {techSkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg transition-all hover:shadow-md h-auto ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    style={{ 
                      height: 'auto',
                      gridRow: expandedSkills[skill.name] ? 'span 2' : 'auto'
                    }}
                  >
                    <div 
                      className="flex items-center justify-between mb-2 cursor-pointer"
                      onClick={() => skill.expandable && toggleSkillExpansion(skill.name)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={darkMode ? "text-orange-400" : "text-blue-500"}>{skill.icon}</span>
                        <span className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {getProgressLabel(skill.progress)}
                        </span>
                        {skill.expandable && (
                          expandedSkills[skill.name] 
                            ? <ChevronUp size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                            : <ChevronDown size={16} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                        )}
                      </div>
                    </div>
                    
                    <div className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-2 mb-2`}>
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${skill.progress}%`,
                          backgroundColor: getProgressColor(skill.progress)
                        }}
                      ></div>
                    </div>

                    {/* Expandable sub-skills */}
                    {skill.expandable && expandedSkills[skill.name] && (
                      <div className="mt-4 space-y-5 pt-3 border-t border-dashed border-opacity-50"
                           style={{ borderColor: darkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(209, 213, 219, 0.8)' }}>
                        <div className="h-64 w-full">
                          <canvas 
                            id={`${skill.name.replace(/\s+/g, '-')}-chart`} 
                            className="w-full h-full"
                          ></canvas>
                        </div>
                        <div className="space-y-3">
                          <p className={`text-xs font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            Sub Technologies:
                          </p>
                          {skill.subSkills.map((subSkill, subIndex) => (
                            <div key={subIndex} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                                  {subSkill.name}
                                </span>
                                <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                  {subSkill.progress}%
                                </span>
                              </div>
                              <div className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} rounded-full h-1.5`}>
                                <div 
                                  className="h-1.5 rounded-full"
                                  style={{ 
                                    width: `${subSkill.progress}%`,
                                    backgroundColor: getProgressColor(subSkill.progress)
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className={`text-xl font-semibold mb-4 border-b pb-2 ${
                darkMode ? "border-gray-700 text-orange-400" : "border-gray-200 text-blue-600"
              }`}>
                <span className={darkMode ? "text-white" : "text-green-600"}>const</span> SocialLinks
              </h2>
              <div className="flex flex-wrap gap-4">
                {copiedLink !== null && (
                  <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in-up flex items-center gap-2">
                    <Check size={18} />
                    <span>Link copied to clipboard!</span>
                  </div>
                )}
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between gap-3 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-white hover:text-orange-400"
                        : "bg-gray-50 hover:bg-gray-100 text-blue-600 hover:text-blue-500"
                    }`}
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    <div className="flex items-center gap-2">
                      <span className={darkMode ? "text-orange-400" : "text-blue-500"}>
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent the parent div click
                        navigator.clipboard.writeText(link.url);
                        setCopiedLink(link.name);
                      }}
                      className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                        darkMode
                          ? "hover:bg-gray-700 text-gray-300 hover:text-orange-400"
                          : "hover:bg-gray-200 text-gray-500 hover:text-blue-600"
                      }`}
                      title="Copy link"
                    >
                      {copiedLink === link.name ? (
                        <Check size={16} className="text-green-500" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default About;
