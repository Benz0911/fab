/* SalesList = function(formId) {
  var FabList= new FabListAB(formId);
  refreshListB_parent= FabList.refreshListB;
  FabList.refreshListB= function()
  {
    //refreshListB_parent.call(this);
    var html = "<table>";
    for (var i = 0; l = this.items.length, i < l; i++) {
        html += "<tr>";
        html += "<td>";
        html += this.items[i][1];
        html += "</td>";
        html += "<td>";
        html += this.items[i][1];
        html += "</td>";
        html += "<td>";
        html += this.items[i][1];  
        html += "</td>";
        html += "<td>";
        html += "<input type=\"button\" value=\"^\" id=\"btn_remove_";
        html += this.items[i][0];
        html += "\" class=\"btn_remove_from_list_b\" />";
        html += "</td>";
        html += "</tr>";
    }
    html += "</table>";
    this.$list_b_placeholder.html(html);
  }  
  
  return FabList;
};   */

//extend(SalesList, FabListAB);

/*$(document).ready(function(){
   if ($('#frm_sales_team').length)
   { 
     var user_list = new FabListAB('#frm_sales_team'); 
     user_list.$selectObj = $(user_list.formId).find('select.sales_people');

      user_list.save= function()
     {
        var csl = "",
        kol = this.items.length - 1;
        //проверить что массив не пустой
        for (var i = 0; i < this.items.length; i++) { 
         (i == kol) ? csl += this.items[i][0] : csl +=  this.items[i][0] + "|" ;
        }
        this.$list_b_items_csl.attr("value",csl);        
        $(this.formId).submit();  
     }    
     
     if ($('input[name="team_people"]').length) 
      {
        var users = $('input[name="team_people"]').val(); 
        if (users)
        {
          var user_array  = users.split(',');
          for (var i = 0; i < user_array.length; i++) 
          {
              $('#frm_sales_team select.sales_people').val(user_array[i]);
              user_list.addWrapper();
          }
        }
      } 
   }
   
   if ($('#frm_sales_districts').length)
   { 
     var district_list = new FabListAB('#frm_sales_districts'); 
     district_list.$selectObj = $(district_list.formId).find('select.sales_ma');
    
      district_list.save= function()
     {
        var csl = "",
        kol = this.items.length - 1;
        //проверить что массив не пустой
        for (var i = 0; i < this.items.length; i++) { 
         (i == kol) ? csl += this.items[i][0] : csl +=  this.items[i][0] + "|" ;
        }
        this.$list_b_items_csl.attr("value",csl);        
        $(this.formId).submit();  
     }    
     
     if ($('input[name="team_districts"]').length) 
      {
        var districts = $('input[name="team_districts"]').val(); 
        if (districts)
        {
          var district_array  = districts.split(',');
          for (var i = 0; i < district_array.length; i++) 
          {
              //alert(district_array[i]);
              $('#frm_sales_districts select.sales_ma').val(district_array[i]);
              district_list.addWrapper();
          }
        }
      } 
   }
   
       jQuery('.edit_link').live("click",function() 
    {
        var call_text_id = jQuery(this).attr('call_text_id');
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'prepare_for_sales/edit_call_text',
        data: { id: call_text_id },  
        success : function( data, status, xhr ) 
        { 
           $(document).ready(function(){
               jQuery(data).insertAfter('#call_text' + call_text_id); 
           // var select  = jQuery('#insurance' + insurance_id).prev('.insurance-block:last');
            jQuery('#call_text' + call_text_id + ":first").remove();
            
           });          
        }
        },'html');
    }); 
    
        jQuery('.delete_link').live('click', function() 
        {
            if (confirm("Are you sure?")) 
            {
                var call_text_id = jQuery(this).attr('call_text_id');
                var select = jQuery(this).closest(".call_text-block"); 
                jQuery.ajax({
                type: 'GET',
                url: baseUrl + 'prepare_for_sales/delete_call_text',
                data: { id: call_text_id },// box_number: box_number},  
                success : function( data, status, xhr ) 
                { 
                    jQuery(select).remove();             
                }
                },'html');
            }

    }); 
    
    jQuery('.add_call_text').live('click', function() 
    {
        var code_type = jQuery(this).attr('code_type');
        $.ajax({
        type: 'GET',
        url: baseUrl + 'sales/NewCallText/',
        data: { code_type: code_type},  
        success : function( data, status, xhr ) 
        { 
           jQuery(data).insertBefore('.add_call_text');           
        }
        },'html');      
    });
        
});*/

//**************browseSalesTeamPeople**********************
function browseSalesTeamPeople(body, number) 
{
  this.body= body;  
  this.number= number;
  this.init();
}
browseSalesTeamPeople.prototype.init= function()
{  
  this.save_button= this.body.find('.form_submit'); 
  this.form= this.body.find('form.frm_sales_team');
  this.people_to_select_body= this.body.find('.people_to_select'); 
  this.people_selected_body= this.body.find('.people_selected_in_team'); 
  this.people_date= this.body.find('.people_date');
  this.col_right= this.body.find('.col-right');  
  
  _i= this.number;
  if (typeof(_this_sales_team) === 'undefined') _this_sales_team= new Array();
  _this_sales_team[_i]= this;
  this.updateSelectedColumns();
  this.save_button.live('click', function(){   
    if (typeof clearPlaceholders === 'function') clearPlaceholders($(this.form));    
    __this_sales_team= _this_sales_team[findNumPlug($(this))];
    __this_sales_team.updatePeopleString();
    request= $(this.form).serialize(); 
    $.ajax({
      type: 'post',
      url: $(this.form).attr('action'),
      data: request,  
      success : function( data, status, xhr ) { 
        if (typeof(data) !== 'undefined')
        {
          __this_sales_team.body.html(data);
          if (!__this_sales_team.body.find('.form_submit.is_new').length && __this_sales_team.body.parents('.create_new_team').length)
          {
            new_div= __this_sales_team.body.parent();
            data_plug= __this_sales_team.body.attr('data-plug');
            new_div.parent().parent().after(data);
            new_div.html('');
            new_div.parent().parent().find('.bottom-line').remove(); 
            __this_sales_team.body= new_div.parents().find('.slider-block:first').find('.sales_team_widget:first');
            __this_sales_team.body.attr('data-plug', data_plug);

            $('.create_new_team_href').removeClass('non_display');
            
            $('.scroll-pane').jScrollPane(); 
          }
          else
          {
            new_name= __this_sales_team.body.find('#sales_team_name').val();
            __this_sales_team.body.parents('.sales_team_one').find('.sales_team_name').text(new_name);
          }
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          __this_sales_team.init();
        }
      }
    });   
  });
  this.initSlide();
  
  
  if (typeof baseInit !== 'undefined') baseInit(); 
  $('.scroll-pane').jScrollPane();
  
}
browseSalesTeamPeople.prototype.initSlide= function() 
{
  _i= this.number;
  _this_sales_team[_i]= this;
  $(".expcont").hide();
  $('.open_sales_team').unbind('click.slide');
  $('.open_sales_team').bind('click.slide', function(){
    $(this).parents(".sales_team_one:first").find(".expcont").slideToggle('fast', function() {  $(this).parent().find(".open_sales_team").toggleClass('openfull', $(this).is(':visible')); }  );
    _this_sales_team[_i].body.find('.scroll-pane').jScrollPane();
  });
  
  $('.prepare-for-sales-s7 .sli-block-exp .hide_link_my').unbind('click.hide_link'); 
  $('.prepare-for-sales-s7 .sli-block-exp .hide_link_my').bind('click.hide_link' ,function()
    {
         $(this).parents('.slider-block').find('.sli-block').height(55);
         $(this).parents('.sli-block-exp').toggle();
         $(this).parents('.slider-block').find('.sli-block .show').show();
         $(this).parents('.slider-block').find('.sli-block .title').show(); 
         $(this).parents('.slider-block').find('.sli-block .hidetitle').hide();
         $('.prepare-for-sales-s7 .scroll-pane').jScrollPane({autoReinitialise: true});
         $('.prepare-for-sales-s7').find('.sli-block').removeClass('click');  
    }); 
    
    $('.prepare-for-sales-s7 .sli-block .show.open_sales_team').unbind('click.show_link_add'); 
    $('.prepare-for-sales-s7 .sli-block .show.open_sales_team').bind('click.show_link_add', function() 
    {
         $(this).parent().height(19);
    }); 
    
    $('.prepare-for-sales-s7 .sli-block .show').unbind('click.show_link');
    $('.prepare-for-sales-s7 .sli-block .show').bind('click.show_link', function() {
        $(this).parent().parent().find('.sli-block-exp').toggle();
        $(this).parent().parent().find('.sli-block .show').hide();
        $(this).parent().parent().find('.sli-block .hide_link').show();    
        $(this).parent().parent().find('.sli-block .title').hide();
        $(this).parent().parent().find('.sli-block .hidetitle').show();
        $('.prepare-for-sales-s7').find('.jspContainer').height('370px');    
        $('.prepare-for-sales-s7').find('.col-left .jspContainer').width('250px');
        $('.prepare-for-sales-s7').find('.col-center .jspContainer').width('260px');
        $('.prepare-for-sales-s7 .scroll-pane').jScrollPane({autoReinitialise: true});
        $(this).parent().parent().find('.sli-block').addClass('click');
        $('.prepare-for-sales-s7 a.selectBox').width( '60px' );
        $('.prepare-for-sales-s7 span.selectBox-label').width( '60px' );
    });
  
}
browseSalesTeamPeople.prototype.updateSelectedColumns= function()
{ 
  //delete window._this;
  _i= this.number;
  _this_sales_team[_i]= this;
  this.people_to_select_body.find('.people_to_select_one').live('click', function(){
    $(this).addClass('non_display');
    data_id= $(this).attr('data-id');
    _this_sales_team[findNumPlug($(this))].people_selected_body.find('.people_selected_one[data-id=' + data_id + ']').removeClass('non_display'); 
    _this_sales_team[findNumPlug($(this))].updatePeopleString(); 
    _this_sales_team[findNumPlug($(this))].body.find('.scroll-pane').jScrollPane(); 
  });
  this.people_selected_body.find('.people_selected_one .people_name').live('click', function(){
    parent_li= $(this).parents('.people_selected_one:first');
    parent_li.addClass('non_display');
    data_id= parent_li.attr('data-id');
    _this_sales_team[findNumPlug($(this))].people_to_select_body.find('.people_to_select_one[data-id=' + data_id + ']').removeClass('non_display');
    _this_sales_team[findNumPlug($(this))].updatePeopleString();    
    _this_sales_team[findNumPlug($(this))].body.find('.scroll-pane').jScrollPane();
    _this_sales_team[findNumPlug($(this))].col_right.css('display', 'none');
    $(this).parent().parent().find('.people_date_selector').not('.grey').addClass('grey'); 
  });
  this.people_selected_body.find('.people_selected_one .people_date_selector').live('click', function()
  {
    parent_li= $(this).parents('.people_selected_one:first');
    
    $(this).parents('.people_selected_in_team').find('.people_selected_one').each(function()
    {
        if(!$(this).find('.people_date_selector').hasClass('grey')) $(this).find('.people_date_selector').addClass('grey'); 
    });
    $(this).removeClass('grey'); 
    
    data_id= parent_li.attr('data-id');
    __this_sales_team= _this_sales_team[findNumPlug($(this))];
    request=  {start_date: parent_li.find('.start_date').val(), end_date: parent_li.find('.end_date').val(), people_id: data_id, team_id: __this_sales_team.body.find('#sales_team_id').val()}; 
    offset_top = $(this).offset().top - 30;
    offset_body = __this_sales_team.body.offset().top;
    $.ajax({
      type: 'get',
      url: baseUrl + 'sales/getStartEndDate',
      data: request,  
      success : function( data, status, xhr ) { 
        if (typeof(data) !== 'undefined')
        {
          __this_sales_team.people_date.html(data);    
          __this_sales_team.col_right.show(); 
          if((offset_top - offset_body) > 510)  
          {
              offset = offset_body + 510;
          }
          __this_sales_team.col_right.offset({ top: offset_top});
          if (typeof baseInit !== 'undefined') baseInit();
          
          //__this_sales_team.body.find('.save_people_date').live('click', function(){
          __this_sales_team.body.find('.people_date_form select').change(function(){ 
            __this_sales_team.savePeopleDate(data_id);  
          });
        }
      }
    });    
  });
 // delete window._this; 
}
 
browseSalesTeamPeople.prototype.getDateStr= function(date_el)
{
  return date_el.find('select:eq(0)').val() + '-' + date_el.find('select:eq(1)').val() + '-' + date_el.find('select:eq(2)').val(); 
}

browseSalesTeamPeople.prototype.updatePeopleString= function() 
{        
 // selected_people= this.people_selected_body.find('.people_selected_one:visible');
  selected_people= this.people_selected_body.find('.people_selected_one').not('.non_display');
  selected_people_str= '';
  for(i=0; i< selected_people.length; i++)
  {
    el= selected_people[i];
    selected_people_str+= $(el).attr('data-id') + ',';    
  }
  if (selected_people_str.length) selected_people_str= selected_people_str.substring(0, selected_people_str.length - 1);
  this.form.find('.people_select_list').val(selected_people_str);
}

browseSalesTeamPeople.prototype.savePeopleDate= function(data_id)
{
  __this_sales_team= this;
  team_start_date= this.getDateStr(this.form.find('.team_start_date'));
  team_end_date= this.getDateStr(this.form.find('.team_end_date'));
  this.body.find('.people_date_form .team_start_date').val(team_start_date);
  this.body.find('.people_date_form .team_end_date').val(team_end_date);
  request= this.body.find('.people_date_form').serialize();
  $.ajax({
    type: 'post',
    url: baseUrl + 'sales/getStartEndDate',
    data: request,  
    success : function( data, status, xhr ) { 
      if (typeof(data) !== 'undefined')
      {
        __this_sales_team.people_date.html(data);  
        //__this_sales_team.body.find('.save_people_date').live('click', function(){
          __this_sales_team.body.find('.people_date_form select').change(function(){ 
            __this_sales_team.savePeopleDate(data_id);  
          });
        if (!__this_sales_team.body.find('.people_date_form .error_list').length) 
        {
          __this_sales_team.body.find('.people_selected_one[data-id=' + data_id + '] .start_date').val(__this_sales_team.getDateStr(__this_sales_team.body.find('.people_date_form .people_start_date')));
          __this_sales_team.body.find('.people_selected_one[data-id=' + data_id + '] .end_date').val(__this_sales_team.getDateStr(__this_sales_team.body.find('.people_date_form .people_end_date')));
        }
        if (typeof baseInit !== 'undefined') baseInit();   
      }
    }
  });  
}

function findNumPlug(el)
{
  return el.parents('.sales_team_widget:first').attr('data-plug');  
}


//**************browseSalesTeamDistrict**********************
function browseSalesTeamDistrict(body, number) 
{
  this.body= body;  
  this.number= number;
  this.init();
}
browseSalesTeamDistrict.prototype.init= function()
{  
  this.save_button= this.body.find('.form_submit'); 
  this.form= this.body.find('form.frm_sales_districts');
  this.people_to_select_body= this.body.find('.district_to_select'); 
  this.people_selected_body= this.body.find('.district_selected_in_team'); 
  this.people_date= this.body.find('.district_date'); 
  this.col_right= this.body.find('.col-right');  
  _i= this.number;
  if (typeof(_this_sales_team) === 'undefined') _this_sales_team= new Array();
  _this_sales_team[_i]= this;
  this.updateSelectedColumns();
  this.save_button.live('click', function(){
    if (typeof clearPlaceholders === 'function') clearPlaceholders($(this.form));    
    __this_sales_team= _this_sales_team[findNumPlugD($(this))];
    __this_sales_team.updateDistrictString();
    request= $(this.form).serialize(); 
    $.ajax({
      type: 'post',
      url: $(this.form).attr('action'),
      data: request,  
      success : function( data, status, xhr ) { 
        if (typeof(data) !== 'undefined')
        {
          __this_sales_team.body.html(data);
          //new_div= __this_sales_team.body.parent();
          //data_plug= __this_sales_team.body.attr('data-plug');
          //new_div.after(data);
          //new_div.html('');
          //__this_sales_team.body= new_div.parent().find('.sales_team_district_widget:first');
          //__this_sales_team.body.attr('data-plug', data_plug);
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          __this_sales_team.init();
          
          $('.scroll-pane').jScrollPane();  
        }
      }
    });   
  });
  this.initSlide();
  
}
browseSalesTeamDistrict.prototype.initSlide= function() 
{
  _i= this.number;
  _this_sales_team[_i]= this;
  $(".expcont").hide();
  $('.open_sales_team_district').unbind('click.slide');
  $('.open_sales_team_district').bind('click.slide', function(){    
    $(this).parents(".sales_team_district_one:first").find(".expcont").slideToggle('fast', function() {  $(this).parent().find(".open_sales_team_district").toggleClass('openfull', $(this).is(':visible')); }  );
    _this_sales_team[_i].body.find('.scroll-pane').jScrollPane();
  });
  
    $('.prepare-for-sales-s7 .sli-block .show.open_sales_team').unbind('click.show_link_add'); 
    $('.prepare-for-sales-s7 .sli-block .show.open_sales_team').bind('click.show_link_add', function() 
    {
         $(this).parent().height(19);
    }); 
    
    $('.prepare-for-sales-s7 .sli-block .show').unbind('click.show_link');
    $('.prepare-for-sales-s7 .sli-block .show').bind('click.show_link', function() {
        $(this).parent().parent().find('.sli-block-exp').toggle();
        $(this).parent().parent().find('.sli-block .show').hide();
        $(this).parent().parent().find('.sli-block .hide_link').show();    
        $(this).parent().parent().find('.sli-block .title').hide();
        $(this).parent().parent().find('.sli-block .hidetitle').show();
        $('.prepare-for-sales-s7').find('.jspContainer').height('370px');    
        $('.prepare-for-sales-s7').find('.col-left .jspContainer').width('250px');
        $('.prepare-for-sales-s7').find('.col-center .jspContainer').width('260px');
        $('.prepare-for-sales-s7 .scroll-pane').jScrollPane({autoReinitialise: true});
        $(this).parent().parent().find('.sli-block').addClass('click');
        $('.prepare-for-sales-s7 a.selectBox').width( '60px' );
        $('.prepare-for-sales-s7 span.selectBox-label').width( '60px' );
    });
}
browseSalesTeamDistrict.prototype.updateSelectedColumns= function()
{ 
  //delete window._this;
  _i= this.number;
  _this_sales_team[_i]= this;
  this.people_to_select_body.find('.district_to_select_one').live('click', function(){
    $(this).addClass('b-active_item');
    data_id= $(this).attr('data-id');
    _this_sales_team[findNumPlugD($(this))].people_selected_body.find('.district_selected_one[data-id=' + data_id + ']').removeClass('non_display'); 
    _this_sales_team[findNumPlugD($(this))].updateDistrictString();  
    _this_sales_team[findNumPlugD($(this))].body.find('.scroll-pane').jScrollPane(); 
  });
  this.people_selected_body.find('.district_selected_one .district_name').live('click', function(){
    parent_li= $(this).parents('.district_selected_one:first');
    parent_li.addClass('non_display');
    data_id= parent_li.attr('data-id');
    _this_sales_team[findNumPlugD($(this))].people_to_select_body.find('.district_to_select_one[data-id=' + data_id + ']').removeClass('b-active_item');
    _this_sales_team[findNumPlugD($(this))].updateDistrictString();    
    _this_sales_team[findNumPlugD($(this))].body.find('.scroll-pane').jScrollPane();
    _this_sales_team[findNumPlugD($(this))].col_right.hide();
    $(this).parent().parent().find('.people_date_selector').not('.grey').addClass('grey');
  /*  if(!$(this).parent().parent().find('.people_date_selector').hasClass('grey'))
    {
        $(this).parent().parent().find('.people_date_selector').addClass('grey')
    };
    */
  });
   this.people_selected_body.find('.district_selected_one .district_date_selector').live('click', function(){
    parent_li= $(this).parents('.district_selected_one:first');
    $(this).parents('.district_selected_in_team').find('.district_selected_one').each(function()
    {
        if(!$(this).find('.district_date_selector').hasClass('grey')) $(this).find('.district_date_selector').addClass('grey'); 
    });
    $(this).removeClass('grey');  
    data_id= parent_li.attr('data-id');
    __this_sales_team= _this_sales_team[findNumPlugD($(this))];
    request=  {start_date: parent_li.find('.start_date').val(), end_date: parent_li.find('.end_date').val(), people_id: data_id, team_id: __this_sales_team.body.find('#sales_team_district_id').val()}; 
    offset_top = $(this).offset().top - 30; 
    offset_body = __this_sales_team.body.offset().top;   
    $.ajax({
      type: 'get',
      url: baseUrl + 'sales/getStartEndDateDistrict',
      data: request,  
      success : function( data, status, xhr ) { 
        if (typeof(data) !== 'undefined')
        {
          __this_sales_team.people_date.html(data);  
          //__this_sales_team.body.find('.save_people_date').live('click', function(){
          
          __this_sales_team.col_right.show(); 
          
          if((offset_top - offset_body) > 510)  
          {
              offset = offset_body + 510;
          }
          __this_sales_team.col_right.offset({ top: offset_top});

          if (typeof baseInit !== 'undefined') baseInit();
          
          
          __this_sales_team.body.find('.people_date_form select').change(function(){ 
            __this_sales_team.saveDistrictDate(data_id);  
          });
        }
      }
    });    
  });
 // delete window._this; 
}
 
browseSalesTeamDistrict.prototype.getDateStr= function(date_el)
{
  return date_el.find('select:eq(0)').val() + '-' + date_el.find('select:eq(1)').val() + '-' + date_el.find('select:eq(2)').val(); 
}

browseSalesTeamDistrict.prototype.updateDistrictString= function() 
{        
 // selected_people= this.people_selected_body.find('.district_selected_one:visible');
  selected_people= this.people_selected_body.find('.district_selected_one').not('.non_display');   
  selected_people_str= '';
  for(i=0; i< selected_people.length; i++)
  {
    el= selected_people[i];
    selected_people_str+= $(el).attr('data-id') + ',';    
  }
  
  
  
  if (selected_people_str.length) selected_people_str= selected_people_str.substring(0, selected_people_str.length - 1);
  this.form.find('.districts_select_list').val(selected_people_str);
}

browseSalesTeamDistrict.prototype.saveDistrictDate= function(data_id)
{
  __this_sales_team= this;
  team_start_date= this.form.find('.team_start_date').val();
  team_end_date= this.form.find('.team_end_date').val();
  this.body.find('.people_date_form .team_start_date').val(team_start_date);
  this.body.find('.people_date_form .team_end_date').val(team_end_date);
  request= this.body.find('.people_date_form').serialize();
  $.ajax({
    type: 'post',
    url: baseUrl + 'sales/getStartEndDateDistrict',
    data: request,  
    success : function( data, status, xhr ) { 
      if (typeof(data) !== 'undefined')
      {
        __this_sales_team.people_date.html(data);  
        //__this_sales_team.body.find('.save_people_date').live('click', function(){
        
        if (typeof baseInit !== 'undefined') baseInit();
          
          __this_sales_team.body.find('.people_date_form select').change(function(){ 
            __this_sales_team.saveDistrictDate(data_id);  
          });
        if (!__this_sales_team.body.find('.people_date_form .error_list').length) 
        {
          __this_sales_team.body.find('.district_selected_one[data-id=' + data_id + '] .start_date').val(__this_sales_team.getDateStr(__this_sales_team.body.find('.people_date_form .people_start_date')));
          __this_sales_team.body.find('.district_selected_one[data-id=' + data_id + '] .end_date').val(__this_sales_team.getDateStr(__this_sales_team.body.find('.people_date_form .people_end_date')));
        }
      }
    }
  });  
}

function findNumPlugD(el)
{
  return el.parents('.sales_team_district_widget:first').attr('data-plug');  
}

$(document).ready(function(){  
  last_widget_index= 0;
  last_widget_district_index= 0;  
  if ($('.sales_team_widget').length)
  {
    $('.sales_team_widget').each(function(){
      new browseSalesTeamPeople($(this), last_widget_index); 
      $(this).attr('data-plug', last_widget_index); 
      last_widget_index++;
    });  
  }
  if ($('.sales_team_district_widget').length)
  {
    $('.sales_team_district_widget').each(function(){
      new browseSalesTeamDistrict($(this), last_widget_district_index); 
      $(this).attr('data-plug', last_widget_district_index); 
      last_widget_district_index++;
    });  
  }
  $('.create_new_team_href').live('click', function()
  {
    $.ajax({
      type: 'post',
      url: baseUrl + 'sales/new_sales_team', 
      success : function( data, status, xhr ) { 
        $('.create_new_team').html(data);
        new browseSalesTeamPeople($('.create_new_team .sales_team_widget'), last_widget_index); 
        $('.create_new_team .sales_team_widget').attr('data-plug', last_widget_index); 
        
        last_widget_index++;
      //  if (typeof baseInit !== 'undefined') baseInit(); 
      //  $('.scroll-pane').jScrollPane();
      }
    });
  })
  
  
/* prepare for sales expand */
    $('.prepare-for-sales-s7 .sli-block-exp').hide();
    $('.prepare-for-sales-s7 .sli-block .hide_link').hide();
    $('.prepare-for-sales-s7 .hidetitle').hide();
    $('.prepare-for-sales-s7 .bot-line').hide();
    

    
    $('.prepare-for-sales-s7 .sli-block .hide_link').click( function() {
        $(this).parent().parent().find('.sli-block-exp').toggle();
        $(this).parent().parent().find('.sli-block .show').show();
        $(this).parent().parent().find('.sli-block .hide_link').hide();    
        $(this).parent().parent().find('.sli-block .title').show();
        $(this).parent().parent().find('.sli-block .hidetitle').hide();
        $('.prepare-for-sales-s7 .scroll-pane').jScrollPane({autoReinitialise: true});
        $('.prepare-for-sales-s7').find('.sli-block').removeClass('click');
    });
    
    
	$('.not_active a').click(function(){
        return false;
    });
    




/* end prepare for sales expand */  
  
  
});