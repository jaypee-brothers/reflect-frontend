import { useState, useEffect, useRef } from 'react';
import { Navbar } from 'flowbite-react';
import Profile from './Profile';
import { Drawer } from 'flowbite-react';
import MobileSidebar from '../sidebar/MobileSidebar';

interface HeaderProps {
  selectedTimeRange: string;
  setSelectedTimeRange: (value: string) => void;
  selectedCollege: string;
  setSelectedCollege: (value: string) => void;
  selectedProfessors: string[];
  setSelectedProfessors: (value: string[]) => void;
}

const Header = ({
  selectedTimeRange,
  setSelectedTimeRange,
  selectedCollege,
  setSelectedCollege,
  selectedProfessors,
  setSelectedProfessors,
}: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isProfessorDropdownOpen, setIsProfessorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Professors data
  const professors = ['prof1', 'prof2', 'prof3', 'prof4', 'prof5'];

  const handleProfessorToggle = (professor: string) => {
    if (selectedProfessors.includes(professor)) {
      setSelectedProfessors(selectedProfessors.filter((p) => p !== professor));
    } else {
      setSelectedProfessors([...selectedProfessors, professor]);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfessorDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          {/* Mobile Toggle Icon */}

          <div className="flex gap-3 items-center justify-between w-full ">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="1month">Last Month</option>
                  <option value="3months">Last 3 Months</option>
                </select>
                <select
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="jaypee">Jaypee Medical College</option>
                  <option value="manipal">Manipal Medical College</option>
                  <option value="dy-patil">DY Patil Medical College</option>
                </select>

                {/* Professor Multi-Select Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfessorDropdownOpen(!isProfessorDropdownOpen)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex items-center gap-2 min-w-[200px] justify-between"
                  >
                    <span className="text-sm">
                      {selectedProfessors.length === 0
                        ? 'Select Prof'
                        : `${selectedProfessors.length} Professor${
                            selectedProfessors.length > 1 ? 's' : ''
                          } Selected`}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        isProfessorDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProfessorDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      <div className="p-2">
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                          <button
                            onClick={() => setSelectedProfessors([])}
                            className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            Clear All
                          </button>
                          <button
                            onClick={() => setSelectedProfessors([...professors])}
                            className="text-xs px-2 py-1 bg-blue-100 rounded hover:bg-blue-200"
                          >
                            Select All
                          </button>
                        </div>
                        {professors.map((professor) => (
                          <label
                            key={professor}
                            className="flex items-center gap-2 py-1 hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedProfessors.includes(professor)}
                              onChange={() => handleProfessorToggle(professor)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{professor}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
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
    </>
  );
};

export default Header;
