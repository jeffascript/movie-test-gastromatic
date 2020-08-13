import React from "react";
import withHome from "./WithHome";
import DashBoardComponent from "../components/DashBoardComponent";

export interface IDashBoardProps {}

export interface IDashBoardState {}

const Dashboard = (props: IDashBoardProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {" "}
          <DashBoardComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
