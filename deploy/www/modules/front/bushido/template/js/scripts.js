/*
 *Bushido HTML5 E-Commerce Template v1.2
 *Copyright 2014 8Guild.com
 *All scripts for Bushido HTML5 E-Commerce Template
 */

/*Document Ready*////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(e) {

	/*Global Variables
	*******************************************/
  var $searchBtn = $('.search-btn');
	var $searchForm = $('.search-form');
	var $closeSearch = $('.close-search');
	var $nextField = $('.subscr-next');
	var $loginBtn = $('.login-btn');
	var $cartTotal1 = $('.cart-dropdown .total');
	var $header = $('header');
	var $headerOffsetTop = $header.data('offset-top');
	var $headerStuck = $header.data('stuck');
	var $menuToggle = $('.menu-toggle');
	var $menu = $('.menu');
	var $submenuToggle = $('.menu .has-submenu > a > i');
	var $submenu = $('.menu .submenu');
	var $featureTab = $('.feature-tabs .tab');
	var $featureTabPane = $('.feature-tabs .tabs-pane');
	var $brandCarousel = $('.brand-carousel .inner');
	var $shareBtn1 = $('.tile .share-btn i');
	var $offersTabs = $('.offer-tabs .tab-navs a');
	var $offersTabsCarousel = $('.offer-tabs .tab-navs');
	var $sortToggle = $('.sorting a');
	var $activePage = $('.pagination li.active a');
	var $subcatToggle = $('.filter-section .categories .has-subcategory > a');
	var $filterToggle = $('.filter-toggle');
	var $scrollTopBtn = $('#scrollTop-btn');
	var $qcfBtn = $('#qcf-btn');
	var $addToCartBtn = $('#addItemToCart');
	var $addedToCartMessage = $('.cart-message');
	var $promoLabels = $('.promo-labels div');
	var $panelToggle = $('.panel-toggle');
	var $accordionToggle = $('.accordion .panel-heading a');

	/*Search Form Toggle
	*******************************************/
	$searchBtn.click(function(){
		$searchForm.removeClass('closed').addClass('open');
	});
	$closeSearch.click(function(){
		$searchForm.removeClass('open').addClass('closed');
	});
	$('.page-content, .subscr-widget, footer').click(function(){
		$searchForm.removeClass('open').addClass('closed');
	});

	/*Login Forms
	*******************************************/
	$('#log-password').focus(function(){
		$(this).attr('type', 'password');
	});

	/*Adding Placeholder Support in Older Browsers
	************************************************/
	$('input, textarea').placeholder();

	/*Shopping Cart Dropdown
	*******************************************/
	//Deleting Items
	$(document).on('click', '.cart-dropdown .delete', function(){
		var $target = $(this).parent().parent();
		var $positions = $('.cart-dropdown .item');
		var $positionQty = parseInt($('.cart-btn a span').text());
		$target.hide(300, function(){
			$.when($target.remove()).then( function(){
				$positionQty = $positionQty -1;
				$('.cart-btn a span').text($positionQty);
				if($positions.length === 1) {
					$('.cart-dropdown .body').html('<h3>Cart is empty!</h3>');
				}
			});
		});
	});

	/*Shopping Cart Page
	*******************************************/
	//Deleting Items
	$(document).on('click', '.shopping-cart .delete i', function(){
		var $target = $(this).parent().parent();
		var $positions = $('.shopping-cart .item');
		$target.hide(300, function(){
			$.when($target.remove()).then( function(){
				if($positions.length === 1) {
					$('.shopping-cart .items-list').remove();
					$('.shopping-cart .title').text('Shopping cart is empty!');
				}
			});
		});
	});

	/*Wishlist Deleting Items
	*******************************************/
	$(document).on('click', '.wishlist .delete i', function(){
		var $target = $(this).parent().parent();
		$target.hide(300, function(){
			$.when($target.remove()).then( function(){
				if($positions.length === 1) {
					$('.wishlist .items-list').remove();
					$('.wishlist .title').text('Wishlist is empty!');
				}
			});
		});
	});

	/*Catalog 3-rd Level Submenu positioning
	*******************************************/
	$('.catalog .submenu .has-submenu').hover(function(){
		var $offseTop = $(this).position().top;
		$(this).find('.sub-submenu').height($('.catalog .submenu .offer').height()-12);
		$('.catalog .submenu .offer .col-1 p').hide();
		$(this).find('.sub-submenu').css({top: -$offseTop +12 + "px"}).show();
	},function(){
		$(this).find('.sub-submenu').hide();
		$('.catalog .submenu .offer .col-1 p').show();
	});

	/*Small Header slide down on scroll
	*******************************************/
	if($(window).width() >= 500){
		$(window).on('scroll', function(){
				if($(window).scrollTop() > $headerOffsetTop ){
					$header.addClass('small-header');
				} else {
					$header.removeClass('small-header');
				}
				if($(window).scrollTop() > $headerStuck ){
					$header.addClass('stuck');
				} else {
					$header.removeClass('stuck');
				}
		});
	}

	/*Mobile Navigation
	*******************************************/
	//Mobile menu toggle
	$menuToggle.click(function(){
		$menu.toggleClass('expanded');
	});

	//Submenu Toggle
	$submenuToggle.click(function(e){
		$(this).toggleClass('open');
		$(this).parent().parent().find('.submenu').toggleClass('open');
		e.preventDefault();
	});

	/*Subscription Form Widget
	*******************************************/
	$nextField.click(function(e){
		var $target = $(this).parent();
			if($subscrForm.valid() === true){
				$target.hide('drop', 300, function(){
					$target.next().show('drop', 300);
				});
			}
		e.preventDefault();
	});

	/*Custom Style Checkboxes and Radios
	*******************************************/
	$('input').iCheck({
    checkboxClass: 'icheckbox',
    radioClass: 'iradio'
  });

	/*Parallax Backgrounds
	*******************************************/
	$(window).on('load', function(){
		/*Checking if it's touch device we disable parallax feature due to inconsistency*/
		if (Modernizr.touch) {
			$('body').removeClass('parallax');
		}
		$('.parallax').stellar({
			horizontalScrolling: false,
			responsive:true
		});
	});

	/*Features Tabs
	*******************************************/
	$featureTab.on('mouseover', function(){
		$featureTab.removeClass('active');
		$(this).addClass('active');
		var $curTab = $(this).attr('data-tab');
		$featureTabPane.removeClass('current');
		$('.feature-tabs .tabs-pane' + $curTab).addClass('current');
	});

	/*Enable Touch / swipe events for carousel
	*******************************************/
	$(".carousel-inner").swipe( {
		//Generic swipe handler for all directions
		swipeRight:function(event, direction, distance, duration, fingerCount) {
			$(this).parent().carousel('prev');
		},
		swipeLeft: function() {
			$(this).parent().carousel('next');
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
	});

	/*Initializing Gallery Plugin
	*******************************************/
	gallery.init();
	$('.gallery-grid').lightGallery({
		speed: 400
	});

	/*Initializing Brands Carousel Plugin
	*******************************************/
	$brandCarousel.owlCarousel({
		// Define custom and unlimited items depending from the width
		// If this option is set, itemsDeskop, itemsDesktopSmall, itemsTablet, itemsMobile etc. are disabled
		// For better preview, order the arrays by screen size, but it's not mandatory
		// Don't forget to include the lowest available screen size, otherwise it will take the default one for screens lower than lowest available.
		// In the example there is dimension with 0 with which cover screens between 0 and 450px
		itemsCustom : [
			[0, 1],
			[340, 2],
			[580, 3],
			[991, 4],
			[1200, 5]
		],
		navigation : true,
		theme: "",
		navigationText : ["",""]
	});

	/*Hero Slider
	*******************************************/
	if($('#hero-slider').length > 0) {
		var heroSlider = new MasterSlider();
		heroSlider.control('arrows');
		heroSlider.control('bullets');
		heroSlider.setup('hero-slider' , {
				width:1140,
				height:455,
				space:0,
				speed: 18,
				autoplay: true,
				loop: true,
				layout: 'fullwidth',
				preload:'all',
				view:'basic',
				instantStartLayers: true
		});
	}

	/*Hero Fullscreen Slider
	*******************************************/
	if($('#fullscreen-slider').length > 0) {
		var fullscreenSlider = new MasterSlider();
		fullscreenSlider.control('arrows');
		fullscreenSlider.control('bullets');
		fullscreenSlider.setup('fullscreen-slider' , {
				width:1140,
				height:455,
				space:0,
				speed: 18,
				autoplay: true,
				loop: true,
				layout: 'fullscreen',
				fullscreenMargin: 144,
				preload:'all',
				view:'mask',
				instantStartLayers: true
		});
	}

	/*Category Slider
	*******************************************/
	if($('#cat-slider').length > 0) {
		var categorySlider = new MasterSlider();
		categorySlider.control('thumblist' , {autohide:false ,dir:'h', type:'tabs',width:164,height:280, align:'bottom', space:30 , margin:13, hideUnder:400});
		categorySlider.setup('cat-slider' , {
				width:1050,
				height:550,
				space:0,
				speed: 25,
				layout: 'fullwidth',
				preload:'all',
				view:'basic',
				instantStartLayers: true
		});
	}

	/*Offers Tabs
	*******************************************/
	$offersTabs.click(function(){
		$offersTabs.removeClass('active');
		$(this).addClass('active');
	});

	$offersTabsCarousel.owlCarousel({
		itemsCustom : [
			[0, 1],
			[420, 2],
			[880, 3],
			[1200, 3]
		],
		navigation : false,
		theme: ""
	});

	/*Catalog Sorting Toggles
	*******************************************/
	$sortToggle.click(function(e){
		$(this).toggleClass('sorted');
		e.preventDefault();
	});

	/*Disabling link on active page
	*******************************************/
	$activePage.click(function(e){
		e.preventDefault();
	});

	/*Catalog Filters
	*******************************************/
	//Price Slider Range
	var $minVal = parseInt($('#minVal').attr('data-min-val'));
	var $maxVal = parseInt($('#maxVal').attr('data-max-val'));
	var $startMin = parseInt($('#minVal').val());
	var $startMax = parseInt($('#maxVal').val());
	if($('#price-range').length > 0){
		$('#price-range').noUiSlider({
			range: {
				'min': $minVal,
				'max': $maxVal
			},
			start: [$startMin,$startMax],
			connect: true,
			serialization: {
				lower: [
					$.Link({
						target: $('#minVal'),
						format: {
							decimals: 0
						}
					})
				],
				upper: [
					$.Link({
						target: $('#maxVal'),
						format: {
							decimals: 0
						}
					})
				]
			}
		});
	}

	//Clear price filters
	$('#clearPrice').click(function(){
		$('#price-range').val([$startMin, $startMax], { set: true });
	});

	//Clear Checkbox filters
	$('.clearChecks').click(function(){
		$(this).parent().find('.icheckbox').removeClass('checked');
	});

	//Categories accordion
	$subcatToggle.click(function(e){
		$(this).parent().toggleClass('opened');
		$(this).parent().find('.subcategory').toggleClass('open');
		e.preventDefault();
	});

	//Filter Toggle / Showing Filters in Modal
	$filterToggle.click(function(){
		$('.shop-filters').appendTo($('#filterModal .modal-body'));
		$('#filterModal .modal-body .shop-filters').css('display', 'block');
	});

	$('#filterModal').on('hide.bs.modal', function(){
		$('.shop-filters').appendTo('.filters-mobile');
	});

	$(window).resize(function(){
		if($(window).width() > 768){
			$('#filterModal').modal('hide');
		}
	});

	/*Catalog Single
	*******************************************/
	//Product Gallery
	if($('#prod-gal').length > 0) {
		var categorySlider = new MasterSlider();
		categorySlider.control('thumblist' , {autohide:false ,dir:'h',align:'bottom', width:137, height:130, margin:15, space:0 , hideUnder:400});
		categorySlider.setup('prod-gal' , {
				width:550,
				height:484,
				speed: 25,
				preload:'all',
				loop:true,
				view:'fade'
		});
	}

	//Add(+/-) Button Number Incrementers
	$(".incr-btn").on("click", function(e) {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		if ($button.text() == "+") {
			var newVal = parseFloat(oldValue) + 1;
		} else {
		 // Don't allow decrementing below 1
			if (oldValue > 1) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}
		$button.parent().find("input").val(newVal);
		e.preventDefault();
	});

	/*Added To Cart Message + Action (For Demo Purpose)
	**************************************************/
	$addToCartBtn.click(function(){
		$addedToCartMessage.removeClass('visible');
		var $itemName = $(this).parent().parent().find('h1').text();
		var $itemPrice = $(this).parent().parent().find('.price').text();
		var $itemQnty = $(this).parent().find('#quantity').val();
		var $cartTotalItems = parseInt($('.cart-btn a span').text()) +1;
		$addedToCartMessage.find('p').text('"' + $itemName + '"' + '  ' + 'was successfully added to your cart.');
		$('.cart-dropdown table').append(
			'<tr class="item"><td><div class="delete"></div><a href="#">' + $itemName +
			'<td><input type="text" value="' + $itemQnty +
			'"></td><td class="price">' + $itemPrice + '</td>'
		);
		$('.cart-btn a span').text($cartTotalItems);
		$addedToCartMessage.addClass('visible');
	});

	/*Promo Labels Popovers
	*******************************************/
	$promoLabels.popover({
		placement: 'top',
		trigger: 'hover'
	});

	/*Special Offer Autoheight
	*******************************************/
	$(window).load(function(){
		var tileH = $('.special-offer .tile').height();
		$('.special-offer .offer').css('height', tileH);
	});
	$(window).resize(function(){
		var tileH = $('.special-offer .tile').height();
		$('.special-offer .offer').css('height', tileH);
	});

	/*Expandable Panels
	*******************************************/
	$panelToggle.click(function(e){
		$(this).toggleClass('active');
		var $target = $(this).attr('href');
		$($target).toggleClass('expanded');
		e.preventDefault();
	});

	/*Accordion Widget
	*******************************************/
	$accordionToggle.click(function(){
		$accordionToggle.parent().removeClass('active');
		$(this).parent().addClass('active');
	});

	/*Sticky Buttons
	*******************************************/
	//Scroll to Top Button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 500) {
			$scrollTopBtn.parent().addClass('scrolled');
		} else {
			$scrollTopBtn.parent().removeClass('scrolled');
		}
	});
	$scrollTopBtn.click(function(){
		$('html, body').animate({scrollTop : 0}, {duration: 700, easing:"easeOutExpo"});
	});

	//Quick Contact Form
	$qcfBtn.click(function(){
		$(this).toggleClass('active');
		$(this).parent().find('.quick-contact').toggleClass('visible');
	});
	$('.page-content, .subscr-widget, footer, header').click(function(){
		$qcfBtn.removeClass('active');
		$('.quick-contact').removeClass('visible');
	});


});/*Document Ready End*//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*Gallery Filtering and Responsiveness Function
*******************************************/
var gallery = (function( $ ) {
	'use strict';

	var $grid = $('.gallery-grid'),
			$filterOptions = $('.filters'),
			$sizer = $grid.find('.shuffle__sizer'),

	init = function() {

		// None of these need to be executed synchronously
		setTimeout(function() {
			listen();
			setupFilters();
		}, 100);

		$grid.on('loading.shuffle done.shuffle shrink.shuffle shrunk.shuffle filter.shuffle filtered.shuffle sorted.shuffle layout.shuffle', function(evt, shuffle) {
			// Make sure the browser has a console
			if ( window.console && window.console.log && typeof window.console.log === 'function' ) {
				console.log( 'Shuffle:', evt.type );
			}
		});

		// instantiate the plugin
		$grid.shuffle({
			itemSelector: '.gallery-item',
			sizer: $sizer
		});
	},

	// Set up button clicks
	setupFilters = function() {
		var $btns = $filterOptions.children();
		$btns.on('click', function(e) {
			var $this = $(this),
					isActive = $this.hasClass( 'active' ),
					group = $this.data('group');
					$('.filters .active').removeClass('active');
					$this.addClass('active');

			// Filter elements
			$grid.shuffle( 'shuffle', group );
			e.preventDefault();
		});

		$btns = null;
	},

	listen = function() {
		var debouncedLayout = $.throttle( 300, function() {
			$grid.shuffle('update');
		});

		// Get all images inside shuffle
		$grid.find('img').each(function() {
			var proxyImage;

			// Image already loaded
			if ( this.complete && this.naturalWidth !== undefined ) {
				return;
			}

			// If none of the checks above matched, simulate loading on detached element.
			proxyImage = new Image();
			$( proxyImage ).on('load', function() {
				$(this).off('load');
				debouncedLayout();
			});

			proxyImage.src = this.src;
		});

		// Because this method doesn't seem to be perfect.
		setTimeout(function() {
			debouncedLayout();
		}, 500);
	};

	return {
		init: init
	};
}( jQuery ));

/************************************************************************/
