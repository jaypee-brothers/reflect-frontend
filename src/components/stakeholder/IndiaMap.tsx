import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { formatCurrency } from '../../utils/constants';

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

interface IndiaMapProps {
  geographicData: GeographicData[];
  dataLevel: 'state' | 'city' | 'district' | 'mixed';
  onGeographyClick?: (geographyName: string, type: string) => void;
  showCities?: boolean;
  showDistricts?: boolean;
  showColleges?: boolean;
}

// Import local India state boundaries GeoJSON file
import indiaGeoData from '../../topojson/india.geojson?url';

const IndiaMap = ({
  geographicData,
  dataLevel = 'state',
  onGeographyClick,
  showCities = false,
  showDistricts = false,
  showColleges = false,
}: IndiaMapProps) => {
  const [tooltipContent, setTooltipContent] = useState<GeographicData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create a map of geography names to data for quick lookup
  const geographyDataMap = geographicData.reduce((acc, item) => {
    const key = `${item.name.toLowerCase()}-${item.type}`;
    acc[key] = item;
    // Also add by name only for backward compatibility
    acc[item.name.toLowerCase()] = item;
    return acc;
  }, {} as Record<string, GeographicData>);

  // Get state-level data for coloring states
  const stateDataMap = geographicData
    .filter((item) => item.type === 'state')
    .reduce((acc, state) => {
      acc[state.name.toLowerCase()] = state;
      return acc;
    }, {} as Record<string, GeographicData>);

  // Get district-level data if available
  const districtDataMap = geographicData
    .filter((item) => item.type === 'district')
    .reduce((acc, district) => {
      acc[district.name.toLowerCase()] = district;
      return acc;
    }, {} as Record<string, GeographicData>);

  // Normalize state names for matching
  const normalizeStateName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, ' ').replace('&', 'and').trim();
  };

  // Get color based on revenue intensity for different geographic levels
  const getGeographyColor = (geographyName: string, type: 'state' | 'district' = 'state') => {
    const normalizedName = normalizeStateName(geographyName);

    // Try to get data based on type
    let geographyData;
    if (type === 'district' && showDistricts) {
      geographyData = districtDataMap[normalizedName];
    }

    // Fallback to state data
    if (!geographyData) {
      geographyData = stateDataMap[normalizedName];
    }

    if (!geographyData) return '#fecaca'; // Pale red for areas without data (no sales)

    const intensity = geographyData.intensity;
    if (intensity >= 80) return '#059669'; // emerald-600
    if (intensity >= 60) return '#10b981'; // emerald-500
    if (intensity >= 40) return '#34d399'; // emerald-400
    if (intensity >= 20) return '#6ee7b7'; // emerald-300
    return '#a7f3d0'; // emerald-200
  };

  const handleMouseEnter = (geo: any, event: any) => {
    // Try multiple property names for geography name, prioritizing local GeoJSON format
    const geographyName =
      geo.properties.st_nm ||
      geo.properties.district ||
      geo.properties.NAME_1 ||
      geo.properties.ST_NM ||
      geo.properties.name ||
      geo.properties.NAME ||
      geo.properties.state_name ||
      geo.properties.State;

    if (geographyName) {
      const normalizedName = normalizeStateName(geographyName);

      // Try to find data - first check if it's a district, then state
      let geographyData = districtDataMap[normalizedName] || stateDataMap[normalizedName];

      // Also try with type suffix
      if (!geographyData) {
        geographyData =
          geographyDataMap[`${normalizedName}-district`] ||
          geographyDataMap[`${normalizedName}-state`] ||
          geographyDataMap[normalizedName];
      }

      if (geographyData) {
        setTooltipContent(geographyData);
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  const handleMouseMove = (event: any) => {
    if (tooltipContent) {
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleGeographyClick = (geo: any) => {
    const geographyName =
      geo.properties.st_nm ||
      geo.properties.district ||
      geo.properties.NAME_1 ||
      geo.properties.ST_NM ||
      geo.properties.name ||
      geo.properties.NAME ||
      geo.properties.state_name ||
      geo.properties.State;

    if (onGeographyClick && geographyName) {
      // Determine type based on available properties
      const type = geo.properties.district ? 'district' : 'state';
      onGeographyClick(geographyName, type);
    }
  };

  return (
    <div className="relative w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 850,
          center: [78.9629, 22.5937], // Slightly adjusted center for better fit
        }}
        width={800}
        height={500}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={indiaGeoData}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => {
              const geographyName =
                geo.properties.st_nm ||
                geo.properties.district ||
                geo.properties.NAME_1 ||
                geo.properties.ST_NM ||
                geo.properties.name ||
                geo.properties.NAME ||
                geo.properties.state_name ||
                geo.properties.State;

              const normalizedName = geographyName ? normalizeStateName(geographyName) : '';

              // Determine if this is a district or state based on properties
              const isDistrict = !!geo.properties.district;
              const geographyType = isDistrict ? 'district' : 'state';

              // Get appropriate data
              let hasData = false;
              if (isDistrict && showDistricts) {
                hasData = !!(normalizedName && districtDataMap[normalizedName]);
              } else {
                hasData = !!(normalizedName && stateDataMap[normalizedName]);
              }

              // Skip districts if not showing them
              if (isDistrict && !showDistricts) {
                return null;
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(event: any) => handleMouseEnter(geo, event)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onClick={() => handleGeographyClick(geo)}
                  style={{
                    default: {
                      fill: geographyName
                        ? getGeographyColor(geographyName, geographyType)
                        : '#fecaca',
                      stroke: '#ffffff',
                      strokeWidth: isDistrict ? 0.5 : 0.75,
                      outline: 'none',
                      cursor: hasData ? 'pointer' : 'default',
                      transition: 'all 0.3s ease-in-out',
                    },
                    hover: {
                      fill: hasData ? '#047857' : '#f87171', // darker emerald or light red
                      stroke: '#ffffff',
                      strokeWidth: isDistrict ? 1 : 1.5,
                      outline: 'none',
                      cursor: hasData ? 'pointer' : 'default',
                      transition: 'all 0.3s ease-in-out',
                    },
                    pressed: {
                      fill: '#065f46', // emerald-800
                      stroke: '#ffffff',
                      strokeWidth: isDistrict ? 1 : 1.5,
                      outline: 'none',
                      transition: 'all 0.2s ease-in-out',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* City markers for city-level data */}
        {showCities &&
          geographicData
            .filter((item) => item.type === 'city' && item.coordinates)
            .map((city, index) => (
              <Marker key={`city-${index}`} coordinates={city.coordinates!}>
                <circle
                  r={Math.max(4, city.intensity / 15)}
                  fill={city.intensity >= 50 ? '#059669' : '#10b981'}
                  stroke="#ffffff"
                  strokeWidth={2}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(event: any) => {
                    setTooltipContent(city);
                    setMousePosition({ x: event.clientX, y: event.clientY });
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onGeographyClick?.(city.name, 'city')}
                />
                <text
                  textAnchor="middle"
                  y={-12}
                  fontSize="10"
                  fill="#374151"
                  fontWeight="500"
                  style={{ pointerEvents: 'none' }}
                >
                  {city.name}
                </text>
              </Marker>
            ))}

        {/* College markers for college-level data */}
        {showColleges &&
          geographicData
            .filter((item) => item.type === 'college' && item.coordinates)
            .map((college, index) => (
              <Marker key={`college-${index}`} coordinates={college.coordinates!}>
                <rect
                  x={-3}
                  y={-3}
                  width={6}
                  height={6}
                  fill={college.intensity >= 60 ? '#dc2626' : '#f59e0b'}
                  stroke="#ffffff"
                  strokeWidth={1}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(event: any) => {
                    setTooltipContent(college);
                    setMousePosition({ x: event.clientX, y: event.clientY });
                  }}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => onGeographyClick?.(college.name, 'college')}
                />
                <text
                  textAnchor="middle"
                  y={-8}
                  fontSize="8"
                  fill="#374151"
                  fontWeight="400"
                  style={{ pointerEvents: 'none' }}
                >
                  {college.name}
                </text>
              </Marker>
            ))}
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none transition-all duration-200 ease-in-out animate-in fade-in-0 zoom-in-95"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translate(0, -100%)',
          }}
        >
          <div className="text-sm font-semibold text-gray-900 mb-1 transition-colors duration-200">
            {tooltipContent.name}
            <span className="text-xs text-gray-500 ml-2 capitalize">({tooltipContent.type})</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-3 transition-colors duration-200">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-medium">{formatCurrency(tooltipContent.revenue)}</span>
            </div>
            <div className="flex justify-between gap-3 transition-colors duration-200">
              <span className="text-gray-600">Colleges:</span>
              <span className="font-medium">{tooltipContent.colleges}</span>
            </div>
            <div className="flex justify-between gap-3 transition-colors duration-200">
              <span className="text-gray-600">Growth:</span>
              <span className="font-medium text-green-600">{tooltipContent.growth}</span>
            </div>
          </div>
        </div>
      )}

      {/* Color Legend */}
      <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 rounded-md p-2 shadow-md">
        <div className="text-xs font-medium text-gray-700 mb-2">
          Revenue Intensity
          {(showDistricts || showCities || showColleges) && (
            <span className="text-gray-500 block">
              {showDistricts && showCities && showColleges
                ? 'States, Districts, Cities & Colleges'
                : showDistricts && showCities
                ? 'States, Districts & Cities'
                : showDistricts && showColleges
                ? 'States, Districts & Colleges'
                : showCities && showColleges
                ? 'States, Cities & Colleges'
                : showDistricts
                ? 'States & Districts'
                : showCities
                ? 'States & Cities'
                : showColleges
                ? 'States & Colleges'
                : 'States'}
            </span>
          )}
        </div>
        <div className="space-y-1">
          {[
            { color: '#fecaca', label: 'No Sales' },
            { color: '#a7f3d0', label: 'Low (0-20%)' },
            { color: '#6ee7b7', label: 'Medium (20-40%)' },
            { color: '#34d399', label: 'High (40-60%)' },
            { color: '#10b981', label: 'Very High (60-80%)' },
            { color: '#059669', label: 'Highest (80%+)' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Map Controls Hint */}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            Click to select{' '}
            {showDistricts
              ? 'state/district'
              : showCities
              ? 'state/city'
              : showColleges
              ? 'state/college'
              : 'state'}
          </div>
          {showCities && (
            <div className="text-xs text-gray-400 mt-1">• Circles represent cities</div>
          )}
          {showColleges && (
            <div className="text-xs text-gray-400 mt-1">• Squares represent colleges</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
