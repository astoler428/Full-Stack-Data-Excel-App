import { Link } from "react-router-dom";

//Website home page with options to navigate to Add and Tag pages

export default function Home() {
  document.body.style.backgroundColor = "gray";

  return (
    <>
      <h1>Home Page</h1>
      <div className="container">
        <div className="add-data">
          <Link to="/data/add">Add Data</Link>
        </div>
        <div className="tag-data">
          <Link to="/data/tag">Tag Data</Link>
        </div>
      </div>
    </>
  );
}
