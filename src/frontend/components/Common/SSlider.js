import React, { useCallback } from "react";
import { getStrapiMedia } from "../../lib/media";
import CustomSlider from "./CustomSlider";
import Img from "./Img";

const SSlider = ({
  data,
  wClass = "relative h-500px md:h-700px flex flex-wrap",
  showContent = true,
  lineClampTitle = "line-clamp-1",
  lineClampText = "line-clamp-2",
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
              <h1
                className={`uppercase font-bold md:text-3xl xl:text-4xl ${lineClampTitle}`}
              >
                {title}
              </h1>
              <p className={`mt-3 md:text-xl xl:text-2xl ${lineClampText}`}>
                {description}
              </p>
            </div>
          )}
        </>
      );
    } else {
      return (
        <div
          className={`h-full flex flex-wrap container m-auto px-0 sm:px-1 md:px-5 ${type === "image_right" ? "flex-row-reverse" : ""
            }`}
        >
          <div className="w-full sm:w-1/2">
            <Img
              src={url}
              objectFit="cover"
              className="h-full w-full relative"
            />
          </div>
          <div className=" w-full sm:w-1/2 flex flex-col justify-center px-5 text-left">
            <h1
              className={`uppercase font-bold md:text-3xl xl:text-4xl ${lineClampTitle}`}
            >
              {title}
            </h1>
            <p className={`mt-3 md:text-xl xl:text-2xl ${lineClampText}`}>
              {description}
            </p>
          </div>
        </div>
      );
    }
  }, []);

  return (
    <CustomSlider
      slidesToShow={1}
      swipeToSlide={true}
      infinite={true}
      autoplay
      speed={1000}
      {...rest}
    >
      {data?.map((d, i) => {
        return (
          <div className={wClass} key={i} onClick={() => console.log(d)}>
            {renderImage(d)}
          </div>
        );
      })}
    </CustomSlider>
  );
};

export default SSlider;
