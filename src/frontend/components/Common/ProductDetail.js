import React, { useEffect, useRef } from "react";
import { Carousel } from "react-responsive-carousel";
import { fixDinary, iMoney } from "../../lib";
import Img from "./Img";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-0 right-0 bottom-0 p-1 z-10 flex items-center cursor-pointer font-bold hover:opacity-100 opacity-50 t-shadow-white-1"
      onClick={onClick}
    >
      <i className="material-icons">navigate_next</i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-0 left-0 bottom-0 p-1 z-10 flex items-center cursor-pointer font-bold hover:opacity-100 opacity-50 t-shadow-white-1"
      onClick={onClick}
    >
      <i className="material-icons">navigate_before</i>
    </div>
  );
}

const ProductDetail = ({ data, configs }) => {
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const product = data[0];
  return (
    <div className="container m-auto">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-1 md:px-5">
          <Slider asNavFor={slider2.current} ref={slider1} speed={0}>
            {[product?.thumbnail, ...product?.images]?.map((image, index) => {
              return (
                <Img
                  src={fixDinary(image)}
                  className="relative w-full ar53 show-ta5"
                />
              );
            })}
          </Slider>
          <Slider
            focusOnSelect={true}
            asNavFor={slider1.current}
            ref={slider2}
            slidesToShow={4}
            swipeToSlide={true}
            focusOnSelect={true}
            infinite={false}
            // className= "center"
            // centerMode={true}
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
          >
            {[product?.thumbnail, ...product?.images]?.map((image, index) => {
              return (
                <div className="p-1">
                  <Img
                    src={fixDinary(image)}
                    className="relative w-full ar32 show-ta5 custom-select"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className="w-full md:w-1/2">
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
          <div>Số lượng:</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
