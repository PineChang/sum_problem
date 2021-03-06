// JavaScript Document
// container div
var zt_oms_static_pages_cur_uri_ui = "";
if((typeof(zt) + "") != "undefined" && (typeof(zt.base) + "") != "undefined")zt_oms_static_pages_cur_uri_ui = zt.base;
function __(id){return document.getElementById(id);}
function rp(str,o,n)
{
	var i = 0;
	i = str.indexOf(o);
	var ret = str;
	while(i>=0)
	{
		ret = ret.replace(o,n);
		i = ret.indexOf(o);
	}
	return ret;
}

var ztui = ztui || {};
ztui.useraction = "omsusers.oms"; // Old for omsusers.oms
ztui.useractions = "omsusers"; // Old for omsusers.oms

ztui.DLGHTML = '<div class="dbox" id="ZTUI_DLG_[UIID]" style="position:absolute;display:none;z-index:99999999">'+
			'<div class="tb" id="ZTUI_DLG_TB_[UIID]" style="cursor:move" onmousedown="ztui.dlg.BeginTipDrag(this, \'[UIID]\', event)" onmousemove="ztui.dlg.DragTipMove(this, \'[UIID]\', event)" onmouseup="ztui.dlg.EndTipDrag(this, \'[UIID]\', event)">'+
			'	<div class="l">&nbsp;</div>'+
			'	<div class="c" id="ZTUI_DLG_TBC_[UIID]">&nbsp;</div>'+			
			'	<div class="r">&nbsp;</div>'+			
			'	<div class="ro" id="ZTUI_DLG_CLOSE_[UIID]" onclick="ztui.dlg.close(\'[UIID]\')" style="cursor:pointer;margin-left:3px;">['+__l("close")+']</div>'+
			'	<div class="ro" id="ZTUI_DLG_MAX_[UIID]" onclick="ztui.dlg.domax(\'[UIID]\')" style="cursor:pointer;margin-left:3px">['+__l("max")+']</div>'+
			'</div>'+
			'<div class="ct" id="ZTUI_DLG_CT_[UIID]">'+
			'	<div class="l" id="ZTUI_DLG_CTCL_[UIID]">&nbsp;</div>'+
			'	<div class="c" id="ZTUI_DLG_CTC_[UIID]" style="text-align:left">&nbsp;</div>'+
			'	<div class="r" id="ZTUI_DLG_CTCR_[UIID]">&nbsp;</div>'+
			'</div>'+
			'<div class="bt" id="ZTUI_DLG_BT_[UIID]">'+
			'	<div class="l">&nbsp;</div>'+
			'	<div class="c" id="ZTUI_DLG_BTC_[UIID]">&nbsp;</div>'+
			'	<div class="r">&nbsp;</div>'+
			'</div>'+
		'</div>';
ztui.BACK_DIV = '<div id="BACK_DIV_FOR_TIP_UI" onmousedown="ztui.dlg.__HANDLE_BLACK_CC()" onmouseover="ztui.dlg.ResizeBG()" onmouseout="ztui.dlg.ResizeBG()" style="display:none;position:absolute;border:none;filter:alpha(opacity=30);-moz-opacity:0.3;opacity: 0.3;left:0;top:0;background-color:#005A87;z-index:99988"></div>';
ztui.win = ztui.win || {};
ztui.win.w = function()
{
	var bodyCW = 0;
	if(window.innerWidth)
	{bodyCW=window.innerWidth;}
	else if(document.documentElement&&document.documentElement.clientWidth)
	{ bodyCW=document.documentElement.clientWidth;}
	else if(document.body)
	{bodyCW=document.body.clientWidth;}
	return bodyCW;
}
ztui.win.h = function()
{
	var bodyCH = 0;
	if(window.innerHeight)
	{bodyCH=window.innerHeight;}
	else if(document.documentElement&&document.documentElement.clientHeight)
	{ bodyCH=document.documentElement.clientHeight;}
	else if(document.body)
	{bodyCH=document.body.clientHeight;}
	return bodyCH;
}
ztui.win.sl = function()
{
	var ai = parseInt(document.documentElement.scrollLeft);
	var bi = parseInt(document.body.scrollLeft);
	return ai > bi ? ai : bi;
}
ztui.win.st = function()
{
	var ai = parseInt(document.documentElement.scrollTop);
	var bi = parseInt(document.body.scrollTop);
	return ai > bi ? ai : bi;
}

ztui.win.mx = function(e){
	return e.pageX ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;
}
// + document.body.scrollTop
ztui.win.my = function(e){
	return e.pageY ? e.pageY : e.clientY + document.body.scrollTop  - document.body.clientTop;
}
ztui.win.rl = function(o){
	var l = 0;
	while(o){
	  l += o.offsetLeft - o.scrollLeft;
	  o = o.offsetParent;
	}
	return(l);
}
ztui.win.rt = function(o){
	var t = 0;
	while(o){
	  t += o.offsetTop -o.scrollTop;
	  o = o.offsetParent;
	}
	return(t);
}

ztui.win.web_dlg_changeOpac = function(opacity, id, mmax) { 
    var object = document.getElementById(id).style; 
    object.opacity = (opacity / 100); 
    object.MozOpacity = (opacity / 100); 
    object.KhtmlOpacity = (opacity / 100); 
    object.filter = "alpha(opacity=" + opacity + ")"; 
	var cc = __(id);
	if(opacity == 0)cc.style.display = "none";
	else if(opacity == 30)cc.style.display = "block";
}
ztui.win.web_dlg_opacity = function(id, opacStart, opacEnd, millisec) { 
    //speed for each frame 
    var speed = Math.round(millisec / 100); 
    var timer = 0; 
    //determine the direction for the blending, if start and end are the same nothing happens 
    if(opacStart > opacEnd) { 
        for(i = opacStart; i >= opacEnd; i--) { 
            setTimeout("ztui.win.web_dlg_changeOpac(" + i + ",'" + id + "')",(timer * speed)); 
            timer++; 
        } 
    } else if(opacStart < opacEnd) { 
        for(i = opacStart; i <= opacEnd; i++) 
            { 
            setTimeout("ztui.win.web_dlg_changeOpac(" + i + ",'" + id + "')",(timer * speed)); 
            timer++; 
        } 
	}
}

var Browser = Browser || {};
Browser.isMozilla = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined');
Browser.isIE = window.ActiveXObject ? true : false;
Browser.isie6 = navigator.userAgent.toUpperCase().indexOf("MSIE 6.") > 0;
Browser.isie7 = navigator.userAgent.toUpperCase().indexOf("MSIE 7.") > 0;
Browser.isie8 = navigator.userAgent.toUpperCase().indexOf("MSIE 8.") > 0;
Browser.isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1);
Browser.isOpera = (navigator.userAgent.toLowerCase().indexOf("opera")!=-1);
function DefineCPair()
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
if (Browser.isFirefox) {DefineCPair();}

function __GetDocType(){
    try{
        var re=/\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi;
        var res=false;
        /*********************************************
        Just check for internet explorer.
        **********************************************/
        if(typeof document.namespaces != "undefined")
        {
			res=document.all[0].nodeType==8 ? re.test(document.all[0].nodeValue) : false;
			var v = document.all[0].nodeValue;
			if(v.indexOf("<!") == 0)res = false;
		}
        else
            res=document.doctype != null ? re.test(document.doctype.publicId) : false;
		//alert(res + "/" + document.all[0].nodeValue + "/" + document.all[0].nodeType);
        var obj=new Object();
        if(res && RegExp.$1){
            obj['name']=RegExp.$1;
            obj['name'] = obj['name'].toUpperCase();
            obj['version']=RegExp.$2;
            obj['type']=RegExp.$3;
			obj['type'] = obj['type'].toUpperCase();
			//alert(obj.name + "/" + obj.type);
            return obj;
        }
    }catch(e){}
    return null;
}
Browser.doctype = __GetDocType();

ztui.InitHTML = function(html)
{
	try{
		document.body.insertAdjacentHTML("beforeEnd", html);
	}catch(e){}
}

/*Dialog*/
ztui.dlg = ztui.dlg || {};
ztui.bg = null;
ztui.defineBack = function()
{
	if(!ztui.bg)
	{
		ztui.InitHTML(ztui.BACK_DIV);
		ztui.bg = __("BACK_DIV_FOR_TIP_UI");
	}
}
ztui.hideBg = function()
{
	if(ztui.bg){
		ztui.win.web_dlg_opacity('BACK_DIV_FOR_TIP_UI', 30, 0, 500);
	}
}
ztui.showBg = function()
{
	ztui.defineBack();
	if(ztui.bg)
	{
		{
			ztui.bg.style.left = "0px";
			ztui.bg.style.top = "0px";
			ztui.bg.style.width = (ztui.win.w() > document.body.scrollWidth ? ztui.win.w() : document.body.scrollWidth)  + "px";
			ztui.bg.style.height = (ztui.win.h() > document.body.scrollHeight ? ztui.win.h() : document.body.scrollHeight)  + "px";
			
			ztui.win.web_dlg_opacity('BACK_DIV_FOR_TIP_UI', 0, 30, 500);
			ztui.bg.style.display = "block";
		}
	}
}
ztui.dlg.__HANDLE_BLACK_CC = function()
{
	alert("Please Close the windows.");
}
ztui.dlg.items = ztui.dlg.items || {};
ztui.dlg.create = function(id,config)
{
	//if(ztui.dlg.items[id])return ztui.dlg.items[id]; // return default
	
	var html = rp(ztui.DLGHTML, "[UIID]", id);
	config = config || {};
	var width = config ? (config.width ? config.width : 500) : 500;
	var height = config ? (config.height ? config.height : 200) : 200;
	var xx = ztui.win.sl() + (ztui.win.w()-width) / 2;
	var yy = ztui.win.st() + (ztui.win.h()-height) / 2;
	
	var showsure = config.buttonSure ? true : false;
	var showcancel = config.buttonCancel ? true : false;
	var showyes = config.buttonYes ? true : false;
	var showno = config.buttonNo ? true : false;
	var showretry = config.buttonRetry ? true : false;
	var showsave = config.buttonSave ? true : false;
	var showrefresh = config.buttonRefresh ? true : false;
	
	config.width = width;
	config.height = height;
	config.x = xx;
	config.y = yy;
	
	if(!ztui.dlg.items[id])ztui.InitHTML(html);
	
	var xobj = ztui.dlg.items[id] || new Object();
	xobj.id = id;
	
	if(!xobj.lastFrame)xobj.lastFrame = "";
	
	xobj.obj = __("ZTUI_DLG_" + id);
	
	if(!xobj.obj)
	{
		alert("ZTUIDLG Not Support!!");
		return;
	}
	
	xobj.tb = __("ZTUI_DLG_TB_" + id);
	xobj.tbc = __("ZTUI_DLG_TBC_" + id);
	
	xobj.ct = __("ZTUI_DLG_CT_" + id);
	xobj.ctc = __("ZTUI_DLG_CTC_" + id);
	xobj.ctcl = __("ZTUI_DLG_CTCL_" + id);
	xobj.ctcr = __("ZTUI_DLG_CTCR_" + id);
	
	xobj.bt = __("ZTUI_DLG_BT_" + id);
	xobj.btc = __("ZTUI_DLG_BTC_" + id);
	
	xobj.closeobj = __("ZTUI_DLG_CLOSE_" + id);
	xobj.maxobj = __("ZTUI_DLG_MAX_" + id);
	
	if(config.hideclose){
		xobj.closeobj.style.display = "none";
	}else{
		xobj.closeobj.style.display = "";
	}
	if(config.hidemax){
		xobj.maxobj.style.display = "none";
	}else{
		xobj.maxobj.style.display = "";
	}
	
	if(showsure) // Sure Button
	{xobj.btc.innerHTML = '<input type="button" class="dlgbtnsure" value="'+__l("sure")+'" onclick="ztui.dlg.close(\''+id+'\', 1);"/>';}
	if(showcancel) // Cancel Button
	{xobj.btc.innerHTML += '<input type="button" class="dlgbtncancel" value="'+__l("cancel")+'" onclick="ztui.dlg.close(\''+id+'\', 2);"/>';}
	if(showyes) // Yes Button
	{xobj.btc.innerHTML += '<input type="button" class="dlgbtnyes" value="'+__l("yes")+'" onclick="ztui.dlg.close(\''+id+'\', 3);"/>';}
	if(showno) // Yes Button
	{xobj.btc.innerHTML += '<input type="button" class="dlgbtnno" value="'+__l("no")+'" onclick="ztui.dlg.close(\''+id+'\', 4);"/>';}
	if(showretry) // Yes Button
	{xobj.btc.innerHTML += '<input type="button" class="dlgbtnretry" value="'+__l("retry")+'" onclick="ztui.dlg.close(\''+id+'\', 5);"/>';}
	if(showsave) // Yes Button
	{xobj.btc.innerHTML += '<input type="button" class="dlgbtnsave" value="'+__l("save")+'" onclick="ztui.dlg.close(\''+id+'\', 6);"/>';}	
	if(showrefresh) // Yes Button
	{xobj.btc.innerHTML += '<input type="button" class="dlgbtnrefresh" value="'+__l("refresh")+'" onclick="ztui.dlg.close(\''+id+'\', 7);"/>';}	
	
	
	var ch = height - 25 * 2 - 4; // message height
	config.ch = ch;
	config.cw = width - 12;
	xobj.config = config;
	xobj.last = {x:config.x,y:config.y,width:config.width,height:config.height};
	// Main Container
	xobj.inputtip = false;
	xobj.inputtipstr = config.inputtipstr ? config.inputtipstr : null;
	xobj.maxflag = 0;
	ztui.dlg.items[id] = xobj;
	ztui.dlg.resize(id,config.x,config.y,width,height);
	
	return xobj;
}
/**set input show flag -true tip str*/
ztui.dlg.inputconfig = function(id, flag, str)
{
	var d = ztui.dlg.items[id];
	d.inputtip = flag;
	d.inputtipstr = str;
}
/**Set parent dlg tip*/
ztui.dlg.inputconfigparent = function(id, flag, str)
{
	if(parent && parent.ztui && parent.ztui.dlg)parent.ztui.dlg.inputconfig(id, flag, str);
}
/*Resize*/
ztui.dlg.resize = function(id,x,y,width,height)
{
	var d = ztui.dlg.items[id];
	if(d)
	{
		var ch = height - 25 * 2 - 4; // message height
		var cw = width - 12;
		var xobj = d;
		xobj.obj.style.width = width + "px";
		xobj.obj.style.height = height + "px";
		xobj.obj.style.left = x + "px";
		xobj.obj.style.top = y + "px";
		
		xobj.ct.style.height = ch + "px";
		xobj.ct.style.width = width + "px";
		
		xobj.btc.style.width = (cw) + "px";
		
		xobj.ctc.style.width = (cw) + "px";
		xobj.ctc.style.height = (ch) + "px";
		
		xobj.ctcl.style.height = ch + "px";
		xobj.ctcr.style.height = ch + "px";
	}
}
/**Max/Restor*/
ztui.dlg.domax = function(id)
{
	var d = ztui.dlg.items[id];
	var xobj = d;
	var dc = 5;
	var speed = 30;
	if(xobj.maxflag == 0)
	{
		// DOMAX		
		xobj.last = {x:parseInt(xobj.obj.style.left),y:parseInt(xobj.obj.style.top),width:parseInt(xobj.obj.style.width),height:parseInt(xobj.obj.style.height)};
		var dw = ztui.win.w() - xobj.last.width;
		var dh = ztui.win.h() - xobj.last.height;
		var dl = 0 - xobj.last.x;
		var dt = 0 - xobj.last.y;
		for(var i = 0; i <= dc; i++)
		{
			setTimeout("ztui.dlg.resize('"+id+"', "+(xobj.last.x+i*dl/dc)+", "+(xobj.last.y+i*dt/dc)+", "+(xobj.last.width+i*dw/dc)+", "+(xobj.last.height+i*dh/dc)+");", i*speed);
		}
		//ztui.dlg.resize(id, 0, 0, ztui.win.w(), ztui.win.h());
		//setTimeout("ztui.dlg.resize('"+id+"', 0, 0, "+(ztui.win.w())+", "+(ztui.win.h())+");", dc*speed+20);
		xobj.maxflag = 1;
		if(xobj.maxobj)xobj.maxobj.innerHTML = "["+__l("restore")+"]";
	}else
	{
		var dw = -ztui.win.w() + xobj.last.width;
		var dh = -ztui.win.h() + xobj.last.height;
		var dl = 0 + xobj.last.x;
		var dt = 0 + xobj.last.y;
		
		for(var i = 0; i <= dc; i++)
		{
			setTimeout("ztui.dlg.resize('"+id+"', "+(i*dl/dc)+", "+(i*dt/dc)+", "+(ztui.win.w()+i*dw/dc)+", "+(ztui.win.h()+i*dh/dc)+");", i*speed);
		}
		//ztui.dlg.resize(id, xobj.last.x, xobj.last.y, xobj.last.width, xobj.last.height);
		xobj.maxflag = 0;
		if(xobj.maxobj)xobj.maxobj.innerHTML = "["+__l("max")+"]";
	}
}
/**
 * show dlg
 * id - ID
 * title - title
 * content - content URI, URL
 * ct - Type, 0 - HTML, 1 - HTMLID, 2 - AJAX, 3 - IFRAME
 * cb - Callback on close
 */
ztui.dlg.show = function(id, title, content, ct, cb)
{
	var d = ztui.dlg.items[id];
	if(d)
	{
		ztui.showBg();
		d.tbc.innerHTML = title;
		d.cb = cb ? cb : null;
		ztui.dlg.setContent(d, content, ct);
		d.obj.style.display = "block";		
	}else
	{
		alert("No DLG: " + id);
	}
}
ztui.dlg.shownobg = function(id, title, content, ct, cb)
{
	var d = ztui.dlg.items[id];
	if(d)
	{
		//ztui.showBg();
		//ztui.showBg();
		//ztui.bg.style.display = "none";
		if(zt.g("BACK_DIV_FOR_TIP_UI"))zt.g("BACK_DIV_FOR_TIP_UI").style.display = "none";
		d.tbc.innerHTML = title;
		d.cb = cb ? cb : null;
		ztui.dlg.setContent(d, content, ct);
		d.obj.style.display = "block";		
	}else
	{
		alert("No DLG: " + id);
	}
}
ztui.dlg.setContent = function(d, content, ct)
{
	ct = ct ? ct : 0;
	content = content ? content : "";
	switch(ct)
	{
		case 0: // HTML
			d.ctc.innerHTML = content;d.ctc.style.overflow="auto";break;
		case 1: // HTML ID
			if(__(content)){d.ctc.innerHTML = __(content).innerHTML;}else{d.ctc.innerHTML = "Unknown HTML Element: " + content;}break;
		case 2: // HTML from AJAX
			ztui.dlg.SetAJAX(d,content);break;
		case 3: // IFRAME From content(content is a url)
			ztui.dlg.SetIFrame(d,content);break;
	}
}
ztui.dlg.SetAJAX = function(d,url)
{
	if(!url || url == "")return;
	//var http = new ZTHttp(false);
	d.ctc.innerHTML = __l("loading");
	/*http.get(url, function(s){
		str = rp(s, "[UUID]", d.id);
		d.ctc.innerHTML = str;
	});*/
	zt.gethtml(url, function(s){
		str = zt.rp(s, "[UUID]", d.id);
		d.ctc.innerHTML = str;
		d.ctc.style.overflow="auto";
	});
}
ztui.dlg.SetIFrame = function(d,url)
{
	if(!url || url == "")return;
	var ifhtml = '<iframe id="ZTUIWEBDLG_FRAME_ID_'+d.id+'" name="ZTUIWEBDLG_FRAME_ID_'+d.id+'" frameborder="0" style="border:none;" width="100%" height="100%" src="'+url+'"></iframe>';
	if(!d.lastFrame || d.lastFrame != url){
		//d.ctc.innerHTML = ifhtml;
		d.lastFrame = url;
	}
	d.ctc.innerHTML = ifhtml;
	d.ctc.style.overflow="hidden";
}
ztui.dlg.close = function(id, ctype)
{	
	var d = ztui.dlg.items[id];
	if(d.inputtip)
	{
		if(!confirm(d.inputtipstr ? d.inputtipstr : __l("closedlgtip")))return;
	}
	ctype = ctype ? ctype : 0;
	if(ctype == 7){_RP();return;}
	
	ztui.hideBg();
	
	if(d)
	{
		d.obj.style.display = "none";
		d.ctc.innerHTML = "";
		if(d.cb)d.cb(id, ctype);
	}else
	{
		alert("No DLG: " + id);
	}
}
ztui.dlg.ResizeBG = function()
{
	if(ztui.bg.style.display == "block")
	{
		ztui.bg.style.left = "0px";ztui.bg.style.top = "0px";
		var width = (ztui.win.w() > document.body.scrollWidth ? ztui.win.w() : document.body.scrollWidth)  + "px";
		var height = (ztui.win.h() > document.body.scrollHeight ? ztui.win.h() : document.body.scrollHeight)  + "px";
		if(ztui.bg.style.width != width)
		{
			ztui.bg.style.width = width;
		}
		if(ztui.bg.style.height != height)
		{
			ztui.bg.style.height = height;
		}
	}
}
ztui.dlg.waa_dlg_tip_hasdrag = false;
ztui.dlg.donotdragflag = false;
ztui.dlg.dragBeginX = 0;
ztui.dlg.dragBeginY = 0;
ztui.dlg.dragOriX = 0;
ztui.dlg.dragOriY = 0;
ztui.dlg.tempobj = null;
ztui.dlg.tempid = "dragtemp";
ztui.dlg._needAddScroll = function()
{
	if(Browser.doctype == null || Browser.isie6)return true;
	return (Browser.doctype.type != "STRICT" && Browser.doctype.type != "TRANSITIONAL");
}

ztui.dlg.BeginTipDrag = function(obj, wid,ee)
{
	var d = ztui.dlg.items[wid];
	if(d.maxflag == 1)return; // Max do not drag
	if(ztui.dlg.donotdragflag){
		ztui.dlg.donotdragflag = false;
		return;
	}
	if(ztui.dlg.waa_dlg_tip_hasdrag)return; /// dragging
	
	var e = ee ? ee : window.event;
	
	if(obj.setCapture)
		obj.setCapture();
	//else if(window.captureEvents)
	//	window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);

	obj = obj.parentNode;
	ztui.dlg.dragBeginX = ztui.win.mx(e);
	ztui.dlg.dragBeginY = ztui.win.my(e);
	ztui.dlg.dragOriX = ztui.win.rl(obj);
	ztui.dlg.dragOriY = ztui.win.rt(obj);
	
	if(ztui.dlg._needAddScroll())
	{
		ztui.dlg.dragOriX += ztui.win.sl();
		ztui.dlg.dragOriY += ztui.win.st();
	}

	ztui.dlg.waa_dlg_tip_hasdrag = true;
}
ztui.dlg.CancelDragDLG = function(wid)
{
	var d = ztui.dlg.items[wid];
	ztui.dlg.waa_dlg_tip_hasdrag = false;
	var obj = d.tb; //__("webdlgTITLEBAR" + wid);
	if(!obj)return;
	if(obj.releaseCapture)obj.releaseCapture();
	ztui.dlg.waa_dlg_tip_hasdrag = false;
}
ztui.dlg.EndTipDrag = function(obj, wid, ee)
{
	//alert(waa_dlg_tip_hasdrag);
	if(ztui.dlg.waa_dlg_tip_hasdrag)
	{
		ztui.dlg.waa_dlg_tip_hasdrag = false;
		try{
			var e = ee ? ee : window.event;
			var x = ztui.win.mx(e);
			var y = ztui.win.my(e);
			if(obj.releaseCapture)
			{
				obj.releaseCapture();
			}
			
			obj = obj.parentNode;
			//__getScLeft() + 
			//__getScTop() + 
			obj.style.left = (x - (ztui.dlg.dragBeginX - ztui.dlg.dragOriX)) + "px";
			obj.style.top = (y - (ztui.dlg.dragBeginY - ztui.dlg.dragOriY)) + "px";	
		}catch(ec){}
		ztui.dlg.waa_dlg_tip_hasdrag = false;
	}
}
ztui.dlg.DragTipMove = function(obj, wid, ee)
{
	obj = obj.parentNode;
	if(ztui.dlg.waa_dlg_tip_hasdrag == true)
	{
		var e = ee ? ee : window.event;
		var x = ztui.win.mx(e);
		var y = ztui.win.my(e);
		obj.style.left = (x - (ztui.dlg.dragBeginX - ztui.dlg.dragOriX)) + "px";
		obj.style.top = (y - (ztui.dlg.dragBeginY - ztui.dlg.dragOriY)) + "px";
	}
}
/*Open IFRAME dlg*/
ztui.dlg.Open = function(url,title, w, h,hasbg)
{
	title = title ? title : url;
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.9;
	
	if(w)wd = w;
	if(h)hd = h;
	
	
	var it = ztui.dlg.create("_default_ztui_dlg_id", {width:wd,height:hd,buttonSure:false});
	it.inputtip = false;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show("_default_ztui_dlg_id", title, url, 3);
	}else{
		ztui.dlg.shownobg("_default_ztui_dlg_id", title, url, 3);
	}
}
ztui.dlg.OpenID = function(id,url,title, w, h,hasbg,cb)
{
	title = title ? title : url;
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.9;
	
	if(w)wd = w;
	if(h)hd = h;
	
	var it = ztui.dlg.create(id, {width:wd,height:hd,buttonSure:false});
	it.inputtip = false;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show(id, title, url, 3, cb);
	}else
	{
		ztui.dlg.shownobg(id, title, url, 3, cb);
	}
}
/*Open AJAX's content*/
ztui.dlg.OpenAjax = function(url,title, w, h,hasbg)
{
	title = title ? title : url;
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.8;
	
	if(w)wd = w;
	if(h)hd = h;
	
	var it = ztui.dlg.create("_default_ztui_dlg_id", {width:wd,height:hd,buttonSure:false});
	it.inputtip = false;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show("_default_ztui_dlg_id", title, url, 2);
	}else
	{
		ztui.dlg.shownobg("_default_ztui_dlg_id", title, url, 2);
	}
}
/*Open AJAX's content as input*/
ztui.dlg.OpenAjaxInput = function(url,title, w, h,hasbg)
{
	title = title ? title : url;
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.8;
	
	if(w)wd = w;
	if(h)hd = h;
	
	
	var it = ztui.dlg.create("_default_ztui_dlg_id", {width:wd,height:hd,buttonSure:false});
	it.inputtip = true;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show("_default_ztui_dlg_id", title, url, 2);
	}else{
		ztui.dlg.shownobg("_default_ztui_dlg_id", title, url, 2);
	}
}
/*Open IFRAME as input*/
ztui.dlg.OpenInput = function(url,title, w, h, hc, hm,hasbg)
{
	title = title ? title : url;
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.8;
	
	if(w)wd = w;
	if(h)hd = h;
	
	var it = ztui.dlg.create("_default_ztui_dlg_id", {width:wd,height:hd,buttonSure:false,"hideclose":(hc ? true : false),"hidemax":(hm?true:false)});
	it.inputtip = true;
	if(hasbg == undefined || hasbg){		
		ztui.dlg.show("_default_ztui_dlg_id", title, url, 3);
	}else
	{
		ztui.dlg.shownobg("_default_ztui_dlg_id", title, url, 3);
	}
}
ztui.dlg.OpenInputR = function(url,title, w, h,hasbg)
{
	title = title ? title : url;
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.8;
	
	if(w)wd = w;
	if(h)hd = h;
	
	var it = ztui.dlg.create("_default_ztui_dlg_id_r", {width:wd,height:hd,buttonSure:false,buttonRefresh:true});
	it.inputtip = true;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show("_default_ztui_dlg_id_r", title, url, 3);
	}else
	{
		ztui.dlg.shownobg("_default_ztui_dlg_id_r", title, url, 3);
	}
}
/*Open HTML content*/
ztui.dlg.OpenHTML = function(html,title, w, h,hasbg)
{
	title = title ? title : "";
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.8;
	
	if(w)wd = w;
	if(h)hd = h;
	
	var it = ztui.dlg.create("_default_ztui_dlg_id", {width:wd,height:hd,buttonSure:false});
	it.inputtip = false;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show("_default_ztui_dlg_id", title, html, 0);
	}else
	{
		ztui.dlg.shownobg("_default_ztui_dlg_id", title, html, 0);
	}
}
/*HTML as input*/
ztui.dlg.OpenHTMLInput = function(html,title, w, h,hasbg)
{
	title = title ? title : "";
	var wd = ztui.win.w() * 0.9;
	if(wd > 960)wd = 960;
	var hd = ztui.win.h() * 0.8;
	
	if(w)wd = w;
	if(h)hd = h;
	
	var it = ztui.dlg.create("_default_ztui_dlg_id", {width:wd,height:hd,buttonSure:false});
	it.inputtip = true;
	if(hasbg == undefined || hasbg){
		ztui.dlg.show("_default_ztui_dlg_id", title, html, 0);
	}else
	{
		ztui.dlg.shownnobg("_default_ztui_dlg_id", title, html, 0);
	}
}

// Timers
ztui.timer = ztui.timer || {};
ztui.timer.funcs = ztui.timer.funcs || {};
ztui.timer.addTimer = function(n, intv, func)
{
	var obj = {name:n,timer:intv,cb:func,last:0};
	if(ztui.timer.funcs[n]){
		ztui.timer.funcs[n].cb = func;
		ztui.timer.funcs[n].timer = intv;
	}else
	{
		ztui.timer.funcs[n] = obj;
	}
}
ztui.timer.removeTimer = function(n)
{
	ztui.timer.funcs[n] = null;
}
ztui.timer.id = 0;
ztui.timer.doTimer = function()
{
	var d = new Date();
	for(var o in ztui.timer.funcs)
	{
		try{
			var f = ztui.timer.funcs[o];
			if(f && (d.getTime() - f.last) >= f.timer)
			{
				f.last = d.getTime();
				f.cb(f);
			}
		}catch(e){}
	}
	try{window.clearTimeout(ztui.timer.id);}catch(e){}
	ztui.timer.id = window.setTimeout("ztui.timer.doTimer()", 1);
}
ztui.timer.doTimer();

// Events
ztui.events = ztui.events || {};
ztui.events.onloads = ztui.events.onloads || [];
ztui.events.addOnload = function(func)
{
	ztui.events.onloads[ztui.events.onloads.length] = func;
}

function ztui_onload()
{
	for(var i = 0; i < ztui.events.onloads.length; i++)
	{
		ztui.events.onloads[i]();
	}
}
if(window.addEventListener){
	window.addEventListener("load", ztui_onload, false);
}
if(window.attachEvent){
	window.attachEvent("onload", ztui_onload);
}

// load,error,mouseover,mouseout,mousedown,click etc....
ztui.events.add = function(obj, name, func)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(name,func,false);
	}else
	{
		obj.attachEvent("on" + name,func);
	}
}
// load,error,mouseover,mouseout,mousedown,click etc....
ztui.events.remove = function(obj, name, func)
{
	if(obj.removeEventListener)
	{
		obj.removeEventListener(name,func,false);
	}else
	{
		obj.detachEvent("on" + name,func);
	}
}

/*Get Events*/
ztui.events.GetEvent = function()
{
    if(document.all)return window.event;
	var call = ztui.events.GetEvent.caller;
	while(call!=null)
	{
		var arg0 = call.arguments[0];
		if(arg0)
		{
			if((arg0.constructor == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation))return arg0;
		}
        call = call.caller;
    }
    return null;
}
///ZTMenus
//-------
ztui.reg = function()
{
	OpenDLG(zt.base + ztui.useraction+"?omsv=reginput", __l("reguser"));
}
ztui.edit = function()
{
	OpenDLG(zt.base +ztui.useraction+ "?omsv=regedit", __l("edituser"));
}
function __ABLE_REFRESH(id,b){}
function __ABLE_BACK(id,b){}
/**
 * Web Dalog Version1.0
 * x,y,w,h 
 * title ,message ，，HTML，URL，sign
 * sign = 0 message is html， sign = 1 messageis URL using ajax
 *
 */
function WebDalog(id,x,y,w,h,title,message,sign,bg)
{
	var it = ztui.dlg.create(id, {width:w,height:h,buttonSure:false});
	it.inputtip = false;
	ztui.dlg.show(id, title, message, sign);
}
function DW(d)
{
	//alert(document.body.clientWidth + "\n" + document.body.clientHeight);
	var mk = parseInt(zt.w());
	if(mk > 0)return parseInt(mk * 0.95);
	if(typeof(d) == "undefined")return 700;
	return d;
}
// getdailog height
function DH(d)
{
	var mk = parseInt(zt.h());
	if(mk > 0)return parseInt(mk * 0.9);
	if(typeof(d) == "undefined")return 450;
	return d;
}
function CloseDLGID(id)
{
	ztui.dlg.close(id);
}
//--------BasicFunctions-------------
function OpenDLG(url, title){ztui.dlg.Open(url,title);}
function _G(id){return document.getElementById(id);}
function G(id){return document.getElementById(id);}
function V(id){return G(id).value;}
function F(id){return G(id).focus();}
function L(id){return V(id).length;}
function EQ(id,id1){return V(id) == V(id1);}
function DOXML(url, datas, suc, fa)
{
	if(!confirm(__l("optip")))return;
	if(url.indexOf("?") >= 0)
		url += "&rd=" + Math.random();
	else
		url += "?rd=" + Math.random();
	//var zt = new ZTHttp(true);
	zt.post(url, datas, function(s){
		if(s && s.documentElement)
		{
			try{
				var code = zt.xmlv(s.documentElement.firstChild); //parseInt(s.documentElement.firstChild.nodeValue);
				if(code == "200")
				{
					try{
						if(typeof(suc) != "undefined")
						{
							suc();
						}else{
							alert(__l("opsuccess"));
						}
					}catch(ee){}					
				}else{
					try{
						if(typeof(fa) != "undefined")
						{
							fa();
						}else{
							alert(__l("opfail") + code);
						}
					}catch(ee){}
				}
			}catch(e){
			}
		}else{
			alert(__l("systemerror"));
		}
	});
}
function CHBG(o, c){o.style.backgroundColor = c;}
function _RP(){window.location = getLocURL();}
function getLocURL(){var u = window.location.href;if(u.indexOf("#") > 0)u = u.substring(0, u.indexOf("#"));return u;}
function _T(n){
	var str = "";
	if(!n)return "";
	if(n.nodeValue)str += n.nodeValue;
	
	var ns = n.childNodes;
	for(var i = 0; ns != null && i < ns.length; i++)
	{
		str += _T(ns[i]);
	}
	return str;
}
function OpenCommonUploader(id,sname,size,cpath)
{
	var sn = "";
	var ss = "";
	var cp = "";
	if(sname)sn = sname;
	if(size)ss = size;
	if(cpath)cp = cpath;
	var a = window.open(zt.base + "omsuploader.oms?showview=input&sid=" + id + "&sname=" + sn + "&ssize=" + ss + "&cpath=" + cp, "OMSUploaderWindows","width=470,height=300,scrollbars=yes");
}
//function WebDalog(id,x,y,w,h,title,message,sign,bg)
function OpenLocalUploader(id,sname,size,cpath)
{
	var sn = "";
	var ss = "";
	var cp = "";
	if(sname)sn = sname;
	if(size)ss = size;
	if(cpath)cp = cpath;
	ztui.dlg.OpenID("oms_common_uploader",zt.base + "omsuploader.oms?showview=input&sid=" + id + "&sname=" + sn + "&ssize=" + ss + "&cpath=" + cp, "文件上传", 470, 300);
}

//function WebDalog(id,x,y,w,h,title,message,sign,bg)
function OpenUploader(uploaderid,id,sname,size,autoset,fuidc,ud)
{
	var sn = "";
	var ss = "";
	var cp = "";
	var autosets = "";
	var fuid = "";
	var uds = "";
	if(sname)sn = sname;
	if(size)ss = size;
	if(uploaderid)cp = uploaderid;
	if(autoset)autosets = autoset;
	if(fuidc)fuid = fuidc;
	if(ud)uds = ud;
	ztui.dlg.OpenID("oms_file_common_uploader",zt.base + "fileuploader.oms?showview=input&sid=" + id + "&sname=" + sn + "&ssize=" + ss + "&uploadextradata=" + ENC(uds) + "&fuid=" + fuid + "&uploader=" + cp + "&autosets=" +autosets, "文件上传", 470, 300, false);
}
function OpenUploaderCB(uploaderid,autoset,cb,mc,ud,wd,sz)
{
	var cp = "";
	var autosets = "";
	var fuid = "";
	var uds = "";
	var cbfunc = "";
	var mcx = 0;
	
	if(uploaderid)cp = uploaderid;
	if(autoset)autosets = autoset;
	if(cb)cbfunc = cb;
	if(ud)uds = ud;
	
	var width = 470;
	var height = 300;
	if(wd)width = wd;
	if(sz)height = sz;
	if(mc)mcx = mc;
	
	ztui.dlg.OpenID("oms_file_common_uploader",zt.base + "fileuploader.oms?showview=input&cbfunc=" + cbfunc + "&mult=" + mcx + "&uploadextradata=" + ENC(uds) + "&uploader=" + cp + "&autosets=" +autosets, "文件上传", width, height, false);
}
function OpenWordContentUploader(id)
{
	var a = window.open(zt.base + "omsuploader.oms?showview=input&omsv=word&sid=" + id, "OMSUploaderWordWindows","width=640,height=480,scrollbars=yes");
}
function OpenUserSel(id)
{
	var a = window.open(zt.base +ztui.useraction+ "?omsv=selectuser&id=" + id,"SelectUser","width=500,height=400,scrollbars=yes");
}
// heart 
ztui.hbtimer = 0;
ztui.hbinter = 60000;
ztui.hb = function()
{
	var url = zt.base +  ztui.useraction+"?omsv=hb?rd=" + Math.random();
	
	zt.get(url, function(s){});
	try{
		if(ztui.hbtimer)clearTimeout(ztui.hbtimer);
		ztui.hbtimer = setTimeout("ztui.hb()", ztui.hbinter);
	}catch(ex){}
}
ztui.starthb = function(ival)
{
	var i = 60000;
	if(typeof(ival) != "undefined")i = ival;
	ztui.hbinter = i;
	ztui.hbtimer = setTimeout("ztui.hb()", i);
}
ztui.login = function(u, p, vc, cb)
{
	var url = zt.base +ztui.useraction+ "?rd=" + Math.random();
	
	var reurl = window.location.href;
	reurl = reurl.substring(reurl.lastIndexOf("/") + 1);	
	if(reurl.indexOf(ztui.useraction+"?omsv=login") == 0)reurl = "index.oms";
	
	zt.post(url, "omsv=loginx&userName="+ENC(u)+"&passWord=" + ENC(p) + "&verify_code=" + vc, function(s){
		if(s && s.documentElement)
		{
			try{
				var code = parseInt(zt.xmlv(s.documentElement.firstChild));
				if(code == 200)
				{
					if(typeof(cb) == "function")
					{
						cb(200);
					}else
					{
						window.location = reurl;
					}
				}else
				{
					if(typeof(cb) == "function")
					{
						cb(code, "");
					}else
					{
						if(code == 100)alert(__l("login.100"));
						else if(code == 101)alert(__l("login.101"));
						else if(code == 102)alert(__l("login.102"));
						else if(code == 103)alert(__l("login.103"));
						else alert(__l("login.0") + code);
					}
				}
			}catch(e)
			{
				if(typeof(cb) == "function")
				{
					cb(488, e.message);
				}else
				{
					alert(__l("login.err") + e.message);
				}
			}
		}
	});
}

function reloadVerifyCode(im)
{
	if(!im)im = document.getElementById('verify_img');
	var url = zt.base + "verifycode.servlet?n=5&w=125&h=20&rd=" + Math.random();
	im.src = url;
}
ztui.loginbasic = function()
{
	var u = _G("userName").value;
	var p = _G("passWord").value;
	var v = "";
	if(_G("verify_code"))v = _G("verify_code").value;
	
	if(u == "")
	{
		alert(__l("login.username.input"));return;
	}
	if(p == "")
	{
		alert(__l("login.password.input"));return;
	}	
	ztui.login(u, p, v); // 进行登录
}
ztui.logout = function(jpurl)
{
	var url = zt.base + ztui.useraction+"?rd=" + Math.random();
	//var zt = new ZTHttp(true);
	
	var reurl = window.location.href;
	reurl = reurl.substring(reurl.lastIndexOf("/") + 1);	
	if(reurl.indexOf(ztui.useraction+"?omsv=login") == 0 || reurl.indexOf(ztui.useractions+"!login.oms") == 0)reurl = "index.oms";
	
	zt.post(url, "omsv=logoutxml", function(s){
		if(s && s.documentElement)
		{
			try{
				var code = parseInt(zt.xmlv(s.documentElement.firstChild));
				if(code == 200)
				{
					if(!jpurl)window.location = reurl;
					else window.location = jpurl;
				}else
				{
					alert(__l("logout.err"));
				}
			}catch(e)
			{
				alert(__l("logout.err") + e.message);
			}
		}
	});
}
ztui.do_common_login = function()
{
	var uid = document.getElementById("oms_login_userName").value;
	var pwd = document.getElementById("oms_login_password").value;
	var vc = document.getElementById("oms_verify_code").value;
	if(uid == "" || pwd == "")
	{
		alert(__l("inputpwuid"));return;
	}
	ztui.login(uid,pwd,vc);
}
ztui.showloginui = function()
{
	var html = "";
	html += '<div style="overflow:hidden;padding:10px;">';
	html += '<div style="overflow:hidden;padding:5px;">'+__l("username")+__l("maohao")+'<input type="text" id="oms_login_userName" size="20" onKeyDown="if(event.keyCode == 13){ztui.do_common_login();}"/></div>';	
	html += '<div style="overflow:hidden;padding:5px;">'+__l("passwordc")+__l("maohao")+'<input type="password" id="oms_login_password" size="20" onKeyDown="if(event.keyCode == 13){ztui.do_common_login();}"/></div>';	
	html += '<div style="overflow:hidden;padding:5px;">'+__l("verify")+__l("maohao")+'<input type="text" id="oms_verify_code" onKeyDown="if(event.keyCode == 13){ztui.do_common_login();}"/> <img id="verify_img" src="'+zt.base+'verifycode.servlet?n=4&w=80&h=20&rd='+Math.random()+'" align="absmiddle"/>  ('+__l("inputnumber")+')</div>';
	html += '<div style="overflow:hidden;padding:5px;"><input type="button" value="'+__l("login")+'" onclick="ztui.do_common_login();"/> <input type="button" value="'+__l("cancel")+'" onclick="CloseDLGID(\'_oms_login_html_dlg\')"/></div>';
	html += '</div>';
	var wd = new WebDalog("_oms_login_html_dlg",-1,-1,600,250,__l("login"),html,0);
	__ABLE_REFRESH("_oms_login_html_dlg",true);
	__ABLE_BACK("_oms_login_html_dlg",true);
}
//alert("ztui inited.");
//--------BasicFunctions Exit--------





