import { useState } from 'react';
import IndiaMap from '../stakeholder/IndiaMap';
import {
  sampleGeographicData,
  getDataByType,
  getDataForState,
  getAggregatedStateData,
  GeographicData,
} from '../../data/sampleGeographicData';

const GeographicAnalyticsDashboard = () => {
  const [viewMode, setViewMode] = useState<'state' | 'district' | 'city' | 'mixed'>('state');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [mapData, setMapData] = useState<GeographicData[]>(getAggregatedStateData());

  const handleViewModeChange = (mode: 'state' | 'district' | 'city' | 'mixed') => {
    setViewMode(mode);
    setSelectedState(null);

    switch (mode) {
      case 'state':
        setMapData(getAggregatedStateData());
        break;
      case 'district':
        setMapData([...getDataByType('state'), ...getDataByType('district')]);
        break;
      case 'city':
        setMapData([...getDataByType('state'), ...getDataByType('city')]);
        break;
      case 'mixed':
        setMapData(sampleGeographicData);
        break;
      default:
        setMapData(getAggregatedStateData());
    }
  };

  const handleGeographyClick = (geographyName: string, type: string) => {
    console.log(`Clicked on ${geographyName} (${type})`);

    if (type === 'state') {
      setSelectedState(geographyName);
      // Show detailed data for the selected state
      const stateDetailData = getDataForState(geographyName);
      if (stateDetailData.length > 1) {
        // Has sub-regions
        setMapData(stateDetailData);
        setViewMode('mixed');
      }
    }
  };

  const resetToStateView = () => {
    setViewMode('state');
    setSelectedState(null);
    setMapData(getAggregatedStateData());
  };

  const getTotalMetrics = () => {
    const total = mapData.reduce(
      (acc, item) => {
        if (item.type === 'state' || !selectedState) {
          acc.revenue += item.revenue;
          acc.colleges += item.colleges;
        }
        return acc;
      },
      { revenue: 0, colleges: 0 },
    );
    return total;
  };

  const metrics = getTotalMetrics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Geographic Analytics Dashboard</h2>
            {selectedState && (
              <p className="text-gray-600 mt-1">Detailed view for {selectedState}</p>
            )}
          </div>
          {selectedState && (
            <button
              onClick={resetToStateView}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to India View
            </button>
          )}
        </div>

        {/* View Mode Selector */}
        <div className="flex space-x-2 mb-4">
          {(['state', 'district', 'city', 'mixed'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => handleViewModeChange(mode)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)} View
            </button>
          ))}
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Total Revenue</div>
            <div className="text-2xl font-bold text-blue-900">
              ₹{(metrics.revenue / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Total Colleges</div>
            <div className="text-2xl font-bold text-green-900">{metrics.colleges}</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Coverage</div>
            <div className="text-2xl font-bold text-purple-900">
              {mapData.filter((d) => d.type === 'state').length} States
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="h-[80vh] w-full">
          <IndiaMap
            geographicData={mapData}
            dataLevel={viewMode}
            onGeographyClick={handleGeographyClick}
            showCities={viewMode === 'city' || viewMode === 'mixed'}
            showDistricts={viewMode === 'district' || viewMode === 'mixed'}
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selectedState ? `${selectedState} Details` : 'Geographic Data Overview'}
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Revenue</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Colleges</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Growth</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Intensity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mapData
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 10)
                .map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'state'
                            ? 'bg-blue-100 text-blue-800'
                            : item.type === 'city'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      ₹{(item.revenue / 100000).toFixed(1)}L
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.colleges}</td>
                    <td className="px-4 py-2 text-sm text-green-600 font-medium">{item.growth}</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.intensity}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{item.intensity}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GeographicAnalyticsDashboard;
