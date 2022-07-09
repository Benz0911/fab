$(document).ready(function(){buildLA= new buildLocalAreas($('.localarea_select_widget'));});

function buildLocalAreas(widget_body) 
{
  _this_local_areas_build= this;
  this.widget_body= widget_body; 
  this.england_id= $('.england_id').val();
  this.save_button= $('.localarea_save');
  this.is_county= false;  //если выбирают Англию, то нужно отображать каунти и переменная будет true
  this.selected_counties= new Array();
  this.selected_districts= new Array()
  
  this.init();
}

buildLocalAreas.prototype.init= function()
{
  _this_local_areas_build= this;
  this.widget_body.find('.localarea_level_one input[type="checkbox"]').change(function(){
/*  this.widget_body.find('.localarea_level_one').mouseup(function(event, ui){*/
    _this_local_areas_build.changeLevel2item();  
  });  
  /*$('.localarea_column').each(function(){
    if (!$(this).find('.mCustomScrollBox').length)
    {
      $(this).mCustomScrollbar({
        advanced:{
          updateOnContentResize: true
        }
      })
    }
  }); */
  if (_this_local_areas_build.widget_body.find('.end_block input:checked').length)
  {
    _this_local_areas_build.save_button.removeAttr("disabled");
    _this_local_areas_build.save_button.unbind('click'); 
    _this_local_areas_build.save_button.click(function(){
      _this_local_areas_build.saveLAS();    
    }); 
  }
  if (_this_local_areas_build.widget_body.find('.localarea_level_one input[data-id="2"]:checked').length)
  {
    $('.localarea_level_two').addClass('is_county');  
  }
  this.initUpdateLevel3();
}

buildLocalAreas.prototype.updateCustoms= function(){
  _this_local_areas_build= this;
  
  Custom.init(); 

  $('.scroll-pane').each(function(){
    if ($.trim($(this).html()) !== "") $(this).jScrollPane();
  });
}

//*****загружаем данные во второй столбец после выбора нужных стран
buildLocalAreas.prototype.changeLevel2item= function()
{
  _this_local_areas_build= this;
  countries= new Array();
  i= 0;
  this.is_county= false;
  and_not_england= false;   
  this.widget_body.find('.localarea_level_one input:checked').each(function(){
    countries[i]= $(this).attr('data-id'); 
    if ($(this).attr('data-id') === _this_local_areas_build.england_id) _this_local_areas_build.is_county= true;   
    else and_not_england= true; 
    i++; 
  });
  
  if (!countries.length)
  {
    load_column2_html('');  
    this.widget_body.find('.localarea_level_two').removeClass('is_county')
  }
  else
  {
    //если выбрана Англия во вторую колонку грузим каунти
    if (this.is_county)
    { 
      if (!this.widget_body.find('.localarea_level_two').hasClass('is_county')) this.loadCounties(load_column2_html);
      else this.changeLevel3item();  
    }
    else // если не выбрана каунти грузим во вторую колонку сразу дистрикты
    {
      this.loadDistricts(load_column2_html, countries); 
    }
  }
  
  function load_column2_html(html)
  {
    if (typeof(html) == 'undefined') html= '';
    selected_counties= new Array();
    selected_districts= new Array();
    i= 0;
    _this_local_areas_build.widget_body.find('.localarea_level_two.is_county input:checked').each(function(){
      selected_counties[i]= $(this).attr('data-id');     
      i++;
    });  

    if (!_this_local_areas_build.widget_body.find('.localarea_level_two.is_county').length)
    {
      i= 0;  
      _this_local_areas_build.widget_body.find('.localarea_level_two input:checked').each(function(){
        selected_districts[i]= $(this).attr('data-id');     
        i++;
      });  
    }
	
	if(!_this_local_areas_build.is_county)
	{
		i= 0;  
      _this_local_areas_build.widget_body.find('.localarea_level_three input:checked').each(function(){
        selected_districts[i]= $(this).attr('data-id');    
        i++;
      });
	}
    if (_this_local_areas_build.widget_body.find('.localarea_level_two.is_county').length) _this_local_areas_build.selected_counties= selected_counties;
    else if(_this_local_areas_build.widget_body.find('.localarea_level_two input').length) _this_local_areas_build.selected_districts= selected_districts;
  
	if(!_this_local_areas_build.is_county)	_this_local_areas_build.selected_districts= selected_districts; 
    
    if (_this_local_areas_build.is_county) _this_local_areas_build.widget_body.find('.localarea_level_two').addClass('is_county'); 
    else _this_local_areas_build.widget_body.find('.localarea_level_two').removeClass('is_county'); 
       
    _this_local_areas_build.widget_body.find('.localarea_level_two').html(html);
    
    if (_this_local_areas_build.widget_body.find('.localarea_level_two.is_county').length)
    {
      for(i= 0; i< _this_local_areas_build.selected_counties.length; i++)
      {
        _this_local_areas_build.widget_body.find('.localarea_level_two.is_county input[data-id="' + _this_local_areas_build.selected_counties[i] + '"]').attr('checked', 'checked'); 
      }
    }
    else
    {
      for(i= 0; i< _this_local_areas_build.selected_districts.length; i++)
      {
        _this_local_areas_build.widget_body.find('.localarea_level_two input[data-id="' + _this_local_areas_build.selected_districts[i] + '"]').attr('checked', 'checked'); 
      }
    }
    _this_local_areas_build.updateScrollBox();
    _this_local_areas_build.widget_body.find('.localarea_level_two').show(); 
    _this_local_areas_build.initUpdateLevel3();
    _this_local_areas_build.changeLevel3item(); 
    _this_local_areas_build.checkSaveButtonNow(); 
    
    _this_local_areas_build.updateCustoms();
  }
  this.initUpdateLevel3();
}

buildLocalAreas.prototype.checkSaveButton= function() 
{  
  _this_local_areas_build= this;  
  this.widget_body.find('.localarea_block input[type="checkbox"]').unbind('change.checkSave'); 
  this.widget_body.find('.localarea_block input[type="checkbox"]').bind('change.checkSave', function(){
    _this_local_areas_build.checkSaveButtonNow();      
  });
}

buildLocalAreas.prototype.checkSaveButtonNow= function() 
{ 
  _this_local_areas_build= this; 
  is_end= true;
  _this_local_areas_build.widget_body.find('.end_block').each(function(){
    if (!$(this).find('input:checked').length) is_end= false;
  });
  if (!_this_local_areas_build.widget_body.find('.end_block').length) is_end= false;
  if (is_end)
  {
    _this_local_areas_build.save_button.removeAttr("disabled");
    _this_local_areas_build.save_button.unbind('click'); 
    _this_local_areas_build.save_button.click(function(){
      _this_local_areas_build.saveLAS();    
    }); 
  }
  else _this_local_areas_build.save_button.attr("disabled", "disabled");  
}

buildLocalAreas.prototype.initUpdateLevel3= function() 
{
  this.widget_body.find('.localarea_level_two.is_county input[type="checkbox"]').each(function(){
    $(this).unbind('change');
    $(this).change(function(){
      _this_local_areas_build.changeLevel3item();   
    }) 
  });   
}

//*****загружаем данные в третий столбец после выбора нужных стран
buildLocalAreas.prototype.changeLevel3item= function()
{
  _this_local_areas_build= this;
  countries= new Array();
  counties= new Array();
  i= 0;
  this.is_county= false;
  and_not_england= false;
  this.widget_body.find('.localarea_level_one input:checked').each(function(){
    countries[i]= $(this).attr('data-id'); 
    if ($(this).attr('data-id') === _this_local_areas_build.england_id) _this_local_areas_build.is_county= true; 
    else and_not_england= true;  
    i++; 
  });
  i= 0; 
  this.widget_body.find('.localarea_level_two.is_county input:checked').each(function(){
    counties[i]= $(this).attr('data-id'); 
    i++; 
  });
  
  if ((and_not_england && this.is_county) || counties.length) this.loadDistricts(load_column3_html, countries, counties);
  else load_column3_html('');//_this_local_areas_build.widget_body.find('.localarea_level_three').html(''); 
  
  function load_column3_html(html)
  {
    if (typeof(html) == 'undefined') html= '';
    selected_districts= new Array();
    i= 0;
    _this_local_areas_build.widget_body.find('.localarea_level_three input:checked').each(function(){
      selected_districts[i]= $(this).attr('data-id');  
      i++;
    });
    if (_this_local_areas_build.widget_body.find('.localarea_level_three input[type="checkbox"]').length) _this_local_areas_build.selected_districts= selected_districts;
       
    _this_local_areas_build.widget_body.find('.localarea_level_three').html(html);
    
    for(i= 0; i< _this_local_areas_build.selected_districts.length; i++)
    {
      _this_local_areas_build.widget_body.find('.localarea_level_three input[data-id="' + _this_local_areas_build.selected_districts[i] + '"]').attr('checked', 'checked'); 
    }
    _this_local_areas_build.updateScrollBox();
    _this_local_areas_build.widget_body.find('.localarea_level_three').show(); 
    _this_local_areas_build.checkSaveButton();
    _this_local_areas_build.checkSaveButtonNow(); 
    
    _this_local_areas_build.updateCustoms(); 
  }
}

buildLocalAreas.prototype.updateScrollBox= function() 
{
  this.widget_body.find('.localarea_column').each(function(){
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

//*********загружаем County
buildLocalAreas.prototype.loadCounties= function(callback) 
{
    $.ajax({
      type: 'POST',
      url: baseUrl + 'build_profile/get_england_counties',
      success : function( data, status, xhr ) 
      { 
        if (typeof(callback) !== 'undefined') callback(data.html);
      }
    }, "json");  
} 

//*********загружаем Districts
buildLocalAreas.prototype.loadDistricts= function(callback, countries, counties) 
{
    if($('#sell_all_dis_check').is(":checked")) $('#sell_all_dis_check').attr('checked', false);  
    $('#sell_all_dis_check').unbind('change');
    $('#sell_all_dis_check').bind('change', function()
    {
      if ($(this).is(":checked")) 
      {
        $(this).parents('.block-title').next().find('.localarea_block.end_block  input[type="checkbox"]').attr('checked', true);
        $('.localarea_select_widget input.localarea_save').removeAttr("disabled", "disabled");
        _this_local_areas_build.checkSaveButton();
        _this_local_areas_build.checkSaveButtonNow(); 
      } 
      else 
      {
        $('.localarea_select_widget input.localarea_save').attr('disabled','disabled');
        $(this).parents('.block-title').next().find('.localarea_block.end_block input[type="checkbox"]').attr('checked', false);
        _this_local_areas_build.checkSaveButton();
        _this_local_areas_build.checkSaveButtonNow(); 
      } 
    }); 
    
    if (typeof(counties) === 'undefined') counties= false;
    $.ajax({
      type: 'POST',
      url: baseUrl + 'build_profile/get_districts',
      data: { countries: countries, counties: counties },  
      success : function( data, status, xhr ) 
      { 
        if (typeof(callback) !== 'undefined') callback(data.html);
      }
    }, "json");  
}

//********сохраняем выбранные районы
buildLocalAreas.prototype.saveLAS= function()
{
  districts= new Array();
  i= 0;
  $('.localarea_block.end_block input:checked').each(function(){
    districts[i]= $(this).attr('data-id');  
    i++;
  });
  $.ajax({
      type: 'POST',
      url: baseUrl + 'build_profile/save_served_districts',
      data: {districts: districts},
      success : function( data, status, xhr ) 
      { 

      }
    }, "json");   
}