import React from "react";
import { fixDinary } from "../../lib";

const Decor = ({ data }) => {
  const { decor } = data;
  console.log("decor___", data, data?.image);

  return (
    <>
      <div
        className={`bg-no-repeat bg-center bg-cover h-500px flex flex-col justify-center items-center ${decor?.fixed?"bg-fixed":""}`}
        style={{ backgroundImage: `url("${fixDinary(decor?.image)}")`,aspectRatio:decor?.aspect_ratio}}
      >
        <div className="bg- bg-black bg-opacity-50 p-10 text-center">
          <h1 className="text-4xl text-white font-bold">{decor?.title}</h1>
          <p className="text-white text-xl mt-3 line-clamp-3">{decor?.description}</p>
        </div>
      </div>
    </>
  );
};

export default Decor;
