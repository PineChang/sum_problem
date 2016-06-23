var zt_button_waa_host = "http://waa.zhetao.com/"; // WAA Basic URL

var _ztwaasmallshell = new Object(); /* Zhetao Core JavaScript Shell, It must implements the ShellNotify Method*/

document.write('<div id="zt_waa_small_button_shell" style="display:none;visiblity:hidden"></div>');

var waaButtonShell = document.getElementById("zt_waa_small_button_shell"); // Waa JavaScript RealTime Shell

var userImages = new Array();
var uilength = 0;
var online_img_src = zt_button_waa_host + "site/buttons/waa.gif";
var offline_img_src = zt_button_waa_host + "site/buttons/offwaa.gif";

var getUserIdList = new Array();
var guidlist = 0;
var imgPrefix = "SU_WAA"; /* 显示在线状态的图片的ID的前缀，即以此开头的图片要进行状态更新 */
function GetWaaOnlineStatus(u, us)
{
	for(var i = 0; i < guidlist; i++)
	{
		if(getUserIdList[i] == u)
		{
			if(i < us.length)return us[i];
			else return "0";
		}
	}
	return "0";
}
_ztwaasmallshell.ShellNotify = function(s) // Implements the web shell for the WAA Real Online Informations
{
	//alert(s);
	if(s != "")
	{
		var os = s.split(",");
		for(var i = 0; i < uilength; i++)
		{
			if(userImages[i].id)
			{
				var suid = userImages[i].id;
				if(suid == null || suid.indexOf(imgPrefix) != 0)continue;
				suid = suid.substring(imgPrefix.length);
				if(GetWaaOnlineStatus(suid, os) == "1")
				{
					userImages[i].src = online_img_src;	
					userImages[i].alt = userImages[i].title = "我现在在线，点击与我对话。";
				}
			}
		}
	}
}
function WaaOnlienHasUser(u)
{
	for(var i = 0; i < guidlist; i++)
	{
		if(getUserIdList[i] == u)return true;
	}
	return false;
}
function OnWaaImageOnlineButtonClick(ee)
{
	var suid = this.id;
	if(!suid)return; 
	if(suid.indexOf(imgPrefix) == 0)
	{
		suid = suid.substring(imgPrefix.length);
		SmallOpenWaaButton("", suid, "newface");
	}
}
function GetUserStatusIds()
{
	var imgs = document.getElementsByTagName("IMG");
	var str = "";
	if(imgs != null)
	{
		for(var i = 0; i < imgs.length; i++)
		{
			if(imgs[i].id) // 两个值均已经定义
			{
				var suid = imgs[i].id;
				if(suid.indexOf(imgPrefix) == 0)
				{
					suid = suid.substring(imgPrefix.length);
					userImages[uilength] = imgs[i];
					imgs[i].onclick = OnWaaImageOnlineButtonClick;
					imgs[i].style.cursor = "pointer";
					imgs[i].alt = imgs[i].title = "我现在不在线，点击给我留言";
					uilength++;
					if(!WaaOnlienHasUser(suid))
					{
						if(str == "")str = suid;
						else str += "," + suid;
						getUserIdList[guidlist] = suid;
						guidlist++;
					}
				}
			}
		}
	}
	return str;
}
_ztwaasmallshell.RefreshStatus = function()
{
	var s = GetUserStatusIds();
	if(s == "")return; // /* 没有就不要 */
	waaButtonShell.innerHTML = "";
    var myScript = document.createElement("script");
    myScript.type = "text/javascript"; 
    myScript.src = zt_button_waa_host + "webchatcheck.demo?gm=onlinetest&rn=false&users=" + s + "&rd=" + Math.random(); //test.js方法中有一个方法function test(){alert("test");}
    waaButtonShell.appendChild(myScript); 
}
function __ENC(str){
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


var ___ref = "";
if(document.referrer)___ref = document.referrer; 
else ___ref = "无法获取";
___ref = __ENC(___ref);

function SmallOpenWaaButton(eid, uid, lang_id)
{
	//WAA_Pop_Invite("das", "fdsa", "fdsa", "fdsa");
	var waawin = null;
	var url = zt_button_waa_host + "webchat.demo?enpId="+eid+"&userId=" + uid + "&lang="+lang_id+"&sid=&from="+___ref+"&cur=" + __ENC(window.location.href);
	var left = screen.width / 2 - 310;
	var top = screen.height / 2 - 225;
	waawin = window.open(url, "ZT_WAA_WINDOWS_" + eid + "_" + uid, "left="+left+",top="+top+",width=700,height=500,resizable=yes");
	if(!waawin)
	{
		alert("聊天窗口被阻止，请按住CTRL键再点或是关闭弹出窗口程序再试一次。");
	}
}

setTimeout("_ztwaasmallshell.RefreshStatus()", 500); /* 延时加载，以免影响原始网页的正常运行。*/
