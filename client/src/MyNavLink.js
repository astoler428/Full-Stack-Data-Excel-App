import React from "react";
import { NavLink } from "react-router-dom";

//custom NavLink component that uses the built in className function property isActive

export default function MyNavLink({ title, path }) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? "nav-link-active" : "nav-link")}
      to={path}
    >
      {title}
    </NavLink>
  );
}
