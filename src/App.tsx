import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [onPage, setOnPage] = useState<string>("");

  useEffect(() => {
    chrome.storage.local.get(["onPage"], function (result) {
      setOnPage(result.onPage || "");
    });
  }, []);

  return (
    <>
      Hiiiii
      <div>{onPage}</div>
      <div>HIIIII</div>
      {/* <h1>{onPage}</h1> */}
    </>
  );
}

export default App;
