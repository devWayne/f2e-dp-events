var url=window.data.jumpDeal;

function jump(){
	window.location.href=url;
	return false;
}

exports.init=function(){
	jump();
}