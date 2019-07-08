
/*导航菜单动画*/
(function () {
	var iSpeed = 0;
	var timer = null;
	var backTimer = null;
	var clickOn = true;

	var $boxBorder = $(".box-border");
	var $nav = $(".nav.main").find(".nav-btn");
	var $childNav = $boxBorder.find(".nav");



	resetLeft();
	$nav.each(function (i, nav) {
		$(nav).on("mouseenter",function () {
			clearTimeout(backTimer);
			startMove(this.offsetLeft);
		});
		$(nav).on("mouseleave",function () {
			backTimer = setTimeout(function () {
				backOrigin();
			},100);
		});
	});
	$childNav.find("a").each(function (i, nav) {
		$(nav).on("click", function () {
			if(!clickOn){
				return;
			}
			$nav.eq(i).addClass("active").siblings("a").removeClass("active");
		});
	})

	$boxBorder.on("mouseenter",function () {
		clearTimeout(backTimer);
	});
	$boxBorder.on("mouseleave",function () {
		backOrigin();
	});

	function startMove(iTarget) {
		clearInterval(timer);
		clickOn = false;
		timer = setInterval(function () {
			iSpeed += (iTarget - $boxBorder[0].offsetLeft) / 6;
			iSpeed *= 0.75;
			if(Math.abs(iSpeed) <=1 && Math.abs(iTarget - $boxBorder[0].offsetLeft) <= 1){
				clearInterval(timer);
				iSpeed = 0;
				$boxBorder.css("left",iTarget);
				$childNav.css("left", -iTarget);
				clickOn = true;

			}else{
				$boxBorder.css("left",$boxBorder[0].offsetLeft + iSpeed);
				$childNav.css("left",-$boxBorder[0].offsetLeft)
			}
		},30);
	}

	function backOrigin() {
		var $origin = $(".nav.main").find(".active");
		startMove($origin[0].offsetLeft);
	}
	function resetLeft(){
		var $origin = $(".nav.main").find(".active");
		$boxBorder.css("left", $origin[0].offsetLeft);
	}
})();


/* 
*留言滚动
*/
(function(){

	var timer = null;
	var $contentWrap = $(".self-main").find(".content-wrap");
	var $content = $(".self-main").find(".content");

	if($content.height() > $contentWrap.height()){
		var $cloneLi = $content.find("li").clone(true);
		$content.append($cloneLi);
		startMove();
	}

	$content.on("mouseenter",function(){
		clearInterval(timer);
	});
	$content.on("mouseleave", function () {
		startMove();
	});

	function startMove(){
		timer = setInterval(function () {
			var iHeight = $content.innerHeight() / 2;

			var iTop = $content.offset().top - $contentWrap.offset().top;
			if (Math.abs(iTop) >= iHeight) {
				$content.css("top", 0);
			} else {
				$content.css("top", iTop - 1);
			}

		}, 30);
	}
})();