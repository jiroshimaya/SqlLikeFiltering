import { MyLang } from "./MyLang.js";

let obj = {"name":"ピカチュウ","type1":"でんき","type2":"NA"}
let m = new MyLang();
console.log(m.exec(obj, "type1 = でんき or type2 != NA"));