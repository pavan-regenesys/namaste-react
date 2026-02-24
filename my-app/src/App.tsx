import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
// import { useState } from "react";

// console.log(useState);

const Footer = () => {
  return (
    <div className="footer">
      <h4>Footer</h4>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
