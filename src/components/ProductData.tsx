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
      <div className="flex flex-row">
        <img src={data?.img_src} alt={data?.title} />
        <p>{data?.title}</p>
      </div>
    </>
  );
};

export default ProductData;
