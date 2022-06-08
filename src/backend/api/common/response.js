module.exports.response = {
  ok(ctx, data, o) {
    const options = {
      status: 200,
      success: true,
      message: "Success",
    };
    if (typeof o === "object") {
      options = Object.assign(options, o);
    } else if (o) {
      options.message = o;
    }
    options.data = data;
    ctx.status = options.status;
    ctx.response.body = options;
    return ctx;
  },
  error(ctx, o) {
    const options = {
      status: 400,
      success: false,
      message: "Error",
    };
    if (typeof o === "object") {
      options = Object.assign(options, o);
    } else if (o) {
      options.message = o;
    }
    ctx.status = options.status;
    ctx.response.body = options;
    if (options.code) ctx.response.body.code = options.code;
    if (options.data) ctx.response.body.data = options.data;
    return ctx;
  },
};
