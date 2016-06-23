var zt_waa_host = "http://waa.zhetao.com/"; // WAA Basic URL
var _waa_id = "ZTWAAFloatWindows";

function ZTDF(p,i,d){if(typeof(p[i]) == "undefined" || p[i] == "")return d;return p[i];}
var selfScript = document.getElementById(_waa_id);var __url = selfScript.src;var __sp = __url.split("?");var __params = new Array();
// ?eid=id&ll=dd
if(__sp.length > 1){var __pas = __sp[1];var __pass = __pas.split("&");for(var i = 0; i < __pass.length; i++){var ss = __pass[i].split("=");if(ss.length == 2){__params[ss[0]] = ss[1];}}}
function _gd(id, def){return ZTDF(__params, id, typeof(def) == "undefined" ? "" : def);}function _gdi(id, def){return parseInt(ZTDF(__params, id, typeof(def) == "undefined" ? "0" : def));}

// Parameters from the js url
var posi = _gdi("pos"); // Position of the WAA
var enp_id = _gd("enpId");
var user_id = _gd("userId");
var img_id = _gd("img_id", "01");
var lang_id = _gd("lang", "");
var u_domain = _gd("domain", "");

/* 0 - 不实时检测（服务器压力最小），1 - 实时检测当前企业的在线客服人数，2 - 实时列表所有在线客服人员的在线情况（带宽和服务器压力都很大） */
var waa_check_method = _gd("cm", "0");
/* 当waa_check_method = 0时，自动提示对话的间隔时间（* 200ms），为0的话不进行提示*/
var waa_auto_tip_time = _gdi("att");


var zt_waa_shell_string = '<div id="zt_waa_web_shell"></div>';
var _ztwebshell = new Object(); /* Zhetao Core JavaScript Shell, It must implements the ShellNotify Method*/
var zt_waa_tip_background = zt_waa_host + "waaskins/waa_tip_bg.gif";
var zt_waa_tip_logo = zt_waa_host + "waaskins/tiplogo.jpg";
zt_waa_tip_background = "";
var zt_waa_tip_text = "";
var zt_waa_tip_width = 400;
var zt_waa_tip_height = 150;
var zt_waa_tip_html = '<div id="zt_waa_web_tip_bg" onselectstart="return false;" style="display:none;overflow:hidden;position:absolute;z-index:2500;filter:alpha(opacity=50);-moz-opacity:0.5;opacity: 0.5;left:0;top:0;width:100%;height:100%;background-color:#ccc;">&nbsp;</div>';
zt_waa_tip_html += '<div id="zt_waa_web_tip" onselectstart="return false;" style="border:2px solid #f00;border-radius:20px;display:none;overflow:hidden;position:absolute;z-index:2506;background:url('+zt_waa_tip_background+');background-color:#dfdfdf;width:'+zt_waa_tip_width+'px;height:'+zt_waa_tip_height+'px;">';
zt_waa_tip_html += '<div style="width:100%;height:29px;overflow:hidden;cursor:move;" onmousedown="WAA_BeginTipDrag(this,event)" onmousemove="WAA_DragTipMove(this,event)" onmouseup="WAA_EndTipDrag(this,event)">&nbsp;</div>';
zt_waa_tip_html += '<div style="float:left;margin-top:0px;width:100px;height:100px;overflow:hidden;margin-left:10px;"><img src="'+zt_waa_tip_logo+'" width="100" height="100"/></div>';
zt_waa_tip_html += '<div style="float:left;margin-top:0px;overflow:hidden;width:260px;height:100px;overflow:hidden;margin-left:10px;">';
zt_waa_tip_html += '<div id="zt_waa_web_tip_text" style="font-size:14px;width:260px;height:70px;overflow:hidden;text-align:left;line-height:25px;"></div>';
zt_waa_tip_html += '<div id="zt_waa_buttons" style="text-align:right;width:260px;height:30px;overflow:hidden"><input type="button" onclick="waa_style.OnClick()" value="接受" id="zt_waa_botton_accept"/> <input type="button" onclick="WAA_Pop_NoTip()" value="稍候再说"/></div>';
zt_waa_tip_html += '</div></div>';

//============DragTest=========================
var waa_tip_hasdrag = false;
var dragBeginX = 0;
var dragBeginY = 0;
var dragOriX = 0;
var dragOriY = 0;
var tempobj = null;
var tempid = "dragtemp";
function WAA_getT(e){return e.target || e.srcElement;}
function WAA_getMouseX(e){
	return e.pageX ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;
}
function WAA_getMouseY(e){
	return e.pageY ? e.pageY : e.clientY + document.body.scrollTop  - document.body.clientTop;
}
function WAA_getRealLeft(o){
	var l = 0;
	while(o){
	  l += o.offsetLeft - o.scrollLeft;
	  o = o.offsetParent;
	}
	return(l);
}
function WAA_getRealTop(o){
	var t = 0;
	while(o){
	  t += o.offsetTop - o.scrollTop;
	  o = o.offsetParent;
	}
	return(t);
}

function WAA_BeginTipDrag(obj,ee)
{
	if(waa_tip_hasdrag)return; /// 正在拖动
	
	var e = ee ? ee : window.event;
	if(obj.setCapture)
		obj.setCapture();
	else if(window.captureEvents)
		window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);

	obj = obj.parentNode;
	dragBeginX = WAA_getMouseX(e);
	dragBeginY = WAA_getMouseY(e);
	dragOriX = WAA_getRealLeft(obj);
	dragOriY = WAA_getRealTop(obj);
	
	tempobj = obj.cloneNode(false); //临时插入块
	obj.parentNode.insertBefore(tempobj, obj);
	tempobj.id = tempid;
	  
	with(tempobj.style)
	{
		 width = obj.offsetWidth + "px";
		 height = (obj.offsetHeight) + "px";
		 border = "2px dotted red";
		 margin = "0 0 8px 0";
		 zIndex = "2501";
	}

	waa_tip_hasdrag = true;
}
function WAA_EndTipDrag(obj,ee)
{
	if(waa_tip_hasdrag)
	{
		var e = ee ? ee : window.event;
		var x = WAA_getMouseX(e);
		var y = WAA_getMouseY(e);
		if(obj.releaseCapture)
		{
			obj.releaseCapture();
		}
		else if(window.captureEvents)
			window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
		
		obj = obj.parentNode;
		obj.style.left = (x - (dragBeginX - dragOriX)) + "px";
		obj.style.top = (y - (dragBeginY - dragOriY)) + "px";
		obj.parentNode.removeChild(tempobj);
		
	}
	
	waa_tip_hasdrag = false;
}
function WAA_DragTipMove(obj, ee)
{
	obj = obj.parentNode;
	if(waa_tip_hasdrag)
	{
		var e = ee ? ee : window.event;
		var x = WAA_getMouseX(e);
		var y = WAA_getMouseY(e);
		obj.style.left = (x - (dragBeginX - dragOriX)) + "px";
		obj.style.top = (y - (dragBeginY - dragOriY)) + "px";
	}
}
//=============DragTestEnd=================

function waag(id){return document.getElementById(id);}
function waaupimg(id, src){var o = waag(id);if(o)o.src = src;}

document.write(zt_waa_shell_string);
document.write(zt_waa_tip_html);

var zt_waa_tip_window = waag("zt_waa_web_tip");
var zt_waa_tip_window_text = waag("zt_waa_web_tip_text");
var zt_waa_tip_bg = waag("zt_waa_web_tip_bg");

function WAA_getCookie(name) {
	try{
		var offset = document.cookie.indexOf(name+"=");
		if (offset != -1) {
		  offset += name.length+1;
		  var end = document.cookie.indexOf(";", offset);
		  if (end == -1)
			end = document.cookie.length;
		  return unescape(document.cookie.substring(offset, end));
		}else return "";
	}catch(e){}
	return "";
}
function WAA_setCookie(name, value) {
    document.cookie = name + "=" + escape(value) + "" + ((u_domain && u_domain != null && u_domain != "") ? ("; domain=" + u_domain) : "");
}


// ZT-Web WAA Core Object And Real Control System
var waa_style = new Object();
waa_style.width = _gdi("waa_width", "105");
waa_style.height = _gdi("waa_height", "105");
waa_style.UpdateStatus = null;
waa_style.UpdateOnlineUser = null;
waa_style.position = posi; // 0 - 左上角, 1 - 右上角， 2 - 左下角， 3 - 右上角
waa_style.offsetX = _gdi("offsetx"); // X方向的位移
waa_style.offsetY = _gdi("offsety"); // Y方向的位移
waa_style.FloatDivId = "WAA_ZT_FLOAT_ID";
waa_style.obj = null; // 浮动窗口对象
waa_style.RePositionWindow = null;
waa_style.checkperid = 75; // 多少个浮动窗口周期检测一次在线情况
waa_style.floatInterval = 200;
waa_style.onlineStatus = true;

waa_style.waaId = _waa_id;

waa_style.subid = img_id;

waa_style.onlineImgSrc = "site/skins/eve1/images/waa/waa[IMG_ID].gif";
waa_style.offlineImgSrc = "site/skins/eve1/images/waa/offwaa[IMG_ID].gif";
var sdef_img = zt_waa_host + waa_style.onlineImgSrc.replace("[IMG_ID]", waa_style.subid);
waa_style.html = '<div id="WAA_ZT_FLOAT_ID" onclick="waa_style.OnClick(event);" title="" style="z-index:2500;cursor:pointer;width:'+waa_style.width+'px;height:'+waa_style.height+'px;display:block;overflow:hidden;position:absolute;left:10px;top:10px;"><img id="WAA_ZT_FLOAT_IMG_ID" src="'+sdef_img+'" width="'+waa_style.width+'" height="'+waa_style.height+'" align="absmiddle"/></div>';
waa_style.serviceCount = 0; // 在线客服数
waa_style.enpId = enp_id;
waa_style.userId = user_id;
waa_style.inviteFlag = WAA_getCookie("waa_invite_flag"); // 空-没有邀请过，1 - 已邀请，2 - 用户禁止(不再弹出)

waa_style.SetOnline = function()
{
	if(waa_style.onlineStatus)return; // 本身就是在线的
	var ic = zt_waa_host + waa_style.onlineImgSrc.replace("[IMG_ID]", waa_style.subid);
	waag("WAA_ZT_FLOAT_IMG_ID").src = ic;
	waa_style.onlineStatus = true;
}
waa_style.SetOffline = function()
{
	if(!waa_style.onlineStatus)return; 
	var ic = zt_waa_host + waa_style.offlineImgSrc.replace("[IMG_ID]", waa_style.subid);
	waag("WAA_ZT_FLOAT_IMG_ID").src = ic;
	waa_style.onlineStatus = false;
}

function _ENC(str){
	var i,c,ret="",strSpecial="!\"#$%&'()*+,/:;<=>?@[\]^`{|}~%";
	for(i=0;i<str.length;i++){
		if(str.charCodeAt(i)>= 256){
			c=str.charCodeAt(i);
			ret+="\\u"+c.toString(16);
		}
		else{
			c=str.charAt(i);
			if(strSpecial.indexOf(c)!=-1)
				ret+="%"+str.charCodeAt(i).toString(16);
			else
				ret+=c;
		}
	}
	return ret;
}

var __ref = "";
if(document.referrer)__ref = document.referrer; 
else __ref = "";
__ref = _ENC(__ref);

// 打开聊天窗口
waa_style.OnClick = function(ee)
{
	//WAA_Pop_Invite("das", "fdsa", "fdsa", "fdsa");
	var waawin = null;
	var url = zt_waa_host + "webchat.demo?enpId="+enp_id+"&userId=" + user_id + "&lang="+lang_id+"&sid=&from="+__ref+"&cur=" + _ENC(window.location.href);
	var left = screen.width / 2 - 310;
	var top = screen.height / 2 - 225;
	waawin = window.open(url, "ZT_WAA_WINDOWS_" + enp_id + "_" + user_id, "left="+left+",top="+top+",width=700,height=500,resizable=yes");
	if(!waawin)
	{
		alert("聊天窗口被阻止，请按住CTRL键再点或是关闭弹出窗口程序再试一次。");
	}else
	{
		WAA_Pop_Close();
	}
}


waa_style.RePositionWindow = function()
{
	if(waa_style.obj == null)
	{
		waa_style.obj = waag(waa_style.FloatDivId);
	}
	//alert(WAA_GetScLeft() + "/" + WAA_GetScTop());
	if(waa_style.obj)
	{
		var o = waa_style.obj;
		var x, y;
		switch(waa_style.position)
		{
		case 1: // LeftTop
			if(WAABrowser.isFirefox && waa_style.offsetX == 0)waa_style.offsetX = -30;
			x = WAA_GetScLeft() + WAA_GetBCW() - waa_style.width + waa_style.offsetX;
			y = WAA_GetScTop() + waa_style.offsetY;
			break;
		case 2:
			if(WAABrowser.isFirefox && waa_style.offsetY == 0)waa_style.offsetY = -30;
			x = WAA_GetScLeft() + waa_style.offsetX;
			y = WAA_GetScTop() + WAA_GetBCH() - waa_style.height + waa_style.offsetY;
			break;
		case 3:
			if(WAABrowser.isFirefox && waa_style.offsetX == 0)waa_style.offsetX = -30;
			if(WAABrowser.isFirefox && waa_style.offsetY == 0)waa_style.offsetY = -30;
			x = WAA_GetScLeft() + WAA_GetBCW() - waa_style.width + waa_style.offsetX;
			y = WAA_GetScTop() + WAA_GetBCH() - waa_style.height + waa_style.offsetY;
			break;
		default:
			x = WAA_GetScLeft() + waa_style.offsetX;
			y = WAA_GetScTop() + waa_style.offsetY;					
		}
		//var p = o.parentNode;
		//var ry = getRealTop(p);
		o.style.left = (x) + "px";
		o.style.top = (y) + "px";
		o.style.width = waa_style.width + "px";
		o.style.height = waa_style.height + "px";
		//o.title = WAA_GetScLeft() + "/" + WAA_GetScTop() + "/x:" + x + "/y:" + y + "/" + o.style.top;
	}
}


var WAABrowser = new Object();
WAABrowser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined');
WAABrowser.isIE = window.ActiveXObject ? true : false;
WAABrowser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
WAABrowser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
function WAADefineCPair()
{
	if(HTMLElement) // For Support for fire fox
	{
		HTMLElement.prototype.insertAdjacentHTML=function(where, html)
		{
		  var e=this.ownerDocument.createRange();
		  e.setStartBefore(this);
		  e=e.createContextualFragment(html);
		  switch (where)
		  {
			case 'beforeBegin': this.parentNode.insertBefore(e, this);break;
			case 'afterBegin': this.insertBefore(e, this.firstChild); break;
			case 'beforeEnd': this.appendChild(e); break;
			case 'afterEnd':
			  if(!this.nextSibling) this.parentNode.appendChild(e);
			  else this.parentNode.insertBefore(e, this.nextSibling); break;
		  }
		};
	}
}
if (WAABrowser.isFirefox) { // 
	WAADefineCPair();
}

function WAA_GetScLeft()
{
	var ai = parseInt(document.documentElement.scrollLeft);
	var bi = parseInt(document.body.scrollLeft);
	if(WAABrowser.isFirefox || WAABrowser.isMozilla)return window.pageXOffset;
	return ai > bi ? ai : bi;
}
function WAA_GetScTop()
{
	var ai = parseInt(document.documentElement.scrollTop);
	var bi = parseInt(document.body.scrollTop);
	if(WAABrowser.isFirefox || WAABrowser.isMozilla)return window.pageYOffset;
	return ai > bi ? ai : bi;
}

function WAA_GetBCH()
{
	var bodyCH = 0;
	if(window.innerHeight)
	{
		bodyCH=window.innerHeight;
	}
	else if(document.documentElement&&document.documentElement.clientHeight)
	{ 
		bodyCH=document.documentElement.clientHeight; 
	}
	else if(document.body)
	{
		bodyCH=document.body.clientHeight;
	}
	return bodyCH;
}
function WAA_GetBCW()
{
	var bodyCW = 0;
	if(window.innerWidth)
	{
		bodyCW=window.innerWidth;
	}
	else if(document.documentElement&&document.documentElement.clientWidth)
	{ 
		bodyCW=document.documentElement.clientWidth;
	}
	else if(document.body)
	{
		bodyCW=document.body.clientWidth; //author: meizz
	}
	return bodyCW;
}


function SelectStyle(styleId)
{
	if(styleId == 0)
	{
		waa_style.UpdateStatus = function(online)
		{
			if(online)
			{
				var src = waa_style.onlineImgSrc.replace("[IMG_ID]", waa_style.subid);
				waaupimg(WAA_ZT_FLOAT_IMG_ID, zt_waa_host + src);
			}else{
				var src = waa_style.offlineImgSrc.replace("[IMG_ID]", waa_style.subid);
				waaupimg(WAA_ZT_FLOAT_IMG_ID, zt_waa_host + src);
			}
		}
	}
	document.write(waa_style.html);
	if(waa_style.RePositionWindow)waa_style.RePositionWindow();
}

// 选择0 - 样式
SelectStyle(0);

var waaShell = document.getElementById("zt_waa_web_shell"); // Waa JavaScript RealTime Shell


/* 解析XML字符串为XML节点 */
function XML_DOM_WAA(sXml)
{
	var xmlDoc = null;
	var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined');
	var ie = (typeof window.ActiveXObject != 'undefined');
	if (moz) {
		//xmlDoc = document.implementation.createDocument("", "doc", null);//创建FIREFOX下XML文档对象 
		var oParser= new DOMParser();
		xmlDoc = oParser.parseFromString(sXml, "text/xml");
	}else if(ie){
		xmlDoc = new ActiveXObject("MSXML2.DOMDocument");
		xmlDoc.async = false;
		xmlDoc.loadXML(sXml);
	}
	return xmlDoc;
}

//===============WAA-Functions===========================//
/* 处理XML的通知 */
var hasNotice = false;
var ChatNow = false;
var _HN = new Array();
var WAA_TIP_WINDOW = false;
function WAA_XMLT(n)
{
	if(!n)return "";
	if(n.firstChild)return n.firstChild.nodeValue == null ? "" : n.firstChild.nodeValue;
	return n.nodeValue == null ? "" : n.nodeValue;
}
function WAA_Pop_NoTip() // 关闭Invite窗口，并且以后都不要再提醒
{
	WAA_TIP_WINDOW = false;
	zt_waa_tip_window.style.display = "none";
	zt_waa_tip_bg.style.display = "none";
	WAA_setCookie("waa_invite_flag", "2");
}
function WAA_Pop_Close() // 关闭Invite窗口，并且以后都不要再提醒
{
	WAA_TIP_WINDOW = false;
	zt_waa_tip_window.style.display = "none";
	zt_waa_tip_bg.style.display = "none";
	WAA_setCookie("waa_invite_flag", "1");
}
function WAA_Pop_Invite(u, un, k, a)
{
	//zt_waa_tip_window
	//zt_waa_tip_window_text
	zt_waa_tip_window_text.innerHTML = "来自 <span style=\"font-weight:bold;color:#800\">" + a + "</span> 的朋友 您好，<span style=\"font-weight:bold;color:#00f\">" + u + "</span> 邀请您加入咨询对话中。若现在参与对话，请点击\"<b>接受</b>\"；不参与对话，请点击\"<b>稍候再说</b>\"。";
	
	
	WAA_ReSizeTIPPosition();
	
	zt_waa_tip_window.style.display = "block";
	zt_waa_tip_bg.style.display = "block";
	
	WAA_TIP_WINDOW = true;
}
function WAA_ReSizeTIPPosition()
{
	var x = WAA_GetScLeft() + WAA_GetBCW() / 2 - zt_waa_tip_width / 2;
	var y = WAA_GetScTop() + WAA_GetBCH() / 2 - zt_waa_tip_height / 2 - 100;
	
	var rx = WAA_getRealLeft(zt_waa_tip_window);
	var ry = WAA_getRealTop(zt_waa_tip_window);
	
	if(rx <= WAA_GetScLeft() || rx >= (WAA_GetBCW() + WAA_GetScLeft() - zt_waa_tip_window.offsetWidth) || ry <= WAA_GetScTop() || ry >= (WAA_GetBCH() + WAA_GetScTop() -  - zt_waa_tip_window.offsetHeight))
	{
		zt_waa_tip_window.style.left = x + "px";
		zt_waa_tip_window.style.top = y + "px";
	}
	
	var off = 10;
	if(WAABrowser.isFirefox)off = 30;
	zt_waa_tip_bg.style.left = WAA_GetScLeft() + "px";
	zt_waa_tip_bg.style.top = WAA_GetScTop() + "px";
	zt_waa_tip_bg.style.width = (WAA_GetBCW() - off) + "px";
	zt_waa_tip_bg.style.height = (WAA_GetBCH() - off) + "px";
	
}
function WAA_DoNotice(sXml)
{
	if(sXml == null || sXml == "")return; // /* 没有通知 */
	var ck = WAA_getCookie("waa_invite_flag");
	//if(ck == "2" || ck == "1")return; // 如果已经提示过或是用户禁止后，就不要再提示
	var n = new XML_DOM_WAA(sXml);
	if(n && n.childNodes)
	{
		var m = n.childNodes;
		var nn = null;
		for(var i = 0; i < m.length; i++)
		{
			hasNotice = true;
			nn = m[i];
		}
		if(nn != null)
		{
			var u = WAA_XMLT(nn.childNodes[0]);
			var un = WAA_XMLT(nn.childNodes[1]);
			var k = WAA_XMLT(nn.childNodes[2]);
			var a = WAA_XMLT(nn.childNodes[3]);
			WAA_Pop_Invite(u, un, k, a);
		}
	}
}
function WAA_OnlineUser(sid, sname, suserId, sipa)
{
	this.sessionId = sid;
	this.trueName = sname;
	this.userName = suserId;
	this.clientIpArea = sipa;
}
/* 更新在线图标的状态或是信息 sType - getsc,getlist,getall, sCount - 在线人数，sNoticeXML - 通知XML， sList - 在线人员列表(WAA_OnlineUser)*/
function WAA_UpdateOnline(sType, sCount, sNoticeXML, sList)
{
	//alert(sCount + "/" + sNoticeXML);
	if(sCount == "")waa_style.SetOffline();
	else
	{
		var i = parseInt(sCount);
		if(i <= 0)waa_style.SetOffline();
		else waa_style.SetOnline();
	}
	if(sNoticeXML != "")
	{
		WAA_DoNotice(sNoticeXML);
	}
}

_ztwebshell.ShellNotify = WAA_UpdateOnline; // Implements the web shell for the WAA Real Online Informations
var _waa_cookie_important_flag = 0;
var _waa_last_cookie_id = "";

waa_style.RefreshStatus = function()
{
	//alert("Refresh Server");
	/*if(ii > 3)ii = 1;
	WAA_setCookie("hello", Math.random() + "");
	*/
	var waa_cookie_random_id = WAA_getCookie("waacookierandomid");
	
	if(waa_cookie_random_id == "" && _waa_cookie_important_flag == 0) // 随机产生Cookie仅一次，否则就以空传到服务器
	{
		waa_cookie_random_id = parseFloat(100000000.0 * Math.random()) + "_" + new Date().getTime();
		_waa_cookie_important_flag++;
		_waa_last_cookie_id = waa_cookie_random_id;
		WAA_setCookie("waacookierandomid", waa_cookie_random_id);
	}else if(_waa_cookie_important_flag > 0)
	{
		waa_cookie_random_id = _waa_last_cookie_id;
	}
	
	waaShell.innerHTML = "";
    var myScript = document.createElement("script");
    myScript.type = "text/javascript"; 
    myScript.src = zt_waa_host + "webchatcheck.demo?enpId=" + enp_id + "&randomid="+waa_cookie_random_id+"&userId=" + user_id + "&cur="+_ENC(window.location.href)+"&ref="+__ref+"&rd=" + Math.random(); //test.js方法中有一个方法function test(){alert("test");}
    waaShell.appendChild(myScript); 
}

var waa_check_count = 0;
function WAA_FloatAction()
{
	if(waa_style.RePositionWindow)
	{
		waa_style.RePositionWindow();
	}
	if(waa_check_count > waa_style.checkperid)
	{
		waa_style.RefreshStatus();
		waa_check_count = 0;
	}else{
		waa_check_count++;
	}
	if(WAA_TIP_WINDOW)
	{
		WAA_ReSizeTIPPosition();
	}
	window.setTimeout("WAA_FloatAction()", waa_style.floatInterval);
}

WAA_FloatAction();
//waa_style.RefreshStatus(); /* 首先进行一次状态更新 */
setTimeout("waa_style.RefreshStatus()", 1000);