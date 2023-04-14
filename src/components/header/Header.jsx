import "./header.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  return (
    <>
      <header className="header">
        <h1>Quem é esse pokemon?</h1>
        
      </header>
      <Outlet />
    </>
  );
};

export default Header;
