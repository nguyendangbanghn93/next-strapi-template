"use strict";

const { language } = require("../../common/language");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async listStages(getStageDto) {
    const result = await strapi.query("stage").model.find({});
    return (result || []).map((r) => {
      const o = r.toJSON();
      delete o.evaluates;
      delete o.created_by;
      delete o.updated_by;
      delete o.createdAt;
      delete o.updatedAt;
      delete o.localizations;
      delete o.__v;
      delete o.id;
      return o;
    });
  },
};
