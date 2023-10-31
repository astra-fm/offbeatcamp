<?php
/**
 * Displays the site header.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

$wrapper_classes  = 'ul-main-nav';
$wrapper_classes .= has_custom_logo() ? ' has-logo' : '';
$wrapper_classes .= ( true === get_theme_mod( 'display_title_and_tagline', true ) ) ? ' has-title-and-tagline' : '';
$wrapper_classes .= has_nav_menu( 'primary' ) ? ' has-menu' : '';
?>

<header id="masthead" class="<?php echo esc_attr( $wrapper_classes ); ?>">
<div class="container-fluid ul-bg-header">
    <div class="row">  
        <div class="col s6 m6 l6">
			<?php get_template_part( 'template-parts/header/site-branding' ); ?>
		</div>
		<div class="col s6 m6 l6">
			<?php get_template_part( 'template-parts/header/site-nav' ); ?>
		</div>
	</div>
</div>
</header><!-- #masthead -->
