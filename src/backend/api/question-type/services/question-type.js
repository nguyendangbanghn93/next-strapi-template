"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
module.exports = {
  async getList(condition = {}) {
    const result = await strapi.query("question-type").model.find(condition);
    return (result || []).map((r) => {
      const o = r.toJSON();
      delete o.questions;
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
