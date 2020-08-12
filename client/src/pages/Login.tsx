import React, { FC } from "react";

import { Layout } from "antd";
import LoginComponent from "../components/LoginComponent";
import { useLocation } from "react-router-dom";
import RegistrationComponent from "../components/RegistrationComponent";
const { Header, Footer, Sider, Content } = Layout;

interface ILoginProps {}

const Login: FC<ILoginProps> = (props): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <Layout>
        <Header>
          <h1 className="centertitle" style={{ color: "gray" }}>
            Welcome to GastroMovie Gallery!
          </h1>
        </Header>
        <Content>
          <div className="centertitle">
            <div className="center">
              {location.pathname == "/login" ? (
                <LoginComponent />
              ) : (
                <RegistrationComponent />
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
