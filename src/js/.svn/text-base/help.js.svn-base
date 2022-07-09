$(document).ready(function(){
    var br = $.browser;
    $(window).scroll(function() {
        var top = $(document).scrollTop();
        var bottom = $(document).height() - top - $(window).height();

        var BOTTOM_DISTANCE = 325;
        var TOP_DISTANCE = 145;
        var HEIGHT_FOOTER = 695;
        var HEIGHT_PAGE = $(document).height();
        var HEIGHT_MENU = $(".static_menu").height();
        var BOTTOM_BORDER = HEIGHT_PAGE - HEIGHT_FOOTER - HEIGHT_MENU;

        // if page is short to skip fixed menu
        if(HEIGHT_FOOTER + HEIGHT_MENU + TOP_DISTANCE < HEIGHT_PAGE){
            if (top < TOP_DISTANCE) {
                $(".static_menu").css({top: '0', position: 'relative', marginLeft: '0'});
            } else if ((!br.msie) || ((br.msie) && (br.version > 7))) {
                $(".static_menu").css({top: '22px', position: 'fixed', marginLeft: '0'});
            } else if ((br.msie) && (br.version <= 7)) {
                $(".static_menu").css({top: '22px', position: 'fixed', marginLeft: '25px'});
            }
            if(bottom < (BOTTOM_DISTANCE)){
                $(".static_menu").css({top: BOTTOM_BORDER, position: 'relative', marginLeft: '0'});
            }
        }
    });

    getArticle('01');

    $('.static_menu.help .menu_item').live('click', function(){
        var id = $(this).data('id');

        $("html, body").animate({scrollTop:0}, '500', 'swing', function(){
            $('.wrapper_help').hide();
            getArticle(id);
        });
    });

    $('.menu_left .menu_item').live('click', function(){
        data_id= $(this).attr('data-id');
        $('.menu_left .current_item').removeClass('current_item');
        $(this).addClass('current_item');
        $('.content_right .content_item').hide();
        $('.content_right .content_item_' + data_id).show();
    });
});

function getArticle(id){
    var folder = $('input[name=folderHelper]').val();
    if(folder){
        $.get("/help/getHelpArticle?idArticle=" + id + '&folder=' + folder, function(data)
        {
            $('.wrapper_help').html(data);
            $('.wrapper_help').show();
        });

        $('.menu_wrap .menu_item').each(function(i){
            var $currentId = $(this).data('id');
            if($currentId == id){
                $(this).addClass('current_item');
            }
            else{
                $(this).removeClass('current_item');
            }
        });
    }
}