import React, { useRef } from "react";
import { fixDinary, iMoney } from "../../lib";
import Img from "./Img";
import CustomSlider from "./CustomSlider";

const ProductDetail = ({ data, configs, className, cClass, ...rest }) => {
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const products = Array.isArray(data) ? data : [data];
  return (
    <div className={className}>
      <CustomSlider
        swipeToSlide={false}
        speed={500}
        {...rest}
      >
        {products?.map((product, index) => {
          return (
            <div>
              <div className={cClass}>
                <div className="flex flex-wrap items-center" key={index}>
                  <div className="w-full md:w-1/2 px-1 md:px-5">
                    <CustomSlider
                      asNavFor={slider2.current}
                      ref={slider1}
                      speed={0}
                      arrows={false}
                    >
                      {[product?.thumbnail, ...product?.images]?.map(
                        (image, index) => {
                          return (
                            <Img
                              key={index}
                              src={fixDinary(image)}
                              className="relative w-full ar53 show-ta5"
                            />
                          );
                        }
                      )}
                    </CustomSlider>
                    <CustomSlider
                      focusOnSelect={true}
                      asNavFor={slider1.current}
                      ref={slider2}
                      slidesToShow={4}
                      swipeToSlide={true}
                      focusOnSelect={true}
                      infinite={false}
                      className="custom-active"
                    >
                      {[product?.thumbnail, ...product?.images]?.map(
                        (image, index) => {
                          return (
                            <div className="p-1" key={index}>
                              <Img
                                src={fixDinary(image)}
                                className="relative w-full ar32 show-ta5 custom-select"
                              />
                            </div>
                          );
                        }
                      )}
                    </CustomSlider>
                  </div>
                  <div className="w-full md:w-1/2 px-5 md:p-0">
                    <h1 className="font-serif uppercase font-bold text-2xl cursor-pointer mb-5">
                      {product?.name}
                    </h1>
                    {!product?.sale_price ? (
                      <div className="text-xl">
                        {iMoney(product?.price, " ₫")}
                      </div>
                    ) : (
                      <div className="">
                        <p className=" text-xl inline-block line-through">
                          {iMoney(product?.price, " ₫")}
                        </p>
                        {" - "}
                        <p className=" text-xl inline-block text-rose-500">
                          {iMoney(product?.sale_price, " ₫")}
                        </p>
                      </div>
                    )}
                    <div className="mt-5">Số lượng:</div>
                    <div className="flex justify-between w-fit mt-2">
                      <span className="border py-2 px-4 cursor-pointer relative hover:text-white after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-black after:-z-10 after:w-0 after:duration-300 hover:after:w-full ">
                        -
                      </span>
                      <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        max={99}
                        className="border w-fit appearance-none text-center"
                      />
                      <span className="border py-2 px-4 cursor-pointer relative hover:text-white after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-black after:-z-10 after:w-0 after:duration-300 hover:after:w-full ">
                        +
                      </span>
                    </div>
                    <div className="mt-5 line-clamp-5">
                      {product?.description}
                    </div>
                    <button className="mt-5 py-2 px-5 border relative hover:text-white after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-black after:-z-10 after:w-0 after:duration-300 hover:after:w-full">
                      Thêm vào giỏ hàng
                    </button>
                    <button className="ml-3 mt-5 py-2 px-5 border relative hover:text-white after:absolute after:top-0 after:bottom-0 after:left-0 after:bg-black after:-z-10 after:w-0 after:duration-300 hover:after:w-full">
                      Đặt hàng nhanh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CustomSlider>
    </div>
  );
};

export default ProductDetail;
