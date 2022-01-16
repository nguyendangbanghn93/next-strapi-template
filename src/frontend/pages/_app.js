import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/material.css";
import "../styles/globals.css";
import "../styles/slick.css";
import "../styles/slick-theme.css";
// const global = useGlobal();

import App from "next/app";
import Head from "next/head";
import { createContext, useContext } from "react";
import { getStrapiMedia } from "../lib/media";
import { fetchApi } from "../lib/api";
import { getListProducts } from "../services/productService";
export const GlobalContext = createContext({});
export const useGlobal = () => useContext(GlobalContext);
const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={getStrapiMedia(global.favicon)} />
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  let { data: global } = await fetchApi.get("/global");
  const { data: homepage } = await fetchApi.get("/home-page");
  const dataProducts = {};
  let products = [];
  homepage?.block?.map((d) => {
    d?.collections?.map((c, i) => {
      c?.products && (products = [...products, ...c?.products]);
      return true;
    });
    d?.tags?.map((t, i) => {
      t?.products && (products = [...products, ...t?.products]);
      return true;
    });
    d?.products?.map((p, i) => {
      dataProducts[p.id] = p;
      return true;
    });
  });
  // const { data } = await getListProducts({ id: products });


  // const collections = [];
  // const tags = [];

  // const {data} = await
  global.homepage = homepage;
  return { ...appProps, pageProps: { global: global } };
};

export default MyApp;
