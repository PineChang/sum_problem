/*ZT JS*/
function InitMenus()
{
	var m = zt.g("ztnavmenus");
	if(m)
	{
		var as = zt.nodes(m, "a");
		for(var i = 0; i < as.length; i++)
		{
			var n = as[i];
			DEPAddMenuItem(zt.ga(n,"id").substring(4), n.innerHTML, n.href, n.target);
		}
	}
}
zt.addevent("load", InitMenus);
function AF()
{
	try{
		var fb = zt.g("footerblocks");
		var bb = zt.g("footerblank");
		var h = zt.h();
		if((zt.rt(bb) + fb.clientHeight) < h){
			bb.style.height = (h-(zt.rt(bb) + fb.clientHeight))+"px";
		}
	}catch(XC){}
	TabActNormal();
}
function TabActNormal()
{
	try{
		var uls = document.getElementsByTagName("ul");
		//acttabs
		for(var i = 0; i < uls.length; i++){
			if(uls[i].className.indexOf("acttabs") < 0)continue;
			var lis = uls[i].childNodes;
			var fd = false;
			for(var l = lis.length-1; l>=0; l--)
			{
				var o = lis[l];
				if(o && o.tagName && o.className){
					var cn = o.className.split(" ");
					var cnna = [];
					for(var k = 0; k < cn.length; k++){
						if(cn[k] == "act"){
							if(!fd){
								cnna.push(cn[k]);
								fd = true;
							}
						}else{
							cnna.push(cn[k]);
						}
					}
					o.className = cnna.join(" ");
				}
			}
		}
	}catch(Exc){}
}

zt.addevent("load", AF);

function SendSS(name,host,port,ssl,xml,ps,cb)
{
	var dt = ps + "";
	dt += "&ss_key=" + name;
	dt += "&ss_host=" + host;
	dt += "&ss_port=" + port;
	dt += "&ss_usessl=" + ssl;
	dt += "&ss_xmlraw=" + xml;
	//dt += "&id=" + CUR_PUSH_ID ;
	if(cb)cb(0, "");
	zt.post("s.oms?omsv=access", dt, function(s){
		if(zt.isok(s))
		{
			var d = zt.data(s, 0); // d == 200 表示成功!
			cb(200, d);
		}else
		{
			cb(zt.code(s), "");
		}
	});	
}
function SendEAPP(name,ps,cb)
{
	SendSS(name, "eapp.zhetao.com", 443, true, true, ps, cb);
}
function cms_count(id)
{
	try{
		var i = new Image();
		i.src = "cms.oms?omsv=stat&id=" + id + "&rd=" + Math.random();
	}catch(Exc){}
}