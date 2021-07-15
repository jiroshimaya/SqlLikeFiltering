import { MyLexer } from "./MyLexer.js";

/*
 *  expression = factor, { ("and"|"or"), factor} ;
 *  factor = term | "(", expression, ")" ;
 *  term = string, ("="|"!="), string ;
 */

class MyLang {
	constructor() {}
	
	exec(obj, str) {
		if(!str){
			console.log("Syntax Error: null input");
			return;
		}

		this.obj = obj;
		let tokens = this.tokenize(str);
		return this.expression(new MyLexer(tokens));
	}
	
	tokenize(str){
		return str.replace(/!=|=|\(|\)/g," $& ").trim().split(/\s+/);
	}
	
	expression(lexer) {
		let result = this.factor(lexer);
		
		while(lexer.read() === "and" || lexer.read() === "or"){
			let next = lexer.next();
			if(next === "and"){
				result = (result && this.factor(lexer));
			}else{
				result = (result || this.factor(lexer));
			}
		}
		return result;
	}
	
	factor(lexer){
		if(lexer.read() === "("){
			lexer.next();
			let result = this.expression(lexer);
			if(lexer.read() === ")"){
				lexer.next();
			}
			else{
				console.log("Syntax Error: unexpected character =", lexer.read());
			}
			return result;
		}
		else{
			return this.term(lexer);
		}
	}
	
	term(lexer){
		let key = lexer.next();
		let operator  = lexer.next();
		let value = lexer.next();
		
		if(operator === "="){
			return this.obj[key] === value;			
		}
		else if(operator === "!="){
			return this.obj[key] !== value;			
		}
		else{			
			console.log("Syntax Error: unexpected character =", lexer.read());
			return result;			
		}
	}
}

export { MyLang }