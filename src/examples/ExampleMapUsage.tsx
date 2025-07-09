// Example usage of the enhanced IndiaMap component with city and district data

import IndiaMap, { GeographicData } from '../components/stakeholder/IndiaMap';

// Sample data showing different geographic levels
const sampleData: GeographicData[] = [
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

  // Districts within Maharashtra
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

  // Cities with coordinates
  {
    name: 'Mumbai',
    revenue: 2800000,
    colleges: 45,
    growth: '+15.2%',
    intensity: 92,
    type: 'city',
    parentName: 'Maharashtra',
    coordinates: [72.8777, 19.076],
  },
  {
    name: 'Bangalore',
    revenue: 3200000,
    colleges: 42,
    growth: '+16.8%',
    intensity: 95,
    type: 'city',
    parentName: 'Karnataka',
    coordinates: [77.5946, 12.9716],
  },
];

const ExampleMapUsage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Enhanced India Map Examples</h2>

      {/* State-only view */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">1. State-only View</h3>
        <div className="h-[60vh] bg-white rounded-lg border">
          <IndiaMap
            geographicData={sampleData.filter((d) => d.type === 'state')}
            dataLevel="state"
            onGeographyClick={(name, type) => console.log(`Clicked: ${name} (${type})`)}
          />
        </div>
      </div>

      {/* Districts view */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">2. Districts View</h3>
        <div className="h-[60vh] bg-white rounded-lg border">
          <IndiaMap
            geographicData={sampleData}
            dataLevel="district"
            showDistricts={true}
            onGeographyClick={(name, type) => console.log(`Clicked: ${name} (${type})`)}
          />
        </div>
      </div>

      {/* Cities view */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">3. Cities View</h3>
        <div className="h-[60vh] bg-white rounded-lg border">
          <IndiaMap
            geographicData={sampleData}
            dataLevel="city"
            showCities={true}
            onGeographyClick={(name, type) => console.log(`Clicked: ${name} (${type})`)}
          />
        </div>
      </div>

      {/* Mixed view */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">4. Mixed View (States + Districts + Cities)</h3>
        <div className="h-[60vh] bg-white rounded-lg border">
          <IndiaMap
            geographicData={sampleData}
            dataLevel="mixed"
            showCities={true}
            showDistricts={true}
            onGeographyClick={(name, type) => console.log(`Clicked: ${name} (${type})`)}
          />
        </div>
      </div>
    </div>
  );
};

export default ExampleMapUsage;
