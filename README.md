# DLUL
自己模仿学校图书馆网站做的DEMO
大连大学图书馆
主页实现功能：
1.	将body绝对定位，宽高100%，超出部分隐藏，分页相对定位，宽高100%。利用CSS3的transform:translateY以及transition过渡，通过监听鼠标滚轮滚动事件和键盘上下键按键事件实现了插件fullPage的整屏滚动。并通过设置同步标志，防止滚动时一下滚动多页。
2.	右侧导航栏固定定位，超过第一屏时显示，滚动到对应分页，对应导航栏高亮。使用了CSS sprite技术。
3.	首页下侧向下按钮是一个无限运动的CSS动画。单击移动到下一屏。右上角PAD版手机版滑过出现二维码。
4.	日历框的日期由程序计算后填出。日期旁边的tips提示，由程序发送ajax请求json数据，解析后统计得出，点击有提示的日期出现模态层，新闻数据由json数据解析后呈现。
5.	搜索框提示列表保存在localStorage中，单击回车或搜索按钮可将新内容保存，单击搜索框，如果提示列表有内容，取出来显示，没有则不显示，当搜索框获得焦点时，使用上下按键可以选择提示信息，当前提示信息高亮，单击提示信息或回车，搜索框的值变成提示信息的值，当提示信息的值改变时，与搜索内容相关的提示信息会提前。单击清除历史按钮清除所有搜索记录。
6.	将各分页的选项卡封装成对象，由选项卡ID，所在分页ID，高亮颜色组成，将各选项卡对象封装成对象数组，用各个选项卡对象call选项卡切换函数，做到代码重构。
7.	最后一页调用百度地图，显示学校地理位置。
引导页：
	简介：通过鼠标滚轮，左右按键，和圆形小按钮做到切换页面，但没实现原网页的3D翻转效果和动画同步。
魅力图书馆页：
1.	实现功能：banner轮播图:div设置背景图片，最外层父容器宽度100%，div图片容器500%，div图片20%；在4张图片之前添加最后一张图片。图片自动轮播，鼠标移上停止轮播，离开继续轮播，点击左右箭头和下面小圆点都可以切换图片。
2.	全选/取消全选，动态监听全选。
3.	选项卡自动切换，鼠标移上停止切换。离开继续切换，点击选项卡切换。
4.	图片设置透明遮罩层，鼠标移上遮罩层高度减小。
准备实现的页面：
服务页子页面，资源页，用bootstrap做手机端，PAD端自适应页面。
存在的问题；
兼容性不好，请在谷歌最新浏览器下浏览。


