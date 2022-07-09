/*
  Constructor
  @formId {string} id of the html form, example #myform
*/

FabListAB = function(formId) {
  this.formId = formId;
  this.items = [];
  this.$selectObj = $(this.formId).find('select');
  this.$list_b_placeholder = $(this.formId).find('.list_b_placeholder');
  this.$list_b_items_csl = $(this.formId).find('.list_b_items_csl');
  this.bind();
}

FabListAB.prototype = {
  addWrapper : function() {
     var $opt;
     $opt = this.$selectObj.find("option:selected"); //объект option - выделенный элемент списка
     this.addToListB($opt); //добавляем в группу
     this.refreshListB(); //перерисовываем группу
     $opt.remove(); //удаляем из списка А  
  },

/*
  Добавляет элемент в список B
  @$opt {object} объект option - выделенный элемент списка
*/  
  addToListB : function($opt) {
    var new_item = [];
    if (!$opt.val()) { return; } //запрет на добавление пустых элементов
    new_item = [$opt.val(), $opt.text()];
    this.items.push(new_item);
  },
  
  removeFromListB : function(id) {
    //сначала находим нужный элемент в массиве group_items
    var flag = false,
        i = 0,
        j = 0,
        html = '';
    while (i < this.items.length && !flag) {
      (this.items[i][0] == id) ? flag = true : i++;
    }
    if (flag) { //нашли елемент
      //сначала добавим его опять в список А
      html = "<option value=\""+this.items[i][0]+"\">"+this.items[i][1]+"</option>";
      this.$selectObj.append(html);
      optCol = this.getSorted(this.$selectObj.find("option"));
      html = '';
      for (j=0; j<optCol.length; j++){
          html += "<option value=\""+$(optCol[j]).val()+"\">"+$(optCol[j]).text()+"</option>";
      }
      this.$selectObj.html(html);

      //теперь удаляем из группы
      var arr1 = (i>0) ? this.items.slice(0,i) : new Array();
      var arr2 = (i+1 < this.items.length) ? this.items.slice(i+1) : new Array();
      this.items = arr1.concat(arr2);
    }  
  },
  
  sortingMethod : function(a,b){
      if ($(a).text()<$(b).text()){    
          return -1;
      }
      else if ($(a).text()>$(b).text()){   
          return 1;
      }
      else {
          return 0;
      }
  },
  
  getSorted : function(arr) {
      arr.sort(this.sortingMethod);
      return arr;
  },
  
  save : function() {
    var csl = "",
        kol = this.items.length - 1;
    //проверить что массив не пустой
    if (this.items.length <= 0 ) {return }; 
    for (var i = 0; i < this.items.length; i++) { 
	   (i == kol) ? csl += this.items[i][0] : csl +=  this.items[i][0] + "|" ;
    }
    this.$list_b_items_csl.attr("value",csl);        
    $(this.formId).submit();  
  },
  
  refreshListB : function() {
    var html = "<table>";
    for (var i = 0; l = this.items.length, i < l; i++) {
        html += "<tr>";
        html += "<td>";
        html += this.items[i][1];
        html += "</td>";
        html += "<td>";
        html += "<input type=\"button\" value=\"^\" id=\"btn_remove_";
        html += this.items[i][0];
        html += "\" class=\"btn_remove_from_list_b\" />";
        html += "</td>";
        html += "</tr>";
    }
    html += "</table>";
    this.$list_b_placeholder.html(html);
  },
  
  bind : function() {
    var that = this;
    $(this.formId).find(':button').live('click', function(e) {
      var $target = $(e.target),
          _this = $(this);  
      if ($target.is('.form_submit')) {
        that.save();
      }
      else if ($target.is('.btn_remove_from_list_b')) {
        that.removeFromListB($(this).attr("id").split("remove_").pop());
        that.refreshListB();
      }
      else if ($target.is('.btn_add_to_list_b')) {
        that.addWrapper();
      }
    });
  }
};


