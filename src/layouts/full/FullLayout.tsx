import { FC, useState } from 'react';
import { Outlet } from 'react-router';
import ScrollToTop from 'src/components/shared/ScrollToTop';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

const FullLayout: FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  const [selectedCollege, setSelectedCollege] = useState('jaypee');
  const [selectedProfessors, setSelectedProfessors] = useState<string[]>([]);

  return (
    <>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="page-wrapper flex w-full  ">
          {/* Header/sidebar */}
          <Sidebar />
          <div className="page-wrapper-sub flex flex-col w-full dark:bg-darkgray">
            {/* Top Header  */}
            <Header
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
              selectedCollege={selectedCollege}
              setSelectedCollege={setSelectedCollege}
              selectedProfessors={selectedProfessors}
              setSelectedProfessors={setSelectedProfessors}
            />

            <div className={`bg-lightgray dark:bg-dark  h-full rounded-bb`}>
              {/* Body Content  */}
              <div className={`w-full`}>
                <ScrollToTop>
                  <div className="container py-30">
                    <Outlet context={{ selectedTimeRange, selectedCollege, selectedProfessors }} />
                  </div>
                </ScrollToTop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullLayout;
