$(document).ready(function(){
    reload = false;
	var data_ajax = false;
    redirect_link = 'register/end_registration';
    var full_reg=false;
    var absolute_path=false;  
    initRegSubmit= function(){
        attach_reg_ajax_validation(); //declared in common.js
        cur_selector= '#cboxLoadedContent input[type="submit"]';   
        button_submit= $(cur_selector);
        button_submit.unbind('click.my_submit');
        button_submit.bind('click.my_submit', function(){
            $(this).parents('form:first').ajaxForm(function(data){
                data_ajax = data;				
                if(data.reload == 'true'){ 
                    if(data.redir_link) redirect_link = data.redir_link;
                    reload = true;
                    if(data.fully_registered == 1) full_reg = true; 
                    if(data.absolute_path) absolute_path = data.absolute_path;    
                    if(data.data){
                      $('#cboxLoadedContent').html(data.data);
                      if (typeof initPlaceholders === 'function') initPlaceholders();   
                    }else{
                        $.colorbox.close(); 
                    }
                }else{
                  $('#cboxLoadedContent').html(data);
                  if (typeof initPlaceholders === 'function') initPlaceholders();  
                } 
				
                $.colorbox.resize({innerWidth: $("#cboxLoadedContent").children().outerWidth(), innerHeight: $("#cboxLoadedContent").children().outerHeight()});   
                initRegSubmit(); 
				Custom.init();
            }
            );                             
        });
    }
    initClose = function(){
        if(reload==true){
            if(full_reg==true) location.reload(true);
            else{
                if(absolute_path == 'true')  window.location = redirect_link;
                else window.location = baseUrl + redirect_link;
            }
        }
    }
//Examples of how to assign the ColorBox event to elements
$(".ajax").colorbox({iframe:true, width:"50%", height:"50%"});
$(".reg").colorbox({iframe:false, maxWidth:680, opacity:0.6, close:"Close", scrolling:false ,
    onComplete: function(){
		initRegSubmit();
		Custom.init();
        $(this).colorbox.resize();
    },
    onClosed: function(){initClose()}
    });
$(".sign_main").colorbox({iframe:false, maxWidth:420, opacity:0.6, close:"Close", scrolling:false ,
    onComplete: function(){
		Custom.init();
        initRegSubmit();
        $(this).colorbox.resize();
    },
    onClosed: function(){initClose()}});

$('.forgot_password').live('click', function(e) {
                e.preventDefault();
                $(this).colorbox({iframe:false, width:440, height:505, opacity:0.6, close:"Close", open:'true', scrolling:true , onComplete: function(){ initRegSubmit(); Custom.init();},  onClosed: function(){initClose()}});
           });

$('#cboxContent .register_link').live('click', function(e) {
    var width = ($(this).data("width")) ? $(this).data("width") : '420';
    e.preventDefault();
    $(this).colorbox({iframe:false, opacity:0.6, maxWidth:width, close:"Close", open:'true', scrolling: false,
        onComplete: function(){
            initRegSubmit();
			Custom.init();

            $(this).colorbox.resize();
        },
        onClosed: function(){initClose()}
    });
});
    
//Example of preserving a JavaScript event for inline calls.
$("#click").live('click', function(){ 
$('#click').css({"background-color":"#f00", "color":"#fff", "cursor":"inherit"}).text("Open this window again and this message will still be here.");
return false;
});

if ($('.send_email').length){
    $('.send_email').colorbox({opacity: 0.7, width:620, height:470, onComplete: function(){initRegSubmit()}}); 
}
/*initFindMemberSubmit = function(){
        cur_selector= '.viewprofile input[type="image"]';   
        button_submit= $(cur_selector);
        if(button_submit.length){          
            $(button_submit).parents('form:first').ajaxForm(function(data){
                $('.in1-error').parents('.in1').find('.footer-fld').removeClass('error');
                $('.in1-error').html(false);
                $('.in2-error').parents('.in2').find('.footer-fld').removeClass('error');
                $('.in2-error').html(false);
                if(data.error){
                   if(data.error_type == 'member'){
                       $('.in2-error').html(data.error);
                       $('.in2-error').removeClass('hidden'); 
                       if(!$('.in1-error').hasClass('hidden')) $('.in1-error').addClass('hidden'); 
                       $('.in2-error').parents('.in2').find('.footer-fld').addClass('error');
                       if (typeof initPlaceholders === 'function') initPlaceholders();
                   } 
                   if(data.error_type == 'company'){
                       $('.in1-error').html(data.error);
                       $('.in1-error').removeClass('hidden');
                       if(!$('.in2-error').hasClass('hidden')) $('.in2-error').addClass('hidden'); 
                       $('.in1-error').parents('.in1').find('.footer-fld').addClass('error');
                       if (typeof initPlaceholders === 'function') initPlaceholders();
                   } 
                   if(data.error_type == 'both'){
                       $('.in1-error').html(data.error);
                       $('.in1-error').removeClass('hidden'); 
                       if(!$('.in2-error').hasClass('hidden')) $('.in2-error').addClass('hidden');  
                       $('.in1-error').parents('.in1').find('.footer-fld').addClass('error');
                       //$('.in2-error').parents('.in2').find('.footer-fld').addClass('error');
                       if (typeof initPlaceholders === 'function') initPlaceholders();
                   } 
                }else{
                    if(data.link_to_member) window.location = data.link_to_member;   
                }
            }
            );
        }                             
    }
initFindMemberSubmit();    */
   if ($('.live-text').length){ 
       $(".live-text").live('click',  function() {
         var live = !$(this).hasClass('active');
		 var perc;
         var member_id = $(this).attr('member_id');
		 if(timerId != -1) clearTimeout(timerId); //удаляем сообщение, которое показывается в Build Profile (показ с помощью колорбокс)
		 //NU 02/04/2015 Определяем тип показываемого сообщения, если это мембершип куплен с промокодом, показываем другой текст
         $.colorbox({href: baseUrl + 'build_profile/set_live?id=' + member_id, iframe:false, opacity:0.20, close:"Close", scrolling:true , onComplete: function(){initRegSubmit();},  onClosed: function(){
			perc = data_ajax.perc;  
            if(reload==true){//В случае если мы нажали на Yes
                if(!live){
                    $('.live-text').removeClass('active');
                    if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
                    	gtag('event', 'invisible-live-'+member_id, {'event_category':'build-profile', 'event_label':member_id});
                    $.ajax({
                type: 'POST',
                url: baseUrl + 'build_profile/check_mem?id=' + member_id,      //Проверяем, проставлен оли у мембера специальность первого уровня, если да - то убираем класс had_live
                success : function( data, status, xhr ){ 
                  if (!data.spec){
                    if($('.specialism_select_widget_build').hasClass('had_live')) $('.specialism_select_widget_build').removeClass('had_live');
                  }
                }
                }, "json");
                
                }else{
                  $('.live-text').addClass('active');
                  if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
                	    gtag('event', 'visible-live-'+member_id, {'event_category':'build-profile', 'event_label':member_id});	
                  if ($('.specialism_select_widget_build').length){
                                $('.specialism_select_widget_build').addClass('had_live');      

                        gb_id= $('.specialism_select_widget_build .multi_trade_id').val();
                        //******** Если при постановке лайв у нас выбран multi trade- запрещаем изменения 2го уровня
                        if (parseInt($('.specialism_level_one .selected_specialism').attr('data-id')) === parseInt(gb_id)){
                          $('.specialism_level_two .item_row  input').prev().removeClass('checkbox');
                          $('.specialism_level_two .item_row  input').attr('disabled', 'disabled');   
                          if (typeof(Custom) !== 'undefined') Custom.init();
                        }
                  }
                }
                reload = false;
            }
			//процент установить
			if(perc != 'undefined' && $('#percentage').length)
			    $('#percentage').val(perc);
			
            if(timerId != -1) timerId = messageImprSug();
         }}); 
        
       /*
       var live = !$(this).hasClass('active');
       var member_id = $(this).attr('member_id');
       $.ajax({
        type: 'POST',
        url: baseUrl + 'profile/SetLive',
        data: { live: live, member_id: member_id },  
        success : function( data, status, xhr ) 
        {
          if(!live) $('.live-text').removeClass('active');
          else  $('.live-text').addClass('active'); 
        }}); 
        */
        });
        
   } 
   
   
   
   initFindTradeMemberSubmit = function(){
        cur_selector= '.trade_block input[type="submit"]';   
        button_submit= $(cur_selector);
        if(button_submit.length){          
            $(button_submit).parents('form:first').ajaxForm(function(data){
                $('.trade-error').parent().find('.company_autocompl').removeClass('error');
                $('.trade-error').html(false);

                if(data.error){
                    $('.trade-error').html(data.error);
                    $('.trade-error').parent().find('.trade_company_autocompl').addClass('error');
                    $('.trade-error').removeClass('hidden');    
                    if (typeof initPlaceholders === 'function') initPlaceholders();
                }else{
                    if(data.link_to_member) window.location = data.link_to_member;   
                }
            }
            );
        }                             
    }
initFindTradeMemberSubmit(); 
   if ($('.renew').length){ 
         
       $(".renew .styled").change( function(){
           var member_id = $(this).attr('member_id');
           $.ajax({
                type: 'POST',
                url: baseUrl + 'profile/SetAutoRenewal?id=' + member_id,      
                success : function( data, status, xhr ){ 
                }
                }, "json"); 
       });
   }

// Респонсивный ColorBox
/*$.colorbox.settings.maxWidth = '95%';
$.colorbox.settings.maxHeight = '95%';

//Функция ресайза ColorBox
var resizeTimer;
function resizeColorBox()
{
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if ($('#cboxOverlay').is(':visible')) {
            $.colorbox.resize()
			//$.colorbox.load(true);
        }
    }, 300);
}

//Ресайз при изменении размера окна браузера и изменении ориентации мобильного устройства
$(window).resize(resizeColorBox);
window.addEventListener("orientationchange", resizeColorBox, false);   
*/
});


