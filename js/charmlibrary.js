$(document).ready(function() {
	/**
	 * 轮播图
	 */
	// 轮播索引
	var index = 1;
	// 每幅图片的宽度
	var imgWidth = $('.banner').width();
	// 4幅图片总宽度
	var totalWidth = 4 * imgWidth;
	// 下一幅按钮单击事件
	$('#next').click(function(event) {
		
		// 动画同步标志，判断正在动画的元素长度是否为0
		if($(':animated').length != 0)
			return;

		index ++;
		// 到达最后一幅图片，切换到第一张
		if (parseInt($('#imglist').css('left')) == -totalWidth) {
			$('#imglist').css('left','0');
		}

		var len = parseInt($('#imglist').css('left')) - imgWidth;

		if (index > 4) {
			index = 1;
		}

		$('#imglist').animate({left:len}, 1000);


		highlight();
		
	});
	
	// 上一幅按钮单击事件
	$('#prev').click(function(event) {

		if($(':animated').length != 0)
			return;

		index --;
		// 到达第一张图片，切换到最后一张
		if (parseInt($('#imglist').css('left')) == 0) {
			$('#imglist').css('left',-totalWidth);
		}

		var len = parseInt($('#imglist').css('left')) + imgWidth;

		if (index < 1) {
			index = 4;
		} 
		$('#imglist').animate({left:len}, 1000);

		highlight();
	});

	// 小圆点按钮点击事件
	$('#btnlist span').click(function(event) {
		var myIndex = this.getAttribute('index');
		if(index == myIndex)
			return;
		$('#imglist').animate({left:-imgWidth * myIndex},1000);
		index = myIndex;
		highlight();
	});

	// 小圆点按钮高亮
	function highlight () {
		for (var i = 0; i < $('#btnlist span').length; i++) {
			$('#btnlist span').removeClass('on');
		}
		// -1代表倒数第1个
		$('#btnlist span').eq(index-1).addClass('on');
	}

	var timerId1;

	// 自动播放
	function autoPlay() {
		timerId1 = window.setInterval(function() {
			// 模拟用户事件，让next按钮发生单机事件
			$('#next').click(); 
		}, 2000);
	}

	// 第一个参数：鼠标移上函数，第二个参数：鼠标移出函数
	$('.banner').hover(function() {
		window.clearInterval(timerId1);
	}, function() {
		autoPlay();
	});

	autoPlay();

	/*全选/取消全选/多选监听*/
	var fileTypeCheckBox = $('input[name="filetype"]');

	// 全选按钮
	$('#all').click(function(event) {
	 	if (this.checked) {
	 		fileTypeCheckBox.prop('checked', true);
	 		$(this).next().text('取消全选');
	 	}
	 	else {
	 		fileTypeCheckBox.prop('checked', false);
	 		$(this).next().text('全选');
	 	}
	});

	// 每个文档类型复选框按钮单击时触发判断
	fileTypeCheckBox.click(function(event) {
		// 都选中标志
		var flag = true;
		for (var i = 0;i < fileTypeCheckBox.length;i ++) {
			// 有一个没选中，标志为假
			if (!fileTypeCheckBox.eq(i).prop('checked'))
				flag = false;
		}
		// 标志为真，全选按钮选中
		if (flag) {
			$('#all').prop('checked',true);
		} else {
			$('#all').prop('checked',false);
		}
	});

	var tabTitle = $('#tab-title li');

	var tabIndex = 0;// 播放索引

	var timerId2;

	autoChangeTab();

	/*自动切换选项卡函数*/
	function changeTab() {	
		// 当前选项卡高亮
		tabTitle.removeClass('active');
		tabTitle.eq(tabIndex).addClass('active');
		// 当前选项卡对应内容显示
		$('.tab-content').css('display', 'none');
		$('.tab-content').eq(tabIndex).css('display','block');
	}

	/*自动切换*/
	function autoChangeTab() {
		timerId2 = window.setInterval(function() {
			changeTab();
			tabIndex ++;
			if (tabIndex > tabTitle.length - 1)
				tabIndex = 0;
		}, 3000);
	}

	/*标题滑入滑出事件*/
	tabTitle.mouseover(function(event) {
		// 停止自动播放
		clearInterval(timerId2);
		// 取得当前选项卡的下标
		var tabIndex = tabTitle.index($('.active'));
		changeTab();
	});

	tabTitle.mouseout(function(event) {
		autoChangeTab();
	});

	/*内容区滑入滑出事件*/
	$('.tab-content').hover(function() {
		clearInterval(timerId2);
	}, function() {
		autoChangeTab();
	});
});