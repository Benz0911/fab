$(document).ready(function(){
    specialismAutocomplete();
	
	//при клике на кнопке поиска если не установлены специальность и уровень специальности, необходимо их найти по ключевым словам
	$('.letushelp-submit').live('click',function(){
		   var form_name = $(this).parents('.fb_form')[0].name;
           if($('input[name="'+form_name+'[specialist_id]"]').val() == '' &&  $('input[name="'+form_name+'[table_level]"]').val()== '' && $('input[name="'+form_name+'[specialist]"]').val() != '')
			{
			    if (specialisms_search.length > 0) //если есть ключевые слова, тогда устроим поиск по ним
			    {
				    data_search= SpecialismSearch(specialisms_search, $('input[name="'+form_name+'[specialist]"]').val(), true); //поиск
			    	//Вернулось найденное значение, обработаем его
			    	if (data_search.length > 0)
			    	{
                        $('input[name="'+form_name+'[specialist_id]"]').val(data_search[0].specialist_id);  
                        $('input[name="'+form_name+'[table_level]"]').val(data_search[0].table_num); 
					}
			    }
			}
    });
});

var specialisms_search= [];

function specialismAutocomplete () {      
    var input = $('.specialist_widget');
    var data_search = [];	

    input.autocomplete({
        minLength: 3,
        source: function(request, response) {
			var form_name = this.element.parents('.fb_form')[0].name;
            //обнулим ранее установленные значения		
            $('input[name="'+form_name+'[specialist_id]"]').val('');  
            $('input[name="'+form_name+'[table_level]"]').val('');  
            
			request.value = this.element.val(); //введенное значение
			if (specialisms_search.length > 0) //если есть ключевые слова, тогда устроим поиск по ним
			{
			    data_search= SpecialismSearch(specialisms_search, request.value); //Поиск	
				if (data_search.length == 0)//Если ничего не найдено, вызываем другой механизм для поиска специальностей
				{
				    //вызвать функцию обращения к базам данных на сервер (как перенести метод в отдельный???)
					$.ajax({
                        'url': baseUrl + '/find_job/getSpecialism/',
                        'dataType': 'json',
                        'data': request,
                        'success': response,
                        'showLoader' : false
                        }).done(function(json_data) {
                          response(putValueToField (json_data));
                        });
				}
				else
				    response(putValueToField (data_search));    
			}
			else
			{   //вызвать функцию обращения к базам данных на сервер, если нет ключевых слов
			     $.ajax({
                    'url': baseUrl + '/find_job/getSpecialism/',
                    'dataType': 'json',
                    'data': request,
                    'success': response,
                    'showLoader' : false
                    }).done(function(json_data) {
                      response(putValueToField (json_data));
                    });
			}              
        },
        select: function(event, ui) 
        {
            var form_name = $(this).parents('.fb_form')[0].name;
			value=ui.item.value; //выбранное значение
			
            value= value.replace(/^.*?>\s/, ""); //удаление левых символов
            $('input[name="'+form_name+'[specialist]"]').val(value);
            $('input[name="'+form_name+'[specialist_id]"]').val(ui.item.id);  
            $('input[name="'+form_name+'[table_level]"]').val(ui.item.table);  
            
			return false;               
        }	
    });

    var putValueToField = function(value) 
    {
      var data = [];
      $.each(value, function(i, val) 
      {   
        data.push({value: val.name, id: val.specialist_id, table: val.table_num}); 
      });
      return data;       
    }
}

function SpecialismSearch(arr, str, exactly)
{
  result= [];
  var my_reg= new RegExp( "^" + str + ".*$", "i");  
  if (typeof(exactly) != 'undefined' && exactly) my_reg= new RegExp( "^" + str + "$", "i");

  for (var key in arr)
  {
    a= typeof(arr[key]) != 'undefined'; //определен элемент
    b= typeof(arr[key]['name']) != 'undefined'; //определено значение
    c= my_reg.test(arr[key]['name']); //соответствие регулярному выражению
    d= $.trim(arr[key]['name']);   //удаляем пробелы
    if (a && b && c && d) //если прошли проверку
    result.push(arr[key]); //помещаем в массив     
  }   
  
  return result;
}

//метод пока не используется, но нужно его применить в будущем.
function SpecialismSearchOldMetod(request)
{   
    var data_return;
	
    $.ajax({
      url: baseUrl + '/find_job/getSpecialism/',
      dataType: 'json',
      data: request,
      success: function(data){
      data_return = data;
    }}, "json");
	
	return data_return;
}

//достаем ключевые слова
if (!specialisms_search.length) 
   initSpecialismSearchAllFirst();

function initSpecialismSearchAllFirst()
{
    if (!specialisms_search.length)
    {
        $.ajax({
          type: 'GET',
          url: baseUrl + 'find_job/get_specialisms_search/',
          dataType: 'json',
          success : function( data, status, xhr ) { 
                  specialisms_search= data.specialisms_search;
				 
            }
        }, "json");   
    }
}