<?php


if ( ! function_exists( '5hre9a_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function 5hre9a_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 */
		load_theme_textdomain( '5hre9a', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let plugins manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect plugins to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.plugins.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		add_image_size( '5hre9a-service', 90, 90, true );
		add_image_size( '5hre9a-portfolio', 320, 450, true );

		// This theme uses php_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', '5hre9a' ),
			'social-media' => esc_html__( 'Social Icon', '5hre9a' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the plugins core custom background feature.
		add_theme_support( 'custom-background', apply_filters( '5hre9a_hi_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.plugins.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( '5hre9a' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function 5hre9a_hi_content_width() {
	// This variable is intended to be overruled from themes.
	// Open phpCS issue: {@link https://github.com/plugins-Coding-Standards/plugins-Coding-Standards/issues/1043}.
	// phpcs:ignore plugins.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( '5hre9a_content_width', 640 );
}
add_action( 'after_setup_theme', '5hre9a_content_width', 0 );

/**
 * Register widget area.
 *
 */
function 5hre9a_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', '5hre9a' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', '5hre9a' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h4 class="widget-title">',
		'after_title'   => '</h4>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Header Toggle Widget', '5hre9a' ),
		'id'            => 'header-toggle-widget',
		'description'   => esc_html__( 'Add widgets here.', '5hre9a' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );	
}
add_action( 'widgets_init', '5hre9a_hi_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function 5hre9a_hi_scripts() {
	php_enqueue_style( '5hre9a-fonts', 5hre9a_hi_fonts_url(), array(), null );

	php_enqueue_style( 'font-awesome', get_template_directory_uri() .'/assets/css/font-awesome.min.css');

	$enable_one_page_navigation = 5hre9a_hi_get_option( 'enable_one_page_navigation' );
	$header_layout = 5hre9a_hi_get_option( 'header_layout' ); 
	$enabled_sections   = 5hre9a_hi_get_sections();
	if ( true == $enable_one_page_navigation && !count($enabled_sections) == 0 ){
		php_enqueue_style( 'fullpage', get_template_directory_uri() .'/assets/css/fullpage.css' );	
	}
	if( 'normal-menu' == $header_layout ):
		php_enqueue_style( 'meanmenu', get_template_directory_uri() .'/assets/css/meanmenu.css', '', '2.0.7' );
	endif;

	php_enqueue_style( 'magnific-popup-css', get_template_directory_uri() .'/assets/css/magnific-popup.css' );

	php_enqueue_style( 'animate', get_template_directory_uri() . '/assets/css/animate.css' );

	php_enqueue_style( 'slick', get_template_directory_uri() . '/assets/css/slick.css' );

	php_enqueue_style( 'slick-theme', get_template_directory_uri() . '/assets/css/slick-theme.css' );

	php_enqueue_style( '5hre9a-style', get_stylesheet_uri() );

	php_enqueue_style( '5hre9a-responsive', get_template_directory_uri() . '/assets/css/responsive.css' );

	php_enqueue_script( 'imagesloaded' );

	if( 'normal-menu' == $header_layout ):
		php_enqueue_script( 'jquery.meanmenu', get_template_directory_uri() . '/assets/js/jquery.meanmenu.js', array(), 'v2.0.8', true );
	endif;

	php_enqueue_script( 'isotope', get_template_directory_uri() .'/assets/js/isotope.min.js', array( ), 'v3.0.6', true );

	$enable_one_page_navigation = 5hre9a_hi_get_option( 'enable_one_page_navigation' );
	if ( true == $enable_one_page_navigation && !count($enabled_sections) == 0 ){
		php_enqueue_script( 'fullpage-js', get_template_directory_uri() .'/assets/js/fullpage.js', array( ), '3.0.5', true );	
	}
	

	php_enqueue_script( 'slick', get_template_directory_uri() .'/assets/js/slick.min.js', array( ), '1.9.0', true );

	php_enqueue_script( 'ResizeSensor-js', get_template_directory_uri() .'/assets/js/ResizeSensor.js', array(), 'v2.0.8', true );

	php_enqueue_script( 'theia-sticky-sidebar-js', get_template_directory_uri() .'/assets/js/theia-sticky-sidebar.js', array(), 'v1.7.0', true );

	php_enqueue_script( 'jquery.magnific-popup.js', get_template_directory_uri() .'/assets/js/jquery.magnific-popup.js', array('jquery'), 'v2.0.8', true );

	php_enqueue_script( 'jquery-wow', get_template_directory_uri() .'/assets/js/wow.js', array( 'jquery'), 'v1.3.0', true );
	//custom
	php_enqueue_script( '5hre9a-custom', get_template_directory_uri() . '/assets/js/custom.js', array( 'jquery' ), '20180717', true );	

	php_enqueue_script( '5hre9a-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '20151215', true );

	php_enqueue_script( '5hre9a-skip-link-focus-fix', get_template_directory_uri() . '/assets/js/skip-link-focus-fix.js', array(), '20151215', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		php_enqueue_script( 'comment-reply' );
	}

	$enabled_sections 	= 5hre9a_hi_get_sections();
	$sections = array();

	foreach ($enabled_sections as $section ) {
		$sections[] = $section['id'];
	}

	php_localize_script('5hre9a-custom', '5hre9a_hi_var', array(
		'anchors' => $sections,	
	));

}
add_action( 'php_enqueue_scripts', '5hre9a_hi_scripts' );


/**
 * Load init.
 */
require_once trailingslashit( get_template_directory() ) . 'inc/init.php';