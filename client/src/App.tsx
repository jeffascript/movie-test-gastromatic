import React, { FC } from "react";
import { Button } from "antd";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import ProtectedRoute, { ProtectedRouteProps } from "./ProtectedRoute";
import { Route, Switch } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegistrationPage from "./pages/RegistrationPage";
import { RouterProps } from "./types";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import { IS_LOGGED_IN, GET_CURRENT_USER } from "./graphAPIs";

interface IAppState {}

interface IAppProps extends RouterProps {}

const App: FC<IAppProps> = (props): JSX.Element => {
  const { data } = useQuery(IS_LOGGED_IN);

  const isItRegistered = useQuery(GET_CURRENT_USER);

  console.log(data.isLoggedIn, isItRegistered);

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: data.isLoggedIn, //!! isAuthenticated,
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

        <Route exact={true} path="/home" component={Home} />

        <Route exact={true} path="/login" component={Login} />

        <Route exact={true} path="/register" component={RegistrationPage} />
      </Switch>
    </>
  );
};

export default App;
