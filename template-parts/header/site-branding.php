<?php
/**
 * Displays header site branding
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

$blog_info    = get_bloginfo( 'name' );
$description  = get_bloginfo( 'description', 'display' );
$show_title   = ( true === get_theme_mod( 'display_title_and_tagline', true ) );
$header_class = $show_title ? 'site-title' : 'screen-reader-text';

?>
<div class="obc-brand">
	<a href="/" class="ajax-nav"><img src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/obc-white.svg" width="60"></a>
</div>
<ul class="pg-branding hide-on-med-and-down">
	<li class="site-branding ajax-nav">
		<a href="/">
			<?php if ( has_custom_logo() && ! $show_title ) : ?>
					<span class="site-logo"><?php the_custom_logo(); ?></span>
			<?php endif; ?>

			<?php if ( $blog_info ) : ?>
				<?php if ( is_front_page() && ! is_paged() ) : ?>
					<span class="<?php echo esc_attr( $header_class ); ?>"><?php echo esc_html( $blog_info ); ?></span>
				<?php elseif ( is_front_page() && ! is_home() ) : ?>
					<span class="<?php echo esc_attr( $header_class ); ?>"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo esc_html( $blog_info ); ?></a></span>
				<?php else : ?>
					<span class="<?php echo esc_attr( $header_class ); ?>"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php echo esc_html( $blog_info ); ?></a></span>
				<?php endif; ?>
			<?php endif; ?>

			<?php if ( $description && true === get_theme_mod( 'display_title_and_tagline', true ) ) : ?>
				<span class="site-description">
					<?php echo $description; // phpcs:ignore WordPress.Security.EscapeOutput ?>
			</span>
			<?php endif; ?>
		</a>
	</li><!-- .site-branding -->
</ul>
