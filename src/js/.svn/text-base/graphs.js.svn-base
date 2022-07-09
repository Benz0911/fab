$(document).ready(function(){
    showGraphs();
})


//Функция отрабатывает после загрузки всего документа
showGraphs = function()
{
    $.ajax({
	        type:  'POST',
			url:   baseUrl + 'show-graphs1',
			dataType: 'json',
			success : function(data) {
                var line1 = [14, 32, 41, 44, 40, 47, 53, 67];
                var plot1 = $.jqplot('chart1', [line1], {
                    title: 'Chart with Point Labels', 
                    seriesDefaults: { 
                      showMarker:false,
                      pointLabels: { show:true } 
                    }
                });  
			}
           },'json')	
}
