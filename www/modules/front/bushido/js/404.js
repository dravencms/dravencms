/*
 *Bushido HTML5 E-Commerce Template v1.1
 *Copyright 2014 8Guild.com
 *Scripts for Bushido 404 Page
 */

var $cont404 = $('.page-404 .content');
$(window).on('load', function(){
	$cont404.css('height', $(window).height());
});

$(window).on('resize', function(){
	$cont404.css('height', $(window).height());
});

/*Adding Placeholder Support in Older Browsers*/
$(document).ready(function(e) {
	$('input, textarea').placeholder();
});
