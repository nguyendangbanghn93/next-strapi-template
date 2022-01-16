import Header from "../components/Common/Header";
import Seo from "../components/Common/Seo";
import Slider from "../components/Common/Slider";
import Collections from "../components/Homepage/Collections";
import { useGlobal } from "./_app";

export default function Home() {
  const global = useGlobal();
  // console.log("____________________",global.homepage);
  
  return (
    <>
      <Seo />
      <Header />
      {!global?.homepage?.banner?.length ? (
        ""
      ) : (
        <Slider
          data={global?.homepage?.banner}
          wClass="relative h-500px md:h-700px flex flex-wrap"
        />
      )}
      {!global?.homepage?.block?.length
        ? ""
        : global?.homepage?.block?.map((d, i) => {
            if (d?.collections) return <Collections data={d} key={i} />;
          })}
    </>
  );
}
