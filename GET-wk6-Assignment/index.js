const Koa = require("koa");
const KoaBodyParser = require('koa-bodyparser');
const db = require('./database/dbfunctions');
const app = new Koa();

const port = 3000;


app.use(KoaBodyParser());

app.use(async ctx=>{
    const movieTitle = await ctx.request.body.title;
    const result = await db.selectMovie(movieTitle);
    ctx.body = result;
});

//app.listen(port, ()=>{
//    console.log(`the app is up and running on port ${port}`)
//});
module.exports = app.callback();