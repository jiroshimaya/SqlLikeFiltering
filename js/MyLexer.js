class MyLexer {
	constructor(tokens){
		this.idx = 0;
		this.tokens = tokens;
	}
		
	exist(){
		if(this.idx<0){
			return false;
		}
		if(this.tokens.length <= this.idx){
			return false;
		}
		return true;
	}
	
	read(){
		return this.tokens[this.idx]
	}
	
	next(){
		return this.tokens[this.idx++]
	}
	
}

export { MyLexer };