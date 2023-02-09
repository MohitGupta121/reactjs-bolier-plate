import React from 'react';

export const Login = React.lazy(() => import('../containers/shared/Login'));
export const AccountPreference = React.lazy(() => import('../containers/shared/AccountPreference'));
export const AccountSetup = React.lazy(() => import('../containers/shared/AccountSetup'));
export const UiElements = React.lazy(() => import('../containers/shared/UiElements'));

export const AnalyticsDashboard = React.lazy(() =>
  import('../containers/shared/AnalyticsDashboard')
);
export const ContainerList = React.lazy(() => import('../containers/shared/ContainerList'));

// Global Admin Routes
export const ManageProgram = React.lazy(() => import('../containers/globalAdmin/ManageProgram'));
export const AddOrganization = React.lazy(() =>
  import('../containers/globalAdmin/ManageProgram/AddOrganization')
);
export const AddUsers = React.lazy(() =>
  import('../containers/globalAdmin/ManageProgram/AddUsers')
);
export const EntityList = React.lazy(() =>
  import('../containers/globalAdmin/ManageProgram/EntityList')
);

// Entity Admin Routes
export const Setup = React.lazy(() => import('../containers/entityAdmin/setup'));
export const UnitSetup = React.lazy(() => import('../containers/entityAdmin/setup/UnitSetup'));
export const Introduction = React.lazy(() =>
  import('../containers/entityAdmin/setup/Introduction')
);
export const Tablets = React.lazy(() => import('../containers/entityAdmin/setup/Tablets'));
export const Profiles = React.lazy(() => import('../containers/entityAdmin/setup/Profiles'));
export const Kitchens = React.lazy(() => import('../containers/entityAdmin/setup/Kitchens'));
export const Units = React.lazy(() => import('../containers/entityAdmin/setup/Units'));
export const MasterDatabase = React.lazy(() =>
  import('../containers/entityAdmin/setup/MasterDatabase')
);
export const GeneralSettings = React.lazy(() =>
  import('../containers/entityAdmin/setup/GeneralSettings')
);

export const Tags = React.lazy(() => import('../containers/entityAdmin/setup/Tags'));
export const FinancialCode = React.lazy(() =>
  import('../containers/entityAdmin/setup/FinancialCode')
);
export const AddUnit = React.lazy(() => import('../containers/entityAdmin/setup/AddUnit'));
export const AssignTags = React.lazy(() => import('../containers/entityAdmin/setup/AssignTags'));
export const InviteUsers = React.lazy(() => import('../containers/entityAdmin/setup/InviteUsers'));
export const ReviewDetails = React.lazy(() =>
  import('../containers/entityAdmin/setup/ReviewDetails')
);

export const UpdateUnit = React.lazy(() =>
  import('../containers/entityAdmin/setup/UpdateUnitDetails')
);

export const ManageTags = React.lazy(() => import('../containers/entityAdmin/ManageTags'));
export const ManageUnits = React.lazy(() => import('../containers/entityAdmin/ManageUnits'));
// Dashboard
export const GlobalAdminDashboard = React.lazy(() => import('../containers/globalAdmin/Dashboard'));
export const OrganizationsAdminDashboard = React.lazy(() =>
  import('../containers/organizationAdmin/OrganizationsDashboard')
);
export const OrganizationAdminDashboard = React.lazy(() =>
  import('../containers/organizationAdmin/OrganizationsDashboard/Dashboard')
);
export const EntitiesDashboard = React.lazy(() =>
  import('../containers/entityAdmin/EntitiesDashboard')
);
export const EntityDashboard = React.lazy(() =>
  import('../containers/entityAdmin/EntitiesDashboard/Dashboard')
);
export const ProgramAdminDashboard = React.lazy(() =>
  import('../containers/programAdmin/Dashboard')
);

export const UsersDashboard = React.lazy(() => import('../containers/user/UsersDashboard'));
export const UserDashboard = React.lazy(() =>
  import('../containers/user/UsersDashboard/Dashboard')
);
