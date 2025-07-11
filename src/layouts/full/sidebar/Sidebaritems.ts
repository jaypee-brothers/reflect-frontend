export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isPro?: boolean;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'HOME',
    children: [
      {
        name: 'Stakeholder Dashboard',
        icon: 'solar:chart-2-bold-duotone',
        id: uniqueId(),
        url: '/',
        isPro: false,
      },
      {
        name: 'Institution Dashboard',
        icon: 'solar:widget-add-line-duotone',
        id: uniqueId(),
        url: '/dashboard',
        isPro: false,
      },
    ],
  },
  {
    heading: 'PROFILES',
    children: [
      {
        name: 'Student Profile',
        icon: 'solar:user-id-bold-duotone',
        id: uniqueId(),
        url: '/profile/student',
        isPro: false,
      },
      {
        name: 'Sales Agent Profile',
        icon: 'solar:user-speak-bold-duotone',
        id: uniqueId(),
        url: '/profile/sales-agent',
        isPro: false,
      },
    ],
  },
  {
    heading: 'DATA MANAGEMENT',
    children: [
      {
        name: 'Q-Bank Analytics',
        icon: 'solar:chart-square-outline',
        id: uniqueId(),
        url: '/tables/qbank-analytics',
        isPro: false,
      },
      {
        name: 'Test Series',
        icon: 'solar:test-tube-outline',
        id: uniqueId(),
        url: '/tables/test-series',
        isPro: false,
      },
      {
        name: 'User Management',
        icon: 'solar:users-group-two-rounded-outline',
        id: uniqueId(),
        url: '/tables/users',
        isPro: false,
      },
      {
        name: 'Video Content',
        icon: 'solar:video-frame-play-vertical-outline',
        id: uniqueId(),
        url: '/tables/videos',
        isPro: false,
      },
    ],
  },
  //   {
  //     heading: 'UTILITIES',
  //     children: [
  //       {
  //         name: 'Typography',
  //         icon: 'solar:text-circle-outline',
  //         id: uniqueId(),
  //         url: '/ui/typography',
  //         isPro: false,
  //       },
  //       {
  //         name: 'Table',
  //         icon: 'solar:bedside-table-3-linear',
  //         id: uniqueId(),
  //         url: '/ui/table',
  //         isPro: false,
  //       },
  //       {
  //         name: 'Form',
  //         icon: 'solar:password-minimalistic-outline',
  //         id: uniqueId(),
  //         url: '/ui/form',
  //         isPro: false,
  //       },
  //       {
  //         name: 'Alert',
  //         icon: 'solar:airbuds-case-charge-outline',
  //         id: uniqueId(),
  //         url: '/ui/alert',
  //         isPro: false,
  //       },
  //     ],
  //   },

  {
    heading: 'Auth',
    children: [
      {
        name: 'Login',
        icon: 'solar:login-2-linear',
        id: uniqueId(),
        url: '/auth/login',
        isPro: false,
      },
      //   {
      //     name: 'Register',
      //     icon: 'solar:shield-user-outline',
      //     id: uniqueId(),
      //     url: '/auth/register',
      //     isPro: false,
      //   },
    ],
  },
];

export default SidebarContent;
