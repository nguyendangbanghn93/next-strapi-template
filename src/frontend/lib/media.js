import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  let imageUrl = "";
  if (typeof media === "object") {
    imageUrl = media?.url?.startsWith("/")
      ? getStrapiURL(media?.url)
      : media?.url;
  }
  if (typeof media === "string") {
    imageUrl = media?.startsWith("/") ? getStrapiURL(media) : media;
  }
  return imageUrl;
}
