const Index=require("../models/Index");
import cheerio from "cheerio";
const {
    URLSearchParams
} = require("url");
class IndexController{
    constructor(){}
    actionIndex() {
        return async (ctx, next) => {
            // ctx.body = 'hello'
            const index = new Index();
            const result = await index.getData();
            const html=await ctx.render("books/pages/list", {
                data: result.data
            });
            //SSR
            if(ctx.request.header["x-pjax"]){
                console.log("☀️点击！")
                const $=cheerio.load(html);
                ctx.body = $("#js-hooks-data").html();
            }else{
                console.log("🌙刷新！")
                ctx.body = html
            }
        };
    }
    actionAdd() {
        return async (ctx, next) => {
            const html=await ctx.render("books/pages/add");
            const $=cheerio.load(html);
            if(ctx.request.header["x-pjax"]){
                let _result = "<x-add></x-add>";
                $(".layload-js").each(function () {
                    _result +=  `<script src="${$(this).attr("src")}"></script>`;
                })
                $(".layload-css").each(function () {
                    _result += `<link rel="stylesheet" href="${$(this).attr("href")}">`
                })
                ctx.body = _result;
            }else{
                console.log("🌙刷新！");
                ctx.body = html;
            }
        };
    }
    actionSave() {
        return async (ctx, next) => {
            const index = new Index();
            const params = new URLSearchParams();
            params.append("Library[name]", "测试");
            params.append("Library[author]", "测试111");
            params.append("Library[type]", "测试111");
            const result = await index.saveData({
                params
            });
            console.log(result);
            ctx.body = result;
        };
    }
}
module.exports = IndexController;