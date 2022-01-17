import React, { useEffect } from "react";
import { fixDinary } from "../../lib";
import { getListProducts } from "../../services/productService";
import Img from "../Common/Img";

const Collections = ({ data }) => {
  const { isShowTitle, collections, name, max_colum, max_content } = data;
  return (
    <div className="my-12 container mx-auto">
      {isShowTitle && (
        <h1 className="font-bold text-2xl px-3 text-center">{name}</h1>
      )}
      <div className="flex justify-center mt-5 flex-wrap">
        {collections?.map((d, i) => {
          return (
            <div key={i}>
              <input
                type="radio"
                id={d.id}
                name={data?.id}
                value={d.id}
                defaultChecked={i === 0}
                className="h-underline"
              />
              <label
                className="font-mono mx-3 h-underline active"
                htmlFor={d.id}
              >
                {d.name}
              </label>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap mt-5">
        {collections?.map((d, i) => {
          console.log(d);
          return (
            <div key={i} className="w-1/4 break-words">
              {fixDinary(d?.thumbnail?.url)}
              <Img src={fixDinary(d?.thumbnail?.url)} className="ar169" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
