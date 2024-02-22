// App.tsx
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import { sendReward } from "./lib/sendReward";
import ProgressBar from "./components/ProgressBar";
import Header from "./components/Header";
// const image = require("./assets/fotor-2024022194124.png");
import DisplayProductData from "./components/ProductData";
import DisplayEcoRating from "./components/EcoRating";
import Loading from "./components/Loading";
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
  const [data, setData] = useState<ProductData>({
    title: "Sample Product",
    product_overview: {
      Weight: "1kg",
      Color: "Red",
    },
    about_this_item: "This is a sample product for demonstration purposes.",
    product_info: "This product is made from high-quality materials.",
    product_info_2: {
      Manufacturer: "Sample Manufacturer",
      Material: "Plastic",
    },
    product_description:
      "This is a detailed description of the sample product.",
    witb_section: ["Section 1", "Section 2", "Section 3"],
    img_src: "../fotor-2024022194124.png",
  });
  const [ecoRating, setEcoRating] = useState<EcoRating>({
    Material: 7,
    "Energy Efficiency": 8,
    Transportation: 6,
    "End-of-Life Management": 9,
    "Overall Eco-Friendliness Rating": 8,
  });

  const [dataR, setDataR] = useState<ProductData[]>([
    {
      title: "Sample Product",
      product_overview: {
        Weight: "1kg",
        Color: "Red",
      },
      about_this_item: "This is a sample product for demonstration purposes.",
      product_info: "This product is made from high-quality materials.",
      product_info_2: {
        Manufacturer: "Sample Manufacturer",
        Material: "Plastic",
      },
      product_description:
        "This is a detailed description of the sample product.",
      witb_section: ["Section 1", "Section 2", "Section 3"],
      img_src: "../fotor-2024022194124.png",
    },
    {
      title: "Sample Product",
      product_overview: {
        Weight: "1kg",
        Color: "Red",
      },
      about_this_item: "This is a sample product for demonstration purposes.",
      product_info: "This product is made from high-quality materials.",
      product_info_2: {
        Manufacturer: "Sample Manufacturer",
        Material: "Plastic",
      },
      product_description:
        "This is a detailed description of the sample product.",
      witb_section: ["Section 1", "Section 2", "Section 3"],
      img_src: "../fotor-2024022194124.png",
    },
  ]);
  const [ecoRatingR, setEcoRatingR] = useState<EcoRating[]>([
    {
      Material: 7,
      "Energy Efficiency": 8,
      Transportation: 6,
      "End-of-Life Management": 9,
      "Overall Eco-Friendliness Rating": 8,
    },
    {
      Material: 7,
      "Energy Efficiency": 8,
      Transportation: 6,
      "End-of-Life Management": 9,
      "Overall Eco-Friendliness Rating": 8,
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingR, setLoadingR] = useState<boolean>(false);

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

  useEffect(() => {
    const productData: ProductData = {
      title: "Sample Product",
      product_overview: {
        Weight: "1kg",
        Color: "Red",
      },
      about_this_item: "This is a sample product for demonstration purposes.",
      product_info: "This product is made from high-quality materials.",
      product_info_2: {
        Manufacturer: "Sample Manufacturer",
        Material: "Plastic",
      },
      product_description:
        "This is a detailed description of the sample product.",
      witb_section: ["Section 1", "Section 2", "Section 3"],
      img_src: "./assets/react.svg",
    };
    const ecoRating: EcoRating = {
      Material: 7,
      "Energy Efficiency": 8,
      Transportation: 6,
      "End-of-Life Management": 9,
      "Overall Eco-Friendliness Rating": 8,
    };
    // setData(productData);

    // setEcoRating(ecoRating);
    // setEcoRatingR([ecoRating, ecoRating]);
  }, []);
  const handleScraping = async () => {
    setLoading(true);
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

      setLoading(false);
      await handleRecommPicks();
    }
    console.log(data);
  };
  const handleRecommPicks = async () => {
    setLoadingR(true);
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

      setLoadingR(false);
    }
  };
  return (
    <>
      <Header />
      <div>{onPage}</div>
      <button
        onClick={handleScraping}
        style={{ color: "white", margin: "50px" }}
      >
        SCRAPE
      </button>
      {/* Include ProgressBar component */}
      <div className="bg-white p-4 mb-10">
        {loading ? <Loading /> : <DisplayProductData data={data} />}
        <DisplayEcoRating ecoRating={ecoRating!} />
      </div>
      <p className="font-helvetica mb-10 text-4xl text-white">
        Related suggestions
      </p>
      <div className="flex flex-row">
        <div className="flex-1">
          <div className="bg-white p-4 mb-4 mr-4">
            {loadingR ? <Loading /> : <DisplayProductData data={dataR[0]} />}
            <DisplayEcoRating ecoRating={ecoRatingR[0]} />
          </div>
        </div>

        <div className="flex">
          <div className="flex-1">
            <div className="bg-white p-4 mb-4 mr5">
              {loadingR ? <Loading /> : <DisplayProductData data={dataR[1]} />}
              <DisplayEcoRating ecoRating={ecoRatingR[1]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
