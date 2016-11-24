/*
 *Bushido HTML5 E-Commerce Template v1.1
 *Copyright 2014 8Guild.com
 *Scripts for Bushido Coming Soon Page
 */

/*Document Ready*/////////////////
$(document).ready(function(e) {

	/*Countdown
	*******************************************/
	$('#timer').countdown('2016/03/01', function(event) {
    $(this).html(event.strftime('%D:%H:%M:%S'));
  });

	/*Features Tabs
	*******************************************/
	var $featureTab = $('.feature-tabs .tab');
	var $featureTabPane = $('.feature-tabs .tabs-pane');
	$featureTab.on('mouseover', function(){
		$featureTab.removeClass('active');
		$(this).addClass('active');
		var $curTab = $(this).attr('data-tab');
		$featureTabPane.removeClass('current');
		$('.feature-tabs .tabs-pane' + $curTab).addClass('current');
	});

	/*Adding Placeholder Support in Older Browsers
	************************************************/
	$('input, textarea').placeholder();

});
