$(document).ready(function(){
    $('.question_one_no').live('click', function(){
        $('.error_list').removeClass('hidden');
        $('.question_two').addClass('hidden');
        $('.question_one_yes').addClass('grey');
        $('.question_one_no').removeClass('grey');
        $('.question_two_no').removeClass('grey');
        $('.question_two_yes').removeClass('grey');
        $('.error_list2').addClass('hidden');
    });
    $('.question_one_yes').live('click', function(){
        $('.error_list').addClass('hidden');
        $('.question_two').removeClass('hidden');
        $('.question_one_no').addClass('grey');
        $('.question_one_yes').removeClass('grey');
        $('.question_two_no').removeClass('grey');
        $('.question_two_yes').removeClass('grey');
        $('.error_list2').addClass('hidden');
    });
    $('.question_two_no').live('click', function(){
        $('.error_list2').removeClass('hidden');
        // $('.question_three').addClass('hidden');
        $('.question_two_yes').addClass('grey');
        $('.question_two_no').removeClass('grey');
    });
    $('.question_two_yes').live('click', function(){
        $('.error_list2').addClass('hidden');
        $('.question_two_no').addClass('grey');
        $('.question_two_yes').removeClass('grey');
        // $('.question_three').removeClass('hidden');
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

    $('.select_address_button').live('click', function(){
        if($('input[name="job"]:checked').length)
        {
            $('.select_address_id').val($('input[name="job"]:checked').val());
            $('form.select_address').submit();
        }
        else $('#postajob-main').find('.error_list').removeClass('hidden');
    });

    $("input[name='job']").change(function()
    {
        if(!$('#postajob-main').find('.error_list').hasClass('hidden')) $('#postajob-main').find('.error_list').addClass('hidden');
    });

    $('.question_one_no').live('click', function(){
        $('.error_list').removeClass('hidden');
        $('.question_two').addClass('hidden');
        $(this).removeClass('grey');
        $('.question_one_yes').addClass('grey');
        $('.question_two_no').removeClass('grey');
        $('.question_two_yes').removeClass('grey');
    });
    $('.question_one_yes').live('click', function(){
        $('.error_list').addClass('hidden');
        $('.question_two').removeClass('hidden');
        $('.question_one_no').addClass('grey');
        $(this).removeClass('grey');
        $('.question_two_no').removeClass('grey');
        $('.question_two_yes').removeClass('grey');
    });
    $('.question_two_no').live('click', function(){
        $('.error_list2').removeClass('hidden');
        $(this).removeClass('grey');
        $('.question_two_yes').addClass('grey');
        // $('.question_three').addClass('hidden');
    });
    $('.question_two_yes').live('click', function(){
        $('.error_list2').addClass('hidden');
        $(this).removeClass('grey');
        $('.question_two_no').addClass('grey');
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
});