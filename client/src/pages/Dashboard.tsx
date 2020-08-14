import React from "react";
import withHome from "./WithHome";
import DashBoardComponent from "../components/DashBoardComponent";
import "./Dash.css";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
export interface IDashBoardProps {}

export interface IDashBoardState {}

const Dashboard = (props: IDashBoardProps) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <h1>Weelcome</h1>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <DashBoardComponent />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Gastromatic ©2020 Created by Jeff
      </Footer>
    </Layout>

    // <div className="container">
    //   <div className="row">
    //     <div className="col">
    //       {" "}
    //       <DashBoardComponent />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Dashboard;
