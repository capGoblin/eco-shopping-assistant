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
// const image = require("./assets/fotor-2024022194124.png");
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
export interface EcoRating {
  Material: any;
  "Energy Efficiency": any;
  Transportation: any;
  "End-of-Life Management": any;
  "Overall Eco-Friendliness Rating": any;
}
function App() {
  const [onPage, setOnPage] = useState<string>("");
  const [data, setData] = useState<ProductData>(() => {
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : {
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
      product_description: "This is a detailed description of the sample product.",
      witb_section: ["Section 1", "Section 2", "Section 3"],
      img_src: "../vite.svg",
    };
  });
  
  const [ecoRating, setEcoRating] = useState<EcoRating>(

    {
      Material: 7,
      "Energy Efficiency": 8,
      Transportation: 6,
      "End-of-Life Management": 9,
      "Overall Eco-Friendliness Rating": 8,
    }
  );
// useEffect(() => {
//   chrome.storage.local.get(['ecoRating'], function(result) {
//     setEcoRating(result.ecoRating ? result.ecoRating : {
//       Material: 7,
//       "Energy Efficiency": 8,
//       Transportation: 6,
//       "End-of-Life Management": 9,
//       "Overall Eco-Friendliness Rating": 8,
//     });
//   });
// }, []);
  const [dataR, setDataR] = useState<ProductData[]>(() => {
    
    const storedData = localStorage.getItem('dataR');
    return storedData ? JSON.parse(storedData) : [
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
        img_src: "../vite.svg",
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
        img_src: "../vite.svg",
      },
    ];
  
  });
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
//   useEffect(() => {
//   chrome.storage.local.get(['ecoRatingR'], function(result) {
//     setEcoRatingR(result.ecoRatingR ? result.ecoRatingR : [
//       {
//         Material: 7,
//         "Energy Efficiency": 8,
//         Transportation: 6,
//         "End-of-Life Management": 9,
//         "Overall Eco-Friendliness Rating": 8,
//       },
//       {
//         Material: 7,
//         "Energy Efficiency": 8,
//         Transportation: 6,
//         "End-of-Life Management": 9,
//         "Overall Eco-Friendliness Rating": 8,
//       },
//     ]);
//   });
// }, []);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingR, setLoadingR] = useState<boolean>(false);

  const [onClick, setOnClick] = useState<boolean>(false);

  const [score, setScore] = useState(5); // Default score is 5

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScore = parseInt(e.target.value);
    setScore(newScore);
  };

  useEffect(() => {
    // localStorage.setItem("ecoRating", JSON.stringify({
    //   Material: 7,
    //   "Energy Efficiency": 8,
    //   Transportation: 6,
    //   "End-of-Life Management": 9,
    //   "Overall Eco-Friendliness Rating": 8,
    // }))

    localStorage.setItem("data", JSON.stringify(data))
  }, [data])

    useEffect(() => {
    // localStorage.setItem("ecoRating", JSON.stringify({
    //   Material: 7,
    //   "Energy Efficiency": 8,
    //   Transportation: 6,
    //   "End-of-Life Management": 9,
    //   "Overall Eco-Friendliness Rating": 8,
    // }))

    localStorage.setItem("dataR", JSON.stringify(dataR))
  }, [dataR])
  
  // useEffect(() => {
  //   chrome.storage.local.set({
  //     ecoRating: ecoRating
  //   });
  // }, [ecoRating]);
  // useEffect(() => {
  //   chrome.storage.local.set({
  //     ecoRatingR: ecoRatingR
  //   });
  // }, [ecoRatingR]);

  
  useEffect(() => {
    chrome.storage.local.get(["onPage"], function (result) {
      setOnPage(result.onPage || "");
    });
  }, []);
  useEffect(() => {
    // Listen for changes in the extensionClick flag in local storage
    chrome.storage.local.get(["extensionClick"], function (result) {
      if (result.extensionClick) {
        // If the flag is true, set onClick to true and trigger handleScraping
        setOnClick(true);
        handleScraping();
      }
    });
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
      <div>{onPage ? "ya" : null}</div>
      <button
        onClick={handleScraping}
        style={{ color: "white", margin: "50px" }}
      >
        SCRAPE
      </button>
      {/* Include ProgressBar component */}
      <div className="bg-white p-4 mb-10">
        {loading ? (
          <Loading />
        ) : (
          <DisplayProductData data={data} widthClass="w-36" />
        )}
        <DisplayEcoRating ecoRating={ecoRating!} />
      </div>
      <p className="font-helvetica mb-10 text-4xl text-white">
        Related suggestions
      </p>
      <div className="flex flex-row">
        <div className="flex-1">
          <div className="bg-white p-4 mb-4 mr-4">
            {loadingR ? (
              <Loading />
            ) : (
              <DisplayProductData data={dataR[0]} widthClass="w-24" />
            )}
            <DisplayEcoRating ecoRating={ecoRatingR[0]} />
          </div>
        </div>

        <div className="flex">
          <div className="flex-1">
            <div className="bg-white p-4 mb-4 mr5">
              {loadingR ? (
                <Loading />
              ) : (
                <DisplayProductData data={dataR[1]} widthClass="w-24" />
              )}
              <DisplayEcoRating ecoRating={ecoRatingR[1]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
