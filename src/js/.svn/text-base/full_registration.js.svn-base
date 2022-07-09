function newPhoneInit(){
    if ($('.new_phone_button').length)
    {
      $('form.full_registration_add_phones').submit(function(){
        form= $(this);
        validateContactAll(ifvalid);
        function ifvalid()
        {
          form.unbind('submit');
          form.submit();
          
          return true; 
        }

        return false;
      });
      $('.new_phone_button').off('click'); //если было задано ранее событие, удалим его
      $('.new_phone_button').on('click', function(){
        //validateContact('phone', addNewphone);
        addNewphone(this);
        function addNewphone(obj)
        {
          tr_phone= $(obj).parent().find('.new_phone.last');
          tr_phone_type= $(obj).parent().find('.new_phone_type.last');
          div_parent= tr_phone.parent();
          tr_phone_remove= div_parent.find('.remove_phone_button:first');
          if(!div_parent.hasClass('hidden'))
          {
              new_div_parent= div_parent.clone(false);
              new_div_parent.find('.error_list').remove();
              new_div_parent.find('a.selectBox').remove();
              div_parent.after(new_div_parent);
              tr_phone.removeClass('last');
              tr_phone_type.removeClass('last');
              tr_phone_remove.show();
          }
          else div_parent.removeClass('hidden')
          //tr_phone.hide();
          
          new_index= parseInt(tr_phone.attr('data-index')) + 1;
          new_name= 'phones[new][' + new_index + ']';
          new_name_type= 'phone_types[new][' + new_index + ']';  
          tr_phone= $(obj).parent().find('.new_phone.last');
          tr_phone_type= $(obj).parent().find('.new_phone_type.last');  
          //tr_phone.after(tr_phone_remove.clone(true));
         // tr_phone_remove.show();
          tr_phone.attr('name', new_name);
          tr_phone.attr('data-index', new_index);
          tr_phone_type.attr('name', new_name_type);
          tr_phone_type.attr('data-index', new_index);
          tr_phone.val('');
          //tr_phone.before('<br />');
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          tr_phone.focus(); 
          //if (typeof(Custom) !== 'undefined') Custom.init(); 
          
          tr_phone_type_last = $(obj).parent().find('.new_phone_type.last:first');
          tr_phone_type_last.selectBox(); 
          removePhone();
          
          removeItem();
        }
      }); 
      function removePhone(){
        $('.remove_phone_button').unbind('click.remove');
        $('.remove_phone_button').bind('click.remove', function(){
            if($(this).parent().find('.new_phone').length > 1) $(this).parent().remove();
            else $(this).parent().addClass('hidden');
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
        }); 
      }
      removePhone();
    }
}

function validateContactAll(callback)
{
    
  contacts_email= new Array();
  contacts_ids= new Array();
  contacts_phone= new Array(); 
  contacts_mobile= new Array();
  //contacts_mobile_ids= new Array();
  contacts_web_url= new Array();
  contacts_email_tags= $('.email_edit');
  for (i=0; i< contacts_email_tags.length; i++)
  {
    element= contacts_email_tags[i];
    if (i !== (contacts_email_tags.length - 1) || $(element).val()) 
    {
        contacts_email[i]= $(element).val();
        contacts_ids[i] = $(element).attr('data-id');
    }    
  }
  contacts_email_tags2= $('.new_email');
	
  ii= contacts_email.length;
  for (k= ii; k< contacts_email_tags2.length + ii; k++)
  {
    element= contacts_email_tags2[k - ii];
    contacts_email_tags[k]= element;
    contacts_email[k]= $(element).val(); 
    contacts_ids[k] = $(element).attr('data-id');
  }
  contacts_phone_tags= $('.phone_edit');
  for (i=0; i< contacts_phone_tags.length; i++)
  {
    element= contacts_phone_tags[i];
    if (i !== (contacts_phone_tags.length - 1) || $(element).val()) 
    {
        contacts_phone[i]= $(element).val(); 
        contacts_ids[i] = $(element).attr('data-id'); 
    }   
  }
  contacts_phone_tags2= $('.new_phone');
  ii= contacts_phone.length;
  for (k= ii; k< contacts_phone_tags2.length + ii; k++)
  {
    element= contacts_phone_tags2[k - ii];
    contacts_phone_tags[k]= element;
    contacts_phone[k]= $(element).val(); 
    contacts_ids[k] = $(element).attr('data-id');   
  }                                                
  contacts_mobile_tags= $('.mobile_edit');
  for (i=0; i< contacts_mobile_tags.length; i++)
  {
    element= contacts_mobile_tags[i];
    if (i !== (contacts_mobile_tags.length - 1) || $(element).val()) 
    {
        contacts_mobile[i]= $(element).val();
        contacts_ids[i] = $(element).attr('data-id');
    }    
  }
  contacts_mobile_tags2= $('.new_mobile');
  ii= contacts_mobile.length;
  for (k= ii; k< contacts_mobile_tags2.length + ii; k++)
  {
    element= contacts_mobile_tags2[k - ii];
    contacts_mobile_tags[k]= element;
    contacts_mobile[k]= $(element).val();    
  }
  
  contacts_web_url_tags= $('.web_url_edit');
  for (i=0; i< contacts_web_url_tags.length; i++)
  {
    element= contacts_web_url_tags[i];
    if (i !== (contacts_web_url_tags.length - 1) || $(element).val()) contacts_web_url[i]= $(element).val();  
    contacts_ids[i] = $(element).attr('data-id');  
  }
  contacts_web_url_tags2= $('.new_web_url');
  ii= contacts_web_url.length;
  for (k= ii; k< contacts_web_url_tags2.length + ii; k++)
  {
    element= contacts_web_url_tags2[k - ii];
    contacts_web_url_tags[k]= element;
    contacts_web_url[k]= $(element).val();   
    contacts_ids[k] = $(element).attr('data-id'); 
  }
  
  if (!contacts_phone.length) contacts_phone= contacts_mobile;
  
  $.ajax({
    type: 'POST',
    url: baseUrl + '/register/full_registration/validate_all',
    data: { 'type': 'all', 'contacts_email': contacts_email, 'contacts_ids': contacts_ids,  'contacts_phone': contacts_phone, 'contacts_web_url': contacts_web_url },  
    success : function( data, status, xhr ) 
    { 
      $('.error_contact').remove(); 
      is_error= false;

      if (typeof(data.errors_email) === 'undefined' || data.errors_email.length != 0 || ($('#checkbox_consent').length && !$('#checkbox_consent').is(':checked')))
      {
        
		for (var key in data.errors_email)
        {
          error_str= getValidateContactError(data.errors_email[key]);
          contact_email_tag= contacts_email_tags[key];
          $(contact_email_tag).before(error_str);    
        }  

        is_error= true;
        if ($('form.full_registration_add_email_address input[type = "submit"]').length != 0)
            $('form.full_registration_add_email_address input[type = "submit"]').removeAttr('disabled','disabled');
			
      }
      if (typeof(data.errors_phone) === 'undefined' || data.errors_phone.length != 0) 
      {
        for (var key in data.errors_phone)
        {
          error_str= getValidateContactError(data.errors_phone[key]);
          if (contacts_phone_tags.length || contacts_phone_tags2.length)
          {
            contact_phone_tag= contacts_phone_tags[key];
            $(contact_phone_tag).before(error_str);
          }
          if (contacts_mobile_tags.length || contacts_mobile_tags2.length)
          {
            contact_mobile_tag= contacts_mobile_tags[key];
            $(contact_mobile_tag).before(error_str);
          }
        }
        
        //активировать кнопку нажатия
        if($('.edit_address_button').length != 0 )
            $('.edit_address_button').removeAttr('disabled','disabled');
        
        if ($('form.full_registration_add_mobile_mobile input[type = "submit"]').length != 0)
            $('form.full_registration_add_mobile_mobile input[type = "submit"]').removeAttr('disabled','disabled');
        is_error= true;     
      } 
      
      if (typeof(data.errors_web_url) === 'undefined' || data.errors_web_url.length != 0) 
      {
        for (var key in data.errors_web_url)
        {
          error_str= getValidateContactError(data.errors_web_url[key]);

          contact_web_url_tag= contacts_web_url_tags[key];
          $(contact_web_url_tag).before(error_str);
        }
        
        is_error= true;
        if ($('form.full_registration_add_web_url_web_url input[type = "submit"]').length != 0)
            $('form.full_registration_add_web_url_web_url input[type = "submit"]').removeAttr('disabled','disabled');        
      } 

      if (is_error) return true;
         
      callback();
      return true;    
    }
    },'json');  
}

function removeItem()
  {
    $('.remove_item').unbind('click.remove_item');
    $('.remove_item').bind('click.remove_item', function(){
      div_item= $(this).parents('div.item_row:first');
      $.ajax({
        type: 'POST',
        url: baseUrl + '/sfGuardRegister/FullRegistrationRemoveItem',
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


$(document).ready(function(){
    $('.open_yes_button').live('click', function(){
      $('div.open_yes').removeClass('hidden');  
      $('div.open_yes').show();
      $('.redirect_enabled').each(function(){
        //$(this).addClass('redirect_no_enabled');  
        $(this).addClass('grey');  
        $(this).removeClass('redirect_enabled'); 
      });
    });
    $('.redirect_enabled').live('click', function(){
      redirect_to= $(this).attr('data-url');  
      if (redirect_to && $(this).hasClass('redirect_enabled')) window.location= redirect_to;
    });
    function getValidateContactError(error_str)
    {
      html= '<ul class="error_list error_contact"><li>' + error_str + '</li></ul>';
      return html;
    }

    function validateContact(type, callback)
    {
      contacts= new Array();
      contact_class= '';
      switch(type)
      {
        case 'email': contact_class= '.new_email';break;
        case 'phone': contact_class= '.new_phone';break;  
        case 'mobile': contact_class= '.new_mobile';break;
        case 'web_url': contact_class= '.new_web_url';break;  
      }
      contacts_tags= $(contact_class);
      if (type === 'mobile') type= 'phone';
      for (i=0; i< contacts_tags.length; i++)
      {
        element= contacts_tags[i];
        contacts[i]= $(element).val();    
      }
      $.ajax({
        type: 'POST',
        url: baseUrl + 'call/validateContact',
        data: { 'type': type, 'contacts': contacts},  
        success : function( data, status, xhr ) 
        { 
          $('.error_contact').remove(); 
          if (typeof(data.errors.length) !== 'undefined' && data.errors.length == 0)
          {
            callback();
            
            return true;
          }
          else
          {
            for (var key in data.errors)
            {
              error_str= getValidateContactError(data.errors[key]);
              contact_tag= contacts_tags[key];
              $(contact_tag).before(error_str);    
            }  
            
            return false;  
          }
        }
        },'json');  
    }
    if ($('.new_email_button').length)
    {
      $('form.full_registration_add_emails').submit(function(){
        form= $(this);
        validateContactAll(ifvalid);
        function ifvalid()
        {
          form.unbind('submit');
          form.submit();
          
          return true; 
        }

        return false;
      });
      $('.new_email_button').live('click', function(){
        //validateContact('email', addNewEmail);
        addNewEmail();
        function addNewEmail()
        {
          tr_email= $('.new_email.last');
          div_parent= tr_email.parent();
          tr_email_remove= div_parent.find('.remove_email_button:first');
          new_div_parent= div_parent.clone(false);
          new_div_parent.find('.error_list').remove()
          div_parent.after(new_div_parent);
          //tr_email.hide();
          tr_email.removeClass('last');
          new_index= parseInt(tr_email.attr('data-index')) + 1;
          new_name= 'emails[' + new_index + ']';
          tr_email= $('.new_email.last');
          //tr_email.after(tr_email_remove.clone(true));
          tr_email_remove.show();
          tr_email.attr('name', new_name);
          tr_email.attr('data-index', new_index);
          tr_email.val('');
          //tr_email.before('<br />'); 
          if (typeof initPlaceholders === 'function') initPlaceholders();
          tr_email.focus(); 
          removeEmail();
        }
      });
       
      function removeEmail()
      {
        $('.remove_email_button').unbind('click.remove'); 
        $('.remove_email_button').bind('click.remove', function(){
          $(this).parent().remove();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          if($(this).attr('data-id'))
          {
              var email_id = $(this).attr('data-id');
                    $.ajax({
              type: 'POST',
              url: baseUrl + 'register/full_registration/email_delete',
              data: { 'email_id': email_id},  
              success : function( data, status, xhr ) 
              { 
              }
              },'json');  
          }  
        });
      }
      removeEmail(); 
    }
    newPhoneInit();

    

      removeItem();
    
   /* 
    $('.remove_item').live('click', function(){
      div_item= $(this).parents('div.item_row:first');
      $.ajax({
        type: 'POST',
        url: baseUrl + '/sfGuardRegister/fullRegistrationRemoveItem',
        data: { 'type': div_item.attr('data-type'), 'id': div_item.attr('data-id') },  
        success : function( data, status, xhr ) 
        { 
          div_item.hide(); 
          if (typeof initPlaceholders === 'function') initPlaceholders();  
        }
      });
    });*/
    
    if ($('.new_mobile_button').length)
    {
      $('form.full_registration_add_mobile_mobile').submit(function(){
        
        //сделать кнопку update не активной
        $('form.full_registration_add_mobile_mobile input[type = "submit"]').attr('disabled','disabled');       
        form= $(this);
        validateContactAll(ifvalid);
        function ifvalid()
        {
          form.unbind('submit');
          form.submit();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          
          return true; 
        }

        return false;
      });
      $('.new_mobile_button').live('click', function(){
        //validateContact('mobile', addNewMobile);
        addNewMobile();
        function addNewMobile()
        {
          tr_mobile= $('.new_mobile.last');
          div_parent= tr_mobile.parent();
          tr_mobile_remove= div_parent.find('.remove_mobile_button:first');
          new_div_parent= div_parent.clone(false);
          new_div_parent.find('.error_list').remove()
          div_parent.after(new_div_parent);
          //tr_mobile.hide();
          tr_mobile.removeClass('last');
          new_index= parseInt(tr_mobile.attr('data-index')) + 1;
          new_name= 'mobiles[new][' + new_index + ']'; 
          tr_mobile= $('.new_mobile.last'); 
          tr_mobile_remove.show();
          tr_mobile.attr('name', new_name);
          tr_mobile.attr('data-index', new_index);
          tr_mobile.val('');
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          tr_mobile.focus();  
          removeMobile();
        }
      }); 
      function removeMobile()
      {
        $('.remove_mobile_button').unbind('click.remove_mobile_button');
        $('.remove_mobile_button').bind('click.remove_mobile_button', function(){
          $(this).parent().remove();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          //$(this).next('br:first').remove();
          //$(this).remove();
        }); 
      }
      removeMobile();
    }
    
    if ($('.new_web_url_button').length)
    {
      $('form.full_registration_add_web_url_web_url').submit(function(){
        //сделать кнопку update не активной
        $('form.full_registration_add_web_url_web_url input[type = "submit"]').attr('disabled','disabled');   
        form= $(this);
        validateContactAll(ifvalid);
        function ifvalid()
        {
          form.unbind('submit');
          form.submit();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          
          return true; 
        }

        return false;
      });
      $('.new_web_url_button').live('click', function(){
        //validateContact('web_url', addNewWebUrl);
        addNewWebUrl();
        function addNewWebUrl()
        {
          tr_web_url= $('.new_web_url.last');
          div_parent= tr_web_url.parent();
          tr_web_url_remove= div_parent.find('.remove_web_url_button:first');
          new_div_parent= div_parent.clone(false);
          new_div_parent.find('.error_list').remove()
          div_parent.after(new_div_parent);
          //tr_web_url.hide();
          tr_web_url.removeClass('last');
          new_index= parseInt(tr_web_url.attr('data-index')) + 1;
          new_name= 'web_urls[new][' + new_index + ']'; 
          tr_web_url= $('.new_web_url.last'); 
          tr_web_url_remove.show();
          tr_web_url.attr('name', new_name);
          tr_web_url.attr('data-index', new_index);
          tr_web_url.val('');
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          tr_web_url.focus(); 
          removeWebUrl();
        }
      });  
      function removeWebUrl()
      {
        $('.remove_web_url_button').unbind('click.remove');
        $('.remove_web_url_button').bind('click.remove', function(){
          $(this).parent().remove();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          //$(this).next('br:first').remove();
          //$(this).remove();
        });
      } 
    }
    
    if ($('.new_postition_button').length)
    {
    function removePosition()
      { 
          $('.remove_position_button').unbind('click.remove'); 
          $('.remove_position_button').bind('click.remove',function(){
            table_element= $(this).parents('.data-item:first');
            _this= $(this);
            $.ajax({
                type: 'POST',
                url: baseUrl + 'sfGuardRegister/removePosition',
                data: { data_index: _this.attr('data-index')},  
                success : function( data) 
                { 
                  table_element.remove();
                  if (typeof initPlaceholders === 'function') initPlaceholders(); 
                }
              });       
          });
      }
        
        
        removePosition();
      $('.new_postition_button').live('click', function(){
        //validateContact('web_url', addNewWebUrl);
        addNewPosition();
        function addNewPosition()
        {
          $('.remove_position_button').unbind('click.remove');  
          $.ajax({
            type: 'POST',
            url: baseUrl + 'sfGuardRegister/getNewPositionRow',
            data: { next_index: $('.data-item').attr('data-index')},  
            success : function( data) 
            { 
              $('.full_registration_positions').append(data);
              if (typeof initPlaceholders === 'function') initPlaceholders(); 
              companyAutocomplete();
              removePosition(); 
            }
          });
             
        }
      }); 

    }
    
    if ($('#fab_book_recall_phone_type').length)
    {
      recall_phone_type_tr= $('#fab_book_recall_phone_type').parents('tr');
      //alert($('#fab_book_recall_phone.widget_other').val());
      if ($('#fab_book_recall_phone.widget_other').val() === '0') {
        recall_phone_type_tr.show();
      } 
      else recall_phone_type_tr.hide();
      $('#fab_book_recall_phone.widget_other').change(function(){ 
       if($(this).val() === '0') recall_phone_type_tr.show();
       else recall_phone_type_tr.hide();
      });
    }
    var end_call_click = true;
    var new_call_id = false;
     if ($('input[name="start_call"]').length) 
      {
        $('input[name="start_call"]').live('click', function () 
            {
                $('input[name="start_call"]').attr('disabled', true);
                $('input[name="end_call"]').attr('disabled', false);
                var company_id = $('input[name="company_id"]').val();
                var type_code = $('input[name="type_code"]').val();
                if(end_call_click)
                {
                  $.ajax({
                  type: 'POST',
                  url: baseUrl + 'call/ActivateCall',
                  data: { company_id: company_id, type_code: type_code},   
                  success : function( data, status, xhr ) 
                      { 
                          var obj = jQuery.parseJSON(data);
                          new_call_id = obj.call_id;
                          $('.book_recall').removeClass('hidden');   
                          var href_recall= $('.book_recall').attr('href'); 
                          $('.book_recall').attr('href', href_recall.replace(/\/0/, '/' + new_call_id))
                          
                          $('.deal_objection').removeClass('hidden');   
                          var href_recall= $('.deal_objection').attr('href'); 
                          $('.deal_objection').attr('href', href_recall.replace(/\/0/, '/' + new_call_id))
                          
                          $('.deal_objection_ddi').removeClass('hidden');   
                          var href_recall= $('.deal_objection_ddi').attr('href'); 
                          $('.deal_objection_ddi').attr('href', href_recall.replace(/\/0/, '/' + new_call_id))
                          
                          var text_id_str = obj.call_texts;
                          var text_id_array  = text_id_str.split(',');
                          var note_id_str = obj.call_notes;
                          var note_id_array  = note_id_str.split(',');
                          for (var i = 0; i < text_id_array.length; i++) 
                          {
                            if(text_id_array[i]);
                            {
                                $('#call_text_' + text_id_array[i] + '_note').attr('note_id', note_id_array[i]);
                                $('.call_text_' + text_id_array[i] + '_note_area').css('display', 'block');
                            }
                            
                          }
                          end_call_click = false;
                      }
                  },'json'); 
                }
                else alert('Please, close the call'); 
            });
            
        $('input[name="end_call"]').live('click', function () 
            {
                end_call_click = true;
                var result_code = false;
                var company_id = $('input[name="company_id"]').val();
                if(new_call_id)
                {
                    $('input[name="end_call"]').attr('disabled', true);
                    $.ajax({
                    type: 'POST',
                    url: baseUrl + 'call/ActivateCall',
                    data: { call_id: new_call_id, company_id: company_id},  
                    success : function( data, status, xhr ) 
                      { 
                            $('.call_result_codes').css('display', 'block');
                      }
                    },'json'); 
                }
            });
      } 
      if ($('.note_text').length) 
      {
            $(".note_text").each(function(){
             $(this).change(function()
             {
                 var note_id = $(this).attr('note_id');
                 var note_text = $(this).attr('value');
                 var call_text_id = $(this).attr('call_text');
                  $.ajax({
                    type: 'POST',
                    url: baseUrl + 'call/ChangeNoteText',
                    data: { note_id: note_id , text: note_text, call_text: call_text_id},  
                    success : function( data, status, xhr ) 
                      { 

                      }
                    },'json'); 
                 });
             });
      }
      if ($('.result_code').length)
      { 
        $('.result_code').change(function () 
            {
                var result = $(this).val();
                $.ajax({
                    type: 'POST',
                    url: baseUrl + 'call/EnterResultCode',
                    data: { call_id: new_call_id , result: result},  
                    success : function( data, status, xhr ) 
                      { 

                      }
                    },'json'); 
            });
      }
            if ($('.objection_note').length) 
      {
            $(".objection_note").each(function(){
             $(this).change(function()
             {
                 var objection_id = $(this).attr('objection_id');
                 var note_text = $(this).attr('value');
                 var call_id = $(this).attr('call_id');
                  $.ajax({
                    type: 'POST',
                    url: baseUrl + 'call/ChangeObjectionNoteText',
                    data: { call_id: call_id , text: note_text, objection_id: objection_id},  
                    success : function( data, status, xhr ) 
                      { 

                      }
                    },'json'); 
                 });
             });
      }


    if ($('.new_email_address_button').length)
    {
      $('form.full_registration_add_email_address').submit(function(){ 

        //сделать кнопку update не активной
        $('form.full_registration_add_email_address input[type = "submit"]').attr('disabled','disabled'); 
        form= $(this);
        validateContactAll(ifvalidNew);
        function ifvalidNew()
        {
          form.unbind('submit');
          form.submit();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          
          return true; 
        }

        return false;
      });
      $('.new_email_address_button').live('click', function(){
        //validateContact('mobile', addNewMobile);
        addNewEmailAddress();
        function addNewEmailAddress()
        {
          tr_mobile= $('.new_email_address.last');
          div_parent= tr_mobile.parent();
          tr_mobile_remove= div_parent.find('.remove_email_address_button:first');
          new_div_parent= div_parent.clone(false);
          new_div_parent.find('.error_list').remove()
          div_parent.after(new_div_parent);
          //tr_mobile.hide();
          tr_mobile.removeClass('last');
          new_index= parseInt(tr_mobile.attr('data-index')) + 1;
          new_name= 'emails[new][' + new_index + ']'; 
          tr_mobile= $('.new_email_address.last'); 
          tr_mobile_remove.show();
          tr_mobile.attr('name', new_name);
          tr_mobile.attr('data-index', new_index);
          tr_mobile.val('');
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          tr_mobile.focus();  
          removeEmailAddress();
        }
      }); 
      function removeEmailAddress()
      {
        $('.remove_email_address_button').unbind('click.remove');
        $('.remove_email_address_button').bind('click.remove', function(){
          $(this).parent().remove();
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          //$(this).next('br:first').remove();
          //$(this).remove();
        }); 
      }
      removeEmailAddress();
    }      
      

});