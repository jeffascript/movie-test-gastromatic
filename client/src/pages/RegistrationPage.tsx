import React, { FC } from "react";
import RegistrationComponent from "../components/RegistrationComponent";
import withHome from "./WithHome";

interface IRegistrationProps {}

const RegistrationPage: FC<IRegistrationProps> = (props): JSX.Element => {
  return (
    <>
      <RegistrationComponent />
    </>
  );
};

export default withHome(RegistrationPage);
