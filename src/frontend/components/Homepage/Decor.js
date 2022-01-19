import React from "react";
import { fixDinary } from "../../lib";

const Decor = ({ data }) => {
  const { decor } = data;
  console.log("decor___", data, data?.image);

  return (
    <>
    123
      <div
        className={`bg-no-repeat bg-center bg-cover ${decor?.fixed?"bg-fixed":""}`}
        style={{ backgroundImage: `url("${fixDinary(decor?.image)}")`,aspectRatio:decor?.aspect_ratio}}
      ></div>
    </>
  );
};

export default Decor;
