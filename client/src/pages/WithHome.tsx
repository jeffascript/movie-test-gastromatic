import React from "react";

import { Layout, Row, Col } from "antd";

const { Header, Content } = Layout;

const withHome = (PropComponent: any) => {
  const withHome = (props: object) => {
    return (
      <>
        <Layout>
          <Header>
            <Row>
              <Col>
                <h1 className="center" style={{ color: "gray" }}>
                  Welcome to GastroMovie Gallery!
                </h1>
              </Col>
            </Row>
          </Header>
          <Content>
            <div className="container">
              <div className="row">
                <div className="col">
                  <PropComponent {...props} />
                </div>
              </div>

              {/* <div className="centertitle">
                    <div className="center">
                      <PropComponent {...props} />
                    </div>
                  </div> */}
            </div>
          </Content>
        </Layout>
      </>
    );
  };

  return withHome;
};

export default withHome;
