import * as LazyComponent from '../utils/LazyLoaded';

export const userRoutes = [
  {
    path: 'setup/:entityId',
    component: LazyComponent.Setup,
    children: [
      {
        index: true,
        path: 'introduction',
        component: LazyComponent.Introduction,
      },
      {
        exact: false,
        path: 'tablets',
        component: LazyComponent.Tablets,
      },
      {
        exact: false,
        path: 'profiles',
        component: LazyComponent.Profiles,
      },
      {
        exact: false,
        path: 'kitchens',
        component: LazyComponent.Kitchens,
      },
      {
        exact: false,
        path: 'units',
        component: LazyComponent.Units,
      },
      {
        exact: false,
        path: 'master-database',
        component: LazyComponent.MasterDatabase,
      },
      {
        exact: false,
        path: 'containers',
        component: LazyComponent.ContainerList,
      },
    ],
  },
  {
    index: true,
    path: 'dashboard',
    component: LazyComponent.UsersDashboard,
  },
  {
    index: true,
    path: 'dashboard/:unitId',
    component: LazyComponent.UserDashboard,
  },
];
