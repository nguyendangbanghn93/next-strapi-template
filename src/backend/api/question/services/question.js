"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const _ = require("lodash");
module.exports = {
  async getListByAge(condition) {
    const questionModel = strapi.query("question").model;
    const stageModel = strapi.query("stage").model;
    console.log({ questionModel, stageModel });

    let stageId;
    let result;
    if (condition.age) {
      const stage = await stageModel.findOne({
        age: condition.age,
      });

      stageId = _.get(stage, "_id", "");
    } else {
      stageId = condition.stageId;
    }

    const questions = await questionModel
      .find({
        stages: stageId.toString(),
      })
      .populate("types");

    if (condition.group) {
      result = (questions || []).reduce((res, data) => {
        _.get(data, "types", []).map((type) => {
          if (!res[type.code]) res[type.code] = [];
          const obj = data.toJSON();
          delete obj.types;
          delete obj.stages;
          delete obj.localizations;
          delete obj.createdAt;
          delete obj.updatedAt;
          delete obj.created_by;
          delete obj.updated_by;
          delete obj.id;
          delete obj.__v;
          obj.type = type._id;
          obj.stage = stageId;
          res[type.code].push(obj);
        });
        return res;
      }, {});
    } else {
      result = (questions || []).map((entity) => {
        const obj = entity.toJSON();
        delete obj.stages;
        delete obj.localizations;
        delete obj.createdAt;
        delete obj.updatedAt;
        delete obj.__v;
        delete obj.created_by;
        delete obj.updated_by;
        delete obj.id;
        obj.types = (obj.types || []).map((t) => t._id);
        return obj;
      });
    }
    return result;
  },
};
