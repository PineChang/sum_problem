// ZHETAO Verip JavaScript Utility Library v1.0
function _outJS(url)
{
	var str = "";
	if((typeof(zt_oms_static_pages_cur_uri) + "") != "undefined")str = zt_oms_static_pages_cur_uri;
	document.write('<'+'s'+'c'+'r'+'i'+'p'+'t src="'+str+url+'" l'+'an'+'guage="java'+'scr'+'ipt"><'+'/'+'s'+'c'+'r'+'i'+'p'+'t'+'>');
}
function _outJSC(url,charset)
{
	var str = "";
	if((typeof(zt_oms_static_pages_cur_uri) + "") != "undefined")str = zt_oms_static_pages_cur_uri;
	document.write('<'+'s'+'c'+'r'+'i'+'p'+'t src="'+str+url+'" l'+'an'+'guage="java'+'scr'+'ipt" charset="'+charset+'"><'+'/'+'s'+'c'+'r'+'i'+'p'+'t'+'>');
}
function _outStyle(url) // verip_private/styles/webui.v.1.0.css
{
	var str = "";
	if((typeof(zt_oms_static_pages_cur_uri) + "") != "undefined")str = zt_oms_static_pages_cur_uri;
	document.write('<link type="text/css" rel="stylesheet" href="'+str+url+'"/>');
}
var verip_js_langs = verip_js_langs || {};
function __l(id)
{if(verip_js_langs[id])return verip_js_langs[id]+"";return id;}
// Style Css
_outStyle("verip_private/styles/webui.v.1.0.css");
// JavaScript Languages(GBK)
_outJSC("verip_private/lang_gbk.js", "utf-8");
// JavaScript Languages(EN)
//_outJSC("verip_private/lang_en.js", "utf-8");
// Core Basic Verip JavaScript Library
_outJS("verip_private/core/js/zt.core.v.1.0.js");
// Zhetao UI Library
_outJS("verip_private/core/js/zt.ui.v.1.0.js");
// Zhetao Menu Library
_outJS("verip_private/core/js/ztxmenu.js");
// Zhetao Calendar Selector
_outJS("verip_private/core/js/calendar.js");
// Zhetao NavMenu
_outJS("verip_private/core/js/omsnavmenu.js");
// Zheta Graph using flash
_outJS("verip_private/g/g.js");

_outJS("verip_private/core/js/zt.uiwin.1.0.js");