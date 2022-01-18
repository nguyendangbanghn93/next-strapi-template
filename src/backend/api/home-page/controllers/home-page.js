"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // async find(ctx) {
  //   const data = await strapi
  //     .query("home-page")
  //     .model.find(ctx.query,["block"])

  //   return { data };
  // },

  async findHeader(ctx) {
    const [data] = await strapi
      .query("home-page")
      .model.find(ctx.query)
      .select(
        "-block -banner -published_at -createdAt -updatedAt -__v -created_by -updated_by -blocks -_id -id"
      );
      
    return data;
  },
  async findBody(ctx) {
    const [data] = await strapi
      .query("home-page")
      .model.find(ctx.query)
      // .select({ block: 1, banner: 1 });
      .select(
        "-menu -top -published_at -createdAt -updatedAt -__v -created_by -updated_by -blocks -_id -id"
      );
    let products = [];
    const dataProducts = {};
    data?.block?.map((b) => {
      (b?.ref?.collections?.length ? b?.ref?.collections : b.ref?.tags)?.map(
        (c) => {
          products = [
            ...products,
            ...c?.products?.slice(0, b?.ref?.max_content),
          ];
        }
      );
    });
    const res = await strapi.query("product").find({ id: { $in: products } });
    res?.map((r) => {
      dataProducts[r.id] = r;
    });
    data?.block?.map((b) => {
      (b?.ref?.collections?.length ? b?.ref?.collections : b.ref?.tags)?.map(
        (c) => {
          c.products = c?.products
            ?.slice(0, b?.ref?.max_content)
            ?.map((p) => dataProducts[p]);
        }
      );
    });
    return { homepage: data, products: dataProducts };
  },
};
