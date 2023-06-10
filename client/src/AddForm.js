import React, { useState } from "react";
import { addData } from "./apiCalls";

export default function AddForm() {
  const initialFormData = {
    link: "",
    date: setDefaultDate(),
    data1: "",
    data2: "",
    data3: "",
    data4: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    addData(formData);
    setFormData(initialFormData);
  }

  function setDefaultDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    const today = year + "-" + month + "-" + day;
    return today;
  }

  return (
    <>
      <form>
        <div className="top-line">
          <label>Link:</label>
          <input
            className="link-input"
            name="link"
            type="text"
            required
            value={formData.link}
            onChange={handleChange}
          />
          <label>Date:</label>
          <input
            className="date-input"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="data1"
          value={formData.data1}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="data2"
          value={formData.data2}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="data3"
          value={formData.data3}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="data4"
          value={formData.data4}
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit} className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
