import "./add.css";
const add = {
  init() {
    console.log("add组件对应的入口文件");
    xtag.create('x-add', class extends XTagElement {
      constructor(){
        super();
        console.log("初始化操作");
        this.datas={
          user:"gaoyijian"
        }
      }
      '::template(true)' (){
        return `<form class="add">
        <label>书名</label>
        <input type="text" name="name" id="username">
        <label>作者</label>
        <input type="text" name="author" id="userauthor">
        <label>类型</label>
        <input type="text" name="type" id="usertype">
        <button type="button"  id="add-btn"  class="btn btn-primary">测试</button>
    </form>`
      }
      "click::event"(e){
        if(e.target.id=="add-btn"){
          console.log(this.datas);
        }
      }
    });
  }
}
export default add;