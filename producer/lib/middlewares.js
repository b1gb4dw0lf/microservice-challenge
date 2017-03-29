
module.exports = async (ctx, next) => {
  try {
    let isAuthenticated = await ctx.isAuthenticated();
    if (isAuthenticated) {
      return next();
    } else {
      ctx.throw(401);
    }
  } catch (err) {
    console.log(err);
    ctx.throw(401);
  }
}
