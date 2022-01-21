import Link from "next/link";
import React, { useEffect, useState } from "react";
import Product from "../Common/Product";

const ListProducts = ({ data, products }) => {
  const [collection, setCollection] = useState("");
  let {
    isShowTitle,
    collections,
    tags,
    name,
    max_colum,
    max_content,
    products: listProducts,
  } = data;
  let typeGroup = "";
  if (collections?.length) typeGroup = "collections";
  if (tags?.length) typeGroup = "tags";
  const listCategories = collections?.length ? collections : tags;
  useEffect(() => {
    if (listCategories?.[0]?.id) setCollection(listCategories?.[0]?.id);
  }, []);
  const classCol = {
    5: "w-1/2 sm:w-4/12 md:w-1/4 xl:w-1/5",
    4: "w-1/2 sm:w-1/2 md:w-4/12 xl:w-1/4",
    3: "w-1/2 sm:w-1/2 md:w-4/12",
    2: "w-1/2 sm:w-1/2",
    1: "w-1/2",
  };
  return (
    <div className="my-12 container mx-auto">
      {isShowTitle && (
        <h1 className="font-bold text-2xl px-3 text-center">{name}</h1>
      )}
      <div className="flex justify-center mt-5 flex-wrap">
        {listCategories?.map((d, i) => {
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
        {listProducts?.map((item, index) => {
          return index >= max_content ? (
            ""
          ) : (
            <div
              className={`${classCol[max_colum]} py-6 px-1 md:px-5 toTop`}
              key={index}
            >
              <Product data={item} />
            </div>
          );
        })}
        {listCategories?.map((d, i) => {
          return d?.products?.map((item, index) => {
            const product = products[item];
            return index >= max_content ? (
              ""
            ) : (
              <div
                className={`${classCol[max_colum]} py-6 px-1 md:px-5 toTop ${
                  d.id === collection ? "" : "hidden"
                }`}
                key={index}
              >
                <Product data={product} />
              </div>
            );
          });
        })}
      </div>
      {!typeGroup?"":<div className="flex justify-center">
        <Link href={`/${typeGroup}/${collection}`}>
          <button className="bg-black text-white mt-5 py-2 px-5 border relative after:absolute after:bg-white after:top-0 after:bottom-0 after:left-auto after:right-0 after:w-0 duration-500 after:duration-500 hover:after:w-full hover:text-black hover:after:right-auto hover:after:left-0">
            <span className="z-10 relative">Xem thêm</span>
          </button>
        </Link>
      </div>}
    </div>
  );
};

export default ListProducts;
