import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
interface ProductData {
  title: string;
  product_overview: {
    [key: string]: string;
  };
  about_this_item: string;
  product_info: string;
  product_info_2: {
    [key: string]: string;
  };
  product_description: string;
  witb_section: string[];
  img_src: string;
}

function App() {
  const [onPage, setOnPage] = useState<string>("");
  const [data, setData] = useState<ProductData | null>(null);

  useEffect(() => {
    chrome.storage.local.get(["onPage"], function (result) {
      setOnPage(result.onPage || "");
    });
  }, [data]);
  // display data
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
  const handleDisplayData = () => {
    console.log(data);
  };
  return (
    <>
      Hiiiii
      <div>{onPage}</div>
      <button onClick={handleScraping}>SCRAPE</button>
      <button onClick={handleDisplayData}>DISPLAY</button>
      <div>HIIIII</div>
      <div>
        {/* Display fetched data */}
        {data && (
          <div>
            <h3>Fetched Data</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
