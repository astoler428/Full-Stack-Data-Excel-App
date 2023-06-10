import { Route, Routes } from "react-router-dom";
import TagPage from "./TagPage";
import Home from "./Home.js";
import AddPage from "./AddPage.js";
import Layout from "./Layout";
import NotFound from "./NotFound";
import AddTags from "./AddTags";
import "./styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Layout />}>
          <Route path="add" element={<AddPage />} />
          <Route path="tag" element={<TagPage />}>
            <Route path=":id" element={<AddTags />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
