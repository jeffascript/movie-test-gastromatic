import React, { FC } from "react";

import { Row, Col, Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

interface ILoginProps {}

const Login: FC<ILoginProps> = (props): JSX.Element => {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Row>
            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
              Col
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default Login;
