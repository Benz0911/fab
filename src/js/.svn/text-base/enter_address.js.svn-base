$(document).ready(function(){
  var addr_list;
  
  $(".cl_upper").keyup(function(){
                    this.value = this.value.toUpperCase();
                }); 
				
  //$("#lnk_pick_addr").colorbox({opacity: 0.7, onComplete: getQuadByPostcode});
	//$("#lnk_pick_address").colorbox({opacity: 0.7, onComplete: getAddress});
  $('.find_address').live('click', function(){
    clearPlaceholders('#frm_address'); 
    $.post(baseUrl + "enter_address",  $('#frm_address').serialize(), function(html){
      $('.enter_address_tmp').html(html); 
      if (typeof baseInit === 'function') baseInit(); 
      //$("#lnk_pick_addr").colorbox({opacity: 0.7, onComplete: getQuadByPostcode});
  //$("#lnk_pick_address").colorbox({opacity: 0.7, onComplete: getAddress});
    });
    /*validateAddress(afterValidate);
    function afterValidate(data)
    {
      if (typeof(data.error) !== undefined && !data.error)
      {
        $('#frm_address').find('.error_list').hide();
        $('.selected_address').html(data.html);  
      }
      else
      {
        $('#frm_address').submit();  
      }
    } */   
  });
if(!$('.edit_profile_address.in_prospect').length)
{
  $('.btn_select_address').live('click', function(){
      //var edit_member = false;  NU: 2015-09-24
      //if($(this).attr('edit_member')== 1) edit_member = true; ; 
      
    if (!$('input[name="select_address"]:checked').length) $('.select_address_noselect').show();
    else 
    {
      $('.select_address_noselect').hide();
      $('input[name="selected_adr"]').val($('input[name="select_address"]:checked').val());  
      if($('.registerst1').find('.edit_profile_address').length == 0) //Если это не страница редактирования данных пользователя
      {
            $('input[name="edit_profile"]').val('false');
            $('#frm_address').submit();
      }    
      else
      {   
          $('input[name="edit_profile"]').val('true');
          form = $('#frm_address');
        $.ajax({
           type: "POST",
           url: baseUrl + "/address/new",
           data: form.serialize(), // serializes the form's elements.
           success: function(data)
           {
                //Если в data сидит html - data представлен в виде строки
                if(typeof data === 'string')
                {
                    if($('.address_row:last').length)
                    {
                        address_new= $('.address_row:last').clone(true); 
                        $('.address_row:last').after(address_new);
                        $('.address_row:last').html(data);
                    }   
                    else
                    {
                        $('.edit_profile > .text > .cl169 :first').after('<div class="address_row">' + data + '</div>');
                    }
                }
                
                
                if (typeof newPhoneInit === 'function') newPhoneInit();   
                $.ajax({
                  url: baseUrl + "/edit_profile/get_address_form",
                  success: function(data) 
                  {
                        $('.edit_profile_address').html(data);  
                        if (typeof initPlaceholders === 'function') initPlaceholders();
                        if (typeof(Custom) !== 'undefined') Custom.init();
						$("select.b-select_box").selectBox();    
                  }
                  });
                 removeItem();
           },
           error: function(XMLHttpRequest, textStatus, errorThrown)
           {
               //alert('1');
           }
         });   
      }  
    }
  });
  
  $('.enter_address_manually').live('click', function(){
    clearPlaceholders('#frm_address');  
    country_tmp= ''; 
    postcode_tmp= '';                                                                      
    if ($('select[name="fab_address[country]"] option[selected="selected"]').length && $('select[name="fab_address[country]"] option[selected="selected"]').val() !== '0') country_tmp= $('select[name="fab_address[country]"] option[selected="selected"]').text();
    if ($('#fab_address_postcode').length) postcode_tmp= $('#fab_address_postcode').val();       
    $.ajax({
        url: baseUrl + "/address/getAddressManuallyForm",
        success: function(data) 
        {
          $('.selected_address').html(data);  
          $('#fab_address_manually_form_country').val(country_tmp);
          $('#fab_address_manually_form_post_zone_code').val(postcode_tmp);
          if (typeof initPlaceholders === 'function') initPlaceholders();
          if(!$('.enter_address_manually').hasClass('button_error')) $('.enter_address_manually').addClass('hidden');
        }
    });  
  });
  
  
}
else
{
  $('.btn_select_address').live('click', function()
  {
    if (!$('input[name="select_address"]:checked').length) $('.select_address_noselect').show();
    else 
    {
      $('.select_address_noselect').hide();
      var addr_string = $('input[name="select_address"]:checked').val();  
      $('.address_row.in_prospect .current_address').html(addr_string); 
      $('.address_row.in_prospect').show();
      if($('#fab_ddi_info_form_address_as_str').length) $('#fab_ddi_info_form_address_as_str').val(addr_string);
      var addr_array = addr_string.split(", ");
      var len=addr_array.length;

        $('input[name="fab_create_prospect[addr_line1]"]').val(addr_array[0]);
        $('input[name="fab_ddi_info_form[address]"]').val(addr_array[0]); 
        if(len==4)
        {
            $('input[name="fab_create_prospect[addr_line2]"]').val(addr_array[1]); 
            $('input[name="fab_create_prospect[town]"]').val(addr_array[2]); 
            $('input[name="fab_create_prospect[postcode]"]').val(addr_array[3]);   
                      
            $('input[name="fab_ddi_info_form[postcode]"]').val(addr_array[3]);
       
        }
        if(len==3)
        {
            $('input[name="fab_create_prospect[town]"]').val(addr_array[1]); 
            $('input[name="fab_create_prospect[postcode]"]').val(addr_array[2]); 
            
            $('input[name="fab_ddi_info_form[postcode]"]').val(addr_array[2]);    
        }
        $('.address_add-content .edit_profile_address').html(""); 

    }
  });
   $('a.remove_address').live('click', function()
  { 
      $('.address_row.in_prospect .current_address').html("");
      if($('#fab_ddi_info_form_address_as_str').length) $('#fab_ddi_info_form_address_as_str').val('');      
      $('.address_row.in_prospect').hide();
      
       $.ajax({
        type: 'POST',
        url: baseUrl + 'call/show_address_form',
        data: {},  
        success : function( data, status, xhr ) 
        { 
            jQuery('.edit_profile_address.in_prospect').html(data).show();  
			if ($('.b-select_box').length) $("select.b-select_box").selectBox(); 
        }
        },'html');
        $('input[name="fab_create_prospect[addr_line1]"]').val(''); 
        $('input[name="fab_create_prospect[addr_line2]"]').val(''); 
        $('input[name="fab_create_prospect[town]"]').val(''); 
        $('input[name="fab_create_prospect[postcode]"]').val(''); 
        
        $('input[name="fab_ddi_info_form[postcode]"]').val('');  
        $('input[name="fab_create_prospect[addr_line1]"]').val(''); 
        
  });
  
  
  $('.enter_address_manually').live('click', function()
  {
        $('.address_add-content .edit_profile_address').html(""); 
        $('input[name="fab_create_prospect[addr_line1]"]').show(); 
        $('input[name="fab_create_prospect[addr_line2]"]').show();  
        $('input[name="fab_create_prospect[town]"]').show(); 
        $('input[name="fab_create_prospect[postcode]"]').show(); 
        
        $('.address_block').show();  
  });
  
}   

  $('.enter_address_manually_form').live('submit', function(){
      var edit_member = false;
      if($(this).find('input[type="submit"]').attr('edit_member')== 1) edit_member = true; ;  
    $.ajax({
      url: baseUrl + "/address/getAddressManuallyForm",
      data: $(this).serialize(),
      type: 'post',
      success: function(data) 
      {
        $('.selected_address').html(data);
        if (typeof initPlaceholders === 'function') initPlaceholders();
       
            if ($('.address_manually_value_str').val())
            {
              $('input[name="selected_adr"]').val($('.address_manually_value_str').val());
              
              if($('.registerst1').find('.edit_profile_address').length > 0) //Проверка на страницу редактирования профайла
               {
                       $('input[name="edit_profile"]').val('true');
                       $('#frm_address').ajaxForm(function(data) 
                        { 
                              /*/register/full_registration/phone_address  */
                            if($('.address_row:last').length) 
                            {
                                address_new= $('.address_row:last').clone(true);
                                $('.address_row:last').after(address_new);
                            }
                            else
                            {
                                address_new = '<div class="address_row"></div>';
                                $('.higher_add_address .cl169:first').after(address_new); 
                            }   
                             $('.address_row:last').html(data);
                             $('.address_row:last').show();
                          //   $('.address_row:last').html(data);
                             if (typeof newPhoneInit === 'function') newPhoneInit();   
                           //  if (typeof initPlaceholders === 'function') initPlaceholders();
                           //  if (typeof(Custom) !== 'undefined') Custom.init(); 
                                                        
                              $.ajax({
                                url: baseUrl + "/edit_profile/get_address_form",
                                success: function(data) 
                                {
                                      $('.edit_profile_address').html(data);  
                                      if (typeof initPlaceholders === 'function') initPlaceholders();
                                      if (typeof(Custom) !== 'undefined') Custom.init();
									  if ($('.b-select_box').length) $("select.b-select_box").selectBox(); 
                                }
                                });  
                              removeItem();
                           /* 
                            $.ajax({
                            url: baseUrl + "/register/full_registration/phone_address ",
                            success: function(data) 
                            {
                                  $('.call_content_wrap').html(data);  
                                  if (typeof initPlaceholders === 'function') initPlaceholders();
                                  if (typeof(Custom) !== 'undefined') Custom.init();
                            }
                            });  
                                 */

                                                                       
                        });
               }
               else 
               {
                   $('input[name="edit_profile"]').val('false');
               }
               
                    $('#frm_address').submit();
              
            }
       
      }
    });
    
    return false;      
  });
  

  $('.edit_address_button').live('click', function()
  {
    //сделать кнопку update не активной
    $('.edit_address_button').attr('disabled','disabled');    
    clearPlaceholders('.full_registration_add_phones');
    validateContactAll(AddPhones);
    
    function AddPhones()
    {
        $('.full_registration_add_phones').each(function()
        {     
            form= $(this);

                   $.ajax({
               type: "POST",
               url: baseUrl + "register/full_registration/phone_address",
               data: form.serialize(), // serializes the form's elements.
               success: function(data)
               {
                    window.location= baseUrl + "edit_profile/addresses_phones"     
               }
             });
              

          });
    }
   
 
  }); 
//  return false; 
  
  if ($('.b-select_box').length) $("select.b-select_box").selectBox(); 
});

//********ѕри прохождении валидации формы провер¤ем посткод и выдаем результаты и quadr'a
validateAddress = function(callback)
{
  /*$.post(baseUrl + 'address/validateAddressForm', $('#frm_address').serialize(), function(data){
    if (typeof(callback) !== 'undefined' && callback)
      {
        callback(data);
      }   
  }); */
  postcode_val= $.trim($('#fab_address_postcode').val());
  building_val= $.trim($('#fab_address_building').val());
  if (!building_val) building_val= $.trim($('#fab_address_house_number').val());
  
  //дл¤ начала очищаем все предыдущие результаты
  parent_div= $('.selected_address');
  parent_div.hide(); 
  table_trs= parent_div.find('tbody tr');
  if (table_trs.length> 3)
  {
    for (i= 3; i< table_trs.length; i++)
    {
      $(table_trs[i]).remove();  
    }
  } 
  parent_div.addClass("browseAjaxLoad");   
  var jq1 = 
    $.ajax({
        url: baseUrl + "/operations/address/get",
        data: { postcode: postcode_val, building: building_val},
        success: function(data) 
        {
          parent_div.removeClass("browseAjaxLoad"); 
          json_parse= $.parseJSON(data);
          //≈сли есть какие-либо ошибки при запросе, отображаем их алертом
          if (typeof(json_parse.err_msg) !== 'undefined' && $.trim(json_parse.err_msg))
          {
            alert(json_parse.err_msg); 
          }
          else
          {
            //при успешном получении списка адресов парсим его
            parent_div.show(); 
            addr_list= parseAddress(json_parse); 

            //далее работа с html в соответсвии с полученным списком адресов 
            parent_div.show();
            tr_ex= parent_div.find('.select_address_example');
            //при нулевом списке адресов выводим сообщение об их отсутсвие
            if (addr_list.length< 1)
            {
              $('.select_address_noresult').show();   
            }
            //иначе добавл¤ем результаты
            else
            {
              $('.select_address_noresult').hide();
              for(key in addr_list)
              {
                tr_new= tr_ex.clone(true); 
                tr_ex.parent().find('tr:last').after(tr_new);
                tr_new.removeClass('select_address_example');
                cb_new= tr_new.find('input');
                cb_new.attr('value', addr_list[key]['text']);
                cb_new.attr('value', addr_list[key]['text']);
                tr_new.find('.select_address_string').text(addr_list[key]['text']);
                tr_new.show();
              }
            }
          }
        },
        error: function(evntObj){ 
          parent_div.removeClass("browseAjaxLoad");
          //matches= evntObj.responseText.match(/object\(Exception\).*?message.*?string\(\d+\).*?\"(.*?)\"/);
          if (typeof(json_parse.err_msg) !== 'undefined') alert(json_parse.err_msg);
          else alert('Some error occured');
        }
        }, "json");
    
  /*getQuadByPostcode(callbackQuad);
  function callbackQuad(json_data)
  {  
    addr_list= parseAddress($.parseJSON(json_data));
  }
  callbackQuadError= function()
  {  

  } */
}

getAddress = function()
{
  $("#btn_select_address").click(selectManualAddress);
}

selectManualAddress = function()
{
  var postzonecode_val = $("#select_post_zone_code").val();

	$.post( "/address/search",
        { postzonecode: postzonecode_val},
	      function(data){ selectManualAddress_callback(data); }
  );
}

function selectManualAddress_callback(data)
{ 
  var selected_addr_1 = $("#select_string_1").val()
  var selected_addr_2 = $("#select_string_2").val();
  var town            = $("#select_town").val();
  var json_parsed     = $.parseJSON(data);
  var flag            = json_parsed["flag"];
  var err_msg         = json_parsed["err_msg"];

  if (flag)
  { 
    if (selected_addr_1.length < 1 && selected_addr_2.length < 1)
	  {  
	     alert("Fill in the fields: address line 1 or address line 2");
	     return;
	  }
	  if (selected_addr_1)
	  {
	     selected_addr = selected_addr_1;
	     if (selected_addr_2)
			 selected_addr = selected_addr + "," + selected_addr_2;
	  }
	  else
	  {
	     selected_addr = selected_addr_2;
	  }
	  if (town)
		selected_addr = selected_addr + "," + town;
	  selected_addr = selected_addr + "," + flag;
	
	  alert("selected address:\n"+selected_addr);
    $('input[name="selected_adr"]').val(selected_addr);
    $('input[name="selected_adr"]').parents('tr').show();
	  $('#fab_address_postcode').val(flag);
    $.colorbox.close();
  }
  else
  {
    alert("Error:\n"+err_msg);
  } 
}

getQuadByPostcode = function(callback, callback_error)
{
    $("#div_pick_addr").hide();
    $("#btn_select_address").click(selectAddress);
    //console.log("onComplete event started");
    var postcode_val = $("#postcode_pick").val();
    var building_val = $("#building_pick").val();
    //console.log("Sending Ajax query with postcode "+postcode_val)
    //console.log("Sending Ajax query with building "+building_val)
    var getQuadByPostCode_error;
    var jq1 = 
            $.post(
                "/operations/address/get",
                { postcode: postcode_val, building: building_val},
                function(json_data) { if (typeof(callback) && callback) callback(); else getQuadByPostcode_callback(json_data); }
            )
            .error(function(evntObj){ if (typeof(callback_error) && callback_error) callback_error(); else getQuadByPostCode_error});
        ;
    //console.log("Ajax query to Quad sent");
}

function getQuadByPostcode_callback(json_data)
{
    $("#p_pick_addr_message").hide();
    $("#div_pick_addr").show();
    
    var json_parsed = $.parseJSON(json_data);
   // console.log("json data: ");
   // console.log(json_data);
    //console.log(json_parsed.length);
    
    addr_list= parseAddress(json_parsed);
    var html = "";
    for (var key in addr_list)
    { 
      html += "<option value=\"" + key + "\">" + addr_list[key].text + "</option>"; 
    }
    if (addr_list.length<1)
    {
      if (json_parsed.err_msg != undefined && json_parsed.err_msg.length>0)
          html = "<option value=\"-1\">"+json_parsed.err_msg+"</option>";
      else
          html = "<option value=\"-1\">No address matching your criteria found. Please try again or enter address manually</option>";
    }
    
    $("#fab_addresspick_addrlist").html(html);
    $.colorbox.resize({innerWidth: $("#fab_addresspick_addrlist").outerWidth()});
}

parseAddress= function(json_parsed)
{
  addr_list = Array();
  for (var key in json_parsed.addr_list)
  {   
    if  (json_parsed.addr_list.length > 1)
    {
        addr_list[key] = {};
        addr_list[key].lines = json_parsed.addr_list[key].lines;
        addr_list[key].text = "";
        
        for (var key2 in addr_list[key].lines)
        {
            //console.log("    another line: ");
            //console.log(addr_list[key].lines[key2]);
            
            addr_list[key].text += addr_list[key].lines[key2];
            
        }
    }
    else
    {  
        key = 1; //так как по идее запись одна
        addr_list[key] = {};
        addr_list[key].lines = json_parsed.addr_list.lines.item;
        addr_list[key].text = json_parsed.addr_list.lines.item;     
    }
  }

  return addr_list;
}

selectAddress = function()
{
    var selected_addr_key = $("#fab_addresspick_addrlist").val();
    
    if (selected_addr_key==undefined || selected_addr_key=='')
        return;
        
    var selected_addr = addr_list[selected_addr_key];
    
    if (selected_addr==undefined || selected_addr.lines==undefined)
        return;
  
    alert("selected address:\n"+selected_addr.text);
    $('input[name="selected_adr"]').val(selected_addr.text);
    $('input[name="selected_adr"]').parents('tr').show();
    $.colorbox.close();
    //$('#frm_pick_addr').submit();   
}

getQuadByPostcode_error = function(evntObj)
{
    //console.log("Error returned from Ajax query"); console.log(evntObj);
    $("#p_pick_addr_message").hide();
    $("#div_pick_addr").show();
}

function removeItem()
{
$('.remove_item').unbind('click.remove_item');
$('.remove_item').bind('click.remove_item', function(){
  div_item= $(this).parents('div.item_row:first');
  $.ajax({
    type: 'POST',
    url: baseUrl + '/sfGuardRegister/fullRegistrationRemoveItem',
    data: { 'type': div_item.attr('data-type'), 'id': div_item.attr('data-id') },  
    success : function( data, status, xhr ) 
    { 
      //div_item.hide(); 
      div_item.remove();  
      if (typeof initPlaceholders === 'function') initPlaceholders();  
    }
  });
}); 
}