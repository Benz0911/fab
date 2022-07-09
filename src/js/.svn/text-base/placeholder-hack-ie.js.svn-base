/*$(function(){
  //fix placeholders in IE
  if ($.browser.msie){
      $('input[placeholder]').each(function(){
          if (this.value==''){
              var value = this.value = this.getAttribute('placeholder');
              this.style.color = 'gray';
              $(this).focus(function(){
                  if (this.value==value){
                      this.value = '';
                      this.style.color = 'black';
                  }
              });
              $(this).blur(function(){
                  if (this.value==''){
                      this.value = value;
                      this.style.color = 'gray';
                  }
              });
          }
      });    
  }
});*/

function addPlaceholderBehaviour(el) {
    var placeholder = el.attr('placeholder');

    var type = el.attr('type');
    
    var changeType = function(el, newType) {
        try {
            el[0].type = newType;
        } catch (e) {}
    }

    var onBlur = function(event){
        if (el.val() === '' || el.val() === placeholder) {
            el
                .addClass('b-placeholder')
                .val(placeholder);
            if (el.tagName === 'textarea') el.text(placeholder);
            if (type == 'password') {
                changeType(el, 'text');
            }
        }
        else
        {
          el.removeClass('b-placeholder');    
        }
    };
    onBlur();

    el.unbind('focus.placeholder');
    el.unbind('blur.placeholder');
    
    el
        .focus(function(){
            if (el.val() === placeholder) {
                el
                    .removeClass('b-placeholder')
                    .val('');
            }
            if (type == 'password') {
                changeType(el, 'password');
            }
        })
        .blur(function(event){
            onBlur(event);
        });
};

window.initPlaceholders = function(){
    $('[placeholder]').each(function(){
        addPlaceholderBehaviour($(this));
    }); 
    //$('form').off('submit.placeholder');  
    //if (!$('form').hasClass('placeholder_check'))
    $('form:not(.placeholder_check)').on('submit.placeholder', function(){
      clearPlaceholders($(this));    
    });
    $('form').addClass('placeholder_check');     
}
window.clearPlaceholders = function(form_el){ 
  $(form_el).find('input[placeholder]').each(function(){
    var el = $(this);
    if (el.val() == el.attr('placeholder')) {
      el.removeClass('b-placeholder').val('');
    }
  });
  $(form_el).find('textarea[placeholder]').each(function(){
    var el = $(this);
    if (el.val() == el.attr('placeholder')) {
      el.removeClass('b-placeholder').val('');
    }
  });  
}

$(document).ready(function(){
  // initPlaceholders();
});

$(document).bind('cbox_complete', function(){
  initPlaceholders();
});