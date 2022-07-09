var
    gdprMess = 0;
$(document).ready(function(){
    init_ajax_monitor();
    if(document.getElementById('gdpr'))
	{
	    messageGdprSug();
		gdprMess = 1;
    }	
	
    /*$('.exp_mydetails').live('click', function(){
      var _expanded;
      if($(this).parents('#menu').hasClass('expanded_cur_mem')) $(this).parents('#menu').removeClass('expanded_cur_mem') ; 
      if($('.corn').hasClass('expanded_cur_mem')) $('.corn').removeClass('expanded_cur_mem') ; 
      if($('.exp_cur_mem_item').is(':visible')) $('.exp_cur_mem_item').hide();    
      $(this).parents('#menu').toggleClass('expanded'); 
      $('.corn').toggleClass('expanded');
      $('.exp_mydetails_item').toggle(); 
      $('.extended_person').toggle();
      //установим куку на меню, отображающееся в правом верхнем углу
      if($(this).parents('#menu').hasClass('expanded') || $(this).parents('.corn').hasClass('expanded'))
      {      
        _expanded  = true;
      }    
      else
      {      
        _expanded =  false;
      }        
      
      document.cookie = "Expanded_menu=" +_expanded+"; path=/;";  
    });
    $('.exp_cur_mem').live('click', function(){
      if($(this).parents('#menu').hasClass('expanded')) $(this).parents('#menu').removeClass('expanded') ; 
      if($('.corn').hasClass('expanded')) $('.corn').removeClass('expanded') ; 
      if($('.exp_mydetails_item').is(':visible')) $('.exp_mydetails_item').hide();
      if($('.extended_person').is(':visible')) $('.extended_person').hide();
      $(this).parents('#menu').toggleClass('expanded_cur_mem'); 
      $('.corn').toggleClass('expanded_cur_mem');
      $('.exp_cur_mem_item').toggle(); 
    });*/

    $('#bottom-navigation .static-links').hide();
    
	if($('#google_event_purchase_got_membership').length > 0) {
       var str = $('#google_event_purchase_got_membership').val();
       
       if(str)
	   {
    	   gtag('event', 'purchased_got_membership', {
    		   'event_category':'conversion', 
    		   'event_label':str
    	   });	   
	   }
	   //удалим элемент во избежания повторной отправки события в случае ошибок
	   $('#google_event_purchase_got_membership').remove();

   }
    
    //проверка чекбокса I have read and accept the Terms of Service на странице payment/summary 	
    checkButtonDisabled(); 
    $('input[name="service_terms"]').live('change', function()
    {
        checkButtonDisabled();  
    });
	
	$('#gdpr_consent').live('change', function()
    {
       checkButtonGDPRDisabled(); 
    });
    
    /*форма поиска мембершипа*/
    $('#fab_search_member input[type="submit"').live('click', function(){
        $('#fab_search_member').ajaxForm(function(data) 
             {
                if(data.link_to_member){ //перенаправление на страницу мембера
                     window.location = data.link_to_member;   
                }else{
                    $('.search-member-form').html(data);
                }
             });
    }); 
	/*форма поиска мембершипа*/
    $('#form_find_member input[type="submit"').live('click', function(){
        $('#form_find_member').ajaxForm(function(data) 
             {
                if(data.url){ //перенаправление на страницу мембера
                     window.location = data.url;   
                }else{
                    $('#fab_search_sidebar').html(data);
					var link_address= $('.lnk_pick_addr');  
                    if (link_address.length)
                    { 
                      BLA= new browseLocalAreaNew(link_address);//browseLocalArea(link_address); 
                      localAreaAutocomplete(); 
                    }
                }
             });
    }); 
});

function checkButtonGDPRDisabled()
{
    if($('input[name="gdpr[consent]"]:checked').val()) $('input[name="gdpr_sub"]').removeAttr("disabled", "disabled"); 
    else  $('input[name="gdpr_sub"]').attr('disabled','disabled');
}
function messageGdprSug(){
	$.colorbox({href: baseUrl + 'signin/gdpr', opacity: 0.20, iframe:false, scrolling:true,  escKey: false, overlayClose: false, 
	onLoad: function() {
        $('#cboxClose').remove();
	},
	onComplete: function(){
		initRegSubmit();
		Custom.init();
		checkButtonGDPRDisabled();
		$.colorbox.resize();
	},
	onClosed: function(){ 
	    gdprMess = 0;
        if($('#percentage').val())
		    timerId = messageImprSug();
	}
	});
}

function checkButtonDisabled()
{
    if($('input[name="service_terms"]:checked').val()) $('input[name="confirm"]').removeAttr("disabled", "disabled"); 
    else  $('input[name="confirm"]').attr('disabled','disabled'); 
}

/*--------------------------------------------------------------------------------------*\
|  создает объект seleniumAjaxMonitor и свойство seleniumAjaxMonitor.AjaxInProgress
|  создает два события ajaxStart и ajaxStop для слежением за запросами ajax
\*--------------------------------------------------------------------------------------*/
function init_ajax_monitor()
{
    if (typeof seleniumAjaxMonitor  == 'undefined') 
    {
        seleniumAjaxMonitor = {AjaxInProgress: 0};
        $("body").ajaxStart(first_ajax_start);
        $("body").ajaxStop(last_ajax_end);
        
        // $("#ajax_indicator_placeholder").html('<img id="ajax_indicator" src="/images/ajax-loader.gif" alt="Ajax query in progress" />');
    }
}

function setClear(elem) 
{
    if (elem.value == elem.defaultValue) 
  {
            elem.value = '';
    } 
}     
                
function setDefault(elem) 
{
    if (!elem.value) 
  {
           elem.value = elem.defaultValue;
    } 
}

function is_ajax_monitor_initialised()
{
    return (typeof seleniumAjaxMonitor  != 'undefined');
}

function is_ajax_in_progress()
{
    return  (is_ajax_monitor_initialised() && seleniumAjaxMonitor.AjaxInProgress);
}

function first_ajax_start()
{
    if(!seleniumAjaxMonitor.AjaxInProgress)
    {
      $("#ajax_indicator_placeholder").show();
    } 
    seleniumAjaxMonitor.AjaxInProgress=1;
}

function last_ajax_end()
{
    seleniumAjaxMonitor.AjaxInProgress=0;
    $("#ajax_indicator_placeholder").hide();
}

$(document).ready(function()
{  
    function checkUserSession()
    {
      seleniumAjaxMonitor.AjaxInProgress= 1;
      $.ajax({
      type: 'POST',
      url: baseUrl + 'sfGuardAuth/checkUserSession/', 
      success : function( data, status, xhr ) 
        { 
          if (data.auth) 
          {
            window.location= baseUrl;    
          }
        }
      }, "json");   
    }
    
    timer = setInterval(checkUserSession, 7201000);
  
    $('.switch_cur_mem').live('click', function()
    {
      mem_id= $(this).attr('data-id');
      url= $(this).attr('data-url');
      $.ajax({
        type: 'POST',
        url: baseUrl + 'switch_membership/' + mem_id,
        data: { award_code: $(this).val()},  
        success : function( data, status, xhr ) 
        { 
          if (url) window.location= url;  
        }
      }, "json");    
    });
    
    $('.select_all_county').live('click', function()
    {
      if ($(this).attr('checked') == 'checked') $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', true); 
      else  $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', false);
    }); 
  
    $('.select_all_district').live('click', function()
    {
      if ($(this).attr('checked') == 'checked') $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', true); 
      else  $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', false);
    });
    
    $('.select_all_localarea').live('click', function()
    {
      if ($(this).attr('checked') == 'checked') $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', true); 
      else  $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', false);
    });
    
    $('.select_all_lvl').live('click', function()
    {
      if ($(this).attr('checked') == 'checked') $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', true); 
      else  $(this).parents('td').next().find('input[type="checkbox"]').attr('checked', false);
    });
    
    $("#selall").live('click', function() 
    {
      if  (!$("#selall").is(":checked"))
      {
        $(".checkbox").removeAttr("checked");
      }
      else
      {
        $(".checkbox").attr("checked","checked");
      }

    });
    
    $('.register_and_upload_photo_next').live('click', function()
    {
        _this= $(this);
        var form = $('form[name="register_and_upload_photo"]');
        $('input[name="register_next"]').val(_this.attr('href')); 
        form.submit();  
        
        return false;
    });
    
    $('input[name="purchase_company"]').live('click', function()
    {
        var company_id =  $(this).val();
        $("#purchase_choose_company").attr("href", baseUrl + "purchase/" + company_id +"/addresses");
    });
    
    $('input[name="purchase_address"]').live('click', function()
   {
      var address_id =  $(this).val();  
     // $("#purchase_choose_company").attr("href", baseUrl + "purchase/" + address_id + "/set_address/"  );
   }); 
   
   
   $('input[name="county_back"]').live('click', function()
   { 
         var form = $('form[name="add_county_form"]');
         form.submit(); 
   }); 
   $('input[name="county_next"]').live('click', function()
   { 
         var form = $('form[name="add_county_form"]');
         $('input[name="step_number"]').val(2);
         form.submit(); 
   });
      $('input[name="district_back"]').live('click', function()
   { 
         var form = $('form[name="add_district_form"]');
         $('input[name="step_number"]').val(3);
         form.submit(); 
   });
   $('input[name="district_next"]').live('click', function()
   { 
         var form = $('form[name="add_district_form"]');
         $('input[name="step_number"]').val(4);
         form.submit(); 
   });
   $('input[name="localarea_back"]').live('click', function()
   { 
         var form = $('form[name="add_localarea_form"]');
         $('input[name="step_number"]').val(5);
         form.submit(); 
   });
   $('input[name="localarea_next"]').live('click', function()
   { 
         var form = $('form[name="add_localarea_form"]');
         $('input[name="step_number"]').val(6);
         form.submit(); 
   });
   
   $('input[name="no_more_company_positions"]').live('click', function()
   {
       window.location=baseUrl+ 'register/company_positions';                               
   }); 

   if ($("#display_specialism").length)
   {
     $("#display_specialism").treeview({
      animated: "fast",
      collapsed: true,
      unique: true
     }); 
     $("#display_specialism li:first div:first").click();
   }
  
        $('#fab_company_award_form_award_type').change(function()
   {   
     if($(this).val()!=0)
        {
           $.ajax({
    type: 'POST',
    url: baseUrl + 'Profile/GetAwardPhoto',
    data: { award_code: $(this).val()},  
    success : function( data, status, xhr ) { 
      $(".award_photo").html(data);
    }
  }, "json"); 
        }
    else   $(".award_photo").html(null);  
   }); 
   
   if ($('.widget_other').val() === '0') $('.widget_other').parent().find('.widget_other_text').removeClass('hidden');
   else $('.widget_other').parent().find('.widget_other_text').addClass('hidden'); 
   $('.widget_other').change(function(){ 
     if($(this).val() == 0)  $(this).parent().find('.widget_other_text').removeClass('hidden');
     else {
       $(this).parent().find('.widget_other_text').addClass('hidden'); 
       // $(this).next('.widget_other_text').val('')
     }
   });
   
   $(".colorbox_gallery").each(function(){
     $(this).colorbox({rel: $(this).attr('group_class'), opacity: 0.7});    
   });
   
   if ($('.company_autocompl').length) companyAutocomplete();  
   
    if ($('.trade_company_autocompl').length) companyTradeAutocomplete();  
   
   
   
   if ($('#frm_company_positions').length)
   { 
     var role_list = new FabListAB('#frm_company_positions'); 
     role_list.save= function()
     {
        var csl = "",
        kol = this.items.length - 1;
        //????????? ??? ?????? ?? ??????
        for (var i = 0; i < this.items.length; i++) { 
         (i == kol) ? csl += this.items[i][0] : csl +=  this.items[i][0] + "|" ;
        }
        this.$list_b_items_csl.attr("value",csl);        
        $(this.formId).submit();  
     }
     
     if ($('input[name="person_roles"]').length) 
      {
        var roles = $('input[name="person_roles"]').val(); 
        if (roles)
        {
          var role_array  = roles.split(',');
          for (var i = 0; i < role_array.length; i++) 
          {
              $('#frm_company_positions select').val(role_array[i]);
              role_list.addWrapper();
          }
        }
      }
   }
   
   if ($('input[name="issue_questions[question_1]"]').length) 
    {
        $('input[name="issue_questions[question_1]"]').live('click', function()   
        {
          var value = $(this).attr('value');   
          if(value==0) 
            {
              $('#error_1').removeClass('hidden');
              $('input[name="enter_answers"]').attr('disabled','disabled');
            }
          else  
            {
              $('#error_1').addClass('hidden');
              var answer_2 = $('input[name="issue_questions[question_2]"]:checked').val();
              if(answer_2) $('input[name="enter_answers"]').removeAttr("disabled", "disabled"); 
            }
        });
    }

   if ($('input[name="issue_questions[question_2]"]').length) 
    {
        $('input[name="issue_questions[question_2]"]').live('click', function()   
        {
          var answer_1 = $('input[name="issue_questions[question_1]"]:checked').val();
          if(answer_1==1) $('input[name="enter_answers"]').removeAttr("disabled", "disabled"); 
        });
    }
   
   if ($('input[name="qualifying_questions[question_1]"]').length) 
    {
        $('input[name="qualifying_questions[question_1]"]').live('click', function()   
        {
          var value = $(this).attr('value');   
          if(value==0) 
            {
              $('#error_1').removeClass('hidden');
              $('input[name="enter_answers"]').attr('disabled','disabled');
            }
          else  
            {
              $('#error_1').addClass('hidden');
              $('input[name="enter_answers"]').removeAttr("disabled", "disabled");    
            }
        });
    } 
   
   if ($('input[name="applicant_address[enter_selection]"]').length) 
    {
        if ($('input[name="applicant_address[address]"]').length) 
        {
            $('input[name="applicant_address[address]"]').live('click', function() 
            {
               if(checkContactChosen()&&checkTalkChosen()) $('input[name="applicant_address[enter_selection]"]').removeAttr("disabled", "disabled");     
            });
        }
        if ($('input[name="applicant_address[mobile]"]').length) 
        {
            $('input[name="applicant_address[mobile]"]').live('click', function() 
            {
                if(checkAddressChosen()&&checkTalkChosen()) $('input[name="applicant_address[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
        if ($('input[name="applicant_address[email]"]').length) 
        {
            $('input[name="applicant_address[email]"]').live('click', function() 
            {
                if(checkAddressChosen()&&checkTalkChosen()) $('input[name="applicant_address[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
        if ($('input[name="applicant_address[phone]"]').length) 
        {
            $('input[name="applicant_address[phone]"]').live('click', function() 
            {
                if(checkAddressChosen()&&checkTalkChosen()) $('input[name="applicant_address[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
        if ($('input[name="applicant_address[available]"]').length) 
        {
            $('input[name="applicant_address[available]"]').live('click', function() 
            {
                if(checkAddressChosen()&&checkContactChosen()) $('input[name="applicant_address[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
      
    }
    
    if ($('input[name="applicant_address_member[enter_selection]"]').length) 
    {
        if ($('input[name="applicant_address_member[mobile]"]').length) 
        {
            $('input[name="applicant_address_member[mobile]"]').live('click', function() 
            {
                if(checkTalkChosen()) $('input[name="applicant_address_member[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
        if ($('input[name="applicant_address_member[email]"]').length) 
        {
            $('input[name="applicant_address_member[email]"]').live('click', function() 
            {
                if(checkTalkChosen()) $('input[name="applicant_address_member[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
        if ($('input[name="applicant_address_member[phone]"]').length) 
        {
            $('input[name="applicant_address_member[phone]"]').live('click', function() 
            {
                if(checkTalkChosen()) $('input[name="applicant_address_member[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
        if ($('input[name="applicant_address_member[available]"]').length) 
        {
            $('input[name="applicant_address_member[available]"]').live('click', function() 
            {
                if(checkContactChosen()) $('input[name="applicant_address_member[enter_selection]"]').removeAttr("disabled", "disabled");  
            });
        }
      
    }
    
    
    
    
    if ($('input[name="fab_work_issue[company_membership_id]"]').length) 
    {
        $('input[name="fab_work_issue[company_membership_id]"]').change(function() 
        {  
          $.ajax({
          'url' : baseUrl +  'issue/get_company',
          'data': {value : $(this).attr('value')},
          'type': "POST",
          'dataType': 'json'
          }).done(function(data) {
             $('#company_box').html(data.name);
            });
        }); 
    }  
    
   if ($('input[name="project_address_query[question_1]"]').length) 
    {
        $('input[name="project_address_query[question_1]"]').live('click', function()   
        {
          var value = $(this).attr('value');   
          if(value) $('input[name="enter_answers"]').removeAttr("disabled", "disabled");                
        });
    } 
   
   
  $('.new_spec_button').live('click', function(){
        //validateContact('email', addNewEmail);
        addNewSpec();
        function addNewSpec()
        {
          tr_email= $('.new_spec.last');
          div_parent= tr_email.parent();
          tr_email_remove= div_parent.find('.remove_spec_button:first');
          new_div_parent= div_parent.clone(true);
          new_div_parent.find('.error_list').remove()
          div_parent.after(new_div_parent);
          //tr_email.hide();
          tr_email.removeClass('last');
          new_index= parseInt(tr_email.attr('data-index')) + 1;
          new_name= 'specs[' + new_index + ']';
          tr_email= $('.new_spec.last');
          //tr_email.after(tr_email_remove.clone(true));
          tr_email_remove.show();
          tr_email.attr('name', new_name);
          tr_email.attr('data-index', new_index);
          tr_email.val('');
          //tr_email.before('<br />');
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
      tr_email.focus();
        }
      }); 
      
  $('.remove_spec_button').live('click', function(){
        $(this).parent().remove();
        //$(this).next('br:first').remove();
        //$(this).remove();
          
      }); 

      $('form.spec_missing').submit(function(){
        form= $(this);
        validateSpec(ifvalid);
        function ifvalid()
        {
          form.unbind('submit');
          form.submit();
          
          return true; 
          
        }

        return false;
      });

 function validateSpec(callback)
    {
      specs= new Array();
      specs_tags= $('.new_spec');
      specs_tags2= new Array();
      ii= specs.length;
      spec_length = specs_tags.length; 
      for (i=0; i< spec_length; i++)
      {
        element = specs_tags[i];
        specs_tags2[i]= element;
        specs[i]= $(element).val();   
      }
    
      $.ajax({
        type: 'POST',
        url: baseUrl + '/specialism_missing/validate_all',
        data: { 'type': 'all', 'specs': specs },  
        success : function( data, status, xhr ) 
        { 
         $('.error_contact').remove(); 
         $('.error_list').remove(); 
          is_error= false;
          if (typeof(data.errors_specs) === 'undefined' || data.errors_specs.length != 0)
          {
            for (var key in data.errors_specs)
            {
              error_str= getValidateContactError(data.errors_specs[key]);
              spec_tag= specs_tags2[key];
              $(spec_tag).before(error_str);    
            }  
  
            is_error= true;
          }
          if (typeof initPlaceholders === 'function') initPlaceholders(); 
          
          if (is_error) return true;
             
          callback();
          return true;    
        }
        },'json');  
    }   
    
    $(".cover_note").each(function(){
     $(this).colorbox({ opacity: 0.7});
   });
     if ($('.profile1-expand').length) 
    {
          $(".profile1-expand").hide();
          $(".profile1-arrow").live('click', function()
          {
            $(this).parent().find(".profile1-expand").slideToggle('fast', function() {  $(this).parent().find(".profile1-expand").toggleClass('openfull', $(this).is(':visible')); }  );
          });
    }

       
   
});

function showImageInsurance()
{
	$(".cover_note").each(function(){
     $(this).colorbox({ opacity: 0.7});
   });
     if ($('.profile1-expand').length) 
    {
          $(".profile1-expand").hide();
          $(".profile1-arrow").live('click', function()
          {
            $(this).parent().find(".profile1-expand").slideToggle('fast', function() {  $(this).parent().find(".profile1-expand").toggleClass('openfull', $(this).is(':visible')); }  );
          });
    }
}

function getValidateContactError(error_str)
    {
      html= '<ul class="error_list error_contact"><li>' + error_str + '</li></ul>';
      return html;
    }

function checkContactChosen()
{
   if ($('input[name="applicant_address[mobile]"]').length) 
          {
              var answer_mobile = $('input[name="applicant_address[mobile]"]:checked').val();
              if(answer_mobile) return true 
          }
   if ($('input[name="applicant_address[email]"]').length) 
          {
              var answer_email = $('input[name="applicant_address[email]"]:checked').val();
              if(answer_email) return true 
          }
   if ($('input[name="applicant_address[phone]"]').length) 
          {
              var answer_phone = $('input[name="applicant_address[phone]"]:checked').val();
              if(answer_phone) return true 
          }
   if ($('input[name="applicant_address_member[mobile]"]').length) 
          {
              var answer_mobile = $('input[name="applicant_address_member[mobile]"]:checked').val();
              if(answer_mobile) return true 
          }
   if ($('input[name="applicant_address_member[email]"]').length) 
          {
              var answer_email = $('input[name="applicant_address_member[email]"]:checked').val();
              if(answer_email) return true 
          }
   if ($('input[name="applicant_address_member[phone]"]').length) 
          {
              var answer_phone = $('input[name="applicant_address_member[phone]"]:checked').val();
              if(answer_phone) return true 
          }
   return false;
}

function checkAddressChosen()
{
   if ($('input[name="applicant_address[address]"]').length) 
          {
              var answer_mobile = $('input[name="applicant_address[address]"]:checked').val();
              if(answer_mobile) return true 
          }
   return false;
}

function checkTalkChosen()
{
   if ($('input[name="applicant_address[available]"]').length) 
          {
              var answer_available = $('input[name="applicant_address[available]"]:checked').val();
              if(answer_available) return true 
          }
   if ($('input[name="applicant_address_member[available]"]').length) 
          {
              var answer_available = $('input[name="applicant_address_member[available]"]:checked').val();
              if(answer_available) return true 
          }
   return false;
}


$(document).ready(function(){selectSP= new selectSpecialist($('.specialism_select_widget'));});

function selectSpecialist(widget_body) 
{
  _this= this;
  this.widget_body= widget_body; 
  this.title1= $('.specialism_select1_title');
  this.title2= $('.specialism_select2_title');
  this.title_foot1= $('.specialism-level_1'); 
  this.title_foot2= $('.specialism-level_2');
  this.description2= $('.specialism_select2_description');
  this.description2gb= $('.specialism_select2gb_description');
  this.multi_trade_id= $('.multi_trade_id').val();
  this.level2_column_title= widget_body.find('.specialism_column_title2');
  this.next_button= $('.purchase_specialism_next');
  
  this.init();
}

selectSpecialist.prototype.init= function()
{
  _this= this;
  this.widget_body.find('.specialism_level_one .item_row').live('click', function(){
    _this.changeLevel2item($(this));  
  });  
  $('.scroll-pane').each(function(){
    if ($.trim($(this).html()) !== "") $(this).jScrollPane();   
  });
  /*$('.specialism_level_two').html('<div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div><div class="cl91"><input class="styled" type="checkbox"> <div class="cl92">Bricks</div></div>');
  $('.scroll-pane').each(function(){
    if ($.trim($(this).html()) !== "") $(this).jScrollPane();   
  });*/
  /*$('.specialism_column').each(function(){
    if (!$(this).find('.mCustomScrollBox').length)
    {
      $(this).mCustomScrollbar({
        advanced:{
          updateOnContentResize: true
        }
      })
    }
  }); */    
  
  _this.next_button.live('click', function(){
    _this.selectLevel2();    
  }); 
          
}

selectSpecialist.prototype.selectLevel2= function()
{
  checked= this.widget_body.find('.specialism_level_two input:checked'); 
  spec_id= false;
  level2_val= new Array();
  i= 0;
  $(checked).each(function(){
    level2_val[i]= $(this).attr('data-id'); 
    i++; 
  });   
  to_finish= false;
  if ($('.specialism_level_one .not_children.selected_specialism').length) to_finish= $('.specialism_level_one .not_children.selected_specialism').attr('data-id');
  if (level2_val.length || to_finish)
  {
    $.post(baseUrl + 'purchase/setSpecialismLevelThree', {spec_id: spec_id, level: 3, 'selected_lvls2[]': level2_val, 'to_finish': to_finish}, function(data){
      if (data==='finish') window.location.href= baseUrl + 'purchase/setSpecialismAll';
      else window.location.href= baseUrl + 'purchase/setSpecialismLevelThree';
    });
  }
}

selectSpecialist.prototype.changeLevel2item= function(_item)
{
  parent_id= _item.attr('data-id');
  $('.specialism_level_one .selected_specialism').each(function(){
    $(this).removeClass('selected_specialism');
  });
  _item.addClass('selected_specialism');
  if (!_item.hasClass('not_children'))
  {
    $.ajax({
        type: 'POST',
        url: baseUrl + 'purchase/getSpecialismLevelTwo',
        data: { parent_id: parent_id},  
        success : function( data, status, xhr ) 
        { 
          if (data) 
          {      
            if ($('.specialism_level_two .jspPane').length) 
            {
                $('.specialism_level_two .jspPane').html(data.html);
                $('.specialism_level_two .jspTrack').show();  
            }
            else 
            {
                $('.specialism_level_two').html(data.html); 
            }
          }
          if (typeof(Custom) !== 'undefined') Custom.init();
          $('.scroll-pane').each(function(){
            if ($.trim($(this).html()) !== "") $(this).jScrollPane();
          });
          /*$('.specialism_column').each(function(){
            if (!$(this).find('.mCustomScrollBox').length)
            {
              $(this).mCustomScrollbar({
                advanced:{
                  updateOnContentResize: true
                }
              })
            }
          });*/
          _this.title1.hide();
          _this.title2.show();
          _this.title_foot1.hide();
          _this.title_foot2.show();
          if (_this.multi_trade_id && _this.multi_trade_id === parent_id)
          {
            _this.description2.hide();
            _this.description2gb.show();
          }
          else 
          {
            _this.description2.show();
            _this.description2gb.hide();
          }
          _this.level2_column_title.show();
        }
      }, "json");
  }
  else
  {
   // $('.specialism_level_two').html('');
    if ($('.specialism_level_two .jspPane').length) 
        {
            $('.specialism_level_two .jspPane').html('');
            $('.specialism_level_two .jspTrack').hide(); 
        }
        else 
        {
            $('.specialism_level_two').html(''); 
        }
    
    
    _this.title1.show();
    _this.title2.hide();  
    _this.title_foot1.show();
    _this.title_foot2.hide();
    _this.title2.hide(); 
    _this.description2.hide();
    _this.description2gb.hide();    
    _this.level2_column_title.hide();
  }
}

$(document).ready(function(){
  $('.purchase_specialism_next_3').live('click', function(){
    checked= $('.specialism_level_three input:checked'); 
    level3_val= new Array();
    i= 0;
    $(checked).each(function(){
      level3_val[i]= $(this).attr('data-id'); 
      i++; 
    });  
    spec_id= $(this).attr('data-next');
    tolvl4= false;
    if (!spec_id) tolvl4= true;
    if (level3_val.length)
    {
      $.post(baseUrl + 'purchase/setSpecialismLevelThree', {spec_id: spec_id, 'selected_lvls3[]': level3_val, to_lvl4: tolvl4 }, function(data){
        if (data==='finish') window.location.href= baseUrl + 'purchase/setSpecialismAll';
        else $('.purchase_specialism_next_3').parents('form:first').submit();//window.location.href= baseUrl + 'purchase/setSpecialismLevelThree';
      });
    }
    //return false;  
  });
});

function companyAutocomplete () {      
    $('.company_autocompl').each(function(){
      var input = $(this);
      var input_id;
      if (input.attr('data-index')) input_id= $('input.company_id_autocompl[data-index="' + input.attr('data-index') + '"]');
      else input_id= $('input.company_id_autocompl'); 
      input.autocomplete({
          minLength: 3,
          source: function(request, response) {
                input_id.val(null); 
                request.value = input.val();                 
                $.ajax({
                'url': baseUrl + 'register/get_company/',
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
                value = value.replace(/\s+$/, "");  
                input.val(value);
                input_id.val(ui.item.id);   
                return false;                
          }     
      });
    
    //*****если есть атрибут def-val= true при загрузке страницы подгружается автокомплит при заполненном поле  
    default_val_attr= $(this).attr('def-val');
    
    if (typeof(default_val_attr) === 'undefined' || default_val_attr == false)
    {  
        if ($(this).val() != "" && $(this).val() !== $(this).attr('placeholder')) { $(this).trigger('keydown.autocomplete'); }
    }
    
    });

    var putValueToField = function(value) 
    {
      var data = [];
      $.each(value, function(i, val) 
        {   

         data.push({value: val.company_name, id: val.id}); 
        });
      return data;       
    }                
}   


function companyTradeAutocomplete () {      
    $('.trade_company_autocompl').each(function(){
      var input = $(this);
      var input_id;
      if (input.attr('data-index')) input_id= $('input.company_id_autocompl[data-index="' + input.attr('data-index') + '"]');
      else input_id= $('input.company_id_autocompl'); 
      input.autocomplete({
          minLength: 3,
          source: function(request, response) {
                input_id.val(null); 
                request.value = input.val();                 
                $.ajax({
                'url': baseUrl + 'register/get_trade_company/',
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
                value = value.replace(/\s+$/, "");  
                input.val(value);
                input_id.val(ui.item.id);   
                return false;                
          }     
      });
    
    //*****если есть атрибут def-val= true при загрузке страницы подгружается автокомплит при заполненном поле  
    default_val_attr= $(this).attr('def-val');
    
    if (typeof(default_val_attr) === 'undefined' || default_val_attr == false)
    {  
        if ($(this).val() != "" && $(this).val() !== $(this).attr('placeholder')) { $(this).trigger('keydown.autocomplete'); }
    }
    
    });

    var putValueToField = function(value) 
    {
      var data = [];
      $.each(value, function(i, val) 
        {   

         data.push({value: val.company_name, id: val.id}); 
        });
      return data;       
    }                
}     

togglepanels = function(_this){
  return _this.each(function(){
    $(this).find('.expand_all').live('click', function(){
      if ($(this).hasClass('close_act'))
      {
        $(this).parent().find("h3.ui-state-active").click(); 
      }
      else
      {
        $(this).parent().find("h3:not(.ui-state-active)").click();    
      }
      //$(this).toggleClass('close_act');       
    });
    $(this).addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
  .find("h3")
    .addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-top ui-corner-bottom")
    .hover(function() { $(this).toggleClass("ui-state-hover"); })
    .prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>')
        .live('click', function() {
        if ($.trim($(this).next().html()))
        {       
          $(this)
            .toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom")
            .find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
            .next().slideToggle();
        }
        if (!$(this).parent().find("h3.ui-state-active").length)
        {
          $(this).parent().find('.expand_all').removeClass('close_act');  
        }
        if(!$(this).parent().find("h3.has_childrens:not(.ui-state-active)").length)
        {
          $(this).parent().find('.expand_all').addClass('close_act');    
        } 
      return false;
    })
    .next()
      .addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom")
      .hide();
  });
};    
$(document).ready(function(){
  togglepanels($(".notaccordion"));
});

$(document).ready(function(){
  if ($('.getfeed-back1-content').length)
  {
      $('input[class="styled"]').live('click', function()
      {
           $(this).parent().parent().find('.active').removeClass('active');   
           $(this).parent().find('label').addClass('active');
      });
  }
  
});

$(document).ready(function(){
  $(function()
  {
    if ($('.scroll-pane').length)
    {
      $('.scroll-pane').each(function(){
        if ($.trim($(this).html()) !== "") $(this).jScrollPane();   
      });
    }
  }); 
});

$(document).ready(function() {
  $(".cl49 a").live('click', function()
  {
     $(this).parents( '.expcont').slideToggle('fast', function() { $(this).parent().find(".jobs-list-show").toggleClass('openfull', $(this).is(':visible')); } );
  });

  $(".cl47 a").live('click',function()
  {
    job_id = $(this).attr('job_id');
    var select = $(this).closest(".cl45");  
    var select2 = $(this).parents(".offered-works:first").find('.most-recent-offer'); 
    $.ajax({
      type: 'GET',
      url: baseUrl + 'show_another_member/' + job_id,
      data: { award_code: $(this).val()},  
      success : function( data, status, xhr ) 
      { 
          var no_offer = data.no_offer ;   
          var response_id = jQuery(this).attr('response_id');
          jQuery.ajax({
          type: 'GET',
          url: baseUrl + 'write_member',
          data: { company_id: data.company_id, membership_id: data.membership_id  },  
          success : function( data, status, xhr ) 
          { 
              $(select2).remove();
              jQuery(data).insertBefore(select);  
              if(no_offer == 'true')  $(select).remove();                     
          }
          },'html');
      }
    }, "json");    
  });
});

function initCustomCenterWrap(element)
{
  var attr_w = element.attr('data-cwidth');
  var attr_h = element.attr('data-cheight');
  var attr_mt = element.attr('data-mint');
  var attr_ml = element.attr('data-minl');
  if (!attr_mt) attr_mt= 0;
  if (!attr_ml) attr_ml= 0;
  
  //custom set width center
  if (typeof(attr_w) !== 'undefined' && attr_w !== false)
  {
    el_w= parseInt(element.outerWidth());
    bl_w= parseInt(attr_w);
    if (el_w>= bl_w/5)
    {
      mr_w= (bl_w - el_w)/2;
      if (mr_w>= attr_ml) element.css('margin-left', mr_w);
    }
  } 
  
  //custom set height middle
  if (typeof(attr_h) !== 'undefined' && attr_h !== false)
  {
    el_h= parseInt(element.outerHeight());
    bl_h= parseInt(attr_h);
    if (el_h>= bl_h/5)
    {
      mr_h= (bl_h - el_h)/2;
      if (mr_h>= attr_mt) element.css('margin-top', mr_h);
    }
  } 
}

function initCustomBottomWrap(element)
{
  var attr_h = element.attr('data-cheight');
  var attr_mt = element.attr('data-mint');
  var attr_ml = element.attr('data-minl');
  if (!attr_mt) attr_mt= 0;
  if (!attr_ml) attr_ml= 0;
  
  //custom set height middle
  if (typeof(attr_h) !== 'undefined' && attr_h !== false)
  {
    el_h= parseInt(element.outerHeight());
    bl_h= parseInt(attr_h);
    if (el_h>= bl_h/5)
    {
      mr_h= bl_h - el_h;
      if ((mr_h>0)&&(mr_h>= attr_mt)) element.css('margin-top', mr_h);
      else element.css('margin-top', 0);
    }
  } 
}

function initCustomCenter()
{
  $('.custom_center').each(function()
  {
    element= $(this);
    if (element.find('img:visible'))
    {
      element.find('img:visible').each(function(){
        $(this).load(function(){initCustomCenterWrap(element)});  
      });
    } 
    
    initCustomCenterWrap(element); 
  });  
  
  $('.custom_bottom').each(function()
  {
    element= $(this);
    if (element.find('img:visible'))
    {
      element.find('img:visible').each(function(){
        $(this).load(function(){initCustomBottomWrap(element)});  
      });
    } 
    
    initCustomBottomWrap(element);   
  });
}

function initLimitText()
{
    $('.limit_required').each(function()
      {
        element= $(this);
        limitText($(this)); 
        element.unbind('keydown.key_down_image_title');   
        element.bind('keydown.key_down_image_title', function()
        {
           limitText($(this));  
        }); 
      
        element.unbind('keyup.key_up_image_title');   
        element.bind('keyup.key_up_image_title', function()
        {
           limitText($(this));  
        });  
        
       
      });

}

function limitText(limitField)
{
     var limit_number = parseInt(limitField.attr('limit'));
     if (!limit_number) limit_number = 255; 
    
   if (limitField.val().length > limit_number) 
   {
        limitField.val(limitField.val().substring(0, limit_number));
   } 
}

/* custom center */
$(document).ready( function() {
  initCustomCenter();
  initLimitText() 
});
/*end custom center  */

//to apply: if (typeof baseInit === 'function') baseInit(); 
function baseInit()
{
  if (typeof initPlaceholders === 'function') initPlaceholders();
  if (typeof Custom !== 'undefined') Custom.init();
  if (typeof initSelectBox !== 'undefined') initSelectBox(); 
  if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
}

function initSelectBox()
{
  if ($('.b-select_box').length) 
  {
    $("select.b-select_box").selectBox(); 
    $('.b-select_box').each(function(){
      if ($(this).val() && (($(this).val() !== '0') || (($(this).val() == '0') && ($(this).children(":selected").text() == '00'))))  
      {
        if ($(this).next().hasClass('b-select_box')) $(this).next().addClass('active_font');
      }
      else
      {
        if ($(this).next().hasClass('b-select_box')) $(this).next().removeClass('active_font'); 
      }  
    });
    $('.b-select_box').change(function(){
      if ($(this).val() && (($(this).val() !== '0') || (($(this).val() == '0') && ($(this).children(":selected").text() == '00'))))
      {
        if ($(this).next().hasClass('b-select_box')) $(this).next().addClass('active_font');
      }
      else
      {
        if ($(this).next().hasClass('b-select_box')) $(this).next().removeClass('active_font'); 
      }   
    });
  }  
}

/* custom select */
$(document).ready( function() {
  initSelectBox();
});
/*end custom select  */

$(document).ready(function()
{  
  initBuildForm();
  function initBuildForm()
  {
    $('select[name="build_membership_form[company_type]"]').change(function () 
    {
      var company_type_not_reg_ar = $('.company_type_not_required').val().split(',');
      var company_type = $(this).val();
      if(company_type) 
      {
          if ($.inArray(company_type, company_type_not_reg_ar) !== -1) $(".reg_block").addClass('hidden');
          else $(".reg_block").removeClass('hidden');
      }
    }); 
    $('#build_profile_form').ajaxForm(function(data) 
    { 
      $('.build_form').html(data); 
      if (typeof(Custom) !== 'undefined') Custom.init();
      if (typeof initPlaceholders === 'function') initPlaceholders(); 
      if ($('.b-select_box').length) $("select.b-select_box").selectBox();
      initBuildForm();                                                 
    });
  }
//flash messages
    if($('.flash_error.autoclose').length) $('.flash_error.autoclose').show(300,
        function()
        {
            $(this).css('display', 'table');
        })
    .delay(3000).fadeOut();
    
    if($('.flash_error.manualclose').length) 
    {   
        $('.flash_error.manualclose').show(
            300,
            function()
            {
                $(this).css('display', 'table');
            }
        );  
        
        $('.flash_error.manualclose .close').live('click', function()
        {
            $(this).parent().fadeOut();
        });
    } 
    if($('.flash_error.error').length) 
    {
        $('.flash_error.error').show(300,
        function()
        {
            $('.flash_error.error').css('display', 'table');
        }
        );
        $('.flash_error.error .close').live('click', function()
        {
            $(this).parent().fadeOut();
        });
    }   

    $('.change_mem_button').live('click', function() {
          //mem_id= $(this).parent().find('select[name="memberships"]').val();
          mem_id = $(this).closest('.modal-content').find('select[name="memberships"]').val();
          if (mem_id) {
              $.ajax({
                  type: 'POST',
                  url: baseUrl + 'switch_membership/' + mem_id,
                  data: {},
                  success : function( data, status, xhr )
                  {
                      location.reload();
                  }
              }, "json");
          }
    });
    
    $('.re-send_email').live('click', function(e) 
    { 
    //$('.re-send_email').live('click', function()
    //{
      $(this).parents('.sign-in').find('input[name="re-send"]').click();
      // $(this).parent().find('input[name="re-send"]').click();    
    });
    
 specialistAutocomplete($('form.prospect_form  input.new_specialism'));
 specialistAutocomplete($('form.prospect_form  input.specialism_edit'));  
 


var dir_districts =  $('.directory .districts_block');
var spec_id;

 
 $('.directory .spec_block .spec').live('click', function()
 {
     dir_districts.hide('slow');
     
     spec_id = $(this).attr('spec_id');        
     $('.directory .spec' + spec_id).show('slow');    
 });
 
var cities =  $('#bottom-navigation .city_block'); 
var city_name;
var city_id;
var breadcrumb =  $('#bottom-navigation .breadcrumb'); 
var specs =  $('#bottom-navigation .spec_block'); 
var spec_name;
var spec_slug;  
var districts =  $('#bottom-navigation .districts_block');
var static_links = $('#bottom-navigation .static-links');
var county_slug;
var district_slug;
var el_id; 
var el_data;
 
 $('#bottom-navigation .level1').live('click', function(){
    // event.preventDefault();    
     if($(this).hasClass('active')) 
     {
         if(!cities.is(":visible"))
         {
            cities.show();
         }
         else
         {
            $(this).removeClass('active');
            cities.hide();
            static_links.hide();
         }
         breadcrumb.find('span').remove();
     }
     else  
     {
         $(this).addClass('active');
         cities.show();
         static_links.show();
     }
     breadcrumb.find('a.nav_spec').remove();
     specs.hide();
     districts.hide();
     return false; 
 }); 
 
 $('#bottom-navigation .city').live('click', function(event)
 {
      //event.preventDefault();
      el_id = $(this).attr('id');
      el_data = el_id.split(":");
      city_name = el_data[0].split('_').join(' ');
      city_id = el_data[1];
      //if(!breadcrumb.find('a.nav_city').length) 
      breadcrumb.append('<span>' + city_name + '</span>');
     // else breadcrumb.find('a.nav_city').html('<span>' + city_name + '</span>'); 
      cities.hide();
      districts.hide(); 
      specs.show();
      return false;      
 });
 //$('#bottom-navigation .nav_city').unbind('click.nav_city');
 $('#bottom-navigation .nav_city').live('click', function()
 {
      //event.preventDefault();
      $(this).remove()   
      breadcrumb.find('span:last').html(city_name);
      specs.show(); 
      districts.hide(); 
      //cities.show(); 
      return false;  
 });  
  
 
  $('#bottom-navigation .spec').live('click', function()
 {
     // event.preventDefault(); 
      el_id = $(this).attr('id');
      el_data = el_id.split(":");
      spec_name = el_data[1].split('_').join(' '); 
      spec_name = spec_name.split('.').join(','); 
      spec_slug = el_data[0]; 
      //if(!breadcrumb.find('a.nav_spec').length) 
      breadcrumb.find('span:last').wrap("<a href='#' class='nav_city'></a>");
      breadcrumb.append('<span>' + spec_name + '</span>');
      //else breadcrumb.find('a.nav_spec').html('<span>' + spec_name + '</span>'); 
      specs.hide(); 
      
      $('#bottom-navigation .districts_block.city' + city_id).show();

     $('#bottom-navigation .district').each(function(){
         el_id = $(this).attr('id');
         el_data = el_id.split(".");
         county_slug = el_data[0];
         district_slug = el_data[1];
         $(this).attr('href',baseUrl + 'directory/' + county_slug + '/' + district_slug + '/' + spec_slug);
     });

     $('#bottom-navigation .district_group').each(function(){
         district_slug = $(this).attr('id');
         $(this).attr('href',baseUrl + 'directory/' + district_slug + '/' + spec_slug + '/list');
     });

      return false;   
 }); 
 
   $('#bottom-navigation .district').live('click', function()
 {
     //event.preventDefault(); 
     el_id = $(this).attr('id');
     el_data = el_id.split(".");
     county_slug = el_data[0];
     district_slug = el_data[1];  
     window.location = baseUrl + 'directory/'+ county_slug + '/' + district_slug + '/' + spec_slug;
     return false;  
 });

});

 function specialistAutocomplete (el) {        
    el.autocomplete({
        minLength: 3,
        source: function(request, response) { 
              request.value = el.val();                 
              $.ajax({
              'url': baseUrl + '/find_job/getSpecialismOne/',
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
              value= value.replace(/^.*?>\s/, ""); 
              el.val(value);
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


/* ----------- Ajax-валидация введенных пользователем значений в полях формы регистрации ---- */
 function attach_reg_ajax_validation()
{   
    // при изменении значения поля
    $('.validation').change( function() {
  
        var current_element = this;    //текущий элемент, на котором спозиционирован курсор
        var type_data;                 //тип элемента: емайл, логин, пароль
        var enter_data = this.value;   //содержимое элемента
        var additional_element = false;//добавочный элемент  (необходимо для пароля)
        
        var selectorColorboxPrefix = "";
        if ($(this).parents("#cboxLoadedContent").size() > 0)
            selectorColorboxPrefix = "#cboxLoadedContent ";

        if(this.id == "sf_guard_user_email_address")
            type_data = 'email';
        else if(this.id == "sf_guard_user_username")
            type_data = 'username';
        else if(this.id == "sf_guard_user_password_again" || this.id == "sf_guard_user_password")
        {
            type_data = 'password';
            enter_data = $(selectorColorboxPrefix+'#sf_guard_user_password').val() + '&' + $(selectorColorboxPrefix+'#sf_guard_user_password_again').val();
            if (current_element.id == 'sf_guard_user_password_again')
                additional_element =  $(selectorColorboxPrefix+'#sf_guard_user_password');    //необходимо для подсвечивания доп. поля
            else
                additional_element =  $(selectorColorboxPrefix+'#sf_guard_user_password_again');  //необходимо для подсвечивания доп. поля
  
        }
        else if (this.id == "sf_guard_user_first_name")
            type_data = 'first_name';
        else if (this.id == "sf_guard_user_last_name")
            type_data = 'last_name';
  
        $.ajax({
        type: 'POST', //тип запроса
        url: baseUrl + 'register/validate', //урл по умолчанию
        dataType: 'text',
        data: { 'enter_data': enter_data, 'type_data': type_data },
        success : function( data )
        {
            ProcessErrorMessage(current_element, type_data, data, additional_element);
        }
        });
    });
}


function ProcessErrorMessage(current_element, type_data, error, additional_element)
{

    var selectorColorboxPrefix = "";
        if ($(current_element).parents("#cboxLoadedContent").size() > 0)
            selectorColorboxPrefix = "#cboxLoadedContent ";
            
    var parent_current_element  =  current_element.parentNode;  //родитель нужен, для поиска в блоке отображенных ранее сообщений

    // скроем показанные через js ранее сообщения
    $('#error_list_'+type_data).hide();

    if(type_data == 'email' || type_data == 'username')
        $('.line4').hide();
    //Если до этого форма была засабмичена, элемент с классом error_list скрыть
    if($(parent_current_element).find('ul[class="error_list"]'))  $(parent_current_element).find('ul[class="error_list"]').hide();

    if (error)
    {

        //если сообщение слишком длинное удаляем второе сообщение, которое находится в правой колонке (только для email)
        if(error.length > 35 && type_data=='email')
        {
            if($(parent_current_element.parentNode).find('.error_list'))
                $(parent_current_element.parentNode).find('.error_list').hide(); // в этом div скрываем показанное ранее сообщение

            $(selectorColorboxPrefix+'#error_list_line2').html(error);
            $(selectorColorboxPrefix+'#error_list_line2').show();
        }
        else
        {
            //установим и покажем сообщение
            $(selectorColorboxPrefix+'#error_list_'+type_data).show();
            $(selectorColorboxPrefix+'#error_list_'+type_data).html(getHtml(error));

        }

        //подсветка полей
        checkHasClass(current_element, 'error', true);
        if(additional_element)
            checkHasClass(additional_element, 'error', true);


    }
    else
    {
        deleteErrorMessageAndBackLight(current_element);

        if(additional_element)
        {
            deleteErrorMessageAndBackLight(additional_element);
        }


    }
}

function getHtml(data)
{
    html= '<li>' + data +'</li>';
    return html;
}

function checkHasClass(element, my_class, type)
{
    if (type)
    {
        if(!$(element).hasClass(my_class)) $(element).addClass(my_class);
    }
    else
    {
        if($(element).hasClass(my_class))  $(element).removeClass(my_class);
    }
}

//метод удаляет сообщение и подсветку поля
function deleteErrorMessageAndBackLight(element)
{
    if($(element.parentNode).find('ul[class="error_list"]'))
        $(element.parentNode).find('ul[class="error_list"]').hide(); // в этом div скрываем показанное сообщение ранее, в случае успеха

    checkHasClass(element, 'error', false);  //удаляем подсветку
} 
