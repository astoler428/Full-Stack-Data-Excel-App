import React from "react";

//not found page for any url not caught in routes

export default function NotFound() {
  document.body.style.backgroundColor = "black";

  return <h1 className="not-found">Page Not Found</h1>;
}
