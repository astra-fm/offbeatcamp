
<?php
/* child style */
function childtheme_enqueue_styles() {

wp_dequeue_style( 'twentytwentyone-style' );

wp_enqueue_style( 'parent_style', get_template_directory_uri() . '/style.css' );

wp_enqueue_style( 'materialize', 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' );

wp_enqueue_script( 'slick', get_stylesheet_directory_uri() . '/js/slick.min.js' , false,filemtime( get_stylesheet_directory() . '/js/slick.min.js' ), 'all'  );
wp_enqueue_style( 'slick-style', get_stylesheet_directory_uri() . '/assets/css/slick.css' , false,filemtime( get_stylesheet_directory() . '/assets/css/slick.css' ), 'all' );
wp_enqueue_style( 'slick-theme-style', get_stylesheet_directory_uri() . '/assets/css/slick-theme.css' , false,filemtime( get_stylesheet_directory() . '/assets/css/slick-theme.css' ), 'all' );

wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css' , false,filemtime( get_stylesheet_directory() . '/style.css' ), 'all' );



$config_array = array(
    'stationId' => '1',
    'lastFmApiKey' => '1b5f6cba2030cbe3cdac335832e4252f',
    'yourApiKey' => '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35',
    'refreshInterval' => 30000
);
wp_enqueue_script( 'data-script', get_stylesheet_directory_uri() . '/js/data.js' , array('jquery'), '1.0.0', true );
wp_enqueue_script( 'urbanlab-js', get_stylesheet_directory_uri() . '/js/urbanlab.js' , array('jquery'), '1.0.0', true );
wp_localize_script('urbanlab-js', 'config', $config_array);
wp_enqueue_script( 'fetchdata-js', get_stylesheet_directory_uri() . '/js/fetchdata.js' , array('jquery'), '1.0.0', true );


wp_enqueue_script( 'ajax-navigation', get_stylesheet_directory_uri() . '/js/ajax-navigation.js', array( 'jquery' ), '1.0', true );


// Moved print style below child style
$theme_version = wp_get_theme()->get( 'Version' );
wp_dequeue_style( 'twentytwentyone-print' );
wp_enqueue_style( 'twentytwentyone-print', get_template_directory_uri() . '/assets/css/print.css', null, $theme_version, 'print' );

}
add_action( 'wp_enqueue_scripts', 'childtheme_enqueue_styles', 999 );

// add new item to the main nav
function add_item_to_menu($items, $args) {
    if($args->theme_location == 'primary') {  
        $new_item = '
        <li><a href="javascript:;" class="ajax-nav policy-icon"><i class="fa-solid fa-copyright"></i></a></li> 
        <div class="policy-nav">
            <a href="https://www.offbeatcamp.com/privacy-policy/" class="ajax-nav">Privacy Policy</a>
            <a href="https://www.offbeatcamp.com/licencia/" class="ajax-nav">Broadcasting Licence</a>
        </div>
        ';  
        $items = $items . $new_item;  
    }
    return $items;
}
add_filter('wp_nav_menu_items', 'add_item_to_menu', 10, 2);

// disable widgets
function remove_some_widgets(){

    // Unregister some of the TwentyTwenty default widgets
    unregister_sidebar( 'sidebar-1' );

}
add_action( 'widgets_init', 'remove_some_widgets', 11 );

function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');


// add ajax css nav
function add_class_to_menu_link($classes, $item, $args) {
    if($args->theme_location == 'primary') {  // Check if the menu is the primary menu
        $classes[] = 'ajax-nav';  // Add the class
    }
    return $classes;
}
add_filter('nav_menu_css_class', 'add_class_to_menu_link', 10, 3);



add_action('rest_api_init', function () {
    register_rest_route('myplugin/v1', '/featured_images/', array(
        'methods' => 'GET',
        'callback' => 'fetch_featured_images',
    ));
});

function fetch_featured_images(WP_REST_Request $request) {
    $args = array(
        'posts_per_page' => -1, // specify the number of posts
        'post_type' => 'post', // specify the post type
        'orderby' => 'rand', // order the posts by date
        'order' => 'DESC', // set the order to ascending
        'category_name' => 'visual-photo' // specify the category
    );

    $posts = get_posts($args);
    $featured_images = array();

    foreach($posts as $post) {
        if (has_post_thumbnail($post)) {
            $featured_image_url = get_the_post_thumbnail_url($post, 'full'); // get the URL of the featured image

            // get the custom fields
            $image_location = get_post_meta($post->ID, 'image-location', true);
            $image_date = get_post_meta($post->ID, 'image-date', true);
            $image_name = get_post_meta($post->ID, 'image-name', true);
            $image_author = get_post_meta($post->ID, 'image-author', true);
            $image_type = get_post_meta($post->ID, 'image-type', true);
            

            // create an array with all the required info
            $image_data = array(
                'url' => $featured_image_url,
                'author' => $image_author,
                'name' => $image_name,
                'type' => $image_type
            );

            array_push($featured_images, $image_data);
        }
    }

    return $featured_images;
}

