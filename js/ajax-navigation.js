/*jQuery(function($) {
    // Handle AJAX navigation clicks
    $(document).on('click', 'li.ajax-nav a', function(e) {
        e.preventDefault();

        var href = $(this).attr('href');

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
                    $('#content').replaceWith(newContent);
                    history.pushState(null, '', href);

                    // Delay before hiding the preloader
                    setTimeout(function() {
                        $('#preloader').hide();
                    }, 1000);
                },
                //...
                

            });
        }, 1000);
    });
});*/

jQuery(function($) {
    $(document).on('click', 'li.ajax-nav a, .obc-brand a, .policy-nav a', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        $('.home-preloader').show();
        $('#preloader').show();

        $.ajax({
            url: href,
            type: 'GET',
            success: function(data) {
                var newContent = $(data).find('#content');
                $('#content').replaceWith(newContent);
                history.pushState(null, '', href);

                $('.home-preloader').hide();
                loadSlider();

                if(window.location.pathname == '/') {
                    $('body').addClass('no-scroll');
                    $('.home-preloader').hide();
                } else {
                    $('body').removeClass('no-scroll');
                }
                initializeHeader();
            },
            error: function() {
                $('.home-preloader').hide();
            }
        });
    });
});





/*jQuery(function($) {
    // Handle AJAX navigation clicks
    $(document).on('click', 'li.ajax-nav a', function(e) {
        e.preventDefault();

        var href = $(this).attr('href');

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
                    $('#content').replaceWith(newContent);
                    history.pushState(null, '', href);
                    console.log("AJAX success called, pathname: ", window.location.pathname);

                    // Delay before hiding the preloader
                    setTimeout(function() {
                        $('#preloader').hide();
                    }, 1000);

                    // Reload the slider explicitly here
                    loadSlider();

                    if(window.location.pathname == '/') {
                        $('body').addClass('no-scroll');
                    } else {
                        // If navigating away from homepage, remove 'no-scroll' class
                        $('body').removeClass('no-scroll');
                    }
                },
                //...
            });
        }, 1000);
    });
});*/


















