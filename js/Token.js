function Token(tokens){
	const _this = {}
	_this.idx = 0;
	_this.tokens = tokens;
	
	_this.exist = function(){
		if(_this.idx<0){
			return false;
		}
		if(_this.tokens.length <= _this.idx){
			return false;
		}
		return true;
	}
	
	_this.read = function(){
		return _this.tokens[_this.idx]
	}
	
	_this.next = function(){
		return _this.tokens[_this.idx++]
	}
	
	return {
		exist: _this.exist,
		read: _this.read,
		next: _this.next
	}
}

export { Token };