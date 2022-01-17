import Header from "../components/Common/Header";
import Seo from "../components/Common/Seo";
import Slider from "../components/Common/Slider";
import Collections from "../components/Homepage/Collections";
import { fetchApi } from "../lib/api";
import { useGlobal } from "./_app";

export default function Home({ body, products }) {
  const global = useGlobal();
  console.log("_______________________________________________", body);

  // console.log("____________________",global.homepage.data[0],global.homepage.data[0].block[0].collections[0].products);

  return (
    <>
      <Seo />
      <Header />
      {!body?.banner?.length ? (
        ""
      ) : (
        <Slider
          data={body?.banner}
          wClass="relative h-500px md:h-700px flex flex-wrap"
        />
      )}
      {!body?.block?.length
        ? ""
        : body?.block?.map((d, i) => {
            if (d?.collections?.length)
              return <Collections data={d} key={i} products={products} />;
          })}
    </>
  );
}
export async function getStaticProps() {
  const { data } = await fetchApi.get("/home-page/body");
  return { props: { body: data?.homepage, products: data?.products } };
}
