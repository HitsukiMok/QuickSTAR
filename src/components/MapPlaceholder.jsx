import React from 'react';
import { Map, Plus, Minus } from 'lucide-react';

const REGIONS = [
  "NCR", "CAR", "Region I", "Region II", "Region III", "Region IV-A", "Region IV-B", "Region V",
  "Region VI", "Region VII", "Region VIII", "Region IX", "Region X", "Region XI", "Region XII", "Region XIII", "BARMM"
];

export default function MapPlaceholder({ selectedRegion, setSelectedRegion }) {
  // A pseudo map using a grid to layout regions roughly geographically
  return (
    <div className="relative w-full h-[500px] bg-indigo-50/50 dark:bg-slate-800/50 rounded-3xl p-4 overflow-hidden border border-purple-100 dark:border-purple-900 shadow-sm flex flex-col items-center justify-center">
      
      {/* Zoom controls mimicking Top Left map controls */}
      <div className="absolute top-4 left-4 flex items-center bg-purple-400/80 backdrop-blur-md rounded-full text-white px-2 py-1 space-x-2">
        <button className="hover:text-purple-200"><Plus size={18} /></button>
        <span className="w-px h-4 bg-white/50"></span>
        <button className="hover:text-purple-200"><Minus size={18} /></button>
      </div>
      
      <div className="absolute right-4 top-4 text-xs font-medium text-slate-400 dark:text-slate-500">
        Interactive Map Placeholder
      </div>

      {/* Pseudo Map Grid */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm mt-8">
        {REGIONS.map((region) => {
          const isSelected = selectedRegion === region;
          return (
            <button
              key={region}
              onClick={() => setSelectedRegion(isSelected ? null : region)}
              className={`
                px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300
                hover:-translate-y-0.5 hover:shadow-md
                ${isSelected 
                  ? 'bg-pink-500 text-white shadow-pink-500/40' 
                  : 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm hover:bg-pink-50 dark:hover:bg-slate-600'}
              `}
            >
              {region}
            </button>
          )
        })}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-30 pointer-events-none">
        <Map size={150} className="text-purple-300 dark:text-purple-900" />
      </div>
    </div>
  );
}
