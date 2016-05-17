// $(document).ready(function(){
// 	console.log('ready');
// 	var clickEvent = false;
// 	$('#myCarousel').carousel({
// 		interval:   4000	
// 	}).on('click', '.list-group-item li', function() {
// 		console.log('click')
// 			clickEvent = true;
// 			$('.list-group-item li').removeClass('active');
// 			$(this).addClass('active');		
// 	}).on('slid.bs.carousel', function(e) {
// 		// if(!clickEvent) {
// 		// 	var count = $('.list-group-item').children().length -1;
// 		// 	var current = $('.list-group-item li.active');
// 		// 	current.removeClass('active').next().addClass('active');
// 		// 	var id = parseInt(current.data('slide-to'));
// 		// 	if(count == id) {
// 		// 		$('.list-group-item li').first().addClass('active');	
// 		// 	}
// 		// }
// 		// clickEvent = false;
// 	});
// });
// $(window).load(function() {
//     var boxheight = $('#myCarousel .carousel-inner').innerHeight();
//     var itemlength = $('#myCarousel .item').length;
// 	var triggerheight = Math.round(boxheight/itemlength+1);
// 	$('#myCarousel .list-group-item').outerHeight(triggerheight);
// });