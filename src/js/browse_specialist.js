$(document).ready(function(){
  var link_specialist_light= $("#lnk_pick_spec_light");  
  if (link_specialist_light.length)
  {
    BSpec= new browseSpecialistLight(link_specialist_light);  
  }    
});

//**************browseSpecialistLight**********************
function browseSpecialistLight(link_specialist_light) 
{
  _this_browse_specialist_light= this;
  this.extra_name= false;
  this.lnk_specialist= link_specialist_light; 
  this.max_select_view= 1000;
  this.blocked= false;  
  link_specialist_light.click(function(){
    _this_browse_specialist_light.click_pick()
  });
  this.la_all_ids= new Array(); 
  this.la_all_name= new Array();
  this.items= new Array(); 
  //this.localarea_body= $('#fab_find_job_specialist');
  //this.localarea_id= $('#fab_find_job_specialist_id'); 
  this.num_level= 1;     
  this.num_level_last= 6; 
  this.residential= true;
  //this.table_num= $('#fab_find_job_table_level');
}

browseSpecialistLight.prototype.click_pick= function()
{          
  _this_browse_specialist_light= this;
  this.lnk_specialist.colorbox({opacity: 0.7, onComplete: function(){_this_browse_specialist_light.preInit()}});
}    

browseSpecialistLight.prototype.preInit= function()  
{
  this.num_level= 1; 
  this.init(); 
}

browseSpecialistLight.prototype.ajaxOn= function(isOn) 
{
  if (isOn && !$('.faj_specialism_col.specialism_level_' + this.num_level).hasClass("browseAjaxLoad"))
  {   
    this.blocked= true;  
    //$('.select_variant').html('');
    //$('.select_string').val('');
    $('.faj_specialism_col.specialism_level_' + this.num_level).addClass("browseAjaxLoad");     
    $.colorbox.resize({innerHeight: $("#div_pick_addr_outter").outerHeight()});   
  }else if(!isOn)
  {
    this.blocked= false;  
    $('.faj_specialism_col.specialism_level_' + this.num_level).removeClass("browseAjaxLoad");
    $.colorbox.resize({innerHeight: $("#div_pick_specialist_outter").outerHeight()});  
  }  
}

browseSpecialistLight.prototype.init= function(parent_id)
{  
  _this_browse_specialist_light= this;
  _this_browse_specialist_light.ajaxOn(true);
  if (typeof(parent_id) != 'undefined') request= {num_level: _this_browse_specialist_light.num_level, parent_level_id: parent_id, residential: this.residential};
  else request= {num_level: _this_browse_specialist_light.num_level, residential: this.residential}  
  $.ajax({
    type: 'POST',
    url: baseUrl + 'findJob/getSpecialists',
    data: request,  
    dataType: 'json',
    success : function( data, status, xhr ) { 
      _this_browse_specialist_light.la_all_ids= data.la_items_ids;  
      _this_browse_specialist_light.la_is_childs= data.la_items_parent;
      _this_browse_specialist_light.items=  data.la_items_ids;
      _this_browse_specialist_light.items_sel= [];
      //_this_browse_specialist_light.initSelect();
        _this_browse_specialist_light.updateSelect();
      _this_browse_specialist_light.ajaxOn(false);   
    }
  }, "json"); 
  /*$('#btn_select_address').unbind('click');
  $('#btn_select_address').live('click', function(){
    _this_browse_specialist_light.selectSpecialism();  
  });*/

}

browseSpecialistLight.prototype.updateSelect= function(resize)
{
  _this_browse_specialist_light= this;
  var html= "";
  i= 0;
  _this_browse_specialist_light.items_sel= _this_browse_specialist_light.items;
  for (var key in _this_browse_specialist_light.items_sel)
  {
    id= this.items_sel[key]['id'];
    val= this.items_sel[key]['val'];
   
    if (_this_browse_specialist_light.la_is_childs[id])  html += "<li class=\"specialist_one specialist_next_level\" data-id=\"" + id + "\"><a href=\"javascript:void(0)\">" + val + "</a></li>";
    else  html += "<li class=\"specialist_one specialist_not_next_level\" data-id=\"" + id + "\"><a href=\"javascript:void(0)\">" + val + "</a></li>";  
    i++;
    if (i>= this.max_select_view) 
    {
      html += "<li data-id=\"-1\">...</li>"; 
      break;  
    }
  } 
  $('.specialism_level_' + _this_browse_specialist_light.num_level).html(html);
  /*$('.faj_current_selected').unbind('click');
  $('.faj_current_selected').live('click', function(){
    if ($(this).hasClass('faj_current_selected')) _this_browse_specialist_light.selectSpecialism(); 
  }); 
  $('.specialist_not_next_level').unbind('click');
  $('.specialist_not_next_level').live('click', function(){
    if ($(this).hasClass('faj_current_selected')) _this_browse_specialist_light.selectSpecialism(); 
  }); */
  $('.specialist_one').live('click', function(e){
    if (!_this_browse_specialist_light.blocked)
    {
      //option= $(this).find('option[value="'+$(".select_variant option:selected").val()+'"]');
      //if (option.hasClass('specialist_next_level')) 
      parent_div= $(this).parents('.faj_specialism_col');
      num_level= parent_div.attr('data-level-num');
      if ($('.faj_current_selected').length)
      {
        num_level_before= parseInt($('.faj_current_selected').parents('.faj_specialism_col').attr('data-level-num')); 
        if (num_level_before < parseInt(num_level)) $('.faj_current_selected').addClass('faj_parent_selected');  
        $('.faj_current_selected').removeClass('faj_current_selected');
        if (parent_div.find('.faj_parent_selected').length) parent_div.find('.faj_parent_selected').removeClass('faj_parent_selected');
      }
      $(this).addClass('faj_current_selected');
      if ($(this).hasClass('specialist_next_level')) _this_browse_specialist_light.selectSubLevel(num_level, $(this).attr('data-id'), $(this).text());
      else   
      {  
        enumerator = parseInt(num_level);   
        while(enumerator < 3)
        {
           $('.specialism_level_' + (enumerator + 1)).html('');  
           enumerator = enumerator + 1;
        }   
      }
      /*_this_browse_specialist_light.updateButton();   */
    }
  });
  $('.faj_specialism_col').each(function(){
    $('.scroll-pane').jScrollPane(); 
    /*if (!$(this).find('.mCustomScrollBox').length)
    { 
      $(this).mCustomScrollbar({
        advanced:{ 
          updateOnContentResize: true 
        }
      })
    } */
  });
}

/*browseSpecialistLight.prototype.updateButton= function() 
{
  if ($('.faj_specialism_col .faj_current_selected').length) $('#btn_select_address').removeClass('b-button_innactive'); 
  else $('#btn_select_address').addClass('b-button_innactive');   
} */

browseSpecialistLight.prototype.selectSubLevel= function(num_lvl, parent_id, text)
{
  //this.ajaxOn(true);
  //$('.specialist_level_'+ this.num_level).hide(); 
  this.num_level= parseInt(num_lvl) + 1; 
  //$('.specialist_level_'+ this.num_level).show(); 
  for(i= this.num_level; i<= this.num_level_last; i++)
  {
    $('.specialism_level_' + i).html('');   
  }
  this.init(parent_id);  
  //this.updateSelect(this); 
  //this.updatePath(parent_id, text);
}

/*  
browseSpecialistLight.prototype.selectSpecialism= function()
{
  if ($('.faj_current_selected').length)
  {
    selected_text= $('.faj_current_selected').text();
    index= selected_text.indexOf('>');
    if (index>= 0) selected_text= selected_text.substr(0, index-1);
    this.localarea_body.val($.trim(selected_text));
    this.localarea_body.blur();
    this.localarea_id.val($('.faj_current_selected').attr('data-id'));
    this.table_num.val($('.faj_current_selected').parents('.faj_specialism_col').attr('data-level-num'));
    $.colorbox.close();  
  }
} */  