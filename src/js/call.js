 var m;//=0;
 var s;//=0;
 var interval;
function showtime()
    {
        s++;
        if (s>=60)
        {
            s=0;
            m++;
            if (m>=60)
            {
                m=0;
            }
        }
        s = s+"";
        m = m+"";
        if (s.length<2) s = "0"+s;
        if (m.length<2) m = "0"+m;
        document.getElementById("o-clock").innerHTML = m+":"+s;
    }    
$(document).ready(function(){
    
    $('.not_active a').click(function(){
      return false;
    });

    function getValidateContactError(error_str)
    {
      html= '<ul class="error_list error_contact"><li>' + error_str + '</li></ul>';
      return html;
    }
    
    function getEmailContactsBlock(parent_in, empty_check_in)
    {
      contacts_email= new Array();
      contacts_ids= new Array();
      
      empty_check= false;
      parent= $(document);
      if (typeof(parent_in) !== 'undefined' && parent_in) parent= $(parent_in);
      if (typeof(empty_check_in) !== 'undefined' && empty_check_in) empty_check= true;
      
      contacts_email_tags= parent.find('.new_email');  
      for (i=0; i< contacts_email_tags.length; i++)
      {
        element= contacts_email_tags[i];
        if ((empty_check && i == 0) || i !== (contacts_email_tags.length - 1) || $(element).val()) contacts_email[i]= $(element).val();    
      } 
      contacts_email_tags2= parent.find('.email_edit');
      ii= contacts_email.length;
      for (k= ii; k< contacts_email_tags2.length + ii; k++)
      {
        element= contacts_email_tags2[k];
        contacts_email_tags[k]= element;
        contacts_email[k]= $(element).val();   
        contacts_ids[k] = $(element).attr('data-id');    
      } 
      
      result_in= new Array();
      result_in['contacts']= contacts_email;
      result_in['tags']= contacts_email_tags;
      result_in['contacts_ids'] = contacts_ids;
      
      return result_in;
    }
    
    function getPhoneContactsBlock(parent_in, empty_check_in)
    {
      contacts_phone= new Array();
      
      empty_check= false;
      parent= $(document);
      if (typeof(parent_in) !== 'undefined' && parent_in) parent= $(parent_in);
      if (typeof(empty_check_in) !== 'undefined' && empty_check_in) empty_check= true;
      contacts_phone_tags= parent.find('.new_phone');
      for (i=0; i< contacts_phone_tags.length; i++)
      {
        element= contacts_phone_tags[i];
        if ((empty_check && i == 0) || i !== (contacts_phone_tags.length - 1) || $(element).val()) contacts_phone[i]= $(element).val();    
      }
      contacts_phone_tags2= parent.find('.phone_edit');
      ii= contacts_phone.length;
      for (k= ii; k< contacts_phone_tags2.length + ii; k++)
      {
        element= contacts_phone_tags2[k];
        contacts_phone_tags[k]= element;
        contacts_phone[k]= $(element).val();    
      }    
      
      result_in= new Array();
      result_in['contacts']= contacts_phone;
      result_in['tags']= contacts_phone_tags;
      
      return result_in;
    }
    
    function getEmailContacts()
    {
      result= new Array(); 

      var is_empty_check = true; 
      if($('.prospect_company_form input.not_contacts_empty_check').length && $('.prospect_company_form input.not_contacts_empty_check').val())  is_empty_check = false; 
      result_res= getEmailContactsBlock($('.prospect_company_form'), is_empty_check);
      result['contacts']= result_res['contacts'];
      result['tags']= result_res['tags'];
      result['lengths']= [result_res['tags'].length]; 
      
      result['contacts_ids'] = result_res['contacts_ids'];
      
      $('.prospect_person_form').each(function(){
        if (1 || !personEmpty($(this)))
        {
          result_per_res= getEmailContactsBlock($(this), is_empty_check);
          result['contacts']= result['contacts'].concat(result_per_res['contacts']);         
          /*for(i= result['tags'].length; i< result['tags'].length + result_per_res['tags'].length; i++)
          {
            result['tags'][i]= result_per_res['tags'][i - result['tags'].length];
          } */
          result['tags']= result['tags'].add(result_per_res['tags']);
          result['lengths']= result['lengths'].concat(result['tags'].length);     
        }
      });
      
      return result; 
    }
    
    function getPhoneContacts()
    {
      result= new Array(); 

      result_res= getPhoneContactsBlock($('.prospect_company_form'), true);
      result['contacts']= result_res['contacts'];
      result['tags']= result_res['tags'];
      result['lengths']= [result_res['tags'].length]; 
      $('.prospect_person_form').each(function(){
        if (1 || !personEmpty($(this)))
        {
          result_per_res= getPhoneContactsBlock($(this), true);
          result['contacts']= result['contacts'].concat(result_per_res['contacts']);        
          result['tags']= result['tags'].add(result_per_res['tags']);
          result['lengths']= result['lengths'].concat(result['tags'].length); 
        }
      });
      
      return result;   
    }
    
    function personEmpty(parent)
    {
      if ($(parent).find('.person_forename').length && $(parent).find('.person_forename').val()) return false;
      if ($(parent).find('.person_surname').length && $(parent).find('.person_surname').val()) return false;
      
      return true;
    }
    
    function getSpecialisms()
    {
      contacts_specialism_tags= $('.new_specialism');
      if (typeof clearPlaceholders === 'function') clearPlaceholders($('.call_content_wrap'));
      for (i=0; i< contacts_specialism_tags.length; i++)
      {
        element= contacts_specialism_tags[i];
        if (i !== (contacts_specialism_tags.length - 1) || $(element).val()) contacts_specialism[i]= $(element).val();    
      }
      contacts_specialism_tags2= $('.specialism_edit');
      ii= contacts_specialism.length;
      for (k= ii; k< contacts_specialism_tags2.length + ii; k++)
      {
        element= contacts_specialism_tags2[k];
        contacts_specialism_tags[k]= element;
        contacts_specialism[k]= $(element).val();    
      }
      
      result= new Array();
      result['contacts']= contacts_specialism;
      result['tags']= contacts_specialism_tags;
      
      return result;    
    }
    
    function getWebUrls()
    {
      contacts_web_url_tags= $('.new_web_url');
      if (typeof clearPlaceholders === 'function') clearPlaceholders($('.call_content_wrap'));
      for (i=0; i< contacts_web_url_tags.length; i++)
      {
        element= contacts_web_url_tags[i];
        if (i !== (contacts_web_url_tags.length - 1) || $(element).val()) contacts_web_url[i]= $(element).val();    
      }
      contacts_web_url_tags2= $('.web_url_edit');
      ii= contacts_web_url.length;
      for (k= ii; k< contacts_web_url_tags2.length + ii; k++)
      {
        element= contacts_web_url_tags2[k];
        contacts_web_url_tags[k]= element;
        contacts_web_url[k]= $(element).val();    
      }
      
      result= new Array();
      result['contacts']= contacts_web_url;
      result['tags']= contacts_web_url_tags;
      
      return result;    
    }
    
    function validateContactAll(callback)
    {
      contacts_email= new Array();
      contacts_phone= new Array(); 
      contacts_specialism= new Array(); 
      contacts_web_url= new Array(); 
      contacts_email_person= new Array();  
      contacts_phone_person= new Array();  
      if (typeof clearPlaceholders === 'function') clearPlaceholders($('.call_content_wrap'));
      contacts_email_res= getEmailContacts();
      contacts_phone_res= getPhoneContacts();
      contacts_specialism_res= getSpecialisms();
      contacts_web_url_res= getWebUrls();
      contacts_email= contacts_email_res['contacts'];
      contacts_email_tags= contacts_email_res['tags'];
      contacts_email_lengths= contacts_email_res['lengths'];
      contacts_email_ids = contacts_email_res['contacts_ids'];
      contacts_phone= contacts_phone_res['contacts'];
      contacts_phone_tags= contacts_phone_res['tags'];
      contacts_phone_lengths= contacts_phone_res['lengths'];
      contacts_specialism= contacts_specialism_res['contacts'];
      contacts_specialism_tags= contacts_specialism_res['tags'];
      contacts_web_url= contacts_web_url_res['contacts'];
      contacts_web_url_tags= contacts_web_url_res['tags'];

      not_check_empty= false;
      if($('.prospect_company_form input.not_contacts_empty_check').length && $('.prospect_company_form input.not_contacts_empty_check').val())  not_check_empty = true; 
      
      $.ajax({
        type: 'POST',
        url: baseUrl + 'call/validateContactAll',
        data: { 'type': 'all', 'not_check_empty': not_check_empty, 'contacts_email': contacts_email,  'contact_ids': contacts_email_ids, 'contacts_phone': contacts_phone, 'contacts_specialism': contacts_specialism, 'contacts_email_lengths': contacts_email_lengths, 'contacts_phone_lengths': contacts_phone_lengths, 'contacts_web_url': contacts_web_url },  
        success : function( data, status, xhr ) 
        { 
          $('.error_contact').remove(); 
          is_error= false;
          if (typeof(data.errors_email) === 'undefined' || data.errors_email.length != 0)
          {
            for (var key in data.errors_email)
            {
              error_str= getValidateContactError(data.errors_email[key]);
              contact_email_tag= contacts_email_tags[key];
              $(contact_email_tag).before(error_str);    
            }  
  
            is_error= true;
          }
          if (typeof(data.errors_phone) === 'undefined' || data.errors_phone.length != 0) 
          {
            for (var key in data.errors_phone)
            {
              error_str= getValidateContactError(data.errors_phone[key]);
              contact_phone_tag= contacts_phone_tags[key];
              $(contact_phone_tag).before(error_str);    
            }
            
            is_error= true;     
          } 
          if (typeof(data.errors_specialism) === 'undefined' || data.errors_specialism.length != 0)
          {
            for (var key in data.errors_specialism)
            {
              error_str= getValidateContactError(data.errors_specialism[key]);
              contact_specialism_tag= contacts_specialism_tags[key];
              $(contact_specialism_tag).before(error_str);    
            }  
  
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
          }
          
          if (is_error) return true;
             
          callback();
          if (typeof baseInit === 'function') baseInit();
          return true;    
        }
        },'json');  
    }
    function validateContact(type, callback, parent)
    {
      contacts= new Array();
      contact_class= '';
      if (typeof clearPlaceholders === 'function') clearPlaceholders($('.call_content_wrap'));
      switch(type)
      {
        case 'email': contact_class= '.new_email';break;
        case 'phone': contact_class= '.new_phone';break; 
        case 'web_url': contact_class= '.new_web_url';break; 
        case 'specialism': contact_class= '.new_specialism';break; 
      }
      if (typeof parent !== 'undefined' && parent) contacts_tags= parent.find(contact_class); 
      else contacts_tags= $(contact_class);
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
            if (typeof initPlaceholders === 'function') initPlaceholders();
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
            if (typeof initPlaceholders === 'function') initPlaceholders();
            
            return false;  
          }
        }
        },'json');  
    }
    if ($('.new_email_button').length)
    {
      $('form.prospect_form').submit(function(){
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
    }
    
    function updateNewButtonClick()
    {
        if ($('.new_email_button').length)
        {
            $('.new_email_button').unbind('click.new_email_button');
            $('.new_email_button').bind('click.new_email_button', function(){
                validateContact('email', addNewEmail, $(this).parents('.right_column_l:first'));
                parent_div= $(this).parents('div:first');
                function addNewEmail()
                {
                    tr_email= parent_div.find('.new_email.last');
                    tr_email.after(tr_email.clone(true));
                    //tr_email.hide();
                    tr_email.removeClass('last');
                    new_index= parseInt(tr_email.attr('data-index')) + 1;
                    //new_name= 'emails[new][' + new_index + ']';
                    new_name= tr_email.attr('name').replace(/^(.*)\[(\d+)\]$/g, "$1" + "[" + new_index + "]");
                    tr_email= parent_div.find('.new_email.last');
                    tr_email.attr('name', new_name);
                    tr_email.attr('data-index', new_index);
                    tr_email.val('');
                    //tr_email.before('<br />');

                    if (typeof baseInit !== 'undefined') baseInit();
                    if (tr_email.val() === tr_email.attr('placeholder')) tr_email.val(''); 
                    //tr_email.focus(); 
                }
            });
        }
        if ($('.new_phone_button').length)
        {
            $('.new_phone_button').unbind('click.new_phone_button');
          $('.new_phone_button').bind('click.new_phone_button', function(){
            validateContact('phone', addNewPhone, $(this).parents('.right_column_l:first'));
        parent_div= $(this).parents('div:first');
            function addNewPhone()
            {
              tr_phone= parent_div.find('.new_phone.last');
              tr_phone_type= parent_div.find('select.new_phone_type.last');
              new_tr_phone= tr_phone.clone(true);
              parent_div.find('.new_phone_type.last:last').after(new_tr_phone);
              //tr_email.hide();
              tr_phone.removeClass('last');
              new_index= parseInt(tr_phone.attr('data-index')) + 1;
              //new_name= 'phones[new][' + new_index + ']';
              new_name= tr_phone.attr('name').replace(/^(.*)\[(\d+)\]$/g, "$1" + "[" + new_index + "]");
              tr_phone= parent_div.find('.new_phone.last');
              tr_phone.attr('name', new_name);
              tr_phone.attr('data-index', new_index);
              tr_phone.val('');
          
              //tr_phone.before('<br />'); 
              tr_phone.after(tr_phone_type.clone(false));
              tr_phone_type.removeClass('last');
              parent_div.find('.new_phone_type.last').each(function(){$(this).removeClass('last')});
              new_index= parseInt(tr_phone_type.attr('data-index')) + 1;
              new_name= 'phone_types[new][' + new_index + ']';
              tr_phone_type= parent_div.find('.new_phone_type:last');
              tr_phone_type.attr('name', new_name);
              tr_phone_type.attr('data-index', new_index);
              tr_phone_type.removeClass('selectBox');
              tr_phone_type.show();
              if(!tr_phone_type.hasClass('last')) tr_phone_type.addClass('last');
              
              $("select.b-select_box").selectBox();
              
              if (typeof baseInit !== 'undefined') baseInit()
          tr_phone.focus();
            }
          });  
        } 
        
        if ($('.new_specialism_button').length)
        {
            $('.new_specialism_button').unbind('click.new_specialism_button');
          $('.new_specialism_button').bind('click.new_specialism_button', function(){
            validateContact('specialism', addNewspecialism, $(this).parents('.right_column_l:first'));
            parent_div= $(this).parents('div:first');
        //addNewspecialism();
            function addNewspecialism()
            {
              tr_specialism= parent_div.find('.new_specialism.last');
              tr_specialism.after(tr_specialism.clone());
              //tr_specialism.hide();
              tr_specialism.removeClass('last');
              new_index= parseInt(tr_specialism.attr('data-index')) + 1;
              //new_name= 'specialisms[\'new\'][' + new_index + ']';
          new_name = tr_specialism.attr('name').replace(/^(.*)\[(\d+)\]$/g, "$1" + "[" + new_index + "]");
              tr_specialism= parent_div.find('.new_specialism.last');
              tr_specialism.attr('name', new_name);
              tr_specialism.attr('data-index', new_index);
              tr_specialism.val('');
              //tr_specialism.before('<br />');
              
              if (typeof baseInit !== 'undefined') baseInit(); 
       
              tr_specialism.focus(); 
              if (typeof specialistAutocomplete !== 'undefined')  specialistAutocomplete(tr_specialism);  
            }
          });  
        }
        
        if ($('.new_web_url_button').length)
        {
            $('.new_web_url_button').unbind('click.new_web_url_button');
          $('.new_web_url_button').bind('click.new_web_url_button', function(){
            validateContact('web_url', addNewWebUrl, $(this).parents('.right_column_l:first'));
            parent_div= $(this).parents('div:first');
            function addNewWebUrl()
            {
              tr_web_url= parent_div.find('.new_web_url.last');
              tr_web_url.after(tr_web_url.clone(true));
              //tr_web_url.hide();
              tr_web_url.removeClass('last');
              new_index= parseInt(tr_web_url.attr('data-index')) + 1;
              new_name= 'web_urls[\'new\'][' + new_index + ']';
              tr_web_url= parent_div.find('.new_web_url.last');
              tr_web_url.attr('name', new_name);
              tr_web_url.attr('data-index', new_index);
              tr_web_url.val('');
              //tr_web_url.before('<br />');
              //tr_web_url.focus(); 
              
              if (typeof baseInit !== 'undefined') baseInit();
              
            }
          });  
        }
    }//******End updateNewButtonClick function
    
    updateNewButtonClick();
     
    if ($('.new_prospect_person_button').length)
    {
      function addNewPspPerson()
      {
        last_per_id= $('.prospect_person_form:last input:first').attr('data-id');
        if (!last_per_id) last_per_id= 0;
        last_per_id++;
        $.ajax({
          type: 'POST',
          url: baseUrl + 'call/new-prospect-person',
          data: { num_person: last_per_id},   
          success : function( data, status, xhr ) 
          {
            if (typeof data !== 'undefined' && data) $('.prospect_person_form:last').after(data); 
            $('.prospect_person_form:last input:first').attr('data-id', last_per_id);
            $("select.b-select_box").selectBox();  
            if (typeof initPlaceholders === 'function') initPlaceholders();  
            updateNewButtonClick();
          }
        });
      }
      
      $('.new_prospect_person_button').live('click', function(){addNewPspPerson()});
    }
    
    if ($('#fab_book_recall_phone_type').length || $('.contact_method').length )
    {
      recall_phone_type_tr= $('#fab_book_recall_phone_type').parents('tr');
      contact_method = $('.contact_method');
      //alert($('#fab_book_recall_phone.widget_other').val());
      if ($('#fab_book_recall_phone.widget_other').val() === '0') { 
        recall_phone_type_tr.show();
        if(contact_method.length) contact_method.show();
      } 
      else recall_phone_type_tr.hide(); 
      $('#fab_book_recall_phone.widget_other').change(function(){ 
       if($(this).val() === '0') 
       {
           recall_phone_type_tr.show();
           contact_method.show();
       } 
       else 
       {
           recall_phone_type_tr.hide();
           contact_method.hide();
       }
      });
    }
    var end_call_click = true;
    var new_call_id = false;
     if ($('input[name="start_call"]').length) 
      {
        s = $('input[name="timer_seconds"]').val();
        m = $('input[name="timer_minutes"]').val();
        if( (s > 0) || (m > 0) ) 
        {
            if(!$('input[name="call_finish"]').val()) interval = setInterval("showtime()",1000); //Если еще не закончили звонок
            else showtime();
        }  
         
          
          
        $('input[name="start_call"]').live('click', function () 
            {
                interval = setInterval("showtime()",1000); 
                $('input[name="start_call"]').attr('disabled', true);
                $('input[name="start_call"]').addClass('hidden');
                $('div[id="notGetThrough"]').css('display', 'none');
                $('input[name="end_call"]').attr('disabled', false);
                $('input[name="end_call"]').removeClass('hidden');
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
                          //В случае редиректа
                          if(data && data.charAt(0) == '/')
                          {
                            window.location.href= baseUrl + data;  
                          }
                          else
                          {
                            //В случае возвращения json данных
                            var obj = jQuery.parseJSON(data);
                            new_call_id = obj.call_id;
                          
                          /*  $('.book_recall').removeClass('hidden');   
                            var href_recall= $('.book_recall').attr('href'); 
                            $('.book_recall').attr('href', href_recall.replace(/\/0/, '/' + new_call_id))
                            
                            $('.deal_objection').removeClass('hidden');   
                            var href_recall= $('.deal_objection').attr('href'); 
                            $('.deal_objection').attr('href', href_recall.replace(/\/0/, '/' + new_call_id))
                            
                            $('.deal_objection_ddi').removeClass('hidden');   
                            var href_recall= $('.deal_objection_ddi').attr('href'); 
                            $('.deal_objection_ddi').attr('href', href_recall.replace(/\/0/, '/' + new_call_id))  */
                            
                            var text_id_str = obj.call_texts;
                            if(text_id_str) var text_id_array  = text_id_str.split(',');
                            var note_id_str = obj.call_notes;
                            if(note_id_str) var note_id_array  = note_id_str.split(',');
                            if(text_id_str)
                            {
                                for (var i = 0; i < text_id_array.length; i++) 
                                {
                                  if(text_id_array[i]);
                                  {
                                      $('#call_text_' + text_id_array[i] + '_note').attr('note_id', note_id_array[i]);
                                      $('.call_text_' + text_id_array[i] + '_note_area').css('display', 'block');
                                  }
                                  
                                }
                            }
                           
                            var objection_id_str = obj.objections;
                            if(objection_id_str) var objection_id_array  = objection_id_str.split(','); 
                            var objection_note_id_str = obj.objection_notes;
                            if(objection_note_id_str) var objection_note_id_array  = objection_note_id_str.split(',');
                            if(objection_id_str)
                            {
                                for (var i = 0; i < objection_id_array.length; i++) 
                                {
                                  if(objection_id_array[i]);
                                  {
                                      $('#objection_' + objection_id_array[i] + '_note').attr('note_id', objection_note_id_array[i]);
                                      $('.objection_' + objection_id_array[i] + '_note_area').css('display', 'block');
                                  }
                                  
                                }
                            }
                            
                            end_call_click = false;
                          }
                      }
                  },'json'); 
                }
                else alert('Please, close the call'); 
            });
            
        $('input[name="end_call"]').live('click', function () 
            {
                clearInterval(interval);
                $('input[name="end_call"]').attr('disabled', true); 
                $('input[name="end_call"]').addClass('hidden');
                $('input[name="call_duration"]').removeClass('hidden');     
                
                end_call_click = true;
                var result_code = false;
                var company_id = $('input[name="company_id"]').val();
                if(!new_call_id) new_call_id = $('input[name="call_id"]').val();
                if(new_call_id)
                {
                    $('input[name="end_call"]').attr('disabled', true);
                    $.ajax({
                    type: 'POST',
                    url: baseUrl + 'call/ActivateCall',
                    data: { call_id: new_call_id, company_id: company_id},  
                    success : function( data, status, xhr ) 
                      { 
                            $('.call_result_codes').removeClass('hidden');
                           // $('.call_result_codes').css('display', 'block');
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
                 var note_type = $(this).attr('note_type');
                 var note_id = $(this).attr('note_id');
                 var note_text = $(this).attr('value');
                 var objection_id = $(this).attr('objection'); 
                 //var call_text_id = $(this).attr('call_text');
                  $.ajax({
                    type: 'POST',
                    url: baseUrl + 'call/ChangeNoteText',
                    data: { note_id: note_id , text: note_text , type: note_type, objection_id: objection_id},  
                    success : function( data, status, xhr ) 
                      { 

                      }
                    },'json'); 
                 });
             });
      }
      if ($('.result_code').length)
      { 
          
        $('input[name="call_result"]').live('click', function ()
        {
            var result = $(this).parent().find('.result_code').val();
            if(!new_call_id) new_call_id = $('input[name="call_id"]').val();
            $.ajax({
            type: 'POST',
            url: baseUrl + 'call/EnterResultCode',
            data: { call_id: new_call_id , result: result},  
            success : function( data, status, xhr ) 
              { 

              }
            },'json');
        }); 
        
       /* $('.result_code').change(function () 
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
            });*/
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
      
       jQuery('.edit_objection_link').live("click",function() 
    {
        var objection_id = jQuery(this).attr('objection_id');
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'prepare_for_sales/objection_edit',
        data: { id: objection_id },  
        success : function( data, status, xhr ) 
        { 
           $(document).ready(function(){
               jQuery(data).insertAfter('#objection' + objection_id); 
           // var select  = jQuery('#insurance' + insurance_id).prev('.insurance-block:last');
            jQuery('#objection' + objection_id + ":first").remove();
            
           });          
        }
        },'html');
    }); 
    
        jQuery('.delete_objection_link').live('click', function() 
        {
            if (confirm("Are you sure?")) 
            {
                var objection_id = jQuery(this).attr('objection_id'); 
                var select = jQuery(this).closest(".objection-block"); 
                jQuery.ajax({
                type: 'GET',
                url: baseUrl + 'prepare_for_sales/objection_delete',
                data: { id: objection_id },// box_number: box_number},  
                success : function( data, status, xhr ) 
                { 
                    jQuery(select).remove();             
                }
                },'html');
            }

    }); 
    
           jQuery('.edit_response_link').live("click",function() 
    {
        var response_id = jQuery(this).attr('response_id');
        jQuery.ajax({
        type: 'GET',
        url: baseUrl + 'prepare_for_sales/response_edit',
        data: { id: response_id },  
        success : function( data, status, xhr ) 
        { 
           $(document).ready(function(){
               jQuery(data).insertAfter('#response' + response_id); 
           // var select  = jQuery('#insurance' + insurance_id).prev('.insurance-block:last');
            jQuery('#response' + response_id + ":first").remove();
            
           });          
        }
        },'html');
    }); 
    
        jQuery('.delete_response_link').live('click', function() 
        {
            if (confirm("Are you sure?")) 
            {
                var response_id = jQuery(this).attr('response_id'); 
                var select = jQuery(this).closest(".response-block"); 
                jQuery.ajax({
                type: 'GET',
                url: baseUrl + 'prepare_for_sales/response_delete',
                data: { id: response_id },// box_number: box_number},  
                success : function( data, status, xhr ) 
                { 
                    jQuery(select).remove();             
                }
                },'html');
            }

    }); 
    
        jQuery('.add_objection').live('click', function() 
    {
        var objection_type = jQuery(this).attr('objection_type');
        $.ajax({
        type: 'GET',
        url: baseUrl + 'prepare_for_sales/objection_new',
        data: { objection_type: objection_type },  
        success : function( data, status, xhr ) 
        { 
           jQuery(data).insertBefore('.add_objection');           
        }
        },'html');      
    });
    //.live('click', function()
    jQuery('.add_response').live('click', function()//.click(function() 
    {
        var objection_id = jQuery(this).attr('objection_id');
        $.ajax({
        type: 'POST',
        url: baseUrl + 'prepare_for_sales/response_new',
        data: {objection_id: objection_id },  
        success : function( data, status, xhr ) 
        { 
           jQuery(data).insertBefore('.add_response');           
        }
        },'html');      
    });

     jQuery('input.back_to_top_button').live('click', function()
     {
        $('html, body').animate({scrollTop:0}, 'slow');
        $(this).parents('.make-call-cont').find('.hided').click();
        return false;
    });
    
    jQuery('.make-a-call-lp .zone-right input[name=groups]').change(function()
    {
        if(jQuery(this).val() == 'trade' || jQuery(this).val() == 'free3' || jQuery(this).val() == 'free6' || jQuery(this).val() == 'free12') jQuery(this).parents('.zone-right').find('.pay_block').addClass('hidden');
        else jQuery(this).parents('.zone-right').find('.pay_block').removeClass('hidden');
        
    });

    jQuery('.call_history_row').each(function(){
      //$(this).tooltip();  
    });
    
    if(jQuery('.edit_profile_address.in_prospect.display').length )
    {
     $.ajax({
        type: 'POST',
        url: baseUrl + 'call/show_address_form',
        data: {},  
        success : function( data, status, xhr ) 
        { 
            jQuery('.edit_profile_address.in_prospect').html(data); 
            if ($('.b-select_box').length) $("select.b-select_box").selectBox(); 			
        }
        },'html');
    }
    
        
    if(jQuery('.quick_registration .set_context_button ').length)
    {
        jQuery('.quick_registration .set_context_button ').live('click', function(){
            jQuery(this).attr('disabled', 'disabled');
            jQuery(this).parents('form').submit();
            return true;
        });
    }

    $('input[name="prospect_create_and_call"]').val(0);
    if ($('.create_prospect_and_call').length){
        $('.create_prospect_and_call').live('click', function(){
            $('input[name="prospect_create_and_call"]').val(1);
            $(this).parents('form:first').submit();
        });
    }

    $('input[name="filter_company_name_yes"]').live('click', function(){
        if ($('input[name="filter_company_name"]').val().length >= 4)
        {
            $('.filter_company_name').submit();
        }
    });

    $("input[name=groups]").live('change',function()
	{
	    var group_id = $(this).val();
		$('input[name="choose_company"]').attr('disabled','disabled');
        $.ajax({
            type: 'POST',
            url: baseUrl + 'call/GetPaymentMethod',
            data: { group_id: group_id},  
            success : function( data, status, xhr ) 
            { 
		       if(data)
               {
		           jQuery('.payment_methods').html(data);
                   Custom.init();   
		       } 
               $('input[name="choose_company"]').removeAttr('disabled','disabled');
            }
        });
	    
	})
});

