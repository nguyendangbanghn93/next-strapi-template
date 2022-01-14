import ImageNext from "next/image";
import { getStrapiMedia } from "../../lib/media";
import { useGlobal } from "../../pages/_app";

const Img = ({ src: srcOrg, srcDefault, showDefault = true, ...rest }) => {
  const global = useGlobal();
  const src = getStrapiMedia(srcOrg);
  srcDefault = srcDefault || getStrapiMedia(global.favicon);
  const contentfulLoader = ({ src, quality, width }) => {
    const params = [`w=${width}`];

    if (quality) {
      params.push(`q=${quality}`);
    }

    return `${src}?${params.join("&")}`;
  };
  if (showDefault || src)
    return (
      <ImageNext
        src={src || srcDefault}
        loader={contentfulLoader}
        layout="fill"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/image_default.png";
          e.target.srcset = "/images/image_default.png 1x";
        }}
        {...rest}
      />
    );
  return "";
};

export default Img;
