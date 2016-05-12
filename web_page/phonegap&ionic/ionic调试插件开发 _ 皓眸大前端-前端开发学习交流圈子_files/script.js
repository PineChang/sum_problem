(function($){
  // Nav bar toggle
  $('#main-nav-toggle').on('click', function(){
    $('.nav-container-inner').slideToggle();
  });

  // Share
  $('body').on('click', function(){
    $('.article-share-box.on').removeClass('on');
  }).on('click', '.article-share-link', function(e){
    e.stopPropagation();

    var $this = $(this),
      url = $this.attr('data-url'),
      encodedUrl = encodeURIComponent(url),
      id = 'article-share-box-' + $this.attr('data-id'),
      offset = $this.offset();

    if ($('#' + id).length){
      var box = $('#' + id);

      if (box.hasClass('on')){
        box.removeClass('on');
        return;
      }
    } else {
      var html = [
        '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
            '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
            '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
            '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
            '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
          '</div>',
        '</div>'
      ].join('');

      var box = $(html);

      $('body').append(box);
    }

    $('.article-share-box.on').hide();

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on');
  }).on('click', '.article-share-box', function(e){
    e.stopPropagation();
  }).on('click', '.article-share-box-input', function(){
    $(this).select();
  }).on('click', '.article-share-box-link', function(e){
    e.preventDefault();
    e.stopPropagation();

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  });

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  //Back to top
  $("#back-to-top").on('click', function(){  
    $('body,html').animate({scrollTop:0}, 600);
  });
  if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    //out line
    var str = "<dl id='outline'></dl>";var ss = $(str);$('h3').each(function(a,b){
      if($(b).attr("id") != undefined){
        ss.append('<dd class="sideCatalog-item2" id="sideToolbar-item--1_3"><a href="#'+ $(b).attr("id") +'" class="nslog:1026" title="'+ $(b).attr("id") +'" onclick="return false;">'+$(b).attr("id")+'</a><span class="sideCatalog-dot"></span><span class="sideCatalog-index2">'+ a +'</span></dd>');
      }
    });
    $("#sidebar").append(ss);

    $(window).scroll(function () {
      window.top_outline = $("#haomou_ad").offset().top + 300;
      //console.log(window.top_outline);
      if (window.top_outline < $(window).scrollTop()) {
        $("#outline").css({'position': 'fixed'});
        $("#outline").css({'margin-top': '0px'});
        $("#outline").css({'top': ($(window).height() / 2 - $("#outline").height() / 2)});
      } else {
        $("#outline").css({'position': 'relative'});
        $("#outline").css({'margin-top': '20px'});
        $("#outline").css({'top': ''});
      }
      $("#outline a").each(function (a, b) {
        if ($(window).scrollTop() > $($(b).attr("href")).offset().top) {
          $(b).css({"color": "#fb6580"});
        } else {
          $(b).css({"color": "#67a9d2"});
        }

      })
    });
    $("#outline a").click(function () {
      $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
      $body.animate({scrollTop: $($(this).attr("href")).offset().top}, 1000);
    });
  }

    $.each($("#ul_recom a"),function(_k,_ula) {
      $(_ula).hover( function (_v) {
        $.each($("#ul_recom a"), function (_k, _item) {
          $(_item).removeClass("currA");
        });
        $(this).addClass("currA");
        $.each($("#SwitchBigPic a"), function (_k, _item) {
          $(_item).hide();
        });
        $("#" + ($(this).attr("blockid"))).show();
      });
    });
    setInterval(function(){
      if($("#ul_recom a.currA").next().length > 0){
        $("#ul_recom a.currA").next().trigger("hover");
        $("#ul_recom a.currA").next().trigger("mouseover");
      }else{
        $($("#ul_recom a")[0]).trigger("hover");
        $($("#ul_recom a")[0]).trigger("mouseover");
      }
    },10000);
})(jQuery);