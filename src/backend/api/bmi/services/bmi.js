// "use strict";
const _ = require("lodash");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
module.exports = {
  async addLog(createBmiDto, image) {
    const Bmi = strapi.query("bmi").model;
    const BmiStat = strapi.query("bmi-stat").model;
    const fileResponse = await strapi.services.s3.upload(image);

    let bmi = await Bmi.findOne({ uid: createBmiDto.uid });

    if (!bmi) {
      bmi = new Bmi();
      bmi.uid = createBmiDto.uid;
    }
    await bmi.save();

    const bmiStat = new BmiStat();

    bmiStat.weight = createBmiDto.weight;
    bmiStat.height = createBmiDto.height;
    bmiStat.logDate = createBmiDto.logDate;
    bmiStat.uid = createBmiDto.uid;
    bmiStat.uBmi = bmi._id;
    bmiStat.img = _.get(fileResponse, "img");
    bmiStat.thumb = _.get(fileResponse, "thumb");
    await bmiStat.save();
    return bmiStat;
  },

  async listLog(getBmiDto) {
    const match = {};
    const limit = {};
    if (getBmiDto.from || getBmiDto.to) {
      match.match = {};
      match.match.logDate = {};
      getBmiDto.from && (match.match.logDate.$gte = getBmiDto.from);
      getBmiDto.to && (match.match.logDate.$lte = getBmiDto.to);
    }

    if (getBmiDto.limit) {
      limit.limit = getBmiDto.limit;
    }
    const bmi = await strapi
      .query("bmi")
      .model.findOne(
        {
          uid: getBmiDto.uid,
        },
        null,
        { delete: true }
      )
      .populate({
        path: "bmi",
        options: {
          ...limit,
          sort: { logDate: getBmiDto.revert ? 1 : -1 },
        },
        ...match,
      });

    return bmi;
  },
};
