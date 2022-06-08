"use strict";

const { response } = require("../../common/response");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async addLog(ctx, next) {
    try {
      const { body, files } = ctx.request;
      const data = await strapi.services.bmi.addLog(body, files.image);
      return response.ok(ctx, data);
    } catch (err) {
      return response.error(ctx, err.message);
    }
  },

  async listLog(ctx, next) {
    try {
      const { body } = ctx.request;
      const data = await strapi.services.bmi.listLog(body);
      return response.ok(ctx, data);
    } catch (err) {
      return response.error(ctx, err.message);
    }
  },

  async deleteLog(ctx, next) {
    try {
      const { body } = ctx.request;
      const data = await strapi.services["bmi-stat"].delete({
        _id: body.logId,
      });
      return response.ok(ctx, data);
    } catch (err) {
      return response.error(ctx, err.message);
    }
  },
};
