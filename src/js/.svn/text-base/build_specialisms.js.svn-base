$(document).ready(function(){buildSP= new buildSpecialisms($('.specialism_select_widget_build'));});

function buildSpecialisms(widget_body) 
{
  _this_specialism= this;
  this.widget_body= widget_body; 
  //this.england_id= $('.england_id').val();
  this.save_button= $('.specialism_save');
  //this.is_county= false;  //если выбирают Англию, то нужно отображать каунти и переменная будет true
  this.selected_spec_lvl_3= new Array();
  //this.selected_districts= new Array()
  
  this.init();
}

buildSpecialisms.prototype.init= function()
{
  _this_specialism= this;
  this.initUpdateLevel3();
  /*$('.specialism_column_build').each(function(){
    if (!$(this).find('.mCustomScrollBox').length)
    {
      $(this).mCustomScrollbar({
        advanced:{
          updateOnContentResize: true
        }
      })
    }
  });*/
  this.widget_body.find('.specialism_level_one .item_row').click(function(){
    if (!_this_specialism.widget_body.hasClass('had_live'))
    {
      if (_this_specialism.widget_body.find('.specialism_level_one .item_row.selected_specialism').length)
        _this_specialism.widget_body.find('.specialism_level_one .item_row.selected_specialism').removeClass('selected_specialism');  
      $(this).addClass('selected_specialism');
      _this_specialism.changeLevel2item();
    }
  });
  if (_this_specialism.widget_body.find('.item_row.end_row input:checked').length)
  {
    _this_specialism.save_button.removeAttr("disabled");
    _this_specialism.save_button.unbind('click'); 
    _this_specialism.save_button.click(function(){
      _this_specialism.saveLAS();    
    }); 
  }
  
  this.checkSaveButton(); 
}

buildSpecialisms.prototype.updateCustoms= function(){
  _this_specialism= this;
  
  Custom.init(); 

  $('.scroll-pane').each(function(){
    if ($.trim($(this).html()) !== "") $(this).jScrollPane();
  });
}

buildSpecialisms.prototype.checkSaveButton= function() 
{
  _this_specialism= this;  
  this.widget_body.find('.specialism_block input[type="checkbox"]').unbind('change.checkSave'); 
  this.widget_body.find('.specialism_block input[type="checkbox"]').bind('change.checkSave', function(){
    _this_specialism.checkSaveButtonNow();     
  });
}

buildSpecialisms.prototype.checkSaveButtonNow= function() 
{
  _this_specialism= this;
  is_end= false;
  if ($('.specialism_level_three input').length)
  {
    is_end= true; 
    /*$('.specialism_level_three .specialism_block').each(function(){    Позволяем сохранить и в случае не выбора специальности 3 уровня
      if (!$(this).find('input:checked').length) is_end= false;  
    }); */
  }
  else 
  {
    if ($('.specialism_level_two input').length)
    {
      is_end= true; 
      $('.specialism_level_two .specialism_block').each(function(){
        if (!$(this).find('input:checked').length) is_end= false;  
      });
    }
    else
    {
      if (!$('.specialism_level_one .item_row.selected_specialism').find('input:checked').length) is_end= true;  
    }  
  }
  //if (_this_specialism.widget_body.find('.end_block input:checked').length)
  if (is_end)
  {
    _this_specialism.save_button.removeAttr("disabled");
    _this_specialism.save_button.unbind('click'); 
    _this_specialism.save_button.click(function(){
      _this_specialism.saveLAS();    
    }); 
  }
  else _this_specialism.save_button.attr("disabled", "disabled");  
}

buildSpecialisms.prototype.initUpdateLevel3= function() 
{
  _this_specialism= this;
  this.widget_body.find('.specialism_level_two .item_row:not(.end_row) input[type="checkbox"]').each(function(){
    $(this).unbind('change');
    $(this).change(function(){
      _this_specialism.changeLevel3item();   
    }) 
  });   
}

//*****загружаем данные в третий столбец после выбора специальностей второго уровня
buildSpecialisms.prototype.changeLevel2item= function()
{
  _this_specialism= this;
  first_spec= this.widget_body.find('.specialism_level_one .item_row:not(.end_row).selected_specialism');
  if (first_spec.length)
  {
    this.loadSpecLvl2(load_column2_html, first_spec.attr('data-id'));  
  }
  else load_column2_html(''); 
  
  function load_column2_html(html)
  {            
    if (typeof(html) == 'undefined') html= '';
    
    _this_specialism.widget_body.find('.specialism_level_two').html(html);
    _this_specialism.widget_body.find('.specialism_level_three').html('');

    _this_specialism.updateScrollBox();
    _this_specialism.widget_body.find('.specialism_level_two').show(); 
    _this_specialism.checkSaveButton();
    _this_specialism.initUpdateLevel3();
    _this_specialism.checkSaveButtonNow();
    _this_specialism.updateCustoms();
  }
}

//*****загружаем данные в третий столбец после выбора специальностей второго уровня
buildSpecialisms.prototype.changeLevel3item= function()
{
  _this_specialism= this;
  spec_lvl_2= new Array();  
  i= 0; 
  this.widget_body.find('.specialism_level_two .item_row:not(.end_row) input:checked').each(function(){
    spec_lvl_2[i]= $(this).attr('data-id'); 
    i++; 
  });
  /*countries= new Array();
  counties= new Array();
  i= 0;
  this.is_county= false;
  and_not_england= false;
  this.widget_body.find('.specialism_level_one input:checked').each(function(){
    countries[i]= $(this).attr('data-id'); 
    if ($(this).attr('data-id') === _this_specialism.england_id) _this_specialism.is_county= true; 
    else and_not_england= true;  
    i++; 
  });
  i= 0; 
  this.widget_body.find('.specialism_level_two.is_county input:checked').each(function(){
    counties[i]= $(this).attr('data-id'); 
    i++; 
  });
  */
  this.loadSpecLvl3(load_column3_html, spec_lvl_2);
  
  function load_column3_html(html)
  {            
    if (typeof(html) == 'undefined') html= '';
    
    spec_lvl_3= new Array(); 
    i= 0;
    _this_specialism.widget_body.find('.specialism_level_three input:checked').each(function(){
      spec_lvl_3[i]= $(this).attr('data-id'); 
      i++; 
    });   
    
    if (_this_specialism.widget_body.find('.specialism_level_three input[type="checkbox"]').length) _this_specialism.selected_spec_lvl_3= spec_lvl_3; 
    
    _this_specialism.widget_body.find('.specialism_level_three').html(html);
    
    for(i= 0; i< _this_specialism.selected_spec_lvl_3.length; i++)
    {
      _this_specialism.widget_body.find('.specialism_level_three input[data-id="' + _this_specialism.selected_spec_lvl_3[i] + '"]').attr('checked', 'checked'); 
    }
    
    _this_specialism.updateScrollBox();
    _this_specialism.widget_body.find('.specialism_level_three').show(); 
    _this_specialism.checkSaveButton();
    _this_specialism.checkSaveButtonNow();
    _this_specialism.updateCustoms(); 
  }
}

buildSpecialisms.prototype.updateScrollBox= function() 
{
  /*this.widget_body.find('.specialism_column_build').each(function(){
    if (!$(this).find('.mCustomScrollBox').length)
    {
      $(this).mCustomScrollbar({
        advanced:{
          updateOnContentResize: true
        }
      })
    }
  }); */
}

//*********загружаем специальности второго уровня
buildSpecialisms.prototype.loadSpecLvl2= function(callback, spec_lvl_1) 
{
    $.ajax({
      type: 'POST',
      url: baseUrl + 'build_profile/get_spec_lvl2',
      data: { spec_lvl_1: spec_lvl_1 },  
      success : function( data, status, xhr ) 
      { 
        if (typeof(callback) !== 'undefined') callback(data.html);
      }
    }, "json");  
}

//*********загружаем специальности третьего уровня
buildSpecialisms.prototype.loadSpecLvl3= function(callback, spec_lvl_2){
    $.ajax({
      type: 'POST',
      url: baseUrl + 'build_profile/get_spec_lvl3',
      data: { spec_lvl_2: spec_lvl_2 },  
      success : function( data, status, xhr ) 
      { 
        if (typeof(callback) !== 'undefined') callback(data.html);
      }
    }, "json");  
}

//********сохраняем выбранные специальности
buildSpecialisms.prototype.saveLAS= function(){
  spec_lvl= new Array();
  spec_lvl[1]= $('.specialism_level_one .specialism_block .item_row.end_row.selected_specialism').attr('data-id');
  spec_lvl[2]= new Array();
  spec_lvl[3]= new Array();
  i= 0;
  $('.specialism_level_two .specialism_block .item_row input:checked').each(function(){
    spec_lvl[2][i]= $(this).attr('data-id');  
    i++;
  });
  i= 0;
  $('.specialism_level_three .specialism_block .item_row.end_row input:checked').each(function(){
    spec_lvl[3][i]= $(this).attr('data-id');  
    i++;
  });
  $.ajax({
      type: 'POST',
      url: baseUrl + 'build_profile/save_served_specialisms',
      data: {spec_lvl: spec_lvl},
      success : function( data, status, xhr ) 
      { 

      }
    }, "json");   
};