$(document).ready(function(){
    $('.wish_dd_no').live('click', function(){
        $('.error_list').removeClass('hidden');
        $('.dd_next').addClass('hidden');
        $('.wish_dd_no').removeClass('grey');
    });
    $('.wish_dd_yes').live('click', function(){
        $('.error_list').addClass('hidden');
        $('.dd_next').removeClass('hidden');
        $('.wish_dd_no').addClass('grey');
    });

    $('.next_step').live('click', function(){
            if (!$('input[name="ddi_pay_type"]').is(':checked'))
            {
                $('.pay_type_error').removeClass('hidden');
            }
            else
            {
                var url = $('input[name="ddi_pay_type"]:checked').attr('data-url');
                window.location= url;
            }
        }
    );

    $('.message_button_yes').live('click', function(){
        $('.message-box').removeClass('hidden');
        $('.link_message_button_no').addClass('grey');
    });
    $('.message_button_no').live('click', function(){
        $('.message-box').addClass('hidden');
    });
    $('.message_number').live('change', function(){
        if($(this).val()==1)
        {
            $('.message-number-box').removeClass('hidden');
            $('input[name=submit_button]:first').addClass('hidden');
        }
        if($(this).val()==2)
        {
            $('.message-number-box').addClass('hidden');
            $('input[name=submit_button]:first').removeClass('hidden');
        }
    });
    $('.sms_next').live('click', function(){
        if ($('.message_number').val() === '0') return false;
    });
    //NU - 13/03/2015
	if($('input[id="promocode"]').is(':checked'))
	    $('.block_promo_code').show("slow");
	$('input[name="groups"]').live('change', function(){
	    if($(this).val()==6) //promo code
        {
            $('.block_promo_code').show("slow");
        }  
		else
		{
		    $('.block_promo_code').hide("slow");
			//нужно удалить ошибки
			if($('#fab_promo_code_form_promo_code').hasClass('error')) $('#fab_promo_code_form_promo_code').removeClass('error');
			$('.promo_error').find('ul').remove();
			
		}	
	})
	
    /*дэактивируем кнопку отправки формы*/
    $('form[name="ddi_online"]').submit(function() 
    { 
        $('input[value="next step"]').attr("disabled", "disabled");
    })
    $('div.yesnobutton.ddi_confirm a').live('click',function(){
        $('div.yesnobutton a').addClass('disabled');
    })    
	
	//сажаем datepicker на поле, только если установлен params (сажается в виджете)
    if($('#free_to_pay_form_ddi_start_date').length > 0 && typeof(params) != 'undefined')
	{
		$("#free_to_pay_form_ddi_start_date").datepicker(params); 
	}
	
});