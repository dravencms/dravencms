var OverView = function()
{
  var initPriceSlider = function()
  {
    var $minVal = $('input[name="minVal"]');
    var $maxVal = $('input[name="maxVal"]');
    var minVal = parseInt($minVal.attr('data-min-val'));
    var maxVal = parseInt($maxVal.attr('data-max-val'));
    var startMin = parseInt($minVal.val());
    var startMax = parseInt($maxVal.val());
    var $priceRange = $('#price-range');
    if($priceRange.length > 0){
      noUiSlider.create($priceRange[0], {
        range: {
          'min': minVal,
          'max': maxVal
        },
        start: [startMin,startMax],
        connect: true
      });

      $priceRange[0].noUiSlider.on('update', function( values, handle ) {
        var value = values[handle];

        if ( handle ) {
          $maxVal.val(parseInt(value));
        } else {
          $minVal.val(parseInt(value));
        }
      });

      $maxVal.on('change', function(){
        $priceRange[0].noUiSlider.set([null, this.value]);
      });

      $minVal.on('change', function(){
        $priceRange[0].noUiSlider.set([this.value, null]);
      });

      $('#clearPrice').click(function(){
        $priceRange[0].noUiSlider.set([minVal, maxVal]);
      });
    }
    
    $('input').iCheck({
      checkboxClass: 'icheckbox',
      radioClass: 'iradio'
    });
    
    var $subcatToggle = $('.filter-section .categories .has-subcategory > a');
    $subcatToggle.click(function (e) {
      e.preventDefault();
      $(this).parent().toggleClass('opened');
      $(this).parent().children('ul.subcategory').toggleClass('open');
    });

  };

  initPriceSlider();
  
  	//Clear Checkbox filters
	$(document).on('click', '.clearChecks', function(){
		$(this).parent().find('input[type="checkbox"]').iCheck('uncheck');
	});
  
  $(document).on("click", "a.overview-ajax", function (event) {
    event.preventDefault();
    $('.overview').html('<div class="ajax-loader"></div>');
    
    //If category slector, set it active
    if ($(this).hasClass('categoryfilter'))
    {
      $('.categoryfilter').removeClass('active');
      $(this).addClass('active');
    }
    $.nette.ajax(this.href)
    .done(function (payload) {
      initPriceSlider();
    });
  });
  
  $(document).on('ifChecked ifUnchecked click', '.filter', function(e){
    $(this).closest('form').submit();
  });
  
  $(document).on("submit", "form.overview-ajax", function (event) {
    event.preventDefault();
    $('.overview').html('<div class="ajax-loader"></div>');
    $.nette.ajax({'nette': false}, $(this), event)
    .done(function (payload) {
      initPriceSlider();
    });
  });
};
