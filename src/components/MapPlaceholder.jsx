import React, { useEffect, useState, useMemo } from 'react';

const STATE_TO_REGION = {
  PH00: 'NCR',         PH01: 'Region I',    PH02: 'Region II',   PH03: 'Region III',
  PH05: 'Region V',    PH06: 'Region VI',   PH07: 'Region VII',  PH08: 'Region VIII',
  PH09: 'Region IX',   PH10: 'Region X',    PH11: 'Region XI',   PH12: 'Region XII',
  PH13: 'Region XIII', PH14: 'BARMM',       PH15: 'CAR',
  PH40: 'Region IV-A', PH41: 'Region IV-B',
};

const MATH_SUBJECTS    = ['Calculus', 'General Mathematics', 'Geometry', 'Algebra'];
const SCIENCE_SUBJECTS = ['Earth Science', 'General Science', 'Physics', 'Biology', 'Chemistry'];

function generateDescriptionHtml(stats) {
  if (!stats) return '<div style="padding: 12px; background: #1e2235; border: 1px solid #4e4d82; color: #8685ab; border-radius: 8px;">No data available</div>';
  
  return `
    <div style="background-color: #1e2235; border: 2px solid #e0b234; border-radius: 12px; padding: 18px; width: 220px; box-shadow: 0 16px 30px rgba(0,0,0,0.5); font-family: 'Inter', sans-serif; position: relative;">
      
      <div style="border-bottom: 2px solid rgba(224, 178, 52, 0.2); padding-bottom: 10px; margin-bottom: 10px;">
        <span style="color: #a5a5c7; font-size: 13px; display: block; margin-bottom: 2px; font-weight: 500;">Total Teachers</span>
        <strong style="color: #e0b234; font-size: 24px; letter-spacing: -0.5px;">${stats.total.toLocaleString()}</strong>
      </div>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span style="color: #8685ab; font-size: 13px;">Math</span>
        <strong style="color: #f97316; font-size: 14px;">${stats.math.toLocaleString()}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 14px;">
        <span style="color: #8685ab; font-size: 13px;">Science</span>
        <strong style="color: #a855f7; font-size: 14px;">${stats.science.toLocaleString()}</strong>
      </div>
      
      <div style="border-top: 1px dashed rgba(165, 165, 199, 0.3); padding-top: 10px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="color: #8685ab; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Elementary</span>
          <strong style="color: #ffffff; font-size: 13px;">${stats.elementary.toLocaleString()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #8685ab; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Secondary</span>
          <strong style="color: #ffffff; font-size: 13px;">${stats.secondary.toLocaleString()}</strong>
        </div>
      </div>

    </div>
  `;
}

function buildMapConfig(regionStats) {
  const state_specific = {
    PH00: { name: 'NCR' },              PH01: { name: 'Region I' },
    PH02: { name: 'Region II' },        PH03: { name: 'Region III' },
    PH05: { name: 'Region V' },         PH06: { name: 'Region VI' },
    PH07: { name: 'Region VII' },       PH08: { name: 'Region VIII' },
    PH09: { name: 'Region IX' },        PH10: { name: 'Region X' },
    PH11: { name: 'Region XI' },        PH12: { name: 'Region XII' },
    PH13: { name: 'Region XIII' },      PH14: { name: 'BARMM' },
    PH15: { name: 'CAR' },             PH40: { name: 'Region IV-A' },
    PH41: { name: 'Region IV-B' },
  };

  // 100% instantaneous data injection logic
  Object.keys(state_specific).forEach(id => {
    const regionName = STATE_TO_REGION[id];
    if (regionName && regionStats && regionStats[regionName]) {
      state_specific[id].description = generateDescriptionHtml(regionStats[regionName]);
    } else {
      state_specific[id].description = generateDescriptionHtml(null);
    }
  });

  return {
    main_settings: {
      width: 'responsive',
      background_color: '#FFFFFF',
      background_transparent: 'yes',
      border_color: '#ffffff',
      state_color: '#c8c7e8',
      state_hover_color: '#6e6db0',
      state_url: '',
      border_size: 1.5,
      all_states_inactive: 'no',
      all_states_zoomable: 'no',
      zoom: 'no',
      manual_zoom: 'no',           
      back_image: 'no',
      initial_back: 'no',
      initial_zoom: '-1',
      initial_zoom_solo: 'no',
      region_opacity: 1,
      region_hover_opacity: 0.85,
      zoom_out_incrementally: 'no',
      zoom_percentage: 0.99,
      zoom_time: 0,
      all_locations_hidden: 'yes',
      location_color: 'transparent',
      label_color: '#ffffff',
      label_hover_color: '#ffffff',
      label_size: 11,
      label_font: 'Inter, Arial',
      label_display: 'auto',
      label_scale: 'yes',
      hide_labels: 'no',
      hide_eastern_labels: 'no',
      popup_color: 'transparent',  // simplemaps wrapper transparent
      popup_opacity: 1,
      popup_shadow: 0,
      popup_corners: 0,
      popup_font: '13px/1.5 Inter, Arial, sans-serif',
      popup_nocss: 'yes',          // strictly user styling
      div: 'simplemaps-ph-map',
      auto_load: 'yes',
      url_new_tab: 'no',
      images_directory: 'default',
      fade_time: 0,
      popups: 'detect',
      state_image_url: '',
      state_image_position: '',
      location_image_url: '',
    },
    state_specific,
    locations: {},
    labels: {
      PH00: { name: 'NCR', parent_id: 'PH00' },
      PH01: { name: 'Region I', parent_id: 'PH01' },
      PH02: { name: 'Region II', parent_id: 'PH02' },
      PH03: { name: 'Region III', parent_id: 'PH03' },
      PH05: { name: 'Region V', parent_id: 'PH05' },
      PH06: { name: 'Region VI', parent_id: 'PH06' },
      PH07: { name: 'Region VII', parent_id: 'PH07' },
      PH08: { name: 'Region VIII', parent_id: 'PH08' },
      PH09: { name: 'Region IX', parent_id: 'PH09' },
      PH10: { name: 'Region X', parent_id: 'PH10' },
      PH11: { name: 'Region XI', parent_id: 'PH11' },
      PH12: { name: 'Region XII', parent_id: 'PH12' },
      PH13: { name: 'Region XIII', parent_id: 'PH13' },
      PH14: { name: 'BARMM', parent_id: 'PH14' },
      PH15: { name: 'CAR', parent_id: 'PH15' },
      PH40: { name: 'Region IV-A', parent_id: 'PH40' },
      PH41: { name: 'Region IV-B', parent_id: 'PH41' },
    },
    legend: { entries: [] },
    regions: {},
  };
}

let scriptLoaded = false;

function removeWatermark() {
  document.querySelectorAll('text').forEach(t => {
    if (t.textContent && t.textContent.toLowerCase().includes('simplemaps')) {
      t.style.display = 'none';
    }
  });
}

export default function MapPlaceholder({ selectedRegion, setSelectedRegion, allData = [] }) {
  const [mapReady, setMapReady] = useState(false);

  // Per-region stats calculated immediately when allData arrives
  const regionStats = useMemo(() => {
    const s = {};
    if (!allData || allData.length === 0) return s;
    
    // Process backend data exactly once
    allData.forEach(d => {
      const r = d.region; if (!r) return;
      if (!s[r]) s[r] = { total: 0, math: 0, science: 0, elementary: 0, secondary: 0 };
      s[r].total++;
      if      (MATH_SUBJECTS.includes(d.subject_specialization))    s[r].math++;
      else if (SCIENCE_SUBJECTS.includes(d.subject_specialization)) s[r].science++;
      
      const lvl = (d.level_classification || '').toLowerCase();
      if      (lvl.includes('elementary'))                          s[r].elementary++;
      else if (lvl.includes('secondary') || lvl.includes('high'))   s[r].secondary++;
    });
    return s;
  }, [allData]);

  // Boot Map Engine exactly once the Dashboard renders it
  useEffect(() => {
    // Inject the fully computed stats on boot so it never displays any loading sequences!
    window.simplemaps_countrymap_mapdata = buildMapConfig(regionStats);

    const loadScript = src => new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });

    let observer = null;

    (async () => {
      if (!scriptLoaded) {
        try {
          await loadScript('/map/countrymap.js');
          scriptLoaded = true;
        } catch (e) {
          console.error("Failed to load map bundle:", e);
        }
      }
      
      if (window.simplemaps_countrymap) {
         // Force load if not loaded, otherwise refresh
         if (document.querySelector('#simplemaps-ph-map svg')) {
           window.simplemaps_countrymap.refresh();
         } else {
           window.simplemaps_countrymap.load();
         }
      } else {
        await new Promise(res => {
          const t = setInterval(() => { 
            if (window.simplemaps_countrymap) { 
              clearInterval(t); 
              window.simplemaps_countrymap.load();
              res(); 
            } 
          }, 50);
        });
      }
      
      const sm = window.simplemaps_countrymap;
      
      // Native interaction logic
      sm.hooks.click_state = (id) => {
        const region = STATE_TO_REGION[id];
        if (region) setSelectedRegion(prev => prev === region ? null : region);
      };

      removeWatermark();
      observer = new MutationObserver(removeWatermark);
      observer.observe(document.body, { childList: true, subtree: true });

      setMapReady(true);
    })();

    return () => {
      if (observer) observer.disconnect();
    };
  }, []); // Run initialization unconditionally once map mounts

  // Paint the selected logic overlay manually
  useEffect(() => {
    if (!mapReady) return;
    Object.keys(STATE_TO_REGION).forEach(id => {
      const el = document.querySelector(`#${id}`);
      if (el) el.style.fill = (selectedRegion && STATE_TO_REGION[id] === selectedRegion) ? '#e0b234' : '';
    });
  }, [selectedRegion, mapReady]);

  return (
    <>
      <div className="relative w-full h-[600px] bg-[#f8f8fc] dark:bg-[#151726] rounded-3xl overflow-hidden border border-[#e6e6f2] dark:border-slate-800 shadow-sm flex flex-col select-none">
        
        {/* Header Ribbon */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between flex-shrink-0 z-10 bg-[#f8f8fc] dark:bg-[#151726]">
          <h3 className="font-bold text-[#4e4d82] dark:text-[#a5a5c7] text-sm tracking-wide uppercase">
            Philippine Region Map
          </h3>
          {selectedRegion && (
            <span className="text-xs font-semibold px-3 py-1 bg-[#e0b234]/20 text-[#b8901a] dark:text-[#e0b234] rounded-full border border-[#e0b234]/30 flex items-center gap-1.5 cursor-pointer hover:bg-[#e0b234]/30 transition-colors"
                  onClick={() => setSelectedRegion(null)}>
              {selectedRegion}
              <button className="opacity-70 hover:opacity-100 transition-opacity leading-none">✕</button>
            </span>
          )}
        </div>

        {/* Map Injection Container */}
        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center p-4">
          <div 
            id="simplemaps-ph-map"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Simple Loading state while SVG boots */}
        {!mapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f8f8fc] dark:bg-[#151726] rounded-3xl z-30">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-[#c8c7e8] border-t-[#4e4d82] rounded-full animate-spin" />
              <span className="text-sm font-medium text-[#8685ab] dark:text-slate-400">Loading map…</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
