/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from 'prop-types';
import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import Loader from '../components/Loader';
import {
  entityAdminRoutes,
  globalAdminRoutes,
  organizationAdminRoutes,
  programAdminRoutes,
  sharedRoutes,
  userRoutes,
} from '../constants';
import Header from '../containers/shared/Header';
import Auth from '../utils/Auth';
import { USER_TYPES } from '../utils/Enum';
import * as LazyComponent from '../utils/LazyLoaded';
import PrivateRoute from '../utils/PrivateRoute';
import ProtectedRoute from '../utils/ProtectedRoute';

const Routes = () => {
  let userType = Auth.getRoles();
  const isAuth = Auth.isAuth();
  const location = useLocation();
  useEffect(() => {
    userType = Auth.getRoles();
  }, [location]);

  return (
    <Suspense fallback={<Loader />}>
      {/* <Header /> */}
      <ReactRouterRoutes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LazyComponent.Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LazyComponent.Login />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path='/login'
          element={
            <ProtectedRoute>
              <LazyComponent.Login />
            </ProtectedRoute>
          }
        /> */}
        {sharedRoutes.map((route) => (
          <Route
            key={route.path}
            path={`/${route.path}`}
            element={
              route.isPublic ? (
                isAuth ? (
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                ) : (
                  <route.component />
                )
              ) : (
                <PrivateRoute>{<route.component />}</PrivateRoute>
              )
            }
          />
        ))}
        {(userType.includes(USER_TYPES.GLOBAL_ADMIN) ||
          userType.includes(USER_TYPES.SUPER_ADMIN)) &&
          globalAdminRoutes.map((route) => (
            <Route
              key={route.path}
              path={`/${route.path}`}
              element={<PrivateRoute>{<route.component />}</PrivateRoute>}
            >
              {route.children?.length
                ? route.children.map((childRoute) => {
                    return (
                      <Route
                        index={childRoute.index}
                        key={childRoute.path}
                        path={`${childRoute.path}`}
                        element={
                          <PrivateRoute>
                            {<childRoute.component />}
                          </PrivateRoute>
                        }
                      />
                    );
                  })
                : null}
            </Route>
          ))}

        {(userType.includes(USER_TYPES.ORGANIZATION_ADMIN) ||
          userType.includes(USER_TYPES.SUPER_ADMIN)) &&
          organizationAdminRoutes.map((route) => (
            <Route
              key={route.path}
              path={`/${route.path}`}
              element={<PrivateRoute>{<route.component />}</PrivateRoute>}
            >
              {route.children?.length
                ? route.children.map((childRoute) => {
                    return (
                      <Route
                        index={childRoute.index}
                        key={childRoute.path}
                        path={`${childRoute.path}`}
                        element={
                          <PrivateRoute>
                            {<childRoute.component />}
                          </PrivateRoute>
                        }
                      />
                    );
                  })
                : null}
            </Route>
          ))}

        {(userType.includes(USER_TYPES.PROGRAM_ADMIN) ||
          userType.includes(USER_TYPES.SUPER_ADMIN)) &&
          programAdminRoutes.map((route) => (
            <Route
              key={route.path}
              path={`/${route.path}`}
              element={<PrivateRoute>{<route.component />}</PrivateRoute>}
            />
          ))}
        {(userType.includes(USER_TYPES.ENTITY) ||
          userType.includes(USER_TYPES.SUPER_ADMIN)) &&
          entityAdminRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={`/${route.path}`}
                element={<PrivateRoute>{<route.component />}</PrivateRoute>}
              >
                {route.children?.length
                  ? route.children.map((childRoute) => {
                      return (
                        <Route
                          index={childRoute.index}
                          key={childRoute.path}
                          path={`${childRoute.path}`}
                          element={
                            <PrivateRoute>
                              {<childRoute.component />}
                            </PrivateRoute>
                          }
                        >
                          {childRoute.children?.length
                            ? childRoute.children.map((secondChildRoute) => {
                                return (
                                  <Route
                                    index={secondChildRoute.index}
                                    key={secondChildRoute.path}
                                    path={`${secondChildRoute.path}`}
                                    element={
                                      <PrivateRoute>
                                        {<secondChildRoute.component />}
                                      </PrivateRoute>
                                    }
                                  />
                                );
                              })
                            : null}
                        </Route>
                      );
                    })
                  : ''}
              </Route>
            );
          })}
        {(userType.includes(USER_TYPES.USER) ||
          userType.includes(USER_TYPES.SUPER_ADMIN)) &&
          userRoutes.map((route) => (
            <Route
              key={route.path}
              path={`/${route.path}`}
              element={<PrivateRoute>{<route.component />}</PrivateRoute>}
            >
              {route.children?.length
                ? route.children.map((childRoute) => {
                    return (
                      <Route
                        index={childRoute.index}
                        key={childRoute.path}
                        path={`${childRoute.path}`}
                        element={
                          <PrivateRoute>
                            {<childRoute.component />}
                          </PrivateRoute>
                        }
                      />
                    );
                  })
                : null}
            </Route>
          ))}

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <LazyComponent.Login />
            </ProtectedRoute>
          }
        />
      </ReactRouterRoutes>
    </Suspense>
  );
};

Routes.propTypes = {
  userType: PropTypes.string,
};

Routes.defaultProps = {
  userType: USER_TYPES.USER,
};

export default Routes;
