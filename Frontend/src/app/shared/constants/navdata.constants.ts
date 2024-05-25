import { IRoutes } from '../interfaces/common-interfaces';

export const NAVDATA_CONST = {
  operator: [
    {
      routeLink: '/activity',
      icon: 'pi pi-home',
      label: 'Home',
    },
    {
      routeLink: '/activity/activity-dashboard',
      icon: 'pi pi-th-large',
      label: 'Dashboard',
    },
    {
      routeLink: '/user-manual/general',
      icon: 'pi pi-question-circle',
      label: 'Help',
      items: [
        {
          routeLink: '/user-manual/general',
          icon: 'pi pi-file',
          label: 'User Manual',
        },
        {
          routeLink: '/user-manual/demo-videos',
          icon: 'pi pi-video',
          label: 'Demo Videos',
        },
      ],
    },
  ],

  dayStorageManager: [
    {
      routeLink: '/configure/configure-dashboard',

      icon: 'pi pi-th-large',

      label: 'Dashboard',
    },

    {
      routeLink: '/configure/factory',

      icon: 'fa fa-cog',

      label: 'Location Management',
    },

    {
      routeLink: '/user-management/approve-request',

      icon: 'fa fa-users',

      label: 'User Management',
    },

    {
      routeLink: '/configure/reservation/track-mr',

      icon: 'pi pi-calendar-plus',

      label: 'Material Reservation',
    },

    {
      routeLink: '/configure/po-details',

      icon: 'pi pi-book',

      label: 'Production Orders',
    },

    {
      routeLink: '/user-manual/general',

      icon: 'pi pi-question-circle',

      label: 'Help',

      items: [
        {
          routeLink: '/user-manual/general',

          icon: 'pi pi-file',

          label: 'User Manual',
        },

        {
          routeLink: '/user-manual/demo-videos',

          icon: 'pi pi-video',

          label: 'Demo Videos',
        },
      ],
    },
  ],

  superAdmin: [
    {
      routeLink: '/configure/configure-dashboard',

      icon: 'pi pi-th-large',

      label: 'Dashboard',
    },

    {
      routeLink: '/configure/create-factory',

      icon: 'fa fa-cog',

      label: 'Location Management',
    },

    {
      routeLink: '/user-management/approve-request',

      icon: 'fa fa-users',

      label: 'User Management',
    },

    {
      routeLink: '/user-management/master-data/article-master',

      icon: 'pi pi-database',

      label: 'Master Data Management',
    },

    {
      routeLink: '/user-manual/general',

      icon: 'pi pi-question-circle',

      label: 'Help',

      items: [
        {
          routeLink: '/user-manual/general',

          icon: 'pi pi-file',

          label: 'User Manual',
        },

        {
          routeLink: '/user-manual/demo-videos',

          icon: 'pi pi-video',

          label: 'Demo Videos',
        },
      ],
    },
  ],

  unauthorized: [
    {
      routeLink: '/unauthorized',

      icon: 'pi pi-user-plus',

      label: 'Request Access',
    },

    {
      routeLink: '/user-manual/general',

      icon: 'pi pi-question-circle',

      label: 'Help',

      items: [
        {
          routeLink: '/user-manual/general',

          icon: 'pi pi-file',

          label: 'User Manual',
        },

        {
          routeLink: '/user-manual/demo-videos',

          icon: 'pi pi-video',

          label: 'Demo Videos',
        },
      ],
    },
  ],
};

export const ACTIVE_NAVDATA: IRoutes[] = [
  {
    routeLink: '/activity/issue-pallet',

    items: [
      '/activity/issue-pallet',

      '/activity/issue',

      '/activity/issue-trolley',

      '/activity/issue-manual',
    ],
  },

  {
    routeLink: '/activity/articles/article-list',

    items: [
      '/activity/articles/article-list',

      '/activity/articles/article-status',
    ],
  },

  {
    routeLink: '/configure/factory',

    items: [
      '/configure/factory',

      '/configure/module/factory-daystorages',

      '/configure/module/production-line',

      '/configure/daystorage',

      '/configure/edit-daystorage/articles',

      '/configure/edit-daystorage/bins',

      '/configure/edit-daystorage/basic-details',

      '/configure/bin-info',
    ],
  },

  {
    routeLink: '/user-management/approve-request',

    items: [
      '/user-management/approve-request',

      '/user-management/assign-role',

      '/user-management/factory-admins',

      '/user-management/operators-list',
    ],
  },

  {
    routeLink: '/user-manual/general',

    items: [
      '/user-manual/general',

      '/user-manual/operator-doc',

      '/user-manual/manager-doc',

      '/user-manual/superadmin-doc',

      '/user-manual/demo-videos',
    ],
  },

  {
    routeLink: '/configure/reservation/track-mr',

    items: [
      '/configure/reservation/track-mr',

      '/configure/reservation/create-mr',

      '/configure/view-min',
    ],
  },
];
