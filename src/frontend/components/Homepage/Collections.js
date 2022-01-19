import React, { useEffect, useState } from "react";
import Product from "./Product";

const Collections = ({ data, products }) => {
  const [collection, setCollection] = useState("");
  let { isShowTitle, collections,tags, name, max_colum, max_content } = data;
  const listProducts = collections?.length?collections:tags
  useEffect(() => {
    if (listProducts?.[0]?.id) setCollection(listProducts?.[0]?.id);
  }, []);
  const classCol = {
    5: "w-full sm:w-4/12 md:w-1/4 xl:w-1/5",
    4: "w-full sm:w-1/2 md:w-4/12 xl:w-1/4",
    3: "w-full sm:w-1/2 md:w-4/12",
    2: "w-full sm:w-1/2",
    1: "w-full sm:w-1/2",
  };
  return (
    <div className="my-12 container mx-auto">
      {isShowTitle && (
        <h1 className="font-bold text-2xl px-3 text-center">{name}</h1>
      )}
      <div className="flex justify-center mt-5 flex-wrap">
        {listProducts?.map((d, i) => {
          return (
            <div key={i}>
              <input
                type="radio"
                id={d.id}
                name={data?.id}
                value={d.id}
                checked={d.id === collection}
                // defaultChecked={i === 0}
                className="h-underline"
                onChange={() => setCollection(d.id)}
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
        {listProducts?.map((d, i) => {
          return d?.products?.map((item, index) => {
            const product = products[item];
            return index >= max_content ? (
              ""
            ) : (
              <div className={`${classCol[max_colum]} py-6 px-1 md:px-5 toTop ${d.id===collection?"":"hidden"}`} key={index}>
                <Product data={product} />
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Collections;
