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
        <div className="w-96 flex flex-col">
          <p className="text-right mt-4 mb-6 font-bold font-sans text-lg ml-auto">
            {data?.title}
          </p>
          <div className="flex justify-start">
            {" "}
            {/* Updated */}
            <div className="flex items-center">
              <img
                src={data?.img_src}
                alt={data?.title}
                className="w-40 mb-20"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductData;
