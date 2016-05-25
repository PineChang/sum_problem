jQuery(document).ready(function($) {
    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $(document).on('click', '#comments-navi a',
    function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            beforeSend: function() {
                $('#comments-navi').remove();
                $('.commentlist').remove();
                $('#loading-comments').slideDown()
            },
            dataType: "html",
            success: function(out) {
                result = $(out).find('.commentlist');
                nextlink = $(out).find('#comments-navi');
                $('#loading-comments').slideUp(550);
                $('#loading-comments').after(result.fadeIn(800));
                $('.commentlist').after(nextlink)
            }
        })
    })

    	
    // 百度分享
    $('.J_showAllShareBtn').click(function(){
    	$('.bdsharebuttonbox').fadeToggle();
    	$('.bdsharebuttonbox a').siblings(".external").removeClass("external");

    	$('.bdsharebuttonbox a').parents(".hide-external").removeClass("hide-external")
    	setTimeout(function(){
    	$('.bdsharebuttonbox').focus();
    	}, 300);
    });

});

//文章点赞
jQuery(document).ready(function($) { 
	$.fn.postLike = function() {
	 if ($(this).hasClass('current')) {
     alert("您已经赞过啦:-)");
	 return false;
	 } else {
	 $(this).addClass('current');
	 var id = $(this).data("id"),
	 action = $(this).data('action'),
	 rateHolder = $(this).children('.count');
	 var ajax_data = {
	 action: "cnsecer_like",
	 um_id: id,
	 um_action: action
	 };
	 $.post(cnsecer_url.url_ajax, ajax_data,
	 function(data) {
	 $(rateHolder).html(data);
	 });
	 return false;
	 }
	};
	$(document).on("click", "#Addlike",
	function() {
	 $(this).postLike();
	});
}); 





//tip
jQuery(document).ready(function($) { 
	$("#tooltip-weixin,#tooltip-qq,#tooltip-f-qq,#tooltip-f-weixin").click(
	function() {
		var e = $(this);
		setTimeout(function() {
			e.parents(".dropdown-menu-part").find(".dropdown-menu").toggleClass("visible");
		},
		"200");
	});

    $('.m-search').on('click', function(){
        $('.search-box').slideToggle(200, function(){
            if( $('.m-search').css('display') == 'block' ){
             $('.search-box .form-search').focus()
             }
        })
    })

//返回顶部
!function(o){"use strict";o.fn.toTop=function(t){var i=this,e=o(window),s=o("html, body"),n=o.extend({autohide:!0,offset:420,speed:500,position:!0,right:38,bottom:108},t);i.css({cursor:"pointer"}),n.autohide&&i.css("display","none"),n.position&&i.css({position:"fixed",right:n.right,bottom:n.bottom}),i.click(function(){s.animate({scrollTop:0},n.speed)}),e.scroll(function(){var o=e.scrollTop();n.autohide&&(o>n.offset?i.fadeIn(n.speed):i.fadeOut(n.speed))})}}(jQuery);
$(function() {
    $('.to-top').toTop();
});

}); 



jQuery(document).on("click", "#fa-loadmore", function($) {
    var _self = jQuery(this),
        _postlistWrap = jQuery('.posts-con'),
        _button = jQuery('#fa-loadmore'),
        _data = _self.data();
    if (_self.hasClass('is-loading')) {
        return false
    } else {
        _button.html('<i class="icon-spin6 animate-spin"></i> 加载中...');
        _self.addClass('is-loading');
        jQuery.ajax({
            url: cnsecer_url.url_ajax,//注意该文件路径
            data: _data,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.code == 500) {
                    _button.data("paged", data.next).html('加载更多');
                    alert('服务器正在努力找回自我  o(∩_∩)o')
                } else if (data.code == 200) {
                    _postlistWrap.append(data.postlist);
                    if( jQuery.isFunction(jQuery.fn.lazyload) ){  
                        jQuery("img.lazy").lazyload({ effect: "fadeIn",});
                    } 
                    if (data.next) {
                        _button.data("paged", data.next).html('加载更多')
                    } else {
                        _button.remove()
                    }
                }
                _self.removeClass('is-loading')
            },
            error:function(data){
                console.log(data.responseText);
                console.log(data);
            }
        })
    }
});




jQuery(document).ready(function($) { 

$(function() {
    FastClick.attach(document.body);
    var top = $("html, body");
    $(".mobile_menu").click(function() {
        $("html").toggleClass("open");
        $(".mobile_nav").slideToggle("fast");
        return false;
    });

});

var elments = {
    sidebar: $('.sidebar'),
    footer: $('#footer'),
    widget :$('.sidebar-box .widget')
}
if( elments.sidebar.length > 0 &&  elments.widget.length>0 && cnsecer_url.roll ){

    cnsecer_url.roll = cnsecer_url.roll.split(' ')

    if(cnsecer_url.headfixed == 1){
        
        var h1 = 90, h2 = 115, h3 = 90;

        if( $('body').hasClass('home') ){
            var xxx = 760
        }
        else{
            var xxx = 75
        }
    }
    else{
        var h1 = 25, h2 = 50, h3 = 25;
        if( $('body').hasClass('home') ){
            var xxx = 826
        }
        else{
            var xxx = 140
        }
    }
   

    var rollFirst = elments.sidebar.find('.widget:eq('+(Number(cnsecer_url.roll[0])-1)+')');
    var sheight = rollFirst[0].offsetHeight;
    rollFirst.on('affix-top.bs.affix', function(){
        rollFirst.css({top: 0}); 
        sheight = rollFirst[0].offsetHeight;

        for (var i = 1; i < cnsecer_url.roll.length; i++) {
            var item = Number(cnsecer_url.roll[i])-1;
            var current = elments.sidebar.find('.widget:eq('+item+')');
            current.removeClass('affix').css({top: 0});
        };
    });

    rollFirst.on('affix.bs.affix', function(){
        rollFirst.css({top: h1}); 

        for (var i = 1; i < cnsecer_url.roll.length; i++) {
            var item = Number(cnsecer_url.roll[i]) - 1;
            var current = elments.sidebar.find('.widget:eq('+item+')');
            current.addClass('affix').css({top: sheight+h2});
            sheight += current[0].offsetHeight + h3;
        };
    });

    rollFirst.affix({
        offset: {
            top: elments.sidebar.height() + xxx ,
            bottom: elments.footer.outerHeight(true) + 40 ,
        }
    });
   
}

});

jQuery(document).ready(function($) { 
    if(cnsecer_url.headfixed == 1){
        $(document).on('scroll', function(){
            
            var st = $(this).scrollTop(),
                nav_point = 90,
                $nav = $('#header');

                if( st >= nav_point ){
                    $nav.addClass('headfixed');
                }
                else{
                    $nav.removeClass('headfixed');
                }

        });
    }
    else
    {
        return false;
    }
});
document.addEventListener('DOMContentLoaded', function(){
   var aluContainer = document.querySelector('.comment-form-smilies');
    if ( !aluContainer ) return;
    aluContainer.addEventListener('click',function(e){
    var myField,
        _self = e.target.dataset.smilies ? e.target : e.target.parentNode,
        tag = ' ' + _self.dataset.smilies + ' ';
        if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
            myField = document.getElementById('comment')
        } else {
            return false
        }
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = tag;
            myField.focus()
        } else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            var cursorPos = endPos;
            myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length);
            cursorPos += tag.length;
            myField.focus();
            myField.selectionStart = cursorPos;
            myField.selectionEnd = cursorPos
        } else {
            myField.value += tag;
            myField.focus()
        }
    });
 });
jQuery(document).on("click", ".facetoggle", function($) {
    jQuery(".comment-form-smilies").toggle();
});