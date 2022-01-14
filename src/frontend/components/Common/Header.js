import React from "react";
import { useGlobal } from "../../pages/_app";
import Link from "next/link";
import { iSlug, isValid } from "../../lib";
const Header = () => {
  const { homepage } = useGlobal();
  return (
    <>
      <div className="text-center Header p-3 bg-gray-200">Sale upto 50%</div>
      <div className="sticky top-0 left-0 right-0 border-b w-full">
        <div className="container mx-auto">
          <div className="text-center relative font-mono">
            <div className="absolute top-0 bottom-0 left-0 flex items-center">
              <i className="material-icons ml-3 md:hidden">menu</i>
            </div>
            <Link href="/">
              <h1 className="font-serif uppercase p-3 text-xl cursor-pointer">
                E-Commerce
              </h1>
            </Link>
            <div className="absolute top-0 bottom-0 right-0 flex items-center">
              <div className="ml-3 cursor-pointer hover:underline">
                <p className=" hidden md:block">Tìm kiếm</p>
                <i className="material-icons md:hidden">search</i>
              </div>
              <div className="ml-3 cursor-pointer hover:underline">
                <p className=" hidden md:block">Giỏ hàng</p>
                <i className="material-icons md:hidden">shopping_cart</i>
              </div>
            </div>
          </div>
          <div className="justify-center hidden md:flex">
            {homepage?.menu?.map((v, i) => {
              let path = "";
              isValid(v.tag, () => {
                path = "tag/" + iSlug(v.name, v.tag.id);
              });
              isValid(v.collections, () => {
                path = "collections/" + iSlug(v.name, v.collections.id);
              });
              isValid(v.path, () => {
                path = v.path;
              });
              return (
                <Link href={`/${path}`} onClick={() => console.log(v)} key={i}>
                  <p className="px-2 md:px-4 py-3 font-mono cursor-pointer relative nav-menu-item">
                    {v.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
