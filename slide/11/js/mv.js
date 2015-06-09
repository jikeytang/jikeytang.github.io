function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, json, fn){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var bStop = true,
			attr = null;

		for(attr in json){
			var end = json[attr],
				iCur = 0,
				opacity = 0;

			if(attr == 'opacity'){
				iCur = getStyle(obj, attr) * 100;
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
				
			var iSpeed = (end - iCur) / 8;
			iSpeed = (iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed));

			if(iCur != end){ // 开始设为false,然后判断为true，会少执行一次
				bStop = false;
			}

			iCur += iSpeed;

			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:' + iCur + ')';
				obj.style.opacity = iCur / 100;
			} else {
				obj.style[attr] = iCur + 'px';
			}
		}

		if(bStop){
			clearInterval(obj.timer);
		}
	}, 30);
}