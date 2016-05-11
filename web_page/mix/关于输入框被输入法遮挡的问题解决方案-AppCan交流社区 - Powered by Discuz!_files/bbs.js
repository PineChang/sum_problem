 /**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-06-25 11:07:37
 * @version jQueryIdjQuery
 */

 
function search1(page, filterId, ele) {
	//debugger;
	var tm="";
    var name1=jQuery(ele).parent().attr('data-value');
    var url=window.location.pathname;
    var obj={};
    if(!window.location.search){

		obj={};

    }else
    	obj=parseQueryString(window.location.search);
    	if(obj['datetime']){
    		delete(obj['datetime'])
    	}
		obj[filterId]=name1;
		var query=parseQueryJson(obj);
		url+='?'+query;
		url=url.replace(/page=\d/g,'page=1')
		window.location=url;
}
function search3(page, filterId, ele) {
	//debugger;
	var tm="";
    var name1=jQuery(ele).attr('data-value');
    var url=window.location.pathname;
    if(!window.location.search){

		obj={};

    } else
	var obj=parseQueryString(window.location.search);
	obj[filterId]=name1;
	var query=parseQueryJson(obj);

	url+='?'+query;
	url=url.replace(/page=\d/g,'page=1')
	window.location=url;
   
}
function search2(){
	var datetime=jQuery('#trainTime3').val();
	//alert(datetime)
	var tm="";
    var url=window.location.pathname;
    if(!window.location.search){

		obj={};

    } else
	var obj=parseQueryString(window.location.search);
	if(obj['d']){
		delete(obj['d'])
	}
	obj["datetime"]=datetime;
	var query=parseQueryJson(obj);

	url+='?'+query;
	// alert(jQuery("#dpClearInput").val())
	// jQuery("#dpClearInput").click(function(){
	//  	alert(1111)
	// 	window.location="/appcanbbs/activity.php?fid=104&d=全部"
	// })
	window.location=url;

}
function parseQueryString(url)
{
	var obj={};
	var keyvalue=[];
	var key="",value=""; 
	var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
	for(var i in paraString)
	{
		keyvalue=paraString[i].split("=");
		key=keyvalue[0];
		value=keyvalue[1];
		obj[key]=value; 
	} 
	return obj;
}

function parseQueryJson(o){ 
	var undef, buf = [], key, e = encodeURIComponent; 
	var pre='';
	for(key in o){ 
		pre+=key+'='+o[key]+'&';
	} 

	return pre.substring(0,pre.length-1); 
};





jQuery(function(){
	//当鼠标经过点击的状态
 	/*function move(btn,class1,class2){
 		jQuery(btn).click(function(){
			jQuery(this).addClass(class1).siblings().removeClass(class1);
			//jQuery('.text_width').removeClass('sel-act');
	 	});
	 	jQuery(btn).hover(function(){
	 		jQuery(this).addClass(class2).siblings().removeClass(class2);
	 	},function(){
	 		jQuery(this).removeClass(class2);
	 	});
 	}
    //问答页面的问答专区
 	move('.all-btn a','act','act2');*/
 	//活动专区的最新活动
 	// move('.act_md','act3','act4');
 	jQuery('.all-btn a').click(function(){
		jQuery(this).addClass('act').siblings().removeClass('act');
		//jQuery('.text_width').removeClass('sel-act');
 	});
 	jQuery('.all-btn a').hover(function(){
 		jQuery(this).addClass('act2').siblings().removeClass('act2');
 	},function(){
 		jQuery(this).removeClass('act2');
 	});


 	/*jQuery('.text_width').click(function(){
 		jQuery(this).addClass('sel-act');
 		jQuery(this).parent().siblings().removeClass('act3');
 	});
*/





// 	//热搜词展开收起状态
// 	var flag=false;
// 	jQuery('.more').click(function(){
// 		jQuery(this).hover(function(){
// 			jQuery(this).css('color','#434343');
// 		},function(){
// 			jQuery(this).css('color','#999');
// 		});
// 		jQuery(this).css({'color':'#999','text-decoration':'none'});
// 		var arrList = ["AppCan","官方活动","社区","官方活动AppCan","官方活动","官方活动","官方活动"];
// 		if (!flag) {
//		 	for(var i=0; i<arrList.length;i++){
//		 		jQuery(".more").before('<a href="#" class="hot-ci special">'+arrList[i]+'</a>');
//		 		/*jQuery('.hot-search').stop().animate({'height':auto},500);*/
//		 	}
//		 	jQuery(this).html('收起<span class="tri"></span>');
//		 	flag=true;
// 		}
// 		else{
// 			jQuery(this).html('更多<span class="tri"></span>');
// 			for(var i=0;i<arrList.length;i++){
//		 		jQuery(".special").remove();
//		 	}
// 			flag=false;
// 		}
// 	});

// 	$('#more').click(function(){
//		$('#hidewords').show();
//		$('#more').hide();
//		$('#pack').css('display','inline-block');
//    })
//	$('#pack').click(function(){
//		$('#hidewords').hide();
//		$('#pack').hide();
//		$('#more').show();
//    })
	
	
	
	
	
	


 	//活动专区页面中鼠标经过的效果
 	function btnMove(oBtn,oBtnhover){
 		jQuery(oBtn).hover(function(){
	 		jQuery(this).children().addClass(oBtnhover);
	 	},function(){
	 		jQuery(this).children().removeClass(oBtnhover);
	 	});
 	}
 	btnMove('.apply4 a','apply-hover');
 	btnMove('.owner-hover');


 	//活动专区的获取url
 	var time='全部';
	var type='全部';
	var city='全部';
	var obj=parseQueryString(window.location.search);
	//obj['d']?time=decodeURI(obj['d']):time=5;
	if(obj['d']){
		time=decodeURI(obj['d']);
	}else if(obj['datetime']){
		time=5;
	}
	obj['filterByTag']&&(type=decodeURI(obj['filterByTag']));
	obj['city']&&(city=decodeURI(obj['city']));
	
	jQuery('#time div[data-value='+time+']').addClass('act3');
	jQuery('#time div[data-value='+time+']').css('color','#FFF');
	jQuery('#type div[data-value='+type+']').addClass('act3');
	jQuery('#city div[data-value='+city+']').addClass('act3');
	//jQuery('#city div[data-value='+jQuery('#trainTime3').html()+']').addClass('act3');
	if (decodeURI(obj['news'])=='最新发布') {
		jQuery('#news a[data-value=最新发布]').addClass('act-latest');
	}else if (decodeURI(obj['news'])=='热门活动') {
		jQuery('#news a[data-value=最新发布]').removeClass('act-latest');
		jQuery('#news a[data-value=热门活动]').addClass('act-hot');
	}else if (decodeURI(obj['news'])=='最多参与') {
		jQuery('#news a[data-value=最新发布]').removeClass('act-latest');
		jQuery('#news a[data-value=最多参与]').addClass('act-ess');
	}




//问答列表页的右侧导航栏部分
//alert(jQuery('.quick-nav li').length);
for (var i=0;i<jQuery('.quick-nav li').length;i++) {
	if (i%2==0) {
		jQuery('.quick-nav li').eq(i).children().css('margin-right',9);
	}
}


//活动专区的活动列表
//alert(jQuery('.act-apply').length);
for(var i=1;i<jQuery('.act-apply').length;i++){
	jQuery('.act-apply').eq(4*i-1).css('margin-right',0);
}


//弹窗部分
var timer=null;
	jQuery('.share').click(function(){
		jQuery('.tanc').css('display','block').html("分享成功！！！！！！！！！");
	});
	jQuery('.attention').click(function(){
		jQuery('.tanc').css('display','block').html("关注成功！！！！！！！！！");
	});
	jQuery('.store').click(function(){
		jQuery('.tanc').css('display','block').html("收藏成功！！！！！！！！！");
	});
	jQuery('.against').click(function(){
		jQuery('.tanc').css('display','block').html("反对成功！！！！！！！！！");
	});
	jQuery('.support').click(function(){
		jQuery('.tanc').css('display','block').html("支持成功！！！！！！！！！");
	});
	clearInterval(timer);
	timer=setInterval(function(){
		jQuery('.tanc').css('display','none');
	},3000);

});

jQuery(function(){	
var toolpos=(jQuery(window).width()/2)+600;
		jQuery('#scrolltop').css('left',toolpos);
jQuery(window).scroll(function(){
			if(jQuery(window).scrollTop()>700)
		    jQuery('#scrolltop').show();
			else
			jQuery('#scrolltop').hide();
		})
})