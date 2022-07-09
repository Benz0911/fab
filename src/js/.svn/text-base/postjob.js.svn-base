$(document).ready(function(){
  addressAutocomplete();
  BPT= new browseProjectType($('.project_type_browse'));
    $('#java_private_0').live('click', function(e){
      JobPrivateTrigger(true);
    });
    $('#java_private_1').live('click', function(e){
      JobPrivateTrigger(false);
    });

    $('#fab_find_job_is_ohe').change(function(){
        var obj = $(this);
        var val = obj.prop("checked");
        if(val){
            $('div.cl59').after( "<div id='warning_ohe'>Only companies providing out of hours services will be notified</div>" );
            $('#warning_ohe').show("slow");
        }else{
            $('#warning_ohe').hide("slow");
        }
    });

    $('#paj_chkbox_send_phone').change(function(){
        var obj = $(this);
        var val = obj.prop("checked");
        if(val){
            $('.block_phone_paj').show("slow");
        }else{
            $('.block_phone_paj').hide("slow");
        }
    });

    

    $('#private_job_email_address').change(function(){
        var obj =  $(this);
        var value = obj.val().replace(/\s+/g, '');

                $.ajax({
                    type: 'POST',
                    url: baseUrl + 'paj/get_person_id',
                    data: {email: value},
                    dataType: 'json',
                    beforeSend: function (){
                        $('#ajax_indicator_placeholder').show();
                    },
                    success : function( data ) {

                        $('div.email_validation').remove();
						obj.parent().removeClass('error');

                        if(data.status == 1){
							$('.person_widget_id').val(data.person_id); 
                            $('.block_register').hide("slow");							
							$('button').removeAttr('disabled');
							//$('#p-a-j-6').hide("slow");
                        }
						else if(data.status == 0){
                            if(data.error){
								obj.parent().addClass('error');
                                obj.after('<div class="email_validation fb-form_error">' + data.error + '</div>');
                            }
                        }
						else {
						    $('.person_widget_id').removeAttr('value'); 
						    $('.block_register').show("slow");
							$('button').removeAttr('disabled');
						}
                    }
                }, "json");
        
    });

   if($('#google_events_paj').length > 0) {
       var str = $('#google_events_paj').val();
       
       if(str)
	   {
		   var parseJS = $.parseJSON(str);
    	   gtag('event', 'job_posted', {
    		   'event_category':'conversion', 
    		   'event_label':(parseJS.j == undefined)?'(not set)':parseJS.j,
    		   'specialism':(parseJS.s == undefined)?'(not set)':parseJS.s,
    		   'county':(parseJS.c == undefined)?'(not set)':parseJS.c,
    		   'district':(parseJS.d == undefined)?'(not set)':parseJS.d,
    		   'local_area':(parseJS.l == undefined)?'(not set)':parseJS.l
    	   });	   
	   }
	   //удалим класс во избежания повторной отправки события в случае ошибок
	   $('#google_events_paj').remove();

   }
   
    //сажаем datepicker на поле, только если установлен params (сажается в виджете)
    if($('#private_job_to_be_completed').length > 0 && typeof(params) != 'undefined')
	{
		$("#private_job_to_be_completed").datepicker(params);
        $("#private_job_to_be_completed").addClass('fb-form_control');
        $("#private_job_to_be_completed").attr("autocomplete", "off");		
	}
	
});

/*
var delay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
*/

function JobPrivateTrigger(is_on)
{    
  if(!is_on)
  {                
    $(".tbody_private").removeClass("none");  
    $(".tbody_other").addClass("none"); 
  }
  else
  {  
    $(".tbody_other").removeClass("none");  
    $(".tbody_private").addClass("none");  
  }
}

function browseSearch(arr, str)
{
  result= [];
  var my_reg= new RegExp( "^" + str + ".*$", "i")

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

function browseProjectType(lnk_specialist) 
{
  ___this= this;
  this.extra_name= false;
  this.lnk_specialist= lnk_specialist; 
  this.max_select_view= 100;
  lnk_specialist.live('click', function(){
    ___this.click_pick()
  });
  this.la_all_ids= new Array(); 
  this.la_all_name= new Array();
  this.items= new Array(); 
  this.localarea_body= $('#other_job_project_type');
  this.localarea_id= $('#other_job_project_type_id'); 
  this.num_level= 1;     
  this.table_num= $('#other_job_project_type_level');
}

browseProjectType.prototype.click_pick= function()
{          
  ___this= this;
  this.lnk_specialist.colorbox({opacity: 0.7, onComplete: function(){___this.num_level= 1; ___this.init()}});
}    

browseProjectType.prototype.ajaxOn= function(isOn) 
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

browseProjectType.prototype.init= function(parent_id)
{  
  //в Project уровень специальности должен быть ниже первого
  if (___this.num_level== 1) $('#btn_select_address').addClass('none'); 
  else $('#btn_select_address').removeClass('none');
  ___this= this;
  ___this.ajaxOn(true);
  if (typeof(parent_id) != 'undefined') request= {num_level: ___this.num_level, parent_level_id: parent_id};
  else request= {num_level: ___this.num_level}; 
  jQuery.support.cors = true; 
  $.ajax({
    type: 'POST',
    url: baseUrl + 'postJob/getProjectType',
    data: request,  
    dataType: 'json',
    success : function( data, status, xhr ) {
      ___this.la_all_ids= data.pt_items_ids;  
      ___this.la_is_childs= data.pt_items_parent;
      ___this.items=  data.pt_items_ids;
      ___this.items_sel= [];
      ___this.initSelect();
      ___this.ajaxOn(false);   
    }
  }, "json");   
}

browseProjectType.prototype.initSelect= function()
{
  ___this= this;
  this.items_sel= browseSearch(this.items, '');
  this.updateSelect(true);
  var select_str= $('.select_string');
  if (select_str.length) select_str.keyup(function(){
    ___this.keyupSelectStr(select_str.val())
  });  
  $('#btn_select_address').live('click', function(){
    selected_text= $('.select_variant  option[value=\'' + $('.select_variant').val() + '\']').text();
    index= selected_text.indexOf('+');
    if (index>= 0) selected_text= selected_text.substr(index+1);
    ___this.localarea_body.val($.trim(selected_text));
    ___this.localarea_id.val($('.select_variant').val());
    ___this.table_num.val(___this.num_level);
    $.colorbox.close();
  })
  $('.select_string').focus();
}

browseProjectType.prototype.keyupSelectStr= function(str)
{
  this.items_sel= browseSearch(this.items, str);  
  this.updateSelect(this);  
}

browseProjectType.prototype.updateSelect= function(resize)
{
  ___this= this;
  var html= "";
  i= 0;
  for (var key in ___this.items_sel)
  {
    id= this.items_sel[key]['id'];
    val= this.items_sel[key]['val'];
   
    if (___this.la_is_childs[id])  html += "<option class=\"specialist_next_level\" value=\"" + id + "\">+" + val + "</option>";
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
    if (!___this.blocked)
    {
      option= $(this).find('option[value="'+$(".select_variant option:selected").val()+'"]');
      
      if (option.hasClass('specialist_next_level')) ___this.selectSubLevel(option.val(), option.text());  
    }
  });
  //в Project уровень специальности должен быть ниже первого
  if (___this.num_level== 1) $('#btn_select_address').addClass('none'); 
  else $('#btn_select_address').removeClass('none');
}

browseProjectType.prototype.selectSubLevel= function(parent_id, text)
{
  this.ajaxOn(true);
  $('.specialist_level_'+ this.num_level).hide(); 
  this.num_level++; 
  $('.specialist_level_'+ this.num_level).show(); 
  this.init(parent_id);  
  //this.updateSelect(this); 
  this.updatePath(parent_id, text);
}

browseProjectType.prototype.selectPathLevel= function(level_num, parent_id)
{
  $('.specialist_level_'+ this.num_level).hide(); 
  this.num_level= level_num;
  $('.specialist_level_'+ this.num_level).show();  
  if (typeof(parent_id) != 'undefined')  this.init(parent_id);
  else this.init();  
  //this.updateSelect(this); 
  this.updatePath(); 
}

browseProjectType.prototype.updatePath= function(parent_id, text)
{  
  ___this= this;
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
          if (data_id) ___this.selectPathLevel(sel_level, data_id); 
          else ___this.selectPathLevel($(this).attr('data-level-num'));  
          $(this).addClass('currentAct');
          for (ii= (sel_level-1); ii< 4; ii++)
          {
            sss= ___this.path_body.find('a:eq('+ sel_level +')');
            sss.remove();   
          }   
        }
      });
    });
  }
  
  $.colorbox.resize({innerHeight: $("#fab_addresspick_addrlist").outerHeight()});    
}

 function addressAutocomplete () {      
    autocomplete_input = $('input[name="other_job[project_type]"]');
    autocomplete_input_id = $('input[name="other_job[project_type_id]"]');     
    autocomplete_input_level = $('input[name="other_job[project_type_level]"]');     
    autocomplete_input.autocomplete({
        minLength: 1,
        source: function(request, response) {
              autocomplete_input_id.val('');  
              autocomplete_input_level.val('');  
              request.value = autocomplete_input.val();                 
              $.ajax({
                'url': baseUrl + '/postJob/getProjectTypeAutocomplete/',
                'dataType': 'json',
                'data': request,
                'success': response,
                'showLoader' : false
              }).done(function(json_data) {
                response(putValueToField (json_data));
              });              
        },
        select: function(event, ui) 
        {
              value=ui.item.value;
              value = $.trim(value);  
              autocomplete_input.val(value);
              //alert(ui.item.id + ' ' + ui.item.type_level);
              autocomplete_input_id.val(ui.item.id);  
              autocomplete_input_level.val(ui.item.type_level);  
              return false;                
        }     

    });

    var putValueToField = function(value) 
    {
      var data = [];
      $.each(value, function(i, val) 
        {   
          data.push({value: val.name, id: val.id, type_level: val.type_level}); 
        });
      return data;       
    }
 }