/**
 *
 * Custom Js 
 */
(function($) {
    'use strict';   

	if ( $.fn.meanmenu ) {
    	$('.normal-menu .menu-main-menu-container').meanmenu({
            meanMenuContainer: '.normal-menu .main-navigation',
            meanScreenWidth: "767",
            meanRevealPosition: "right",
        });
    }
	
    /* back-to-top button */
    jQuery('.back-to-top').hide();
    jQuery('.back-to-top').on("click", function(e) {
        e.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, 'slow');
    });
    jQuery(window).scroll(function() {
        var scrollheight = 400;
        if (jQuery(window).scrollTop() > scrollheight) {
            jQuery('.back-to-top').fadeIn();
        }else {
            jQuery('.back-to-top').fadeOut();
        }
    });
    /* header search toggle */
    var removeClass = true;
    $(".site-header .search-toggle").on("click", function() {
        $(".site-header .header-search").toggleClass("search-expand");    
        if ( $(".site-header .header-search").is('.search-expand') ) {
            setTimeout(function(){
            $(".header-search").find('.search-field').focus();
            }, 700 );
        }            
        removeClass = false;
    });

    // when clicking the div : never remove the class
    $(".site-header .header-search form").click(function() {
        removeClass = false;
    });
    // when click event reaches "html" : remove class if needed, and reset flag
   $("body,.close-icon").click(function () {
        if (removeClass) {
            $(".site-header .header-search").removeClass('search-expand');
        }
        removeClass = true;
    });

    $(document).on('keyup', function(e){
        if ( e.keyCode === 27 && $('.header-search').hasClass('search-expand') ) {
            $(".header-search").removeClass('search-expand');
        }
        removeClass = true;
    }); 
    $(document).on('keyup', function(e){ 
        $('.close-icon').on("keyup", function() {
           $(".header-search").removeClass('search-expand');
        });         
    });
       
    /*click on nav-button*/
    $(".site-header .nav-button").on("click", function() {
        $(this).toggleClass('close');
        $(".site-header .navbar").toggleClass("menu-expand");
        $(".navbar-overlay").toggleClass("on");
    });
    //appending span for li.menu-item-has-children for toggle
   // $(".site-header .navbar .main-navigation ul").find("li.menu-item-has-children").prepend("<a href='#' class='toggle'><span></span></a>");
    //toggling icon class to li.menu-item-has-children 
    $( ".site-header .navbar .main-navigation .sub-menu" ).before( "<a href='#' class='toggle'></a>" );
    
    $(".site-header .navbar .main-navigation ul li  .toggle").on('click', function () {
      $(this).parent().toggleClass("icon");
    });
    //header menu responsive toggle
    $(".site-header .navbar .main-navigation ul.sub-menu").hide();
    $(".site-header .navbar .main-navigation ul > li .toggle").on('click', function () {
      var target = $(this).parent().children(".sub-menu");
      $(target).slideToggle();
    });
    /*measuring  the height*/
    var fullHeight = $('.navbar').innerHeight();
    var menuHeight = $('.navbar .menu-title').innerHeight();
    var totalHeight = parseInt(fullHeight) - parseInt(menuHeight);
    $('.navigation-wrap').css('height', totalHeight);


    /*remove class when click*/
    $('.navbar-overlay , .navbar .close').on('click', function () {
        $('.site-header .navbar').removeClass('menu-expand');
        $('.navbar-overlay').removeClass('on');
        $('.site-header .nav-button').removeClass('close');
    });
    $(document).on('keyup', function(e){ 
        $('.navbar-overlay , .navbar .close').on("keyup", function() {
            $('.site-header .navbar').removeClass('menu-expand');
            $('.navbar-overlay').removeClass('on');
            $('.site-header .nav-button').removeClass('close');
        });         
    });        
    
    /*moving close button of navabar-overlay's button as mouse position moves*/
    var $moveable = $('.navbar-overlay span');
    $(document).mousemove(function(e){
        $moveable.css({'top': e.clientY,'left': e.clientX});
    });
    $( ".site-header .navbar" ).mouseenter(function() {
      $( ".navbar-overlay span" ).css('visibility','hidden');
    });
    $( ".site-header .navbar" ).mouseleave(function() {
      $( ".navbar-overlay span" ).css('visibility','visible');
    });
    /*featured banner slider*/
    jQuery('.featured-slider').slick({
        slidesToShow: 1,
        dots:true,
        arrows:true
    });
    /*testimonial slider*/
    jQuery('.testimonial-wrap').slick({
        slidesToShow: 1,
        dots: true,
        arrows: false
    });
    /* search toggle */
    $(".search-toggle").on("click", function() {
        $(".search-section").toggleClass("search-active");
    });
    /*for sticky sidebar*/
    jQuery('#primary, .widget-area-right , .widget-area-left').theiaStickySidebar({
      additionalMarginTop: 30
    });
    /*adding span on the first word of entry title of featured section*/
    $('.info-wrap .entry-title').each(function() {
        var word = $(this).html();
        var index = word.indexOf(' ');
        if(index == -1) {
            index = word.length;
        }
        $(this).html('<span class="first-word">' + word.substring(0, index) + '</span>' + word.substring(index, word.length));
    });
    /*for header-social position of hgroup*/
    var buttonHeight = $('.nav-button').innerHeight();
    var searchHeight = $('.search-toggle').innerHeight();

    if ($('.nav-button').length){
        $('.header-social').css('bottom', buttonHeight);
    }else{
        $('.header-social').css('bottom',0);
    }
    if($('.search-toggle').length){
        $('.header-social').css('top', searchHeight);
    }else{
        $('.header-social').css('top', 0);
    }

    $(function(){
        if ( $.fn.fullpage) {
            /*fullpage js*/
            var $body = $('body');
            var $fullPage = $('#myfullpage');            
            $fullPage.fullpage({
                  anchors:career_portfolio_var.anchors,
                  menu:'#fullpagemenu',
                  slidesNavigation:true,
                  fadingEffect:true,
                  autoScrolling:false,
                    //Scrolling
                    css3: true,
                    scrollingSpeed: 700,
                    fitToSection: true,
                  fadingEffectKey: 'YWx2YXJvdHJpZ28uY29tXzAzN1ptRmthVzVuUldabVpXTjBiNXo='
            });            
        }
    });
    /*skill bar js*/
    var $skill_items = $('.skill-item');
    if( $skill_items.length > 0 ) {
        $skill_items.each( function(i){

            var $innerEl = $( $skill_items[i] );
            var $skillBar = $innerEl.find('.skillbar-bar');
            var width = $innerEl.find('.skill-in-percent').text();

            $skillBar.animate({
                width: width
            }, 1000 );
        });
    }

    /*--------portfolio section isotopes--------*/
    var $workiso = $('.portfolio .portfolio-wrap');
        $workiso.isotope({
            itemSelector: '.portfolio-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.portfolio-item'
        },
        isFitWidth: true,
        filter: '*'
    });

    /*-- layout Isotope after each image loads--*/
    $workiso.imagesLoaded().progress( function() {
        $workiso.isotope('layout');
    });

    /*-- filter items on button click--*/
    $('.work-filters-button').on('click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $workiso.isotope({
            filter: filterValue
        });
    });
    /*button for adding active class and removing */
    $(".work-filters-button li ").on( 'click', function() {
        $(".work-filters-button  li.active").removeClass("active"), 
        $(this).addClass("active")
    });
    /*.portfolio-gallery masonary*/
    var $portfolioGallery = $('.portfolio-gallery');
    $portfolioGallery.isotope({
      itemSelector: '.portfolio-gallery-item',
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: '.portfolio-gallery-item'
      },
      isFitWidth: true
    });
    // layout Isotope after each image loads
    $portfolioGallery.imagesLoaded().progress( function() {
        $portfolioGallery.isotope('layout');
    });
    /*shop section slider*/
    var $shopSlider = $('.shop-section .shop-wrap');
    $shopSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: 0
    });
    /*pop up video*/
    var $videoIcon = $('.video-content .icon');
    $videoIcon.magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    /*pop up of gallery sections*/
    $('.portfolio-gallery-item').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image:{
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title');
            }
        }
    });
    /*initializing wow.js for animation*/
    new WOW().init({
        offset: 0
    });

    /*counter section*/

    var a = 0;
    jQuery(window).scroll(function ($) {

    if (jQuery(".counter-section").length) {

      var oTop = jQuery('.counter-section').offset().top - window.innerHeight;
      if (a == 0 && jQuery(window).scrollTop() > oTop) {
        jQuery('.info-count').each(function () {
          var $this = jQuery(this),
            countTo = $this.attr('data-count');
          jQuery({
            countNum: $this.text()
          }).animate({
              countNum: countTo
            },

            {

              duration: 8000,
              easing: 'swing',
              step: function () {
                $this.text(Math.floor(this.countNum));
              },
              complete: function () {
                $this.text(this.countNum);
                //alert('finished');
              }

            });
        });
        a = 1;
      }
    }
  });

})(jQuery);


