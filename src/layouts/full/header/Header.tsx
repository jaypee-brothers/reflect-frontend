import { useState, useEffect } from 'react';
import { Navbar } from 'flowbite-react';
import Profile from './Profile';
import { Drawer } from 'flowbite-react';
import MobileSidebar from '../sidebar/MobileSidebar';
import { useUiStore } from 'src/stores/uiStore';

interface HeaderProps {
  selectedTimeRange: string;
  setSelectedTimeRange: (value: string) => void;
}

const Header = ({ selectedTimeRange, setSelectedTimeRange }: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);

  // Get additional state from UI store
  const { startDate, endDate, setDateRange } = useUiStore();

  // Handle refresh action
  const handleRefresh = () => {
    window.location.reload(); // Hard reload (modern browsers ignore the forceReload param)
  };

  // Format date range for display
  const formatDateRange = () => {
    if (selectedTimeRange === 'custom') {
      const start = new Date(startDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const end = new Date(endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return `${start} - ${end}`;
    }

    const rangeLabels: { [key: string]: string } = {
      today: 'Today',
      yesterday: 'Yesterday',
      '7days': 'Last 7 Days',
      '15days': 'Last 15 Days',
      '1month': 'Last Month',
      '3months': 'Last 3 Months',
      '6months': 'Last 6 Months',
      '1year': 'Last Year',
    };

    return rangeLabels[selectedTimeRange] || 'Last 7 Days';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // mobile-sidebar
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  // mobile date filter
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const openDateFilter = () => setIsDateFilterOpen(true);
  const closeDateFilter = () => setIsDateFilterOpen(false);

  return (
    <>
      <header
        className={`sticky top-0 z-[5] ${
          isSticky ? 'bg-white dark:bg-dark fixed w-full' : 'bg-white'
        }`}
      >
        <Navbar
          fluid
          className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
        >
          <div className="flex gap-3 items-center justify-between w-full">
            {/* Hamburger menu for mobile */}
            <button
              className="xl:hidden p-2 rounded hover:bg-gray-200 focus:outline-none"
              onClick={handleOpen}
              aria-label="Open sidebar"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* Date Filter Button for mobile (below xl) */}
            <button
              className="border border-gray-500 xl:hidden p-1 px-3 rounded hover:bg-gray-200 focus:outline-none flex items-center gap-2"
              onClick={openDateFilter}
              aria-label="Open date filters"
            >
              <svg
                className="h-5 w-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm4 4h8m-4 4v4m0 0h4m-4 0H7"
                />
              </svg>
              <span className="text-gray-700">Filter</span>
            </button>
            {/* Date Selector for xl and above */}
            <div className="hidden xl:flex items-center justify-between">
              <div className="flex flex-col gap-3">
                {/* Time Range Selector and Refresh Button */}
                <div className="flex items-center gap-4">
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="7days">Last 7 Days</option>
                    <option value="15days">Last 15 Days</option>
                    <option value="1month">Last Month</option>
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  {/* Custom Date Range Inputs - Show when custom is selected */}
                  {selectedTimeRange === 'custom' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setDateRange(e.target.value, endDate)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setDateRange(startDate, e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              {/* Current Range Display */}
              <div className="hidden sm:inline text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                <span className="hidden md:inline"> Current Range:</span>{' '}
                <strong>{formatDateRange()}</strong>
              </div>
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="hidden sm:inline"> Refresh</span>{' '}
              </button>
              <Profile />
            </div>
          </div>
        </Navbar>
      </header>

      {/* Mobile Sidebar */}
      <Drawer open={isOpen} onClose={handleClose} className="w-130">
        <Drawer.Items>
          <MobileSidebar />
        </Drawer.Items>
      </Drawer>

      {/* Mobile Date Filter Drawer */}
      <Drawer open={isDateFilterOpen} onClose={closeDateFilter} position="right" className="w-80">
        <Drawer.Items>
          <div className="relative bg-white h-full flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
              <h3 className="text-lg font-semibold">Date Filters</h3>
              <button
                onClick={closeDateFilter}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                aria-label="Close date filter"
              >
                <svg
                  className="h-5 w-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-700">Time Range</label>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-base bg-gray-50"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="15days">Last 15 Days</option>
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                  <option value="6months">Last 6 Months</option>
                  <option value="1year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              {/* Show current range in mobile filter sidebar */}
              {selectedTimeRange === 'custom' && (
                <div className="flex flex-col gap-4">
                  <label className="text-sm font-medium text-gray-700">Custom Date Range</label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setDateRange(e.target.value, endDate)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base w-full bg-gray-50"
                    />
                    <span className="text-gray-500 text-center">to</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setDateRange(startDate, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base w-full bg-gray-50"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className=" text-center border-b border-gray-200 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded w-full">
              <span className="hidden md:inline"> Current Range:</span>{' '}
              <strong>{formatDateRange()}</strong>
            </div>
            <div className=" px-4 py-4 bg-white flex justify-end">
              <button
                onClick={() => {
                  closeDateFilter();
                  window.location.reload();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full font-semibold text-base"
              >
                Apply
              </button>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Header;
