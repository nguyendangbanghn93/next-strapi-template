export const iSlug = (str = "", addString) => {
  try {
    str = String(str);
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");
    str = str.replace(/([^0-9a-z-\s])/g, "");
    str = str.replace(/(\s+)/g, "-");
    str = str.replace(/^-+/g, "");
    str = str.replace(/-+$/g, "");
    str = str.replace(/-+/g, "-");
    return `${str}${addString ? "." + addString : ""}.html`;
  } catch (error) {}
};
export const slugToId = (slug = "") => {
  return [...String(slug).matchAll(/.+?\.(\d+?)\.html/gi)]?.[0]?.[1];
};
export const isValid = (value, fn) => {
  try {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === false ||
      (typeof value === "object" && Object.keys(value).length <= 0) ||
      (typeof value === "number" && value === 0)
    )
      return false;
    if (typeof fn === "function") fn();
    return true;
  } catch (error) {}
};
export const fixDinary = (url, o) => {
  if (typeof url === "object") url = url?.url;
  if (url?.includes("res.cloudinary.com/nguyendangbang/image/upload/") && o) {
    let str = "c_fill";
    if (o.mode) str = o.mode;
    if (o.h) str = str + ",h_" + o.h;
    if (o.w) str = str + ",w_" + o.w;
    return url?.replace(
      "res.cloudinary.com/nguyendangbang/image/upload/",
      "res.cloudinary.com/nguyendangbang/image/upload/" + str + "/"
    );
  }
  return url;
};
export const iMoney = (n,a) => {
  if (n) {
    n = Number(n) + "";
    var x = n.split("."),
      y = x[0],
      z = x.length > 1 ? "." + x[1] : "",
      r = /(\d+)(\d{3})/;
    while (r.test(y)) {
      y = y.replace(r, "$1" + "," + "$2");
    }
    return `${y + z}${a||""}`;
  } else {
    return `0${a||""}`;
  }
};
