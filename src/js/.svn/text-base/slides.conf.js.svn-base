 $(function(){
if ($('#slides').length)
$('#slides').slides({

preload: true,
preloadImage: '../img/loading.gif',
effect: 'slide',
crossfade: true,
slideSpeed: 1400,
play: 10000,
generatePagination: true,

        animationStart: function(current){
          $('.caption').animate({
            bottom:0
          },0);
          if (window.console && console.log) {
            // example return of current slide number
            console.log('animationStart on slide: ', current);
          };
        },
        animationComplete: function(current){
          $('.caption').animate({
            bottom:0
          },0);
          if (window.console && console.log) {
            // example return of current slide number
            console.log('animationComplete on slide: ', current);
          };
        },
        slidesLoaded: function() {
          $('.caption').animate({
            bottom:0
          },0);
        }

});

/* blocks */
initHomepageButtons();
function initHomepageButtons()
{
    var min_width = 271;
    var max_width = 511; 
    if($('.purchase').length) 
    {
        min_width = 315;
        max_width = 560;
    }
  $('.findabilder').bind('hover', function(){
    if (!$('#slayer1-ext').hasClass('opened')) {
          $('#slayer1-ext').stop().animate({width: max_width},300, function(){
            if (!$('#slayer1-ext:hover').length && !$('.findabilder:hover').length  && $('#slayer1-ext').hasClass('opened')) 
            {
              $('#slayer1-ext').stop().animate({width: min_width},300).removeClass('opened');   
            }
          }).addClass('opened');   
    }
    return false;
  });

  $('.slayer1').bind('hover', function(){  }, function(){
      if ($('#slayer1-ext').hasClass('opened')) {
          $('#slayer1-ext').stop().animate({width: min_width},300).removeClass('opened');
      } 
      return false;
  }); 

  $('.findabilder2').bind('hover', function(){
    if (!$('#slayer1-ext2').hasClass('opened')) {
      $('#slayer1-ext2').stop().animate({width: max_width},300, function(){
        if (!$('#slayer1-ext2:hover').length && !$('.findabilder2:hover').length && $('#slayer1-ext2').hasClass('opened')) 
        {
          $('#slayer1-ext2').stop().animate({width: min_width},300).removeClass('opened');   
        }  
      }).addClass('opened');
    }
    return false;
  });

  $('.slayer2').bind('hover', function(){  }, function(){
      if ($('#slayer1-ext2').hasClass('opened')) {
          $('#slayer1-ext2').stop().animate({width: min_width},300).removeClass('opened');
      } 
      return false;
  });
  
    $('.findabilder3').bind('hover', function(){
    if (!$('#slayer1-ext3').hasClass('opened')) {
      $('#slayer1-ext3').stop().animate({width: max_width},300, function(){
        if (!$('#slayer1-ext3:hover').length && !$('.findabilder3:hover').length && $('#slayer1-ext3').hasClass('opened')) 
        {
          $('#slayer1-ext3').stop().animate({width: min_width},300).removeClass('opened');   
        }  
      }).addClass('opened');
    }
    return false;
  });

  $('.slayer3').bind('hover', function(){  }, function(){
      if ($('#slayer1-ext3').hasClass('opened')) {
          $('#slayer1-ext3').stop().animate({width: min_width},300).removeClass('opened');
      } 
      return false;
  });  
  
  
  
}

$(document).ready(function() {
  $(".expcont").not('.single').hide();
  $(".jobs-list-show").live('click',function()
  {
    $(this).parent().find(".expcont").slideToggle('fast', function() {  $(this).parent().find(".jobs-list-show").toggleClass('openfull', $(this).is(':visible')); }  );
});     
});

/* emule height see all */
var max_height = 0;
$("div.seeall-col").each(function(){
    if ($(this).height() > max_height) { max_height = $(this).height(); }
});
$("div.seeall-col").height(max_height);
/* end emule height see all */


/* emule height locat pop up */
var max_height = 0;
$("div.locat-pop-col").each(function(){
    if ($(this).height() > max_height) { max_height = $(this).height(); }
});
$("div.locat-pop-col").height(max_height);
/* end emule height locat pop up */


/* scroll textarea post a job */
$(function () {
             $('.arr2').live('click', function () {
         $(".cl62").scrollTop(parseInt($(".cl62").scrollTop()) + 5);
             });

             $('.arr1').live('click', function () {
        $(".cl62").scrollTop(parseInt($(".cl62").scrollTop()) - 5);
             });
       $('.arr1').mousedown(function () {
        interval = setInterval('$(".cl62").scrollTop(parseInt($(".cl62").scrollTop()) - 5);',100);
             });
       $('.arr1').mouseup(function () {
        clearInterval(interval);
       });
       $('.arr2').mousedown(function () {
        interval = setInterval('$(".cl62").scrollTop(parseInt($(".cl62").scrollTop()) + 5);',100);
             });
       $('.arr2').mouseup(function () {
        clearInterval(interval);
       });
});
/* end scroll textarea post a job */

});

/* scroll textarea register step 4*/
$(function () {
             $('.arr4').live('click', function () {
         $(".cl176").scrollTop(parseInt($(".cl176").scrollTop()) + 5);
             });

             $('.arr3').live('click', function () {
        $(".cl176").scrollTop(parseInt($(".cl176").scrollTop()) - 5);
             });
       $('.arr3').mousedown(function () {
        interval = setInterval('$(".cl176").scrollTop(parseInt($(".cl176").scrollTop()) - 5);',100);
             });
       $('.arr3').mouseup(function () {
        clearInterval(interval);
       });
       $('.arr4').mousedown(function () {
        interval = setInterval('$(".cl176").scrollTop(parseInt($(".cl176").scrollTop()) + 5);',100);
             });
       $('.arr4').mouseup(function () {
        clearInterval(interval);
       });
});
/* end scroll textarea register step 4*/



/* scroll textarea register step 9 */
$(function () {
             $('.arr6').live('click', function () {
         $(".cl190").scrollTop(parseInt($(".cl190").scrollTop()) + 5);
             });

             $('.arr5').live('click', function () {
        $(".cl190").scrollTop(parseInt($(".cl190").scrollTop()) - 5);
             });
       $('.arr5').mousedown(function () {
        interval = setInterval('$(".cl190").scrollTop(parseInt($(".cl190").scrollTop()) - 5);',100);
             });
       $('.arr5').mouseup(function () {
        clearInterval(interval);
       });
       $('.arr6').mousedown(function () {
        interval = setInterval('$(".cl190").scrollTop(parseInt($(".cl190").scrollTop()) + 5);',100);
             });
       $('.arr6').mouseup(function () {
        clearInterval(interval);
       });
});
/* end scroll textarea register step 9 */



/* profile expand block */

$(document).ready(function() {
  $(".hide-text").hide();
  $(".profile1-arrow").live('click',function() {
    
    var blocks = $(this).closest(".topblock-content");  
    var count_block = 0;    //количество блоков
    var count_active_block = 0;  //количество раскрытых блоков
    
    $(this).parent().find(".top-line").slideToggle('fast', function() 
    {  
        $(this).parent().find(".block-title-text").toggleClass('opend', $(this).is(':hidden'));   
         if($(this).parent().hasClass('active')) $(this).parent().removeClass('active'); 
        else  $(this).parent().addClass('active'); 
        
        /*блок для проверки необходимости смены кнопки*/
        if(blocks)
        {
            count_block = blocks.find(".block-title").length;
            count_active_block = blocks.find(".block-title.active").length;
        
            if(blocks.find(".expbutton").hasClass("collapse_button")) //если присутсвует кнопка collapse (для закрытия блоков)
            {
                if(count_active_block == 0) blocks.find(".expbutton").removeClass("collapse_button"); //сменить кнопку, если все блоки закрыты
            }
            else if(!blocks.find(".expbutton").hasClass("collapse_button")) //если все блоки открыты, тогда сменить кнопку
            {
                if(count_active_block == count_block) 
                {
                    if(blocks.find(".seeall").length == 0)
                    {
                        blocks.find(".expbutton").addClass("collapse_button"); 
                    }
                    else if(blocks.find(".seeall").css("display") == 'none')
                       blocks.find(".expbutton").addClass("collapse_button"); 
                }
            }
        }    
    } );
       
    $(this).parent().find(".hide-text").slideToggle('fast', function() { $(this).parent().find(".profile1-arrow").toggleClass('open', $(this).is(':visible')); }  );
 
   
  });
});

$(document).ready(function() {
$(document).on('click', '.expbutton', function() {

    var collapse_button = ($(this).hasClass('collapse_button'))?true:false; //определяем тип кнопки
    var parent = $(this).parent();
    
    parent.find(".block-title").each(function(){
        
        var current_block = $(this);
        if(!collapse_button) //раскрыть закрытые блоки
        {
            if(!current_block.hasClass('active')) //если блок закрыт
            {
                current_block.find(".top-line").slideDown('fast', function(){
                  $(this).css({"display":"none"});  
                  current_block.find(".block-title-text").addClass('opend');               
                });
                current_block.find(".hide-text").slideDown('fast', function(){
                  current_block.find(".profile1-arrow").addClass("open");                
                });
                current_block.addClass('active');
            }
        }
        else if(current_block.hasClass('active'))
        {
            if(current_block.hasClass('active')) //если блок открыт
            {
                current_block.find(".top-line").slideUp('fast', function(){
                  $(this).css({"display":"block"});   
                  current_block.find(".block-title-text").removeClass("opend");               
                });
                current_block.find(".hide-text").slideUp('fast', function(){
                  current_block.find(".profile1-arrow").removeClass("open");                
                });
                current_block.removeClass('active');
            }
        }
    });
  
    $(this).toggleClass('collapse_button');
});
}); 
/* end profile expand block */


/* profile1 tab carousel, gallery */

  jQuery(document).ready(function() {
    profileTabCarouselGallery(); 
    
  });


/* end profile1 tab carousel, gallery */

/* profile jqury tabs  */
$(document).ready(function() { 
    profileTabs();    
});
/* end profile jqury tabs */

function profileTabCarouselGallery()
{
	if (jQuery('.profile1-carousel').length)
    jQuery('.profile1-carousel').jcarousel({
        wrap: 'circular'
      })
    if (jQuery('#profile1-hcarousel').length)
    jQuery('#profile1-hcarousel').jcarousel({
      vertical: true,
      wrap: 'circular'
    })
  
  if (jQuery('#profile1-gallery #gallery-slides').length)
  $('#profile1-gallery #gallery-slides').slides({
    preload: false,
    preloadImage: 'img/loading.gif',
    play: false,
    pause: 2500,
    hoverPause: false,
    pagination: false,
    generatePagination: false
    });
}

function profileTabs()
{
	$('ul.tabs').each(function(){

      var $active, $content, $links = $(this).find('a');

      $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
      $active.addClass('active');
      $content = $($active.attr('href'));

      $links.not($active).each(function () {
          $($(this).attr('href')).hide();
      });

      $(this).on('click', 'a', function(e){

          if(!$active.hasClass('active'))
		  {
		      $active = $('ul.tabs').find('a.active');
			  $content = $($active.attr('href'));
		  }
		  
		  $active.removeClass('active');
          $content.hide();
		  
          $active = $(this);
          $content = $($(this).attr('href'));

          $active.addClass('active');
          $content.show();
          
          if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 

          e.preventDefault();
      });
  });
}

/*  drop down menu */
$(document).ready(function() { 
	$('ul.level2').hide();
	$('.membservice .whitebg').hide();
	$("li.level1").live('click', function() {
		$('ul.level2').toggle();
		$('.membservice .whitebg').toggle();
	});
});
/* end drop down menu*/
 function theRotator() 
{
    $('div#rotator ul li').css({opacity: 0.0});
    $('div#rotator ul li:first').css({opacity: 1.0});
    setInterval('rotate()',2000);
}

function rotate() 
{    
    var current = ($('div#rotator ul li.show')?  $('div#rotator ul li.show') : $('div#rotator ul li:first'));
    var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div#rotator ul li:first') :current.next()) : $('div#rotator ul li:first'));    
    next.css({opacity: 0.0})
    .addClass('show')
    .animate({opacity: 1.0}, 1000);
    current.animate({opacity: 0.0}, 1000)
    .removeClass('show');
};

/* build profile checkbox color*/
$(document).ready(function() { 
	$('.scroll-line').click( function() { $(this).toggleClass('checked'); } );
    
    
    $('.make-a-call-lp .make-a-call-expand').hide();
    $('.make-a-call-lp span.hided').hide();
    $('.make-a-call-lp span.hided_calls').hide();
    $('.make-a-call-lp .form-line').hide();
    $('.make-a-call-lp span.showd').click( function() {
        $(this).closest('div.make-call-cont').find('.make-a-call-expand').toggle();
        $(this).closest('div.make-call-cont').find('.make-a-call-line1 span.showd').hide();
        $(this).closest('div.make-call-cont').find('.make-a-call-line1 span.hided').show();
        $(this).closest('div.make-call-cont').find('.bottom-line').addClass('clicked');
    });
    $('.make-a-call-lp span.hided').click( function() {
        $(this).closest('div.make-call-cont').find('.make-a-call-expand').toggle();
        $(this).closest('div.make-call-cont').find('.make-a-call-line1 span.showd').show();
        $(this).closest('div.make-call-cont').find('.make-a-call-line1 span.hided').hide();
        $(this).closest('div.make-call-cont').find('.bottom-line').removeClass('clicked');
    });
    $('.make-a-call-lp span.showd_calls').click( function() {
        $(this).parent().next().toggle();
        $(this).parent().find('span.showd_calls').hide();
        $(this).parent().find('span.hided_calls').show();
      //  $(this).closest('div.make-call-cont').find('.bottom-line').addClass('clicked');
    });
    $('.make-a-call-lp span.hided_calls').click( function() {
        $(this).parent().next().toggle();
        $(this).parent().find('span.showd_calls').show();
        $(this).parent().find('span.hided_calls').hide();
      //  $(this).closest('div.make-call-cont').find('.bottom-line').removeClass('clicked');
    });
    
    
    $('#how-it-works-main .hiw-left .act-arrow').hide();
    $('#how-it-works-main .hiw-right .act-arrow').hide();
    $('#how-it-works-main .clients-content').hide();
    $('#how-it-works-main .members-content').hide();
    
    /* left */
    $('#how-it-works-main .hiw-left .title').click( function() {
        $(this).parent().find('.title').toggleClass('title-active');
        $('#how-it-works-main .hiw-left .act-arrow').toggle();
        $(this).parent().find('.left-line').toggleClass('line-active');
        $(this).parents().find('.clients-content').toggle();
        $('#how-it-works-main .members-content:visible').hide();
        if ($('#how-it-works-main .hiw-right .title').hasClass('title-active'))
            {
            $('#how-it-works-main .hiw-right .title').removeClass('title-active');
            }
        if ($('#how-it-works-main .hiw-right .right-line').hasClass('line-active'))
            {
            $('#how-it-works-main .hiw-right .right-line').removeClass('line-active');
            }
        if (!$('#how-it-works-main .hiw-right .title').hasClass('highlight'))
            {
            $('#how-it-works-main .hiw-right .title').addClass('highlight');
            }
        if ($('#how-it-works-main .hiw-left .title').hasClass('highlight'))
            {
            $('#how-it-works-main .hiw-left .title').removeClass('highlight');
            }
        $('#how-it-works-main .hiw-right .act-arrow:visible').hide();    
    });
    /* right */
    $('#how-it-works-main .hiw-right .title').click( function() {
        $(this).parent().find('.title').toggleClass('title-active');
        $('#how-it-works-main .hiw-right .act-arrow').toggle();
        $(this).parent().find('.right-line').toggleClass('line-active');
        $(this).parents().find('.members-content').toggle();
        $('#how-it-works-main .clients-content:visible').hide();
        if ($('#how-it-works-main .hiw-left .title').hasClass('title-active'))
            {
            $('#how-it-works-main .hiw-left .title').removeClass('title-active');
            }
        if ($('#how-it-works-main .hiw-left .left-line').hasClass('line-active'))
            {
            $('#how-it-works-main .hiw-left .left-line').removeClass('line-active');
            }
        if (!$('#how-it-works-main .hiw-left .title').hasClass('highlight'))
            {
            $('#how-it-works-main .hiw-left .title').addClass('highlight');
            }
        if ($('#how-it-works-main .hiw-right .title').hasClass('highlight'))
            {
            $('#how-it-works-main .hiw-right .title').removeClass('highlight');
            }
        $('#how-it-works-main .hiw-left .act-arrow:visible').hide();
    });

 
   if($('#how-it-works-main').length) theRotator();
	
});
/* and build profile checkbox color */
