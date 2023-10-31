<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

?>
			</main><!-- #main -->
		</div><!-- #primary -->
	</div><!-- #content -->

	<?php get_template_part( 'template-parts/footer/footer-widgets' ); ?>

	<footer id="colophon" class="ul-footer-player">
			<div class="container">
			<audio id="audioPlayer">
				Your browser does not support the audio element.
			</audio>

			<div id="controls">
				<div id="ul-volume-control" class="ul-display-iblock hide-on-small-only">
					<span id="volumeIcon"><i class="fa-solid fa-volume-off"></i></span>
					<div id="volumeControl" class="hidden">
						<div class="volume-slider-container">
							<input type="range" id="volumeSlider" min="0" max="1" step="0.1" value="1">
						</div>
					</div>
				</div>
				<div class="ul-display-iblock ul-padding-right">
					<span id="stopBtn" class="hidden"><i class="fa-solid fa-stop"></i></span>
					<span id="playBtn"><i class="fa-solid fa-play"></i></span>
				</div>
				<div class="ul-display-iblock ul-now-playing">
					<span class="hide-on-small-only"><b>Now Playing:</b></span> 
					<!--<span id='artist-player-info'></span> - <span id='song-player-info'></span>-->
					<span class="ticker-wrap">
						<span class="ticker">
							<span class="ticker__item">
								<span id='artist-player-info'></span> - <span id='song-player-info'></span>
							</span>
						</span>
					</span>
				</div>
				
			</div>
		</div>
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
