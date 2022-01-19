import React, { useCallback } from "react";
import { getStrapiMedia } from "../../lib/media";
import { Carousel } from "react-responsive-carousel";
import Img from "./Img";

const Slider = ({
  data,
  wClass = "relative h-500px md:h-700px flex flex-wrap",
  showContent = true,
  ...rest
}) => {
  console.log(data);
  
  const renderImage = useCallback(({ image, type, title, description }) => {
    const url = getStrapiMedia(image);
    if (!type) {
      return <Img src={url} objectFit="cover" className="h-full w-full" />;
    } else if (
      [
        "text_on_image_center",
        "text_on_image_left",
        "text_on_image_right",
      ].includes(type)
    ) {
      let classOption = "";
      if (type === "text_on_image_center")
        classOption = "left-0 right-0 text-center px-20";
      if (type === "text_on_image_left")
        classOption =
          "left-0 text-left sm:p-4 xl:p-10 md:max-w-xl xl:max-w-3xl";
      if (type === "text_on_image_right")
        classOption =
          "right-0 text-right sm:p-4 xl:p-10 md:max-w-xl xl:max-w-3xl";
      return (
        <>
          <Img src={url} objectFit="cover" className="h-full w-full" />
          {showContent && (
            <div
              className={`absolute bottom-0 bg-opacity-40 bg-black hidden md:block mb-20 text-white py-5 ${classOption}`}
            >
              <h1 className="font uppercase md:text-3xl xl:text-4xl line-clamp-1">
                {title}
              </h1>
              <p className="mt-3 md:text-xl xl:text-2xl line-clamp-2">
                {description}
              </p>
            </div>
          )}
        </>
      );
    } else {
      console.log(type,title);
      
      return (
        <div
          className={`h-full w-full flex ${
            type === "image_right" ? "flex-row-reverse" : ""
          }`}
        >
          <div className="w-1/2">
            <Img src={url} objectFit="cover" className="h-full w-full" />
          </div>
          <div className="w-1/2 flex flex-col justify-center px-5 text-left">
            <h1 className="font uppercase md:text-3xl xl:text-4xl line-clamp-1">
              {title}
            </h1>
            <p className="mt-3 md:text-xl xl:text-2xl line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      );
    }
  },[]);

  return (
    <>
      <Carousel
        infiniteLoop
        emulateTouch
        autoPlay
        interval={5000}
        transitionTime={1000}
        showThumbs={false}
        {...rest}
      >
        {data?.map((d, i) => {
          return (
            <div className={wClass} key={i} onClick={() => console.log(d)}>
              {renderImage(d)}
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default Slider;
