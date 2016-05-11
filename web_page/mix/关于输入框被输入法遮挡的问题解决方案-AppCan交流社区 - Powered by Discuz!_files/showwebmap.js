// JavaScript Document
jQuery(document).ready(function(){
  jQuery("#user>a>img").mouseenter(function(){
	  jQuery("#userdatas").show();
  });
  jQuery("#userdatas").mouseleave(function(){
	  jQuery("#userdatas").hide();
  });
   jQuery("#user").mouseleave(function(){
	  jQuery("#userdatas").hide();
  });	
  jQuery("#webmapword").mouseenter(function(){
	  jQuery("#newNav").show();
  });
   jQuery("#newNav").mouseleave(function(){
	  jQuery("#newNav").hide();
  }); 
   jQuery("#webmapword").mouseleave(function(){
	  jQuery("#newNav").hide();
  }); 
   jQuery("#newNav").mouseenter(function(){
	  jQuery("#newNav").show();
  });
   jQuery("#userdatas").mouseenter(function(){
		  jQuery("#userdatas").show();
  }); 
   jQuery('.select hr:last-child').css('display','none');
});


