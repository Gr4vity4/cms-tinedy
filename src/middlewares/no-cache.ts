export default () => {
  return async (ctx, next) => {
    await next();
    ctx.set("Cache-Control", "no-store");
    ctx.set("Pragma", "no-cache");
    ctx.set("Expires", "0");
  };
};
