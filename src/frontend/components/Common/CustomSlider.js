import React, { memo } from "react";
import Slider from "react-slick";
const NextArrow = memo(({ className, style, onClick }) => {
  return (
    <div
      className="absolute top-0 right-0 bottom-0 p-1 z-10 flex items-center cursor-pointer font-bold hover:opacity-100 opacity-50 t-shadow-white-1"
      onClick={onClick}
    >
      <i className="123 material-icons">navigate_next</i>
    </div>
  );
});

const PrevArrow = memo(({ className, style, onClick }) => {
  return (
    <div
      className="absolute top-0 left-0 bottom-0 p-1 z-10 flex items-center cursor-pointer font-bold hover:opacity-100 opacity-50 t-shadow-white-1"
      onClick={onClick}
    >
      <i className="material-icons">navigate_before</i>
    </div>
  );
});
const CustomSlider = ({ children, ...props }) => {
  return (
    <Slider
      slidesToShow={1}
      slidesToScroll={1}
      dots={true}
      swipeToSlide={true}
      infinite={true}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      {...props}
    >
      {children}
    </Slider>
  );
};

export default memo(CustomSlider);
