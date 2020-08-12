import React from "react";

import { Layout } from "antd";

const { Header, Content } = Layout;

const withHome = (PropComponent: any) => {
  const withHome = (props: object) => {
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
                <PropComponent {...props} />
              </div>
            </div>
          </Content>
        </Layout>
      </>
    );
  };

  return withHome;
};

export default withHome;
