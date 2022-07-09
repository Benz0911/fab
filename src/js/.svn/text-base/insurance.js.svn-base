$(document).ready(function(){
    jQuery('input[name="edit policy"]').live("click",function() 
    {
        var insurance_id = jQuery(this).attr('insurance_id');
        var box_number = jQuery(this).attr('box_number');
		
		if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
			gtag('event', 'edit-insurance-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
			
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'build_profile/edit_insurance',
        data: { id: insurance_id , box_number: box_number},  
        success : function( data, status, xhr ) 
        { 
           $(document).ready(function(){
               jQuery(data).insertAfter('#insurance' + insurance_id); 
           // var select  = jQuery('#insurance' + insurance_id).prev('.insurance-block:last');
            jQuery('#insurance' + insurance_id + ":first").remove();
            
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
    }); 
    
        jQuery('input[name="remove policy"]').live('click', function() 
    {
        var insurance_id = jQuery(this).attr('insurance_id');
       var select = jQuery(this).closest(".insurance-block"); 
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'build_profile/delete_insurance',
        data: { id: insurance_id },// box_number: box_number},  
        success : function( data, status, xhr ) 
        { 

            jQuery(select).remove();
            if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
            	gtag('event', 'remove-insurance-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});				
            if(jQuery('.insurance-block').length )
            {
                var num =1;
                jQuery(".insurance-block").each(function()
                {
                  // jQuery('.test').html(num);
                   jQuery(this).children().find(".insurance_num:first").html(num);  
                   num = num + 1;    
                });
            }
            
        }
        },'html');
    }); 
    
    
    jQuery(".cover_note").live('click', function(e){
        e.preventDefault();
    jQuery(this).colorbox({ opacity: 0.7 , open:true});
    });
    
    
    /*jQuery(".cover_note").each(function(){
     jQuery(this).colorbox({ opacity: 0.7});    
   });*/
});


