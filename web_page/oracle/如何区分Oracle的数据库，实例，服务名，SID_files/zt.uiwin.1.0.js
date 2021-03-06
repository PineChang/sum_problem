zt.addevent("load", function(){
	if(!zt.g("verip_auto_editbg")){
		var eb = document.createElement("div");
		eb.id = "verip_auto_editbg";
		try{
			eb.style.cssText = "z-index:100;background:#000;position:absolute;filter:alpha(opacity=80);-moz-opacity:0.8;opacity: 0.8;right:0;left:0;bottom:0;top:0;display:none";
		}catch(xc){}
		document.body.appendChild(eb);
	}
});
zt.uiwin = {
	stth : 60,
	ids : [],
	objs : {}, 
	attrold: {},
	optlist: {},
	hideall : function()
	{
		zt.removeevent("resize", ztuiwin_resize);
		zt.removeevent("scroll", ztuiwin_resize);
		if(zt.g("verip_auto_editbg"))zt.hide('verip_auto_editbg');
		for(var i = 0; i < this.ids.length; i++)zt.hide(this.ids[i]);	
		this.ids = [];
		this.objs = {};
	},
	resize : function()
	{
		var pbg = zt.g("verip_auto_editbg");
		var wc = 0;
		for(var i = 0; i < this.ids.length; i++)
		{
			try{
				var p = zt.g(this.ids[i]);
				var obj = this.objs[this.ids[i]];
				var at = this.attrold[this.ids[i]];
				if(obj && obj.type == 0)
				{
					wc++;
					//alert(p.id + "/" + this.ids.length);
					try{
						// First Set to auto height!!!
						for(var j = 0; j < p.childNodes.length; j++){
							try{
								var sb = p.childNodes[j];
								if(sb.className == "contents"){
									sb.style.height = "auto";
									break;
								}
							}catch(xcd){}
						}
					}catch(xc){}
					//p.style.width = "auto";
					//p.style.height = "auto";
					if(at){
						try{
							p.style.width = at.owidth;
							p.style.height = at.oheight;
						}catch(xc){}
					}
					
					p.style.display = "block";
					
					if(p.clientWidth > zt.w()-20)p.style.width = (zt.w()-20)+"px";
					if(p.clientHeight > zt.h()-20)p.style.height = (zt.h()-20)+"px";
					
					p.style.left = (zt.sl()+zt.w()/2-p.clientWidth/2)+"px";
					p.style.top = (zt.st()+zt.h()/2-p.clientHeight/2)+"px";
					p.style.zIndex = i+101;
					try{
						var tbh = 0; // border
						for(var j = 0; j < p.childNodes.length; j++){
							try{
								var sb = p.childNodes[j];
								if(sb.className != "contents"){
									if(sb.clientHeight>0)tbh += sb.clientHeight;
								}
							}catch(xcd){}
						}
						for(var j = 0; j < p.childNodes.length; j++){
							try{
								var sb = p.childNodes[j];
								if(sb.className == "contents"){
									sb.style.height = (p.clientHeight-tbh)+"px";
									break;
								}
							}catch(xcd){}
						}
					}catch(xc){}
				}else if(obj.type == 1)
				{
					// Tip on object
					var x = zt.rl(obj.robj);
					var y = (zt.rt(obj.robj)+zt.oh(obj.robj));
					var w = zt.w();
					var h = zt.h();
					
					p.style.position = "absolute";
					p.style.display = "block";
					
					var cx = 550;
					var cy = 300;
					try{
						cx = zt.ow(p);
						cy = zt.oh(p);
					}catch(Exc){}
					if(cx <= 0)cx = 550;
					if(cy <= 0)cy = 300;
					
					x += zt.ow(obj.robj)/2-cx/2;
					//alert(zt.ort(obj));
					if(x + cx > w+zt.sl())x = w-(cx+10)+zt.sl();
					if(y + cy > h+zt.st())y = h-(cy+10)+zt.st();
					
					
					p.style.left = (-zt.orl(obj.robj)+x) + "px";
					p.style.top = (-zt.ort(obj.robj)+y) + "px";
					
				}
			}catch(xcd){
				console.log(xcd);
			}
		}
		if(pbg && wc > 0)
		{
			pbg.style.display = "block";
			pbg.style.left = zt.sl()+"px";
			pbg.style.top = zt.st()+"px";
		}else{
			if(pbg)pbg.style.display = "none";
		}
	}
	,
	hideone : function()
	{
		if(this.ids.length == 1)
		{
			zt.removeevent("resize", ztuiwin_resize);
			zt.removeevent("scroll", ztuiwin_resize);
			//if(zt.g("verip_auto_editbg"))zt.hide('verip_auto_editbg');
		}
		if(this.ids.length > 0)
		{
			var id = this.ids.pop();
			zt.hide(id);	
		}
		this.resize();
	}
	,
	hideid : function(id)
	{
		try{
			var nids = [];
			if(this.ids.length > 0 && id != undefined && id != null)
			{
				zt.hide(id);
				for(var i = 0; i < this.ids.length; i++)
				{
					if(id != this.ids[i])nids.push(this.ids[i]);
				}
				this.ids = nids;
			}			
		}catch(xc){}
		if(this.ids.length == 0)
		{
			zt.removeevent("resize", ztuiwin_resize);
			zt.removeevent("scroll", ztuiwin_resize);
			if(zt.g("verip_auto_editbg"))zt.hide('verip_auto_editbg');
		}
		this.resize();
	}
	,
	delid: function(id)
	{
		try{
			var nids = [];
			if(this.ids.length > 0 && id != undefined && id != null)
			{
				for(var i = 0; i < this.ids.length; i++)
				{
					if(id != this.ids[i])nids.push(this.ids[i]);
				}
				this.ids = nids;
			}			
		}catch(xc){}
	}
	,
	saveattr: function(id)
	{
		try{
			if(this.attrold[id] != undefined)return;
			var o = zt.g(id);
			this.attrold[id] = {
				owidth: o.style.width != undefined ? o.style.width : "",
				oheight: o.style.height != undefined ? o.style.height : ""
			};
		}catch(xc){}
	}
	,
	show : function(id)
	{		
		if(id == undefined)return;
		if(!zt.g(id))return;
		if(zt.g(id).style.display == "block")return; // 正在显示!
		
		this.saveattr(id);
		
		this.delid(id);
		this.ids.push(id);
		this.objs[id] = {
			'id': id,
			obj: zt.g(id),
			robj : null, // 相对对象
			'type': 0
		};
		
		if(this.ids.length == 1){
			zt.addevent("resize", ztuiwin_resize);
			zt.addevent("scroll", ztuiwin_resize);
		}
		
		this.resize();
	},
	showat : function(id, obj)
	{		
		if(id == undefined)return;
		if(!zt.g(id))return;
		if(zt.g(id).style.display == "block"){
			this.resize();
			return; // 正在显示!
		}
		this.saveattr(id);
		
		this.delid(id);
		this.ids.push(id);
		this.objs[id] = {
			'id': id,
			'obj': zt.g(id),
			'robj' : obj, // 相对对象
			'type': 1
		};
		
		//alert(id+"/"+obj+"/"+this.ids.length);
		
		if(this.ids.length == 1){
			zt.addevent("resize", ztuiwin_resize);
			zt.addevent("scroll", ztuiwin_resize);
		}
		
		this.resize();
	},
	disable : function(id)
	{
		try{
		var p = zt.g(id);
		if(p){
			if(p.className.indexOf("nb") == 0 && p.className.indexOf("nbd_") != 0)p.className = "nbd_"+p.className;
			p.disabled = true;			
		}
		}catch(ddd){}
		return this;
	},
	enable : function(id)
	{
		try{
		var p = zt.g(id);
		if(p){
			if(p.className.indexOf("nbd_") == 0)p.className = p.className.substring(4);
			p.disabled = false;			
		}
		}catch(ddd){}
		return this;
	},
	sh : function(id)
	{
		try{
			var o = zt.g(id);
			o.style.display = (o.style.display == 'block') ? 'none' : 'block';
		}catch(xcd){}
	},
	clear : function(id,rc)
	{
		try{
		var sp = zt.g(id);
		while(sp.options.length > rc)sp.remove(rc);
		}catch(xcd){}
	}
	,
	/**自动延时关闭TIP*/
	timers:{},
	/**创建一个提示, 并在timer时间到后关闭, 如果timer为0则,需要手动关闭tip(最上层 zt.uiwin.hideone(), 全部 zt.uiwin.hideall())*/
	createtip : function(html, timer)
	{
		this.createshow("verip_dycntips_", html, "", {closeTimer: (timer == undefined ? 2000 : 0), closebutton: false, bartop: false, barbottom:false});
	},
	createshow : function(id, html, title, opts)
	{		
		if(id == undefined)return;
		
		try{
			if(this.timers[id])clearTimeout(this.timers[id]);
		}catch(xc){}
		this.timers[id] = 0;
		var opt = {
			"id": id,
			"title": title,
			"width": 0,
			"height": 0,
			"bartop": true,
			"barbottom": true,
			"closebutton": true,
			"refreshbutton": false,
			"surebutton": false,
			"cancelbutton": false,
			"showtip": false,
			"tipObject": null,
			"widthr": false,
			"htmltype": 0, // 0 - HTML, 1 - URL(ajax读取), 2 - URL读取HTML, 并在读到数据后交由用户的onData处理 , 3 - URL读取XML并交由onData处理
			"padding": "",
			"onData": null,
			"onSure": null,
			"onCancel": null,
			"onClose": null,
			"closeTimer": 0,
			"buttons": []
		};
		
		if(opts != undefined)
		{
			for(var key in opts){
				try{
					opt[key] = opts[key];
				}catch(xc){}
			}
		}
		
		if(opt.widthr && opt.tipObject){
			opt.width = opt.tipObject.clientWidth;
		}
		
		this.optlist[id] = opt;
		
		var o = zt.g(id);
		if(!o){
			var eb = document.createElement("div");
			eb.id = id;
			eb.className = "flyblock";
			eb.style.overflow = "visible";
			if(opt.width > 0)eb.style.width = opt.width + "px";
			if(opt.height > 0)eb.style.height = opt.height + "px";
			var str = '';
			if(opt.showtip){
				eb.className = "flyblock flytippointer";
				str += '<div class="flypointer" style="height:9px;"></div>';
			}
			
			if(opt.bartop){
				str += '<div class="title"><div class="txt">'+opt.title+'</div><div class="bts"></div></div>';
			}
			
			
			
			var shtml = "";
			if(opt.htmltype == 0){
				shtml = html;
			}else{
				shtml = "Loading...";
			}
			shtml = '<div class="uiwindlgcontent" id="autowindows_contents_'+id+'" style="'+(opt.padding != "" ? "padding:"+opt.padding+";": "padding:10px;")+';word-break:break-all; word-wrap:break-word;overflow-x:hidden">'+shtml+'</div>';
			str += '<div class="contents" id="autowindows_contents_top_'+id+'">'+(shtml)+'</div>';
			if(opt.barbottom){
				var bts = '';
				//<input type="button" class="vuibutton" id="btnadd" value="保存" onClick="javascript:;"/>  
				//<input type="button" class="vuibutton" id="btnclose" value="关闭" onClick="zt.uiwin.hideall()" title="关闭"/> 
        		//<input type="button" class="vuibutton" id="btnrefresh" value="刷新" onClick="zt.RP()" title="刷新"/> 
				if(opt.surebutton){
					bts += '<input type="button" class="vuibutton" id="autowindows_sure_'+id+'" value="确定" onClick="" title="确定"/> ';
				}
				if(opt.cancelbutton){
					bts += '<input type="button" class="vuibutton" id="autowindows_cancel_'+id+'" value="取消" onClick="" title="取消"/> ';
				}
				if(opt.closebutton){
					bts += '<input type="button" class="vuibutton" id="autowindows_close_'+id+'" value="关闭" onClick="zt.uiwin.hideall()" title="关闭窗口"/> ';
				}
				if(opt.refreshbutton){
					bts += '<input type="button" class="vuibutton" id="autowindows_refresh_'+id+'" value="刷新" onClick="zt.RP()" title="刷新页面"/> ';
				}
				str += '<div class="ops">'+bts+'</div>';
			}
			eb.innerHTML = str;
			document.body.appendChild(eb);
			
			var sb = zt.g('autowindows_sure_'+id);
			if(sb){
				zt.addevent("click", function(){
					if(opt.onSure){
						opt.onSure(opt);
					}
				}, sb);
			}
			sb = zt.g('autowindows_cancel_'+id);
			if(sb){
				zt.addevent("click", function(){
					if(opt.onCancel){
						opt.onCancel(opt);
					}
				}, sb);
			}
			sb = zt.g('autowindows_close_'+id);
			if(sb){
				zt.addevent("click", function(){
					if(opt.onClose){
						opt.onClose(opt);
					}
				}, sb);
			}
		}
		
		if(opt.showtip && opt.tipObject){
			this.showat(id, opt.tipObject);
		}else{
			this.show(id);
		}
		if(opt.htmltype == 1){
			zt.posthtml(html, "__rdm__="+Math.random(), function(s){
				zt.sval("autowindows_contents_"+id, s);
			});
		}else if(opt.htmltype == 2){
			zt.posthtml(html, "__rdm__="+Math.random(), function(s){
				if(opt.onData){
					opt.onData(s, opt, zt.g('autowindows_contents_'+id));
				}
			});
		}else if(opt.htmltype == 3){
			zt.post(html, "__rdm__="+Math.random(), function(s){
				if(opt.onData){
					opt.onData(s, opt, zt.g('autowindows_contents_'+id));
				}
			});
		}
		if(opt.closeTimer > 0){
			this.timers[id] = setTimeout(function(){
				zt.uiwin.hideid(id);
				if(opt.onClose){
					opt.onClose(opt);
				}
			}, opt.closeTimer);
		}
	},
	tipat : function(id, html, obj, opts)
	{		
		if(id == undefined)return;
		
		var opt = {
			"id": id,
			"title": "",
			"width": 0,
			"height": 0,
			"bartop": false,
			"barbottom": false,
			"closebutton": false,
			"refreshbutton": false,
			"surebutton": false,
			"cancelbutton": false,
			"showtip": true,
			"widthr": false,
			"tipObject": obj
		};
		
		if(opts != undefined)
		{
			for(var key in opts){
				try{
					opt[key] = opts[key];
				}catch(xc){}
			}
		}
		this.createshow(id, html, "", opt);
	} // zt.uiwin.tip
	
	,
	handleClick : function(e)
	{
		try{
			for(var id in this.optlist){
				var opt = this.optlist[id];
				if(opt.showtip){
					if(opt.closeTimer == 0){
						var sobj = e.target ? e.target : e.srcElement;
						if(sobj != opt.tipObject && !zt.ischildex(sobj,zt.g(opt.id)))
						{
							zt.uiwin.hideid(opt.id);
						}
					}
				}
			}
		}catch(xc){console.log(xc, e)}
	}
} // zt.uiwin

zt.uiwind = {
	stth : 60,
	ids : [],
	hideall : function()
	{
		zt.removeevent("resize", ztwindrawer_resize);
		zt.removeevent("scroll", ztwindrawer_resize);
		for(var i = 0; i < this.ids.length; i++)zt.hide(this.ids[i].id);	
		this.ids = [];
	},
	win : function(p)
	{
		var bw = zt.w();
		var bh = zt.h();
		
		var w = bw;
		var h = parseInt(p.style.height)+2;
		
		return {
			obj: p,
			id : p.id,
			runpos: 0,
			running: 1,
			maxw: w,
			maxh: h
		};
	},
	resize : function()
	{
		for(var i = 0; i < this.ids.length; i++)
		{
			try{
				var wo = this.ids[i];
				var p = zt.g(this.ids[i].id);
				//alert(p.id + "/" + this.ids.length);
				p.style.display = "block";
				p.style.left = (zt.sl()+zt.w()/2-p.clientWidth/2)+"px";
				//p.style.top = (zt.st()+zt.h()/2-p.clientHeight/2)+"px";
				if(wo.running == 0){
					p.style.top = (zt.st()+zt.h()-p.clientHeight+2)+"px";
				}
				try{
					for(var j = 0; j < p.childNodes.length; j++){
						try{
							var sb = p.childNodes[j];
							if(sb.className == "contents"){
								sb.style.height = (p.clientHeight-zt.uiwind.stth)+"px";
								break;
							}
						}catch(xcd){}
					}
				}catch(xc){}
			}catch(xcd){}
		}
	}
	,
	hideone : function()
	{
		if(this.ids.length == 1)
		{
			zt.removeevent("resize", ztwindrawer_resize);
			zt.removeevent("scroll", ztwindrawer_resize);
		}
		if(this.ids.length > 0)
		{
			var id = this.ids.pop();
			zt.hide(id.id);	
		}
	}
	,
	func_expc: function(t,b,c,d,s)
	{
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
	}
	,
	show : function(id)
	{		
		if(id == undefined)return;
		if(!zt.g(id))return;
		
		var wo = this.win(zt.g(id));
		this.ids.push(wo);
		
		
		if(this.ids.length == 1){
			zt.addevent("resize", ztwindrawer_resize);
			zt.addevent("scroll", ztwindrawer_resize);
		}
		var maxt = 12;
		for(var i = 0; i <= maxt; i++)
		{
			wo.running = 1;
			(function(o,t){
				setTimeout(function(){
					var dh = o.maxh/maxt;
					var ch = zt.uiwind.func_expc(t, 0, o.maxh, maxt);
					//o.obj.style.top = (zt.st()+(zt.h() - t*dh))+"px";
					o.obj.style.top = (zt.st()+(zt.h() - ch))+"px";
					if(t == maxt){
						o.running = 0;
					}
				}, i * 50);
			})(wo, i);
			
			if(i == 0){
				//wo.obj.style.display = "block";
				this.resize();
				zt.spliter.resize();
			}
		}		
	}
}
zt.addevent("click", function(e){
	zt.uiwin.handleClick(e);
}, document);
function ztuiwin_resize()
{
	zt.uiwin.resize();
}
function ztwindrawer_resize()
{
	zt.uiwind.resize();
}

zt.fmdate = function(d)
{
	return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
}
zt.tdate = function(v){
	var vs = v.split("-");
	return new Date(parseInt(vs[0]), parseInt(vs[1])-1, parseInt(vs[2]));
}
zt.tdatetime = function(v){
	var vs = v.split("-");
	var tm = [0, 0, 0];
	var pos = v.indexOf(' ');
	if(pos > 0){
		try{
			var pos = v.indexOf(' ');
			var dt = v.substring(0, pos);
			var tmx = v.substring(pos+1);
			vs = dt.split("-");
			var tms = tmx.split(":");
			for(var i = 0; i < tms.length && i < 3; i++){
				tm[i] = parseInt(tms[i]);
			}
		}catch(xc){}
	}
	return new Date(parseInt(vs[0]), parseInt(vs[1])-1, parseInt(vs[2]), tm[0], tm[1], tm[2]);
}
zt.fmsec = function(v)
{
	var s = "";
	var sd = 0;
	var sh = 0;
	var sm = 0;
	var ss = 0;
	try{
		var i = parseInt(v);
		
		var sd = parseInt(""+(i/60/60/24));
		var sh = parseInt(""+(i/60/60)) % 24;
		var sm = parseInt(""+(i/60)) % 60;
		var ss = i % 60;
		
		if(sd > 0){
			s += sd + "天";
		}
		if(sh >= 0){
			s += sh + "小时";
		}
		if(sm >= 0){
			s += sm + "分";
		}
		if(ss >= 0){
			s += ss + "秒";
		}
		
	}catch(xcd){}
	return s;
}
/**
 读取一个实体对象
 cfg = {
	 type: "实体后缀名,不含JY",
	 id: "主键",
	 key2: "主键2",
	 prefix: "表单前缀",
	 ymd: "以yyyy-mm-dd显示的日期的字段列表,多个用半角逗号分开"
 }
 cbx = 回调函数
*/
zt.read = function(uri, cfg, cbb)
{
	var type = "",id = "",tag = "datas",key2 = "",prefix = "",cbx = null,key3="";

	if(cfg.type != undefined)type = cfg.type;
	if(cfg.id != undefined)id = cfg.id;
	if(cfg.tag != undefined)tag = cfg.tag;
	if(cfg.key2 != undefined)key2 = cfg.key2;
	if(cfg.key3 != undefined)key3 = cfg.key3;
	if(cfg.__prefix != undefined)prefix = cfg.__prefix;
	if(cbb != undefined)cbx = cbb;
	//if(type == "")return;
	//var zt = new ZTHttp(true);
	var dts = "rdx=" + Math.random();
	for(var kn in cfg){
		try{
			dts += "&" + kn + "=" + ENC(""+cfg[kn]);
		}catch(xcd){}
	}
	
	zt.post(uri, dts, function(s){
		
		if(s && s.documentElement)
		{
			try{
				var px = prefix ? prefix : "";
				var code = zt.icode(s);
				if(code == 200)
				{
					var n = zt.node(s.documentElement, tag);
					var ns = n.childNodes;
					var cd = {};
					for(var i = 0; i < ns.length; i++)
					{
						n = ns[i];
						try{
						if("data" == n.nodeName){
							var name = zt.ga(n, "name");
							
							var v = zt.xmlv(n);
							cd[name] = v;
							
							var ob = zt.g(px+name);
							var tp = (ob && ob.nodeName.toLowerCase() == "input") ? ob.type.toLowerCase() : "other";
							if(ob && tp != "radio" && tp != "checkbox"){
								zt.sve(px+name, v);						
							}else if(ob && tp == "radio"){
								zt.selectradio(px+name, v);	
							}else if(ob && tp == "checkbox"){
								zt.selectcheck(px+name, v);	
							}else{
								var dob = document.getElementsByTagName(px+name);
								if(dob && dob.length > 0){
									if(dob[0].type == "radio"){
										zt.selectradio(px+name, v);	
									}else if(dob[0].type == "checkbox"){
										zt.selectcheck(px+name, v);	
									}
								}
							}					
						}
						}catch(xcd){}
					}
					if(cfg.ymd != undefined){
						try{
							var ymds = cfg.ymd.split(",");
							for(var i = 0; i < ymds.length; i++){
								var f = ymds[i];
								var ff = zt.g(px+f);
								if(ff){
									var v = ff.value.split(" ");
									ff.value = v[0];
								}
							}
						}catch(xcd){}
					}
					if(cbx)cbx(code, cd);
				}else
				{
					if(cbx)cbx(code);
				}
			}catch(e)
			{
				if(cbx)cbx(-1);
			}
		}else
		{
			if(cbx)cbx(-2);
		}
	});
}

/**
 读取一个实体对象
 cfg = {
	 type: "实体后缀名,不含JY",
	 id: "主键",
	 key2: "主键2",
	 prefix: "表单前缀",
	 rp: true - 表示刷新页面
 }
 cbx = 回调函数
*/
zt.del = function(uri, cfg, cbb)
{
	var type = "",id = "",tag = "datas",key2 = "",prefix = "",cbx = null,key3="";
	var tipx = "你确定要删除该数据吗? \r\n 删除记录可能引起引用信息不完整.";

	
	if(cfg.type != undefined)type = cfg.type;
	if(cfg.id != undefined)id = cfg.id;
	if(cfg.tag != undefined)tag = cfg.tag;
	if(cfg.key2 != undefined)key2 = cfg.key2;
	if(cfg.key3 != undefined)key3 = cfg.key3;
	if(cfg.__prefix != undefined)prefix = cfg.__prefix;
	if(cfg.tip != undefined)tipx = cfg.tip;
	if(cbb != undefined)cbx = cbb;
	
	//if(type == "")return;
	
	
	
	if(!confirm(tipx))return;
	
	var dts = "rdx=" + Math.random();
	for(var kn in cfg){
		try{
			dts += "&" + kn + "=" + ENC(""+cfg[kn]);
		}catch(xcd){}
	}
	
	zt.post(uri, dts, function(s){
		if(s && s.documentElement)
		{
			try{
				var px = prefix ? prefix : "";
				var code = parseInt(zt.xmlv(s.documentElement.firstChild));
				if(code == 200)
				{
					if(cfg.__rp != undefined){
						if(cfg.__rp){
							zt.RP();
							return;
						}
					}
					if(cbx)cbx(code);
					else alert("删除成功!");
				}else
				{
					if(cbx)cbx(code);
					else alert("删除失败,可能没有权限: " + code);
				}
			}catch(e)
			{
				if(cbx)cbx(-1);
				else alert("删除失败,网络异常,请稍候再试!");
			}
		}else
		{
			if(cbx)cbx(-2);
			else alert("删除失败,网络异常,请稍候再试!");
		}
	});
}


// 打开上传窗口
zt.up = function(id,name,upid)
{
	var nm = "";
	if(name)nm= name;
	OpenUploader(upid ? upid : '',id, nm);
}

// 打开上传窗口, 并自动返回
zt.upauto = function(id,name,upid)
{
	var nm = "";
	if(name)nm= name;
	OpenUploader(upid ? upid : '',id, nm, '', true);
}
// 打开上传窗口, 并自动返回和回调!
zt.upcb = function(cb, upid)
{
	OpenUploaderCB(upid ? upid : '',true, cb);
}

// 打印后台显示图标
zt.img = function(l)
{
  try{
	  var et = l.substring(l.lastIndexOf(".")+1).toLowerCase();
	  if(et == "jpg" || et == "gif" || et == "jpeg" || et == "png" || et == "bmp"){
		  document.write('<img src="'+l+'" onerror="this.style.display=\'none\'" align="absmiddle" width="20" height="20"/>');
	  }
  }catch(xc){}
}

zt.gourl = function(u)
{
	if(u != "")window.location = u;
}
zt.openurl = function(u, t, title)
{
	if(u != ""){
		if(t == "_blank")
		{
			window.open(u, "_blank");
		}else if(t == "dlg")
		{
			zt.dlg(u, title ? title : u);
		}else
		{
			window.location = u;
		}
	}
}
// 对打开对话框
zt.dlg = function(url, title)
{
	OpenDLG(url, title);
}

// 获得所选ids
zt.sels = function()
{
	var str = "";
	var idn = document.getElementsByName("ids");
	if(!idn)return str;
	if(idn.length <= 0)return str;
	if(idn.length > 0)
	{
		for(var i = 0; i < idn.length; i++)
		{
			if(idn[i].checked)
			{
				if(str != "")str += "," + idn[i].value;
				else str += idn[i].value;
			}
		}
	}
	return str;
}

zt.treenode = function(n,p)
{	
	if(n)
	{
		var nd = {
			id : zt.ga(n, "id"),
			name : zt.ga(n, "name"),
			logo : (zt.ga(n, "logo") ? zt.ga(n, "logo") : ""),
			child: [],
			parent: p,
			toString : function(){
				return this.id + "-" + this.name + "\r\n\t" + "=="+this.gn()+"==\r\n";
			},
			gn : function()
			{
				var s = this.name;
				var x = this.parent;
				while(x){
					if(x.id != "_root_" && x.id != ""){
						s = x.name + " -> " + s;
					}
					x = x.parent;
				}
				return s;
			}
		};
		for(var i = 0; i < n.childNodes.length; i++)
		{
			try{
				if(n.childNodes[i].nodeName == "node")
				{
					var subnd = zt.treenode(n.childNodes[i], nd);
					nd.child.push(subnd);
					subnd.parent = nd;
				}				
			}catch(xcd){}
		}
		return nd;
	}
	
	return null;
}
zt.tree = function(s)
{
	var rt = zt.node(s.documentElement, "roots");
	var root = {
		id : "_root_",
		name : "",
		logo : "",
		child : [],
		parent : null,
		toString : function(){
				return this.id + "-" + this.name + "\r\n";
		},
		visit: function(nd, lid, curid, ar)
		{
			if(curid == lid){
				ar.push(nd);return;
			}
			for(var i = 0; i < nd.child.length; i++){
				this.visit(nd.child[i], lid, curid+1, ar);
			}
		},
		findn: function(nd, nid, curid, ar)
		{
			if(ar.length > 0)return;
			if(curid == nid){
				ar.push(nd);return;
			}
			for(var i = 0; i < nd.child.length; i++){
				this.findn(nd.child[i], nid, curid+1, ar);
			}
		},
		// 返回某层次中的全部节点
		layer: function(lid){
			var ar = [];
			root.visit(this, lid, 0, ar);
			return ar;
		},
		find: function(id){
			var ar = [];
			root.visit(this, id, 0, ar);
			return ar.length > 0 ? ar[0] : null;
		},
		// 显示某层节点到Select， 有问题！！！ sid - 表单ID， ly - 层号（1，2，3）， st - 原表单保留项， v - 当前值， nt - 不提供表示节点名称，提供任何值表示路径名
		show: function(sid,ly,st,v,nt)
		{
			var l3 = this.layer(ly);
			var sp = zt.g(sid);
			while(sp.options.length > st)sp.remove(st);
			for(var i = 0; i < l3.length; i++){
				var op = document.createElement("option");
				op.value = l3[i].id;
				op.text = nt == undefined ?  l3[i].name : l3[i].gn();
				if(op.value == v)op.selected = true;
				sp.add(op);
			}
			return this;
		},
		showid: function(sid,ly,st,v,nt)
		{
			var l3 = this.layer(ly);
			var sp = zt.g(sid);
			while(sp.options.length > st)sp.remove(st);
			for(var i = 0; i < l3.length; i++){
				var op = document.createElement("option");
				op.value = l3[i].id;
				op.text = nt == undefined ?  l3[i].name+"("+l3[i].id+")" : l3[i].gn();
				if(op.value == v)op.selected = true;
				sp.add(op);
			}
			return this;
		},
		// 显示某节点n的子节点到select表单, sid - 表单ID， n - 节点, st - 原表单保留项， v - 当前值，  nt - 不提供表示节点名称，提供任何值表示路径
		showchild: function(sid,n,st,v,nt)
		{
			var l3 = n.child;
			var sp = zt.g(sid);
			while(sp.options.length > st)sp.remove(st);
			for(var i = 0; i < l3.length; i++){
				var op = document.createElement("option");
				op.value = l3[i].id;
				op.text = nt == undefined ?  l3[i].name : l3[i].gn();
				if(op.value == v)op.selected = true;
				sp.add(op);
			}
			return this;
		}
	};
	if(rt)
	{
		var n = rt;
		for(var i = 0; i < n.childNodes.length; i++)
		{
			try{
				if(n.childNodes[i].nodeName == "node")
				{
					var subnd = zt.treenode(n.childNodes[i], root);
					root.child.push(subnd);
					subnd.parent = root;
				}				
			}catch(xcd){}
		}
	}
	return root;
}

zt.CK = {};
(function($){
	// CKEditor
	$.setckhtml = function(id,v) {
		if(!CKEDITOR)return;
		// Get the editor instance that we want to interact with.
		var editor = CKEDITOR.instances[id];
		
		// Check the active editing mode.
		if ( editor.mode == 'wysiwyg' )
		{
			editor.setData( v );
		}
	}
	$.insertckhtml = function(id,v) {
		if(!CKEDITOR)return;
		// Get the editor instance that we want to interact with.
		var editor = CKEDITOR.instances[id];
		
		// Check the active editing mode.
		if ( editor.mode == 'wysiwyg' )
		{
			editor.insertHtml( v );
		}
	}
	$.syndata = function(id)
	{
		try{
			if(!CKEDITOR)return;
			zt.sve(id, CKEDITOR.instances[id].getData());
		}catch(xcd){}
	}
	$.syndatas = function(ids)
	{
		try{
			if(!CKEDITOR)return;
			for(var i = 0; i < ids.length; i++)zt.CK.syndata(ids[i]);
		}catch(xcd){}
	}
	
	$.editor = function(id, w, h)
	{
		CKEDITOR.replace(id , {
				//extraPlugins: 'mathjax',
				removePlugins: 'about,forms,iframe,scayt,wsc,language,save,newpage',
				height: h,
				width: w
			});
	}
	
	$.editorExt = function(id, w, h, eps, rmpgs)
	{
		var xEP = "";
		var xRP = "about,forms,iframe,scayt,wsc,language,save,newpage";
		if(eps != undefined)xEP = eps;
		if(rmpgs != undefined)xRP = rmpgs;
		CKEDITOR.replace(id , {
				extraPlugins: xEP,
				removePlugins: xRP,
				height: h,
				width: w
			});
	}
	
	$.q_path = function(swf, mp4)
	{
		var str = '';
		if(swf != ""){
			str += '<a href="'+swf+'" target="_blank">FLASH</a>';
		}
		if(mp4 != ""){
			str += '<a href="'+mp4+'" target="_blank">MP4</a>';
		}
		if(str != "")document.write(str);
	}
	
	
	$.CUR_OP_ED = "content";
	$.show_local = function(type, cured)
	{
		if(cured)zt.CK.CUR_OP_ED = cured;
		zt.g("file_size_wh").style.display = "block";
		if(type == "0"){
			zt.g("ShowLableXC").innerHTML = "插入本地图片资源";
		}else if(type == "1"){
			zt.g("ShowLableXC").innerHTML = "插入本地SWF(FLASH)资源";
		}else if(type == "2"){
			zt.g("ShowLableXC").innerHTML = "插入本地文档下载附件资源";
			zt.g("file_size_wh").style.display = "none";
		}else if(type == "3"){
			zt.g("ShowLableXC").innerHTML = "插入本地视频资源";
		}else if(type == "4"){
			zt.g("ShowLableXC").innerHTML = "插入本地音频资源";
			zt.g("file_size_wh").style.display = "none";
		}
		zt.sve("file_type", type);
		zt.sve("file_id", "");
		zt.sve("file_name", "");
		zt.sve("file_path", "");
		zt.sve("file_width", "");
		zt.sve("file_height", "");
		
		zt.uiwin.show('localshow_edit');
		zt.CK.PV();
	}
	$.InsertToUI = function()
	{
		var ty = zt.v("file_type");
		var w = zt.v("file_width");
		var h = zt.v("file_height");
		var p = zt.v("file_path");
		var n = zt.v("file_name");
		var u = zt.v("file_id");
		if(p.indexOf("/") != 0 && p.indexOf("http://") != 0 && p.indexOf("https://") != 0)p = "/"+p;
		var str = '';
		if(ty == "0")
		{
			str = '<img src="'+p+'"'+((w != "" ? " width=\""+w+"\"" : ""))+((h != "" ? " height=\""+h+"\"" : ""))+' style="border:none;'+((w != "" ? ";"+w+"px" : ""))+((h != "" ? ";"+h+"px" : ""))+'"/>';
		}else if(ty == "1")
		{
			// Flash
			if(w == "")w = "500";
			if(h == "")h = "400";
			str = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="'+h+'" width="'+w+'">';
			str += '<param name="allowFullScreen" value="true" /><param name="quality" value="high" />';
			str += '<param name="movie" value="'+p+'" />';
			str += '<embed height="'+h+'" width="'+w+'" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="'+p+'" type="application/x-shockwave-flash"></embed></object>';
			
		}else if(ty == "2")
		{
			// download
			var url = p;
			if(u != ""){
				//url = "/jyfile.oms?omsv=downloadfile&file="+u;
				// bug for single context deploy!
			}
			str = '<a href="'+url+'" target="_blank">'+n+'</a>';
		}else if(ty == "3")
		{
			// Flash
			if(w == "")w = "500";
			if(h == "")h = "400";
			var h2 = parseInt(h)/2;
			str = '<div class="autovideo_obj" style="width:'+w+'px;height:'+h+'px;border:1px solid #444"><div style="margin:'+(h2-10)+'px auto;text-align:center;color:#f00">'+p+'</div></div>';
		}else if(ty == "4")
		{
			// Flash
			if(w == "")w = "500";
			if(h == "")h = "400";
			var h2 = parseInt(h)/2;
			str = '<audio src="'+p+'" controls="controls" autoplay="autoplay"></audio>';
		}
		if(str != "")
		{
			zt.CK.insertckhtml(zt.CK.CUR_OP_ED, str);
		}
		zt.uiwin.hideone();
	}
	zt.CK.PV = function()
	{
		var ty = zt.v("file_type");
		var v = zt.g("file_path").value;
		var s = zt.g("img_show");
		var w = zt.v("file_width");
		var h = zt.v("file_height");
		
		if(v == ""){s.innerHTML = "";return;}
		if(v.indexOf("/") != 0 && v.indexOf("http://") != 0 && v.indexOf("https://") != 0)v = "/"+v;
		
		var str = '';
		if(ty == "0")
		{
			str = '<img src="'+v+'" onload="IMG_RS(this)"/>';
		}else if(ty == "1")
		{
			// Flash
			if(w == "")w = "300";
			if(h == "")h = "150";
			str = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="'+h+'" width="'+w+'">';
			str += '<param name="allowFullScreen" value="true" /><param name="quality" value="high" />';
			str += '<param name="movie" value="'+v+'" />';
			str += '<embed height="'+h+'" width="'+w+'" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="'+v+'" type="application/x-shockwave-flash"></embed></object>';
			
		}else if(ty == "2")
		{
		}
		s.innerHTML = str;
		
	}
	$.sw = function(s,t)
	{
		return s.indexOf(t) == 0;
	}
	$.IMG_RS = function(o)
	{
		var w = o.width;
		var h = o.height;
		var rate = 1;
		if(w>640){
			rate = 640/w;
			w = 640;
			h = parseInt((rate*h)+"");
		}
		zt.sve("file_width", w);
		zt.sve("file_height", h);
		if(h > 200){
			o.height = 200;
		}
	}
})(zt.CK);

// 
// zt.M
zt.M = {}; // MessageBox
(function($){
	$.cb = null;
	$.show = function(title,stext,opts, cb){
		var options = opts || {
			"icon": "",
			"sure": 1,
			"close": 0,
			"retry": 0
		};
		var icon = zt.g("zt_api_msg_icon");
		var text = zt.g("zt_api_msg_text");
		
		if(!icon || !text){
			alert("TipBox不存在。请在页面底部body前包含views/public/ui/uiboxes.jsp");return;
		}
		
		zt.M.cb = cb ? cb : null;
		
		if(icon)icon.innerHTML = "";
		if(options.icon && options.icon != ""){
			icon.innerHTML = '<img src="'+options.icon+'" width="32" height="32"/>';
		}
		
		text.innerHTML = stext;
		zt.g("zt_api_tip_title").innerHTML = title;
		
		zt.g("zt_api_tip_sure").style.visibility = options.sure ? "visible" : "hidden";
		zt.g("zt_api_tip_close").style.visibility = options.close ? "visible" : "hidden";
		zt.g("zt_api_tip_retry").style.visibility = options.retry ? "visible" : "hidden";
		
		this.st(0);
		zt.uiwin.show("zt_api_tip_msgbox");
		return this;
	};
	
	$.ushow = function(v)
	{
		zt.g("zt_api_msg_text").innerHTML = v;
		zt.uiwin.show("zt_api_tip_msgbox");
		this.st(0);
		return this;
	}
	
	$.update = $.u = function(v)
	{
		zt.g("zt_api_msg_text").innerHTML = v;
		return this;
	};
	
	$.enable = $.e = function(b)
	{
		zt.g("zt_api_tip_"+b).style.visibility = "visible";
		return this;
	};
	
	$.disable = $.d = function(b)
	{
		zt.g("zt_api_tip_"+b).style.visibility = "hidden";
		return this;
	};
	
	$.st = $.status = function(b)
	{
		var t = zt.g("zt_api_msg_text");
		t.className = "zt_api_tip_st_"+b;
		return this;
	};
	
	
	$.close = function(v)
	{
		zt.uiwin.hideone();
		if(zt.M.cb){
			zt.M.cb(v);
		}
	};
	
})(zt.M);

zt.MTAB = {};

(function($){
	$.addrs = false;
	$.nodes = [];
	$.init = function(nd){		
		var l = null;
		var r = null;
		var c = null;
		for(var i = 0; i < nd.childNodes.length; i++){
			var n = nd.childNodes[i];
			if(n && n.className && n.className == "bc-mtabl")
			{
				l = n;
			}else if(n && n.className && n.className == "bc-mtabr")
			{
				r = n;
			}else if(n && n.className && n.className == "bc-mtabc")
			{
				c = n;
			}
		}
		
		$.rs(nd, l, r, c);
		
		var ul = zt.node(c, "ul");
		zt.addevent("click", function(){
			$.TabMovePrev(ul, c.clientWidth, c.clientWidth/2);
		}, r);
		zt.addevent("click", function(){
			$.TabMoveNext(ul, c.clientWidth, c.clientWidth/2);
		}, l);
		$.nodes.push({"nd":nd, "l":l, "r":r, "c":c});
		if(!$.addrs)
		{
			$.addrs = true;
			zt.addevent("resize", function(){
				for(var i = 0; i < $.nodes.length; i++){
					var n = $.nodes[i];
					$.rs(n.nd, n.l, n.r, n.c);
				}
			});
		}
	};	
	
	$.rs = function(nd, l, r, c)
	{
		l.style.height = nd.clientHeight+"px";
		r.style.height = nd.clientHeight+"px";
		
		c.style.width = (nd.clientWidth-l.clientWidth-r.clientWidth-1)+"px";
		nd.style.height = nd.clientHeight+"px";
	}
	
	$.timers = [];
	$.clear = function()
	{
		for(var i = 0; i < $.timers.length; i++){
			clearTimeout($.timers[i]);
		}
		$.timers = [];
	}
	function func_expc(t,b,c,d,s)
	{
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
	}
	$.TabMovePrev = function(ul, maxw, w, cc){
		$.clear();
		//alert(ul+"/"+maxw);
		//var maxw = 970;
		var c = cc ? cc : 1;
		//var ul = zt.g(id);
		var li = zt.nodes(ul, "li");
		var CL = li[0];
		
		//var w = CL.clientWidth;
		var lm = parseInt(CL.style.marginLeft);
		if(isNaN(lm))lm = 0;
		//w += 5;
		var mw = 0;
		for(var i = 0; i < li.length; i++){
			mw += li[i].clientWidth;
			var lmc = parseInt(li[i].style.marginLeft);
			if(isNaN(lmc))lmc = 0;
			mw += lmc;
			lmc = parseInt(li[i].style.marginRight);
			if(isNaN(lmc))lmc = 0;
			mw += lmc;
		}
		
		var curl = parseInt(ul.style.marginLeft);
		if(isNaN(curl))curl = 0;
		
		var old = curl;
		
		curl -= w;
		
		/*
		if((li.length/c * w) - Math.abs(curl) < maxw){
			curl = maxw-li.length/c * w;
		}*/
		if(mw-Math.abs(curl) < maxw/2){
			curl = maxw/2-mw;
		}
		
		if(curl > 0)curl = 0;
		//alert(curl);
		//ul.style.marginLeft = (curl)+"px";	
		var curt = 0;
		var maxt = 10;
		var dt = curl-old;
		for(var i = 0; i <= maxt; i++){
			var kt = setTimeout(function(){				
				ul.style.marginLeft = (func_expc(curt,old,dt,maxt))+"px";
				curt++;
			}, i*50);
			$.timers.push(kt);
		}
	}
	$.TabMoveNext = function(ul, maxw, w, cc){
		$.clear();
		//var ul = zt.g(id);
		var li = zt.nodes(ul, "li");
		var CL = li[0];
		
		//var w = CL.clientWidth;
		var lm = parseInt(CL.style.marginLeft);
		if(isNaN(lm))lm = 0;
		//w += 5;
		var curl = parseInt(ul.style.marginLeft);
		if(isNaN(curl))curl = 0;
		var old = curl;
		
		curl += w;
		if(curl > 0)curl = 0;
		ul.style.marginLeft = (curl)+"px";
		
		var curt = 0;
		var maxt = 10;
		var dt = curl-old;
		for(var i = 0; i <= maxt; i++){
			var kt = setTimeout(function(){				
				ul.style.marginLeft = (func_expc(curt,old,dt,maxt))+"px";
				curt++;
			}, i*50);
			$.timers.push(kt);
		}
	}
	
})(zt.MTAB);

zt.uitree = {
	sh : function(o){
		var p = o.parentNode.parentNode.parentNode;
		var cd = p.childNodes;
		var cld = null;
		for(var i = 0; i < cd.length; i++){
			try{
				if(cd[i].className.indexOf("webTreeChildNode") >= 0){cld = cd[i];break;}
			}catch(sd){}
		}
		//alert(p);
		if(cld){
			var v = cld.style.display;
			
			cld.style.display = (v == "block" || v == "") ? "none" : "block";
			var isexp = cld.style.display == "block";
			o.src = isexp ? "verip_private/images/collapse_subs.png" : "verip_private/images/expand_pluss.png";
		}
	}
}



// Fixed all table
zt.TBSel = function(){
	
}

zt.RSTL = function(obj)
{
	var tb = zt.p_table(obj);
	try{
		if(tb && tb.className == "tablelist")
		{
			var cbs = zt.nodes(tb, "input");
			for(var j = 0; j < cbs.length; j++)
			{
				var cb = cbs[j];
				if(cb && cb.className == "uilinecb")
				{
					var pp = zt.p_tr(cb);
					if(pp){
						pp.className = cb.checked ? "selected" : "";
					}
				}
			}
		}
	}catch(xcd){}
}
zt.p_table = function(o)
{
	var p = o.parentNode;
	while(p)
	{
		try{
			var tn = p.tagName ? p.tagName : p.nodeName;
			tn = tn.toLowerCase();
			if(tn == "table"){
				break;
			}
		}catch(xcd){}
		p = p.parentNode;
	}
	return p;
}
zt.p_tr = function(o)
{
	var p = o.parentNode;
	while(p)
	{
		try{
			var tn = p.tagName ? p.tagName : p.nodeName;
			tn = tn.toLowerCase();
			if(tn == "tr"){
				break;
			}
		}catch(xcd){}
		p = p.parentNode;
	}
	return p;
}


zt.veripui = function()
{
	// proc tablelist
	try{
		
		var tbs = zt.nodes(document.body, "table");
		
		for(var i = 0; i < tbs.length; i++)
		{
			var tb = tbs[i];
			//alert(tb+"/"+tb.className);
			if(tb && zt.csshas(tb, "tablelist"))
			{
				var cbs = zt.nodes(tb, "input");
				
				for(var j = 0; j < cbs.length; j++)
				{
					var cb = cbs[j];
					if(cb && zt.csshas(cb, "uilinecb"))
					{
						var pp = zt.p_tr(cb);
						if(pp){
							pp.className = cb.checked ? "selected" : "";
						}
						
						(function(CURCB){	
							var ccb = CURCB;					 
							zt.addevent("click", function(e){
								var p = zt.p_tr(ccb);
								if(p){
									p.className = ccb.checked ? "selected" : "";
								}
							}, CURCB);
						})(cb);
					}
				}
			}
		}
	}catch(xc){}
	//alert(tbs.length);
}



zt.addevent("load", zt.veripui);

