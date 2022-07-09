function initPeopleTab()
{
  
    jQuery('#carousel').jcarousel({
      scroll:1
    } );
    if (jQuery('ul#carousel li').length<= 7)
    {
      $('#carousel').parents('.jcarousel-container:first').find('.jcarousel-prev').hide();  
      $('#carousel').parents('.jcarousel-container:first').find('.jcarousel-next').hide();
    }
    jQuery('#casecarousel').jcarousel({
      scroll:1
    } );

    jQuery('ul#carousel li img').on('click', function() 
    {
        var person_id = jQuery(this).attr('person_id');
        $(this).parents('ul:first').find('li').removeClass('current_people');
        $(this).parents('li:first').addClass('current_people');
        $(".people:visible").hide();
        jQuery('.person'+person_id).show();
    });   
}

function initCaseStudyTab()
{
      
    if (jQuery('.profile1-carousel li').length<= 4)
    {
      $('.profile1-carousel').parents('.jcarousel-container:first').find('.jcarousel-prev').hide();  
      $('.profile1-carousel').parents('.jcarousel-container:first').find('.jcarousel-next').hide();
    }
    
    jQuery('ul#second-carousel li span').click(function() 
    {
        var case_id = jQuery(this).attr('case_study_id');
        var serial_number = jQuery(this).attr('serial_number')
        $.ajax({
        type: 'POST',
        url: baseUrl + 'profile/GetCaseStudy',
        data: { case_id: case_id, serial_number: serial_number },  
        success : function( data, status, xhr ) 
        { 
            
            jQuery('#case_box').html(data);

            $('#profile1-gallery #gallery-slides').slides({ 
                preload: false,
                preloadImage: 'img/loading.gif',
                play: false,
                pause: 2500,
                hoverPause: false,
                pagination: true,
                effect: 'slide',
                generatePagination: true,
                slideSpeed: 0,
                animationComplete: changeText
            });  
        
            function changeText(current)
            {
                var index = current - 1;     //номер картинки
                $(".phototexts:visible").hide();
                jQuery("#photo_text"+index).show();    
                if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
                if ($('.slides_control img:visible:last').width()> 100 && $('.slides_control img:visible:last').height()> 100)
                {
                 // $('#gallery-slides .next').css('left', $('.slides_control img:visible:last').width() - 50);
                  $('.slides_control img:visible:last').css('display', 'inline');
                  $('#gallery-slides .next').css('top', 129 - parseInt($('#profile1-gallery').css('margin-top')));
                  $('#gallery-slides .prev').css('top', 129 - parseInt($('#profile1-gallery').css('margin-top')));
                }
       
            }
      
            jQuery('ul#profile1-hcarousel li img').live('click', function() 
            {
                var index = parseInt(jQuery(this).attr('case_study_id'));
                jQuery('ul.pagination li a[href=#' + index + ']').click();
                if (typeof initCustomCenter !== 'undefined') initCustomCenter(); 
                if ($('.slides_control img:visible:last').width()> 100 && $('.slides_control img:visible:last').height()> 100)
                {
                  $('#gallery-slides .next').css('top', 129 - parseInt($('#profile1-gallery').css('margin-top')));
                  $('#gallery-slides .prev').css('top', 129 - parseInt($('#profile1-gallery').css('margin-top')));
                }
                
                return false;
            }); 

        }
        },'html');

    });   
  
    jQuery('ul#second-carousel li span:first').click();
}

function onLoadableContentEvent()
{
  
    $('a.tooltip').tooltip({
    track: true,
    delay: 0,
    showURL: false,
    fade: 200
    });
    
	$('a.tooltip').zclip({
        path: domain + 'flash/ZeroClipboard.swf',
        copy: function(){return $('.email_full_value').html() ;},
        afterCopy: function()
        {
            createFlashErrorAndOpen('Email address has been copied to the clipboard');
        }
    });
    	
}

function createFlashErrorAndOpen(message)
{
   if(!$('.flash_error.autoclose').length)
   {
       $('body').prepend("<div class='flash_error autoclose'><div class='close'>x</div><div class='clear'></div><div class='text'>" + message + "</div><div class='clear'></div></div>");
   }
   $('.flash_error.autoclose').show(300,
       function()
       {
           $(this).css('display', 'table');
       })
   .delay(3000).fadeOut(); 
}

//В качестве переданных параметров
// stat_values   - значения статистики
// display_place - элемент, на который нужно посадить график
function drawGraph(stat_values, display_place)   
{
    //отображает график
    var xAsis = new Array(); //значения оси Х
    var valuesXY = new Array(); //точки пересечeния осей
    var stat = jQuery.parseJSON($(stat_values).val()); //спарсить переданную строку
    var i = 0;
    
    //переданная строка: В качестве свойства - значения оси Х, значения - точки пересечения осей
    for(var key in stat)
    {
	    xAsis[i] = key;
	    valuesXY[i] = parseFloat(stat[key]);
        i = i + 1;
    }
  
    if(valuesXY.length != 0)
    {
        var plot1 = $.jqplot(display_place, [valuesXY], {
		    seriesColors:['#20b3d4'],
            seriesDefaults: {
                renderer: $.jqplot.BarRenderer
            },
		    grid: {
                background: 'rgba(57,57,57,0.0)',
                drawBorder: false,
                shadow: false,
                gridLineColor: '#062A66',
                gridLineWidth: 2
            },
            axesDefaults: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
	    	    tickOptions: {
                    fontSize: '10pt',
			        showGridline: false,
			        textColor: '#062A66'
                }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
	    	        ticks: xAsis,
	    	        tickOptions:{
	    	            angle: -30,
                        formatString:'%s',
                } 
                },
	            yaxis: {
	                ticks:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	    	        tickOptions:{
                        formatString:'%s'
                    } 
	            }  	
            },
	        highlighter: {
                show: true,
		        sizeAdjust: 5,
                tooltipLocation: 'n',
                tooltipAxes: 'y',
             //useAxesFormatters: false
	        	
            },
            cursor: {
                show: false
            }
        });

    }
}

function initReferenceColorbox()
{
    //сажаем колорбокс на элемент 
    if ($('.reference_score').length)
    {
      $('.reference_score').colorbox({opacity: 0.7, width: 700, height: 500, initialWidth: 700, initialHeight: 500, onComplete: function(){
          //нарисовать график
          drawGraph('#stat_values_for_reference', 'graph_reference');
          $('.reference_score').colorbox.resize(); //перерисуем размер окна колорбокса
      }}); 
    }
}

jQuery(document).ready(function() 
{
    //Раскрываем блок специальностей если там всего одна запись верхнего уровня
    /*
    if ($('.specialisms_served .topblock').length === 1) 
    {
      $('.specialisms_served .expbutton').click();
    }
    */
    
    initPeopleTab();
    initCaseStudyTab();
    
    $('a.tooltip').live('click',function()
    {
       return false; 
    });
    
    $('.more_spec').live('click', function()
	{
	    var member_id = jQuery(this).attr('member_id');
		
	    $.ajax({
        type: 'POST',
        url: baseUrl + 'Profile/GetAllSpecialism',
        data: { mem_id: member_id},  
        success : function( data, status, xhr ) 
        {  
		   if(data)
           {
		       jQuery('.spec').html(data);
		       $('.spec').find('.hide-text').hide();
		       $('.topblock-content').find('.more_spec').hide();
			   $('.services_provided .expbutton').show();
		   }   
        }
        });
	}
	)
	$('.more_area').live('click', function()
	{
	    var member_id = jQuery(this).attr('member_id');
		
	    $.ajax({
        type: 'POST',
        url: baseUrl + 'Profile/GetAllAreasServed',
        data: { mem_id: member_id},  
        success : function( data, status, xhr ) 
        { 
		   if(data)
           {
		       jQuery('.area').html(data);
		       $('.area').find('.hide-text').hide();
		       $('.topblock-content').find('.more_area').hide();
			   $('.areas_served .expbutton').show();
		   }   
        }
        });
	}
	)
	
	//отобразить контакты мембера при нажатии на кнопку 
	$('.view-contacts').live('click', function()
	{
	    var attr_id = jQuery(this).attr('id');
		var member_id;
		var current_url = document.URL; //url страницы
		
		str_arr = attr_id.split('-');
		member_id = str_arr[2];
		
	    jQuery.ajax({
        type: 'POST',
        url: baseUrl + 'profile/view_contacts',
        data: { mem_id: member_id, referer_url: current_url},  
        success : function( data, status, xhr ) 
        { 
		   if(data)
           {
		       $('.contacts').html(data.html);
		       $('.view-contacts').hide();
			   onLoadableContentEvent();
			   //событие view-contacts теперь отслеживается автоматически через GTM		       
			  
		   }   
        }
        }, 'json');
	}
	)
	$('.scrollToFeed').live('click', function()
	    {  
		   var $links = $(this).find('a');
		   var $old_active = $('ul.tabs').find('a.active');
		   var $active = $('ul.tabs').find('a').filter('[href="'+$links.attr('href')+'"]');
		   var $old_content, $content;
           
		   $old_active.removeClass('active');
		   $old_content = $($old_active.attr('href'));
	       $old_content.hide();
		   
           $active.addClass('active');
	       $content = $($active.attr('href'));
	       $content.show();

		   $.scrollTo($active, {duration:1500});
	    }
	)

    $(document).on('click', '.profile-content .years a', function() 
    {
        
        var year = jQuery(this).attr('data-year');
        var mem_id = jQuery(this).attr('data-mem-id');
        jQuery(this).parents('.mcontent').find('.active').removeClass('active');
        jQuery(this).parents('.leftcolumn ').addClass('active'); 
        $.ajax({
        type: 'POST',
        url: baseUrl + 'profile/GetRefByTime',
        data: { year: year, mem_id: mem_id},  
        success : function( data, status, xhr ) 
        { 
           //alert(data); 
           jQuery('.ref_content').html(data);
           initReferenceColorbox();
        }
        });
       
        return false;
    });  
    
    jQuery('.profile-content .line1 .layer2').height(jQuery('.profile-content .line1 .layer1').height()-27);        
	
    //нарисовать график
    drawGraph('#stat_values', 'example');
    
    //сажаем колорбокс на элемент 
    initReferenceColorbox();
	
	//догрузка специальностей и окрестностей
	//догрузка блока с case study, awards, insurance, people
	if($("#main_blocks").length > 0) 
	{
		var member_id = $("#main_blocks").get(0).getAttribute('member_id');
	    $.ajax({
        type: 'POST',
        url: baseUrl + 'profile/view-main-blocks',
        data: { mem_id: member_id},  
        success : function( data, status, xhr ) 
        {  
		    if(data)
            {
		        jQuery('#main_blocks').html(data);
				//все что нужно для инициализации блоков
			    profileTabs();
				profileTabCarouselGallery();
                initCaseStudyTab();
				initPeopleTab();
				showImageInsurance();
				initReferenceColorbox();
				$('.spec').find('.hide-text').hide();
			    $('.area').find('.hide-text').hide();
		    }   
        }
        });
	}
	
	
});