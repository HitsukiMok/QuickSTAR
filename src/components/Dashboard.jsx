import React, { useState, useEffect, useMemo } from 'react';
import { Sun, Moon, ArrowLeft, RotateCcw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
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

// 17 highly distinct colors for Regions
const REGION_COLORS = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
  '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000'
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

// Custom Tooltip for Generic Bar Charts
const GenericTooltip = ({ active, payload, label, dataKeyLabel }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-purple-100 dark:border-purple-900 text-sm">
        <p className="font-bold text-slate-800 dark:text-pink-50 mb-1">{data.name || label}</p>
        <p className="text-[#9333ea] dark:text-[#a855f7] font-medium">{dataKeyLabel || 'Count'}: {data.value || data.joined}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Waterfall Chart
const WaterfallTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 1) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1e2235] p-3 rounded-lg shadow-xl border border-[#4e4d82] text-sm font-sans tracking-wide">
        <p className="font-bold text-[#e0b234] mb-2">Year: {label}</p>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[#8685ab] mr-4">Previous Total:</span>
          <span className="text-[#a5a5c7] font-medium">{data.base.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[#a855f7] mr-4">New Teachers Joined:</span>
          <span className="text-[#d8b4fe] font-bold">+{data.joined.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center border-t border-[#3a3959] pt-2 mt-2">
          <span className="text-[#c8c7e8] mr-4 font-semibold">New Total:</span>
          <span className="text-white font-bold">{data.totalAfter.toLocaleString()}</span>
        </div>
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

  const avgExperience = useMemo(() => {
    if (filteredData.length === 0) return 0;
    const total = filteredData.reduce((acc, d) => acc + (d.years_of_experience || 0), 0);
    return (total / filteredData.length).toFixed(1);
  }, [filteredData]);
  
  const sdoData = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      if (d.sdo) counts[d.sdo] = (counts[d.sdo] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filteredData]);
  
  const qualificationsData = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      if (d.qualifications) counts[d.qualifications] = (counts[d.qualifications] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  const waterfallData = useMemo(() => {
    const countsByYear = {};
    filteredData.forEach(d => {
      const y = parseInt(d.year_joined, 10);
      if (!isNaN(y) && y > 1950 && y <= new Date().getFullYear()) {
        countsByYear[y] = (countsByYear[y] || 0) + 1;
      }
    });
    const sortedYears = Object.keys(countsByYear).map(Number).sort((a, b) => a - b);
    let runningTotal = 0;
    return sortedYears.map(year => {
      const count = countsByYear[year];
      const entry = { 
        name: year.toString(), 
        base: runningTotal, 
        joined: count, 
        totalAfter: runningTotal + count 
      };
      runningTotal += count;
      return entry;
    });
  }, [filteredData]);

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

  // Compute Region Distribution — always national (rawData), never filtered
  const regionData = useMemo(() => {
    const counts = {};
    rawData.forEach(d => {
      counts[d.region] = (counts[d.region] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [rawData]);

  return (
    <div className="min-h-screen pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#111822] text-slate-800 dark:text-white shadow-sm border-b border-purple-100 dark:border-slate-800">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/')} className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors text-slate-500 dark:text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-[#4e4d82] flex items-center justify-center shadow-sm">
            <span className="text-[#e0b234]">✨</span>
          </div> {/* Logo Placeholder upgraded */}
          <Link to="/" className="text-2xl font-bold tracking-wide text-[#4e4d82] dark:text-slate-200 transition-colors">
            Quick<span className="text-[#e0b234]">STAR</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={toggleDarkMode} className="hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors text-slate-500 dark:text-slate-400">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Selected Region / Reset */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#3a3959] dark:text-slate-200">
            {selectedRegion ? `Showing data for: ${selectedRegion}` : "Nationwide Overview"}
          </h2>
          {selectedRegion && (
            <button 
              onClick={() => setSelectedRegion(null)}
              className="flex items-center space-x-2 text-sm font-semibold bg-[#e6e6f2] hover:bg-[#d0d0e6] text-[#4e4d82] dark:bg-[#151726] dark:hover:bg-slate-800 dark:text-[#a5a5c7] py-1.5 px-3 rounded-full transition-all duration-300 hover:shadow-sm"
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-[#151726] p-6 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-center group border-r border-[#f0f0f5] dark:border-slate-800">
                <div className="text-3xl font-black text-[#4e4d82] dark:text-[#a5a5c7] mb-1 group-hover:scale-110 transition-transform duration-300">{isLoading ? "..." : currentProfiles.toLocaleString()}</div>
                <div className="text-sm font-medium text-[#8685ab] dark:text-slate-500">Current Profiles</div>
              </div>
              <div className="text-center group md:border-r border-[#f0f0f5] dark:border-slate-800">
                <div className="text-3xl font-black text-[#4e4d82] dark:text-[#a5a5c7] mb-1 group-hover:scale-110 transition-transform duration-300">{isLoading ? "..." : supportedRegions.toLocaleString()}</div>
                <div className="text-sm font-medium text-[#8685ab] dark:text-slate-500">Supported Regions</div>
              </div>
              <div className="text-center group border-r border-[#f0f0f5] dark:border-slate-800">
                <div className="text-3xl font-black text-[#4e4d82] dark:text-[#a5a5c7] mb-1 group-hover:scale-110 transition-transform duration-300">{isLoading ? "..." : starStaff.toLocaleString()}</div>
                <div className="text-sm font-medium text-[#8685ab] dark:text-slate-500">STAR Staff</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-[#4e4d82] dark:text-[#a5a5c7] mb-1 group-hover:scale-110 transition-transform duration-300">{isLoading ? "..." : `${avgExperience}`}</div>
                <div className="text-sm font-medium text-[#8685ab] dark:text-slate-500">Avg Exp (Yrs)</div>
              </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-2 gap-4 bg-white dark:bg-[#151726] p-6 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 h-[350px] hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              
              {/* Subject Chart */}
              <div className="flex flex-col items-center justify-between h-full group">
                <div className="h-[250px] w-full group-hover:scale-105 transition-transform duration-500">
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
                <h3 className="font-bold text-[#4e4d82] dark:text-[#a5a5c7] text-center mt-2">Subject Distribution</h3>
              </div>

              {/* Region Chart */}
              <div className="flex flex-col items-center justify-between h-full group">
                <div className="h-[250px] w-full group-hover:scale-105 transition-transform duration-500">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={regionData}
                        innerRadius={50}
                        outerRadius={100}
                        paddingAngle={1}
                        dataKey="value"
                        onClick={(data) => {
                           if(data.name) setSelectedRegion(prev => prev === data.name ? null : data.name);
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
                <h3 className="font-bold text-[#4e4d82] dark:text-[#a5a5c7] text-center mt-2">Teacher Distribution in Regions</h3>
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="hover:-translate-y-1 transition-transform duration-300">
            {isLoading ? (
              <div className="w-full h-[600px] bg-[#f8f8fc] dark:bg-[#151726] rounded-3xl overflow-hidden border border-[#e6e6f2] dark:border-slate-800 shadow-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-[#c8c7e8] border-t-[#4e4d82] rounded-full animate-spin" />
                  <span className="text-sm font-medium text-[#8685ab] dark:text-slate-400">Loading map data...</span>
                </div>
              </div>
            ) : (
              <MapPlaceholder selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} allData={rawData} />
            )}
          </div>

        </div>

        {/* NEW ANALYTICS SECTION */}
        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-2xl font-black text-[#3a3959] dark:text-[#a5a5c7] mb-6 inline-block">Deep Dive Analytics</h2>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Waterfall Chart: Spans 2 columns */}
            <div className="col-span-1 xl:col-span-2 bg-white dark:bg-[#151726] p-6 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-[400px]">
              <h3 className="font-bold text-[#4e4d82] dark:text-[#a5a5c7] mb-4 tracking-wide">Growth Over Time (Waterfall)</h3>
              <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waterfallData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3a3959" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#8685ab', fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis 
                      tick={{ fill: '#8685ab', fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false} 
                      tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
                    />
                    <Tooltip content={<WaterfallTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="base" stackId="a" fill="transparent" />
                    <Bar dataKey="joined" stackId="a" fill="url(#colorWaterfall)" radius={[2, 2, 0, 0]} />
                    <defs>
                      <linearGradient id="colorWaterfall" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e0b234" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0.7}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Qualifications Chart */}
            <div className="col-span-1 bg-white dark:bg-[#151726] p-6 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-[400px]">
              <h3 className="font-bold text-[#4e4d82] dark:text-[#a5a5c7] mb-4 tracking-wide">Teacher Qualifications</h3>
              <div className="flex-1 w-full pl-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={qualificationsData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fill: '#8685ab', fontSize: 11 }} 
                      axisLine={false} 
                      tickLine={false}
                      width={100}
                    />
                    <Tooltip content={<GenericTooltip dataKeyLabel="Teachers" />} cursor={{ fill: '#3a3959', opacity: 0.1 }} />
                    <Bar dataKey="value" fill="#9333ea" radius={[0, 4, 4, 0]}>
                      {qualificationsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#9333ea' : '#e0b234'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* SDO Distribution Chart */}
            <div className="col-span-1 xl:col-span-3 bg-white dark:bg-[#151726] p-6 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-[400px]">
              <h3 className="font-bold text-[#4e4d82] dark:text-[#a5a5c7] mb-4 tracking-wide">Top Schools Division Offices (SDO) in {selectedRegion || 'Nationwide'}</h3>
              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sdoData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3a3959" opacity={0.3} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#8685ab', fontSize: 11 }} 
                      axisLine={false} 
                      tickLine={false}
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                      dy={15}
                    />
                    <YAxis 
                      tick={{ fill: '#8685ab', fontSize: 12 }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Tooltip content={<GenericTooltip dataKeyLabel="Teachers" />} cursor={{ fill: '#3a3959', opacity: 0.1 }} />
                    <Bar dataKey="value" fill="#4e4d82" radius={[4, 4, 0, 0]}>
                       {sdoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#e0b234' : '#4e4d82'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-12 animate-in slide-in-from-bottom-8 duration-700">
           <h2 className="text-3xl font-black text-[#3a3959] dark:text-[#a5a5c7] mb-6 border-b-4 border-[#6564a3] inline-block pb-2">Analytics</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
             <div className="bg-[#fbfcff] dark:bg-[#151726] p-8 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
               <h3 className="text-xl font-black text-[#4e4d82] dark:text-[#a5a5c7] mb-4">Data Says...</h3>
               <p className="text-[#68678c] dark:text-slate-400 leading-relaxed">
                 There is a high concentration of Senior High School teachers specializing in Earth Science within the NCR and Region IV-A. Conversely, regions like BARMM show lower total profiles particularly in Math disciplines such as Calculus. 
               </p>
             </div>
             
             <div className="bg-[#fbfcff] dark:bg-[#151726] p-8 rounded-3xl shadow-sm border border-[#f0f0f5] dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
               <h3 className="text-xl font-black text-[#4e4d82] dark:text-[#a5a5c7] mb-4">Possible Reason</h3>
               <p className="text-[#68678c] dark:text-slate-400 leading-relaxed">
                 Urban centers attract highly specialized educators due to more concentrated Senior High School facilities. Rural or newly formed regions face systemic barriers in retaining educators with advanced mathematical specializations.
               </p>
             </div>
           </div>

           <div className="bg-white dark:bg-[#1a1c2e] p-8 rounded-3xl shadow-md border border-[#e6e6f2] dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 mb-4 bg-gradient-to-br from-white to-[#f4f4f9] dark:from-[#1a1c2e] dark:to-[#151726]">
             <h3 className="text-xl font-black text-[#3a3959] dark:text-[#a5a5c7] mb-4">Possible Actions</h3>
             <ul className="list-disc list-inside text-[#68678c] dark:text-slate-400 space-y-3 leading-relaxed">
               <li>Deploy dedicated Math capacity-building workshops tailored for BARMM and Region XIII.</li>
               <li>Leverage the surplus of Science specialists in NCR to lead virtual training modules nationwide.</li>
               <li>Increase incentives for BS Math/Science with CPE certificate holders to relocate to underserved areas.</li>
             </ul>
           </div>
           
           <p className="text-xs font-semibold text-[#a5a5bf] dark:text-slate-500 px-4 mt-6">
             * These data analytics are generated by an AI Model to provide insights to the current situation
           </p>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
