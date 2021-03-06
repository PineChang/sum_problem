var zt = zt || {};
if(!zt.base)zt.base = ""; 
if(window["zt_oms_static_pages_cur_uri"])zt.base = window["zt_oms_static_pages_cur_uri"];
zt.context = "";
zt.d = document;
zt.wd = window;
zt.g = function(id){if(document.getElementById(id)){return document.getElementById(id);}else{return document.getElementsByName(id)[0];}}
zt.v = function(id){return zt.g(id).value;}
zt.f = function(id){try{zt.g(id).focus();}catch(e){}}
zt.select = function(id){try{zt.g(id).select();}catch(e){}}
zt.html = function(id){return zt.g(id).innerHTML;}
zt.sv = function(id,v){zt.g(id).value = v;}
zt.sve = function(id,v){try{if(zt.g(id))zt.g(id).value = v;}catch(Ex){}}
zt.shtml = function(id,v){zt.g(id).innerHTML = v;}
zt.foreach = function(es,f){if(es.length && es.length>0){for(var i=0;i<es.length;i++)f(es[i]);}else{for(var id in es){f(es[id])}}}
zt.pren = function(o){return o ? o.previousSibling : null;}
zt.nextn = function(o){return o ? o.nextSibling : null;}
zt.val = function(id)
{
	try{
		var o = zt.g(id);
		if(o)
		{
			var tn = o.tagName.toLowerCase();
			if(tn == "input" || tn == "textarea" || tn == "select"){
				if(tn == "input"){
					try{
						if(o.type == "radio"){
							var v = zt.radiov(o.name);
							if(v != undefined && v != null)return v;
						}else if(o.type == "checkbox"){
							var v = zt.checkv(o.name);
							if(v != undefined && v != null)return v;
						}
					}catch(ccc){}
				}
				return o.value;
			}
			else return o.innerHTML;
		}
	}catch(Exc){}
	return "";
}
zt.sval = function(id,v)
{
	try{
		var o = zt.g(id);
		if(o)
		{
			var tn = o.tagName.toLowerCase();
			if(tn == "input" || tn == "textarea" || tn == "select"){
				if(tn == "input"){
					try{
						if(o.type == "radio"){
							zt.selectradio(o.name, v);
							return;
						}else if(o.type == "checkbox"){
							zt.selectcheck(o.name, v);
							return;
						}
					}catch(ccc){}
				}
				o.value = v;
			}
			else{o.innerHTML = v;}
		}
	}catch(Exc){}
	return "";
}
zt.selectradio = function(name,v){
	var r = document.getElementsByName(name);
	if(r){
		for(var i = 0; i < r.length; i++){if(r[i].value == v)r[i].checked=true;}
	}
}
zt.radiov = function(name){
	var r = document.getElementsByName(name);
	if(r){
		for(var i = 0; i < r.length; i++){if(r[i].checked)return r[i].value;}
	}
	return null;
}
zt.checkv = function(name){
	var r = document.getElementsByName(name);
	var s = "";
	if(r){
		for(var i = 0; i < r.length; i++){
			if(r[i].checked){
				if(s == ""){
					s = r[i].value;
				}else{
					s+=","+r[i].value;
				}
			}
		}
	}
	return s;
}
zt.selectcheck = function(name,v){
	var r = document.getElementsByName(name);
	if(r){
		for(var i = 0; i < r.length; i++){
			var c = r[i];
			if(zt.isArray(v)){
				c.checked = false;
				for(var j = 0; j < v.length; j++)
				{
					if(c.value == v[j]+"")
					{
						c.checked = true;
					}
				}
			}else if(c.value == v+""){
				c.checked = true;
			}else{
				c.checked = false;
			}
		}
	}
}
function ENC(str){
	if(str == undefined)return "";
	if(str == null)return "";
	str = str + "";
	var i,c,ret="",strSpecial="!\"#$%&'()*+,/:;<=>?@[\]^`{|}~%";
	for(i=0;i<str.length;i++){
		if(str.charCodeAt(i)>= 256){
			c=str.charCodeAt(i);
			var t = c.toString(16);
			while(t.length < 4)t = "0" + t;
			ret+="\\u"+t;
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
zt.nodes = function(node, tagname)
{	
	var ret = "";
	if(!node)return null;
	if(node.nodeType != 1 && node.nodeType != 9)return null;
	return node.getElementsByTagName(tagname);
}
zt.xmlv = function(n)
{
	if(n)
	{
		if(n.firstChild)return zt.xmlv(n.firstChild);
		else return n.nodeValue ? n.nodeValue : "";
	}
	return "";
}
zt.xmlva = function(n,tag,p,v)
{
	try{
		return zt.xmlv(zt.fnodea(n,tag,p,v));
	}catch(Exc){}
	return "";
}
zt.xmlvd = function(n,p)
{
	try{
		return zt.xmlv(zt.fnodea(n,"data","name",p));
	}catch(Exc){}
	return "";
}
zt.node = function(node, tagname)
{	
	var ns = zt.nodes(node,tagname);
	if(ns)
	{
		if(ns.length > 0)return ns[0];
	}
	return null;
}
zt.nodea = function(nodelist, aname, avalue)
{
	for(var i = 0; i < nodelist.length; i++)
	{
		if(zt.ga(nodelist[i], aname) == avalue)return nodelist[i];
	}
	return null;
}
zt.fnodes = function(node,tagname)
{
	var dt = [];
	tagname = tagname.toLowerCase();
	for(var i = 0; node.childNodes && i < node.childNodes.length; i++)
	{
		var n = node.childNodes[i];
		if(n.tagName && n.tagName.toLowerCase() == tagname)dt.push(n);
	}
	return dt;
}
zt.fnode = function(node,tagname)
{
	tagname = tagname.toLowerCase();
	for(var i = 0; node.childNodes && i < node.childNodes.length; i++)
	{
		var n = node.childNodes[i];
		if(n.tagName && n.tagName.toLowerCase() == tagname)return n;
	}
	return null;
}
zt.fnodea = function(node,tagname,a,v)
{
	tagname = tagname.toLowerCase();
	for(var i = 0; node.childNodes && i < node.childNodes.length; i++)
	{
		var n = node.childNodes[i];
		if(n.tagName && n.tagName.toLowerCase()  == tagname && zt.ga(n,a) == v)return n;
	}
	return null;
}
zt.fnodesa = function(node,tagname,a,v)
{
	var dt = [];
	tagname = tagname.toLowerCase();
	for(var i = 0; node.childNodes && i < node.childNodes.length; i++)
	{
		var n = node.childNodes[i];
		if(n.tagName && n.tagName.toLowerCase()  == tagname && zt.ga(n,a) == v)dt.push(n);
	}
	return dt;
}
zt.xmlnode = function(node, xpath)
{	
	var ret = "";
	if(!node)return null;
	var tp = xpath.split("/");
	var sn = node;
	if(sn.nodeName != tp[0])return null;
	for(var j = 1; j < tp.length; j++)
	{
		if(sn)
		{
			var nl = sn.childNodes;
			sn = null;
			for(var i = 0; i < nl.length; i++)
			{
				if(nl[i].nodeType == 1 || nl[i].nodeType == 9)
				{
					if(nl[i].nodeName == tp[j])
					{
						sn = nl[i];break;
					}
				}
			}
		}else
		{
			return null;
		}
	}
	return sn;
}
zt.ga = function(n,m)
{
	if(n)
		if(n.getAttribute(m) != null)return n.getAttribute(m);
	return "";
}
zt.sattr = function(o,n,v)
{
	try{
		o.setAttribute(n, v);
	}catch(xc){}
}
zt.rp = function(str,o,n)
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
zt.trim = function(v)
{
	var nw = /\S/;
	var trimLeft = /^\s+/;
	var trimRight = /\s+$/;
	if(nw.test("\xA0")){ // fix ie doesn't match non-breaking spaces with \s(jQuery)
		trimLeft = /^[\s\xA0]+/;
		trimRight = /[\s\xA0]+$/;
	}
	return v == null ? "" : v.toString().replace(trimLeft, "").replace(trimRight, "");
}
zt.isint = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "-")return false;
	var m = /^(-){0,1}[0-9]{1}([0-9])*$/;	
	return m.test(s);
}
zt.isnum = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "-")return false;
	var m = /^[0-9]{1}([0-9])*$/;	
	return m.test(s);
}
zt.ischarnum = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "")return false;
	var m = /^([a-zA-Z0-9]){1}([a-zA-Z0-9])*$/;
	return m.test(s);
}
zt.isexchar = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "")return false;
	var m = /^([a-zA-Z0-9]|-|_){1}([a-zA-Z0-9]|-|_)*$/;
	return m.test(s);
}
zt.ischar = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "")return false;
	var m = /^([a-zA-Z]){1}([a-zA-Z])*$/;
	return m.test(s);
}
zt.isabc = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "")return false;
	var m = /^([a-z]){1}([a-z])*$/;	
	return m.test(s);
}
zt.isABC = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "")return false;
	var m = /^([A-Z]){1}([A-Z])*$/;	
	return m.test(s);
}
zt.isintbet = function(v,ia,ib)
{	
	if(zt.isint(v))
	{
		try{
			var a = parseInt(v);
			if(a >= ia && a <= ib)return true;
		}catch(e){}
	}
	return false;
}
zt.isfloat = function(v)
{	
	var s = ""+v;
	if(s == "" || s == "." || s == "-." || s == "-")return false;
	if(zt.isint(v))return true;
	var m = /^(-){0,1}([0-9])*([.]){0,1}([0-9])*$/;	
	return m.test(s);
}
zt.isfloatbet = function(v,ia,ib)
{	
	if(zt.isfloat(v))
	{
		try{
			var a = parseFloat(v);
			if(a >= ia && a <= ib)return true;
		}catch(e){}
	}
	return false;
}
zt.islenbet = function(v,a,b)
{
	if(v.length >= a && v.length <= b)return true;
	return false;
}
zt.objecttypes = "object boolean number string function array date regexp".split(" ");
zt.istypein = function(s)
{
	for(var i = 0; i < zt.objecttypes.length; i++){if(s == zt.objecttypes[i])return s;}
	return "object";
}
zt.type = function(o)
{
	//Boolean Number String Function Array Date RegExp Object
	//[object ]
	var tostring = "";
	if(o){
		tostring = Object.prototype.toString.call(o);
		if(tostring.indexOf("[object ") == 0)
		{
			tostring = tostring.substring(8, tostring.length - 1).toLowerCase();
		}
		tostring = zt.istypein(tostring);
	}
	return o == null ? "null" : tostring;
}
zt.isFunction = function(o)
{
	return zt.type(o) == "function";
}
zt.isArray = function(o)
{
	return zt.type(o) == "array";
}
zt.isStr = function(o)
{
	return zt.type(o) == "string";
}
zt.isString = function(o)
{
	return zt.type(o) == "string";
}
zt.each = function(o,cb,args)
{
	var len = o.length;
	var isobj = (len === undefined) || zt.isFunction(o);
	if(args)
	{
		if(isobj){
			for (var name in o ) {
				cb.apply(o[name], args);
			}
		}else
		{
			for (;i<length;) {
				cb.apply( o[i++], args);
			}
		}
	}else{
		if(isobj){
			for(var name in o ){
				cb.call(o[name], name);
			}
		}else
		{
			for(;i<length;){
				cb.call(o[i++], i);
			}
		}
	}
}
//Windows Cor API
zt.w = function()
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
zt.h = function()
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
zt.sl = function()
{
	var ai = parseInt(document.documentElement.scrollLeft);
	var bi = parseInt(document.body.scrollLeft);
	return ai > bi ? ai : bi;
}
zt.st = function()
{
	var ai = parseInt(document.documentElement.scrollTop);
	var bi = parseInt(document.body.scrollTop);
	return ai > bi ? ai : bi;
}
zt.ow = function(obj)
{
	var ai = parseInt(obj.offsetWidth);
	var bi = parseInt(obj.clientWidth);
	return ai > bi ? ai : bi;
}
zt.oh = function(obj)
{
	var ai = parseInt(obj.offsetHeight);
	var bi = parseInt(obj.clientHeight);
	return ai > bi ? ai : bi;
}

zt.mx = function(e){
	return e.pageX ? e.pageX : e.clientX + document.body.scrollLeft - document.body.clientLeft;
}
// + document.body.scrollTop
zt.my = function(e){
	return e.pageY ? e.pageY : e.clientY + document.body.scrollTop  - document.body.clientTop;
}
zt.rl = function(o){
	var l = 0;
	while(o){
	  l += o.offsetLeft - o.scrollLeft;
	  o = o.offsetParent;
	}
	return(l);
}
zt.rt = function(o){
	var t = 0;
	while(o){
	  t += o.offsetTop -o.scrollTop;
	  o = o.offsetParent;
	}
	return(t);
}

zt.rlo = function(o){
	var p = o;
	var j = p.offsetLeft;
	if(p.offsetParent != null)
	{
		j += zt.rlo(p.offsetParent);
	}
	return j;
}
zt.rto = function(o){
	var p = o;
	var j = p.offsetTop;
	if(p.offsetParent != null)
	{
		j += zt.rto(p.offsetParent);
	}
	return j;
}

zt.orl = function(o){
	var l = 0;
	while(o){
	  l += o.scrollLeft ? o.scrollLeft : 0;
	  o = o.parentNode;
	}
	return(l);
}
zt.ort = function(o){
	var t = 0;
	while(o){
	  t += o.scrollTop ? o.scrollTop : 0;
	  o = o.parentNode;
	}
	return(t);
}

zt.agent = navigator ? (navigator.userAgent ? navigator.userAgent: "") : "";
zt.uagent = navigator ? (navigator.userAgent ? navigator.userAgent.toUpperCase(): "") : "";
zt.ismo = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined');
zt.isIE = window.ActiveXObject ? true : false;
zt.isie6 = zt.uagent.indexOf("MSIE 6.") >= 0;
zt.isie7 = zt.uagent.indexOf("MSIE 7.") >= 0;
zt.isie8 = zt.uagent.indexOf("MSIE 8.") >= 0;
zt.isie9 = zt.uagent.indexOf("MSIE 9.") >= 0;
zt.isie10 = zt.uagent.indexOf("MSIE 10.") >= 0;
zt.isie5 = zt.uagent.indexOf("MSIE 5.") >= 0;
zt.isff = (zt.uagent.indexOf("FIREFOX")!=-1);
zt.isop = (zt.uagent.indexOf("OPERA")!=-1);
zt.issafri = (zt.uagent.indexOf("SAFARI")!=-1);
zt.ischrome = (zt.uagent.indexOf("CHROME")!=-1);
zt.isua = function(key)
{
	try{
		return zt.uagent.indexOf(key.toUpperCase()) >= 0;
	}catch(e){}
	return false;
}
zt.getUaName = function(){
	if(zt.isua("GreenBrowser"))return "GreenBrowser";
	else if(zt.isua("NetCaptor"))return "NetCaptor";
	else if(zt.isua("TencentTraveler"))return "TencentTraveler";
	else if(zt.isua("TheWorld"))return "TheWorld";
	else if(zt.isua("MAXTHON"))return "MAXTHON";
	else if(zt.isua("MyIE"))return "MyIE";
	else if(zt.isua("Netscape"))return "Netscape";
	else if(zt.isua("Firefox"))return "Firefox";
	else if(zt.isua("Chrome"))return "Chrome";
	else if(zt.isua("Safari"))return "Safari";
	else if(zt.isua("Opera Mini"))return "Opera Mini";
	else if(zt.isua("Opera"))return "Opera";
	else if(zt.isua("Presto"))return "Opera(Presto)";
	else if(zt.isua("R4EA"))return "R4EA";
	else if(zt.isua("UP"))return "UP";
	else if(zt.isua("UCWEB"))return "UCWEB";
	else if(zt.isie5)return "IE5";
	else if(zt.isie6)return "IE6";
	else if(zt.isie7)return "IE7";
	else if(zt.isie8)return "IE8";
	else if(zt.isie9)return "IE9";
	else if(zt.isie10)return "IE10";
	else if(zt.isie)return "IE";
	else return "OtherAgent";
}
zt.getOS = function(){
	if(zt.isua("Windows CE"))return "Windows CE";
	else if(zt.isua("iPhone"))return "iPhone";
	else if(zt.isua("BlackBerry"))return "BlackBerry";
	else if(zt.isua("Series60"))return "Series60";
	else if(zt.isua("NOKIA"))return "NOKIA";
	else if(zt.isua("SymbianOS"))return "SymbianOS";
	else if(zt.isua("SonyEricsson"))return "SonyEricsson";
	else if(zt.isua("LG"))return "LG";
	else if(zt.isua("MOT"))return "MOT";
	else if(zt.isua("SEC"))return "SEC";
	else if(zt.isua("ZTE"))return "ZTE";
	else if(zt.isua("DX"))return "DX";
	else if(zt.isua("TELSON"))return "TELSON";
	else if(zt.isua("Dopod"))return "Dopod";
	else if(zt.isua("PHILIPS"))return "PHILIPS";
	else if(zt.isua("Haier"))return "Haier";
	else if(zt.isua("LENOVO"))return "LENOVO";
	else if(zt.isua("CECT"))return "CECT";
	else if(zt.isua("NEC"))return "NEC";
	else if(zt.isua("Bird"))return "Bird";
	else if(zt.isua("DBTEL"))return "DBTEL";
	else if(zt.isua("TCL"))return "TCL";
	else if(zt.isua("oppo"))return "oppo";
	else if(zt.isua("AMOI"))return "AMOI";
	else if(zt.isua("Alcatel"))return "Alcatel";
	else if(zt.isua("Ericsson"))return "Ericsson";
	else if(zt.isua("BenQ"))return "BenQ";
	else if(zt.isua("KONKA"))return "KONKA";
	else if(zt.isua("ChangHong"))return "ChangHong";
	else if(zt.isua("MALATA"))return "MALATA";
	else if(zt.isua("KTOUCH"))return "KTOUCH";
	else if(zt.isua("MAUI"))return "MAUI";
	else if(zt.isua("MIDP")||zt.isua("JAVA")||zt.isua("J2ME"))return "MIDP";
	else if(zt.isua("Windows NT 6.1"))return "Windows 7";
	else if(zt.isua("Windows NT 6.0"))return "Windows Vista";
	else if(zt.isua("Windows NT 5.2"))return "Windows 2003";
	else if(zt.isua("Windows NT 5.1"))return "Windows XP";
	else if(zt.isua("Windows NT 5.0"))return "Windows 2000";
	else if(zt.isua("Windows NT"))return "Windows NT";
	else if(zt.isua("Windows 9"))return "Windows 9x";
	else if(zt.isua("Unix") || zt.isua("SunOS") || zt.isua("BSD"))return "Unix";
	else if(zt.isua("RedHat"))return "RedHat";
	else if(zt.isua("Ubuntu"))return "Ubuntu";
	else if(zt.isua("Linux"))return "Linux";
	else if(zt.isua("Mac"))return "Mac";
	else if(zt.isua("Windows"))return "Windows";
	else if(zt.isua("X11"))return "Linux";
	else if(zt.isua("Baiduspider"))return "Baiduspider";
	else if(zt.isua("Googlebot"))return "Googlebot";
	else if(zt.isua("msnbot"))return "msnbot";
	else if(zt.isua("Yahoo"))return "Yahoo";
	else if(zt.isua("Sogou"))return "Sogou";
	else if(zt.isua("YodaoBot"))return "YodaoBot";
	else if(zt.isua("Sosospider"))return "Sosospider";
	return "OtherOS";
}
zt.px = function()
{
	if(screen)return screen.width + "x" + screen.height;
	return "0x0";
}
zt.ua = {isie:zt.isIE,uaname:zt.getUaName(),osname:zt.getOS(),px:zt.px()};
zt.DefineCPair = function()
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
if(zt.isff) {zt.DefineCPair();}

zt.__GetDocType = function(){
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

zt.doctype = zt.__GetDocType();
zt.all = function()
{
	//..??	
	if(document.all)return document.all;
	else return document.getElementsByTagName("*");
}
zt.SetUploadWordHTML = function(sid, html)
{
	try{
		var newed = window[sid];
		if(newed)newed.putHTML(html);
	}catch(Ex){}
}
// Dom adapter
zt.DOMAdapter = function(elists)
{
	this.el = elists; // Array of Elements
	this.each = function(cb)
	{
		try{
			for(var i = 0; i < this.el.length; i++)
			{
				try{cb(this.el[i], i);}catch(Ext){}
			}
		}catch(Ex){}
	}
	this.css = function(name, v)
	{
		try{
			if(name == "float")name = "cssFloat";
			this.each(function(e){e.style[name] = v;})
		}catch(Et){}
		return this;
	}
	this.addcss = function(v)
	{
		try{
			this.each(function(e){
				var cn = e.className;
				if(cn == null || cn == "")cn = v;
				else cn = cn + " " + v;
				e.className = cn;
			});
		}catch(Et){}
		return this;
	}
	this.removecss = function(v)
	{
		try{
			this.each(function(e){
				var cn = e.className;
				if(cn == null || cn == "")cn="";
				var nc = [];
				if(cn == "")return;
				var cns = cn.split(" ");
				for(var i = 0; i < cns.length; i++)
				{
					if(cns[i] != v && cns[i] != "")nc.push(cns[i]);
				}
				e.className = nc.join(" ");
			});
		}catch(Et){}
		return this;
	}
	this.sethtml = function(v)
	{
		try{
			this.each(function(e){e.innerHTML = v;})
		}catch(Et){}
		return this;
	}
	this.html = function()
	{
		try{
			return this.el[0].innerHTML;
		}catch(Et){}
		return "";
	}
	this.sv = function(v)
	{
		try{
			this.each(function(e){e.value = v;})
		}catch(Et){}
		return this;
	}
	this.value = function(v)
	{
		try{
			return this.el[0].value;
		}catch(Et){}
		return "";
	}
	this.attr = function(name,v)
	{
		try{
			this.each(function(e){e.setAttribute(name,v);})
		}catch(Et){}
		return this;
	}
	this.ga = function(name)
	{
		try{
			return this.el[0].getAttribute(name);
		}catch(Et){}
		return "";
	}
	this.reset = function()
	{
		try{
			this.each(function(e){e.reset();})
		}catch(Et){}
		return this;
	}
	this.show = function()
	{
		try{
			this.each(function(e){e.style.display="block";})
		}catch(Et){}
		return this;
	}
	this.hide = function()
	{
		try{
			this.each(function(e){e.style.display="none";})
		}catch(Et){}
		return this;
	}
	this.click = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("click",cb,e);})
		}catch(Et){}
		return this;
	}
	this.load = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("load",cb,e);})
		}catch(Et){}
		return this;
	}
	this.unload = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("unload",cb,e);})
		}catch(Et){}
		return this;
	}
	this.dblclick = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("dblclick",cb,e);})
		}catch(Et){}
		return this;
	}
	this.ready = function(cb)
	{		
		try{
			if(document.addEventListener){
				this.each(function(e){zt.addevent("DOMContentLoaded",cb,e);})
			}else{
				 document.onreadystatechange = function()
				 {
					 if(document.readyState=="complete")
					 {
						 cb();
					 }
				 }
			}
		}catch(Et){}
		return this;
	}
	this.keydown = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("keypress",cb,e);})
		}catch(Et){}
		return this;
	}
	this.keyup = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("keyup",cb,e);})
		}catch(Et){}
		return this;
	}
	this.mouseover = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("mouseover",cb,e);})
		}catch(Et){}
		return this;
	}
	this.mouseout = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("mouseout",cb,e);})
		}catch(Et){}
		return this;
	}
	this.mousemove = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("mousemove",cb,e);})
		}catch(Et){}
		return this;
	}
	this.mousedown = function(cb)
	{
		try{
			this.each(function(e){zt.addevent("mousedown",cb,e);})
		}catch(Et){}
		return this;
	}
	this.addevent = function(name, cb)
	{
		try{
			this.each(function(e){zt.addevent(name,cb,e);})
		}catch(Et){}
		return this;
	}
	this.removeevent = function(name, cb)
	{
		try{
			this.each(function(e){zt.removeevent(name,cb,e);})
		}catch(Et){}
		return this;
	}
	this.cw = function()
	{
		try{
			this.el[0].clientWidth;
		}catch(Et){}
		return 0;
	}
	this.ch = function()
	{
		try{
			this.el[0].clinetHeight;
		}catch(Et){}
		return 0;
	}
}
zt.getlist = function(al,fs)
{
	var root = [];
	var i = 0;
	if(fs.indexOf(".") == 0 || fs.indexOf("#") == 0)
	{
		var dot = fs.indexOf(".") == 0;
		var sht = fs.indexOf("#") == 0;
		var nm = fs.substring(1);
		al = zt.getsubs(al);
		for(i = 0; i < al.length; i++)
		{
			var n = al[i];
			if(dot && (!n || !n.className))continue;
			if(dot && (n.className == (nm) || n.className.indexOf(nm+" ") >= 0 || n.className.indexOf(" " + nm) >= 0))
			{
				root.push(n);
			}else if(sht && n.id == nm)
			{
				root.push(n);
			}
		}
	}else if(fs.indexOf("@") == 0){
		var nm = fs.substring(1);
		for(i = 0; i < al.length; i++){
			var subs = al[i].childNodes; // TAG
			for(var j = 0; j < subs.length; j++){
				if(nm == subs[j].tagName)root.push(subs[j]);
			}
		}
	}else{
		for(i = 0; i < al.length; i++){
			var subs = al[i].getElementsByTagName(fs); // TAG			
			for(var j = 0; j < subs.length; j++)root.push(subs[j]);
		}
	}
	return root;
}
zt.getsubs = function(al)
{
	var root = [];
	for(var i = 0; i < al.length; i++){
		var ch = al[i].childNodes;
		if(ch){
			for(var j = 0; j < ch.length; j++){
				root.push(ch[j]);
			}
		}
	}
	return root;
}
zt.$ = function(args)
{
	if(args == undefined || args == "")args = document;
	//..??	
	// args may be TAGName, ClassName, ID list
	// ClassName startwith dot, ID startwith #
	// e.g "div #board" stand for the element that is in the subtree of div
	var el = [];
	if(zt.isString(args))
	{
		var es = args.split(" ");
		var fs = es[0];
		var root = [];
		var i = 0;
		if(fs.indexOf(".") == 0 || fs.indexOf("#") == 0 || fs.indexOf("@") == 0)
		{
			root = zt.getlist(zt.all(), fs);
		}else{
			root = document.getElementsByTagName(fs); // TAG
		}
		//alert(root.length);
		for(i=1;i<es.length;i++)
		{
			root = zt.getlist(root, es[i]);
		}
		el = root;
	}else{
		el.push(args); // object
	}
	return new zt.DOMAdapter(el);
}
/*Return XML dom from XML String*/
zt.dom = function(xml)
{
	var dom = null, tmp;
	try {
		if ( window.DOMParser ) { // DOM Standard
			dom = new DOMParser().parseFromString(xml, "text/xml" );
		}else{ // for IE
			dom = new ActiveXObject( "Microsoft.XMLDOM" );
			dom.async = "false";
			dom.loadXML(xml);
		}
	}catch(e){}
	return dom;
}
// addEventListener for obj or window(if obj is null or not speci)
zt.addevent = function(id,f,obj)
{
	var o = obj||window;
	if(o.addEventListener)o.addEventListener(id,f,false);
	else o.attachEvent("on"+id,f);
}
zt.removeevent = function(id,f,obj)
{
	var o = obj||window;
	//id = "on"+id;
	if(o.removeEventListener)o.removeEventListener(id,f,false);
	else o.detachEvent("on"+id,f);
}
zt.domain = function(d){document.domain = d;}

// Cookie Operations
zt.cv = function(offset) // read COOKIE
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
zt.sc = function(name, value) // set COOKIE
{
	var expdate = new Date();
	var argv = zt.sc.arguments;
	var argc = zt.sc.arguments.length;
	var expires = (argc > 2) ? argv[2] : null;
	var path = (argc > 3) ? argv[3] : null;
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : false;
	if(expires != null)
		expdate.setTime(expdate.getTime() + ( expires * 1000 ));
	document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
		+((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
		+((secure == true) ? "; secure" : "");
}
zt.dc = function(name) //Cookie
{
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);
	var cval = zt.gc(name);
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}
zt.gc = function(name)//get Cookie value
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen)
	{
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return zt.cv(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}
// AJAX Supports
zt.getreq = function()
{
	var request;
	if(window.XMLHttpRequest) {
		var request = new XMLHttpRequest();
		if(request.overrideMimeType) {
			request.overrideMimeType('text/xml');
		}
		//this.request.onreadystatechange = this.StatusProcessor;
	} else if(window.ActiveXObject) { //  For branch of windows
		var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
		for(var i=0; i < versions.length; i++) {
			try {
				request = new ActiveXObject(versions[i]);
				if(this.request) {
					//this.request.onreadystatechange = this.StatusProcessor;
					return request;
				}
			} catch(e) {
			}
		}
	}
	return request;
}
zt.http = function(url, method, datas, cb, xml, asyn, user, pass, hds)
{
	var req = zt.getreq();
	req.onreadystatechange = function()
	{
		switch(req.readyState)
		{
			case 4:
				if(req.status == 200) {
					if(cb)
						if(xml) { // XML
							cb(req.responseXML, 200);	
						} else { // HTML
							cb(req.responseText, 200);
						}
				} else { // ERROR
					cb(req, req.status);	
				}
			break;
		}
	}
	
	if(window.XMLHttpRequest) {
		req.open(method, url, asyn);
		if(method == "POST"){
			try{
				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}catch(Exc){}
		}
		try{
		if(hds)for(var n in hds)
		{
			var sh = hds[n];
			req.setRequestHeader(n, sh);
		}}catch(Ex){}
		req.send(datas);
	} else {
		req.open(method, url, asyn);
		if(method == "POST"){
			try{
				req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}catch(Exc){}
		}
		try{
		if(hds)for(var n in hds)
		{
			var sh = hds[n];
			req.setRequestHeader(n, sh);
		}}catch(Ex){}
		if(method == "POST")req.send(datas);
		else req.send();
	}
}
// HTTP Post
zt.post = function(url,datas,cb,hds)
{
	zt.http(url,"POST",datas, cb, true, true, null, null, hds);
}
// HTTP Get
zt.get = function(url,cb,hds)
{
	zt.http(url,"GET",null, cb, true, true, null, null, hds);
}
// HTTP Post
zt.posthtml = function(url,datas,cb,hds)
{
	zt.http(url,"POST",datas, cb, false, true, null, null, hds);
}
// HTTP Get
zt.gethtml = function(url,cb,hds)
{
	zt.http(url,"GET",null, cb, false, true, null, null, hds);
}
zt.RP = function()
{
	var u = window.location.href;
	var pos = u.indexOf("#");
	if(pos > 0)u = u.substring(0, u);
	window.location = u;
}
zt.p = function(id,name)
{
	var sn = id;
	if(name)sn = name;
	var vx = zt.v(id);
	if(!vx)vx="";
	return "&"+sn + "=" + ENC(vx);
}
zt.pe = function(id,name)
{
	var sn = id;
	if(name)sn = name;
	var vx = zt.g(id);
	if(!vx)vx="";
	else vx = zt.v(id);
	return "&"+sn + "=" + ENC(vx);
}
zt.mkvs = function(p)
{
	var dt = "";
	var dc = document || p;
	if(!dc)return "";
	var ips = dc.getElementsByTagName("input");
	if(ips)
	{
		for(var i = 0; i < ips.length; i++)
		{
			var type = ips[i].type;
			type = type + "";
			type = type.toLowerCase();
			if(type == "checkbox")
			{
				if(ips[i].checked)dt += "&" + ips[i].id + "=" + ENC(ips[i].value);
				else dt += "&" + ips[i].id + "=" + 0;
			}else if(type == "radio")
			{
				if(ips[i].checked)dt += "&" + ips[i].name + "=" + ENC(ips[i].value);
			}else if(type == "text" || type == "hidden" || type == "file" || type == "password")
			{
				dt += "&" + ips[i].id + "=" + ENC(ips[i].value);
			}
		}
	}
	ips = dc.getElementsByTagName("select");
	if(ips)
	{
		for(var i = 0; i < ips.length; i++)
		{
			dt += "&" + ips[i].id + "=" + ENC(ips[i].value);
		}
	}
	ips = dc.getElementsByTagName("textarea");
	if(ips)
	{
		for(var i = 0; i < ips.length; i++)
		{
			dt += "&" + ips[i].id + "=" + ENC(ips[i].value);
		}
	}
	return dt;
}

zt.hide = function(id){try{zt.g(id).style.display='none';}catch(e){}}
zt.show = function(id){try{zt.g(id).style.display='block';}catch(e){}}
zt.sh = function(id){try{var d=zt.g(id);var sd=d.style.display;d.style.display=(sd=="none"?"block":"none");}catch(e){}}
zt.css = function(id,sid,value){var d=zt.g(id).style;var sv=d[sid];if(value)d[sid]=value;return sv;}
zt.PopWin = function(ee, id)
{	
	var e = ee ? ee : (window.event ? window.event : null);
	if(!e){
		e = new Object();
		e.clientX = 10;
		e.clientY = 10;
	}
	
	var g = zt.g(id); //_GetWin();
	
	var x = (e.clientX + zt.sl());
	var y = (e.clientY + zt.st());
	
	g.style.position = "absolute";
	g.style.display = "block";
	
	var cx = 550;
	var cy = 300;
	try{
		cx = zt.ow(g);
		cy = zt.oh(g);
	}catch(Exc){}
	if(cx <= 0)cx = 550;
	if(cy <= 0)cy = 300;
	
	var w = cx;
	var h = cy;
	
	//alert(x + "/" + y);
	
	var ww = zt.w();
	var hh = zt.h();
	
	if(y + h > hh && y > h)y = y - h+zt.sl();
	if(x + w > ww && x > w)x = x - w+zt.st();
	//y += 10;
	
	g.style.left = (zt.sl()+x) + "px";
	g.style.top = (zt.st()+y) + "px";
	
	
	var oh = zt.oh(g);
	var tt = null, tm = null, to = null;
	var ch = g.getElementsByTagName("div");
	for(var i=0;i<ch.length;i++)
	{
		var tn = ch[i];
		if(tn.className == "title")tt = tn;
		if(tn.className == "contents")tm = tn;
		if(tn.className == "ops")to = tn;
	}
	if(tt && tm && to)
	{
		tm.style.height = (oh-zt.oh(tt)-zt.oh(to))+"px";
	}else if(tm && to)
	{
		tm.style.height = (oh-zt.oh(to))+"px";
	}else if(tm && tt)
	{
		tm.style.height = (oh-zt.oh(tt))+"px";
	}else if(tm)
	{
		tm.style.height = (oh)+"px";
	}
}
zt.PopWinAT = function(obj, id)
{
	var g = zt.g(id); //_GetWin();
	var x = zt.rl(obj);
	var y = (zt.rt(obj)+zt.oh(obj));
	var w = zt.w();
	var h = zt.h();
	
	g.style.position = "absolute";
	g.style.display = "block";
	
	var cx = 550;
	var cy = 300;
	try{
		cx = zt.ow(g);
		cy = zt.oh(g);
	}catch(Exc){}
	if(cx <= 0)cx = 550;
	if(cy <= 0)cy = 300;
	//alert(zt.ort(obj));
	if(x + cx > w+zt.sl())x = w-(cx+10)+zt.sl();
	if(y + cy > h+zt.st())y = h-(cy+10)+zt.st();
	g.style.left = (-zt.orl(obj)+x) + "px";
	g.style.top = (-zt.ort(obj)+y) + "px";
	
	
	var oh = zt.oh(g);
	var tt = null, tm = null, to = null;
	var ch = g.getElementsByTagName("div");
	for(var i=0;i<ch.length;i++)
	{
		var tn = ch[i];
		if(tn.className == "title")tt = tn;
		if(tn.className == "contents")tm = tn;
		if(tn.className == "ops")to = tn;
	}
	if(tt && tm && to)
	{
		tm.style.height = (oh-zt.oh(tt)-zt.oh(to))+"px";
	}else if(tm && to)
	{
		tm.style.height = (oh-zt.oh(to))+"px";
	}else if(tm && tt)
	{
		tm.style.height = (oh-zt.oh(tt))+"px";
	}else if(tm)
	{
		tm.style.height = (oh)+"px";
	}
}

zt.cal = function(fid,type,dttype,dp)
{
	document.write('<img src="'+zt.base+'verip_private/cal/cal.gif" style="cursor:pointer" align="absmiddle" onMouseDown="calendar.show(\''+fid+'\', \''+fid+'\', '+(type?type:3)+', event, \''+(dttype ? dttype : 0)+'\', \''+(dp ? dp : false)+'\');"/>');
}
zt.chopac = function(id,opacity) { 
	var object = zt.g(id); 
	object.style.opacity = (opacity / 100); 
	object.style.MozOpacity = (opacity / 100); 
	object.style.KhtmlOpacity = (opacity / 100); 
	object.style.filter = "alpha(opacity=" + opacity + ")"; 
} 
zt.blend = function(id, opacStart, opacEnd, speedc) {  // Blend the id object
	//zt.g(id).style.visibility = "visible";
	var timer = 0; 
	var i = 0;
	var speed = speedc ? speedc : 20;
	if(opacStart > opacEnd) { 
		for(i = opacStart; i >= opacEnd; i-=5) { 
			setTimeout("zt.chopac('"+id+"'," + i + ")",timer * (speed)); 
			timer++; 
		} 
	} else if(opacStart < opacEnd) { 
		for(i = opacStart; i <= opacEnd; i+=5) 
		{ 
			setTimeout("zt.chopac('"+id+"'," + i + ")",timer * (speed)); 
			timer++; 
		} 
	} 
} 
// show id'object as listbox
zt.showaslist = function(id)
{
	var o = null;
	if(typeof(id)=="string")o = zt.g(id);
	else o = id;
	
}
//RegDrag
zt.begindrag = false;
zt.regDrag = function(obj,dragby)
{
	if(!obj)return;
	obj = typeof(obj) == "string" ? zt.g(obj) : obj;
	
	dragby = typeof(dragby) == "string" ? zt.g(dragby) : dragby;
	
	obj.style.position = "absolute";
	var divs = obj.getElementsByTagName("div");
	var dragbar = null;
	// find title
	for(var i = 0; i < divs.length; i++)
	{
		if(divs[i]["class"] == "title" || divs[i].className=="title" || divs[i].getAttribute("class") == "title")
		{
			dragbar = divs[i];break;
		}
	}
	if(!dragbar && dragby)dragbar = dragby;
	
	var title = dragbar ? dragbar : obj;
	
	if(title == null)return;
	title.style.cursor="move";
	title.onmousedown = function (e)
	{
		if (!document.all) e.preventDefault();
		var oPos = zt.objxy(obj);
		var cPos = zt.exy(e);
		zt.begindrag = true;
		document.onmouseup = function (e){
			zt.begindrag = false;
			document.onmouseup = null;
			title.onmousemove = null;
	    };
		title.onmousemove = function (e)
		{
			if (zt.begindrag)
			{
				var Pos = zt.exy(e);
				obj.style.left = Pos.x - cPos.x + oPos.x + 'px';
				obj.style.top = Pos.y - cPos.y + oPos.y + 'px';
			}
			return false;
		}
	}	
}
zt.objxy = function(obj)
{
	var x = y = 0;
	if (obj.getBoundingClientRect)
	{
		var box = obj.getBoundingClientRect();
		var D = document.documentElement;
		x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
		y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop;		
	}
	else
	{
		for(; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent );
	}
	return {'x':x, 'y':y};
}

zt.exy = function(e)
{
	e = e || window.event;
	var D = document.documentElement;
	if (e.pageX) return {x: e.pageX, y: e.pageY};
	return {
		x: e.clientX + D.scrollLeft - D.clientLeft,
		y: e.clientY + D.scrollTop - D.clientTop	
	};
}


// Adapter for old version OMS API
// using: var ht = new ZTHttp(true); ht.post....
function ZTHttp(doxml)
{
	this.xml = typeof(doxml) == "undefined" ? false : doxml;
	this.post = function(url,datas,cb)
	{
		if(this.xml)zt.post(url,datas, cb, null);
		else zt.posthtml(url,datas, cb, null);
	}
	this.get = function(url,cb)
	{
		if(this.xml)zt.get(url, cb, null);
		else zt.gethtml(url, cb, null);
	}
}
zt.ws = function(wsname,params,cb)
{
	var url = zt.base + "omswsaccess.oms?rd=" + Math.random();
	//var zt = new ZTHttp(true);	
	zt.post(url, "localca=true&service="+wsname+"&" + params, function(s){
		if(s && s.documentElement)
		{
			try{
				if(typeof(cb) != "undefined")cb(s);
			}catch(e)
			{
				alert(__l("ws.err"));
			}
		}
	});
}

// UISupport
zt.resizelist = [];
zt.timers = [];
zt.onloads  = [];
zt.addResize = function(rf){zt.resizelist.push(rf);}
zt.addTimer = function(rf,intv){zt.timers.push({'cb':rf,'intv':intv,'last':0});}
zt.addLoad = function(rf){zt.onloads.push(rf);}

zt.Timer = function()
{
	try{
		for(var i = 0; i < zt.timers.length; i++)
		{
			try{
				var f = zt.timers[i];
				if(f && f.cb){
					var n = new Date().getTime();
					if(n-f.last>f.intv)
					{
						f.last = n;
						f.cb();
					}
				}
			}catch(ex){};
		}
	}catch(e){}
}
zt.Resize = function()
{
	try{
		for(var i = 0; i < zt.resizelist.length; i++)
		{
			try{
				var f = zt.resizelist[i];
				if(f)f();
			}catch(ex){};
		}
	}catch(e){}
}
zt.UIAdapter = function(ee)
{
	try{
		for(var i = 0; i < zt.onloads.length; i++)
		{
			try{
				var f = zt.onloads[i];
				if(f)f();
			}catch(ex){};
		}
	}catch(e){}
	setInterval("zt.Timer()", 1);
}

if(window.addEventListener){
	window.addEventListener("load", zt.Resize, false);
	window.addEventListener("load", zt.UIAdapter, false);
	window.addEventListener("resize", zt.Resize, false);
}
if(window.attachEvent){
	window.attachEvent("onload", zt.Resize);
	window.attachEvent("onload", zt.UIAdapter);
	window.attachEvent("onresize", zt.Resize);
}

(function($){
	$.encv = function(v,p)
	{
		try{
			return p ? ENC(v) : encodeURIComponent(v);
		}catch(Exc){}
		return v+"";
	}
	//zt extends
	$.vid = function(pid,enc)
	{
		var o = zt.g(pid);
		var s = "autogetdata_verip_div=true";
		var ip = o.getElementsByTagName("input");
		var penc = enc == undefined ? true : enc;
		var caches = {};
		for(var i = 0; ip && i < ip.length; i++)
		{
			var p = ip[i];
			if((p.type == "text" || p.type == "hidden" || p.type == "password") && p.id && p.id != "")
			{
				s += "&" + p.id + "=" + zt.encv(p.value, penc);
			}else if(p.type == "radio" && p.name && p.name != "" && !caches[p.name])
			{
				var cks = document.getElementsByName(p.name);
				var v = "";
				for(var j = 0; j < cks.length; j++)
				{
					if(cks[j].checked){v = (cks[j].value);break;}
				}
				s += "&" + p.name + "=" + zt.encv(v, penc);
				caches[p.name] = true;
			}else if(p.type == "checkbox" && p.name && p.name != "" && !caches[p.name])
			{
				var cks = document.getElementsByName(p.name);
				var vs = [];
				for(var j = 0; j < cks.length; j++)
				{
					if(cks[j].checked)vs.push(cks[j].value);
				}
				s += "&" + p.name + "=" + zt.encv(vs.join(','), penc); //ENC(vs.join(','));
				caches[p.name] = true;
			}
		}
		ip = o.getElementsByTagName("select");
		for(var i = 0; ip && i < ip.length; i++)
		{
			var p = ip[i];
			if(p.id && p.id != "")
			{
				s += "&" + p.id + "=" + zt.encv(p.value, penc); //ENC(p.value);
			}
		}
		ip = o.getElementsByTagName("textarea");
		for(var i = 0; ip && i < ip.length; i++)
		{
			var p = ip[i];
			if(p.id && p.id != "")
			{
				s += "&" + p.id + "=" + zt.encv(p.value, penc); //ENC(p.value);
			}
		}
		return s;
	}
	
	$.fid = function(id,fx)
	{
		if(id.indexOf(fx) == 0)
		{
			id = id.substring(fx.length);
		}
		return id;
	}
	$.vidf = function(pid, fx, enc)
	{
		var o = zt.g(pid);
		var s = "autogetdata_verip_div=true";
		var ip = o.getElementsByTagName("input");
		var penc = enc == undefined ? true : enc;
		var caches = {};
		for(var i = 0; ip && i < ip.length; i++)
		{
			var p = ip[i];
			if((p.type == "text" || p.type == "hidden" || p.type == "password") && p.id && p.id != "")
			{
				s += "&" + $.fid(p.id,fx) + "=" + zt.encv(p.value, penc); //ENC(p.value);
			}else if(p.type == "radio" && p.name && p.name != "" && !caches[p.name])
			{
				var cks = document.getElementsByName(p.name);
				var v = "";
				for(var j = 0; j < cks.length; j++)
				{
					if(cks[j].checked){v = (cks[j].value);break;}
				}
				s += "&" + $.fid(p.name,fx) + "=" + zt.encv(v, penc); //ENC(v);
				caches[p.name] = true;
			}else if(p.type == "checkbox" && p.name && p.name != "" && !caches[p.name])
			{
				var cks = document.getElementsByName(p.name);
				var vs = [];
				for(var j = 0; j < cks.length; j++)
				{
					if(cks[j].checked)vs.push(cks[j].value);
				}
				s += "&" + $.fid(p.name,fx) + "=" + zt.encv(vs.join(','), penc); //ENC(vs.join(','));
				caches[p.name] = true;
			}
		}
		ip = o.getElementsByTagName("select");
		for(var i = 0; ip && i < ip.length; i++)
		{
			var p = ip[i];
			if(p.id && p.id != "")
			{
				s += "&" + $.fid(p.id,fx) + "=" + zt.encv(p.value, penc); //ENC(p.value);
			}
		}
		ip = o.getElementsByTagName("textarea");
		for(var i = 0; ip && i < ip.length; i++)
		{
			var p = ip[i];
			if(p.id && p.id != "")
			{
				s += "&" + $.fid(p.id,fx) + "=" + zt.encv(p.value, penc); //ENC(p.value);
			}
		}
		return s;
	}
	$.gin = function(list, id)
	{
		for(var i = 0; i < list.length; i++)
		{
			if(list[i].id == id)return list[i];
		}
		return null;
	}
	$.glin = function(list, name)
	{
		var e = [];
		for(var i = 0; i < list.length; i++)
		{
			try{
				if(list[i].name){if(list[i].name == name)e.push(list[i]);}
			}catch(EtX){}
		}
		return e;
	}
	$.s = function(pid,n)
	{
		//alert(pid);
		var o = zt.g(pid);
		var list = o.getElementsByTagName("input");
		var sel = o.getElementsByTagName("select");
		
		// Set Value from XMLNode n
		var dt = [];
		//n.getElementsByTagName("data");
		for(var x=0;x<n.childNodes.length;x++)
		{
			var y = n.childNodes[x];
			if(y && y.tagName && y.tagName == "data"){
				dt.push(y);
			}
		}
		if(dt)
		{
			for(var i = 0; i < dt.length; i++)
			{
				var d = dt[i];
				var name = zt.ga(d,"name");
				var value = zt.xmlv(d);
				try{
					var t = zt.gin(list, name); // by id for text,hidden,textarea,select
					if(!t)t = zt.gin(sel, name);
					//alert(t+"/"+name+"/"+value);
					if(t){
						t.value = value;
					}else{
						var cks = zt.glin(list, name); // by name for radio/checkbox
						var dv = value.split(",");
						//alert(name+"/"+value);
						for(var j = 0; j < cks.length; j++)
						{
							for(var k = 0; k < dv.length; k++)
							{
								if(dv[k] == cks[j].value)cks[j].checked = true;
							}
						}
					}
				}catch(Et){}
			}
		}
	}
	$.sa = function(o,cn,an,st)
		{
			try{
				var ca = zt.fnode(o,cn);
				if(ca)
				{
					ca = zt.fnodea(ca,'data', 'name', an);
					zt.g(st).value = zt.xmlv(ca);
				}
			}catch(Exc){}
		}
	$.checksel = function(cb)
	{
		var cbs = document.getElementsByName(cb.name);
		for(var i = 1; i < cbs.length; i++)
		{
			cbs[i].checked = cb.checked;
		}
	}
	$.selcb = function(name,ty)
	{
		var cbs = document.getElementsByName(name);
		for(var i = 0; i < cbs.length; i++)
		{
			if(cbs[i].value != "")
			{
				if(ty == 0)cbs[i].checked = true;
				else if(ty == 2)cbs[i].checked = false;
				else cbs[i].checked = !cbs[i].checked;
			}
		}
	}
	$.getsel = function(name)
	{
		var cbs = document.getElementsByName(name);
		var dt = [];
		for(var i = 0; i < cbs.length; i++)
		{
			if(cbs[i].checked && cbs[i].value != "")
			{
				dt.push(cbs[i].value);
			}
		}
		return dt.join(",");
	}
	$.cssdeletestr = function(cn,n)
	{
		var k = [];
		try{
			var cns = cn.split(" ");
			for(var i = 0; i < cns.length; i++){
				if(cns[i] == n)continue;
				k.push(cns[i]);
			}
		}catch(xc){}
		return k.join(" ");
	}
	$.cssdelete = function(o,n,setto)
	{
		try{
			var c = zt.cssdeletestr(o.className, n);
			if(setto != undefined)o.className = c;
			return c;
		}catch(xc){}
		return "";
	}
	
	$.csshas = function(o,n)
	{
		try{
			var cns = o.className.split(" ");
			for(var i = 0; i < cns.length; i++){
				if(cns[i] == n)return true;
			}
		}catch(xc){}
		return false;
	}
	
	$.cssaddstr = function(cn,n)
	{
		var k = [];
		try{
			var cns = cn.split(" ");
			for(var i = 0; i < cns.length; i++){
				if(cns[i] == n)continue;
				k.push(cns[i]);
			}
		}catch(xc){}
		k.push(n);
		return k.join(" ");
	}
	$.cssadd = function(o,n,setto)
	{
		try{
			var c = zt.cssaddstr(o.className, n);
			if(setto != undefined)o.className = c;
			return c;
		}catch(xc){}
		return "";
	}
})(zt);
// XMLResponse Helper Method!
/*
 <c><code>code</code><extinfo/></c>
*/
zt.code = function(s)
{
	try{
		if(s && s.documentElement)
		{
			return zt.xmlv(zt.node(s.documentElement, "code"));
		}
	}catch(Exc){}
	return "0";
}
zt.icode = function(s)
{
	try{
		var c = parseInt(zt.code(s));
		if(!isNaN(c))return c;
	}catch(Exc){}
	return 0;
}
zt.isok = function(s)
{
	return zt.icode(s) == 200;
}
zt.data = function(s,i)
{
	try{
		if(s && s.documentElement)
		{
			return zt.xmlv(zt.nodes(s.documentElement, "extinfo")[i]);
		}
	}catch(Exc){}
	return "";
}

// Get data-id的属性值,并转成int
zt.datavi = function(o,id)
{
	try{
		var v = zt.ga(o, "data-"+id);
		if(v == undefined  || v == null || v == "")return 0;
		var i = parseInt(v);
		if(isNaN(i))return 0;
		return i;
	}catch(xc){}
	return 0;
}
// Get data-id 值,返回字符串,出错,未定义返回空
zt.datavs = function(o,id)
{
	try{
		var v = zt.ga(o, "data-"+id);
		if(v == undefined || v == null || v == "")return "";
		return v;
	}catch(xc){}
	return "";
}
// is p as the parent or self of c!
zt.ischildex = function(c,p)
{
	if(c == null || p == null)return false;
	var pp = c;
	while(pp){
		if(pp == p)return true;
		pp = pp.parentNode;
	}
	return false;
}
// is p as the parent of c!
zt.ischild = function(c,p)
{
	if(c == null || p == null)return false;
	var pp = c.parentNode;
	while(pp){
		if(pp == p)return true;
		pp = pp.parentNode;
	}
	return false;
}
// Extends opt by opts
zt.extends = function(opt, opts)
{
	if(opts != undefined && opt != undefined)
	{
		for(var key in opts){
			try{
				opt[key] = opts[key];
			}catch(xc){}
		}
	}
}
// parseto int no error!
zt.parseint = function(v)
{
	try{
		if(v == undefined)return 0;
		var vi = parseInt(v);
		if(isNaN(vi))vi = 0;
		return vi;
	}catch(xc){}
	return 0;
}
// parseto int no error!
zt.parsefloat = function(v)
{
	try{
		if(v == undefined)return 0;
		var vi = parseFloat(v);
		if(isNaN(vi))vi = 0;
		return vi;
	}catch(xc){}
	return 0;
}
zt.onLoadOK = null;
zt.onLoadError = null;
zt.loadjs = function(url)
{
	try{
		if(url.indexOf('?') > 0){
			url += "&_vload_rdm="+Math.random();
		}else{
			url += "?_vload_rdm="+Math.random();
		}
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.async = false;
		s.onload = function(e){
			try{
				if(zt.onLoadOK)zt.onLoadOK(url, e);
			}catch(xc){}
		};
		s.onerror = function(e){
			try{
				if(zt.onLoadError)zt.onLoadError(url, e);
			}catch(xc){}
		};
		s.src = url;
		
		document.getElementsByTagName("head")[0].appendChild(s);
	}catch(xc){}
	return zt;
}
zt.sheets = {};
zt.createsheet = function(id,media,def)
{
	try{
		if(zt.sheets[id])return zt;
		var s = document.createElement("style");
		s.type = "text/css";
		if(media != undefined)if(media != "" && media != null)s.media = media;
		s.appendChild(document.createTextNode(def ? def : ""));		
		document.getElementsByTagName("head")[0].appendChild(s);
		zt.sheets[id] = s;
	}catch(xc){}
	return zt;
}
zt.addrule = function(id,selector,rule,index)
{
	try{
		var s = null;
		if(index == undefined)index = -1;
		if(zt.sheets[id])s = zt.sheets[id].sheet;
		else s = document.styleSheets[0];
		
		if(s.insertRule)s.insertRule(selector+"{"+rule+"}",index);
		else s.addRule(selector, rule, index);
	}catch(xc){console.log(xc)}
	return zt;
}
zt.addruletext = function(id,selector,rule)
{
	try{
		var s = null;
		if(index == undefined)index = -1;
		if(zt.sheets[id])s = zt.sheets[id];		
		s.appendChild(document.createTextNode(selector+"{"+rule+"}"));		
	}catch(xc){console.log(xc)}
	return zt;
}








