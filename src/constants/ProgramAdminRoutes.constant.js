import * as LazyComponent from '../utils/LazyLoaded';

export const programAdminRoutes = [
  {
    index: true,
    path: 'dashboard',
    component: LazyComponent.ProgramAdminDashboard,
  },
];
