//创建
function createCookie(key,value,json){
	//初始化参数
	json = json || {};
	let cookieStr = encodeURIComponent(key) + '=' + encodeURIComponent(value);
	//判断其它修饰属性
	if(!isNaN(json.expires)){
		let date = new Date();
		date.setDate(date.getDate() + json.expires);
		cookieStr += ';expires=' + date;
	}
	if(json.path){
		cookieStr += ';path=' + json.path;
	}
	if(json.domain){
		cookieStr += ';domain=' + json.domain;
	}
	if(json.secure){
		cookieStr += ';secure';
	}
	//创建cookie
	document.cookie = cookieStr;
}
//获取cookie
function getCookie(key){
	let arr = document.cookie.split('; ');
	for(let i = 0,len = arr.length;i < len;i ++){
		let list = arr[i].split('=');
		if(encodeURIComponent(key) === list[0]){
			return decodeURIComponent(list[1]);
		}
	}
}
