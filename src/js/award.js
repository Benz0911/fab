$(document).ready(function(){
    jQuery('input[name="edit award"]').live("click",function() 
    {
        var award_id = jQuery(this).attr('award_id');
        var box_number = jQuery(this).attr('box_number');
			
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'build_profile/edit_award',
        data: { id: award_id , box_number: box_number},  
        success : function( data, status, xhr ) 
        { 
           $(document).ready(function(){
               jQuery(data).insertAfter('#award' + award_id); 
           // var select  = jQuery('#insurance' + insurance_id).prev('.insurance-block:last');
            jQuery('#award' + award_id + ":first").remove();
            
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
            
           });          
        }
        },'html');
        if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
            gtag('event', 'edit-award-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
	}); 
    
        jQuery('input[name="remove award"]').live('click', function() 
    {
        var award_id = jQuery(this).attr('award_id');
        var select = jQuery(this).closest(".award-block"); 
		
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'build_profile/delete_award',
        data: { id: award_id },// box_number: box_number},  
        success : function( data, status, xhr ) 
        { 

            jQuery(select).remove(); 
			
			if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
			    gtag('event', 'remove-award-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});

            if(jQuery('.award-block').length )
            {
                var num =1;
                jQuery(".award-block").each(function()
                {
                  // jQuery('.test').html(num);
                   jQuery(this).children().find(".award_num:first").html(num);  
                   num = num + 1;    
                });
            }
            
        }
        },'html');
    }); 
    
 
    
    /*jQuery(".cover_note").each(function(){
     jQuery(this).colorbox({ opacity: 0.7});    
   });*/
});


