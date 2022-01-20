import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/material.css";
import "../styles/globals.css";
// const global = useGlobal();
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  const { data: header } = await fetchApi.get("/home-page/header");
  global.header = header;
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
