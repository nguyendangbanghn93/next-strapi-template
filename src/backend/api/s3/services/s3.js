"use strict";

/**
 * `s3` service.
 */
const { S3 } = require("aws-sdk");
const fs = require("fs");
const _ = require("lodash");
module.exports = {
  s3: new S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  }),
  async upload(file) {
    const buffer = await fs.readFileSync(file.path);
    const now = Date.now();

    const res = await this.s3
      .upload({
        Bucket: process.env.S3_BUCKET,
        Key: this.fileName({ time: now, name: file.name }),
        Body: buffer,
        ACL: "public-read",
        ContentType: _.get(file, "type"),
        Metadata: { fieldName: _.get(file, "name") },
      })
      .promise();
    res.img = this.fileName({ time: now, name: file.name, cdn: true });
    res.thumb = this.fileName({
      time: now,
      name: file.name,
      cdn: true,
      size: "100x100",
    });
    return res;
  },
  fileName(obj = {}) {
    try {
      const { size, time, name, cdn } = obj;

      let filename = `${process.env.NODE_ENV}/uploads/`;
      if (size) filename = filename + size + "/";
      filename = filename + (time || Date.now()) + "_" + name;
      if (cdn) filename = process.env.S3_CDN + "/" + filename;
      return filename;
    } catch (error) {
      console.log("error__________:", error);
    }
  },
};
