import { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { MEDICAL_SUBJECTS, generateInstituteData, formatCurrency } from '../../utils/constants';

interface GeographyRevenueProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const GeographyRevenue = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: GeographyRevenueProps) => {
  const [selectedView, setSelectedView] = useState('states');

  // Generate dynamic data based on filters
  const allInstituteData = generateInstituteData(timeRange);
  
  const filteredData = useMemo(() => {
    let data = allInstituteData;
    
    // Apply zone filter
    if (selectedZone !== 'all') {
      data = data.filter(institute => institute.zone === selectedZone);
    }
    
    // Apply subject filter by adjusting revenue
    let subjectMultiplier = 1;
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      subjectMultiplier = subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }
    
    return data.map(institute => ({
      ...institute,
      revenue: Math.floor(institute.revenue * subjectMultiplier)
    }));
  }, [allInstituteData, selectedZone, selectedSubject]);

  // Sample geography data
  const stateData = [
    { name: 'Maharashtra', revenue: 18500000, colleges: 145, growth: '+22.5%', intensity: 100 },
    { name: 'Karnataka', revenue: 15200000, colleges: 120, growth: '+18.2%', intensity: 85 },
    { name: 'Tamil Nadu', revenue: 13800000, colleges: 110, growth: '+15.8%', intensity: 78 },
    { name: 'Delhi', revenue: 12200000, colleges: 85, growth: '+20.1%', intensity: 70 },
    { name: 'Uttar Pradesh', revenue: 11800000, colleges: 95, growth: '+12.4%', intensity: 65 },
    { name: 'Gujarat', revenue: 10500000, colleges: 80, growth: '+16.7%', intensity: 60 },
    { name: 'West Bengal', revenue: 9200000, colleges: 75, growth: '+14.3%', intensity: 52 },
    { name: 'Rajasthan', revenue: 8500000, colleges: 68, growth: '+11.8%', intensity: 48 },
    { name: 'Andhra Pradesh', revenue: 7800000, colleges: 62, growth: '+13.2%', intensity: 44 },
    { name: 'Telangana', revenue: 7200000, colleges: 55, growth: '+19.5%', intensity: 40 },
  ].map(state => {
    // Apply filters to state data
    let multiplier = 1;
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      multiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }
    if (selectedZone !== 'all') {
      // Filter states based on zone (simplified mapping)
      const zoneStates = {
        'North Zone': ['Delhi', 'Uttar Pradesh', 'Rajasthan'],
        'South Zone': ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana'],
        'West Zone': ['Maharashtra', 'Gujarat'],
        'East Zone': ['West Bengal'],
        'Central Zone': []
      };
      const zoneStatesList = zoneStates[selectedZone as keyof typeof zoneStates] || [];
      if (!zoneStatesList.includes(state.name)) {
        multiplier = 0;
      }
    }
    
    return {
      ...state,
      revenue: Math.floor(state.revenue * multiplier),
      colleges: Math.floor(state.colleges * multiplier)
    };
  }).filter(state => state.revenue > 0);

  const cityData = [
    { name: 'Mumbai', revenue: 8200000, colleges: 45, growth: '+25.2%' },
    { name: 'Bangalore', revenue: 7500000, colleges: 42, growth: '+21.8%' },
    { name: 'Chennai', revenue: 6800000, colleges: 38, growth: '+18.5%' },
    { name: 'Delhi', revenue: 6200000, colleges: 35, growth: '+22.1%' },
    { name: 'Pune', revenue: 5800000, colleges: 32, growth: '+19.7%' },
    { name: 'Hyderabad', revenue: 5200000, colleges: 28, growth: '+24.3%' },
    { name: 'Kolkata', revenue: 4800000, colleges: 25, growth: '+16.2%' },
    { name: 'Ahmedabad', revenue: 4200000, colleges: 22, growth: '+18.9%' },
  ];

  const collegeData = filteredData.slice(0, 8).map((institute) => ({
    name: institute.name,
    revenue: institute.revenue,
    students: institute.students,
    growth: `+${(15 + Math.random() * 15).toFixed(1)}%`
  }));

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
            Revenue distribution across regions with performance intensity
          </p>
        </div>

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* India Map Visualization */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-md p-6 h-96 flex items-center justify-center">
            <div className="text-center">
              <Icon icon="solar:map-bold-duotone" className="text-emerald-600 mb-4" width={80} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">India Revenue Map</h3>
              <p className="text-sm text-gray-600 mb-4">Interactive geographic visualization</p>

              {/* Color Legend */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-gray-700">Revenue Intensity</div>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-3 h-3 bg-emerald-200 rounded"></div>
                  <span className="text-xs text-gray-600">Low</span>
                  <div className="w-3 h-3 bg-emerald-400 rounded ml-2"></div>
                  <span className="text-xs text-gray-600">Medium</span>
                  <div className="w-3 h-3 bg-emerald-600 rounded ml-2"></div>
                  <span className="text-xs text-gray-600">High</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance List */}
        <div className="lg:col-span-2">
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

          <div className="space-y-3 max-h-80 overflow-y-auto">
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
                        className={`w-4 h-4 rounded ${getIntensityColor((item as any).intensity)}`}
                      ></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {selectedView === 'colleges'
                        ? `${(item as any).students} students`
                        : `${(item as any).colleges} colleges`}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {formatCurrency(item.revenue)}
                  </div>
                  <div className={`text-sm font-medium ${getGrowthColor(item.growth)}`}>
                    {item.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
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
              ₹{(currentData.reduce((sum, item) => sum + item.revenue, 0) / 10000000).toFixed(1)}Cr
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

      {/* Regional Insights */}
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
    </div>
  );
};

export default GeographyRevenue;
