import * as LazyComponent from '../utils/LazyLoaded';

export const sharedRoutes = [
  {
    exact: false,
    path: 'ui-elements',
    component: LazyComponent.UiElements,
    isPublic: true,
  },
  {
    exact: false,
    path: 'create-account/:inviteType/:inviteCode',
    component: LazyComponent.AccountSetup,
    isPublic: true,
  },
  {
    exact: false,
    path: 'login',
    component: LazyComponent.Login,
    isPublic: true,
  },
  {
    exact: false,
    path: 'my-account',
    component: LazyComponent.AccountPreference,
    isPublic: false,
  },
  {
    path: 'analytics-dashboard',
    component: LazyComponent.AnalyticsDashboard,
  },
];
