"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const _ = require("lodash");
module.exports = {
  Classify: {
    NORMAL: "NORMAL",
    FOLLOW: "FOLLOW",
    EXAMINATION: "EXAMINATION",
  },
  async addLog(addMilestoneLogDto = {}) {
    try {
      const existsLog = await strapi.services["milestone-log"].findOne({
        uid: String(addMilestoneLogDto.uid),
        stage: addMilestoneLogDto.stageId,
      });

      const stage = await strapi
        .query("stage")
        .findOne({ _id: addMilestoneLogDto.stageId });
      const addMilestoneResult = [];
      // const stage = await this.stageModel.findById(addMilestoneLogDto.stageId);
      const pointByTypes = addMilestoneLogDto.results.reduce((result, data) => {
        addMilestoneResult.push({
          type: data.questionTypeId,
          point: data.point,
          question: data.questionId,
        });
        result[data.questionTypeId] =
          (result[data.questionTypeId] || 0) + data.point;
        return result;
      }, {});
      const pointOfTypes = _.get(stage, "evaluates", {}).reduce(
        (result, data) => {
          result[data.type._id] = [data.markOne, data.markTwo];
          return result;
        },
        {}
      );
      // type: { type: Types.ObjectId, ref: 'QuestionType' },
      //     point: { type: Number, enum: Point },
      //     classify: { type: Number, enum: Classify },
      const summaries = Object.keys(pointByTypes || []).map((typeId) => {
        let classify;
        const point = pointByTypes[typeId];
        const rangePoint = pointOfTypes[typeId];

        if (point < rangePoint[0]) {
          classify = this.Classify.EXAMINATION;
        } else if (point > rangePoint[1]) {
          classify = this.Classify.FOLLOW;
        } else if (point >= rangePoint[0] && point <= rangePoint[1]) {
          classify = this.Classify.NORMAL;
        }
        return {
          type: typeId,
          point: point,
          classify: classify,
        };
      });
      const obj = {
        EXAMINATION: 3,
        FOLLOW: 2,
        NORMAL: 1,
      };
      const objReverse = {
        3: "EXAMINATION",
        2: "FOLLOW",
        1: "NORMAL",
      };
      let classifyLog = 1;
      (summaries || []).map((s) => {
        classifyLog =
          classifyLog < obj[s.classify] ? obj[s.classify] : classifyLog;
      });
      classifyLog = objReverse[classifyLog];
      const content = await strapi.services["content"].findOne({
        classify: classifyLog,
      });
      addMilestoneLogDto.uid = String(addMilestoneLogDto.uid);
      addMilestoneLogDto.classify = classifyLog;
      addMilestoneLogDto.summaries = summaries;
      addMilestoneLogDto.results = addMilestoneResult;
      addMilestoneLogDto.stage = addMilestoneLogDto.stageId;
      addMilestoneLogDto.content = content._id;
      delete addMilestoneLogDto.stageId;

      let result;
      if (existsLog) {
        result = await strapi.services["milestone-log"].update(
          {
            _id: existsLog._id,
          },
          addMilestoneLogDto
        );
      } else {
        result = await strapi.services["milestone-log"].create(
          addMilestoneLogDto
        );
      }
      return result;
    } catch (error) {
      console.log(error);

      return error;
    }
  },
};
