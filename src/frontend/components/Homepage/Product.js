import Link from "next/link";
import React from "react";
import { iMoney, iSlug } from "../../lib";
import Img from "../Common/Img";
const Tag = ({ tag }) => {
  return (
    <div
      onClick={() => console.log(tag)}
      className="  font-semibold rounded-sm"
    >
      {tag.name}
    </div>
  );
};
const Product = ({ data }) => {
  return (
    <Link href={`/products/${iSlug(data?.name, data?.id)}`}>
      <div className="relative drop-shadow" onClick={() => console.log(data)}>
        <Img src={data?.thumbnail?.url} addClass="ar34"/>
        <div className="absolute top-0 left-0 p-3">
          {data?.tags?.map((d, i) => d?.isShowBadge && <Tag key={i} tag={d} />)}
        </div>
        <p className="font-mono mt-7 text-center">{data?.name}</p>
        {!data?.sale_price ? (
          <div className="text-center text-xs">{iMoney(data?.price, " ₫")}</div>
        ) : (
          <div className="text-center">
            <p className="text-center text-xs inline-block line-through">
              {iMoney(data?.price, " ₫")}
            </p>
            {" - "}
            <p className="text-center text-xs inline-block text-rose-500">
              {iMoney(data?.sale_price, " ₫")}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Product;
