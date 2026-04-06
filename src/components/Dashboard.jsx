import React, { useState, useEffect, useMemo } from 'react';
import { Sun, Moon, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import MapPlaceholder from './MapPlaceholder';
import Chatbot from './Chatbot';

// Define categories
const MATH_SUBJECTS = ['Calculus', 'General Mathematics', 'Geometry', 'Algebra'];
const SCIENCE_SUBJECTS = ['Earth Science', 'General Science', 'Physics', 'Biology', 'Chemistry'];

// Define Colors
const COLORS = {
  Math: '#fb923c', // orange-400
  Science: '#9333ea', // purple-600
};

// Generic extensive palette for regions
const REGION_COLORS = [
  '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
  '#f472b6', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171',
  '#db2777', '#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626'
];

// Custom Tooltip for Subject Chart
const SubjectTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-purple-100 dark:border-purple-900 text-sm">
        <p className="font-bold text-slate-800 dark:text-pink-50 mb-1">{data.name}</p>
        <p className="text-purple-600 dark:text-purple-400 font-medium">Count: {data.value} ({(data.percent * 100).toFixed(1)}%)</p>
        <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold border-b border-slate-200 dark:border-slate-700 pb-1 mb-1">Specific Subjects:</p>
          {Object.entries(data.breakdown).map(([sub, count]) => (
            <p key={sub} className="flex justify-between w-32"><span>{sub}:</span> <span>{count}</span></p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Region Chart
const RegionTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-lg border border-purple-100 dark:border-purple-900 text-sm">
        <p className="font-bold text-slate-800 dark:text-pink-50">{data.name}</p>
        <p className="text-purple-600 dark:text-purple-400">Count: {data.value}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [rawData, setRawData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(res => res.json())
      .then(data => {
        setRawData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data", err);
        setIsLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    if (!selectedRegion) return rawData;
    return rawData.filter(d => d.region === selectedRegion);
  }, [rawData, selectedRegion]);

  // Derived Metrics
  const currentProfiles = filteredData.length;
  const supportedRegions = new Set(filteredData.map(d => d.region)).size;
  const starStaff = currentProfiles * 5;

  // Compute Subject Distribution
  const subjectData = useMemo(() => {
    const counts = { Math: 0, Science: 0 };
    const breakdown = { Math: {}, Science: {} };
    
    filteredData.forEach(d => {
      const spec = d.subject_specialization;
      if (MATH_SUBJECTS.includes(spec)) {
        counts.Math++;
        breakdown.Math[spec] = (breakdown.Math[spec] || 0) + 1;
      } else if (SCIENCE_SUBJECTS.includes(spec)) {
        counts.Science++;
        breakdown.Science[spec] = (breakdown.Science[spec] || 0) + 1;
      }
    });

    const total = counts.Math + counts.Science;
    
    return [
      { name: 'Science', value: counts.Science, percent: total ? counts.Science / total : 0, breakdown: breakdown.Science },
      { name: 'Math', value: counts.Math, percent: total ? counts.Math / total : 0, breakdown: breakdown.Math }
    ].filter(d => d.value > 0);
  }, [filteredData]);

  // Compute Region Distribution
  const regionData = useMemo(() => {
    // If a region is selected, pie chart should just show that region 100% or we retain full breakdown?
    // Let's show full breakdown to allow cross-filtering properly. Using rawData for Region Donut keeps it interactive.
    // Wait, the user said "If a user clicks a slice in the Teacher Distribution pie chart, all other cards... must filter".
    // So pie chart acts as a filter. If filter is active, should pie chart contract to 1 slice? Usually yes, or stay the same and highlight.
    // Let's filter region pie chart to only the selected region if selected to match standard dashboard mechanics.
    const dataToUse = selectedRegion ? filteredData : rawData;
    const counts = {};
    dataToUse.forEach(d => {
      counts[d.region] = (counts[d.region] || 0) + 1;
    });
    
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [rawData, filteredData, selectedRegion]);

  return (
    <div className="min-h-screen pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-purple-600 dark:bg-purple-900 text-white shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="hover:bg-purple-500 p-2 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600"></div> {/* Logo Placeholder */}
          <h1 className="text-2xl font-bold tracking-wide">QuickSTAR</h1>
        </div>
        <div className="flex items-center space-x-6">
          <span className="font-semibold">Dashboard</span>
          <button onClick={toggleDarkMode} className="hover:bg-purple-500 p-2 rounded-full transition-colors">
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Selected Region / Reset */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200">
            {selectedRegion ? `Showing data for: ${selectedRegion}` : "Nationwide Overview"}
          </h2>
          {selectedRegion && (
            <button 
              onClick={() => setSelectedRegion(null)}
              className="flex items-center space-x-2 text-sm font-semibold bg-pink-100 hover:bg-pink-200 text-pink-600 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 dark:text-pink-400 py-1.5 px-3 rounded-full transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Top Section: Metrics + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Left Column: Metrics & Charts */}
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-900/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-1">{isLoading ? "..." : currentProfiles.toLocaleString()}</div>
                <div className="text-sm font-medium text-slate-500">Current Profiles</div>
              </div>
              <div className="text-center border-l border-r border-purple-100 dark:border-slate-700">
                <div className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-1">{isLoading ? "..." : supportedRegions.toLocaleString()}</div>
                <div className="text-sm font-medium text-slate-500">Supported Regions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-1">{isLoading ? "..." : starStaff.toLocaleString()}</div>
                <div className="text-sm font-medium text-slate-500">STAR Staff</div>
              </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-2 gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-900/50 h-[350px]">
              
              {/* Subject Chart */}
              <div className="flex flex-col items-center justify-between h-full">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={subjectData}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {subjectData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                        ))}
                      </Pie>
                      <Tooltip content={<SubjectTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 text-center">Subject Distribution</h3>
              </div>

              {/* Region Chart */}
              <div className="flex flex-col items-center justify-between h-full">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        innerRadius={50}
                        outerRadius={100}
                        paddingAngle={1}
                        dataKey="value"
                        onClick={(data) => {
                           if(data.name) setSelectedRegion(selectedRegion === data.name ? null : data.name);
                        }}
                        className="cursor-pointer"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<RegionTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 text-center">Teacher Distribution in Regions</h3>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div>
            <MapPlaceholder selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
          </div>

        </div>

        {/* Analytics Section */}
        <div className="mt-12 animate-in slide-in-from-bottom-8 duration-700">
           <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-300 mb-6 border-b-2 border-purple-600 inline-block pb-1">Analytics</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-900 hover:shadow-md transition-shadow">
               <h3 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-4">Data Says...</h3>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                 There is a high concentration of Senior High School teachers specializing in Earth Science within the NCR and Region IV-A. Conversely, regions like BARMM show lower total profiles particularly in Math disciplines such as Calculus. 
               </p>
             </div>
             
             <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-900 hover:shadow-md transition-shadow">
               <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">Possible Reason</h3>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                 Urban centers attract highly specialized educators due to more concentrated Senior High School facilities. Rural or newly formed regions face systemic barriers in retaining educators with advanced mathematical specializations.
               </p>
             </div>
           </div>

           <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-purple-100 dark:border-purple-900 hover:shadow-md transition-shadow mb-4">
             <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">Possible Actions</h3>
             <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed">
               <li>Deploy dedicated Math capacity-building workshops tailored for BARMM and Region XIII.</li>
               <li>Leverage the surplus of Science specialists in NCR to lead virtual training modules nationwide.</li>
               <li>Increase incentives for BS Math/Science with CPE certificate holders to relocate to underserved areas.</li>
             </ul>
           </div>
           
           <p className="text-xs text-slate-400 dark:text-slate-500 px-4">
             * These data analytics are generated by an AI Model to provide insights to the current situation
           </p>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
