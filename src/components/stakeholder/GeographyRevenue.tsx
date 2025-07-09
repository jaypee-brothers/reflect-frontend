import { useState } from 'react';
import { Icon } from '@iconify/react';
import { MEDICAL_SUBJECTS, formatCurrency } from '../../utils/constants';
import IndiaMap, { GeographicData } from './IndiaMap';
import { sampleGeographicData, getDataByType } from '../../data/sampleGeographicData';

interface GeographyRevenueProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
  showFullMetrics?: boolean; // New prop to control what to display
}

const GeographyRevenue = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
  showFullMetrics = true, // Default to showing full metrics for backward compatibility
}: GeographyRevenueProps) => {
  const [selectedView, setSelectedView] = useState('states');

  // Sample geography data converted to new format
  const geographicData: GeographicData[] = [
    {
      name: 'Maharashtra',
      revenue: 18500000,
      colleges: 145,
      growth: '+22.5%',
      intensity: 100,
      type: 'state' as const,
    },
    {
      name: 'Karnataka',
      revenue: 15200000,
      colleges: 120,
      growth: '+18.2%',
      intensity: 85,
      type: 'state' as const,
    },
    {
      name: 'Tamil Nadu',
      revenue: 13800000,
      colleges: 110,
      growth: '+15.8%',
      intensity: 78,
      type: 'state' as const,
    },
    {
      name: 'Delhi',
      revenue: 12200000,
      colleges: 85,
      growth: '+20.1%',
      intensity: 70,
      type: 'state' as const,
    },
    {
      name: 'Uttar Pradesh',
      revenue: 11800000,
      colleges: 95,
      growth: '+12.4%',
      intensity: 65,
      type: 'state' as const,
    },
    {
      name: 'Gujarat',
      revenue: 10500000,
      colleges: 80,
      growth: '+16.7%',
      intensity: 60,
      type: 'state' as const,
    },
    {
      name: 'West Bengal',
      revenue: 9200000,
      colleges: 75,
      growth: '+14.3%',
      intensity: 52,
      type: 'state' as const,
    },
    {
      name: 'Rajasthan',
      revenue: 8500000,
      colleges: 68,
      growth: '+11.8%',
      intensity: 48,
      type: 'state' as const,
    },
    {
      name: 'Andhra Pradesh',
      revenue: 7800000,
      colleges: 62,
      growth: '+13.2%',
      intensity: 44,
      type: 'state' as const,
    },
    {
      name: 'Telangana',
      revenue: 7200000,
      colleges: 55,
      growth: '+19.5%',
      intensity: 40,
      type: 'state' as const,
    },
  ]
    .map((state) => {
      // Apply filters to state data
      let multiplier = 1;
      if (selectedSubject !== 'all') {
        const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
        multiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
      }
      if (selectedZone !== 'all') {
        // Filter states based on zone (simplified mapping)
        const zoneStates: { [key: string]: string[] } = {
          'North Zone': ['Delhi', 'Uttar Pradesh', 'Rajasthan'],
          'South Zone': ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana'],
          'West Zone': ['Maharashtra', 'Gujarat'],
          'East Zone': ['West Bengal'],
          'Central Zone': ['Madhya Pradesh', 'Chhattisgarh'],
        };
        const zoneStatesList = zoneStates[selectedZone] || [];
        if (!zoneStatesList.includes(state.name)) {
          multiplier = 0;
        }
      }

      return {
        ...state,
        revenue: Math.floor(state.revenue * multiplier),
        colleges: Math.floor(state.colleges * multiplier),
      };
    })
    .filter((state) => state.revenue > 0);

  // Legacy state data for backward compatibility with other components
  const stateData = geographicData.map((item) => ({
    name: item.name,
    revenue: item.revenue,
    colleges: item.colleges,
    growth: item.growth,
    intensity: item.intensity,
  }));

  // Get data from sampleGeographicData instead of hardcoded arrays
  const cityData = getDataByType('city', sampleGeographicData)
    .map((city) => ({
      name: city.name,
      revenue: city.revenue,
      colleges: city.colleges,
      growth: city.growth,
      intensity: city.intensity,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const collegeData = getDataByType('college', sampleGeographicData)
    .map((college) => ({
      name: college.name,
      revenue: college.revenue,
      colleges: college.colleges,
      growth: college.growth,
      intensity: college.intensity,
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 80) return 'bg-emerald-600';
    if (intensity >= 60) return 'bg-emerald-500';
    if (intensity >= 40) return 'bg-emerald-400';
    if (intensity >= 20) return 'bg-emerald-300';
    return 'bg-emerald-200';
  };

  const getGrowthColor = (growth: string) => {
    const value = parseFloat(growth.replace('+', '').replace('%', ''));
    if (value >= 20) return 'text-green-600';
    if (value >= 15) return 'text-blue-600';
    if (value >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const currentData =
    selectedView === 'states' ? stateData : selectedView === 'cities' ? cityData : collegeData;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Geography-Wise Revenue</h2>
          <p className="text-gray-600 text-sm">
            {showFullMetrics
              ? 'Revenue distribution across regions with performance intensity'
              : 'State-wise revenue distribution'}
          </p>
        </div>

        {showFullMetrics && (
          <div className="flex bg-gray-100 rounded-md p-1">
            {[
              { id: 'states', label: 'States', icon: 'solar:map-bold-duotone' },
              { id: 'cities', label: 'Cities', icon: 'solar:city-bold-duotone' },
              { id: 'colleges', label: 'Top Colleges', icon: 'solar:buildings-3-bold-duotone' },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setSelectedView(view.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedView === view.id
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon icon={view.icon} width={16} />
                {view.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* India Map Visualization */}
        <div className="w-full">
          <div
            className="bg-white rounded-lg border border-gray-200 p-4"
            style={{ height: '80vh' }}
          >
            <IndiaMap
              geographicData={
                selectedView === 'states'
                  ? geographicData
                  : [
                      ...geographicData,
                      ...getDataByType(
                        selectedView === 'cities' ? 'city' : 'college',
                        sampleGeographicData,
                      ),
                    ]
              }
              dataLevel={
                selectedView === 'states' ? 'state' : selectedView === 'cities' ? 'city' : 'mixed'
              }
              onGeographyClick={(geographyName: string, type: string) => {
                // Filter data based on selected geography or highlight it
                console.log('Selected geography:', geographyName, type);
                // Future: Filter other components based on selected geography
              }}
              showCities={selectedView === 'cities' || selectedView === 'colleges'}
              showDistricts={false}
              showColleges={selectedView === 'colleges'}
            />
          </div>
        </div>

        {/* Performance List - Only show if showFullMetrics is true */}
        {showFullMetrics && (
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Top Performing{' '}
                {selectedView === 'states'
                  ? 'States'
                  : selectedView === 'cities'
                  ? 'Cities'
                  : 'Colleges'}
              </h3>
              <span className="text-sm text-gray-600">Sorted by revenue ({timeRange})</span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                      {selectedView === 'states' && (
                        <div
                          className={`w-4 h-4 rounded ${getIntensityColor(
                            (item as any).intensity,
                          )}`}
                        ></div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {selectedView === 'colleges'
                          ? `Intensity: ${(item as any).intensity}%`
                          : `${(item as any).colleges} colleges`}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(item.revenue)}</div>
                    <div className={`text-sm font-medium ${getGrowthColor(item.growth)}`}>
                      {item.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary Statistics - Only show if showFullMetrics is true */}
      {showFullMetrics && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {selectedView === 'states' ? '28' : selectedView === 'cities' ? '150+' : '500+'}
              </div>
              <div className="text-sm text-gray-600">
                Active{' '}
                {selectedView === 'states'
                  ? 'States'
                  : selectedView === 'cities'
                  ? 'Cities'
                  : 'Colleges'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{currentData[0]?.name}</div>
              <div className="text-sm text-gray-600">Top Performer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{(currentData.reduce((sum, item) => sum + item.revenue, 0) / 10000000).toFixed(1)}
                Cr
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                +
                {(
                  currentData.reduce(
                    (sum, item) => sum + parseFloat(item.growth.replace('+', '').replace('%', '')),
                    0,
                  ) / currentData.length
                ).toFixed(1)}
                %
              </div>
              <div className="text-sm text-gray-600">Avg. Growth</div>
            </div>
          </div>
        </div>
      )}

      {/* Regional Insights - Only show if showFullMetrics is true */}
      {showFullMetrics && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:cup-star-bold-duotone" className="text-emerald-600" width={20} />
                <span className="text-sm font-semibold text-emerald-800">Highest Growth</span>
              </div>
              <div className="text-sm text-emerald-700">
                {selectedView === 'states'
                  ? 'Maharashtra leading with 22.5% growth'
                  : 'Mumbai showing exceptional performance'}
              </div>
            </div>

            <div className="bg-blue-50 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:target-bold-duotone" className="text-blue-600" width={20} />
                <span className="text-sm font-semibold text-blue-800">Opportunity</span>
              </div>
              <div className="text-sm text-blue-700">
                {selectedView === 'states'
                  ? 'Northeast region has untapped potential'
                  : 'Tier-2 cities showing growth potential'}
              </div>
            </div>

            <div className="bg-purple-50 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon icon="solar:chart-2-bold-duotone" className="text-purple-600" width={20} />
                <span className="text-sm font-semibold text-purple-800">Market Share</span>
              </div>
              <div className="text-sm text-purple-700">
                Top 5 regions contribute 65% of total revenue
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeographyRevenue;
