import React, { FC } from "react";

import LoginComponent from "../components/LoginComponent";
import { useLocation } from "react-router-dom";

import withHome from "./Home";

interface ILoginProps {}

const Login: FC<ILoginProps> = (props): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <LoginComponent />
    </>
  );
};

export default withHome(Login);
