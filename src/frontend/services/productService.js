import { fetchApi } from "../lib/api";

export const getListProducts = async (o) => {
  try {
    const { data } = await fetchApi(`/products`, { params: o });
    return data;
  } catch (error) {
    console.log(error);
  }
};
