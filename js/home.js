jQuery(document).ready(function($) {
    loadSlider();
    // detect the container size modifications

    // Function to resize the container
    function resizeContainer() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        var container = document.getElementById('featured-image-slider');
        if (container) { // Check if container exists before setting the style
            container.style.width = width + 'px';
            container.style.height = height + 'px';
        }
    }

    // Resize the container immediately on page load
    resizeContainer();

    // Also resize the container whenever the window is resized
    window.onresize = resizeContainer;

    var currentSlide = 0;
    var totalSlides;
    var intervalID;

    function changeSlide() {
        // Stop all animations on the currently active slide, then animate its opacity to 0
        jQuery('.slide.active').stop().animate({opacity: 0}, 5000, function() {
            // Once the animation is complete, remove the 'active' class
            jQuery(this).removeClass('active');
        });

        // Update currentSlide
        currentSlide = (currentSlide + 1) % totalSlides;

        // Get the next slide, stop all animations on it, add the 'active' class, and then animate its opacity to 1
        var nextSlide = jQuery('.slide').eq(currentSlide);
        nextSlide.stop().addClass('active').animate({opacity: 1}, 5000);
    }

    function loadSlider() {
        jQuery.ajax({
            method: 'GET',
            url: '/wp-json/myplugin/v1/featured_images/',
            success: function(data) {
                if (!jQuery('.slider-wrapper').length) {
                    // Create slider wrapper if it doesn't exist
                    jQuery('#featured-image-slider').html('<div class="slider-wrapper"></div>');
                }

                var sliderWrapper = jQuery('.slider-wrapper');

                // Clear slider wrapper
                sliderWrapper.empty();

                // Populate slider wrapper
                data.forEach(function(imageData) {
                    var slideHtml = '<div class="slide" style="background-image: url(' + imageData.url + ');">' +
                                        '<div class="slide-info">' +
                                            '<p><b>' + imageData.name + '</b></p>' +
                                            '<span>' + imageData.type +' by: ' + imageData.author + '</span>' +
                                        '</div>' +
                                    '</div>';
                    sliderWrapper.append(slideHtml);
                });

                // Count total slides after they are loaded
                totalSlides = jQuery('.slide').length;

                // Preload images before starting the slide transitions
                preloadImages(data.map(item => item.url), function() {
                    // Reset currentSlide
                    currentSlide = 0;

                    // Start the slide transitions after images are preloaded
                    if (intervalID) clearInterval(intervalID);
                    changeSlide();
                    intervalID = setInterval(changeSlide, 25000);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
            }
        });
    }

    function preloadImages(images, callback) {
        var totalImages = images.length;
        var loadedImages = 0;

        images.forEach(function(imageURL) {
            var img = new Image();
            img.src = imageURL;
            img.onload = function() {
                loadedImages++;
                if (loadedImages === totalImages) {
                    callback();
                }
            }
        });
    }

    // Load the slider on page load

    // HOME PRELOADER
    // Show the preloader
    jQuery('.home-preloader').show();

    // Hide the preloader after a delay
    setTimeout(function() {
        jQuery('.home-preloader').hide();
    }, 10000);  // The delay in milliseconds, adjust to your needs

});

