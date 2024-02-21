// App.tsx
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { sendReward } from "./lib/sendReward";
import ProgressBar from "./components/ProgressBar";
import Header from "./components/Header";
// import EcoRating from "./component/EcoRating";
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
interface EcoRating {
  Material: number;
  "Energy Efficiency": number;
  Transportation: number;
  "End-of-Life Management": number;
  "Overall Eco-Friendliness Rating": number;
}
function App() {
  const [onPage, setOnPage] = useState<string>("");
  const [data, setData] = useState<ProductData | null>(null);
  const [ecoRating, setEcoRating] = useState<EcoRating | null>(null);

  const [dataR, setDataR] = useState<ProductData[] | null>(null);
  const [ecoRatingR, setEcoRatingR] = useState<EcoRating[] | null>(null);

  const [score, setScore] = useState(5); // Default score is 5

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value);
    setScore(newScore);
  };
  // useEffect(() => {
  //   chrome.storage.local.get(["onPage"], function (result) {
  //     setOnPage(result.onPage || "");
  //   });
  // }, []);
  const handleScraping = async () => {
    if (onPage) {
      const productUrl = `${onPage}`;
      const encodedProductUrl = encodeURIComponent(productUrl);
      const endpointUrl = `http://localhost:3000/api/run-script/${encodedProductUrl}`;
      await fetch(endpointUrl)
        .then((response) => response.json())
        .then(([productDetails, formattedEcoRating]) => {
          setData(productDetails);
          setEcoRating(formattedEcoRating);
        })
        .catch((error) => console.error("Error fetching data:", error));
      await handleRecommPicks();
    }
    console.log(data);
  };
  const handleRecommPicks = async () => {
    if (onPage) {
      const productUrl = `${onPage}`;
      const encodedProductUrl = encodeURIComponent(productUrl);
      const endpointUrl = `http://localhost:3000/api/recomm-picks/${encodedProductUrl}`;

      await fetch(endpointUrl)
        .then((response) => response.json())
        .then((data) => {
          setDataR([data[0][0], data[1][0]]);
          setEcoRatingR([data[0][1], data[1][1]]);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  };
  return (
    <>
      <Header />
      <div>{onPage}</div>
      <button onClick={sendReward} style={{ color: "white", margin: "50px" }}>
        SCRAPE
      </button>
      {/* Include ProgressBar component */}
      <div className="bg-white p-4 mb-4">
        <ProgressBar progress={5} />
        {/* ProductData Component to display the image and title like this */}
        {/* img on left side and title on right side by flex row*/}
        <div>
          <img src={data?.img_src} alt={data?.title} />
          <p>{data?.title}</p>
        </div>
        {/* EcoRating component to display the ratings like this */}
        {/* <EcoRating totalStars={5} /> */}
        {/* display these horizontally one by one just like this*/}
        <div className="text-blue-500 text-lg">
          Material: {ecoRating?.Material}
        </div>
        <div>Energy Efficiency: {ecoRating?.["Energy Efficiency"]}</div>
        <div>Transportation: {ecoRating?.Transportation}</div>
        <div>
          End-of-Life Management: {ecoRating?.["End-of-Life Management"]}
        </div>
        <div>
          Overall Eco-Friendliness Rating:{" "}
          {ecoRating?.["Overall Eco-Friendliness Rating"]}
        </div>
      </div>
      {/* */}
      {/* here the recommended products to be displayed (only 2 sent from backend) */}
      {/* ProductData Component to display the image and title like this */}
      {/* img on left side and title on right side by flex row*/}
      {/* loop through dataR state to display the img and title in a flex col*/}
      <div className="bg-white p-4 mb-4">
        <ProgressBar progress={5} />
        <div>
          <img src={data?.img_src} alt={data?.title} />
          <p>{data?.title}</p>
        </div>
        {/* EcoRating component to display the ratings like this */}
        {/* <EcoRating totalStars={5} /> */}
        {/* display these horizontally one by one just like this*/}
        {/* loop through ecoRatingR state to display the categories in a flex col*/}
        <div className="text-blue-500 text-lg">
          Material: {ecoRating?.Material}
        </div>
        <div>Energy Efficiency: {ecoRating?.["Energy Efficiency"]}</div>
        <div>Transportation: {ecoRating?.Transportation}</div>
        <div>
          End-of-Life Management: {ecoRating?.["End-of-Life Management"]}
        </div>
        <div>
          Overall Eco-Friendliness Rating:{" "}
          {ecoRating?.["Overall Eco-Friendliness Rating"]}
        </div>
      </div>
      <div className="bg-white p-4 mb-4">
        <ProgressBar progress={5} />
        <div>
          <img src={data?.img_src} alt={data?.title} />
          <p>{data?.title}</p>
        </div>
        {/* EcoRating component to display the ratings like this */}
        {/* <EcoRating totalStars={5} /> */}
        {/* display these horizontally one by one just like this*/}
        {/* loop through ecoRatingR state to display the categories in a flex col*/}
        <div className="text-blue-500 text-lg">
          Material: {ecoRating?.Material}
        </div>
        <div>Energy Efficiency: {ecoRating?.["Energy Efficiency"]}</div>
        <div>Transportation: {ecoRating?.Transportation}</div>
        <div>
          End-of-Life Management: {ecoRating?.["End-of-Life Management"]}
        </div>
        <div>
          Overall Eco-Friendliness Rating:{" "}
          {ecoRating?.["Overall Eco-Friendliness Rating"]}
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 px-4 space-y-3">
        <h1 className="text-lg font-semibold text-center py-3">
          Progress Bars
        </h1>

        {/* Danger Bar */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
          <div className="relative h-6 flex items-center justify-center">
            <div
              className="absolute top-0 bottom-0 left-0 rounded-lg bg-red-200"
              style={{ width: `${(score / 10) * 100}%` }}
            ></div>
            <div className="relative text-red-900 font-medium text-sm">{`${score}%`}</div>
          </div>
        </div>
        {/* END Danger Bar */}

        {/* Slider for changing the score */}
        <input
          type="range"
          min="1"
          max="10"
          value={score}
          onChange={handleChange}
          className="w-full"
        />
      </div>
    </>
  );
}

export default App;
