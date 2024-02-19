import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [onPage, setOnPage] = useState<string>("");
  const [data, setData] = useState();

  useEffect(() => {
    chrome.storage.local.get(["onPage"], function (result) {
      setOnPage(result.onPage || "");
    });
  }, [data]);
  const handleScraping = async () => {
    if (onPage) {
      const productUrl = `${onPage}`;
      const encodedProductUrl = encodeURIComponent(productUrl);
      const endpointUrl = `http://localhost:3000/run-script/${encodedProductUrl}`;
      await fetch(endpointUrl)
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData))
        .catch((error) => console.error("Error fetching data:", error));
    }
    console.log(data);
  };
  return (
    <>
      Hiiiii
      <div>{onPage}</div>
      <button onClick={handleScraping}>SCRAPE</button>
      <div>HIIIII</div>
      <div>{data}</div>
      {/* <h1>{onPage}</h1> */}
    </>
  );
}

export default App;
