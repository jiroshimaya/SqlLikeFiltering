import { MyLang } from "./MyLang.js";
//import { Tester } from "./TesterClass.js";
import { Tester } from "./module/Tester/Tester.js";

let obj = {"name":"ピカチュウ","type1":"でんき","type2":"NA"}
let m = new MyLang();
let tester = new Tester();

const data = [
	[obj, "type1 = でんき", true],
	[obj, "type1 = みず", false],
	[obj, "(type1 = みず or type1 = でんき)", true],
	[obj, "type1 = でんき and type1 = みず or type2=NA", true]
]
tester.testAll(m.exec, data);
