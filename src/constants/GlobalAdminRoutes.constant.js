import * as LazyComponent from '../utils/LazyLoaded';

export const globalAdminRoutes = [
  {
    path: 'manage-program',
    component: LazyComponent.ManageProgram,
    children: [
      {
        index: true,
        path: 'entity-list',
        component: LazyComponent.EntityList,
      },
      {
        path: 'organization/list-users',
        component: LazyComponent.AddUsers,
      },
      {
        path: 'add-organization',
        component: LazyComponent.AddOrganization,
      },
    ],
  },
  {
    path: 'dashboard',
    component: LazyComponent.GlobalAdminDashboard,
  },
  {
    exact: false,
    path: 'containers',
    component: LazyComponent.ContainerList,
  },
];
