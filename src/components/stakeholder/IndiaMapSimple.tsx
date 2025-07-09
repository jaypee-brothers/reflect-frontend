import { useState } from 'react';
import { Icon } from '@iconify/react';
import { formatCurrency } from '../../utils/constants';

interface StateData {
  name: string;
  revenue: number;
  colleges: number;
  growth: string;
  intensity: number;
}

interface IndiaMapProps {
  stateData: StateData[];
  onStateClick?: (stateName: string) => void;
}

const IndiaMapSimple = ({ stateData, onStateClick }: IndiaMapProps) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<StateData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create a map of state names to data for quick lookup
  const stateDataMap = stateData.reduce((acc, state) => {
    acc[state.name.toLowerCase()] = state;
    return acc;
  }, {} as Record<string, StateData>);

  // Get color based on revenue intensity
  const getStateColor = (intensity: number) => {
    if (intensity >= 80) return '#059669'; // emerald-600
    if (intensity >= 60) return '#10b981'; // emerald-500
    if (intensity >= 40) return '#34d399'; // emerald-400
    if (intensity >= 20) return '#6ee7b7'; // emerald-300
    return '#a7f3d0'; // emerald-200
  };

  const handleStateHover = (state: StateData, event: React.MouseEvent) => {
    setHoveredState(state.name);
    setTooltipContent(state);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
    setTooltipContent(null);
  };

  const handleStateClick = (state: StateData) => {
    if (onStateClick) {
      onStateClick(state.name);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Simplified India Map using a grid representation */}
      <div className="w-full h-full p-4">
        <div className="text-center mb-4">
          <Icon icon="solar:map-bold-duotone" className="text-emerald-600 mb-2" width={40} />
          <h3 className="text-sm font-semibold text-gray-900">Interactive State Map</h3>
        </div>

        {/* Grid-based state representation */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
          {/* Row 1 - Northern states */}
          <div className="col-span-3 grid grid-cols-4 gap-1">
            {['Delhi', 'Uttar Pradesh', 'Rajasthan'].map((stateName) => {
              const state = stateDataMap[stateName.toLowerCase()];
              return state ? (
                <button
                  key={stateName}
                  className={`p-2 rounded text-xs font-medium text-white transition-all duration-200 hover:scale-105 ${
                    hoveredState === stateName ? 'ring-2 ring-emerald-300' : ''
                  }`}
                  style={{ backgroundColor: getStateColor(state.intensity) }}
                  onMouseEnter={(e) => handleStateHover(state, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStateClick(state)}
                >
                  {stateName.split(' ')[0]}
                </button>
              ) : null;
            })}
          </div>

          {/* Row 2 - Western states */}
          <div className="col-span-3 grid grid-cols-4 gap-1">
            {['Maharashtra', 'Gujarat', 'West Bengal'].map((stateName) => {
              const state = stateDataMap[stateName.toLowerCase()];
              return state ? (
                <button
                  key={stateName}
                  className={`p-2 rounded text-xs font-medium text-white transition-all duration-200 hover:scale-105 ${
                    hoveredState === stateName ? 'ring-2 ring-emerald-300' : ''
                  }`}
                  style={{ backgroundColor: getStateColor(state.intensity) }}
                  onMouseEnter={(e) => handleStateHover(state, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStateClick(state)}
                >
                  {stateName.split(' ')[0]}
                </button>
              ) : null;
            })}
          </div>

          {/* Row 3 - Southern states */}
          <div className="col-span-3 grid grid-cols-4 gap-1">
            {['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana'].map((stateName) => {
              const state = stateDataMap[stateName.toLowerCase()];
              return state ? (
                <button
                  key={stateName}
                  className={`p-2 rounded text-xs font-medium text-white transition-all duration-200 hover:scale-105 ${
                    hoveredState === stateName ? 'ring-2 ring-emerald-300' : ''
                  }`}
                  style={{ backgroundColor: getStateColor(state.intensity) }}
                  onMouseEnter={(e) => handleStateHover(state, e)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStateClick(state)}
                >
                  {stateName.split(' ')[0]}
                </button>
              ) : null;
            })}
          </div>
        </div>

        {/* Color Legend */}
        <div className="mt-6 bg-white bg-opacity-90 rounded-md p-3">
          <div className="text-xs font-medium text-gray-700 mb-2">Revenue Intensity</div>
          <div className="grid grid-cols-2 gap-1">
            {[
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
        </div>
      </div>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translate(0, -100%)',
          }}
        >
          <div className="text-sm font-semibold text-gray-900 mb-1">{tooltipContent.name}</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-3">
              <span className="text-gray-600">Revenue:</span>
              <span className="font-medium">{formatCurrency(tooltipContent.revenue)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-600">Colleges:</span>
              <span className="font-medium">{tooltipContent.colleges}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-gray-600">Growth:</span>
              <span className="font-medium text-green-600">{tooltipContent.growth}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndiaMapSimple;
