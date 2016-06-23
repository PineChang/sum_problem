function _G(id){return document.getElementById(id);}
//var DayName = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");
var VUI_DayName = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");
if(window["__l"])VUI_DayName = __l("days").split(",");


var VUI_MonthDay = [[31,28,31,30,31,30,31,31,30,31,30,31],[31,29,31,30,31,30,31,31,30,31,30,31]];
//var MonthName = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
var VUI_MonthName = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");

if(window["__l"])VUI_MonthName = __l("months").split(",");

var vui_calColor = "blue"; // green, blue
for(var i in VUI_MonthName)
	VUI_MonthName[VUI_MonthName[i]] = i;

var zt_oms_static_pages_cur_uri_cal = "";
if((typeof(zt_oms_static_pages_cur_uri) + "") != "undefined")zt_oms_static_pages_cur_uri_cal = zt_oms_static_pages_cur_uri;
if(window["zt"])zt_oms_static_pages_cur_uri_cal = zt.base;

var _t = new Date();
var vui_table_css = 'border:none;font-family:tahoma;font-size:9px;text-align:center';
var vui_th_css = 'height:13px;background-image:url('+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/'+vui_calColor+'_h.gif);border-bottom:1px solid #99cc00;font-size:9px;';


var calendarDIV = '<div id="vui_ztcalendars" onselectstart="return false;" style="font-size:9px;position:absolute;background:url('+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/shadow.gif?rd='+Math.random()+') right bottom no-repeat;width:165px;height:158px;padding:3px 4px 5px 0px;cursor:default;overflow:hidden;z-index:20000000">';
calendarDIV += '<div id="vui_ztdates" style="position:absolute;color:#e5f5e5;font-size:96px;font-family:Arial black;font-weight:bold;left:3px;top:9px;width:160px;text-align:center;overflow:hidden;z-index:-1;background:#f1f1f1">0</div>';
calendarDIV += '<table style="margin-left:3px;margin-top:6px;font-size:9px;border:1px solid #9900cc;width:160px;height:109px;overflow:hidden;'+vui_table_css+';" cellspacing="0" cellpadding="0">'+
		'		<tr style="height:13px;overflow:hidden;border:1px solid #f00">';
				for(var i=0;i<7;i++)
					calendarDIV +='<th style="'+vui_th_css+'">'+VUI_DayName[i]+'</th>';

calendarDIV +=
		'		</tr>'+
		'		<tr><td colspan="7" align="left" valign="top" id="vui_DShowDates" style="padding-top:0px;padding-left:0px;overflow:hidden;">' + 
		'		</td><tr>'+
		'		<td colspan="7">&nbsp;</td>'+
		'		</tr>'+
		'	</table>'+
		'<div style="position:absolute;color:#9900cc;font-family:Arial;font-weight:bold;font-size:12px;left:10px;top:112px;width:160px;height:19px;text-align:center;overflow:hidden;">'+
		'<table width="100%" style="font-size:9px;"><tr>'+
		'<td><img src="'+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/'+vui_calColor+'_left.gif" style="cursor:pointer;" align="absmiddle" onmousedown="VUI_OnYearLeft()"/></td><td id="vui_showYear"></td><td><img src="'+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/'+vui_calColor+'_right.gif" style="cursor:pointer;" align="absmiddle" onmousedown="VUI_OnYearRight()"/></td>'+
		'<td><img src="'+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/'+vui_calColor+'_left.gif" style="cursor:pointer;" align="absmiddle" onmousedown="VUI_OnMonthLeft()"/></td><td id="vui_showMonth"></td><td><img src="'+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/'+vui_calColor+'_right.gif" style="cursor:pointer;" align="absmiddle" onmousedown="VUI_OnMonthRight()"/></td>'+
		'<td>&nbsp;</td><td><img src="'+zt_oms_static_pages_cur_uri_cal+'verip_private/cal/close.gif" style="cursor:pointer;" align="absmiddle" onmousedown="calendar.obj.style.display=\'none\'"/></td>'+
		'</tr></table></div>';
calendarDIV += '<div id="veripcal_timers" style="padding:0;margin:0;overflow:hidden;border-top:1px solid #ccc;width:96%;margin:0 auto;padding-top:2px;;background:#eee;text-align:center"><select id="_zt_cal_hour" onchange="VUI_OnTimeChange();"></select>:<select id="_zt_cal_minute" onchange="VUI_OnTimeChange();"></select>:<select id="_zt_cal_second" onchange="VUI_OnTimeChange();"></select></div>';
calendarDIV += '</div>';
		
		
function Calendar()
{
	var md = new Date();
	this.year = md.getFullYear();
	this.month = md.getMonth();
	this.day = md.getDate();
	this.hc = null;
	this.sc = null;
	this.obj = null;
	this.table = null;
	
	this.type = 0; // 0- date, 1 - datetime, 2 - time
	this.hour = 0;
	this.minute = 0;
	this.second = 0;
	
	this.dp = false; // 是否双位, true 是
	
	this.selhide = true;
}
function __cal__init_data(k,s,t)
{
	var p = _G(k);
	while(p.options.length > 0)p.remove(0);
	for(var i = s; i < t; i++){
		var ss = i < 10 ? "0"+i : i;
		var op = document.createElement("option");
		op.value = ss;
		op.text = ss;
		p.add(op);
	}
}
function __getTop()
{
	var ai = parseInt(document.documentElement.scrollTop);
	var bi = parseInt(document.body.scrollTop);
	return ai > bi ? ai : bi;
}
function __getLeft()
{
	var ai = parseInt(document.documentElement.scrollLeft);
	var bi = parseInt(document.body.scrollLeft);
	return ai > bi ? ai : bi;
}
Calendar.prototype.refresh = function()
{
	if(_G("vui_DShowDates").childNodes && _G("vui_DShowDates").childNodes.length == 1)
	{
		try{
			_G("vui_DShowDates").childNodes[0].removeNode(true);
		}catch(e){
			_G("vui_DShowDates").removeChild(_G("vui_DShowDates").childNodes[0]);
		}
	}
	_G("vui_ztdates").innerHTML = this.month + 1;
	_G("vui_showYear").innerHTML = this.year;
	_G("vui_showMonth").innerHTML = VUI_MonthName[this.month];
	_G("vui_DShowDates").innerHTML = this.genTable();
	this.feed();
}
function __cal_nb(v,x)
{
	if(x)return v < 10 ? "0"+v : ""+v;
	return ""+v;
}
Calendar.prototype.feed = function()
{
	var tm = "";
	
	if(this.type >= 1){
		tm = __cal_nb(this.hour, this.dp) + ":" + __cal_nb(this.minute, this.dp) + ":" + __cal_nb(this.second, this.dp);
		if(this.type <= 1){
			tm = " " + tm;
		}
	}
	
	var dt = "";
	dt = this.year + "-" + __cal_nb(this.month+1, this.dp) + "-" + __cal_nb(this.day, this.dp);
	
	var v = dt;
	if(this.type == 1)v = dt + tm;
	else if(this.type == 2)v = tm;
	//alert(tm);
	if(this.hc && !this.hc.disabled)this.hc.value = v;
	if(this.sc && !this.sc.disabled)this.sc.value = v;
}
function VUI_CGetROL(o)
{
	var p = o;
	var j = p.offsetLeft;
	if(p.offsetParent != null)
	{
		j += VUI_CGetROL(p.offsetParent);
	}
	return j;
}
function VUI_CGetROT(o)
{
	var p = o;
	var j = p.offsetTop;
	if(p.offsetParent != null)
	{
		j += VUI_CGetROT(p.offsetParent);
	}
	return j;
}
var VUICAL_ORL = function(o){
	var l = 0;
	while(o){
	  l += o.scrollLeft ? o.scrollLeft : 0;
	  o = o.parentNode;
	}
	return(l);
}
var VUICAL_ORT = function(o){
	var t = 0;
	while(o){
	  t += o.scrollTop ? o.scrollTop : 0;
	  o = o.parentNode;
	}
	return(t);
}
Calendar.prototype.show = function(hiddenControl, showControl, dir, ee, dtype, dp) {	 // 
	this.hc = _G(hiddenControl); // 
	this.sc = _G(showControl); //
	//alert(typeof("fdsafd") + "/" + typeof(dtype) + "/" + dtype);
	if(typeof(dtype) == "string")
	{		
		if("date" == dtype){
			this.type = 0;
		}else if("datetime" == dtype){
			this.type = 1;
		}else if("time" == dtype){
			this.type = 2;
		}else{
			this.type = dtype;
		}
	}else{
		this.type = dtype;
	}	
	
	this.dp = dp;
	 
	var e = ee ? ee : (window.event ? window.event : null);
	var x = e.clientX;
	var y = e.clientY;
	
	
	
	if(this.obj == null)
	{
		try{
			document.body.insertAdjacentHTML("beforeEnd",calendarDIV);
		}catch(e){
			document.write(calendarDIV);
		}
		this.obj = _G("vui_ztcalendars");
		this.table = _G("vui_ztdates");		
	}
	var ox = -168, oy = 0;
	if(typeof(dir) != "undifined")
	{
		if(dir == 0){ox = -170; oy = 0;}
		if(dir == 1){ox = -170; oy = -158;}
		if(dir == 2){ox = 0; oy = -158;}
		if(dir == 3){ox = 0; oy = 20;}
	}
	
	__cal__init_data("_zt_cal_hour", 0, 23);
	__cal__init_data("_zt_cal_minute", 0, 59);
	__cal__init_data("_zt_cal_second", 0, 56);
	this.parseDate();
	//alert(this.hour);
	_G("_zt_cal_hour").value = __cal_nb(this.hour, true);
	_G("_zt_cal_minute").value = __cal_nb(this.minute, true);
	_G("_zt_cal_second").value = __cal_nb(this.second, true);
	
	
	var TM = _G("veripcal_timers");
	if(this.type == 0)TM.style.display = "none";
	else TM.style.display = "block";
	
	this.selhide = true;
	if(this.type > 0)this.selhide = false;
	
	this.obj.style.left = (VUI_CGetROL(this.sc) - VUICAL_ORL(this.sc) + ox - 3) + "px";
	this.obj.style.top = (VUI_CGetROT(this.sc) - VUICAL_ORT(this.sc) + oy - 8) + "px";
	this.obj.style.display = "block";
	this.refresh();
	
	return this;	
}

Calendar.prototype.parseDate = function(){
	try{
		var v = this.hc.value;
		var vt = v.split(" ", 2);
		var vs = vt[0].split("-", 3);
		if(vs.length == 3)
		{
			this.year = parseInt(vs[0]);
			this.month = parseInt(vs[1]) - 1;
			this.day = parseInt(vs[2]);
		}else{
			var d = new Date();
			this.year = d.getFullYear();
			this.month = d.getMonth();
			this.day = d.getDate();
		}
		vs = [];
		if(vt.length == 2){
			vs = vt[1].split(":", 3);
		}else{
			if(this.type == 2)vs = vt[0].split(":", 3); // 仅为时间
			
		}
		if(vs.length == 3){
			this.hour = parseInt(vs[0]);
			this.minute = parseInt(vs[1]);
			this.second = parseInt(vs[2]);
		}else{
			this.hour = 0;
			this.minute = 0;
			this.second = 0;
		}
	}catch(e){}
}
Calendar.prototype.genTable = function(){
	//();
	var d = new Date(this.year, this.month, 1);
	var d1 = d.getDay();
	//this.day = d - 1;
	var m = this.year % 4 == 0 && this.year % 100 || this.year % 400 == 0 ? 1 : 0;
	//alert(m);
	m = VUI_MonthDay[m][this.month];	
	//alert(m);
	var r='<table style="table-layout:fixed;'+vui_table_css+';font-size:9px;margin-top:0px" cellpadding="0" cellpacing="0" id="datesshows">';
	/*r+='<tr height="3"><td width="20"></td><td width="23"></td><td width="23"></td>'+
		'<td width="23"></td><td width="20"></td><td></td><td></td></tr>';
		*/
	var wds = [22, 22, 22, 22, 22, 22, 22];
	//alert(r);
	var n = new Date();
	for(var i = 0, k = 0; i < 6; i++){
		r += "<tr>";
		for(var j = 0; j < 7; j++){
			var k = i*7 + j + 1;
			var ts = '<td height="14" style="line-height:14px;width:'+wds[j]+'px">&nbsp;</td>';
			if(k > d1 && k <= m+d1){
				ts="<td";
				var st = "cursor:pointer;font-size:9px;line-height:12px;width:"+wds[j]+"px";
				if(j==0 || j==6)
					st +="color:red;";
				if(k-d1 == n.getDate() && this.year == n.getFullYear() && this.month == n.getMonth())
					st += "font-weight:bold;border:1px solid #99cc00;"; // today
				if(k-d1 == this.day/* && this.year == n.getFullYear() && this.month == n.getMonth()*/)
					st += "font-weight:bold;border:1px solid #ff0000;"; // current select
				ts += ' style="'+st+'"';
				ts+= ' onclick="VUI_OnSelDate(' + (k-d1) + ')">' + (k-d1) + '</td>';
			}
			r+=ts;
		}
		r+="</tr>";
	}
	r+="</table>";
	return r;
}
var calendar = new Calendar(); // 定义一个全局的日历
function VUI_OnTimeChange()
{
	VUI_OnSelDate(calendar.day);
}
function VUI_OnSelDate(vs)
{
	try{
		calendar.hour = parseInt(_G("_zt_cal_hour").value);
		calendar.minute = parseInt(_G("_zt_cal_minute").value);
		calendar.second = parseInt(_G("_zt_cal_second").value);
	}catch(xcd){}
	try{
		calendar.day = vs;
		calendar.feed();
		if(calendar.selhide)calendar.obj.style.display = "none";
	}catch(e){}
}
function VUI_OnYearLeft()
{
	calendar.year -= 1;
	calendar.refresh();
}
function VUI_OnYearRight()
{
	calendar.year += 1;
	calendar.refresh();
}
function VUI_OnMonthLeft()
{
	calendar.month -= 1;
	if(calendar.month < 0)
	{
		calendar.month = 11;
		calendar.year -= 1;
	}
	calendar.refresh();
}
function VUI_OnMonthRight()
{
	calendar.month += 1;
	if(calendar.month >= 12)
	{
		calendar.month = 0;
		calendar.year += 1;
	}
	calendar.refresh();
}




