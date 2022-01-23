import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import { fixDinary } from "../../lib/index";
import { useGlobal } from "../../pages/_app";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Img = function ({
  src: srcOrg,
  srcDefault,
  className,
  addClass,
  showDefault = true,
  mode = "c_mfit",
  skeleton=true,
  ...rest
}) {
  const [loading, setLoading] = useState(true);
  const global = useGlobal();
  const wrap = useRef(null);

  // useEffect(() => {
  //   if (wrap.current.offsetWidth) {
  //     setSize({
  //       with: wrap.current.offsetWidth,
  //       height: wrap.current.offsetHeight,
  //     });
  //   }
  // }, []);
  const src = getStrapiMedia(srcOrg);
  srcDefault = srcDefault || getStrapiMedia(global.favicon);
  const contentfulLoader = ({ src, quality, width }) => {
    return fixDinary(src, {
      w:
        wrap?.current?.offsetWidth < width ? wrap?.current?.offsetWidth : width,
      h: wrap?.current?.offsetHeight,
      mode: mode,
    });
  };
  if (showDefault || src?.length)
    return (
      <div
        className={className || `relative w-full h-full ${addClass}`}
        ref={wrap}
      >
        {!loading ? "" : skeleton&&<Skeleton className="w-full h-full" />}
        <Image
          src={src || srcDefault}
          loader={contentfulLoader}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          // blurDataURL={src || srcDefault}
          // placeholder="blur"
          onLoad={() => setLoading(false)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/image_default.png";
            e.target.srcset = "/images/image_default.png 1x";
          }}
          {...rest}
        />
      </div>
    );
  return "";
};

export default Img;
