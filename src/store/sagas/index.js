import { all } from 'redux-saga/effects';
import { AddUnitSagas } from '../Entity/AddUnit/AddUnitSagas';
import { EntitySagas } from '../Entity/EntitySagas';
import { OrganizationSagas } from '../Organization/OrganizationSagas';
import { ContainerSagas } from '../shared/Container/ContainerSagas';
import { MiscellaneousSagas } from '../shared/Miscellaneous/MiscellaneousSagas';
import { UserSagas } from '../users/UserSaga';
import { UnitUserSagas } from '../UnitUser/UnitUserSagas';
import { IndustrySagas } from '../Industry/industrySaga';

export function* watchSagas() {
  yield all([
    UserSagas(),
    IndustrySagas(),
    OrganizationSagas(),
    MiscellaneousSagas(),
    EntitySagas(),
    ContainerSagas(),
    AddUnitSagas(),
    UnitUserSagas(),
  ]);
}
