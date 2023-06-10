import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { putTags, putRecentTag } from "./apiCalls";

//Component that displays when a randomdatapoint is being displayed

export default function AddTags() {
  //state for the tags that will be added to the datapoint
  //these get mapped into input components
  const [tags, setTags] = useState([""]);

  //could get randomData from params id, but since I already have it, may as well pass it down and have only one copy of the state
  const [randomData, setRandomData, chosenTagFilter, setUpdatedTagCount] =
    useOutletContext();
  const navigate = useNavigate();

  //in case the user manually goes to a url of an id that doesn't exist
  if (!randomData) navigate("..");

  //formats all existing tags on the datapoint to display
  //if no datapoint, then no tags
  //each tag has a comma after except the last one

  const displayExistingTagsOnData = randomData
    ? randomData.tags.map((tag, index) => (
        <label key={index} className="existing-tag">
          {index === randomData.tags.length - 1 ? `${tag} ` : `${tag}, `}
        </label>
      ))
    : "";

  const inputTags = tags.map((tag, index) => (
    <input
      key={index}
      value={tag}
      onChange={(e) => handleInputChange(e, index)}
    />
  ));

  //event listener for input fields to add tags to make them controlled components
  function handleInputChange(e, index) {
    setTags((prevTags) =>
      prevTags.map((tag, idx) => (idx === index ? e.target.value : tag))
    );
  }

  //event listener for button to add a tag
  function createNewTag() {
    setTags((prevTags) => [...prevTags, ""]);
  }

  //event handler for submitting tags - sends tags to backend and resets
  async function updateTags(tags) {
    //filter out any blank inputs

    const tagData = tags.filter((tag) => tag !== "");

    await putTags(randomData, tagData);
    await putRecentTag(chosenTagFilter);

    setRandomData(null);
    setUpdatedTagCount((prevUpdatedTagCount) => prevUpdatedTagCount + 1);
    navigate("..");
  }

  return (
    <>
      <div className="existing-tags-container">
        <label>Existing Tags:</label>
        <ul>{displayExistingTagsOnData}</ul>
      </div>
      <div className="new-tags-container">
        <button onClick={createNewTag}>Add tag</button>
        {inputTags}
      </div>
      <button className="update-tags-btn" onClick={() => updateTags(tags)}>
        Update Tags
      </button>
    </>
  );
}
