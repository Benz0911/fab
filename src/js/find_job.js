$(document).ready(function(){
  
  if($('#fab_find_job_specialist').hasClass('specialist_widget') || $('#fab_find_job_specialist').hasClass('spec'))
        addressAutocomplete();    //вызывать только для PaJ

  $('.find-a-builder-results.find-a-builder-page .memberpages li:not(act) a').each(function()
  {
       $(this).live('click', function(){
           var fb_form = $('.fb_form');
           fb_form.attr('action', $(this).attr('href'));
           fb_form.submit();

           return false;
       });
  });
  if ($('.specialist_widget_id').length &&
        !$('.specialist_widget_id').val() && 
        $('.specialist_widget_id').val() !== $('.specialist_widget_id').attr('placeholder') &&
        $('.specialist_widget_id').val().length > 2)
  {
    $('.specialist_widget_id').autocomplete("search");    
  }
  
  var addr_list;
   
  
  var link_address= $('.lnk_pick_addr');
  var link_address_id= $('#lnk_pick_addr');
  
  if (link_address.length)
  { 
    BLA= new browseLocalAreaNew(link_address);//browseLocalArea(link_address); 
    localAreaAutocomplete(); 
  }
  else if(link_address_id.length)
  {
	BLA= new browseLocalAreaNew(link_address_id);
    localAreaAutocomplete();   
  }
  
  var link_specialist= $(".lnk_pick_spec");  
  if (link_specialist.length)
  {
    BSpec= new browseSpecialistNew(link_specialist);  
  }    
  $('button.enter_query_paj').live('click', function(){
    if ($('#fab_find_job_enter_query').length) $('#fab_find_job_enter_query').val('paj');
  });
  $('button.enter_query_faj').live('click', function(){
    if ($('#fab_find_job_enter_query').length) $('#fab_find_job_enter_query').val('faj');
  });
  
    $(".cl67 a").live('click', function()
    {
       $(this).parents('form:first').submit();
    });

    $('#slide-layer div.findabilder h1').live('click', function(){
        var uri = window.location.pathname;
        var location_href = '/find-a-builder';
        var url_dev = '/frontend_dev.php';

        if(uri == url_dev){
            location_href = url_dev + location_href;
        }
        window.location.href = location_href;
    });

    function getRandomBlock(objs, i){

        var count = objs.length;

        if(count > 4) count = 4;
        var index = Math.floor(Math.random() * count);
        var obj = objs.eq(index);

        if(obj.data('is_viewed') == 1){

            i++;
            if(i>10){
                return false;
            }
            return getRandomBlock(objs, i);
        }

        return obj;
    }

    function boxBlink(){
        var obj = $('div.find-a-builder-results div.col1, div.find-a-builder-results div.col2');

        obj = getRandomBlock(obj, 0);

        if(obj){
            obj.find('.display_profile_notes').fadeIn();
            obj.find('img').css('box-shadow',  '0 0 8px 1px #003679');
			obj.css('box-shadow',  '0 0 8px 1px #003679');
            obj.data('is_viewed', 1);

            setTimeout(function(){
                obj.find('img').removeAttr('style');
				obj.removeAttr('style');
                obj.find('.display_profile_notes').fadeOut();
            }, 300);
        }else{
            clearInterval(boxBlinkId);
        }

    }

    var boxBlinkId = setInterval(boxBlink, 300);

    $('div.find-a-builder-results div.col1, div.find-a-builder-results div.col2').hover(boxOver,boxOut);

    function boxOver(){
        $(this).find('.display_profile_notes').fadeIn();
        $(this).find('img').css('box-shadow',  '0 0 8px 1px #003679');
		$(this).css('box-shadow',  '0 0 8px 1px #003679');
    }

    function boxOut(){
        $(this).find('img').removeAttr('style');
		$(this).removeAttr('style');
        $(this).find('.display_profile_notes').fadeOut();
    }
	
	if($('#google_events_fab').length > 0) {
       var str = $('#google_events_fab').val();

       if(str)
    	   gtag('event', 'fab-'+str, {'event_category':'find-a-builder', 'event_label':str});	   
	   //удалим класс во избежания повторной отправки события в случае ошибок
	   $('#google_events_fab').remove();

   }

});
var local_area_all= [];
var local_area_all_name= [];

function browseSearch(arr, str, exactly)
{
  result= [];
  var my_reg= new RegExp( "^" + str + ".*$", "i");  
  if (typeof(exactly) != 'undefined' && exactly) my_reg= new RegExp( "^" + str + "$", "i");

  for (var key in arr)
  {
    a= typeof(arr[key]) != 'undefined';
    b= typeof(arr[key]['val']) != 'undefined';
    c= my_reg.test(arr[key]['val']);
    d= $.trim(arr[key]['val']);
    if (a && b && c && d)
    result.push(arr[key]);      
  }   
  
  return result;
} 

function browseLocalArea(link_address) {
  _this= this;
  this.extra_name= true;
  this.lnk_address= link_address; 
  this.max_select_view= 1000;
  link_address.live('click', function(){
    _this.click_pick()
  });
  this.la_all_ids= new Array(); 
  this.la_all_name= new Array();
  this.items= new Array(); 
  this.localarea_body= $('.localarea_widget');
  this.localarea_id= $('.localarea_widget_id');
  
  this.initAddress();
  this.init(); 
}; 

browseLocalArea.prototype.initAddress= function()
{
  this.postcode= '';
  this.postcode_body= $('.localarea_widget_postcode'); 
  this.postcode_body.change(function(){
    _this.changePostcode(postcode_body.val()) 
  });
}

browseLocalArea.prototype.init= function()
{ 
  if (!local_area_all.length)
  {
    _this= this;
    $.ajax({
      type: 'GET',
      url: baseUrl + 'findJob/getLocalAreaAll',
      dataType: 'json',
      success : function( data, status, xhr ) {
                _this.la_all_ids= data.la_items_ids;  
                _this.la_all_name= data.la_items_district;   
                local_area_all= data.la_items_ids;
                local_area_all_name= data.la_items_district;  
                if ($('.localarea_widget_id').val() === '-1')
                {
                  //sadf= in_auto;
                  input= $('.localarea_widget');
                  input.autocomplete("search");  
                }       
        }
    }, "json");   
  } 
  else 
  {
    _this.la_all_ids= local_area_all;  
    _this.la_all_name= local_area_all_name;   
  } 
  
  _this.items=  _this.la_all_ids;
  _this.items_district=  _this.la_all_name;
  _this.items_sel= [];
}

browseLocalArea.prototype.click_pick= function()
{                                     
  _this= this;
  
  this.lnk_address.colorbox({opacity: 0.7, onComplete: function(){_this.initAddressArray(_this);_this.initSelect(_this)}}); 
}

browseLocalArea.prototype.initAddressArray= function(_this) 
{
  _this.la_all_ids= local_area_all;  
  _this.la_all_name= local_area_all_name;   
  _this.items=  _this.la_all_ids;  
}

browseLocalArea.prototype.changePostcode= function(postcode)
{
  this.postcode= postcode;    
}

browseLocalArea.prototype.initSelect= function()
{
  _this= this;
  this.items_sel= browseSearch(this.items, '');
  this.updateSelect(true);
  var select_str= $('.select_string');
  if (select_str.length) select_str.keyup(function(){
    _this.keyupSelectStr(select_str.val())
  });  
  $('#btn_select_address').live('click', function(){
    selected_text= $('.select_variant  option[value=\'' + $('.select_variant').val() + '\']').text();
    index= selected_text.indexOf('>');
    if (index>= 0) selected_text= selected_text.substr(index+2);
    _this.localarea_body.val(selected_text);
    _this.localarea_id.val($('.select_variant').val());
    $.colorbox.close();
  })
  $('.select_string').focus();
}

browseLocalArea.prototype.keyupSelectStr= function(str)
{
  this.items_sel= browseSearch(this.items, str);  
  this.updateSelect(this);  
}

browseLocalArea.prototype.updateSelect= function(resize)
{
  var html= "";
  i= 0;
  for (var key in this.items_sel)
  {
    html+= "<option value=\"" + this.items_sel[key]['id'] + "\">" + this.la_all_name[this.items_sel[key]['id']]['val'] + '> ' + this.items_sel[key]['val']  + "</option>";   
    i++;
    if (i>= _this.max_select_view) 
    {
      html += "<option value=\"-1\">...</option>"; 
      break;  
    }
  } 
   
  $('.select_variant').html(html);  
}  

function browseSpecialist(lnk_specialist) 
{
  __this= this;
  this.extra_name= false;
  this.lnk_specialist= lnk_specialist; 
  this.max_select_view= 1000;
  this.blocked= false;  
  lnk_specialist.live('click', function(){
    __this.click_pick()
  });
  this.la_all_ids= new Array(); 
  this.la_all_name= new Array();
  this.items= new Array(); 
  this.localarea_body= $('#fab_find_job_specialist');
  this.localarea_id= $('#fab_find_job_specialist_id'); 
  this.num_level= 1;     
  this.table_num= $('#fab_find_job_table_level');
}

browseSpecialist.prototype.click_pick= function()
{          
  __this= this;
  this.lnk_specialist.colorbox({opacity: 0.7, onComplete: function(){__this.num_level= 1; __this.init()}});
}    

browseSpecialist.prototype.ajaxOn= function(isOn) 
{
  if (isOn && !$('.select_variant').hasClass("browseAjaxLoad"))
  {   
    this.blocked= true;  
    $('.select_variant').html('');
    $('.select_string').val('');
    $('.select_variant').addClass("browseAjaxLoad");     
    $.colorbox.resize({innerHeight: $("#fab_addresspick_addrlist").outerHeight()});   
  }else if(!isOn)
  {
    this.blocked= false;  
    $('.select_variant').removeClass("browseAjaxLoad");
    $.colorbox.resize({innerHeight: $("#fab_addresspick_addrlist").outerHeight()});  
  }  
}

browseSpecialist.prototype.init= function(parent_id)
{  
  __this= this;
  __this.ajaxOn(true);
  if (typeof(parent_id) != 'undefined') request= {num_level: __this.num_level, parent_level_id: parent_id};
  else request= {num_level: __this.num_level}  
  $.ajax({
    type: 'POST',
    url: baseUrl + 'findJob/getSpecialists',
    data: request,  
    dataType: 'json',
    success : function( data, status, xhr ) { 
      __this.la_all_ids= data.la_items_ids;  
      __this.la_is_childs= data.la_items_parent;
      __this.items=  data.la_items_ids; 
      __this.items_sel= [];
      __this.initSelect();
      __this.ajaxOn(false);    
    }
  }, "json"); 
}

browseSpecialist.prototype.initSelect= function()
{
  __this= this;
  this.items_sel= browseSearch(this.items, '');
  this.updateSelect(true);
  var select_str= $('.select_string');
  if (select_str.length) select_str.keyup(function(){
    __this.keyupSelectStr(select_str.val())
  });  
  $('#btn_select_address').live('click', function(){
    selected_text= $('.select_variant  option[value=\'' + $('.select_variant').val() + '\']').text();
    index= selected_text.indexOf('+');
    if (index>= 0) selected_text= selected_text.substr(index+1);
    __this.localarea_body.val($.trim(selected_text));
    __this.localarea_id.val($('.select_variant').val());
    __this.table_num.val(__this.num_level);
    $.colorbox.close();
  })
  $('.select_string').focus();
}

browseSpecialist.prototype.keyupSelectStr= function(str)
{           
  this.items_sel= browseSearch(this.items, str);  
  this.updateSelect(this);  
}

browseSpecialist.prototype.updateSelect= function(resize)
{
  __this= this;
  var html= "";
  i= 0;
  for (var key in __this.items_sel)
  {
    id= this.items_sel[key]['id'];
    val= this.items_sel[key]['val'];
   
    if (__this.la_is_childs[id])  html += "<option class=\"specialist_next_level\" value=\"" + id + "\">+" + val + "</option>";
    else  html += "<option value=\"" + id + "\">&nbsp;&nbsp;&nbsp;" + val + "</option>";  
    i++;
    if (i>= this.max_select_view) 
    {
      html += "<option value=\"-1\">...</option>"; 
      break;  
    }
  } 
  $('.select_variant').html(html); 
  $('.select_variant').dblclick(function(e){   
    if (!__this.blocked)
    {
      option= $(this).find('option[value="'+$(".select_variant option:selected").val()+'"]');
      if (option.hasClass('specialist_next_level')) __this.selectSubLevel(option.val(), option.text());    
    }
  });
}

browseSpecialist.prototype.selectSubLevel= function(parent_id, text)
{
  this.ajaxOn(true);
  $('.specialist_level_'+ this.num_level).hide(); 
  this.num_level++; 
  $('.specialist_level_'+ this.num_level).show(); 
  this.init(parent_id);  
  //this.updateSelect(this); 
  this.updatePath(parent_id, text);
}

browseSpecialist.prototype.selectPathLevel= function(level_num, parent_id)
{
  $('.specialist_level_'+ this.num_level).hide(); 
  this.num_level= level_num;
  $('.specialist_level_'+ this.num_level).show();  
  if (typeof(parent_id) != 'undefined')  this.init(parent_id);
  else this.init();  
  //this.updateSelect(this); 
  this.updatePath(); 
}

browseSpecialist.prototype.updatePath= function(parent_id, text)
{  
  __this= this;
  this.path_body= $('.level_path');  
  if (typeof(parent_id) != 'undefined') 
  {
    this.path_body.find('a:eq(' + (this.num_level-2) + ')').removeClass('currentAct');  
    html= this.path_body.html();  
    html+= ' <a href="javascript:void(0);" data-level-num="' + this.num_level + '" data-id="' + parent_id + '" class="currentAct"> >' + text.substr(1) + '</a>';
    this.path_body.html($.trim(html));  
    this.path_body.find('a').each(function(){
      $(this).live('click', function(){   
        if (!$(this).hasClass('currentAct'))
        {   
          data_id= $(this).attr('data-id');
          sel_level= $(this).attr('data-level-num');
          if (data_id) __this.selectPathLevel(sel_level, data_id); 
          else __this.selectPathLevel($(this).attr('data-level-num'));  
          $(this).addClass('currentAct');
          for (ii= (sel_level-1); ii< 4; ii++)
          {
            sss= __this.path_body.find('a:eq('+ sel_level +')');
            sss.remove();   
          } 
        }  
      });
    });
  }
  
  $.colorbox.resize({innerHeight: $("#fab_addresspick_addrlist").outerHeight()});    
}

//**************browseSpecialistNew**********************
function browseSpecialistNew(lnk_specialist) 
{
  __this= this;
  this.extra_name= false;
  this.lnk_specialist= lnk_specialist; 
  this.max_select_view= 1000;
  this.blocked= false;  
  lnk_specialist.live('click', function(){
    __this.click_pick()
  });
  this.la_all_ids= new Array(); 
  this.la_all_name= new Array();
  this.items= new Array(); 
  this.localarea_body= $('.specialist_widget');
  this.localarea_id= $('.specialist_widget_id'); 
  this.num_level= 1;     
  this.num_level_last= 6; 
  this.residential= true;
  this.table_num= $('.table_level_widget');
}

browseSpecialistNew.prototype.click_pick= function()
{          
  __this= this;
  this.lnk_specialist.colorbox({opacity: 0.7, onComplete: function(){__this.preInit()}});
}    

browseSpecialistNew.prototype.preInit= function()  
{
  this.num_level= 1; 
  this.init(); 
}

browseSpecialistNew.prototype.ajaxOn= function(isOn) 
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

browseSpecialistNew.prototype.init= function(parent_id)
{  
  __this= this;
  __this.ajaxOn(true);
  if (typeof(parent_id) != 'undefined') request= {num_level: __this.num_level, parent_level_id: parent_id, residential: this.residential};
  else request= {num_level: __this.num_level, residential: this.residential}  
  $.ajax({
    type: 'POST',
    url: baseUrl + 'findJob/getSpecialists',
    data: request,  
    dataType: 'json',
    success : function( data, status, xhr ) { 
      __this.la_all_ids= data.la_items_ids;  
      __this.la_is_childs= data.la_items_parent;
      __this.items=  data.la_items_ids;
      __this.items_sel= [];
      //__this.initSelect();
        __this.updateSelect();
      __this.ajaxOn(false);   
    }
  }, "json"); 
  $('#btn_select_address').unbind('click');
  $('#btn_select_address').live('click', function(){
    __this.selectSpecialism();  
  });

}

browseSpecialistNew.prototype.updateSelect= function(resize)
{
  __this= this;
  var html= "";
  i= 0;
  __this.items_sel= __this.items;
  for (var key in __this.items_sel)
  {
    id= this.items_sel[key]['id'];
    val= this.items_sel[key]['val'];
   
    if (__this.la_is_childs[id])  html += "<li class=\"specialist_one specialist_next_level\" data-id=\"" + id + "\"><a href=\"javascript:void(0)\">" + val + "</a></li>";
    else  html += "<li class=\"specialist_one specialist_not_next_level\" data-id=\"" + id + "\"><a href=\"javascript:void(0)\">" + val + "</a></li>";  
    i++;
    if (i>= this.max_select_view) 
    {
      html += "<li data-id=\"-1\">...</li>"; 
      break;  
    }
  } 
  $('.specialism_level_' + __this.num_level).html(html);
  $('.faj_current_selected').unbind('click');
  $('.faj_current_selected').live('click', function(){
    if ($(this).hasClass('faj_current_selected')) __this.selectSpecialism(); 
  });
  $('.specialist_not_next_level').unbind('click');
  $('.specialist_not_next_level').live('click', function(){
    if ($(this).hasClass('faj_current_selected')) __this.selectSpecialism(); 
  });
  $('.specialist_one').live('click', function(e){   
    if (!__this.blocked)
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
      if ($(this).hasClass('specialist_next_level')) __this.selectSubLevel(num_level, $(this).attr('data-id'), $(this).text());
      else   
      {
        enumerator = parseInt(num_level);   
        while(enumerator < 3)
        {
           $('.specialism_level_' + (enumerator + 1)).html('');  
           enumerator = enumerator + 1;
        }   
      }   
      __this.updateButton();   
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

browseSpecialistNew.prototype.updateButton= function() 
{
  if ($('.faj_specialism_col .faj_current_selected').length) $('#btn_select_address').removeClass('b-button_innactive'); 
  else $('#btn_select_address').addClass('b-button_innactive');   
}

browseSpecialistNew.prototype.selectSubLevel= function(num_lvl, parent_id, text)
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
  
browseSpecialistNew.prototype.selectSpecialism= function()
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
}

//**************browseLocalAreaNew**********************
function browseLocalAreaNew(link_address) 
{
  $this= this;
  this.extra_name= false;
  this.lnk_address= link_address; 
  this.is_county= false;
  this.max_select_view= 1000;
  this.blocked= false;  
  link_address.live('click', function(){
    $this.click_pick()
  });
  this.la_all_ids= new Array(); 
  this.la_all_name= new Array();
  this.items= new Array(); 
  this.items_district= new Array();
  this.localarea_body= $('.localarea_widget');
  this.localarea_id= $('.localarea_widget_id'); 
  //this.form_localarea_id= $('input[name="fab_find_job[localarea_id]"]');  
  this.num_level= 1;     
  this.real_num_level= 1;
  this.num_level_last= 4; 
  this.is_last_level= false;
  
  this.initAddress();
}

browseLocalAreaNew.prototype.click_pick= function()
{          
  $this= this;
  this.colorbox_ie= this.lnk_address.colorbox({opacity: 0.7, onComplete: function(){$this.preInit()}});
}    

browseLocalAreaNew.prototype.initAddress= function()
{
  $this= this;
  this.postcode= '';
  this.postcode_body= $('.localarea_widget_postcode'); 
  this.postcode_body.change(function(){
    $this.postcode= $('.localarea_widget_postcode').val(); 
  });
}

browseLocalAreaNew.prototype.initAddressArray= function($this) 
{
  $this.la_all_ids= local_area_all;  
  $this.la_all_name= local_area_all_name;   
  $this.items=  $this.la_all_ids;  
  $this.items_district=  $this.la_all_name; 
}

browseLocalAreaNew.prototype.preInit= function()  
{
  this.num_level= 1; 
  this.real_num_level= 1;
  this.county_id= $('.level_one_county_id').val();
  this.init(); 
}

browseLocalAreaNew.prototype.ajaxOn= function(isOn) 
{
  if (isOn && !$('.faj_address_col.address_level_' + this.num_level).hasClass("browseAjaxLoad"))
  {   
    this.blocked= true;  
    //$('.select_variant').html('');
    //$('.select_string').val('');
    $('.faj_address_col.address_level_' + this.num_level).addClass("browseAjaxLoad");     
    if (typeof colorbox === 'function' ) $.colorbox.resize({innerHeight: $("#div_pick_address_outter").outerHeight()}); 
    else this.colorbox_ie.resize({innerHeight: $("#div_pick_address_outter").outerHeight()});   
  }else if(!isOn)
  {
    this.blocked= false;  
    $('.faj_address_col.address_level_' + this.num_level).removeClass("browseAjaxLoad");
    if (typeof colorbox === 'function' ) $.colorbox.resize({innerHeight: $("#div_pick_address_outter").outerHeight()});
    else this.colorbox_ie.resize({innerHeight: $("#div_pick_address_outter").outerHeight()});    
  }  
}

browseLocalAreaNew.prototype.init= function(parent_id)
{  
  $this= this;
  $this.ajaxOn(true);
  if (typeof(parent_id) != 'undefined') request= {num_level: $this.real_num_level, parent_level_id: parent_id};
  else request= {num_level: $this.real_num_level}  
  $.ajax({
    type: 'POST',
    url: baseUrl + 'findJob/getAddresses',
    data: request,  
    dataType: 'json',
    success : function( data, status, xhr ) { 
      $this.la_all_ids= data.la_items_ids;  
      $this.la_is_childs= data.la_items_parent;
      $this.items=  data.la_items_ids;
      $this.items_sel= [];
      //$this.initSelect();
        $this.updateSelect();
      $this.ajaxOn(false);   
    }
  }, "json"); 
  $('#btn_select_address').live('click', function(){
    $('#btn_select_address').unbind('click');
    $this.selectAddress();  
  });

}

browseLocalAreaNew.prototype.updateSelect= function(resize)
{
  $this= this;
  var html= "";
  i= 0;
  $this.items_sel= $this.items;
  for (var key in $this.items_sel)
  {
    id= this.items_sel[key]['id'];
    val= this.items_sel[key]['val'];
   
    if ($this.la_is_childs[id])  html += "<li class=\"address_one address_next_level\" data-id=\"" + id + "\"><a href=\"javascript:void(0)\">" + val + "</a></li>";
    else  html += "<li class=\"address_one address_not_next_level\" data-id=\"" + id + "\"><a href=\"javascript:void(0)\">" + val + "</a></li>";  
    i++;
    if (i>= this.max_select_view) 
    {
      html += "<li data-id=\"-1\">...</li>"; 
      break;  
    }
  } 
  $('.address_level_' + $this.num_level).html(html);
  $('.faj_current_selected').unbind('click');
  $('.faj_current_selected').live('click', function(){
    if ($(this).hasClass('faj_current_selected')) $this.selectAddress(); 
  });
  $('.address_not_next_level').unbind('click');
  $('.address_not_next_level').live('click', function(){
    if ($(this).hasClass('faj_current_selected')) $this.selectAddress(); 
  });
  $('.address_one').live('click', function(e){   
    if (!$this.blocked)
    {
      //option= $(this).find('option[value="'+$(".select_variant option:selected").val()+'"]');
      //if (option.hasClass('specialist_next_level')) 
      //if ()
      parent_div= $(this).parents('.faj_address_col');
      num_level= parent_div.attr('data-level-num');
      if (num_level == '1')
      {
        if ($(this).attr('data-id') == $this.county_id) $this.is_county= true;
        else $this.is_county= false;
      }
      //if ($('.faj_parent_selected').length)
      //{
        num_level_int= parseInt(num_level); 
        //if (num_level_before < parseInt(num_level)) 
        num_level_to_end= num_level_int;
        if (!$this.is_county) num_level_to_end++; 
        if (num_level_to_end === $this.num_level_last)
        {
          //$('.faj_current_selected').addClass('faj_parent_selected'); 
          $('.faj_current_selected').removeClass('faj_current_selected');
          $(this).addClass('faj_current_selected'); 
        }
        else
        {
          $('.faj_address_col[data-level-num="' + num_level_int + '"]').find('.faj_parent_selected').removeClass('faj_parent_selected');
          $(this).addClass('faj_parent_selected');   
        }
        //if (parent_div.find('.faj_parent_selected').length) parent_div.find('.faj_parent_selected').removeClass('faj_parent_selected');
      //}
      //$(this).addClass('faj_current_selected');
      if ($(this).hasClass('address_next_level')) $this.selectSubLevel(num_level, $(this).attr('data-id'), $(this).text()); 
      $this.updateButton();   
    }
  });
  $('.faj_address_col').each(function(){
   //  if (typeof jScrollPane === 'function' )
   //   {
          $('.scroll-pane').jScrollPane(); 
    //  }
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

browseLocalAreaNew.prototype.updateButton= function() 
{
  if ($('.faj_address_col .faj_current_selected').length) $('#btn_select_address').removeClass('b-button_innactive'); 
  else $('#btn_select_address').addClass('b-button_innactive');   
}

browseLocalAreaNew.prototype.selectSubLevel= function(num_lvl, parent_id, text)
{
  //this.ajaxOn(true);
  //$('.specialist_level_'+ this.num_level).hide(); 
  this.num_level= parseInt(num_lvl) + 1;
  this.real_num_level= this.num_level;
  if (!$this.is_county) this.real_num_level++;
  if (this.real_num_level === this.num_level_last) this.is_last_level= true;
  else this.is_last_level= false;
  //$('.specialist_level_'+ this.num_level).show(); 
  for(i= this.num_level; i<= this.num_level_last; i++)
  {
    $('.address_level_' + i).html('');   
  }
  this.init(parent_id);  
  //this.updateSelect(this); 
  //this.updatePath(parent_id, text);
}
  
browseLocalAreaNew.prototype.selectAddress= function()
{
  if ($('.faj_current_selected').length)
  {
    selected_text= $('.faj_current_selected').text();
    index= selected_text.indexOf('>');
    if (index>= 0) selected_text= selected_text.substr(0, index-1);
    this.localarea_body.val($.trim(selected_text));
    this.localarea_body.blur();
    this.localarea_id.val($('.faj_current_selected').attr('data-id'));
    if(this.form_localarea_id) this.form_localarea_id.val($('.faj_current_selected').attr('data-id')); 
    //this.table_num.val($('.faj_current_selected').parents('.faj_address_col').attr('data-level-num'));
    if (typeof colorbox === 'function' ) $.colorbox.close();  
    else $('#cboxClose').click();
  }
}

browseLocalAreaNew.prototype.browseSearchDstrs= function(str, exactly)
{
  result= [];
  result_ids= [];
  var my_reg= new RegExp( "^" + str + ".*$", "i");  
  if (typeof(exactly) != 'undefined' && exactly) my_reg= new RegExp( "^" + str + "$", "i");

  for (var key in this.items_district)
  {
    a= typeof(this.items_district[key]) != 'undefined';
    b= typeof(this.items_district[key]['val']) != 'undefined';
    c= my_reg.test(this.items_district[key]['val']);
    d= $.trim(this.items_district[key]['val']);
    e= result_ids.indexOf(this.items_district[key]['id']) == -1;
    if (a && b && c && d && e)
    {
        result_ids.push(this.items_district[key]['id']);
        result.push(this.items_district[key]);      
    }
  }   
  
  this.data_search_district= result;    
}

  if (!local_area_all.length) initLocalAreaAllFirst();
  function initLocalAreaAllFirst()
  {
    if (!local_area_all.length)
    {
      _this= this;
      $.ajax({
        type: 'GET',
        url: baseUrl + 'findJob/getLocalAreaAll',
        dataType: 'json',
        success : function( data, status, xhr ) { 
                  local_area_all= data.la_items_ids;
                  local_area_all_name= data.la_items_district;  
                  if ($('.localarea_widget_id').val() === '-1' && (!$('.localarea_widget_district_id').val() || $('.localarea_widget_district_id').val() === '-1'))
                  {
                    //sadf= in_auto;
                    input= $('.localarea_widget');
                    input.autocomplete("search");  
                  }       
          }
      }, "json");   
    }
  }

 function addressAutocomplete () {      
    var input = $('.specialist_widget');         
    input.autocomplete({
        minLength: 3,
        source: function(request, response) {
			  var form_name = this.element.parents('.fb_form')[0].name;
              $('input[name="'+form_name+'[specialist_id]"]').val('');  
              $('input[name="'+form_name+'[table_level]"]').val('');  
              //$('input[name="fab_find_job[specialist_id]"]').val('');  
              //$('input[name="fab_find_job[table_level]"]').val('');  
              request.value = input.val();                 
              $.ajax({
              'url': baseUrl + 'find_job/getSpecialism/',
              'dataType': 'json',
              'data': request,
              'success': response,
              'showLoader' : false
            }).done(function(json_data) {
              response(putValueToField (json_data));
			  $('ul[role="listbox"]').css('width', $('.fb-form_block').width()+'px');
            });              
        },
        select: function(event, ui) 
        {
              var form_name = this.form.name;
			  value=ui.item.value;
              //value = value.replace(/\s+$/, "");  
              value= value.replace(/^.*?>\s/, ""); 
			  $('input[name="'+form_name+'[specialist_id]"]').val(ui.item.id);  
              $('input[name="'+form_name+'[table_level]"]').val(ui.item.table);
			  $('input[name="'+form_name+'[specialist]"]').val(value);
              //$('input[name="fab_find_job[specialist]"]').val(value);
              //$('input[name="fab_find_job[specialist_id]"]').val(ui.item.id);  
              //$('input[name="fab_find_job[table_level]"]').val(ui.item.table);  
              return false;                
        }     
    });

    var putValueToField = function(value) 
    {
      var data = [];
      $.each(value, function(i, val) 
        {   
          /*if(val.table_num == '2')  val.name='-' + val.name;
          if(val.table_num == '3')  val.name='--' + val.name; 
          if(val.table_num == '4')  val.name='---' + val.name;     */
          data.push({value: val.name, id: val.specialist_id, table: val.table_num}); 
        });
      return data;       
    }
}
 
 
 function localAreaAutocomplete() { 
    var input = $('.localarea_widget');
   /* input.change(function(){   NU: 25/09/2014 - таким образом исправлена ситуация в Chrome and IE 
      $('.localarea_widget_id').val(0);
      $('.localarea_widget_district_id').val(0);  
      if ($.trim($(this).val()).length> 2)
      {
        BLA.initAddressArray(BLA); 
        data_search= browseSearch(BLA.items, $.trim($(this).val()));  
        BLA.browseSearchDstrs($.trim($(this).val()));
        data_search_district= BLA.data_search_district; 
        if (data_search_district.length === 1)
        {
            finded= data_search_district.pop();
            w1= finded.val.toLowerCase();
            w2= $.trim($(this).val()).toLowerCase();
            if (finded.val.toLowerCase() === $.trim($(this).val()).toLowerCase())
            $('.localarea_widget_district_id').val(finded.id);
        }else
        {
          if (data_search.length === 1)
          {
            finded= data_search.pop();
            w1= finded.val.toLowerCase();
            w2= $.trim($(this).val()).toLowerCase();
            if (finded.val.toLowerCase() === $.trim($(this).val()).toLowerCase())
            $('.localarea_widget_id').val(finded.id);  
          }else
          {
            if (data_search.length > 1)
            {
              $('.localarea_widget_id').val(-1);  
            }
            if (data_search_district.length > 1)
            {
              $('.localarea_widget_district_id').val(-1);  
            }
          }
        }
      }  
    });  */
    input.autocomplete({
        minLength: 3,
        source: function(request, response) {
			  var form_name = this.element.parents('.fb_form')[0].name;
			  delete selected_text;	//удалить текст выбранный ранее
              $('input[name="'+form_name+'[localarea_id]"]').val('');  
              $('input[name="'+form_name+'[district_id]"]').val(''); 		  
              request.value = this.element.val(); 
              BLA.initAddressArray(BLA);
              BLA.form_localarea_id= $('input[name="'+form_name+'[localarea_id]"]');			  
              //data_search= browseSearch(BLA.items, request.value, $('.localarea_widget_id').val() === '-1');
              data_search= browseSearch(BLA.items, request.value);
              BLA.browseSearchDstrs(request.value);
              data_search_district= BLA.data_search_district;
              response(putValueToField(data_search, data_search_district)); 
			  $('ul[role="listbox"]').css('width', $('.fb-form_block').width()+'px');
              //if($('input[name="fab_find_job[localarea_id]"]').length) $('input[name="fab_find_job[localarea_id]"]').val('');
              /*$.ajax({
              'url': baseUrl + '/find_job/getSpecialism/',
              'dataType': 'json',
              'data': request,
              'success': response,
              'showLoader' : false
            }).done(function(json_data) {
              response(putValueToField (json_data));
            }); */             
        },
        select: function(event, ui) 
        {
              var form_name = $(this).parents('.fb_form')[0].name;
			  selected_text=ui.item.value;
              patt= /^.*?>\s/;
              if (patt.test(selected_text))
              {
                selected_text = selected_text.replace(patt, "");
                $('input[name="'+form_name+'[localarea]"]').val(selected_text);	//заменила, так как на форме могут располагаться несколько инпеутов с одинаковыми классами			
                //input.val(selected_text);
                //$('.localarea_widget_id').val(ui.item.id);			
                if($('input[name="'+form_name+'[localarea_id]"]').length) $('input[name="'+form_name+'[localarea_id]"]').val(ui.item.id);
              }                 
              else
              {
                $('input[name="'+form_name+'[localarea]"]').val(selected_text);	//заменила, так как на форме могут располагаться несколько инпеутов с
				//input.val(selected_text);
				if($('input[name="'+form_name+'[district_id]"]').length) $('input[name="'+form_name+'[district_id]"]').val(ui.item.id);
                //$('.localarea_widget_district_id').val(ui.item.id); 
              }
               
              return false;                
        },
        change: function( event, ui ) 
		{
			var form_name = $(this).parents('.fb_form')[0].name;
			if(typeof(selected_text) == 'undefined') //если текст был введен вручную и не выбран из выпадающего списка, или из колорбокса (даже если выбран стрелочками (но без нажатия мыши или клавиши ENTER ))
			{
			    //$('.localarea_widget_id').val(0);
                //$('.localarea_widget_district_id').val(0);  
				$('input[name="'+form_name+'[localarea_id]"]').val(0);  
                $('input[name="'+form_name+'[district_id]"]').val(0);
                if ($.trim($(this).val()).length> 2) //количество символов должно превышать 3
                {   
                   value = $(this).val(); 
				   patt= /^.*?>\s/;
                   if (patt.test(value))//если выбрана локалареа, уберем дистрикт
                   {
                     value = value.replace(patt, "");  
                   }                 
				   $(this).val(value);
				   BLA.initAddressArray(BLA); 
                   data_search= browseSearch(BLA.items, $.trim($(this).val()));  
                   BLA.browseSearchDstrs($.trim($(this).val()));
                   data_search_district= BLA.data_search_district; 
                   if (data_search_district.length === 1)
                   {
                       finded= data_search_district.pop();
                       w1= finded.val.toLowerCase();
                       w2= $.trim($(this).val()).toLowerCase();
                       if (finded.val.toLowerCase() === $.trim($(this).val()).toLowerCase())
                       //$('.localarea_widget_district_id').val(finded.id);
				       $('input[name="'+form_name+'[district_id]"]').val(finded.id);
                   }else
                   {
                     if (data_search.length === 1)
                     {
                       finded= data_search.pop();
                       w1= finded.val.toLowerCase();
                       w2= $.trim($(this).val()).toLowerCase();
                       if (finded.val.toLowerCase() === $.trim($(this).val()).toLowerCase())
                       //$('.localarea_widget_id').val(finded.id);
                       $('input[name="'+form_name+'[localarea_id]"]').val(finded.id); 				   
                     }else
                     {
                       if (data_search.length > 1  && $('.localarea_id').val() === 0)
                       {
                         //$('.localarea_widget_id').val(-1);  
						 $('input[name="'+form_name+'[localarea_id]"]').val(-1); 				   
                       }
                       if (data_search_district.length > 1 && $('.localarea_district_id').val() === 0)
                       {
                         //$('.localarea_widget_district_id').val(-1);  
						 $('input[name="'+form_name+'[district_id]"]').val(-1);
                       }
                     }
                   }
				}   
            }	
		}	
    });

    var putValueToField = function(value, value_district) 
    {
      var data = [];
      if (typeof(value_district) !== 'undefined')
      {
        arr_dstr= [];
        $.each(value_district, function(i, val) 
        {   
          if (typeof(arr_dstr[val.id]) === 'undefined')
          {
            data.push({value: val.val, id: val.id}); 
            arr_dstr[val.id]= true; 
          }
        });
      }
      $.each(value, function(i, val) 
      {   
        name= BLA.la_all_name[val.id].val + ' > ' + val.val; 
        data.push({value: name, id: val.id}); 
      });
      
      return data;       
    } 
}




   