import React, { useState, useEffect } from "react";
import { fetchRandomData, fetchRecentTag, fetchAllTags } from "./apiCalls";
import { useNavigate } from "react-router-dom";

//Contains the filter by tag selection, button to fetch random datapoint, and textArea to display the random datapoint

export default function TagDataheader({
  randomData,
  setRandomData,
  chosenTagFilter,
  setChosenTagFilter,
  updatedTagCount,
}) {
  const [filterTags, setFilterTags] = useState([]); //list of existing tags (gotten from database)
  const navigate = useNavigate();

  //configures the header on load and every time an update has been made to the tags

  useEffect(() => {
    setHeader();

    //API call to fetch all the existing tags to display in the drop down
    //API call to get recent (last used) tag to default to that
    //clear random data textarea

    async function setHeader() {
      const res = await fetchAllTags();
      let tags = await res.json();
      tags = tags.map((tag) => tag.name);
      tags.unshift(" ", "RANDOM DATA"); //always include these two tag options
      setFilterTags(tags);
      setRecentTag();
      setRandomData(null);
    }
  }, [updatedTagCount]);

  //fetches the last used tag stored in database
  async function setRecentTag() {
    const res = await fetchRecentTag();
    const recentTag = await res.json();
    setChosenTagFilter(recentTag);
  }

  //onclick handler for the button
  async function getRandomData() {
    //API call to get random data based on filter

    const res = await fetchRandomData(chosenTagFilter);

    //if no datapoint found
    if (res.status === 404) {
      window.alert("No datapoint found with that filter");
      setRandomData(null);
      return;
    }

    //set state to the data found and navigate to the nested route url

    const data = await res.json();
    setRandomData(data);
    navigate(`${data._id}`);
  }

  const displayFilterTags = filterTags.map((tag) => (
    <option key={Math.random()}>{tag}</option>
  ));

  return (
    <>
      <div className="options-container">
        <label>Filter By Tag:</label>
        <select
          name="existing-tags"
          className="select-tag"
          value={chosenTagFilter}
          onChange={(e) => setChosenTagFilter(e.target.value)}
        >
          {displayFilterTags}
        </select>
        <button onClick={getRandomData}>Get Random Data</button>
      </div>
      <div className="data-container">
        <textarea
          readOnly={true}
          className="data-textarea"
          value={randomData ? randomData.datapoint : ""}
        ></textarea>
      </div>
    </>
  );
}
