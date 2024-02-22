import React from "react";
import { sendReward } from "../lib/sendReward";
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

interface ProductDataProps {
  data: ProductData;
}
function isRunningAsExtension() {
  return (
    typeof window.chrome !== "undefined" &&
    typeof chrome.runtime !== "undefined"
  );
}
const ProductData = ({ data }: ProductDataProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <img src={data?.img_src} alt={data?.title} className="w-36 mb-2" />
        <p
          style={{ cursor: "pointer" }}
          className="text-right font-bold font-sans text-lg"
          onClick={() => {
            if (isRunningAsExtension()) {
              window.open("http://localhost:5173", "_blank");
            } else {
              sendReward();
            }
          }}
        >
          {data?.title}
        </p>
      </div>
    </>
  );
};

export default ProductData;
