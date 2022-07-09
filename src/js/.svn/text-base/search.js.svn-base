$(document).ready(function()
{
  $('#search').hide();
 
  $('#search_keywords').keyup(function(key)
  {
    if (this.value.length >= 3 || this.value === '')
    {
       $('#companies').load(
        $(this).parents('form').attr('action'),
        { query: this.value}
                          );
    }
  
  });

jQuery('.view_profile').live('click', function() 
{  
  var query_company = $('input[name="query_company"]').val();
  var query_memberid = $('input[name="query_memberid"]').val();
    if (this.value.length >= 3 || this.value === '')
    {

       $('#search-box').load(
        $(this).parents('form').attr('action'),
        { query_company: query_company , query_memberid: query_memberid}
                          );
       
    } 
  });

  $( '.show_member_info' ).live('click',function(e){
        e.preventDefault();
        var member_info = $('.member_info').html();
        $.colorbox({open:true, opacity: 0.7, html: member_info});
});
  
  
});