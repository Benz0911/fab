jQuery(document).ready(function() 
{
	//догрузка блока с analog links
	if($("#analog_links").length > 0) 
	{
		var an_l_data = $("#analog_links").text();
	    $.ajax({
        type: 'POST',
        url: baseUrl + 'directory-analog-links',
        data: { json_data: an_l_data},  
        success : function( data, status, xhr ) 
        {  
		    if(data)
            {
		        jQuery('#analog_links').html(data);
				$("#analog_links").toggle(); //отключаем display:none
		    }
        }
        });
	}
	
});