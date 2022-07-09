function uploadCropPhoto(widget_body) 
{
  _this_upload_photo= this;
  this.widget_body= widget_body; 
  this.save_button= $('.specialism_save');
  this.jcrop_api;
  this.img= this.widget_body.find('.upload_photo img');
  this.img_error= this.widget_body.find('.photo_error');    
  this.img_template= this.widget_body.find('.photo_template');
  this.real_img_width= 0;
  this.real_img_height= 0; 
  this.input_upload_photo= '';
  this.object_id= 0;
  this.form= this.widget_body.find('form');
  this.form.submit(function(){
    //_this_upload_photo.submit_crop()   
  });
  this.isCropProcess= false;
  this.isLoadPhoto= false;
  this.init();
}

uploadCropPhoto.prototype.init= function()
{
  _this_upload_photo= this;
 // this.widget_body.width(this.widget_body.width() + 'px'); 
  ratio_cur= 1;
  if (parseInt(this.widget_body.find('.photo_template_outter').css('max-width')) && parseInt(this.widget_body.find('.photo_template_outter').css('max-height')))
    ratio_cur= parseInt(this.widget_body.find('.photo_template_outter').css('max-width')) / parseInt(this.widget_body.find('.photo_template_outter').css('max-height'));
  this.widget_body.find('.photo_template_outter').width(this.widget_body.find('.photo_template_outter').height() * ratio_cur);
  if (_this_upload_photo.img.length)
  {
    _this_upload_photo.img.Jcrop({
        onSelect: _this_upload_photo.jcropShowCoords,
        onChange: _this_upload_photo.jcropShowCoords,
        aspectRatio: ratio_cur,
        addClass: _this_upload_photo.widget_body.attr('class'),
        allowSelect: true,
        bgColor: 'white'  
    }, function(){_this_upload_photo.jcrop_api = this});  
  }  
  
  this.widget_body.find('.upload_photo input[type="file"]').change(function(){ 
    _this_upload_photo.inputChange($(this));  
  });
  this.widget_body.find('.upload_photo input[type="file"]').wrap('<div class="cl177"><div class="upload_photo_wrap"></div></div>');
  this.widget_body.find('.upload_photo input[type="file"]').after('<button class="upload_photo_button">Choose file</button>');
  if (typeof($.colorbox) !== 'undefined')
  {
    $(window).on("colorboxClosed", function() {
        _this_upload_photo.colorboxClose();
    });
  }
  
  if (typeof(Custom) !== 'undefined') Custom.init();
  
  
    $.colorbox.resize();
  
  
  this.widget_body.width(this.widget_body.width() + 'px');  
  
  this.widget_body.find('input[name="crop_ratio"]').change(function()
  {
    _this_upload_photo.cropChange($(this));  
  });
  
  this.initImgSize();
  
  if( $('.is_rotate').length )
  {
    $('.is_rotate').hide();    
  }
}

uploadCropPhoto.prototype.cropChange= function(el){  
  old_w= this.img_template.width();

  if(!_this_upload_photo.widget_body.find('.upload_photo .jcrop-holder div:first').width()&&_this_upload_photo.widget_body.find('.upload_photo img:last').width())
  {
      var upl_img_x = parseInt(_this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-width'));
      var upl_img_y = parseInt(_this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-height'));
      if(upl_img_y > upl_img_x) this.jcrop_api.setOptions({'setSelect': [0,0, upl_img_y, upl_img_y]});
      else this.jcrop_api.setOptions({'setSelect': [0,0, upl_img_x, upl_img_x]});
     // var upl_koef_img = upl_img_x / upl_img_y;
     // if(el.val()>=upl_koef_img) upl_img_y = upl_img_x*el;
     // else upl_img_x = upl_img_y / el.val();
      
  }
   this.jcrop_api.setOptions({'aspectRatio': parseFloat(el.val())}); 
  this.img_template.width(old_w);
  this.img_template.parent().width(parseInt(this.img_template.parent().height()) * parseFloat(el.val())); 
  this.refreshPreview();
}

uploadCropPhoto.prototype.initImgSize= function(){
  if (_this_upload_photo.img.attr('src'))
  {
    var img = _this_upload_photo.img; // Get my img elem
    var pic_real_width, pic_real_height;
    $("<img/>") // Make in memory copy of image to avoid css issues
      .attr("src", $(img).attr("src"))
      .load(function() {
          pic_real_width = this.width;   // Note: $(this).width() will not
          pic_real_height = this.height; // work for in memory images.
          _this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-width', pic_real_width);
          _this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-height', pic_real_height);
      });
  }
}

uploadCropPhoto.prototype.getImg= function(){
  return _this_upload_photo.img;  
}

uploadCropPhoto.prototype.formSuccess= function(img_path){ 
  _this_upload_photo= this;  
  
  if( $('.is_rotate').length )
  {
    $('.is_rotate').show();    
  }
  
  if (typeof(img_path) !== 'undefined' && img_path && _this_upload_photo.is_form_func)
  {
    _this_upload_photo.is_form_func= 0;
    find= _this_upload_photo.matchImg(img_path);
    if (find)
    {
      _this_upload_photo.img_error.hide();
      img_path= find;
      _this_upload_photo.img_template.attr('src', img_path); 
      var ratio= 1;
      _this_upload_photo.img.attr('src', img_path).load(function() {  
        $('.jcrop-holder').removeClass("browseAjaxLoad");
        _this_upload_photo.widget_body.find('.upload_photo img').css('opacity', 1);
        var t = new Image();
        t.src = $(this).attr('src'); 
        t.onload = function()
        {
            width= t.width; 
            height= t.height;
        
        //width= t.width;
       // height= t.height;
        this.real_img_width= width;
        this.real_img_height= height;
        _this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-width', width);
        _this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-height', height);
        if (!width) width= this.width; 
        if (!height) height= this.height; 
        ratio= height/width; 
        $(this).width(width + 'px');
        $(this).height(height + 'px'); 
        $(this).parents('.jcrop-holder').width(width + 'px');
        $(this).parents('.jcrop-holder').height(height + 'px');
        $('.upload_photo img').css('max-height', ratio*parseInt($('.jcrop-holder img').css('max-width')) + 'px');
        //$(this).show();
        /*$('.jcrop-holder img').height(ratio*$('.jcrop-holder img').width() + 'px');
        $('.jcrop-holder').height(ratio*$('.jcrop-holder img').width() + 'px');
        $('.jcrop-tracker').height(ratio*$('.jcrop-holder img').width() + 'px'); 
        //jcrop_api.setOptions({trueSize : [ $('.jcrop-holder img').width(), ratio*$('.jcrop-holder img').width() ], maxSize : [$('.jcrop-holder img').width(), ratio*$('.jcrop-holder img').width()]});
        $('.upload_photo').height(ratio*$('.jcrop-holder img').width() + 'px');
        $('.upload_photo img').height(ratio*$('.jcrop-holder img').width() + 'px');   */
        
        
       //  var upl_img_x = parseInt(_this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-width'));
      //   var upl_img_y = parseInt(_this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-height'));
       //  if(upl_img_y > upl_img_x) _this_upload_photo.jcrop_api.setOptions({'setSelect': [0,0, upl_img_y, upl_img_y]});
       //  else _this_upload_photo.jcrop_api.setOptions({'setSelect': [0,0, upl_img_x, upl_img_x]});
     
        
        
        _this_upload_photo.jcrop_api.setImage(_this_upload_photo.img.attr('src'), function(){
          div = $('.colorbox_content');
          var hasHorizontalScrollbar= div.scrollWidth > div.clientWidth;
          var hasVerticalScrollbar= div.scrollHeight > div.clientHeight;
          if (typeof($.colorbox) !== 'undefined' && (hasHorizontalScrollbar || hasVerticalScrollbar))
          { 
            $.colorbox.resize(); 
            if ($('.colorbox_content').length) $.colorbox.resize({innerWidth: $('.colorbox_content').parents('#cboxContent:first').outerWidth()}); 
            //$.colorbox.resize(); 
          } 
          //_this_upload_photo.jcrop_api.setImage(_this_upload_photo.img.attr('src'));  
          if(parseInt($('.jcrop-holder img').css('max-width'))) _this_upload_photo.jcrop_api.setOptions({'setSelect': [0,0, parseInt($('.jcrop-holder img').css('max-width')) , ratio*parseInt($('.jcrop-holder img').css('max-width'))]});
          else
          {
              var upl_img_x = parseInt(_this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-width'));
              var upl_img_y = parseInt(_this_upload_photo.widget_body.find('.upload_photo img:first').attr('data-height'));
              if(upl_img_y > upl_img_x) _this_upload_photo.jcrop_api.setOptions({'setSelect': [0,0, upl_img_y, upl_img_y]});
              else _this_upload_photo.jcrop_api.setOptions({'setSelect': [0,0, upl_img_x, upl_img_x]});
          }
        });
        

      }
      });
      
      if (typeof(_this_upload_photo.callback_photo) === 'function') _this_upload_photo.callback_photo();    
    }
    else
    {
      _this_upload_photo.img_error.html(img_path); 
      _this_upload_photo.img_error.show();
    }
  }   
};
uploadCropPhoto.prototype.matchImg= function(img_path)
{
  //find= img_path.match(/Success (.*)\s.*id\:(.*?)$|Success (.*)$/);
  find= img_path.match(/Success (.*)\s.*id\:(.*?)(?=$|\s)|Success (.*)(?=$|\s)/); 
  if (find && find[1]) 
  {
    if (find[2]) 
    {
      this.object_id= find[2];  
      if ($('.object_id').length) $('.object_id').val(find[2]);
    }
    return find[1];  
  };
  if (find && find[3]) return find[3]; 
}                                        

uploadCropPhoto.prototype.inputChange= function(input_el){ 
  _this_upload_photo= this;
  if ($.trim(input_el.val()) && input_el.val() !== _this_upload_photo.input_upload_photo)
  {
    form= _this_upload_photo.widget_body.parents('form:first');
    old_action= form.attr('action'); 
    form.attr('action', baseUrl + form.attr('data-photo'));   
    $(form).ajaxForm(function(data){
      _this_upload_photo.is_form_func= 1;
      _this_upload_photo.formSuccess(data) 
    });
    
    _this_upload_photo.widget_body.find('.upload_photo img').css('opacity', 0); 
    $('.jcrop-holder').addClass("browseAjaxLoad");
    form.submit();    
    if (!old_action) old_action= '';
    form.attr('action', old_action);
    form.unbind('submit')
  }       
};

uploadCropPhoto.prototype.refreshPreview= function(){ 
  koef_x= 1;
  koef_y= 1;
  if ($('.upload_photo img:first').attr('data-width'))
  {
    koef_x= parseInt($('.upload_photo img:first').attr('data-width')) / $('.jcrop-holder').width();
    koef_y= parseInt($('.upload_photo img:first').attr('data-height')) / $('.jcrop-holder').height(); 
  }
  
  widget_body= $('.' + this.jcrop_api.getOptions().addClass);  
  
  c = 
  {
    x: widget_body.find('input[name="x1"]').val()/koef_x,
    y: widget_body.find('input[name="y1"]').val()/koef_y,
    x2: widget_body.find('input[name="x2"]').val()/koef_x,
    y2: widget_body.find('input[name="y2"]').val()/koef_y,
    w: widget_body.find('input[name="width"]').val()/koef_x,
    h: widget_body.find('input[name="height"]').val()/koef_y
  }

  uploadCropPhoto.prototype.jcropShowPreview(c, widget_body);  
}

uploadCropPhoto.prototype.jcropShowCoords= function(c){         
  //koef_x= parseInt($('.upload_photo img:first').css('width')) / $('.jcrop-holder').width();
  //koef_y= parseInt($('.upload_photo img:first').css('height')) / $('.jcrop-holder').height();
  koef_x= 1;
  koef_y= 1;
  if ($('.upload_photo img:first').attr('data-width'))
  {
    koef_x= parseInt($('.upload_photo img:first').attr('data-width')) / $('.jcrop-holder').width();
    koef_y= parseInt($('.upload_photo img:first').attr('data-height')) / $('.jcrop-holder').height(); 
  }
  widget_body= $('.' + this.getOptions().addClass); 
  widget_body.find('input[name="x1"]').val(c.x*koef_x);
  widget_body.find('input[name="y1"]').val(c.y*koef_y); 
  widget_body.find('input[name="x2"]').val(c.x2*koef_x);
  widget_body.find('input[name="y2"]').val(c.y2*koef_y); 
  widget_body.find('input[name="width"]').val(c.w*koef_x);
  widget_body.find('input[name="height"]').val(c.h*koef_y);  
  uploadCropPhoto.prototype.jcropShowPreview(c, widget_body);
};

uploadCropPhoto.prototype.jcropShowPreview= function(coords, widget_body){    
  if (parseInt(coords.w) > 0)
  { 
    var img_w= widget_body.find('.upload_photo .jcrop-holder img').width();
    var img_h= widget_body.find('.upload_photo .jcrop-holder img').height();
    var rx = widget_body.find('.photo_template_outter').width() / coords.w;
    var ry = widget_body.find('.photo_template_outter').height() / coords.h;

    widget_body.find('.photo_template').css({
      width: Math.round(rx * img_w) + 'px',
      height: Math.round(ry * img_h) + 'px',
      marginLeft: '-' + Math.round(rx * coords.x) + 'px',
      marginTop: '-' + Math.round(ry * coords.y) + 'px'
    });

    widget_body.find('.photo_template').css('display', 'block');
    widget_body.find('.photo_template').show();
    widget_body.find('.photo_template').parent().show();
  }
}

$(document).ready(function()
{  
  ucp= new uploadCropPhoto($('.person_photo_widget'));
  $('.upload_photo_button').live('click',function(e){
        $(this).parent().find('input').trigger('click');
        return false;
    }); 
});