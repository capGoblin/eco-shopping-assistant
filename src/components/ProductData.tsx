import React from "react";
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
const ProductData = ({ data }: ProductDataProps) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-center mb-6">{data?.title}</p>
        <div className="flex justify-center">
          <div className="flex items-center">
            <img src={data?.img_src} alt={data?.title} className="w-80 h-45" />
          </div>
        </div>
        <div className="h-8"></div>
        <div className="h-8"></div>
      </div>
    </>
  );
};

export default ProductData;
