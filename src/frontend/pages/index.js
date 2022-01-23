import Header from "../components/Common/Header";
import Seo from "../components/Common/Seo";
import SSlider from "../components/Common/SSlider";
import ListProducts from "../components/Homepage/ListProducts";
import Decor from "../components/Homepage/Decor";
import { fetchApi } from "../lib/api";
import ProductDetail from "../components/Common/ProductDetail";
import { memo, useCallback } from "react";
const Block = memo(({ data, products }) => {
  return (
    <div className="my-24">
      {data.isShowTitle && (
        <h1 className="font-bold text-2xl px-3 text-center mb-12">
          {data.name}
        </h1>
      )}
      {(() => {
        if (
          data?.collections?.length ||
          data?.tags?.length ||
          data?.products?.length
        )
          return (
            <ListProducts data={data} products={products} wClass="container" />
          );
        if (data?.decor && Object.keys(data?.decor)?.length) {
          return <Decor data={data} />;
        } else if (data?.slider?.length) {
          return (
            <SSlider
              lineClampText="line-clamp-5"
              data={data?.slider}
              wClass="relative h-500px md:h-700px flex flex-wrap"
              dotsClass="!flex justify-center"
              autoplaySpeed={3000}
              customPaging={(i) => {
                return (
                  <div className="whitespace-nowrap mx-5 mt-5 dot-custom">
                    {data?.slider?.[i]?.dot || "."}
                  </div>
                );
              }}
            />
          );
        } else if (data?.featured_products?.length) {
          return (
            <ProductDetail
              data={data?.featured_products}
              configs={data}
              cClass="container"
            />
          );
        }
      })()}
    </div>
  );
});
export default function Home({ body, products }) {
  return (
    <>
      <Seo />
      <Header />
      {!body?.banner?.length ? (
        ""
      ) : (
        <SSlider
          data={body?.banner}
          wClass="relative h-500px md:h-700px flex flex-wrap"
        />
      )}
      {!body?.block?.length
        ? ""
        : body?.block?.map((d, i) => {
            return <Block data={d} products={products} />;
          })}
    </>
  );
}
export async function getStaticProps() {
  const { data } = await fetchApi.get("/home-page/body");
  return { props: { body: data?.homepage, products: data?.products } };
}
