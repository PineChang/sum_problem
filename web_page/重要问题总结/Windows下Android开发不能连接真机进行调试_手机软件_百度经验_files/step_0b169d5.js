define("step:widget/ads/brand-ads/brand-ads.js",function(a,e,n){var t=a("common:widget/lib/tangram/base/base.js");n.exports.init=function(a){var e=[];e.push("type=brand_ad"),e.push("page=album"),e.push("aid="+a),e.push("eidenc="+F.context("eid")),e.push("t="+1*new Date);var n=t.dom.query(".brand-pro-wrap a"),i="/static/article/ui/log/log.gif";t.each(n,function(a,n){t.on(a,"click",function(){var a=document.createElement("img");a.src=i+"?"+e.join("&"),window["___article_brand_"+1*new Date+n]=a})})}});
;define("step:widget/content/content.js",function(e,n,t){e("common:widget/lib/tangram/base/base.js"),e("common:widget/lib/fis/event/event.js").eventCenter;t.exports.init=function(){}});
;define("step:widget/pager/pager.js",function(e,t,o){function n(e){var t=parseInt(r.dom.getStyle(e,"width"),10),o=parseInt(r.dom.getStyle(e,"height"),10);return t>450&&o>250}var r=e("common:widget/lib/tangram/base/base.js"),i=e("common:widget/lib/fis/event/event.js").eventCenter,a=e("common:widget/ui/log/log.js"),c=[],s={getQuery:function(){return{title:F.context("title")||"",tags:F.context("tags")||"",cate:F.context("cate")||""}},watchImagePlus:function(e){var t=this.getQuery();r.array.filter(c,function(o){var i=r.dom.query("img",o)[0],a=r.dom.getAttr(i,"src");a&&n(i)&&e({type:"stepload",img:i,item:o,query:t})}),i.on("EXP_ARTICLE_IMAGE_PLUS_LOAD",function(t){var o=t.imagePlus,r=o.img;n(r)&&e(o)})}};window.exp={imagePlus:s},o.exports=function(){var e=12,t=r.q("item"),o=r.q("step"),n=0,l=0,m=0,d=0,g=0,p=!1,u={},h=!1,f=function(){for(var o=0,n=t.length;n>o;o++)r.dom.setStyle(t[o],"display","none");for(var i=Math.min(g+e,t.length),o=g;i>o;o++)r.dom.setStyle(t[o],"display","block")},v=function(){r.array.each(o,function(e,t){var o=e.children[0];if(r.dom.hasClass(o,"preview")){var n,i,a=r.dom.create("p",{"class":"preview-data"}),c=r.dom.create("div",{"class":"triangle-icon"}),s=r.dom.getAttr(o,"data"),l=r.dom.getAttr(o,"data-type");0===+l?a.innerHTML=s:1===+l&&(n=F.context("hiori")+s+".jpg",i='<img src="'+n+'" width="80px" height="60px">',r.dom.insertHTML(a,"afterBegin",i),r.dom.addClass(a,"preview-img")),r.on(o,"mouseover",function(){r.dom.insertAfter(a,o),r.dom.insertAfter(c,o)}),r.on(o,"mouseout",function(){r.dom.remove(a),r.dom.remove(c)})}r.on(o,"click",function(){m!==t&&y(t)})}),r.g("pre")&&r.on("pre","click",function(){g>0&&(g=Math.max(g-e,0),f())}),r.g("next")&&r.on("next","click",function(){g+e<t.length&&(g=Math.min(g+e,t.length-e),f())}),i.on("stepPlay.left",function(){y(m-1)}),i.on("stepPlay.right",function(){y(m+1)}),r.on(document,"keydown",function(e){var t=e||window.event;r.event.stopPropagation(t),37===t.keyCode&&(u.keyboard_left=1,i.fire("stepPlay.left")),39===t.keyCode&&(u.keyboard_right=1,i.fire("stepPlay.right"))});var n=r.browser.firefox,a=n?"DOMMouseScroll":"mousewheel";r.on("body",a,function(e){r.event.preventDefault(e);var t=r.event.getTarget(e),o=r.dom.query("#step-item-"+m+" .tangram-scrollpanel-main");if(!(o.length>0&&r.dom.contains(o[0],t))){var n=r.event.get(e),a=n.detail?-n.detail:n.wheelDelta;0>a?(u.mousewheel_forward=1,i.fire("stepPlay.right")):(u.mousewheel_backward=1,i.fire("stepPlay.left"))}}),r.on("left-cover","mouseover",function(e){r.event.stopPropagation(e),r.dom.addClass("left-cover","cover-hover")}),r.on("left-cover","mouseout",function(e){r.event.stopPropagation(e),r.dom.removeClass("left-cover","cover-hover")}),r.on("left-cover","click",function(e){r.event.stopPropagation(e),u.left_btn_click=1,i.fire("stepPlay.left")}),r.on("right-cover","mouseover",function(e){r.event.stopPropagation(e),r.dom.addClass("right-cover","cover-hover")}),r.on("right-cover","mouseout",function(e){r.event.stopPropagation(e),r.dom.removeClass("right-cover","cover-hover")}),r.on("right-cover","click",function(e){r.event.stopPropagation(e),u.right_btn_click=1,i.fire("stepPlay.right")})},y=function(e,t){0>e||e>=n||p||(p=!0,w(e),x(e),P(e),t?(c=r.lang.toArray(r.dom.query(".step-img-wrapper",r.g("step-item-"+e))),u.page_show=1):(u.page_request=1,u.cid=F.context("cid")),u.expGroup=F.context("expGroup")||"G0",a.send(location.href,F.context("typeId"),u),u={},m=e)},w=function(n){r.q("current")[0]&&r.dom.removeClass(r.q("current")[0],"current"),r.dom.addClass(r.dom.children(o[n])[0],"current");var i=r.array.indexOf(t,o[n]),a=i-g;if(a>=0){if(e>a)return;for(;i>=g+e;)g=Math.min(g+e,t.length-e)}else do g=Math.max(g-e,0);while(g>i);f()},x=function(e){var t=920*(e-m),o=920*m,n=20,i=20,a=20,c=setInterval(function(){o+=t/n,r.dom.setStyle("step-play-list","left",-o),--i||(clearInterval(c),p=!1)},a)},_=function(e,t){if(e===n-1&&!h)return q(),void(h=!0);{var o=r.dom.query(".step-img-wrapper",r.g("step-item-"+e));r.dom.query(".step-img-wrapper",r.g("step-item-"+(e-1)))}r.array.each(o,function(t){var o=r.dom.getAttr(t,"imgLoaded");if("0"===o){r.dom.setAttr(t,"imgLoaded",1);{var n=r.dom.query("img",t)[0];r.dom.query(".step-img-wrapper",r.g("step-item-"+(e-1)))}A(n,r.dom.getAttr(n,"data-src"),function(e){r.dom.setAttr(e.item,"imgLoaded",2),r.dom.setAttr(e.img,"_height",parseInt(n.height)),r.dom.setAttr(e.img,"_width",parseInt(n.width));var t=r.dom.query(".img-cover",e.item)[0],o=r.dom.query(".inner-img-cover",e.item)[0];r.dom.setStyles(o,{height:n.height,width:n.width}),r.dom.setStyles(t,{height:n.height,width:n.width}),i.fire("adjustSingleImg",{container:e.item,resizedContainerHeight:r.dom.getStyle(e.item,"height")})},{item:t,img:n})}}),"flag"===t&&r.array.each(o,function(e){var t=r.dom.query("img",e)[0];i.fire("EXP_ARTICLE_IMAGE_PLUS_LOAD",{imagePlus:{type:"stepload",item:e,img:t,query:s.getQuery()}}),c.push(e)})},P=function(e){_(e,"flag"),n-1>e?(_(e+1),r.show("right-cover")):r.hide("right-cover"),0===e?r.hide("left-cover"):(_(e-1),r.show("left-cover"))},k=function(e,t,o){var n=new Image;n.onload=function(){var r=this.width,i=this.height,a=0,c=0;r/i>=t/o?(i=t/r*i,r=t,a=(o-i)/2):(r=o/i*r,i=o,c=(t-r)/2),e.style.left=c+"px",e.style.top=a+"px",e.style.width=r+"px",e.style.height=i+"px",n.onload=null,n=null},n.src=e.src},q=function(){r.ajax.get("/asyncreq?method=getRecommand&eidEnc="+F.context("eid"),function(e,t){var o=r.json.parse(t);if(0===o.errno){var n=o.data.recommendExpList;if(!n)return;var i=0,c=Math.min(n.length,5),s=[],l=null;for(s.push("<h3>你可能对这些经验也感兴趣</h3>");c>i;i++)l=n[i],s.push('<div class="recommend-exp '+(i===c-1?" last":"")+'">'),s.push('<div class="recommend-exp-image">'),s.push('<a class="recommend-exp-link" href="/album/'+l.eidEnc+'.html" target="_self">'),s.push('<img class="recommand-img" alt="'+l.title+'" src="'+F.context("hi")+l.picEnc+'.jpg" width="120px" height="90px">'),s.push('<div class="img-border"></div>'),s.push("</a>"),s.push("</div>"),s.push('<a class="recommend-exp-title" href="/album/'+l.eidEnc+'.html" target="_self" title="'+l.title+'">'+l.title+"</a>"),s.push("</div>");r.g("recommend-list-container").innerHTML=s.join(""),r.array.each(r.g("recommend-list-container").getElementsByTagName("img"),function(e){k(e,120,90)}),r.array.each(r.dom.query(".recommand-list .recommend-exp"),function(e){r.un(e,"click"),r.on(e,"click",function(){a.send(window.location.href,F.context("typeId"),{pos:"step_end_article",expGroup:F.context("expGroup")||"G0"})})})}}),r.on("replay-step","click",function(e){r.event.preventDefault(e),u.reread_btn_click=1,y(0)}),r.on("replay-step-e","click",function(e){r.event.preventDefault(e),u.reread_btn_click=1,y(0)});var e=r.dom.query(".replay-img .recommand-img")[0],t=r.dom.getAttr(e,"data-src");e.src=t},A=function(e,t,o,n){e||(e=new Image),e.onload=function(){o&&o(n),e.onload=null},e.src=t};return{init:function(i){return o.length<2?!1:(n=o.length,l=Math.ceil(t.length/e),m=i,d=parseInt(r.array.indexOf(t,o[i])/e,10)+1,g=(d-1)*e,f(),t.length<=e&&r.dom.setStyle("step-pager-list","width",40*t.length),v(),void y(i,1))}}}()});
;define("step:widget/ui/scrollbar/scrollbar.js",function(l,r,e){var o=l("common:widget/lib/tangram/ui/ScrollPanel/ScrollPanel.js");e.exports=o});
;define("step:widget/ui/adjust-size/adjust-size.js",function(e,t,i){var r=e("common:widget/lib/tangram/base/base.js"),o=e("common:widget/lib/fis/event/event.js").eventCenter,h=e("step:widget/ui/scrollbar/scrollbar.js");i.exports=function(){var e=600,t=1024,i=130,a=920,n=16,s={"brief-text-area":{height:330,width:325,spaceHeight:0},"img-text-area":{height:390,width:270,spaceHeight:52},"img-text-area-withhead":{height:390,width:270,spaceHeight:107}},d={"brief-info-img":{width:200,height:330},"step-only-img":{width:450,height:325},"step-one-img":{width:480,height:346},"step-two-img":{width:480,height:167},"step-three-img-top":{width:235,height:176},"step-three-img-bottom":{width:480,height:155}},g={},l=function(t){var o=t.ph,a=o/(e-i),n=r.q("step-text-wrapper");if(null==n||0==n.length)return!1;r.array.each(n,function(e){var t=r.dom.getAttr(e,"texttype");if(t){var i=Math.max(e.offsetHeight,e.scrollHeight),o=s[t];if(i<o.height){if("brief-text-area"==t){var n=(o.height*a-i)/2;r.dom.setStyles(e,{position:"absolute",top:n}),r.dom.setStyle("brief-left-quote","top",n),r.dom.setStyle("brief-right-quote","bottom",o.height*a-i-n)}}else{var d=r.dom.getAttr(e,"id");if(r.dom.setStyle(e,"height",o.height*a-o.spaceHeight),g[d])g[d].update({container:d,element:d,overflow:"overflow-y"});else{var l=new h({container:d,element:d,overflow:"overflow-y"});l.render(d),g[d]=l}}}});var d=r.q("step-item-text-inner");if(null==d||0==d.length)return!1;var l=r.page.getViewHeight();r.array.each(d,function(e){var t=r.dom.query(".smaller-text-left",e)[0],i=r.dom.query(".bigger-text-left",e)[0],o=r.dom.query(".smaller-text-right",e),a=r.dom.query(".bigger-text-right",e);if(o.length>0){var n=o[0];if(n.offsetHeight>336&&!r.dom.hasAttr(n,"hasLoaded")){var s=r.dom.getAttr(n,"id");r.dom.setStyle(n,"height",336);var d=new h({container:s,element:s,overflow:"overflow-y"});d.render(s),g[s]=d,r.dom.setAttr(n,"hasLoaded",1)}}if(a.length>0){var m=a[0];if(m.offsetHeight>448&&!r.dom.hasAttr(m,"hasLoaded")){var s=r.dom.getAttr(m,"id");r.dom.setStyle(m,"height",448);var d=new h({container:s,element:s,overflow:"overflow-y"});d.render(s),g[s]=d,r.dom.setAttr(m,"hasLoaded",1)}}if(l>700){r.hide(t),r.show(i);var f=r.dom.query(".step-smaller-text-right-contanier",e),p=r.dom.query(".step-bigger-text-right-contanier",e);f.length>0&&r.hide(f[0]),p.length>0&&r.show(p[0])}else{r.show(t),r.hide(i);var f=r.dom.query(".step-smaller-text-right-contanier",e),p=r.dom.query(".step-bigger-text-right-contanier",e);f.length>0&&r.show(f[0]),p.length>0&&r.hide(p[0])}})},m=function(e){var t=e.container,i=parseInt(e.resizedContainerHeight),o=r.dom.getAttr(t,"stepType"),h=r.dom.query("img",t)[0],a=r.dom.query(".img-cover",t)[0],n=r.dom.getAttr(h,"_height");n>i?r.dom.setStyle(a,"margin-top",(i-n)/2):r.dom.setStyle(a,"margin-top",0),("brief-info-img"==o||"step-only-img"==o)&&r.dom.setStyles(a,{"margin-top":(i-n)/2,left:(d[o].width-r.dom.getAttr(h,"_width"))/2})},f=function(t){var h=t.ph,a=h/(e-i),n=r.q("step-img-wrapper");return null==n||0==n.length?!1:void r.array.each(n,function(e){var t=r.dom.getAttr(e,"stepType");if(t){var i=d[t].height*a;r.dom.setStyle(e,"height",i);var h=r.dom.getAttr(e,"imgLoaded");"2"==h&&o.fire("adjustSingleImg",{container:e,resizedContainerHeight:i})}})},p=function(t){var o=t.ph,h=t.pw,s=0,d=(h-(a+n))/2;r.dom.setStyle("body","height",o),r.dom.setStyles("left-cover",{height:o,width:d}),r.dom.setStyles("right-cover",{height:o,width:d+n}),r.dom.setStyle("step-play-container","left",d),r.g("brief-writer-info")&&r.dom.setStyle("brief-writer-info","height",469*o/(e-i)),r.g("brief-right-quote")&&r.dom.setStyle("brief-right-quote","display","block"),s=h>=1140?d:110,r.dom.setStyle("exp-title","left",s);var g=parseInt(r.dom.getCurrentStyle("step-search-form","width")),l=r.g("exp-title").offsetWidth,m=parseInt(r.dom.getCurrentStyle("keyword","width")),f=l+s,p=h-150-f;350>p?(form_left=f+20,m=p-100,g=p):(m=250,form_left=h-150-330,g=330),r.dom.setStyle("step-search-form","left",form_left),r.dom.setStyle("step-search-form","width",g),r.dom.setStyle("keyword","width",m)};return{init:function(e){r.object.extend(s,e),o.on("adjustSize",function(e){p(e),l(e),f(e)}),o.on("adjustSingleImg",function(e){m(e)}),r.dom.setStyle("step-search-form","display","block"),r.on("step-search-form","submit",function(e){""==r.trim(r.g("keyword").value)?window.location.reload(!0):this.submit(),r.event.preventDefault(e)})},resize:function(h){var a=r.page.getViewHeight(),n=r.page.getViewWidth();a=Math.max(a,e)-i,n=Math.max(n,t),(a>e-i||n>t||h)&&o.fire("adjustSize",{ph:a,pw:n})}}}()});
;define("step:widget/ui/brand-ads/brand-ads.js",function(a,e,n){var t=a("common:widget/lib/tangram/base/base.js");n.exports.init=function(a){var e=t.dom.query(".brand-pro-wrap a"),n="/static/article/ui/log/log.gif";t.each(e,function(e){t.on(e,"click",function(){var e=[];e.push("type=brand_ad"),e.push("page=album"),e.push("aid="+a),e.push("eidenc="+F.context("eid"));var t=Math.round((new Date).getTime()/1e3);e.push("t="+t);var i=document.createElement("img");i.src=n+"?"+e.join("&"),window["___article_brand_"+1*new Date]=i})})}});
;define("step:widget/ui/step-album/step-album.js",function(t,e,i){var n=t("common:widget/lib/tangram/base/base.js"),s=t("common:widget/ui/album/album.js");i.exports.init=function(){n.on("step-play-list","click",function(t){n.event.stopPropagation(t);var e=n.event.getTarget(t);if(n.dom.hasClass(e,"inner-img-cover")){for(var i=n.dom.getAttr(e,"data-src"),a=F.context("stepPic").stepPic,o=0,c=a.length;c>o&&!(a[o].src.indexOf(i)>-1);o++);s.initAlbum(o,F.context("stepPic"))}})}});
;define("step:widget/ui/user-guide/user-guide.js",function(e,i,t){var d=e("common:widget/lib/tangram/base/base.js");e("common:widget/lib/tangram/fx/fadeOut/fadeOut.js"),t.exports={init:function(){if(d.cookie.get("isStepGuided"))return!1;var e=d.dom.create("div",{"class":"guide-container"});e.innerHTML="<img src='http://img.baidu.com/img/iknow/exp/step/user-guide.gif'/>";var i=d.g("step-play-container");i.appendChild(e),d.dom.setStyle(e,"top",(i.offsetHeight-220)/2),setTimeout(function(){d.fx.fadeOut(e),d.cookie.set("isStepGuided","done",{path:"/"})},2e3)}}});
;define("step:widget/ui/vote-favor/vote-favor.js",function(e,i,t){var n=e("common:widget/lib/tangram/base/base.js"),o=e("common:widget/ui/dialog/dialog.js"),a=e("common:widget/ui/favor/favor.js"),d=(e("common:widget/ui/error/error.js"),e("common:widget/ui/ajax/ajax.js"),e("common:widget/lib/fis/event/event.js").eventCenter),s={eidEnc:"",feedbackData:{useful:{id:"",type:4,hadFeedback:!1,hasClass:"voted"},favor:{id:"",type:0,hadFeedback:!1,hasClass:"favored"}},init:function(e,i,t){if(null!==e&&""!==e&&null!==i&&""!==i){var o=this,a=o.feedbackData;a.useful.id=e,a.favor.id=i,a.favor.hadFeedback=t,o.eidEnc=F.context("eid"),n.cookie.get(o.eidEnc)&&(n.dom.addClass(a.useful.id,a.useful.hasClass),a.useful.hadFeedback=!0),o.bindEvent(a.useful),o.bindEvent(a.favor)}},bindEvent:function(e){var i=this,s=e.id,r=function(t){var a=[];a.push("method=feedback"),a.push("eidEnc="+F.context("eid")),a.push("BdStoken="+F.context("BdStoken")),a.push("bdstt="+F.context("bdstt")),a.push("type=4"),t&&a.push("isCost=1"),a=a.join("&"),d.fire("login.check",{isLogin:function(){var d=F.context("isLogin");return d?void n.ajax.post("/submit/exp",a,function(a,d){if(""!==d){var s=n.json.parse(d);if(0==s.errno){var c=n.dom.query("#vote-btn .num");if(c){var f=parseInt(c.innerHTML);c.innerHTML=f+1}if(t)return;i.hasFeedback(e)}else 2001==s.errno?o.confirm("经验提示",{info:'<div class="exp-has-used">您已对该篇经验进行了投票，再次投票需要消耗20财富值？</div>',width:300,height:120,onconfirm:function(){r(!0)}}):2040==s.errno?o.alert("经验提示",{info:'<p class="exp-tip">您的财富值不够</p>',width:300,height:120}):2041==s.errno&&o.alert("经验提示",{info:'<p class="exp-tip">您不能给自己的经验投票</p>',width:300,height:120})}}):void window.location.reload(!0)}})};n.event.on(s,"click",function(){if(e.hadFeedback||this.className.indexOf(e.hasClass)>-1,e.type){if(e.hadFeedback=!0,F.context("feedbackSuc")>=F.context("MAX_SUC_FAIL_TIMES"))return void o.alert("提示",{info:"数量已达上限",width:300,height:200});r(),n.sio.callByBrowser("http://like.baidu.com/set?key="+F.context("eid")+"&cb=setVoteData&type=0&like=1&pid=4&index=0&sub_index=0&random="+Math.random()),window.setVoteData=function(){}}else{var i=function(){t.exports.hasFeedback(e)};a.favor(F.context("eid"),i)}})},hasFeedback:function(e){var i=this,t=e.id,o=n.dom.query("#"+t+" .num")[0];o.innerHTML=parseInt(o.innerHTML)+1,n.dom.addClass(t,e.hasClass),e.type&&n.cookie.set(i.eidEnc,1,{path:"/"})}};t.exports=s});