import React from "react";
import AddForm from "./AddForm";
import { createFiles } from "./apiCalls";

export default function AddPage() {
  document.body.style.backgroundColor = "lightblue";
  createFiles();

  return <AddForm />;
}
