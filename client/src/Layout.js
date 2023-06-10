import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

//Layout page displays the Nav and outlet - either the add page or tag page

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
