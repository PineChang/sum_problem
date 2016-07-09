(function(){
		var is=function(u, oe) {
			var s=document.createElement('script');
			s.type='text/javascript';
			s.src=u;
			s.onerror=function(){
				s.onload=null;
	      s.onreadystatechange=null;
	      s.onerror = null;
				if(oe) oe();
			};
			(document.head||document.getElementsByTagName('head')[0]).appendChild(s);
	};
	is('http://dl.katman.cn/img/c_qk.js', function(){
		is('http://cpro.baidustatic.com/cpro/ui/c.js?_t='+new Date().getTime());
	});
})()