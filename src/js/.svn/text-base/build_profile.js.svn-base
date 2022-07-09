var timerId;

$(document).ready(function(){
  $('.company_logo_load').click( function() {
   if (timerId != -1) clearTimeout(timerId); 
  $('.company_logo_load').colorbox({opacity: 0.7, scrolling: true, onClosed: function() {
      if ($.trim(company_ucp.getImg().attr('src'))) $('.company_logo_load img').attr('src', company_ucp.getImg().attr('src'));
	  //установим показ сообщения для Build Profile
	  if(timerId != -1) timerId = messageImprSug();
    },
    onComplete: function(){
	  
      company_ucp= new uploadCropPhoto($('.company_logo_widget'));
      if ($('.colorbox_content').length) 
      {
          div = $('.colorbox_content');
          var hasHorizontalScrollbar= div.scrollWidth > div.clientWidth;
          var hasVerticalScrollbar= div.scrollHeight > div.clientHeight;
          if (typeof($.colorbox) !== 'undefined' && (hasHorizontalScrollbar || hasVerticalScrollbar) || 1)
          { 
            $.colorbox.resize(); 
            if ($('.colorbox_content').length) $.colorbox.resize({innerWidth: $('.colorbox_content').outerWidth(), 
              innerHeight: $('.colorbox_content').outerHeight()}); 
            //$.colorbox.resize(); 
          } 
      }
      $('.company_logo_save').click(function(){ 
        form= $(this).parents('form:first');
        $.colorbox.close(); 
        $(form).find('input').after('<input type="hidden" name="is_ajax" value="1" />'); 
        $(form).ajaxForm(function(data){
         //company_ucp.formSuccess(data);
          find= data.match(/(.*\..*)(?=\s|$)/);
          if (find && find[1]) $('.company_logo_load img').attr('src', find[1]); 
        }); 
		if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
			gtag('event', 'upload-company-logotip-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
      });
      	  
  }});
  });
  
  $('#sell_all_dis_check').change( function()
  {
    if ($(this).is(":checked")) 
    {
      $(this).parents('.block-title').next().find('.localarea_block.end_block  input[type="checkbox"]').attr('checked', true);
       $('.localarea_select_widget input.localarea_save').removeAttr("disabled", "disabled");
    } 
    else 
    {
     $('.localarea_select_widget input.localarea_save').attr('disabled','disabled');
     $(this).parents('.block-title').next().find('.localarea_block.end_block input[type="checkbox"]').attr('checked', false);
    } 
  }); 

    if($(".build-profile .company_name").length)
    {
        var eip_error = false;
        var errors = [];
        //var original_value;
       // alert($(".build-profile .company_name").attr('company_id'));
        $(".build-profile .company_name").editInPlace(
        {
            url: baseUrl + 'build_profile/edit_company_name',
            params: "company_id=" + $(".build-profile .company_name").attr('company_id'),   
            bg_over: "transparent",
            show_buttons: true,
            save_button: '<button type="submit" class="inplace_save editable-submit ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-check"></span></button>',
            cancel_button: '<button type="button" class="inplace_cancel editable-cancel ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span></button>',
            cancel: '.inplace_cancel',
            success: function(json_data)
            {
                eip_error = false;
                errors = [];
                $(".build-profile .ui-button").removeClass('is_error'); 
                
              if(json_data.errors.length > 0)
               {
                   eip_error = true;

                   for(var i in json_data.errors) errors.push([json_data.errors [i]]);

               } 
               
               //if(json_data.original_value != false) original_value = json_data.original_value
               $(this).html(json_data.company_name);
               $('.build-profile .line1 .line1-right').height($('.build-profile .line1 .line1-left').height());  
               
            },
            end_edit: function()
            {
                if(eip_error) 
                {
                    $(".build-profile .company_name").unbind('click.editInPlace_my');   
                    $(".build-profile .company_name").bind('click.editInPlace_my', function()
                    {
                      if(eip_error)
                      {
                           $(this).find('input').addClass('error');
                           if(!$('.error_box').length) $(this).find('input').before('<p class="error_box"></p>');
                           $('.error_box').html("");
                           for(var i in errors) 
                           {
                               $('.error_box').append(errors[i]);
                           }
                      }
                        
                    });
                    $(".build-profile .company_name").click();  
                    $(".build-profile .ui-button").addClass('is_error'); 
                    eip_error = false;  
                }
                
            }
    });
    

    
           // $(".build-profile .company_name").click();   
    } 
    
    if($('.link_block a').length)
    {
        $('.link_block a').live('click', function()
        {
            $.ajax({
              type: 'POST',
              url: baseUrl + 'build_profile/get_mem_data',
              data: { },   
              success : function( data, status, xhr ) 
              {
                  //url: baseUrl + 'sfGuardAuth/checkUserSession/', 
                  window.location= baseUrl + 'profile-display/' + data.company_slug + '/' + data.mem_id ;
              }
              });
              return false; 
        }); 
    }

    jQuery('.add_award').live('click', function()
    {   
	    if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
	    	gtag('event', 'add-award-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
			
        if(jQuery('.award-block').length) {
            var box_number =jQuery('.award-block').size() + 1;
        }
        else  {
            var box_number =1;
        }
        $.ajax({
            type: 'POST',
            url: baseUrl + 'build_profile/new_award',
            data: { box_number: box_number},
            success : function( data, status, xhr )
            {
                jQuery(data).insertBefore('.tab5-right');
                if ($('.b-select_box').length) $("select.b-select_box").selectBox();
                if ($('.widget_other').length) $("select.widget_other").selectBox();
                if (typeof initPlaceholders === 'function') initPlaceholders();

                if ($(this).find('.widget_other').val() === '0') $(this).find('.widget_other').parent().find('.widget_other_text').removeClass('hidden');
                else $(this).find('.widget_other').parent().find('.widget_other_text').addClass('hidden');
                $(this).find('.widget_other').change(function(){
                    if($(this).val() == 0)  $(this).parent().find('.widget_other_text').removeClass('hidden');
                    else
                    {
                        $(this).parent().find('.widget_other_text').addClass('hidden');
                        // $(this).next('.widget_other_text').val('')
                    }
                });
				
            }
        },'html');
    });

    if ($('.b-select_box').length) $("select.b-select_box").selectBox();
    $('#build_person_form input[name=save_info]').live('click', function(){
        var disabled = $('#build_person_form').find(':checkbox:disabled').removeAttr('disabled');
        var form_data = $('#build_person_form').serializeArray();
        form_data.push({name: 'save_info', value: true});
        jQuery.ajax({
            type: 'POST',
            url: baseUrl + 'build_profile/person_form',
            data:  form_data,
            success : function( data, status, xhr )
            {
                jQuery('#our_people_box').html(data);
				$("select.b-select_box").selectBox();
                Custom.init();
            }
        });
    });

    $('#main_cont_for_profile').unbind('change');
    $('#main_cont_for_profile').live('change', function ()
    {
        if ($(this).is(':checked')) 
		{
		    $('.contact_role').removeClass('hidden');
			$("select.b-select_box").selectBox();
		}	
        else $('.contact_role').addClass('hidden');
    });

    jQuery('.add_policy').live('click', function()
    {

        if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
        	gtag('event', 'add-insurance-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
		
		if(jQuery('.insurance-block').length  ) var box_number =jQuery('.insurance-block').size() + 1;
        else  var box_number =1;
        $.ajax({
            type: 'POST',
            url: baseUrl + 'build_profile/new_insurance',
            data: { box_number: box_number},
            success : function( data, status, xhr )
            {
                jQuery(data).insertBefore('.tab6-right');
                if ($('.b-select_box').length) $("select.b-select_box").selectBox();
                if ($('.widget_other').length) $("select.widget_other").selectBox();
                if (typeof initPlaceholders === 'function') initPlaceholders();

                if ($('.widget_other').val() === '0') $('.widget_other').parent().find('.widget_other_text').removeClass('hidden');
                else $('.widget_other').parent().find('.widget_other_text').addClass('hidden');
                $('.widget_other').change(function(){
                    if($(this).val() == 0)  $(this).parent().find('.widget_other_text').removeClass('hidden');
                    else
                    {
                        $(this).parent().find('.widget_other_text').addClass('hidden');
                        // $(this).next('.widget_other_text').val('')
                    }
                });


            }
        },'html');
    });
    
	$('#invite_form input[name=send request]').live('click', function(){
        var personsName = $('input[name="build_invite_form[name]"]').val();
        var message = "<div class=\"invite\">";
        message +=    " An invitation email will be sent to "+personsName;
        message +=    "</div>";

        $('#invite_form').ajaxForm(function(data) 
             {
                $('.invite_form').html(data); 
                
        		if($('input[name="build_invite_form[notification]"]').val() == 'true')
				{
        		    $.colorbox({html: message, opacity: 0.20, iframe:false, scrolling:true, onComplete: function(){$(this).colorbox.resize();}});
					if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
						gtag('event', 'invitation-to-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
				}	   			
        		initSelectBox();
             });
    });
	
	//отправка детализации логина
	$(".send-login-details").click(sendLoginDetails);
	
	$('#build_overview_form').ajaxForm(function() 
    { 
       //$('#success_overview').html('Success!!');
    });
	
	if(gdprMess == 0)
	    timerId = messageImprSug();
	
});

sendLoginDetails = function()
{
    var member_id = $(this).attr('member_id');
    if(timerId != -1) clearTimeout(timerId); //удаляем сообщение, которое показывается в Build Profile (показ с помощью колорбокс)
    
    if(!member_id)
    {
        messageInColorbox('Not found member_id (build_profile.js(283 str))');
        if(timerId != -1) timerId = messageImprSug();
        
		return;
    }

	$.ajax({
		    type: 'POST',
			url:   baseUrl + 'build-profile/send-login-details/'+member_id
            ,
			dataType: 'text',
			success : function(data) {
	            messageInColorbox(data);
			}
		},"text");

}

function get_cookie(cookie_name)
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return (results[2]);
  else
    return null;
}

function messageImprSug(){
    //Блок вывода сообщения в build_profile
	if ($('#percentage').val() && $('#percentage').val() != 100){
	    
		var url = baseUrl +  'build_profile/improvement_suggestions';
		var percentage = $('#percentage').val();
        var member_id = $('div.live-text').attr('member_id');
	    var message = "<div class=\"colorbox_flash\">";
            message +=    "<div class=\"colorbox_text\"> Your profile is " + percentage + "% complete. <a href=\"" + url + "\" style=\"color: #003679\" target=\"_blank\" >See improvement suggestion.</a> </div>";
            message +=    "</div>";
		var timeId; 
        
        if (get_cookie('MEMBERID') == null || get_cookie('MEMBERID') != member_id)
        {
            timeId = setTimeout(function(){$.colorbox({html: message, opacity: 0.20, iframe:false, scrolling:true, onClosed: function(){document.cookie = "MEMBERID="+member_id+"; path=/;"; clearTimeout(timerId); timerId = -1; }})}, 10000);
        }
        else timeId = -1;
            
	 
	 return timeId;

	 }
}

function messageInColorbox(mes){
	    var message = "<div class=\"colorbox_flash\">";
            message +=    "<div class=\"colorbox_text\"> " + mes + " </div>";
            message +=    "</div>";
        
        $.colorbox({html: message, opacity: 0.20, iframe:false, scrolling:true, onClosed: function(){
                if(timerId != -1) timerId = messageImprSug();
		}});
} 	   
//***Our people
jQuery(document).ready(function() {
    
    jQuery('#mycarousel').jcarousel({
      scroll:1
    } );
    
    jQuery('ul#second-carousel li img.our-people').live('click', function()
    {
        var person_id = jQuery(this).attr('person_id');
        jQuery(this).parents('ul:first').find('li.active').removeClass('active');
        jQuery(this).parents('li:first').addClass('active');
        jQuery.ajax({
        type: 'POST',
        url: baseUrl + 'build_profile/get_person_form',
        data: { person_id: person_id },  
        success : function( data, status, xhr ) 
        { 
            jQuery('#our_people_box').html(data);//.promise().done(function()
            $("select.b-select_box").selectBox();
            Custom.init();
        }
        },'html');
    }); 
    //jQuery('ul#second-carousel li img:first').click();
    
    num_people= $('#case-study #second-carousel li img').length; 
    if (num_people <= 4){
        $('.profile1-carousel.our_people_carousel').parents('.jcarousel-container:first').find('.jcarousel-prev').hide();  
        $('.profile1-carousel.our_people_carousel').parents('.jcarousel-container:first').find('.jcarousel-next').hide();
    }

    jQuery('.build-profile .line1 .line1-right').height(jQuery('.build-profile .line1 .line1-left').height());  
      
});
