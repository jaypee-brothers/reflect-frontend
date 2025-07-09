import { Icon } from '@iconify/react';
import { getTimeRangeMultiplier, formatCurrency, MEDICAL_SUBJECTS } from '../../utils/constants';

interface RevenueSummaryCardsProps {
  timeRange: string;
  selectedSubject?: string;
  selectedZone?: string;
}

const RevenueSummaryCards = ({
  timeRange,
  selectedSubject = 'all',
  selectedZone = 'all',
}: RevenueSummaryCardsProps) => {
  // Dynamic data based on filters
  const getFilteredData = () => {
    const multiplier = getTimeRangeMultiplier(timeRange);
    let baseMultiplier = 1;

    // Apply subject filter
    if (selectedSubject !== 'all') {
      const subjectIndex = MEDICAL_SUBJECTS.indexOf(selectedSubject);
      baseMultiplier *= subjectIndex !== -1 ? (20 - subjectIndex) / 20 : 0.5;
    }

    // Apply zone filter
    if (selectedZone !== 'all') {
      baseMultiplier *= 0.3; // Zone-specific data is typically 30% of total
    }

    const baseRevenue = 12500000 * multiplier * baseMultiplier;
    const baseSubscriptions = 4200 * multiplier * baseMultiplier;
    const baseColleges = 150 * baseMultiplier;

    return {
      totalRevenue: formatCurrency(baseRevenue * (0.9 + Math.random() * 0.2)),
      revenueChange: `+${(15 + Math.random() * 15).toFixed(1)}%`,
      activeSubscriptions: Math.floor(baseSubscriptions * (0.9 + Math.random() * 0.2)),
      subscriptionChange: `+${(12 + Math.random() * 12).toFixed(1)}%`,
      avgRevenuePerCollege: formatCurrency(
        (baseRevenue / baseColleges) * (0.9 + Math.random() * 0.2),
      ),
      avgChange: `+${(8 + Math.random() * 16).toFixed(1)}%`,
      topPerformingSubject:
        selectedSubject !== 'all'
          ? selectedSubject
          : MEDICAL_SUBJECTS[Math.floor(Math.random() * 5)],
      subjectRevenue: formatCurrency(baseRevenue * 0.3 * (0.8 + Math.random() * 0.4)),
    };
  };

  const data = getFilteredData();

  const cards = [
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      change: data.revenueChange,
      icon: 'solar:dollar-minimalistic-bold-duotone',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconColor: 'text-emerald-600',
      changeColor: 'text-emerald-600',
    },
    {
      title: 'Active Subscriptions',
      value: data.activeSubscriptions.toLocaleString(),
      change: data.subscriptionChange,
      icon: 'solar:users-group-two-rounded-bold-duotone',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      changeColor: 'text-blue-600',
    },
    {
      title: 'Avg. Revenue per College',
      value: data.avgRevenuePerCollege,
      change: data.avgChange,
      icon: 'solar:buildings-3-bold-duotone',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconColor: 'text-purple-600',
      changeColor: 'text-purple-600',
    },
    {
      title: 'Top Performing Course',
      value: data.topPerformingSubject,
      change: data.subjectRevenue,
      icon: 'solar:medal-star-bold-duotone',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      changeColor: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-xl p-6 border border-gray-200/50`}>
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 ${card.bgColor
                .replace('50', '200')
                .replace('100', '300')} rounded-lg flex items-center justify-center`}
            >
              <Icon icon={card.icon} className={card.iconColor} width={24} />
            </div>
            <div className="text-right">
              <div
                className={`text-xs font-medium ${card.changeColor} bg-white/70 px-2 py-1 rounded-full flex items-center gap-1`}
              >
                <Icon icon="solar:alt-arrow-up-bold" width={12} />
                {card.change}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>

          {/* Mini trend indicator */}
          <div className="mt-4 pt-4 border-t border-gray-200/30">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>vs previous period</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                <div className="w-2 h-2 bg-current rounded-full opacity-80"></div>
                <div className="w-2 h-2 bg-current rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RevenueSummaryCards;
