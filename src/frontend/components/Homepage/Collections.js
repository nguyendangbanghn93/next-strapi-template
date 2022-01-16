import React, { useEffect } from "react";
import { getListProducts } from "../../services/productService";

const Collections = ({ data }) => {
  const { isShowTitle, collections, name } = data;
  console.log(collections);
  // useEffect(async () => {
  //   const products = await Promise.all(
  //     collections?.map((d) => getListProducts({ collections: d.id,_start:0,_limit:3 }))
  //   );
  // }, []);

  return (
    <div className="my-12">
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
              <label className="font-mono mx-3 h-underline active" for={d.id}>
                {d.name}
              </label>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap mt-5">
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
              <label className="font-mono mx-3 h-underline active" for={d.id}>
                {d.name}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
