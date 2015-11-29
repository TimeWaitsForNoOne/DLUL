function getContent(index) {
	var jsonData,dataLen;
	//获得json数据
	$.getJSON('virtualserve/articletitle.json', function(data) {
		dataLen = data.pageCount;
		// 大于页码总数，到最后一页
		if (index > dataLen) index = dataLen;
		jsonData = data['page'+index]; 
	});	

	/*模拟网络延迟，并等待异步回调函数执行完成*/
	window.setTimeout(function() {
		// var data = dataStr.split("&")[0];
		// alert(data);
		// var pageCount = dataStr.split("&")[1];
		// alert(pageCount);
		// 数据长度
		/*var len = jsonData.length;
		// 动态添加数据列表
		var ulEl = $('<ul></ul>').appendTo('.content-right')
		for (i = 0; i < len; i ++) {
			if (i % 5 == 5 || i % 5 == 0)
				ulEl.append('<hr>')
			ulEl.append('<li><a href="#">' + jsonData[i] + '</a></li>')
		}
		// 添加分页按钮
		var divEl = $('<div></div>').appendTo('.content-right');*/
	}, 500);



}