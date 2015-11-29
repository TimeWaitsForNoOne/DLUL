$(document).ready(function() {
	// 取得当前地址
	var url = location.href;
	// 取得当前要显示的页码
	var index;
	try {
		index = parseInt(url.split("?")[1].split("=")[1]);
		// 错误输入，到第一页
		if (isNaN(index)) index = 1;
	} catch(error) {
		index = 1;
	}

	getContent(index);
	
});