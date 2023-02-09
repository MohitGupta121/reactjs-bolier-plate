import * as LazyComponent from '../utils/LazyLoaded';

export const organizationAdminRoutes = [
  {
    path: 'manage-program',
    component: LazyComponent.ManageProgram,
    children: [
      {
        index: true,
        path: 'entity-list',
        component: LazyComponent.EntityList,
        routeData: {
          hideAddOrgBtn: true,
          hideBackLink: true,
        },
      },
    ],
  },
  {
    path: 'dashboard',
    component: LazyComponent.OrganizationsAdminDashboard,
  },
  {
    path: 'dashboard/:orgId',
    component: LazyComponent.OrganizationAdminDashboard,
  },
];
