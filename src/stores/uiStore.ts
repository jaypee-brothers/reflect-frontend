import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UiState {
  selectedTimeRange: string;
  startDate: string;
  endDate: string;
  selectedCollege: string;
  selectedProf: string[];
  setSelectedTimeRange: (timeRange: string) => void;
  setDateRange: (startDate: string, endDate: string) => void;
  setSelectedCollege: (college: string) => void;
  setSelectedProf: (prof: string[]) => void;
}

// Helper function to get date range based on time range selection
const getDateRange = (timeRange: string) => {
  const endDate = new Date();
  const startDate = new Date();

  switch (timeRange) {
    case 'today':
      startDate.setDate(endDate.getDate());
      break;
    case 'yesterday':
      startDate.setDate(endDate.getDate() - 1);
      endDate.setDate(endDate.getDate() - 1);
      break;
    case '7days':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '15days':
      startDate.setDate(endDate.getDate() - 15);
      break;
    case '1month':
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case '3months':
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case '6months':
      startDate.setMonth(endDate.getMonth() - 6);
      break;
    case '1year':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(endDate.getDate() - 7); // Default to 7 days
  }

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => {
      // Initialize default date range (past 7 days)
      const defaultDateRange = getDateRange('7days');

      return {
        selectedTimeRange: '7days',
        startDate: defaultDateRange.startDate,
        endDate: defaultDateRange.endDate,
        selectedCollege: '',
        selectedProf: [],

        setSelectedTimeRange: (timeRange: string) => {
          const dateRange = getDateRange(timeRange);
          set({
            selectedTimeRange: timeRange,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          });
        },

        setDateRange: (startDate: string, endDate: string) => {
          set({
            startDate,
            endDate,
            selectedTimeRange: 'custom', // Set to custom when dates are manually set
          });
        },

        setSelectedCollege: (college: string) => set({ selectedCollege: college }),
        setSelectedProf: (prof: string[]) => set({ selectedProf: prof }),
      };
    },
    {
      name: 'ui-storage',
      partialize: (state) => ({
        selectedTimeRange: state.selectedTimeRange,
        startDate: state.startDate,
        endDate: state.endDate,
        selectedCollege: state.selectedCollege,
        selectedProf: state.selectedProf,
      }),
    },
  ),
);
