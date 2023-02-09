import { combineReducers } from 'redux';
import AddUnit from '../Entity/AddUnit/AddUnitReducers';
import Entity from '../Entity/EntityReducer';
import Organization from '../Organization/OrganizationReducer';
import Container from '../shared/Container/ContainerReducer';
import Loader from '../shared/Loader/LoaderReducer';
import Miscellaneous from '../shared/Miscellaneous/MiscellaneousReducer';
import Toaster from '../shared/Toaster/ToasterReducer';
import User from '../users/UserReducer';
import UnitUser from '../UnitUser/UnitUserReducer';

export default combineReducers({
  User,
  Toaster,
  Loader,
  Organization,
  Miscellaneous,
  Entity,
  Container,
  AddUnit,
  UnitUser,
});
