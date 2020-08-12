import React, { FC } from "react";
import RegistrationComponent from "../components/RegistrationComponent";

interface IRegistrationProps {}

const RegistrationPage: FC<IRegistrationProps> = (props): JSX.Element => {
  return (
    <>
      <RegistrationComponent />
    </>
  );
};

export default RegistrationPage;
