import Head from "next/head";
import Image from "next/image";
import Header from "../components/Common/Header";
import Seo from "../components/Common/Seo";
import Banner from "../components/Common/Banner";
import styles from "../styles/Home.module.css";
import { useGlobal } from "./_app";

export default function Home() {
  const global = useGlobal();
  
  return (
    <>
      <Seo />
      <Header />
      <Banner data={global?.homepage?.banner} />
    </>
  );
}
