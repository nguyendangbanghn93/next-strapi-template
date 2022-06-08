"use strict";

const { response } = require("../../common/response");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async getList(ctx, next) {
    try {
      const { body } = ctx.request;
      const data = await strapi.services["question-type"].getList(body);
      return response.ok(ctx, data);
    } catch (err) {
      return response.error(ctx, err.message);
    }
  },
};
