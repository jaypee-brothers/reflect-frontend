# Enhanced IndiaMap Component

The `IndiaMap` component now supports multiple geographic levels including states, districts, and cities with enhanced interactivity and visualization capabilities.

## Features

- **Multi-level Geographic Data**: Support for states, districts, cities, and regions
- **Interactive Tooltips**: Hover to see detailed information with smooth transitions
- **City Markers**: Display cities as circles with coordinates
- **District Boundaries**: Show district-level data when available
- **Flexible Data Filtering**: Filter by geography type or show mixed data
- **Color-coded Intensity**: Visual representation of revenue intensity
- **Responsive Design**: Adapts to different screen sizes
- **Local GeoJSON**: Uses local India state boundaries for reliable rendering

## Interface

```typescript
interface GeographicData {
  name: string;
  revenue: number;
  colleges: number;
  growth: string;
  intensity: number;
  type: 'state' | 'city' | 'region' | 'district';
  parentName?: string; // For cities/districts, this would be the state name
  coordinates?: [number, number]; // For cities that might not have polygon data
}

interface IndiaMapProps {
  geographicData: GeographicData[];
  dataLevel: 'state' | 'city' | 'district' | 'mixed';
  onGeographyClick?: (geographyName: string, type: string) => void;
  showCities?: boolean;
  showDistricts?: boolean;
}
```

## Usage Examples

### 1. Basic State-level Map

```tsx
import IndiaMap, { GeographicData } from './components/stakeholder/IndiaMap';

const stateData: GeographicData[] = [
  {
    name: 'Maharashtra',
    revenue: 8500000,
    colleges: 145,
    growth: '+12.5%',
    intensity: 85,
    type: 'state'
  },
  // ... more states
];

<IndiaMap
  geographicData={stateData}
  dataLevel="state"
  onGeographyClick={(name, type) => console.log(\`Selected: \${name} (\${type})\`)}
/>
```

### 2. District-level Map

```tsx
const districtData: GeographicData[] = [
  // Include both state and district data
  {
    name: 'Maharashtra',
    revenue: 8500000,
    colleges: 145,
    growth: '+12.5%',
    intensity: 85,
    type: 'state',
  },
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
];

<IndiaMap
  geographicData={districtData}
  dataLevel="district"
  showDistricts={true}
  onGeographyClick={(name, type) => handleDistrictClick(name, type)}
/>;
```

### 3. City-level Map with Markers

```tsx
const cityData: GeographicData[] = [
  // States for background
  {
    name: 'Maharashtra',
    revenue: 8500000,
    colleges: 145,
    growth: '+12.5%',
    intensity: 85,
    type: 'state',
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

<IndiaMap
  geographicData={cityData}
  dataLevel="city"
  showCities={true}
  onGeographyClick={(name, type) => handleCityClick(name, type)}
/>;
```

### 4. Mixed View (All Levels)

```tsx
<IndiaMap
  geographicData={allGeographicData}
  dataLevel="mixed"
  showCities={true}
  showDistricts={true}
  onGeographyClick={(name, type) => {
    if (type === 'state') {
      // Handle state selection
    } else if (type === 'city') {
      // Handle city selection
    } else if (type === 'district') {
      // Handle district selection
    }
  }}
/>
```

## Data Management Helper Functions

Use the provided helper functions for data management:

```typescript
import {
  sampleGeographicData,
  getDataByType,
  getDataForState,
  getAggregatedStateData,
} from '../data/sampleGeographicData';

// Get only state data
const stateData = getDataByType('state');

// Get only city data
const cityData = getDataByType('city');

// Get all data for a specific state
const maharashtraData = getDataForState('Maharashtra');

// Get aggregated state-level data
const aggregatedData = getAggregatedStateData();
```

## Styling and Visual Features

### Color Intensity Mapping

- **No Sales**: Light red (#fecaca)
- **Low (0-20%)**: Light emerald (#a7f3d0)
- **Medium (20-40%)**: Medium emerald (#6ee7b7)
- **High (40-60%)**: Bright emerald (#34d399)
- **Very High (60-80%)**: Strong emerald (#10b981)
- **Highest (80%+)**: Dark emerald (#059669)

### Interactive Features

- **Hover Effects**: Smooth color transitions on hover
- **Tooltips**: Show geography details with revenue, colleges, and growth
- **Click Handlers**: Custom click handlers for different geography types
- **Responsive Legend**: Updates based on displayed data types

### City Markers

- Circle size based on intensity
- State name labels
- Hover interactions
- Clickable for detailed views

## Integration with Dashboard

The enhanced IndiaMap integrates seamlessly with existing dashboard components:

```tsx
// In GeographyRevenue component
<IndiaMap
  geographicData={geographicData}
  dataLevel="state"
  onGeographyClick={handleGeographySelection}
  showCities={selectedView === 'cities'}
  showDistricts={selectedView === 'districts'}
/>
```

## Performance Considerations

- Uses local GeoJSON file for fast loading
- Efficient data filtering and mapping
- Smooth CSS transitions for better UX
- Responsive design with proper scaling

## Future Enhancements

- **Zoom and Pan**: Add map navigation capabilities
- **Data Layers**: Toggle between different data metrics
- **Animation**: Animated transitions between data states
- **Export**: Export map as image or PDF
- **Custom Styling**: Theme-based color schemes
- **Real-time Data**: Integration with live data sources

## Troubleshooting

### Common Issues

1. **Missing Data**: Ensure your data includes the required `type` field
2. **Coordinate Issues**: Verify city coordinates are in [longitude, latitude] format
3. **Performance**: For large datasets, consider data pagination or virtualization
4. **Styling**: Use CSS-in-JS or Tailwind classes for consistent styling

### Browser Support

- Modern browsers supporting SVG and React 18+
- Responsive design works on mobile devices
- Optimized for touch interactions on tablets
