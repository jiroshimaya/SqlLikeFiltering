import { Tester } from "./Tester.js";

//可変長引数の関数
function sum(){
	const args = [].slice.call(arguments);
	let cnt = 0;
	for(let v of args)cnt += v;
	return cnt;
}

//リストやオブジェクトを返す
function getList(x){
	return [x,2,3];
}
let tester = new Tester();

tester.testAll(sum, [
	[1,2,3],//OK
	[1,2,4],//FAIL
	[1,1],//OK
	[0]//OK（引数ゼロの場合
]);

tester.testAll(getList, [
	[1, [1,2,3]],
	[[1,2],[[1,2],2,3]],
	[{a:3},[{a:3},2,3]],
	[{a:3},[{b:3},2,3]]
]);