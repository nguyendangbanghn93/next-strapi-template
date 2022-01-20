import Header from "../components/Common/Header";
import Seo from "../components/Common/Seo";
import Slider from "../components/Common/Slider";
import ListProducts from "../components/Homepage/ListProducts";
import Decor from "../components/Homepage/Decor";
import { fetchApi } from "../lib/api";
import ProductDetail from "../components/Common/ProductDetail";

export default function Home({ body, products }) {
  console.log(body?.block);

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
            if (
              d?.collections?.length ||
              d?.tags?.length ||
              d?.products?.length
            )
              return <ListProducts data={d} key={i} products={products} />;
            if (d?.decor) {
              return <Decor data={d} key={i} />;
            }
            if (d?.slider?.length) {
              return (
                <Slider
                  lineClampText="line-clamp-5"
                  data={d?.slider}
                  wClass="relative h-500px md:h-700px flex flex-wrap"
                  key={i}
                />
              );
            }
            if (d?.featured_products?.length) {
              return (
                <ProductDetail data={d?.featured_products} configs={d} key={i}/>
             
              );
            }
          })}
    </>
  );
}
export async function getStaticProps() {
  const { data } = await fetchApi.get("/home-page/body");
  return { props: { body: data?.homepage, products: data?.products } };
}
