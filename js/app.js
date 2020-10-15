//--------------------------------------------------
// MOBILE
//--------------------------------------------------
function mobile() {
	if ( ( navigator.userAgent.match(/iPhone/i) ) || ( navigator.userAgent.match(/iPod/i) ) || ( navigator.userAgent.match(/iPad/i) ) || ( navigator.userAgent.match(/blackberry/gi) ) || ( navigator.userAgent.match(/android/gi ) ) ) {
		return true;
	}
}

//--------------------------------------------------
// LINES
//--------------------------------------------------

function lines(){
 	$windowWidth = $(window).width();
 	
 	windowHalf = $windowWidth/2
 
	$('#us-section').css({'background-size':$windowWidth});
	
	
	
	if($windowWidth > 1750){
		$('.section').css({'background-size':'cover'});
		$('#us-section').css({'background-size':$windowWidth});
	}
	
	if($windowWidth < 2250){
		$('.section').css({'width':$windowWidth});
		$('#us-section').css({'height':windowHalf});
		$('#us-content').css({'width':($windowWidth/1.1)});
	}
	else{
		$('.section').css({'width':'2250px'});
		$('#us-section').css({'height':'1125px','background-size':'2250px'});
		$('#us-content').css({'width':'2100px'});
	}
	
	

}
	


	$.fn.parallax = function(xpos, adjuster, inertia, outerHeight) {
			
function inView(pos, element){
	
	element.each(function(){ //for each selector, determine whether it's inview and run the move() function
		
		var element = $(this);
		var top = element.offset().top;
		
		if(outerHeight == true){
			var height = element.outerHeight(true);
		}else{
			var height = element.height();
		}
		
		//above & in view
		if(top + height >= pos && top + height - windowHeight < pos){
			move(pos, height);
		}
				
		//full view
		if(top <= pos && (top + height) >= pos && (top - windowHeight) < pos && top + height - windowHeight > pos){
			move(pos, height);
		}
		
		//below & in view
		if(top + height > pos && top - windowHeight < pos && top > pos){
			move(pos, height);
		}
	});
}		
		
		var $window = $(window);
		var windowHeight = $(window).height();
		var pos = $window.scrollTop(); //position of the scrollbar
		var $this = $(this);
		
		//setup defaults if arguments aren't specified
		if(xpos == null){xpos = "50%"}
		if(adjuster == null){adjuster = 0}
		if(inertia == null){inertia = 0.1}
		if(outerHeight == null){outerHeight = true}
		
		height = $this.height();
		$this.css({'backgroundPosition': newPos(xpos, outerHeight, adjuster, inertia)}); 
		
		function newPos(xpos, windowHeight, pos, adjuster, inertia){
			return xpos + " " + Math.round((-((windowHeight + pos) - adjuster) * inertia)) + "px";
		}
		
		//function to be called whenever the window is scrolled or resized
		function move(pos, height){ 
				$this.css({'backgroundPosition': newPos(xpos, height, pos, adjuster, inertia)}); 
		}
		
		$window.bind('scroll', function(){ //when the user is scrolling...
			var pos = $window.scrollTop(); //position of the scrollbar
			inView(pos, $this);
			
			$('#pixels').html(pos);
		})
	}
	
	
	
	//.parallax(xPosition, adjuster, inertia, outerHeight) options:
	//xPosition - Horizontal position of the element
	//adjuster - y position to start from
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
	
	
	
	
	
	



//--------------------------------------------------
// SCROLLING
//--------------------------------------------------
function scrollToSection(sectionId, speed) {
	var scrollTime = speed;
	var top = $('div.section#' + sectionId).offset().top - parseInt( $('div.section#' + sectionId).css('margin-top') );
	var winScrollTop = $(window).scrollTop();
	var scrollSpeed = ( ( winScrollTop - top ) / scrollTime ) * scrollTime;
	if($(window).width() > 767){
	  var newTop = top - 70;
	}else{
	  var newTop = top;
	}
	
	if ( scrollSpeed < 0 ) {
		var scrollSpeed = scrollSpeed * -1;
	}
	
	if ( !$('ul.parallax-menu').hasClass('scrolling') ) {
		$('ul.parallax-menu').addClass('scrolling');
		
		$('html, body').animate( { scrollTop: newTop + 'px' }, scrollTime, function() {
			$('ul.parallax-menu').removeClass('scrolling');
		});
	}
}

function previousSection() {
	var keySpeed = 1000;
	var winScrollTop = $(window).scrollTop();
	var winHeight = $(window).height();
	var winScrollBottom = winScrollTop + winHeight;
	var pageEnd = $('body, html').height();
	var currentSectionId = $('ul.parallax-menu a.current').parent('li').attr('class').replace('-link', '');
	var top = $('div#' + currentSectionId).offset().top - parseInt( $('div#' + currentSectionId).css('margin-top') );
	
	if ( winScrollTop + 2 > top && winScrollTop - 2 < top || winScrollBottom + 2 > pageEnd && winScrollBottom - 2 < pageEnd ) {
		var sectionId = $('ul.parallax-menu a.current').parent('li').prev('li').attr('class').replace('-link', '');
	} else if ( $('ul.parallax-menu a.current').parent('li').is(':first-child') ) {
		var sectionId = $('ul.parallax-menu li:first').attr('class').replace('-link', '');
	} else {
		var sectionId = $('ul.parallax-menu a.current').parent('li').attr('class').replace('-link', '');
	}
	
	scrollToSection(sectionId, keySpeed);
}

function nextSection() {
	var keySpeed = 1000;
	
	if ( !$('ul.parallax-menu a.current').parent('li').is(':last-child') ) {
		var sectionId = $('ul.parallax-menu a.current').parent('li').next('li').attr('class').replace('-link', '');
	}
	
	scrollToSection(sectionId, keySpeed);
}


//--------------------------------------------------
// MENU
//--------------------------------------------------
function sideMenucurrent() {
	var winScrollTop = $(window).scrollTop();
	var winHeight = $(window).height();
	var winScrollBottom = winScrollTop + winHeight;
	var pageEnd = $(document).height();
	
	$('div.section').each( function() {
		if($(window).width() > 767){
		  var top = $(this).offset().top - parseInt( $(this).css('margin-top') ) - 70;
		}else{
		  var top = $(this).offset().top - parseInt( $(this).css('margin-top') );
		}
		var height = $(this).height() + parseInt( $(this).css('padding-top') ) + parseInt( $(this).css('padding-bottom') );
		var bottom = top + height;
		var id = $(this).attr('id');
		var section = id.replace('-section', '');
		var subSection = '';
		
		var newUrl = '#/' + section + '/' + subSection;
		
		if ( winScrollTop >= top && winScrollTop < bottom && winScrollBottom < pageEnd && !$('ul.parallax-menu li.' + id +  '-link a').hasClass('current') || winScrollBottom == pageEnd && winScrollBottom == bottom && !$('ul.parallax-menu li.' + id +  '-link a').hasClass('current') ) {
			
			$('ul.parallax-menu a.current').removeClass('current');
			$('ul.parallax-menu li.' + id +  '-link a').addClass('current');
			
			if ( !$('ul.parallax-menu').hasClass('scrolling') ) {
				window.location.hash = newUrl;
			}
		}
	});
}

function sideMenu() {
	var menuSpeed = 1000;
	
	sideMenucurrent();
	
	$('ul.parallax-menu a,a.parallax-trigger').not($('a.no-parallax')).click( function() {
		var sectionId = $(this).parent().attr('class').replace('-link', '');
		
		scrollToSection(sectionId, menuSpeed);
	});
	
	$(window).scroll(function() {
		sideMenucurrent();
	});
}



//--------------------------------------------------
// URL LOAD
//--------------------------------------------------
function urlLoad() {
	var urlAnchor = document.location.hash;
	var urlSpeed = 1000;
	
	if ( !urlAnchor == '' ) {
		var anchorExplode = urlAnchor.split('/');
		var urlSection = anchorExplode[1];
		var urlSubSection = anchorExplode[2];
		
		if ( $('div.section#' + urlSection + '-section').size() > 0 && urlSection !== 'home' ) {
			scrollToSection(urlSection + '-section', urlSpeed);
		}
	}
}

//--------------------------------------------------
// ALBUM HOVER RELATED JS
//--------------------------------------------------

function albumHover(){
  var windowWidth = $(window).width();
  
  if (!Modernizr.touch && windowWidth > 767){
  	$('#buy-links').hide();
    $('#art').mouseenter(
    			function(){
    				$('#buy-links').fadeIn(500);
    		}).mouseleave(
    			function(){
    				$('#buy-links').fadeOut(500);
    		});
  }else{
    $('#buy-links').show();
  
  }  // figure out something to do with this

}

//--------------------------------------------------
// SC PLAYER JS
//--------------------------------------------------

function musicPlayer(){
	
	
	$('.sc-player .sc-controls').css({'display':'none'});
	
	if (!Modernizr.touch && $(window).width() > 767){
	  
	  
	  $('.sc-player').click(function(){
	     $('.sc-controls').not($('.playing .sc-controls')).hide();
	     $controls = $(this).find('.sc-controls'); 
	    $($controls).toggle();
	  });
	  

	  $('.sc-player').mouseenter(
	  			function(){
	  					$controls = $(this).find('.sc-controls');
	  					$($controls).fadeIn(100);
	  		}).mouseleave(
	  			function(){
	  				$controls = $(this).find('.sc-controls');
	  				if(!$(this).hasClass('playing') ){
	  					$($controls).fadeOut(100);
	  				}
	  		});
	}else{
	  $('.sc-player').on('click touchstart',function(){
	    $controls = $(this).find('.sc-controls');
	   
	  	$($controls).toggle();
	  	
	  });
	}
}

//--------------------------------------------------



function doParallax(){
	if(!Modernizr.touch && $(window).width() > 767){
		$('#john').css({'position':'absolute'}).parallax("0", 5000, 0.25, true);
	}else{
	   $('#connect-section #john').css({'position':'relative','background-position':'0 0'}).parallax("0",2470,0,true);
	} 
}



//--------------------------------------------------
// START
//--------------------------------------------------

$(document).ready( function() {

	// lines();
	urlLoad();
	sideMenu();
	albumHover();
	doParallax();
	musicPlayer();
	
	
	$('.video').fitVids();

	$(window).resize(function(){
	  doParallax();
	  albumHover();
	});
	
	$(".tweet").tweet({
	            username: "seaofclouds",
	            join_text: "auto",
	            avatar_size: 32,
	            count: 3,
	            auto_join_text_default: "we said,", 
	            auto_join_text_ed: "we",
	            auto_join_text_ing: "we were",
	            auto_join_text_reply: "we replied to",
	            auto_join_text_url: "we were checking out",
	            loading_text: "loading tweets..."
	 });
		
	
});



