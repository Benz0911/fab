PulledJobs = [];
SpecOneArray = [];  //{[id: spec_one_id; name: name]}
SpecTwoArray = [];  //[spec_one_id][[spec_two_id][name]]
txtDefault = '*Selected specialism';

$(document).ready(function(){

    var defaultArray = [];
    loadAllSpecOne();
    
    defaultArray[0] = {'id': 0,'name': txtDefault};
	SpecTwoArray[0] = defaultArray;
	

    $(".jobs-list-show").live('click',onExpandJob)
	
	//повторная отправка уведомлений о работе (только alerts)
	$(".alerts").live('click', reSendAlert)   
	
	//NU: Смена специальности первого уровня
	 $(".change-sp").live("change", changeSpecialismLevelOne)
	 
	//NU: Сохранение работы (специальностей)
	$(".save-btn").live("click", saveJob)
    
    //NU: Деактивация работы
	$(".deactivate-btn").live("click", deactivateJob)

})


//Функция отрабатывает после загрузки всего документа 1 раз
//Заполняет массив SpecOneArray - специальностями 1-го уровня
loadAllSpecOne = function()
{
    $.ajax({
	         type:  'POST',
			 url:   baseUrl + 'get_all_sp_one',
			 dataType: 'json',
			 success : function(data) {
                  data = data.sp_lvl_one; //спарсенный массив
				  SpecOneArray.push({'id':0, 'name':txtDefault});
				  
				  if(data.length > 0){ //заполнение массива
				      for(var key in data)
                      {
                        SpecOneArray.push({'id':data[key]['id'], 'name':data[key]['name']});
                      }
					  
				  }
				  if(window.global_job_id != undefined && window.global_sp_one_id != undefined) //в случае, если какой-то блок уже открыли, нужно дорисовать список специальностей 1-го уровня
				  {
				      DrawListSpecialismOne(global_sp_one_id, global_job_id);    
				  }
			}
           },'json')	
}

//подготавливает html
getHtmlForSpecOne = function(in_data, in_selected_spec_one_id)
{
   var html;
   
   if(!(in_data instanceof Array)) 
      return false;
	  
   html = "<select class=\"select-sp change-sp\" >";  //переопределить класс
   for(var key in in_data)
   { 
       html += " <option ";
	   if(in_data[key].id == in_selected_spec_one_id)
	   {
	       html += " selected=\"selected\" ";
	   }	   
       html += " value = "+ in_data[key].id + ">" + in_data[key].name + "</option>";
   }
   html += "</select>";   

   return html;
}

//Функция загружает специальности второго уровня, если их нет в массиве SpecTwoArray,
//подготавливает html и прорисовывает на странице  
loadSpecTwo = function(in_spec_one_id, in_spec_two_id, in_job_id)
{
    var intermediateArray = []; //промежуточный массив
	var find = findForKey(SpecTwoArray, in_spec_one_id); //поиск по ключу в массиве
		
	if(!find)
	{
	    $.ajax({
	         type:  'POST',
			 url:   baseUrl + 'get-sp-lvl-two/'+in_spec_one_id,
			 dataType: 'json',
			 success : function(data) {
			     data = data.sp_lvl_two;
				 if(data.length > 0)
				 {
				     intermediateArray = [];
					 intermediateArray.push({'id':0, 'name':txtDefault});
			         for(var key in data)
				     {
                         intermediateArray.push({'id': data[key]['id'],'name': data[key]['name']});
				     }
					 
					 SpecTwoArray[in_spec_one_id] = intermediateArray;
				}
                DrawListSpecialismTwo(in_spec_one_id, in_spec_two_id, in_job_id);
			}
           },'json')
	} 
	else
	{
	    DrawListSpecialismTwo(in_spec_one_id, in_spec_two_id, in_job_id);
	}
}

//подготавливает html для вывода на страницу
getHtmlForSpecTwo = function(in_data, in_selected_spec_two_id)
{
    var html;
	  
    html = "<select class=\"select-sp\" >";  //переопределить класс

    for(var key in in_data)
    {
		html += "<option ";
	    if(in_data[key].id == in_selected_spec_two_id)
		{
	        html += " selected=\"selected\" ";
		}	
        html += " value = " + in_data[key].id + ">" + in_data[key].name + "</option>";
    }
    html += "</select>";   
   
    return html;
}

//Функция поиска в массиве по ключу
findForKey = function(in_array, in_spec_one_id)
{
    for(key in in_array)
	{
	    if(key == in_spec_one_id)
		{
		   return true;
		}   
	}
	
	return false; 
}

onExpandJob = function()
{
    var tmp_array = $(this).attr('id').split('-');
    global_job_id = tmp_array[1];
    global_sp_one_id = tmp_array[3];
    
	var html;
    var job_id = tmp_array[1];     
	var sp_one_id = tmp_array[3];
	var sp_two_id = tmp_array[5];  
    
	if (PulledJobs.indexOf(job_id)<0)
    {
        pull_interested_members(job_id);	    
	    //дорисоваем выпадающий список специальностей 1 уровня
		DrawListSpecialismOne(sp_one_id, job_id);
		//достаем специальности 2-го уровня и дорисовываем
		loadSpecTwo(sp_one_id, sp_two_id, job_id);
	}
}

reSendAlert = function()
{
    var job_id = getJobId(this);
    
    if(!job_id)
    {
        $('.message-block').text('Not found job_id (supportJobs.js(180 str))');
        return;
    }
    
    var mem_number = document.getElementById('job-'+job_id+'-mem-alert').value;
    var placeholder = document.getElementById('job-'+job_id+'-mem-alert').placeholder;
    var myReg = new RegExp(/^[0-9\s,]+$/);  //строка может содержать только цифры, пробел  и запятую(разделитель)
    
    $('.message-block').text('start the processing');
    
    if(mem_number != undefined && (placeholder != undefined && mem_number != placeholder)) //в input что-то внесли 
    {
        if(!myReg.test(mem_number))  //соответствие регулярному выражению
        {
            $('.message-block').text('not re-send alert. Enter the numbers of members - 1,2,3');
            mem_number = -1;
        }          
    }
    else
        mem_number = 0;    

	if(mem_number != -1)
    {
	    $.ajax({
	    	    type: 'POST',
	    		url:   baseUrl + 'edit-jobs/re-send-alerts/'+job_id
                ,
	    		dataType: 'text',
                data: {mem_numbers: mem_number},
	    		success : function(data) {
                    $('.message-block').text(data);
	    		}
	    	},"text")
    }        
}

changeSpecialismLevelOne = function()
{   
    sp_one_id = $(this).val(); //переопределяем глобальные переменные
	sp_two_id = 0;
    var job_id = getJobId($(this).parent());
	
    if(!job_id)
    {
        $('.message-block').text('Not found job_id (supportJobs.js(217 str))');
        return;
    }
    
	loadSpecTwo(sp_one_id, sp_two_id, job_id);	
}

saveJob = function()
{
	var job_id = getJobId(this);
    
    if(!job_id)
    {
        $('.message-block').text('Not found job_id (supportJobs.js(231 str))');
        return;
    }
    var sp_lvl_one_id       = $('#job-'+job_id+'-sp-lvl-one select').val();
	var sp_lvl_two_id       = $('#job-'+job_id+'-sp-lvl-two select').val();
    var job_title           = document.getElementById('job-'+job_id+'-title').value;
    var job_description     = document.getElementById('job-'+job_id+'-description').value;
	

    sp_lvl_one_id = getVariableValue(sp_lvl_one_id);
    sp_lvl_two_id = getVariableValue(sp_lvl_two_id);
    job_title = getVariableValue(job_title);
    job_description = getVariableValue(job_description);
    
    $('.message-block').text('Saving...');
	
	$.ajax({
	         type: 'POST',
			 url:   baseUrl + 'edit-jobs/save/'+job_id,
			 data: { sp_lvl_one_id: sp_lvl_one_id, sp_lvl_two_id: sp_lvl_two_id, title: job_title, description: job_description },
			 success : function(data, status, xhr) {
                $('.message-block').text(data);
			}
	       },'text')
}

deactivateJob = function()
{
    var job_id = getJobId(this);
    
    if(!job_id)
    {
        $('.message-block').text('Not found job_id (supportJobs.js(264 str))');
        return;
    }
    
    $('.message-block').text('start the processing');
		
	$.ajax({
		    type: 'POST',
			url:   baseUrl + 'edit-jobs/deactivate/'+job_id,
			dataType: 'text',
			success : function(data) {
                if(data == undefined || data == "")
                    window.location= baseUrl + 'edit-jobs/list';
                else
                    $('.message-block').text(data);
			}
		},"text")    
}

function pull_interested_members(in_job_id)
{
    $.ajax({
        type: 'POST',
        url: baseUrl + '/edit-jobs/pull-job-details/'+in_job_id,
        dataType: 'json',
        success : function(data) {
            $('#job-'+in_job_id+'-members-placeholder').html(data.html["responded_members"]);
            PulledJobs.push(in_job_id);
        }
    }, "json");
}

DrawListSpecialismOne = function(in_sp_one_id, in_job_id)
{
    html = getHtmlForSpecOne(SpecOneArray, in_sp_one_id);
	$('#job-'+in_job_id+'-sp-lvl-one').html(html);
}

DrawListSpecialismTwo = function(in_sp_one_id, in_sp_two_id, in_job_id)
{
    html = getHtmlForSpecTwo(SpecTwoArray[in_sp_one_id], in_sp_two_id);
	$('#job-'+in_job_id+'-sp-lvl-two').html(html);
}

//Функция возвращает значение переменной: -1 если переменная не определена, иначе значение переменной

getVariableValue = function(in_variable)
{
    if(in_variable == 0 || in_variable == undefined || in_variable == '')
        in_variable = -1;
	
	return in_variable; 
}


getJobId = function(_this)
{
    var id = $(_this).attr('id');
    var job_id = false;
    if (id !== undefined){
        tmp_array = $(_this).attr('id').split('-');
        job_id =  tmp_array[1];   
    }
	
    return job_id; 
}