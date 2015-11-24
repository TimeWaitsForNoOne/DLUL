// 不能放在window.onload中，页面加载完毕再执行，请求的外部js找不到方法
function ajaxHandle () {
	// alert(document.getElementById('page-main').innerHTML);
	// 创建xhr对象
	var	xhr = new XMLHttpRequest();

	// 当xhr对象的状态变化执行处理
	xhr.onreadystatechange = function() {
		// 如果请求响应结束
		if (xhr.readyState == 4 && xhr.status == 200) {
		
			// 把响应的字符串转化为json对象
			var jsonObj = eval('(' + xhr.responseText + ')');
			// 将返回数据传给数据处理函数
			dataHandle(jsonObj.news);
			
		}
	}
	// 设置请求的方式和url
	xhr.open('POST','virtualserve/news.json');
	// 禁止缓存
	xhr.setRequestHeader("If-Modified-Since","0");
	xhr.setRequestHeader("Cache-Control","no-cache");
	// 发出请求
	xhr.send();
}

/*接收返回的数据并动态添加到文档中*/
function dataHandle (newsList) {
	// 遍历新闻数组
	for (var i = 0; i < newsList.length; i ++) {
		// 如果有新闻
		if (newsList[i].flag) {
			// 新闻的条数
			var count = newsList[i].data.length;
			// 将新闻条数添加到对应日期之后
			var newsAmountSpan = document.createElement('span');
			var spanText = document.createTextNode(count);
			newsAmountSpan.appendChild(spanText);
			var spanParentNode = document.getElementById('calendar-date').getElementsByTagName('li')[i];
			spanParentNode.appendChild(newsAmountSpan);

			spanParentNode.onclick = function() {
				var layer = document.getElementById('layer');
				layer.style.display = 'block';
			}
		}
	}
}

// 匿名函数自执行，动态生成script标签，请求外部js文件


/*页面加载完毕执行*/
window.onload = function() {
	!function () {
	/*jsonp跨域请求*/
	var url = "http://localhost:8888/DLUL/virtualserve/test.js";
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(script);
}();
	/**
	 * 首页事件
	 * 1-日历框自动填充日期
	 * 2-搜索框检测为空事件
	 * 3-
	 */
	
	/*日历框自动填充日期*/
	// 日期对象数组
	var calendarDate = document.getElementById('calendar-date').getElementsByTagName('li');

	var today = new Date(); 
	// 日期
	var date = today.getDate();
	// 星期几
	var day = today.getDay();

	for (var i = day; i >= 0; i --) {
		calendarDate[i].innerHTML = date --;
	}
	// 重置当前日期
	date = today.getDate();

	for (var j = day + 1; j <= 6; j ++) {
		calendarDate[j].innerHTML = ++ date;
	}

	// 搜索框对象
	var keyWord = document.getElementById('keyword');
	// 搜索按钮对象
	var searchBtn = document.getElementById('btn-search');

	/*搜索框检测为空事件*/
	searchBtn.onclick = function() {
		if (keyWord.value == '')
			alert('搜索内容不能为空！');
	}

	// 关闭按钮
	var closeBtn = document.getElementById('close');
	// 弹出层
	var layer = document.getElementById('layer');
	/*弹出框关闭事件*/
	closeBtn.onclick = function() {
		
	}
	/**
	 * 导航事件组
	 * 1 - 鼠标滚轮事件
	 * 2 - 键盘上下按键事件
	 * 3 - 首页向下箭头点击事件
	 * 4 - 返回顶部按钮点击事件
	 * 5 - 导航栏对应分页点击事件
	 */
	
	// 分页对象
	var pages = document.getElementsByClassName('page');
	// 导航栏对象
	var nav = document.getElementById('sidebar-nav');
	// 导航栏条目
	var navItem = nav.getElementsByTagName('li');
	// 首页向下箭头
	var arrow = document.getElementById('arrow');
	// 右侧导航栏回到顶部按钮
	var toTop = document.getElementById('totop');
	// 分页索引
	var index = 0; 
	// 判断页面是否在滚动的标志
	var flag = true;

	/*监听鼠标滚轮事件*/
	document.onmousewheel = function(event) {
		// 定义一个参数
		var param;

		// 鼠标向下滚动
		if (event.wheelDelta < 0)
			param = true;
		// 鼠标向上滚动
		else 
			param = false;
	
		animate(param); 
	};

	/*监听上下按键事件*/
	document.onkeydown = function(event) {
		if (event.keyCode != 38 && event.keyCode != 40) return;
		// 定义一个参数
		var param;
		// 上键
		if (event.keyCode == 38)
			param = false;
		// 下键
		if (event.keyCode == 40)
			param = true; 

		animate(param);
	};

	/*首页向下箭头点击事件*/
	arrow.onclick = function() {
		animate(true);
	}

	/*右侧导航栏返回顶部点击事件*/
	toTop.onclick = function() {
		// 将分页索引重新置为-1
		index = -1;

		animate(false);

		// 右侧导航栏隐藏
		nav.style.display = 'none';
	};

	for (var i = 0; i < navItem.length - 1; i ++) {
		// 为每个导航项目设置自定义属性
		navItem[i].setAttribute('data-index', -i);
		// 导航列表点击事件
		navItem[i].onclick = function() {
			flag = true;
			// 取得当前按钮的自定义属性值
			var dataIndex = this.getAttribute('data-index');
			if (index >= dataIndex) {
				index = dataIndex;
				animate(true);
			} else {
				index = dataIndex - 2;
				animate(false);
			}

		};
	}

	/*页面滚动函数*/
	function animate(param) {
		if (flag) {
			// 立即将标志置为false
			flag = false;

			// 在一秒后将标志置为true，即滚动后500毫秒之内无法滚动
			setTimeout(function(){
				flag = true;
			},500);
			
			// 参数为真向下滚动，反之向上滚动
			if (param) {
				// 最后一页时停止动画
				if (index == -6) return false;
				// 索引减一
				index --;
			} else {
				// 第一页时停止动画
				if (index == 0) return false;
				// 索引加一
				index ++; 
			}
			// 每个页面滚动对应距离
			for (var i = 0; i < pages.length; i ++) {
				pages[i].style.top = ''+ index +'00%';
			}
		}

		// 如果不是第一页导航栏显示
		if (index) {
			nav.style.display = "block";
			// 分页对应的导航栏条目高亮
			for (var j = 0; j < navItem.length - 1; j ++) {
				navItem[j].className = "";
			}
			navItem[Math.abs(index) - 1].className = "active";
		} else {
			nav.style.display = "none";
		}
	}

	/*各分页鼠标移过选项卡内容切换事件*/
	 
	// 选项卡对象
	function TabObj (tabId, pageId, color) {
		this.tab = document.getElementById(tabId).getElementsByTagName('li');
		this.pageId = pageId;
		this.color = color;
	}

	// 选项卡对象数组
	var tabArray = new Array(
 		new TabObj('tab-database','page-resource','blue'),
 		new TabObj('tab-notice','page-service','orange'),
 		new TabObj('tab-msg','page-service','blue'),
 		new TabObj('tab-intro','page-survey','orange'),
 		new TabObj('tab-survey','page-survey','blue'),
 		new TabObj('tab-thinker','page-thinker','blue'));	 	
	
	for (var i = 0; i < tabArray.length; i ++) {
		tabChange.call(tabArray[i]);
	}

	// 选项卡切换函数
	function tabChange() {
		// 根据选项卡对象所在分页和高亮颜色取得内容列表容器
	 	var contentList = document.getElementById(this.pageId).getElementsByClassName('content-list-' + this.color)[0];
	 	// 内容列表对象
	 	var listItem = contentList.getElementsByClassName('listitem');
	 	// 闭包时this指向改变，保存下来
	 	var that = this;

	  	for (var i = 0; i < this.tab.length; i ++) {
	  		// 添加自定义属性值
	  		this.tab[i].setAttribute('data-tid', i);
	  		// 鼠标移上选项卡事件
	  		this.tab[i].onmouseover = function() {
	  			// 将所有选项卡取消高亮样式
	  			for (var j = 0; j < that.tab.length; j ++) {
	  				that.tab[j].className = '';
	  			}
	  			// 当前选项卡高亮
	  			this.className = 'on-' + that.color;
	  			// 取得当前选项卡的自定义属性值
	  			var tid = parseInt(this.getAttribute('data-tid'));
	  			// 将所有内容列表隐藏
	  			for (var k = 0; k < listItem.length; k ++) {
	  				listItem[k].style.display = 'none';
	  			}
	  			// 当前选项卡对应的内容显示
	  			listItem[tid].style.display = 'block';
	  		}
	  	}	
	}
};