var simplemaps_countrymap_mapdata={
  main_settings: {
   //General settings
    width: "responsive", //'700' or 'responsive'
    background_color: "#FFFFFF",
    background_transparent: "yes",
    border_color: "#ffffff",
    
    //State defaults
    state_description: "State description",
    state_color: "#88A4BC",
    state_hover_color: "#3B729F",
    state_url: "",
    border_size: 1.5,
    all_states_inactive: "no",
    all_states_zoomable: "yes",
    
    //Location defaults
    location_description: "Location description",
    location_url: "",
    location_color: "#FF0067",
    location_opacity: 0.8,
    location_hover_opacity: 1,
    location_size: 25,
    location_type: "square",
    location_image_source: "frog.png",
    location_border_color: "#FFFFFF",
    location_border: 2,
    location_hover_border: 2.5,
    all_locations_inactive: "no",
    all_locations_hidden: "no",
    
    //Label defaults
    label_color: "#ffffff",
    label_hover_color: "#ffffff",
    label_size: 16,
    label_font: "Arial",
    label_display: "auto",
    label_scale: "yes",
    hide_labels: "no",
    hide_eastern_labels: "no",
   
    //Zoom settings
    zoom: "yes",
    manual_zoom: "yes",
    back_image: "no",
    initial_back: "no",
    initial_zoom: "-1",
    initial_zoom_solo: "no",
    region_opacity: 1,
    region_hover_opacity: 0.6,
    zoom_out_incrementally: "yes",
    zoom_percentage: 0.99,
    zoom_time: 0.5,
    
    //Popup settings
    popup_color: "white",
    popup_opacity: 0.9,
    popup_shadow: 1,
    popup_corners: 5,
    popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
    popup_nocss: "no",
    
    //Advanced settings
    div: "map",
    auto_load: "yes",
    url_new_tab: "no",
    images_directory: "default",
    fade_time: 0.1,
    link_text: "View Website",
    popups: "detect",
    state_image_url: "",
    state_image_position: "",
    location_image_url: ""
  },
  state_specific: {
    PH00: {
      name: "National Capital Region",
      color: "#ddd2ff"
    },
    PH01: {
      name: "Ilocos"
    },
    PH02: {
      name: "Cagayan Valley"
    },
    PH03: {
      name: "Central Luzon"
    },
    PH05: {
      name: "Bicol"
    },
    PH06: {
      name: "Western Visayas"
    },
    PH07: {
      name: "Central Visayas"
    },
    PH08: {
      name: "Eastern Visayas"
    },
    PH09: {
      name: "Zamboanga Peninsula"
    },
    PH10: {
      name: "Northern Mindanao"
    },
    PH11: {
      name: "Davao"
    },
    PH12: {
      name: "Soccsksargen"
    },
    PH13: {
      name: "Caraga"
    },
    PH14: {
      name: "Autonomous Region in Muslim Mindanao"
    },
    PH15: {
      name: "Cordillera Administrative Region"
    },
    PH40: {
      name: "Calabarzon"
    },
    PH41: {
      name: "Mimaropa"
    }
  },
  locations: {
    "0": {
      name: "Manila",
      lat: "14.6042",
      lng: "120.9822"
    }
  },
  labels: {
    PH00: {
      name: "National Capital Region",
      parent_id: "PH00"
    },
    PH01: {
      name: "Ilocos",
      parent_id: "PH01"
    },
    PH02: {
      name: "Cagayan Valley",
      parent_id: "PH02"
    },
    PH03: {
      name: "Central Luzon",
      parent_id: "PH03"
    },
    PH05: {
      name: "Bicol",
      parent_id: "PH05"
    },
    PH06: {
      name: "Western Visayas",
      parent_id: "PH06"
    },
    PH07: {
      name: "Central Visayas",
      parent_id: "PH07"
    },
    PH08: {
      name: "Eastern Visayas",
      parent_id: "PH08"
    },
    PH09: {
      name: "Zamboanga Peninsula",
      parent_id: "PH09"
    },
    PH10: {
      name: "Northern Mindanao",
      parent_id: "PH10"
    },
    PH11: {
      name: "Davao",
      parent_id: "PH11"
    },
    PH12: {
      name: "Soccsksargen",
      parent_id: "PH12"
    },
    PH13: {
      name: "Caraga",
      parent_id: "PH13"
    },
    PH14: {
      name: "Autonomous Region in Muslim Mindanao",
      parent_id: "PH14"
    },
    PH15: {
      name: "Cordillera Administrative Region",
      parent_id: "PH15"
    },
    PH40: {
      name: "Calabarzon",
      parent_id: "PH40"
    },
    PH41: {
      name: "Mimaropa",
      parent_id: "PH41"
    }
  },
  legend: {
    entries: []
  },
  regions: {}
};