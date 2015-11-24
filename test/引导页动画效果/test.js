window.onload = function() {
	// 取得分页和按钮对象
	var pages = document.getElementsByClassName('page');
	var roundbtns = document.getElementsByTagName('span');

	// 分页索引，默认显示第一页
	var index = 0;
	
	// 动画函数，第一个参数为真表示执行滚轮事件或左右按键事件，
	// 第二个参数为真表示切换到下一页
	function animate(flag1,flag2) {
	
		// 原分页和圆点按钮取消active样式
		pages[index].className = "page active";
		roundbtns[index].className = "";
		if (flag1) {
			if (flag2) {
				index ++;
				if (index > 3)
					index = 0;
			} else {
				index --;
				if (index < 0)
					index = 3;
			}
		} else {
			index = flag2;
		}

		// 当前分页和圆点按钮添加active样式
		pages[index].className = "page active";
		roundbtns[index].className = "active";
		
	}

	// 键盘左右键按下事件
	document.onkeydown = function(event) {
		if (event.keyCode == 37) // 左
			animate(true,false);
		else if (event.keyCode == 39) // 右
			animate(true,true);
	}

	// 鼠标滚轮事件
	document.onmousewheel = function(event) {
		if (event.wheelDelta < 0) // 向下滚动
			animate(true,true);
		else // 向上滚动
			animate(true,false);
	}

	// 圆形小按钮点击事件
	for (var i = 0; i < 4; i ++) {
		roundbtns[i].onclick = function() {
			var dbi = this.getAttribute('data-btn-index');
			animate(false,dbi)
		}
	}
}

