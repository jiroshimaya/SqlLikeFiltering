import { MyLexer } from "./MyLexer.js";

/*
 *  expression = factor, { ("and"|"or"), factor} ;
 *  factor = term | "(", expression, ")" ;
 *  term = string, ("="|"!="), string ;
 */

function MyLang(){
	
	const _this = {}
	
	_this.exec = function(obj, str){
		//console.log(obj,str);
		if(!str){
			console.log("Syntax Error: null input");
			return;
		}

		_this.obj = obj;
		let tokens = _this.tokenize(str);
		let lexer = new MyLexer(tokens);
		let result = _this.expression(lexer);
		//alert(lexer.read());
		if(lexer.exist()){
			console.log("Syntax Error: unexpected character =", lexer.read());
		}
		return result;
	}
	
	_this.tokenize = function(str){
		return str.replace(/!=|=|\(|\)/g," $& ").trim().split(/\s+/);
	}
	
	_this.expression = function(lexer) {
		let result = _this.factor(lexer);
		
		while(lexer.read() === "and" || lexer.read() === "or"){
			let next = lexer.next();
			let r = _this.factor(lexer);
			
			if(next === "and"){
				result = (result && r);
			}else{
				result = (result || r);
			}
		}
		return result;
	}
	
	_this.factor = function(lexer){
		if(lexer.read() === "("){
			lexer.next();
			let result = _this.expression(lexer);
			if(lexer.read() === ")"){
				lexer.next();
			}
			else{
				console.log("Syntax Error: unexpected character =", lexer.read());
			}
			return result;
		}
		else{
			return _this.term(lexer);
		}
	}
	
	_this.term = function(lexer){
		let key = lexer.next();
		let operator  = lexer.next();
		let value = lexer.next();
		
		if(operator === "="){
			return _this.obj[key] === value;			
		}
		else if(operator === "!="){
			return _this.obj[key] !== value;			
		}
		else{
			console.log("Syntax Error: unexpected character =", lexer.read());			
		}
	}
	return {
		exec: _this.exec
	}
}

export { MyLang }