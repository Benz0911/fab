$(document).ready(function(){
  csWidget= new buildCaseStudy('.case_study_widget');   
});
var body_carousel_api= false;
var header_carousel_api= false;
function buildCaseStudy(widget_body) 
{
  this.initFirst(widget_body);  
}

buildCaseStudy.prototype.initFirst= function(widget_body)
{
  this.widget_body= $(widget_body);
  this.widget_body_selector= widget_body; 
  this.header= this.widget_body.find('.case_study_header');
  this.header_carousel= this.header.find('.case_study_carousel_header');
  this.header_carousel_min_count= 4; 
  this.header_carousel_api= false;
  this.body= this.widget_body.find('.case_study_item');
  this.body_carousel_api= false;
  this.body_carousel= this.body.find('.case_study_photo_carousel');
  this.body_carousel_min_count= 3;   
  this.main_img_body= this.widget_body.find('.case_study_main_img');  
  this.main_img= this.main_img_body.find('img');
  this.main_img_text= this.main_img_body.find('textarea');
  this.overview_url_prefix= this.widget_body.find('.overview_url_prefix').val();
  this.case_study_id_selector= '#build_case_study_id';
  this.case_study_id_selector_photo = '#case_study_photo_case_study_id';
  this.rotate_angel= 0;
  
  this.init();  
}

buildCaseStudy.prototype.init= function()
{
  this.initHeaderCarousel();
  this.initBodyCarousel(); 
  this.initBodyColorbox();
  this.initPhotosColorbox();
  _this.body.find('.remove_main_photo').unbind('click.cs_remove_main_photo');
  _this.body.find('.remove_main_photo').bind('click.cs_remove_main_photo', function(){
    //_this.body.find('.case_study_photo_carousel .remove_photo:first').click();
    //find= $(this).attr('data-url').match(/.*\/(\d+)/);
    //if (find && find[1]) data_id= find[1];   
    //_this.body.find('.case_study_photo_carousel .remove_photo[data-id="' + data_id + '"]').click();
    _this.body.find('.case_study_photo_carousel .case_study_photo_selected').parents('li').find('.remove_photo').click();
  });
  this.updateHeaderCarouselItem();
  this.updateBodyCarouselItem();

}

buildCaseStudy.prototype.updateHeaderCarouselItem= function()
{
  if (this.header_carousel.find('li').length > this.header_carousel_min_count)
  {
    this.header_carousel.parents('.jcarousel-container:first').find('.jcarousel-prev').show(); 
    this.header_carousel.parents('.jcarousel-container:first').find('.jcarousel-next').show(); 
    this.header_carousel.parent().width(parseInt(this.header_carousel.parent().css('max-width')));   
  }
  else
  {
    this.header_carousel.parents('.jcarousel-container:first').find('.jcarousel-prev').hide(); 
    this.header_carousel.parents('.jcarousel-container:first').find('.jcarousel-next').hide();
    container_width= this.header_carousel.find('li').length * (this.header_carousel.find('li:first').width() + parseInt(this.header_carousel.find('li:first').css('margin-right')));
    this.header_carousel.parent().width(container_width);   
  }
}

buildCaseStudy.prototype.updateBodyCarouselItem= function()
{
  if (this.body_carousel.find('li').length > this.body_carousel_min_count)
  {
    this.body_carousel.parents('.jcarousel-container:first').find('.jcarousel-prev').show(); 
    this.body_carousel.parents('.jcarousel-container:first').find('.jcarousel-next').show(); 
    this.body.find('.jc_tostart').show(); 
    this.body.find('.jc_toend').show();   
    this.body_carousel.height(parseInt(this.body_carousel.parent().css('max-height')));  
    this.body_carousel.parent().height(parseInt(this.body_carousel.parent().css('max-height')));  
  }
  else
  {
    this.body_carousel.parents('.jcarousel-container:first').find('.jcarousel-prev').hide(); 
    this.body_carousel.parents('.jcarousel-container:first').find('.jcarousel-next').hide();  
    this.body.find('.jc_tostart').hide(); 
    this.body.find('.jc_toend').hide();  
    container_height= this.body_carousel.find('li').length * (this.body_carousel.find('li:first').height() + parseInt(this.body_carousel.find('li:first').css('margin-bottom')));
    this.body_carousel.height(container_height); 
    this.body_carousel.parent().height(container_height);    
  }
}

buildCaseStudy.prototype.initPhotosColorbox= function() 
{
  _this= this;
  this.widget_body.find('.case_study_photo_new_load_href').colorbox({opacity: 0.7, scrolling: true, onClosed: function() {    
    //if (!case_study_ucp.isCropProcess) _this.updatePhotos(case_study_ucp.img.attr('src'), case_study_ucp.object_id, false); 
    if(!case_study_ucp.isCropProcess && case_study_ucp.isLoadPhoto)
    {   
      delete_pref_url= baseUrl + 'build_profile/remove_case_study_photo/'; 
      delete_id= $('.current_main_photo_id').val();
      _this.removePhotoWrap(delete_pref_url + delete_id, delete_id);  
    }
    
    //установим показ сообщения только в том случае если этот мембрешип куплен не с промокодом
	if(timerId != -1) timerId = messageImprSug();
    
    },
  onComplete: function(){ 
    if(!_this.body.find(_this.case_study_id_selector).val()) _this.body.find(_this.case_study_id_selector).val($(_this.case_study_id_selector_photo).val());
    case_study_ucp= new uploadCropPhoto($('.company_logo_widget'));  
    case_study_ucp.callback_photo= function(){
        if ($('#case_study_photo_id').length && $('#case_study_photo_id').val())
        {  
          $('.current_main_photo_id').val($('#case_study_photo_id').val());
  	  //NU - избавляемся от удаления основного фото, если не была добавлена фотография
  	  //isLoadPhoto = true - фотография была загружена, установлена в качестве основного, сохранена в базе
  	      case_study_ucp.isLoadPhoto = true;
          if(!$('.main_photo_preview').hasClass('has_cs'))
              $('.main_photo_preview').addClass('has_cs'); 
        }
    };
      $('.company_logo_save').click(function(){ 
        case_study_ucp.isCropProcess= true;
          
        //сохранение нужно только если это первая добавленная фотография
        if (_this.body_carousel.find('li').size() <= 1 && case_study_ucp.object_id != 0)
            _this.saveCSform();
        _this.saveCropPhoto($(this), case_study_ucp.object_id);
            
  	    //NU - после сохранения фото отправим событие гуглу
  	    if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
  	        gtag('event', 'cs-add-image-'+$('.build-profile-num').text(), {'event_category': 'build-profile', 'event_label':$('.build-profile-num').text()});
  	
      });
    
     }
     });
}

buildCaseStudy.prototype.saveCSform= function()
{
  _this= this; 
  form= _this.body.find('form');  
  $(form).ajaxForm(function(data){
    if (data) _this.updateBody(data); 
    if (!header_carousel_api)
    {
      _this.initCaseStudyPhoto(0, _this.widget_body.find(_this.case_study_id_selector).val());  
    }
    else
    {
      if (!_this.body.find('.case_study_column_body .error_list').length) _this.addHeaderPhoto();
    }
    initLimitText(); 
  });
  $(form).submit();
}
$('.main_img_new_load_href').live('click', function(e){
    if(!$('.main_img_new_load_href').hasClass('cboxElement'))
    {
       return false;  //отменяем ссылку на теге а
    }
    else
    {
        if(timerId != -1) clearTimeout(timerId); //удаляем сообщение, которое показывается в Build Profile (показ с помощью колорбокс)
    }
}); 

$('.case_study_photo_new_load_href').live('click', function(e){
    if(!$('.case_study_photo_new_load_href').hasClass('cboxElement'))
    {
        return false;  //отменяем ссылку на теге а
    }
    else
    {
        if(timerId != -1) clearTimeout(timerId); //удаляем сообщение, которое показывается в Build Profile (показ с помощью колорбокс)
    }

});  

buildCaseStudy.prototype.initBodyColorbox= function() 
{       
    _this= this;    
    this.widget_body.find('.case_study_save').unbind('click.cs_save'); 
    this.widget_body.find('.case_study_save').bind('click.cs_save', function(){    
      _this.saveCSform();    
    });

    this.widget_body.find('.main_img_new_load_href').colorbox({opacity: 0.7, scrolling: true, onClosed: function() {
      if(!case_study_ucp.isCropProcess && case_study_ucp.isLoadPhoto)
      {   
        delete_pref_url= baseUrl + 'build_profile/remove_case_study_photo/'; 
        delete_id= $('.current_main_photo_id').val();
        _this.removePhotoWrap(delete_pref_url + delete_id, delete_id);  
      }
      //установим показ сообщения только в том случае если этот мембрешип куплен не с промокодом
	  if(timerId != -1) timerId = messageImprSug();
    },
    onComplete: function(){
      if(!_this.body.find(_this.case_study_id_selector).val()) _this.body.find(_this.case_study_id_selector).val($(_this.case_study_id_selector_photo).val());
      case_study_ucp= new uploadCropPhoto($('.company_logo_widget')); 
      case_study_ucp.callback_photo= function(){
        if ($('#case_study_photo_id').length && $('#case_study_photo_id').val())
        {
          $('.current_main_photo_id').val($('#case_study_photo_id').val());
		  //NU - избавляемся от удаления основного фото, если не была добавлена фотография
		  //isLoadPhoto = true - фотография была загружена, установлена в качестве основного, сохранена в базе
		  case_study_ucp.isLoadPhoto = true;
          if(!$('.main_photo_preview').hasClass('has_cs'))
              $('.main_photo_preview').addClass('has_cs');
        }
      };
      $('.company_logo_save').click(function(){
        case_study_ucp.isCropProcess= true;
        //сохранение нужно только если есть фотография, возможно нажатие кнопки без загрузки фото
        if (case_study_ucp.object_id != 0)
            _this.saveCSform();
        _this.saveCropPhoto($(this), case_study_ucp.object_id, true);
      }); 
    }
    }); 

}

buildCaseStudy.prototype.initCaseStudyPhoto= function(photo_id, case_study_id)
{
  if (!_this.body.find('.case_study_column_body .error_list').length){
    _this= this;
    if (typeof(case_study_id) === 'undefined') case_study_id= 0;
    if ((typeof(photo_id) !== 'undefined' && photo_id) || case_study_id)
    {
      $.ajax({
        type: 'POST',
        url: baseUrl + '/build_profile/init_case_study_photo/' + photo_id,
        data: { id: photo_id, case_study_id: case_study_id },  
        success : function( data, status, xhr ) 
        { 
          _this.updateWidget(data);
        }
      }); 
    }
  }
}

//********сохранение после нажатия save photo в виджете выбора фото
buildCaseStudy.prototype.saveCropPhoto= function(element, photo_id, is_main)   
{       
  _this= this;
  form= element.parents('form:first');
  is_rotation= false;
  if($('input[name="to_rotate"]').prop("checked"))
  {
      is_rotation= true;
  }
  if (body_carousel_api.size() === 1) is_main= true;
  $.colorbox.close(); 
  $(form).find('input').after('<input type="hidden" name="is_ajax" value="1" />'); 
  $(form).find('input').after('<input type="hidden" name="photo_id" value="' + case_study_ucp.object_id + '" />'); 
  $(form).ajaxForm(function(data){
    find= data.match(/(.*\..*)(?=\s|$)/);
    //img= _this.widget_body.find('.case_study_template_new').clone();
    img_src= '';
    if (find && find[1]) img_src= find[1];
    
    _this.updatePhotos(img_src, photo_id, is_main);
    if(_this.body_carousel.find('img.case_study_template').length == 1)    //добавляем первое фото
    {
        _this.main_img_body= _this.widget_body.find('.case_study_main_img');  
         var data_text = _this.main_img_body.find('textarea').val();
         _this.body_carousel.find("img[data-id = " + photo_id + "]").attr('data-text', data_text);
    }
    _this.body_carousel.find("img[data-id = " + photo_id + "]").click();
    if(is_rotation)
    {
        $.ajax({
            type: 'POST',
            url: baseUrl + '/build_profile/load_rotate_case_study_photo/' + photo_id,
            data: { id: photo_id, case_study_id: _this.widget_body.find(_this.case_study_id_selector).val() },  
            success : function( data, status, xhr ) 
            { 
                $.colorbox({html: data, onComplete: function()
                {
                    var t = new Image();
                    t.src = $('.case_study_rotate_img img').attr('src'); 
                    img_height= $('.case_study_rotate_img').height();
                    img_width= $('.case_study_rotate_img').width();      
                }});
                $.colorbox.resize();
 
              $('.rotate_right').click(function()
              {
                rotate_angel= parseInt($('input[name="rotate_angel"]').val()) + 90;
                $('input[name="rotate_angel"]').val( rotate_angel ); 
                is_rotate= Math.abs(rotate_angel % 180) == 90;
                $('.case_study_rotate_img img').rotate({
                      animateTo: rotate_angel
                   });  
                max_width= $('.case_study_rotate_img img').css('max-width');   
                max_height= $('.case_study_rotate_img img').css('max-height');   
                old_height= $('.case_study_rotate_img img').height();
                old_width= $('.case_study_rotate_img img').width();
                $('.case_study_rotate_img img').css('max-width', max_height);   
                $('.case_study_rotate_img img').css('max-height', max_width);
                if( is_rotate )
                {
                    cur_width  = $('.case_study_rotate_img img').height();
                    cur_height   = $('.case_study_rotate_img img').width();
                }
                else
                {
                    cur_width  = $('.case_study_rotate_img img').width();
                    cur_height   = $('.case_study_rotate_img img').height();
                }
                $('.case_study_rotate_img img').css('margin-top', (cur_height - $('.case_study_rotate_img img').height()) / 2);
                $('.case_study_rotate_img img').css('margin-left', (cur_width - $('.case_study_rotate_img img').width()) / 2);
                $('.case_study_rotate_img').css('width', cur_width);
                $('.case_study_rotate_img').css('height', cur_height)
                $.colorbox.resize();
              });
              $('.rotate_left').click(function()
              {
                rotate_angel= parseInt($('input[name="rotate_angel"]').val()) - 90;
                $('input[name="rotate_angel"]').val( rotate_angel ); 
                is_rotate= Math.abs(rotate_angel % 180) == 90;
                $('.case_study_rotate_img img').rotate({
                      animateTo: rotate_angel
                   });  
                max_width= $('.case_study_rotate_img img').css('max-width');   
                max_height= $('.case_study_rotate_img img').css('max-height');   
                $('.case_study_rotate_img img').css('max-width', max_height);   
                $('.case_study_rotate_img img').css('max-height', max_width);
                if( is_rotate )
                {
                    cur_width  = $('.case_study_rotate_img img').height();
                    cur_height   = $('.case_study_rotate_img img').width();
                }
                else
                {
                    cur_width  = $('.case_study_rotate_img img').width();
                    cur_height   = $('.case_study_rotate_img img').height();
                }
                $('.case_study_rotate_img img').css('margin-top', (cur_height - $('.case_study_rotate_img img').height()) / 2);
                $('.case_study_rotate_img img').css('margin-left', (cur_width - $('.case_study_rotate_img img').width()) / 2);
                $('.case_study_rotate_img').css('width', cur_width);
                $('.case_study_rotate_img').css('height', cur_height)
                $.colorbox.resize();
              });
              $('.rotate_save').click(function()
              {
                  case_study_id= _this.widget_body.find(_this.case_study_id_selector).val();
                  $.ajax({
                    type: 'POST',
                    url: baseUrl + '/build_profile/rotate_case_study_photo/' + photo_id,
                    data: { id: photo_id, case_study_id: case_study_id, rotate_angel: parseInt($('input[name="rotate_angel"]').val()) },  
                    success : function( data, status, xhr ) 
                    { 
                        timestamp= new Date().getTime();
                        //$('.cs_main_img').attr('src', '');
                        $('.cs_main_img').attr('src', img_src + '?timestamp=' + timestamp);
                        //$('.case_study_template[data-id="' + photo_id + '"]').attr('src', '');
                        $('.case_study_template[data-id="' + photo_id + '"]').attr('src', img_src + '?timestamp=' + timestamp);
                        //_this.updatePhotos(img_src, photo_id, is_main);
                        if (_this.header_carousel.find('.case_study_selected.not_empty').length)
                        {
                            _this.header_carousel.find('.case_study_selected.not_empty img').attr('src', img_src + '?timestamp=' + timestamp);
                        }
                        $.colorbox.close();
                    }
                  });
              });
            }
          }); 
    }
  });  
}

buildCaseStudy.prototype.updatePhotos= function(img_src, photo_id, is_main)
{
  //***Проверяем был ли создан case study. Если нет-> обновляем body
  if (!this.widget_body.find(this.case_study_id_selector).val())
  {
    this.initCaseStudyPhoto(photo_id);
  }
  else
  if (img_src !== "")
  {
    //добавление фото в вертикальную карусель               
    if (body_carousel_api.size() === 1) is_main= true;
    this.addPhotos(img_src, photo_id); 
    
    if (typeof(is_main) !== 'undefined' && is_main)
    {
        //обновление фото header карусели
        if (this.header_carousel.find('.case_study_selected.not_empty').length) 
        {   
            //получим data_id  case study
            var data_id = this.header_carousel.find('.case_study_selected.not_empty').find('img.case_study_select').attr('data-id');
            var match_li = this.header_carousel.find('img[data-id='+data_id+']');
            
            //установим атрибут всем li c data-id = data_id
            match_li.each(function(){
                $(this).parents('li:first').find('img').attr('src', img_src);   
            });
        }    
      
      //обновление главного фото 
      this.updateMainPhoto(img_src, photo_id);
    }
  }
  this.updateBodyCarouselItem();
}

buildCaseStudy.prototype.updateMainPhoto= function(img_src, photo_id)
{
  url_prefix= this.body.find('input.overview_url_prefix').val();  
  find= img_src.match(/\/([^\/]*)$/);
  if (find && find[1]) img_src= url_prefix + find[1];
  if (!_this.body.find('.cs_main_img').length)
  {
    href_clone= _this.body.find('.main_img_new_load_href').clone();
    href_clone.find('img').removeClass('main_img_new_load').addClass('cs_main_img');
    href_clone.find('.remove_main_photo_default').removeClass('hidden').removeClass('remove_main_photo_default').addClass('remove_main_photo');  
    _this.body.find('.main_photo_preview').html(href_clone);
    href_clone_cnt= _this.body.find('.main_photo_preview .main_img_new_load_href').contents();
    _this.body.find('.main_photo_preview .main_img_new_load_href').replaceWith(href_clone_cnt);
    _this.body.find('.main_img_new_load_href').addClass('hidden');
    /*img= _this.body.find('.remove_main_photo_default:first').removeClass('hidden').removeClass('remove_main_photo_default').addClass('remove_main_photo'); 
    img_remove= _this.body.find('.remove_main_photo_default:first').clone().removeClass('hidden').removeClass('remove_main_photo_default').addClass('remove_main_photo'); 
    _this.body.find('.main_img_new_load_href').parent('div:first').append(img);  
    _this.body.find('.main_img_new_load_href').parent('div:first').append(img_remove); 
    */
    
  }
  if (img_src) 
  {
      if( img_src == _this.body.find('.cs_main_img').attr('src'))
      {
          _this.body.find('.cs_main_img').attr('src', '');
          _this.body.find('.cs_main_img').attr('src', img_src);    
      }
      else
      {
          _this.body.find('.cs_main_img').attr('src', img_src);
      }
  }
  //_this.main_img_text.val(_this.body.find('.case_study_template[src="' + img_src + '"]').attr('data-text'));
  
  if (typeof(photo_id) !== 'undefined' && photo_id)
  {
    base_data_url= _this.body.find('.remove_main_photo').attr('data-url');
    find= base_data_url.match(/([^\/]*\/)\d+$/);
    if (find && find[1]) base_data_url= find[1]; 
    _this.body.find('.remove_main_photo').removeClass('hidden').attr('data-url', base_data_url + photo_id);
  }
  
  _this.body.find('.remove_main_photo').unbind('click.cs_remove_main_photo');
  _this.body.find('.remove_main_photo').bind('click.cs_remove_main_photo', function(){
    _this.body.find('.case_study_photo_carousel .remove_photo:first').click();
  });
  
  if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
}

buildCaseStudy.prototype.jCarouselRemoveAndAnimate_Two = function(api_body, i, count_el){
    
    var el = api_body.get(i); //удаляемый элемент
    var sz_car = api_body.options.size; //количество элементов в карусели
    var d = 0;
    var first = 1;   //элемент который будет отображаться 1-ым
    var last = count_el; //элемент который будет отображаться последним
    var data_id = el.find('img').attr('data-id');
    
    if(i > sz_car || i <= 0)   //Удаляем дополнительно сформированные li
    {
        var all_li = api_body.list.children('li'); 
        if (all_li.size() > 0) {
            all_li.each(function() {
            var jcarouselindex = this.getAttribute('jcarouselindex');
            var id = $(this).find('img').attr('data-id');
            if (jcarouselindex > sz_car || jcarouselindex <= 0 || id == data_id)
            {
                $(this).remove();                
            }
          });
       }        
    }
    else{
        el.remove();
    }
    
    //уменьшаем размер карусели
    api_body.options.size--;  
    //перестроить список
    this.rebuildTheCarousel(api_body);
    
    api_body.list.css(api_body.lt, d + 'px');
    if (api_body.options.size < count_el)
        last = api_body.options.size;
    
    this.setFirstLast(api_body, first, last);   
}

buildCaseStudy.prototype.rebuildTheCarousel= function(carousel){
    var li = carousel.list.children('li');
    self = carousel;
    if (li.size() > 0) {
       var i = self.options.offset;
       li.each(function() {
           self.format(this, i++);
       });
    }
}

buildCaseStudy.prototype.setFirstLast= function(carousel, first, last){
    carousel.first = first;
    carousel.last = last;
    carousel.preFirst = first;
    carousel.preLast = last; 
}

buildCaseStudy.prototype.deleteExtraLi= function(carousel, min_count, dimension){
    //удалить лишние тэги li
    var all_li = carousel.list.children('li'); 
    if (all_li.size() > 0) {
        all_li.each(function() {
            var jcarouselindex = this.getAttribute('jcarouselindex');
            if (jcarouselindex > carousel.options.size || jcarouselindex <= 0)
            {
                $(this).remove();                
            }
        });
    }
    
    //установка показываемых элементов
    if (carousel.options.size < min_count)
    {
        first = carousel.options.size-1;
        last = carousel.options.size; 
    }
    else
    {   
        var d = dimension*(carousel.options.size-min_count);
        carousel.list.css(carousel.lt, -1*d + 'px');
        first = carousel.options.size-(min_count-1);
        last = carousel.options.size;
    }
    this.setFirstLast(carousel, first, last);
}

buildCaseStudy.prototype.jCarouselremoveAndAnimate= function(api_body, i) {
    _this= this; //получили объект
    var e = api_body.get(i); //получили удаляемый объект 

    var d = api_body.dimension(e); //получаем размеры удаляемого элемента

    if (i < api_body.first) 
        api_body.list.css(api_body.lt, parseInt(api_body.list.css(api_body.lt)) + d + 'px');

    e.remove();
    api_body.options.size--;

   // var di = api_body.options.visible != null ? Math.ceil(api_body.clipping() / api_body.options.visible) : null;
    var li = api_body.list.children('li');
    var self = api_body;

    if (li.size() > 0) {
        var wh = 0, i = api_body.options.offset;
        li.each(function() {
            api_body.format(this, i++);
            //wh += self.dimension(api_body, di);
        });

        //api_body.list.css(api_body.wh, wh + 'px');            
    }

    //api_body.scroll(0,true);
    //api_body.buttons();
}

buildCaseStudy.prototype.removePhotoWrap= function(url, id, jcarouselindex)
{
  $.ajax({
    type: 'POST',
    url: url,  
    success : function( data, status, xhr ) 
    { 
      if(typeof(jcarouselindex) !== 'undefined' && jcarouselindex) _this.jCarouselRemoveAndAnimate_Two(body_carousel_api, jcarouselindex, this.body_carousel_min_count);
      
      if (body_carousel_api.size() > 1) 
      {
        img_src= _this.body.find('.case_study_photo_carousel li:first img').attr('src'); 
        _this.updateMainPhoto(img_src, id); 
      }
      else
      {
        img_src= _this.body.find('.default_main_photo').val();
        _this.body.find('.main_img_new_load').attr('src', img_src);    
        _this.body.find('.main_img_new_load_href').removeClass('hidden'); 
        _this.body.find('.remove_main_photo_default').addClass('hidden');
        //_this.body.find('.main_photo_preview .outer_preview_cs_img').remove();
        //_this.body.find('.remove_main_photo').remove();
        _this.body.find('.main_photo_preview').html('');
        img_src_cs_new= _this.header.find('.case_study_select_new').attr('src');
        _this.header.find('li.case_study_selected img').attr('src', img_src_cs_new);
      }
	  //NU - после удаления фото отправим событие гуглу
      if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
          gtag('event', 'cs-remove-image-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
      _this.main_img_text.val(_this.body.find('.case_study_photo_carousel li:first img').attr('data-text')); 
      _this.updateBodyCarouselItem();
    }
  });   
}

buildCaseStudy.prototype.removePhotos= function(element)
{
  _this= this;  
  if (typeof(element) !== 'undefined')
  {
    jcarouselindex= element.parents('li:first').attr('jcarouselindex');
    this.removePhotoWrap(element.attr('data-url'), element.attr('data-id'), jcarouselindex);
  }
  this.updateBodyCarouselItem();
}

//добавление фото в вертикальную карусель
buildCaseStudy.prototype.addPhotos= function(img_src, photo_id)
{
  //if (this.header_carousel.find('img[data-id=""]'))
  _this= this;

  if (_this.body_carousel.find('img[data-id="' + photo_id + '"]').length)
  {
      _this.body_carousel.find('img[data-id="' + photo_id + '"]').attr('src', '');
      _this.body_carousel.find('img[data-id="' + photo_id + '"]').attr('src', img_src);    
  }
  else
  {
      if (typeof(img_src) !== 'undefined')
      {
        li_index= body_carousel_api.size();
        body_carousel_api.size(li_index + 1);
        li= _this.body.find('.case_study_template_new').parents('li:first');
        body_carousel_api.add(li_index + 1, $(li.html())); 
        li_add = li.parent().find('li[jcarouselindex="' + (li_index + 1) + '"]'); 
        li_add.addClass('add-anoth-img');
        li_clone= li.parent().find('li[jcarouselindex="' + li_index + '"]');
        li_clone_acnt= li_clone.find('a').contents(); 
        li_clone.find('a').replaceWith(li_clone_acnt); 
        //li_clone.html(li.html());
        //img_clone= li_clone.find('img:first');
        //remove_clone= li_clone.find('img:first');
        //img_clone.attr('src', img_src);
        //li_clone.find('a').remove();
        //li_clone.append(img_clone);
        li_clone.find('.remove_photo').removeClass('hidden').attr('data-id', photo_id).attr('data-url', li_clone.find('.remove_photo').attr('data-url') + photo_id);
        li_clone.find('img:first').attr('src', img_src).addClass('case_study_template').removeClass('main_img_new_load').removeClass('case_study_template_new').attr('data-id', photo_id); 
        li_clone.removeClass('add-anoth-img');
        
        //удалить лишние тэги li
        this.deleteExtraLi(body_carousel_api, _this.body_carousel_min_count, li_add.get(0).scrollHeight);

        _this.initPhotosColorbox();
        _this.initBodyCarousel(); 
        
        if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
      }
  }
  
  this.updateBodyCarouselItem();
}

buildCaseStudy.prototype.addHeaderPhoto= function() 
{
  _this= this;
  if (this.header.find('.case_study_selected .case_study_select_new').length)
  {
    if (this.body.find('.cs_main_img').length) img_src= this.body.find('.cs_main_img').attr('src');
    else img_src= this.widget_body.find('.case_study_select_new').attr('src');
    
    callback_function= function()
    {
      li_index= header_carousel_api.size();
      header_carousel_api.size(li_index + 1);
      li= _this.widget_body.find('.case_study_select_new').parents('li:last');
      header_carousel_api.add(li_index + 1, $(li.html()).clone()); 
      li_clone= li.parent().find('li[jcarouselindex="' + li_index + '"]');
      li_clone.addClass('not_empty');
      //li_clone.html(li.html());
      img_clone= li_clone.find('img:first');
      img_clone.attr('src', img_src);
      li_clone_href_cnt= li_clone.find('a').contents();
      li_clone.find('a').replaceWith(li_clone_href_cnt);
      //li_clone.append(img_clone);
      li_clone.find('.remove_case_study_default').removeClass('hidden').addClass('remove_case_study').removeClass('remove_case_study_default').attr('data-url', li_clone.find('.remove_case_study').attr('data-url') + _this.body.find(_this.case_study_id_selector).val());
      //li_clone.find('.remove_case_study').removeClass('hidden').addClass('remove_case_study').removeClass('remove_case_study_default').attr('data-url', li_clone.find('.remove_case_study').attr('data-url') + _this.body.find(_this.case_study_id_selector).val()); 
      li_clone.addClass('case_study_selected');
      img_clone.addClass('case_study_select').removeClass('case_study_select_new').removeClass('case_study_template_new').attr('data-id', _this.body.find(_this.case_study_id_selector).val()); 
      li= _this.widget_body.find('.case_study_select_new').parents('li:last');    
      img_li = li.find('img:first');
      img_li.attr('data-id','');
      li.removeClass('not_empty'); 
      _this.deleteExtraLi(header_carousel_api, _this.header_carousel_min_count, header_carousel_api.dimension(li_clone));
      _this.initPhotosColorbox();
      _this.initBodyCarousel(); 
      _this.initHeaderCarousel();
    }
    
    if (!header_carousel_api) 
    {
      
      $(window).bind('init_header_api', function() {

      });
    }
    else callback_function();
    
  _this.header.find('.remove_case_study').unbind('click.remove_case_study');
  _this.header.find('.remove_case_study').bind('click.remove_case_study', function(){
    _this.deleteCaseStudy($(this));
  });
  }
  
  this.updateHeaderCarouselItem();
}

buildCaseStudy.prototype.setBodyCarousel= function(carousel, state)
{
  body_carousel_api= carousel; 
  $('.jc_tostart').click(function(){
    body_carousel_api.scroll(1);  
  }); 
  $('.jc_toend').click(function(){
    body_carousel_api.scroll(body_carousel_api.size()-2);  
  }); 
}

buildCaseStudy.prototype.setHeaderCarousel= function(carousel, state)
{
  header_carousel_api= carousel;   
}

buildCaseStudy.prototype.initBodyCarousel= function() 
{
  _this= this;
  this.body_carousel= this.body.find('.case_study_photo_carousel');
  this.body_carousel.jcarousel({
    scroll:1,
    vertical: true,
    itemLoadCallback: _this.setBodyCarousel
  } );
  this.body_carousel.find('img.case_study_template').unbind('click.cs_template');
  this.body_carousel.find('img.case_study_template').bind('click.cs_template', function(){   
    find= $(this).attr('src').match(/\/([^\/]*)$/);
    if (find)
    { 
      data_id= _this.body.find('.case_study_photo_selected').attr('data-id');  
      //data_text= _this.main_img_text.val();
     // data_text = _this.main_img_body.find('textarea').val();
      case_study_id= _this.body.find(_this.case_study_id_selector).val();
      _this.main_img_body= _this.widget_body.find('.case_study_main_img'); 
      data_text= _this.main_img_body.find('textarea').val();
      _this.main_img= _this.main_img_body.find('img');
      _this.main_img.attr('src', _this.overview_url_prefix + '/' + find[1]); 
      _this.body.find('.case_study_photo_selected').attr('data-text', data_text);
      if($(this).attr('data-text')) _this.main_img_body.find('textarea').val($(this).attr('data-text'));
      else _this.main_img_body.find('textarea').val('');
      _this.body.find('.current_main_photo_id').val($(this).attr('data-id')); 
      _this.main_img.load(function(){if (typeof initCustomCenter !== 'undefined') initCustomCenter()}); 
      $.ajax({
        type: 'POST',
        url: baseUrl + 'build_profile/add_case_study_photos',
        data: { id: case_study_id, photo_path: find[1], photo_text: data_text, photo_id: data_id },  
        success : function( data, status, xhr ) 
        { 
          if (typeof(data.photo_id) && data.photo_id)
          {
            //_this.body.find('.case_study_photo_selected').attr('data-id', data.photo_id);  
          }
          if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
        }
      }); 
    }
    _this.body.find('.case_study_photo_selected').removeClass('case_study_photo_selected');  
    $(this).addClass('case_study_photo_selected');   
  });
  
  _this.body.find('.remove_photo').unbind('click.cs_photo_delete');
  _this.body.find('.remove_photo').bind('click.cs_photo_delete', function(){
    _this.removePhotos($(this));
  
  });
  
  $('#build_case_study_title').change(function(){
    if(!$('.main_photo_preview').hasClass('has_cs')){
        //заблокируем другие поля
        $('.main_img_new_load_href').removeClass('cboxElement');
        $('.case_study_photo_new_load_href').removeClass('cboxElement');
    }
    //при изменении данного поля, остальные поля ввода доступны только для чтения
    $('#build_case_study_overview').attr('readonly','readonly');
    $('#build_case_study_photo_text').attr('readonly','readonly');
    _this.saveCSform(); 
  });
  $('#build_case_study_overview').change(function(){
    if(!$('.main_photo_preview').hasClass('has_cs')){
        //заблокируем другие поля
        $('.main_img_new_load_href').removeClass('cboxElement');
        $('.case_study_photo_new_load_href').removeClass('cboxElement');   
    }
    //при изменении данного поля, остальные поля ввода доступны только для чтения
    $('#build_case_study_title').attr('readonly','readonly');
    $('#build_case_study_photo_text').attr('readonly','readonly'); 
    _this.saveCSform();   
  });
  $('#build_case_study_photo_text').change(function(){
    if(!$('.main_photo_preview').hasClass('has_cs')){
        //заблокируем другие поля
        $('.main_img_new_load_href').removeClass('cboxElement');
        $('.case_study_photo_new_load_href').removeClass('cboxElement');
    }
    //при изменении данного поля, остальные поля ввода доступны только для чтения
    $('#build_case_study_title').attr('readonly','readonly');
    $('#build_case_study_overview').attr('readonly','readonly');  
    _this.saveCSform();   
  });
  
  /*this.widget_body.find('.case_study_main_img.main_img_new').unbind('click.cs_main');
  this.widget_body.find('.case_study_main_img.main_img_new').bind('click.cs_main', function(){ 
    
  });*/
}

buildCaseStudy.prototype.deleteCaseStudy= function(el)  
{
  _this= this;
  if(typeof(el) && el)
  {
    data_url= el.attr('data-url');
    jcarouselindex= el.parents('li:first').attr('jcarouselindex');
    case_study_id= 0;
    if(_this.header.find('li:not(case_study_selected):first').attr('data-id')) case_study_id= _this.header.find('li:not(case_study_selected):first').attr('data-id');
    $.ajax({
      type: 'POST',
      data: {case_study_id: case_study_id},
      url: data_url, 
      success : function( data, status, xhr ) 
      { 
        _this.jCarouselRemoveAndAnimate_Two(header_carousel_api, jcarouselindex, _this.header_carousel_min_count);
        
        if (header_carousel_api.size() === 1) 
        {
          _this.updateWidget(data); 
          header_carousel_api= false; 
        }
        else 
        {
            if (header_carousel_api.size() > 4)   header_carousel_api.scroll(1, true);
            //Удалить выделение если его нет на странице
            if (!header_carousel_api.list.find('.case_study_selected').length)
            {
                //Выделить 1 элемент
                first_li = header_carousel_api.list.children('li:first');
                first_li.addClass('case_study_selected');
                case_study_id = first_li.find('.case_study_select').attr('data-id');
                //Обновить тело
                $.ajax({
                type: 'POST',
                url: baseUrl + 'build_profile/getCaseStudy',
                data: { id: case_study_id },  
                success : function( data, status, xhr ) 
                { 
                  _this.updateBody(data);
                  _this.updateBodyCarouselItem();
                  if (typeof initCustomCenter !== 'undefined') initCustomCenter();
                }
                });
            }
            
                        
        }
        
        _this.updateHeaderCarouselItem();  
		//NU - после удаления cs отправим событие гуглу
		if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
	        gtag('event', 'remove-cs-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});
      }
    }); 
  } 
  
 // this.updateHeaderCarouselItem();
}

buildCaseStudy.prototype.updateWidget= function(html) 
{
  _this= this;
  this.widget_body.parent().replaceWith(html);
  this.initFirst(this.widget_body_selector); 
}

buildCaseStudy.prototype.updateBody= function(html) 
{
  _this= this;
  this.body.html(html);
  this.body_carousel= this.body.find('.case_study_photo_carousel');
  this.main_img_body= this.widget_body.find('.case_study_main_img'); 
  this.main_img= this.main_img_body.find('img');
  this.main_img_text= this.main_img_body.find('textarea');  
  this.initBodyCarousel();
  this.initBodyColorbox();
  this.initPhotosColorbox();
  _this.updateBodyCarouselItem();
  _this.body.find('.remove_main_photo').unbind('click.cs_remove_main_photo');
  _this.body.find('.remove_main_photo').bind('click.cs_remove_main_photo', function(){
    _this.body.find('.case_study_photo_carousel .remove_photo:first').click();
  });
}

buildCaseStudy.prototype.initHeaderCarousel= function(callback) 
{
  _this= this;
  if (!this.widget_body.find('.case_study_carousel_header').hasClass('hidden')){
    this.header.show();
    this.header.removeClass('hidden'); 
    this.header_carousel.jcarousel({
        scroll:1,  
        itemLoadCallback: _this.setHeaderCarousel
      } );
    this.header_carousel.find('.case_study_select').unbind('click.cs_select');
    this.header_carousel.find('.case_study_select').bind('click.cs_select', function(){
      case_study_id= $(this).attr('data-id');
      _this_click= $(this);
      $.ajax({
        type: 'POST',
        url: baseUrl + 'build_profile/getCaseStudy',
        data: { id: case_study_id },  
        success : function( data, status, xhr ) 
        { 
          _this.header_carousel.find('.case_study_selected').removeClass('case_study_selected');
          _this_click.parents('li:first').addClass('case_study_selected');
          _this.updateBody(data);
            //_this.updateHeaderCarouselItem();
          _this.updateBodyCarouselItem();
          if (typeof initCustomCenter !== 'undefined') initCustomCenter();

          $('div.build-profile .tab2-content .jcarousel-clip-vertical ul li img[data-cheight="72"]').css('margin-top', '0');
        }
      });    
    });
    this.header_carousel.find('.case_study_select_new').unbind('click.cs_new'); 
    this.header_carousel.find('.case_study_select_new').bind('click.cs_new', function(){
      case_study_id= $(this).attr('data-id');
      case_study_item= _this.widget_body.find('.case_study_item');
      _this_click= $(this);
      $.ajax({
        type: 'POST',
        url: baseUrl + 'build_profile/getCaseStudy',
        data: { id: case_study_id },  
        success : function( data, status, xhr ) 
        { 
          _this.header_carousel.find('.case_study_selected').removeClass('case_study_selected');
          _this_click.parents('li:first').addClass('case_study_selected');
          case_study_item.html(data); 
          _this.initBodyCarousel();
          //_this.initBodyCarousel();
          _this.initBodyColorbox();
          _this.initPhotosColorbox();
          _this.updateHeaderCarouselItem();
          _this.updateBodyCarouselItem(); 
          if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
		  
		  //NU - после coхранения cs отправим событие гуглу
		if(document.domain == 'www.find-a-builder.com' || document.domain == 'find-a-builder.com')
			gtag('event', 'add-cs-'+$('.build-profile-num').text(), {'event_category':'build-profile', 'event_label':$('.build-profile-num').text()});

        }
      });    
    });
  } 
  
  _this.header.find('.remove_case_study').unbind('click.remove_case_study');
  _this.header.find('.remove_case_study').bind('click.remove_case_study', function(){
    _this.deleteCaseStudy($(this));
  });
};