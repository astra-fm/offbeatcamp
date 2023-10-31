zjQuery(document).on('click', 'li.ajax-nav a', function($) {
    //e.preventDefault();

    var href = $(this).attr('href');
    var homeUrl = 'https://media.studioxplore.com/';

    // Manually display preloader
    $('#preloader').show();

    // Delay before running the AJAX call
    setTimeout(function() {
        $.ajax({
            url: href,
            type: 'GET',
            success: function(data) {
                // Update content on success
                var newContent = $(data).find('#content');
                var newBodyClass = $(data).find('body').attr('class');

                // Handle classes based on page
                if (href === homeUrl) {
                    newBodyClass += ' home';
                } else {
                    newBodyClass += ' other-page';
                }

                $('body').attr('class', newBodyClass);
                $('#content').replaceWith(newContent);
                history.pushState(null, '', href);

                // Check if Slick has been initialized
                if ($('.visual-art-style.slider').hasClass('slick-initialized')) {
                    // If so, destroy it
                    $('.visual-art-style.slider').slick('unslick');
                }

                // Initialize slick slider if on home page
                if (href === homeUrl) {
                    $('.visual-art-style.slider').slick({
                        dots: false,
                        infinite: true,
                        speed: 10000,
                        fade: true,
                        cssEase: 'linear',
                        autoplay: true,
                        autoplaySpeed: 6000
                    });
                }

                // Delay before hiding the preloader
                setTimeout(function() {
                    $('#preloader').hide();
                }, 1000);
            }
        });
    }, 1000);
});