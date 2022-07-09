// функция инициализирует фотогалереи
function initGallery() {
    $('.gallery-lis').each(function () { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: '.gallery-item', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true,
                preload: [0, 1], // read about this option in next Lazy-loading section
                navigateByImgClick: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                tPrev: 'Previous', // title for left button
                tNext: 'Next', // title for right button
                tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
            },
            image: {
                titleSrc: function (item) {
                    return item.el.attr('data-description');
                },
            }
        });
    });
}

function loadGalery(_this) {
	var case_id = _this.attr('case-study-id');
	var items = [];
	
	   $.ajax({
       type: 'POST',
       url: baseUrl + 'profile/GetProjectPhoto',
	   dataType: 'json',
       data: { case_id: case_id },  
       success : function( data, status, xhr ) 
       { 
           
           var photos = data['photos']; //получить фоторграфии

           for(var key in photos)
           {
	           items.push({
                           src: photos[key]['photo'],
						   description: photos[key]['text'],
						   cs_title:photos[key]['cs_title']
                         });
           }				  
       },
	    complete: function() {
	    // initalize popup
           $.magnificPopup.open({ 
               key: 'my-popup', 
		    items: items,
               type: 'image',
               gallery: {
                   enabled: true,
                   preload: [0, 1], // read about this option in next Lazy-loading section
                   navigateByImgClick: true,
                   arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                   tPrev: 'Previous', // title for left button
                   tNext: 'Next', // title for right button
                   tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
                       },
               image: {
                   titleSrc: function (item) {
                       return '<h4>'+item.data.description+'</h4><p>'+item.data.cs_title+'</p>';
                   },
               }
           });
	}
	},'json');
}

$(document).ready(function () {
    /* Отображение блока по клику на data-toggle элемент */
    $(document).find('[data-toggle="collapse"]').live('click', function () {
        let el = $($(this).data('target'));
        if (el.length > 0) {
            el.addClass('show');
        }
    });

    /* Скрыть блок по клику на иконку крестика */
    $(document).find('.icon-close').live('click', function () {
        let el = $($(this).data('target'));
        if (el.length > 0) {
            el.removeClass('show');
        }
    });

    /* Развернуть/свернуть раскрывающееся меню */
    $(document).find('[data-toggle="dropdown"]').live('click', function () {
        let el = $($(this).data('target'));
        if (el.length > 0) {
            $(this).toggleClass('expanded');
            el.toggleClass('show');
        }
    });

    /* Accordion */
    $('[data-toggle="accordion"]').live("click", function () {
        var self = $(this);
        if (self.hasClass('active')) {
            self.removeClass("active");
            self.siblings('[data-accordion-content]').slideUp(200);
        } else {
            $('[data-toggle="accordion"]').removeClass("active");
            $('[data-accordion-content]').slideUp(200);
            self.addClass("active");
            self.siblings('[data-accordion-content]').slideDown(200);
            setTimeout(function(){
                $('html, body').animate({
                    scrollTop: self.offset().top
                }, 200);
            }, 250)
        }
    });

    /* Модалка выбора и смены Membership Number */
    $('a#switchMemModal').colorbox({
        width: "95%",
        maxWidth: "450px",
        close: "",
        opacity: "0.5",
        scrolling: false,
        className: "modal-dialog",
        inline: true,
        initialHeight: "300",
        transition: "none",
        href: "#switchMemModalContainer"
    });

    /* расчет процента заполнения линии диаграммы */
    $(document).find('.chart-bar').each(function () {
        let chartBar = $(this);
        let max = +(chartBar.data('max'));
        if (max) {
            chartBar.find('.item-line').each(function () {
                let itemLine = $(this);
                let score = +(itemLine.data('score'));
                if (score) {
                    let width = (score * 100) / max;
                    itemLine.find('.line-fill').css('width', width + '%');
                }
            });
        }
    });

    //догрузка блока с case study, awards, insurance, people, feedbacks
    if ($("#load_blocks").length > 0) {
        var member_id = $("#load_blocks").get(0).getAttribute('member_id');
        var el = document.createElement('html');

        $.ajax({
            type: 'POST',
            url: baseUrl + 'profile/view-main-blocks',
            data: {mem_id: member_id},
            success: function (data, status, xhr) {
                if (data) {
                    el.innerHTML = data;
                    $("#insurance-all").replaceWith($('#insurance-all', el));
                    $("#people-all").replaceWith($('#people-all', el));
                    $("#awards-all").replaceWith($('#awards-all', el));
                    $("#case-study-from-tablet").replaceWith($('#case-study-from-tablet', el));
                    $("#case-study-only-mobile").replaceWith($('#case-study-only-mobile', el));
                    $("#feedback-all").replaceWith($('#feedback-all', el)); 
					$("#galleryFullContent").replaceWith($('#galleryFullContent', el)); 
					$("#services-from-tablet").replaceWith($('#services-from-tablet', el)); 
					$("#areas-from-tablet").replaceWith($('#areas-from-tablet', el));
					$("#services-from-mobile").replaceWith($('#services-from-mobile', el)); 
					$("#areas-from-mobile").replaceWith($('#areas-from-mobile', el));
					$("#servicesProvidedFullContent").replaceWith($('#servicesProvidedFullContent', el));
					$("#areasCoveredFullContent").replaceWith($('#areasCoveredFullContent', el));
                    $(".hide-text").hide(); //скроем все блоки с указанным классом

                    initGallery(); // переинициализируем скрипт галереи после обновления DOM ajax запросом
                }
            }
        });
    }

    $(".hide-text").hide(); //скроем все блоки с указанным классом
    $(".read-more-link").live('click', function () { //кликаем по кнопке раскрытия блоков

        var collapse_button = ($(this).hasClass('collapsed')) ? true : false; //определяем тип кнопки
        var blocks = $(this).closest(".feedback-item"); //ближайщий подходящий предок
        blocks.find(".row").each(function () { //пробегаемся по строкам

            var current_block = $(this);

            if (current_block.hasClass('active')) { //если блок активный, делаем его невидимым
                current_block.slideUp('fast', function () {
                    current_block.addClass("hide-text");
                    current_block.removeClass("active");
                });
            }
            else if (current_block.hasClass('hide-text')) {//если блок невидим, делаем его активным
                current_block.slideDown('fast', function () {
                    current_block.removeClass('hide-text');
                    current_block.addClass("active");
                });
            }
        })
    });

    // При клике на элемент, отображающий блок tooltip, скрыть ранее открыте tooltip блоки
	//NU отключила, так как другие блоки не должны закрываться
    /*$(document).find('.tooltip-item .item-link[data-toggle="collapse"]').live('click', function () {
        let el = $($(this).data('target'));
        if (el.length > 0) {
            $(document).find('.tooltip.show').not(el).removeClass('show');
        }
    });*/
    
	//Отображение галереии фотографий от tablet 
	$('.gallery-item').live('click', function() {
		loadGalery($(this));
	});
	
    //раскрыть/закрыть блоки
	$('.expand-list-link').live('click', function()  {

        var collapse_button = ($(this).hasClass('collapsed'))?false:true; //определяем тип кнопки
        var parent = $(this).parent();
    
        parent.find(".tooltip").each(function(){
        
            var current_block = $(this);
            if(!collapse_button) //раскрыть закрытые блоки
            {
                if(!current_block.hasClass('show')) //если блок закрыт
                {
		    		current_block.addClass('show');
                }
            }
            else if(current_block.hasClass('show')) //закрыть блоки
            {
                if(current_block.hasClass('show')) //если блок открыт
                {
                    current_block.removeClass('show');
                }
            }
        });
  
	    $(this).toggleClass('collapsed');
	    $(this).toggleClass('expanded');
    });  
    
	//больше специальностей
	$('.more_data').live('click', function()
	{
        var parent = $(this).parent();
    
        parent.find(".tooltip-item").each(function(){
        
            var current_block = $(this);
            
			current_block.show();
            parent.find(".more_data").hide();
			parent.find(".expand-list-link").show();
        });

	});

    // подключение owlcarousel плагина для слайдеров
    $('.reviews-slider').owlCarousel({
        center: true,
        items:1,
        loop:true,
        nav:false,
        autoplay:true,
        autoplayTimeout: 20000,
        dots:true,
        smartSpeed: 600,
    });

    // инициализация авторесайза для textarea
    $.each($('textarea[data-autoresize]'), function() {
        var offset = this.offsetHeight - this.clientHeight;

        var resizeTextarea = function(el) {
            $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };
        $(this).on('keyup input', function() {
            resizeTextarea(this);
        }).removeAttr('data-autoresize');
    });

    // инициализация datepicker
    /*if (typeof ($.datepicker) !== "undefined") {
        $( ".fb-datepicker" ).datepicker();
    }*/
	
	// инициализация datepicker
    /*if (typeof ($.datepicker) !== "undefined") {
        $( ".fb-datepicker" ).datepicker(
		{
            changeMonth : true,
            changeYear : true,
            numberOfMonths : 1,
            showButtonPanel : false,
            dateFormat: 'dd-mm-yy'
        }
		);
    }*/
	//сажаем datepicker на поле, только если установлен params (сажается в виджете)
    if($('.fb-datepicker').length > 0 && typeof(params) != 'undefined')
	{
		$(".fb-datepicker").datepicker(params);
        $("#ui-datepicker-div").hide(); //hide panel
	}

});