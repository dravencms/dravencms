;(function($) {
    "use strict";

    $.nette.ext('grido-ordered',
    {
        success: function(payload)
        {
            initOrderer();
        }
    }, 
    {
        selector: null
    });

})(jQuery);

$(document).ready(function(){
  initOrderer();
});

function initOrderer()
{
  $("table.ordered tbody").sortable({ 
    cursor: "move", 
    handle: ".checker", 
    placeholder: "ui-state-highlight",
    stop: function( event, ui ) 
    {
      var arr = [];
      var gridName = '';
      $.each($(this).sortable('toArray'), function(k, v){
        var splited = v.split('-');
        if(splited[0] == 'order')
        {
          arr.push(splited[2]);
          gridName = splited[1];
        }
      });
      
      var ajaxData = {};
      ajaxData.order =  arr;
      
      $.get(document.URL + '&do=' + gridName + '-reorder', ajaxData, function (items) {
      }, "json");
      
    },
    helper: function(e, ui) {
      ui.children().each(function() {
        $(this).width($(this).width());
      });
      return ui;
    }
  });
}