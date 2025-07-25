import { Sidebar } from 'flowbite-react';
import SidebarContent from './Sidebaritems';
import NavItems from './NavItems';
// @ts-ignore
import SimpleBar from 'simplebar-react';
import React from 'react';
import FullLogo from '../shared/logo/FullLogo';
import NavCollapse from './NavCollapse';
import { useAuthStore } from 'src/stores/authStore';

interface SidebarLayoutProps {
  selectedCollege: string;
  setSelectedCollege: (value: string) => void;
}

const SidebarLayout = ({ selectedCollege, setSelectedCollege }: SidebarLayoutProps) => {
  const { colleges } = useAuthStore();

  return (
    <>
      <div className="xl:block hidden">
        <Sidebar
          className="fixed menu-sidebar  bg-white dark:bg-darkgray rtl:pe-4 rtl:ps-0 "
          aria-label="Sidebar with multi-level dropdown example"
        >
          <div className="px-6 py-4 flex items-center sidebarlogo">
            <FullLogo />
          </div>

          {/* College Selector */}
          <div className="px-6 pb-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select College
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {colleges &&
                  colleges.map((college, index) => (
                    <option key={index} value={college.name}>
                      {college.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <SimpleBar>
            <Sidebar.Items className="px-5 mt-2">
              <Sidebar.ItemGroup className="sidebar-nav hide-menu">
                {SidebarContent &&
                  SidebarContent?.map((item, index) => (
                    <div className="caption" key={item.heading}>
                      <React.Fragment key={index}>
                        <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                          {item.heading}
                        </h5>
                        {item.children?.map((child, index) => (
                          <React.Fragment key={child.id && index}>
                            {child.children ? (
                              <div className="collpase-items">
                                <NavCollapse item={child} />
                              </div>
                            ) : (
                              <NavItems item={child} />
                            )}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    </div>
                  ))}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </SimpleBar>
        </Sidebar>
      </div>
    </>
  );
};

export default SidebarLayout;
