$(document).ready(function(){
    //identification of options for geolocation
    var geo_options = {
                enableHighAccuracy : true, //обеспечение высокой точности
                maximumAge : 45000, //вернуть положение из кэша, где был пользователь 45 секунд назад
                timeout  : 30000   //количество миллисекунд, которое веб-приложение будет ожидать для получения положения. 
            };
    
    if (navigator.geolocation) {
    //tasks for pages FaB / PaJ
	$('.lnk_pick_geo').live('click', function(){
        navigator.geolocation.getCurrentPosition(default_location_fab_paj, geo_error, geo_options);
	})	
    }
})

function geo_error(error) {
        if(error.code == 1) alert("Location is not defined");
        if(error.code == 2) alert("Network is unavailable");
        if(error.code == 3) alert("Waiting time is exceeded");
}

//Корневой метод
//position - объект с координатами пользователя
//type_task - тип задачи, в зависимости от типа задачи аякс возвращает необходимые данные
//        1 - получает наименование дистрикта
//        2 - дописать.....  
//callback_func - что нужно сделать после получения данных
function geo_success(position, type_task, callback_func) {
        $.ajax({
            url: '/geo_async/get_location_info_by_coordinates',
            dataType: "json",
            type: 'POST',
            data: {'lt': position.coords.latitude, 'lg': position.coords.longitude, 'type_task':type_task}
        })
        .done(function( data ) {
		    if(data) {
                callback_func(data);
			}
        });
}


//Заполнение поля local area по умолчанию дистриктом, в котором находится пользователь (для страниц FaB and PaJ)
//**********************************************************
function def_loc_fab(data) {
	if(data)
	{
	    $(".localarea_widget").val(data.name);
		$('.localarea_widget_district_id').val(data.id); 
		$('.localarea_widget_id').val(''); //обнулим ранее установленную локал ареа
		//Отправим гуглу событие, если это продакшен
		if(location.hostname == 'find-a-builder.com' || location.hostname == 'www.find-a-builder.com')
			gtag('event', 'geolocation-'+'d_'+data.id, {'event_category':'find-a-builder', 'event_label':'d_'+data.id});
	}
}

function default_location_fab_paj(position) {

    geo_success(position, '1', def_loc_fab);
}
//**********************************************************