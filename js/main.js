import { MyParser } from "./MyParser.js";
import { Tester } from "./module/Tester/Tester.js";

let obj = {"name":"ピカチュウ","type1":"でんき","type2":"NA"}
let p = new MyParser();
let tester = new Tester();

const data = [
	[obj, "type1=でんき", true],
	[obj, "type1 = みず", false],
	[obj, "type1!=でんき", false],
	[obj, "type1 != みず", true],
	[obj, "type1 = みず or type1 = でんき", true],
	[obj, "type1 = みず and type1 = でんき", false],
	[obj, "type1 = みず and type1 = でんき or type2=NA", true],
	[obj, "type1 = みず and (type1 = でんき or type2=NA)",false]
]
tester.testAll(p.exec, data);
