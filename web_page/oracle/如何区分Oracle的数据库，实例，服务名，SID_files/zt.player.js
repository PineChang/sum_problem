/**Players*/
zt.player = zt.player || {};
zt.player.count = 0;
zt.player.instances = {};
zt.player.Fade = function()
{
	this.id = "ZT_PLAYER_FADE_" + (zt.player.count++);
	zt.player.instances[this.id] = this;
	
	this.interval = 5000;
	this.maxtime = 2000;
	this.delay = 100;
	this.timer = 0;
	this.SL = {
		o:null,
		ro:null,
		a:null,
		b:null,
		ra:null,
		rb:null,
		pc:[],
		flag:[],
		timers:[],
		urls:[],
		cur:1,
		si:[],
		loaded:function()
		{
			for(var i = 0; i < this.flag.length; i++)
			{
				if(this.flag[i] == false)return false;
			}
			return true;
		}
	};
	this.Set = function(t)
	{
		var a = zt.player.func_expc(t*this.delay, 100, -100, this.maxtime);
		var b = zt.player.func_expc(t*this.delay, 0, 100, this.maxtime);
		this.SL.ra.op = parseInt(a+"");
		this.SL.rb.op = parseInt(b+"");
		zt.player.SV_O(this.SL.ra.o, a);
		zt.player.SV_O(this.SL.rb.o, b);
	}
	this.Run = function()
	{
		clearTimeout(this.timer);
		if(this.SL.loaded())
		{
			//alert("Run");
			var ts = this.SL.timers;
			for(var i = 0; i < ts.length; i++){
				clearTimeout(ts[i]);
			}
			
			this.SL.ra = this.SL.a.op >= this.SL.b.op ? this.SL.a : this.SL.b;
			this.SL.rb = this.SL.a.op >= this.SL.b.op ? this.SL.b : this.SL.a;
			this.SL.timers = [];
			//alert(SL.ra.o.id+"="+SL.a.op);
			// a 变暗， b 变亮， b先设置新的图
			this.SL.cur = this.SL.cur % this.SL.pc.length;
			
			for(var i = 0; i < this.SL.pc.length; i++)
			{
				if(i != this.SL.cur)this.SL.si[i].src = "static/pub/dot_green.png";
				else this.SL.si[i].src = "static/pub/dot_red.png";			
			}
		
			for(var i = 0; i <= this.maxtime/this.delay; i++)
			{
				zt.node(this.SL.rb.o, "img").src = zt.node(this.SL.pc[this.SL.cur], "img").src;
				this.SL.timers.push(setTimeout("zt.player.instances['"+this.id+"'].Set("+i+")",i*this.delay));
			}
			this.SL.cur++;
			
		}
		var O = this;
		this.timer = setTimeout(function(){
			O.Run();
		}, this.interval);
	}
	this.LoadImage = function(i,im)
	{
		var m = new Image();
		var mg = zt.node(im, "img");
		var XL = this.SL;
		var O = this;
		m.onload = function()
		{
			XL.flag[i] = true;
			XL.si[i].src = "static/pub/dot_green.png";
			XL.si[i].onclick = function()
			{
				XL.cur = i;
				O.Run();
			}
			mg.src = zt.ga(mg, "data-src");
			if(XL.loaded()){O.Run();}
		}
		m.src = zt.ga(mg, "data-src");
		try{
			this.SL.urls[i] = zt.ga(mg, "data-url")
		}catch(Xc){}
	}
	this.Start = function(cfg)
	{
		this.SL.o = zt.g(cfg.imglist);
		this.SL.ro = zt.g(cfg.runc);
		this.SL.pc = zt.nodes(this.SL.o, "li");
		this.SL.flag = new Array(this.SL.pc.length);
		this.SL.si = new Array(this.SL.pc.length);
		this.SL.urls = new Array(this.SL.pc.length);
		this.SL.a = {op:100,o:zt.g(cfg.runa)};
		this.SL.b = {op:0,o:zt.g(cfg.runb)};
		
		if(cfg.delay != undefined){
			this.delay = cfg.delay;
		}
		if(cfg.maxtime != undefined){
			this.maxtime = cfg.maxtime;
		}
		if(cfg.interval != undefined){
			this.interval = cfg.interval;
		}
		
		var ls = zt.g(cfg.small);
		
		for(var i = 0; i < this.SL.pc.length; i++)
		{
			this.SL.flag[i] = false;
			this.SL.si[i] = new Image();
			this.SL.si[i].src = "static/pub/dot_black.png";
			try{
				ls.appendChild(this.SL.si[i]);
			}catch(Exc){}
			this.LoadImage(i,this.SL.pc[i]);
		}
		var O = this;
		this.SL.ro.style.cursor = "pointer";
		//*
		zt.addevent("click",function(){
			try{
				var i = O.SL.cur - 1;
				if(i < 0)i = 0;
				i = i % O.SL.pc.length;				
				var u = O.SL.urls[i];
				if(u == "")return;
				window.location = u;
			}catch(Exc){}
		} , this.SL.a.o);
		zt.addevent("click",function(){
			try{
				var i = O.SL.cur - 1;
				if(i < 0)i = 0;
				i = i % O.SL.pc.length;				
				var u = O.SL.urls[i];
				if(u == "")return;
				window.location = u;
			}catch(Exc){}
		} , this.SL.b.o);//*/
		this.timer = setTimeout(function(){
			O.Run();
		}, this.interval);
	}
}


zt.player.SV_O = function(c, v)
{
	try{
		var object = c.style;
		object.filter = "alpha(opacity=" + v + ")"; 
		object.opacity = (v / 100); 
    	object.MozOpacity = (v / 100); 
    	object.KhtmlOpacity = (v / 100);     	
	}catch(Ec){}
}
zt.player.func_expc = function(t,b,c,d,s)
{
	if((t/=d/2) < 1)return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
}

zt.player.Slider = function()
{
	this.id = "ZT_PLAYER_Slider_" + (zt.player.count++);
	zt.player.instances[this.id] = this;
	
	this.cb = function(i){}
	this.interval = 5000;
	this.maxtime = 2000;
	this.delay = 100;
	this.timer = 0;
	this.w = 100;
	this.h = 100;
	this.type = 0;
	this.SL = {
		ro:null,
		cc:null,
		pc:[],
		flag:[],
		timers:[],
		urls:[],
		cur:0,
		si:[],
		sp:[],
		
		to:0,
		pos:0,
		from:0,
		loaded:function()
		{
			for(var i = 0; i < this.flag.length; i++)
			{
				if(this.flag[i] == false)return false;
			}
			return true;
		}
	};
	this.Set = function(t)
	{
		var a = zt.player.func_expc(t*this.delay, this.SL.from, this.SL.to-this.SL.from, this.maxtime);
		this.SL.pos = a;
		if(this.type == 0)
		{
			this.SL.ro.style.marginLeft = a + "px";
		}else{
			this.SL.ro.style.marginTop = a + "px";
		}
		
	}
	this.Run = function()
	{
		clearTimeout(this.timer);
		if(this.SL.loaded())
		{
			//alert("Run");
			var ts = this.SL.timers;
			for(var i = 0; i < ts.length; i++){
				clearTimeout(ts[i]);
			}
			
			this.SL.timers = [];
			//alert(SL.ra.o.id+"="+SL.a.op);
			// a 变暗， b 变亮， b先设置新的图
			this.SL.cur = this.SL.cur % this.SL.pc.length;
			
			for(var i = 0; i < this.SL.pc.length; i++)
			{
				try{
					if(i != this.SL.cur)this.SL.si[i].src = "static/pub/dot_green.png";
					else this.SL.si[i].src = "static/pub/dot_red.png";			
				}catch(XC){}
				try{
					if(i != this.SL.cur)this.SL.sp[i].style.border="1px solid #fff";
					else this.SL.sp[i].style.border="1px solid #444";
				}catch(CX){}
			}
			
			var t = this.SL.pos;
			this.SL.from = t;
			//alert();
			if(this.type == 0)
			{
				this.SL.to = -this.SL.cur * (this.w);
			}else{
				this.SL.to = -this.SL.cur * (this.h);
			}
			
			//alert(this.SL.to + "/" + this.SL.from);
			for(var i = 0; i <= this.maxtime/this.delay; i++)
			{
				this.SL.timers.push(setTimeout("zt.player.instances['"+this.id+"'].Set("+i+")",i*this.delay));
			}
			this.cb(this.SL.cur);
			this.SL.cur++;
			
		}
		var O = this;
		this.timer = setTimeout(function(){
			O.Run();
		}, this.interval);
	}
	this.LoadImage = function(i,im)
	{
		//var m = new Image();
		var mg = im; //zt.node(im, "img");
		var m = mg;
		var XL = this.SL;
		var O = this;
		m.onload = function()
		{
			XL.flag[i] = true;
			try{
				XL.si[i].src = "static/pub/dot_green.png";
				XL.si[i].onclick = function()
				{
					XL.cur = i;
					O.Run();
				}
			}catch(xc){}
			
			try{
				XL.sp[i].src = zt.ga(mg, "data-src");
				XL.sp[i].onclick = function()
				{					
					XL.cur = i;
					O.Run();
				}
			}catch(Exc){}
			
			//mg.src = zt.ga(mg, "data-src");
			
			if(XL.loaded()){
				O.Run();
			}
		}
		m.src = zt.ga(mg, "data-src");
		try{
			this.SL.urls[i] = zt.ga(mg, "data-url")
		}catch(Xc){}
	}
	this.Start = function(cfg)
	{
		this.SL.ro = zt.g(cfg.runc);
		this.SL.cc = zt.g(cfg.container);
		this.SL.pc = zt.nodes(this.SL.ro, "img");
		this.SL.flag = new Array(this.SL.pc.length);
		this.SL.si = new Array(this.SL.pc.length);
		this.SL.sp = new Array(this.SL.pc.length);
		this.SL.urls = new Array(this.SL.pc.length);
		
		this.w = this.SL.cc.clientWidth;
		this.h = this.SL.cc.clientHeight;
		
		this.SL.ro.style.textAlign = "left";
		
		if(cfg.delay != undefined){
			this.delay = cfg.delay;
		}
		if(cfg.maxtime != undefined){
			this.maxtime = cfg.maxtime;
		}
		if(cfg.interval != undefined){
			this.interval = cfg.interval;
		}
		if(cfg.type != undefined){
			this.type = cfg.type;
		}
		
		if(this.type == 0){
			this.SL.ro.style.width = ((this.w+10)*this.SL.pc.length)+"px";
		}
		if(this.type == 1){
			this.SL.ro.style.height = ((this.h+10)*this.SL.pc.length)+"px";
		}
		
		if(cfg.cb != undefined)this.cb = cfg.cb;
		
		var ls = zt.g(cfg.small);
		var lp = zt.g(cfg.smallp+"");
		
		for(var i = 0; i < this.SL.pc.length; i++)
		{
			this.SL.flag[i] = false;
			if(ls)
			{
				this.SL.si[i] = new Image();
				this.SL.si[i].src = "static/pub/dot_black.png";
				try{
					ls.appendChild(this.SL.si[i]);
				}catch(Exc){}
			}
			
			if(lp)
			{
				this.SL.sp[i] = new Image();
				this.SL.sp[i].width = 48;
				this.SL.sp[i].height = 48;
				this.SL.sp[i].style.marginLeft="5px";
				this.SL.sp[i].style.cursor="pointer";
				this.SL.sp[i].style.border="1px solid #fff";
				this.SL.sp[i].src = "static/pub/dot_black.png";
				try{
					lp.appendChild(this.SL.sp[i]);
				}catch(Exc){}
			}
			
			this.LoadImage(i,this.SL.pc[i]);
			if(this.type == 1){
				this.SL.pc[i].style.clear = "both";
			}
		}
		var O = this;
		this.SL.ro.style.cursor = "pointer";
		
		zt.addevent("click",function(){
			try{
				var i = O.SL.cur - 1;
				if(i < 0)i = 0;
				i = i % O.SL.pc.length;				
				var u = O.SL.urls[i];
				if(u == "")return;
				window.location = u;
			}catch(Exc){}
		} , this.SL.ro);
		
		this.timer = setTimeout(function(){
			O.Run();
		}, this.interval);
	}
}