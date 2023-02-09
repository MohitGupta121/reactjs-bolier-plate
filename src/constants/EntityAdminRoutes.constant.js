import * as LazyComponent from '../utils/LazyLoaded';

export const entityAdminRoutes = [
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
        path: 'tags',
        component: LazyComponent.Tags,
      },
      {
        exact: false,
        path: 'financial-code',
        component: LazyComponent.FinancialCode,
      },
      {
        exact: false,
        path: 'update-general-setting',
        component: LazyComponent.GeneralSettings,
      },
      {
        exact: false,
        path: 'manage-tags',
        component: LazyComponent.ManageTags,
      },
      {
        exact: false,
        path: 'add-unit',
        component: LazyComponent.AddUnit,
      },
      {
        exact: false,
        path: 'containers',
        component: LazyComponent.ContainerList,
      },
      {
        exact: false,
        path: 'unit/:unitId',
        component: LazyComponent.UnitSetup,
        children: [
          {
            index: true,
            path: 'update-unit',
            component: LazyComponent.UpdateUnit,
          },
          {
            exact: false,
            path: 'assign-tags',
            component: LazyComponent.AssignTags,
          },
          {
            exact: false,
            path: 'invite-user',
            component: LazyComponent.InviteUsers,
          },
          {
            exact: false,
            path: 'review-details',
            component: LazyComponent.ReviewDetails,
          },
          {
            exact: false,
            path: 'unit-management',
            component: LazyComponent.ManageUnits,
          },
        ],
      },
    ],
  },
  {
    index: true,
    path: 'dashboard',
    component: LazyComponent.EntitiesDashboard,
  },
  {
    index: true,
    path: 'dashboard/:entityId',
    component: LazyComponent.EntityDashboard,
  },
];
