import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TagDataheader from "./TagDataHeader";

//Parent component for the tag page which will display a random datapoint and provide option for tags

export default function TagPage() {
  //storing state in parent - passed down through props and outlet context

  const [randomData, setRandomData] = useState(null); //will be an object with dataPoint, id and tags[]
  const [chosenTagFilter, setChosenTagFilter] = useState(""); //the tag filter chosen from the drop down menu
  const [updatedTagCount, setUpdatedTagCount] = useState(0); //the number of times a tag update has been made

  document.body.style.backgroundColor = "lightgreen";

  return (
    <>
      <TagDataheader
        randomData={randomData}
        setRandomData={setRandomData}
        chosenTagFilter={chosenTagFilter}
        setChosenTagFilter={setChosenTagFilter}
        updatedTagCount={updatedTagCount}
      />
      {/*Outlet will be the AddTags page with url params for the id of the datapoint*/}
      <Outlet
        context={[
          randomData,
          setRandomData,
          chosenTagFilter,
          setUpdatedTagCount,
        ]}
      />
    </>
  );
}
