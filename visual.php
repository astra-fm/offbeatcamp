<?php /* Template Name: visual art */ 
session_start();
get_header();

// The WordPress Query
$query = new WP_Query( array(
    'category_name' => 'visual-art',
) );

// The Loop
if ( $query->have_posts() ) {
    while ( $query->have_posts() ) {
        $query->the_post();
        $image_url = get_the_post_thumbnail_url($post->ID, 'full');
        if ($image_url) {
            echo '<div class="full-screen-bg" style="background-image: url(' . $image_url . ');"></div>';
            echo '<p>Image URL: ' . $image_url . '</p>';  // Print the image URL
        }
    }
    /* Restore original Post Data */
    wp_reset_postdata();
} else {
    // No posts found
    echo '<p>No posts found in the Visual Art category.</p>';
}

get_footer();?>