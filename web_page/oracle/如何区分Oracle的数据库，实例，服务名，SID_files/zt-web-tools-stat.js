// JavaScript Document
var _oms_tools_stat = _oms_tools_stat||{};
_oms_tools_stat.params = _oms_tools_stat.params||{};
_oms_tools_stat.version = 2.0;
_oms_tools_stat.uid = "";
function _oms_parse_stat_url()
{
	try{
		var sc = document.getElementsByTagName("script");
		if(!sc)return;
		var js_src = "";
		for(var i = 0; i < sc.length; i++)
		{
			if(sc[i].src)
			{
				if(sc[i].src.indexOf("zt-web-tools-stat.js") >= 0)
				{
					js_src = sc[i].src;
					break;
				}
			}
		}
		var pos = js_src.indexOf("?");
		if(pos > 0)
		{
			var ps = js_src.substring(pos+1);
			var pns = ps.split("&");
			for(var i = 0 ; i < pns.length; i++)
			{
				var pn = pns[i].split("=", 2);
				if(pn.length == 2)
				{
					_oms_tools_stat.params[pn[0]] = pn[1];
				}
			}
			//alert(_oms_tools_stat.params["uid"]);
			_oms_tools_stat.uid = _oms_tools_stat.params["uid"];
		}
	}catch(e){}
}
_oms_parse_stat_url();

_oms_tools_stat.gc = function(name)
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen)
	{
		var j = i + alen;
		if(document.cookie.substring(i, j) == arg)
		{
			var endstr = document.cookie.indexOf (";", j);
			if (endstr == -1)
				endstr = document.cookie.length;
			return unescape(document.cookie.substring(j, endstr));
		}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break;
	}
	return null;
}
_oms_tools_stat.gn = function(name,def)
{
	var d = this.gc(name);
	if(d == null || d == "")return def;
	try{return parseFloat(d);}catch(e){}
	return def;
}
_oms_tools_stat.gcs = function(name,value,date)
{
	if(!document.cookie || !name)return; // Not Support
	if(date)
	{
		document.cookie = name + "="+escape(value+"")+";expires="+date.toGMTString()+ ";path=/";
	}else
	{
		document.cookie = name + "="+escape(value+"")+";path=/";
	}
}
_oms_tools_stat.hash = function(s)
{
	if(!s)return 0;
	var v = 0;
	for(var i = 0; i < s.length; i++)
	{
		v = 31*v + s.charCodeAt(i);
	}
	return v;
}

var _oms_d = new Date();
_oms_d.setTime(_oms_d.getTime() + 365.0 * 24.0 * 60.0 * 60.0 * 1000.0); // vid save one year
// generate the visit id for user(one vid per client, not one vid per counter!!!)
_oms_tools_stat.vid = _oms_tools_stat.gc("vid");
_oms_tools_stat.newv = false;
if(_oms_tools_stat.vid == null || _oms_tools_stat.vid == ""){
	_oms_tools_stat.vid = (Math.random() * 999999999);
	_oms_tools_stat.vid += "_" + _oms_tools_stat.hash(document.referrer + "_" + _oms_tools_stat.uid);
	_oms_tools_stat.vid += "_" + _oms_tools_stat.hash(window.location.href + "_" + (Math.random() * 98989898));	
	
	_oms_tools_stat.gcs("vid", _oms_tools_stat.vid, _oms_d); // for agent time expires
	_oms_tools_stat.newv = true;
}
_oms_tools_stat.rcode = _oms_tools_stat.hash(document.referrer);
_oms_tools_stat.ucode = _oms_tools_stat.hash(window.location.href);
_oms_tools_stat.now = new Date();
_oms_tools_stat.lastvisit = _oms_tools_stat.gn("lv_" + _oms_tools_stat.uid, _oms_tools_stat.now.getTime()); // 最后访问时间
_oms_tools_stat.gcs("lv_" + _oms_tools_stat.uid, _oms_tools_stat.now.getTime()); // for agent time expires

_oms_tools_stat.firstvisit = _oms_tools_stat.gc("fv_" + _oms_tools_stat.uid); // 首次访问时间
if(!_oms_tools_stat.firstvisit)
{	
	_oms_tools_stat.firstvisit = _oms_tools_stat.now.getTime();
	_oms_tools_stat.gcs("fv_" + _oms_tools_stat.uid, _oms_tools_stat.now.getTime(), _oms_d); // for agent time expires
}

// Format AS: lastvisit(ms):visitcount:
_oms_tools_stat.visitsave = _oms_tools_stat.gc("vs_" + _oms_tools_stat.uid); // 用户统计状态保存信息，此信息包括多个值
_oms_tools_stat.visitcount = 1;
_oms_tools_stat.last = _oms_tools_stat.now.getTime();
_oms_tools_stat.visitadder = false;
if(_oms_tools_stat.visitsave) // 有保存
{
	var lv = _oms_tools_stat.visitsave.split("::");
	if(lv.length == 2)
	{
		_oms_tools_stat.last = parseFloat(lv[0]);
		_oms_tools_stat.visitcount = parseInt(lv[1]);
		if((_oms_tools_stat.now.getTime() - _oms_tools_stat.last) >= 12.0 * 60.0 * 60.0 * 1000.0)
		{
			_oms_tools_stat.newv = true;
			_oms_tools_stat.visitcount++;
			_oms_tools_stat.visitadder = true;
			_oms_tools_stat.last = _oms_tools_stat.now.getTime(); // 更新时间
		}else
		{
			_oms_tools_stat.visitadder = false;
		}
	}else
	{
		_oms_tools_stat.newv = true;
	}
}else // 无保存
{
	_oms_tools_stat.newv = true;
}

_oms_tools_stat.setvisited = _oms_tools_stat.gc("setvt_" + _oms_tools_stat.uid); // 首次访问时间
// 重新设置站点访问信息
if(!_oms_tools_stat.setvisited)
{
	_oms_tools_stat.gcs("vs_" + _oms_tools_stat.uid, _oms_tools_stat.last + "::" + _oms_tools_stat.visitcount, _oms_d); //
	_oms_tools_stat.gcs("setvt_" + _oms_tools_stat.uid, "1"); // for agent time expires
}else{
	try{
		_oms_tools_stat.gcs("setvt_" + _oms_tools_stat.uid, (parseInt(_oms_tools_stat.setvisited)+1)+""); // for agent time expires
	}catch(Etr){}
}

// Stat Server for stat
_oms_tools_stat.statserver = "http://stat.zhetao.com/";
_oms_tools_stat.ENC = function(str){ // For Zhetao Sys.v() API;
	if(!str)return "";
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
_oms_tools_stat.getdns = function(u)
{
	if(u == null || u == "")return "";
	var cu = u;
	var pos = cu.indexOf("/", 9);
	if(pos > 0)cu = cu.substring(0, pos);
	cu = cu.replace("http://", "");
	cu = cu.replace("https://", "");
	cu = cu.replace("ftp://", "");
	return cu;
}
_oms_tools_stat.send = function()
{
	if(_oms_tools_stat.uid == "")return; // 没有指定用户统计ID
	var cu = this.getdns(window.location.href);
	var dt = "type=0&sid=" + this.uid;
	dt += "&ref=" + this.ENC(document.referrer);
	dt += "&fromdns=" + this.ENC(this.getdns(document.referrer));
	dt += "&url=" + this.ENC(window.location.href);
	dt += "&dns=" + this.ENC(cu);
	///dt += "&title=" + this.ENC(document.title); // page title
	dt += "&vid=" + this.ENC(_oms_tools_stat.vid);
	dt += "&stime=" + ((this.now.getTime() - _oms_tools_stat.lastvisit)/1000.0); // visit time for last page(document.referrer)
	dt += "&rv=" + _oms_tools_stat.visitcount;
	dt += "&fv=" + _oms_tools_stat.firstvisit;
	dt += "&nv=" + (_oms_tools_stat.newv ? 1 : 0);
	dt += "&vadder=" + (_oms_tools_stat.visitadder ? 1 : 0);
	dt += "&w=" + screen.width;
	dt += "&h=" + screen.height;
	try{
		dt += "&lang=" + (navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || navigator.language || window.navigator.language || "").toLowerCase(); // 语言
	}catch(e){}
	dt += "&sc=" + 0;
	//_url = _oms_tools_stat.statserver  + "omsdostat.oms?" + dt;
	dt += "&rd=" + Math.random();
	var url = _oms_tools_stat.statserver  + "omsdostat.oms?" + dt;
	//document.write(url);
	new Image().src = url;
}
_oms_tools_stat.send();
