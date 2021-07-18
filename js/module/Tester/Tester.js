function Tester(){
	const _this = {}

	_this.exec = function(_func, _args, _expected){
		const _arguments = [].slice.call(arguments);
		
		const func = _arguments[0];
		const args = _arguments.slice(1, -1);
		const expected = _arguments[_arguments.length-1];
		
		const value = func(...args);
		//console.log(value, args,expected);
		if(_this.isSame(value, expected)){
			return true;
		}
		else{
			return false;
		}
	}
	
	_this.testAll = function(func, data){
		let ok = true;
		for(let d of data){
			const args = d.slice(0,-1);
			const value = func(...args);
			const expected = d[d.length-1];
			
			if(_this.isSame(value, expected)){
				console.log("OK: args=",JSON.stringify(args), JSON.stringify(value), "=",JSON.stringify(expected));
			}
			else{
				console.log("NO: args=",JSON.stringify(args), JSON.stringify(value), "!=",JSON.stringify(expected));
				ok = false;
			}
		}
		return ok;
	}
	
	_this.typeOf = function(obj){
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}
	
	_this.isSame = function(object1, object2){
		const type1 = _this.typeOf(object1);
		const type2 = _this.typeOf(object2);
		
		if(type1 !== type2)return false;
		
		if(["undefined","null","boolean","number","string"].includes(type1)){
			return object1 == object2;
		}
		else if(type1 === "array"){
			if(object1.length != object2.length)return false;
			for(let i=0;i<object1.length;i++){
				if(_this.isSame(object1[i], object2[i]) === false)return false;
			}
			return true;
		}
		else if(type1 === "object"){
			if(object1.length != object2.length)return false;
			for(let k in object1){
				if(k in object2 == false) return false;
				if(_this.isSame(object1[k], object2[k]) === false)return false;
			}
			return true;
		}
		else{//mapとかsetとかsymbolとか
			console.log("warning: unsupposed type", type1);
			return object1 === object2;
		}
	}
	
	return {
		exec: _this.exec,
		testAll: _this.testAll
	}
}

export { Tester }