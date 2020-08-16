import React, { FC } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@apollo/client";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRoute";
import { Route, Switch } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegistrationPage from "./pages/RegistrationPage";
import { RouterProps } from "./types";

import { IS_LOGGED_IN } from "./graphAPIs";

interface IAppState {}

interface IAppProps extends RouterProps {}

const App: FC<IAppProps> = (props): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    // isAuthenticated: data.isLoggedIn, //!! isAuthenticated,
    isAuthenticated: !!localStorage.getItem("token"),
    authenticationPath: "/login",
    isAllowed: false,
    restrictedPath: "",
  };
  return (
    <>
      <Switch>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path={[defaultProtectedRouteProps.restrictedPath, "/gastromovies"]}
          component={Dashboard}
          exact={true}
        />

        <Route exact={true} path="/login" component={Login} />

        <Route exact={true} path="/register" component={RegistrationPage} />
      </Switch>
    </>
  );
};

export default App;
