// 声明全局变量
var index = 0, //当前显示图片的索引，默认值为0
	timer = null, //存放定时器
	main = byId("main"),
	prev = byId("prev"), //上一张
	next = byId("next");
pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
	size = pics.length;
console.log(size);


//封装getElementById
function byId(id) {
	return typeof (id) === "string" ? document.getElementById(id) : id;
}

//封装通用事件绑定办法
function addHandler(element, type, handler) {
	//非IE浏览器
	if (element.addEventListener) {
		element.addEventListener(type, handler, true);
		//IE浏览器支持DOM2级
	} else if (element.attachEvent()) {
		element.attachEvent("on" + type, handler);
		//IE浏览器不支持DOM2级
	} else {
		element["on" + type] = handler;
	}
}

//封装函数切换图片
function changeImg() {
	for (var i = 0; i < size; i++) {
		pics[i].style.display = "none";
		dots[i].className = "";
	}
	pics[index].style.display = "block";
	dots[index].className = "active";
}

//自动轮播函数
function startAutoPlay() {
	timer = setInterval(function () {
		index++;
		if (index >= size) index = 0;
		changeImg();
		console.log(index);
	}, 3000)
}

//清除定时器，停止自动轮播
function stopAutoPlay() {
	if (timer) {
		clearInterval(timer);
	}
}

addHandler(next, "click", function () {
	index++;
	if (index >= size) index = 0;
	// pics[0].style.display="none";
	// pics[0].style.display="none";
	// pics[0].style.display="none";
	changeImg();
});

//点击上一张显示上一张图片
addHandler(prev, "click", function () {
	index--;
	// console.log(index);
	if (index < 0) index = size - 1;
	/* pics[0].style.display="none";
	 pics[0].style.display="none";
	 pics[0].style.display="none";*/
	changeImg();
})


//鼠标划入main停止轮播
addHandler(main, "mouseover", stopAutoPlay)
addHandler(main, "mouseout", startAutoPlay)

//自动开启轮播
startAutoPlay();