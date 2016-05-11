/*
 * @name: tongao
 * @www : http://www.tongao.org
 * @date: 2014/11/11/11:11
 */

var page = page || {};

page = {

	fixedPage : function() {
		$(window).on('scroll', function(e){
			var goScrollTop = $(window).scrollTop();

			if(goScrollTop < 455) {
				$(".aside").removeClass("fixed");
			}else if(goScrollTop>= 455){
				$(".aside").addClass("fixed");
			}

			//go Top
			var goTop = $(".go-top");
			(goScrollTop>0)?goTop.fadeIn():goTop.fadeOut('1000');

		});
		$(window).scroll();
	},
	onAnchor:function(){
		// sidebar goAnchor
		$(".sidebar .title a").on("click", function(e){
			var _this = $(this);
			$(this).addClass("title-focus");
			setTimeout(function(){
				_this.parent().parent().addClass("active").siblings().removeClass("active");
                _this.parent().next("dl").slideDown(300);
				$(".inner").not(_this.parent().next("dl")).slideUp(30);

			},10);
		});

		//


		$(".inner").on("click","a", function(e){
			var _this = $(this);

			setTimeout(function(){

				_this.parent().addClass("active").siblings().removeClass("active");

			},10);
		});
	},
	goAnchor:function(id){
		var top = $("#"+id).offset().top;
		$("html,body").stop(true, true).animate({scrollTop:top - 0}, 600);
	},
	goNav:function(){
		var _that = this;
		$(".sidebar").on("click", "a",function(){
			_that.goAnchor($(this).attr("data-id"));
		});
	},
    activeNav:function(){
        var winHeight = $(window).height()/10,
            menuActive = $(".anchor").length,
            menuArr = new Array();
       var i = 1;
        console.log($(window).scrollTop());
        $(".anchor").each(function(){
            menuArr[i] = new Object();
			menuArr[i].top= $(this).offset().top;
			menuArr[i].bottom = $(this).offset().top + $(this).outerHeight();
			menuArr[i].class_name = $(this).attr("id");
            menuArr[i].icon_class_name = $(this).attr("id");
          console.log( "top = " +menuArr[i].top + " bottom = " + menuArr[i].bottom + " name = " + menuArr[i].icon_class_name);

            i++;
        });


        $(window).scroll(function(){


            for(var i = 1; i <= menuActive; i++ )
            {

                if($(window).scrollTop() + winHeight > menuArr[i].top && $(window).scrollTop() + winHeight < menuArr[i].bottom)
                {
                    var parentMenu = "a[data-id='"+menuArr[i].class_name+"']";
                    var sonMenu = "a[data-id='"+menuArr[i].icon_class_name+"']"

                    $(parentMenu).parent().parent().addClass('active').siblings().removeClass("active").find("inner").removeClass("active");
                    $(sonMenu).parent().addClass('active').siblings().removeClass("active");
                }
            }
        });
    }

}

$(function (){
	page.fixedPage();
	page.onAnchor();
	page.goNav();
    //page.activeNav();
});


