// Sample geographic data for states, cities, and districts
export interface GeographicData {
  name: string;
  revenue: number;
  colleges: number;
  growth: string;
  intensity: number;
  type: 'state' | 'city' | 'region' | 'district' | 'college';
  parentName?: string; // For cities/districts, this would be the state name
  coordinates?: [number, number]; // For cities that might not have polygon data
}

export const sampleGeographicData: GeographicData[] = [
  // States
  {
    name: 'Maharashtra',
    revenue: 8500000,
    colleges: 145,
    growth: '+12.5%',
    intensity: 85,
    type: 'state',
  },
  {
    name: 'Karnataka',
    revenue: 6200000,
    colleges: 98,
    growth: '+10.2%',
    intensity: 72,
    type: 'state',
  },
  {
    name: 'Tamil Nadu',
    revenue: 5800000,
    colleges: 112,
    growth: '+8.7%',
    intensity: 68,
    type: 'state',
  },
  {
    name: 'Gujarat',
    revenue: 4200000,
    colleges: 76,
    growth: '+9.1%',
    intensity: 61,
    type: 'state',
  },
  {
    name: 'Uttar Pradesh',
    revenue: 3800000,
    colleges: 89,
    growth: '+6.4%',
    intensity: 55,
    type: 'state',
  },
  {
    name: 'West Bengal',
    revenue: 3200000,
    colleges: 67,
    growth: '+5.8%',
    intensity: 48,
    type: 'state',
  },
  {
    name: 'Rajasthan',
    revenue: 2800000,
    colleges: 54,
    growth: '+7.2%',
    intensity: 42,
    type: 'state',
  },
  {
    name: 'Haryana',
    revenue: 2100000,
    colleges: 38,
    growth: '+8.9%',
    intensity: 38,
    type: 'state',
  },
  {
    name: 'Delhi',
    revenue: 3500000,
    colleges: 45,
    growth: '+11.3%',
    intensity: 78,
    type: 'state',
  },
  {
    name: 'Punjab',
    revenue: 1800000,
    colleges: 32,
    growth: '+6.7%',
    intensity: 35,
    type: 'state',
  },

  // Districts (sample from Maharashtra)
  {
    name: 'Mumbai',
    revenue: 2800000,
    colleges: 45,
    growth: '+15.2%',
    intensity: 92,
    type: 'district',
    parentName: 'Maharashtra',
  },
  {
    name: 'Pune',
    revenue: 2200000,
    colleges: 38,
    growth: '+13.7%',
    intensity: 88,
    type: 'district',
    parentName: 'Maharashtra',
  },
  {
    name: 'Nashik',
    revenue: 850000,
    colleges: 18,
    growth: '+9.4%',
    intensity: 65,
    type: 'district',
    parentName: 'Maharashtra',
  },
  {
    name: 'Nagpur',
    revenue: 1200000,
    colleges: 25,
    growth: '+8.8%',
    intensity: 72,
    type: 'district',
    parentName: 'Maharashtra',
  },

  // Districts (sample from Karnataka)
  {
    name: 'Bangalore Urban',
    revenue: 3200000,
    colleges: 42,
    growth: '+16.8%',
    intensity: 95,
    type: 'district',
    parentName: 'Karnataka',
  },
  {
    name: 'Mysore',
    revenue: 680000,
    colleges: 15,
    growth: '+7.3%',
    intensity: 58,
    type: 'district',
    parentName: 'Karnataka',
  },

  // Cities with coordinates (for major metros)
  {
    name: 'Mumbai',
    revenue: 2800000,
    colleges: 45,
    growth: '+15.2%',
    intensity: 92,
    type: 'city',
    parentName: 'Maharashtra',
    coordinates: [72.8777, 19.076], // Mumbai coordinates
  },
  {
    name: 'Bangalore',
    revenue: 3200000,
    colleges: 42,
    growth: '+16.8%',
    intensity: 95,
    type: 'city',
    parentName: 'Karnataka',
    coordinates: [77.5946, 12.9716], // Bangalore coordinates
  },
  {
    name: 'Chennai',
    revenue: 1800000,
    colleges: 35,
    growth: '+11.4%',
    intensity: 82,
    type: 'city',
    parentName: 'Tamil Nadu',
    coordinates: [80.2707, 13.0827], // Chennai coordinates
  },
  {
    name: 'Delhi',
    revenue: 3500000,
    colleges: 45,
    growth: '+11.3%',
    intensity: 78,
    type: 'city',
    coordinates: [77.1025, 28.7041], // Delhi coordinates
  },
  {
    name: 'Hyderabad',
    revenue: 1900000,
    colleges: 32,
    growth: '+13.2%',
    intensity: 85,
    type: 'city',
    parentName: 'Telangana',
    coordinates: [78.4867, 17.385], // Hyderabad coordinates
  },
  {
    name: 'Pune',
    revenue: 2200000,
    colleges: 38,
    growth: '+13.7%',
    intensity: 88,
    type: 'city',
    parentName: 'Maharashtra',
    coordinates: [73.8567, 18.5204], // Pune coordinates
  },
  {
    name: 'Ahmedabad',
    revenue: 1350000,
    colleges: 28,
    growth: '+9.8%',
    intensity: 71,
    type: 'city',
    parentName: 'Gujarat',
    coordinates: [72.5714, 23.0225], // Ahmedabad coordinates
  },
  {
    name: 'Kolkata',
    revenue: 1100000,
    colleges: 24,
    growth: '+6.9%',
    intensity: 63,
    type: 'city',
    parentName: 'West Bengal',
    coordinates: [88.3639, 22.5726], // Kolkata coordinates
  },

  // Top Colleges with coordinates
  {
    name: 'AIIMS Delhi',
    revenue: 850000,
    colleges: 1,
    growth: '+18.5%',
    intensity: 95,
    type: 'college',
    parentName: 'Delhi',
    coordinates: [77.209, 28.5672], // AIIMS Delhi coordinates
  },
  {
    name: 'Christian Medical College',
    revenue: 720000,
    colleges: 1,
    growth: '+15.2%',
    intensity: 88,
    type: 'college',
    parentName: 'Tamil Nadu',
    coordinates: [76.9558, 11.1271], // CMC Vellore coordinates
  },
  {
    name: 'Armed Forces Medical College',
    revenue: 650000,
    colleges: 1,
    growth: '+12.8%',
    intensity: 82,
    type: 'college',
    parentName: 'Maharashtra',
    coordinates: [73.8567, 18.4875], // AFMC Pune coordinates
  },
  {
    name: 'JIPMER',
    revenue: 580000,
    colleges: 1,
    growth: '+14.1%',
    intensity: 79,
    type: 'college',
    parentName: 'Puducherry',
    coordinates: [79.7597, 11.9416], // JIPMER Puducherry coordinates
  },
  {
    name: 'King Institute of Medical Sciences',
    revenue: 520000,
    colleges: 1,
    growth: '+11.3%',
    intensity: 74,
    type: 'college',
    parentName: 'Telangana',
    coordinates: [78.4867, 17.4399], // KIMS Hyderabad coordinates
  },
  {
    name: 'St. Johns Medical College',
    revenue: 480000,
    colleges: 1,
    growth: '+13.7%',
    intensity: 71,
    type: 'college',
    parentName: 'Karnataka',
    coordinates: [77.5946, 12.9716], // SJMC Bangalore coordinates
  },
  {
    name: 'Maulana Azad Medical College',
    revenue: 450000,
    colleges: 1,
    growth: '+10.5%',
    intensity: 68,
    type: 'college',
    parentName: 'Delhi',
    coordinates: [77.209, 28.6358], // MAMC Delhi coordinates
  },
  {
    name: 'BJ Medical College',
    revenue: 420000,
    colleges: 1,
    growth: '+9.8%',
    intensity: 65,
    type: 'college',
    parentName: 'Gujarat',
    coordinates: [72.5714, 23.0395], // BJMC Ahmedabad coordinates
  },
];

// Helper function to filter data by type
export const getDataByType = (
  type: 'state' | 'city' | 'district' | 'college',
  data = sampleGeographicData,
) => {
  return data.filter((item) => item.type === type);
};

// Helper function to get data for a specific state (including its cities/districts)
export const getDataForState = (stateName: string, data = sampleGeographicData) => {
  return data.filter(
    (item) =>
      item.name.toLowerCase() === stateName.toLowerCase() ||
      item.parentName?.toLowerCase() === stateName.toLowerCase(),
  );
};

// Helper function to aggregate data by state
export const getAggregatedStateData = (data = sampleGeographicData) => {
  const stateMap = new Map();

  data.forEach((item) => {
    const stateName = item.type === 'state' ? item.name : item.parentName;
    if (!stateName) return;

    if (!stateMap.has(stateName)) {
      // Initialize with state data if available
      const stateData = data.find((d) => d.type === 'state' && d.name === stateName);
      stateMap.set(
        stateName,
        stateData
          ? { ...stateData }
          : {
              name: stateName,
              revenue: 0,
              colleges: 0,
              growth: '+0%',
              intensity: 0,
              type: 'state' as const,
            },
      );
    }

    if (item.type !== 'state') {
      const existing = stateMap.get(stateName);
      existing.revenue += item.revenue;
      existing.colleges += item.colleges;
      // Take the highest intensity among sub-regions
      existing.intensity = Math.max(existing.intensity, item.intensity);
    }
  });

  return Array.from(stateMap.values());
};
