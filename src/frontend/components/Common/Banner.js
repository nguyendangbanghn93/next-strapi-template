import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { getStrapiMedia } from "../../lib/media";
import Img from "./Img";
const Banner = ({ data }) => {
  // console.log(data);

  return (
    <>
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
      >
        <div>
          <Img
            style={{ width: "100%", "aspect-ratio": "1/1" }}
            src={"http://localhost:1337/uploads/download_58696c0ace.webp"}
          />
        </div>
        {data?.map((d) => {
          console.log(d?.image?.url, getStrapiMedia(d?.image));
          return (
            <div
              className="w-full"
              style={{
                "aspect-ratio": "2/5",
                backgroundImage: `url('${getStrapiMedia(d?.image)}')`,
              }}
            ></div>
          );

          // return (
          //   <div>
          //     {getStrapiMedia(d?.image) || (
          //       <Image src={getStrapiMedia(d?.image)} />
          //     )}
          //   </div>
          // );
        })}
        <div
          className="w-full"
          style={{
            "aspect-ratio": "5/2",
            backgroundImage: `url('http://localhost:1337/uploads/download_58696c0ace.webp')`,
          }}
        ></div>
      </Slider>
    </>
  );
};

export default Banner;
