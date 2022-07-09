$(document).ready(function(){

    //remove job from page "my jobs"
    $('.no_longer_looking').confirmOn({
        questionText: 'Do you really want to remove this job from your list?',
        textYes: 'Yes',
        textNo: 'No'
    },'click', function(e, confirmed) {
        if(confirmed) {
            window.location = $(e.currentTarget).attr("href");
        }
    });
	
	//show archived job's
	$('.show-archived-jobs').live('click', function()
	{
		var url = document.URL;
		var attr_id = jQuery(this).attr('id')
		
		str_arr = attr_id.split('-');
		pt = str_arr[2];
		
	    jQuery.ajax({
        type: 'POST',
        url: baseUrl + 'job/show_archived_jobs',
        data: { url: url, pt: pt},  
        success : function( data, status, xhr ) 
        { 
		   if(data)
           {
		       $('.archived-jobs').html(data.html);
		       $('.show-archived-jobs').hide();
			  
			  
		   }   
        }
        }, 'json');
	}
	)
});