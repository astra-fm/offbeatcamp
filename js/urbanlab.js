/* SHOW ALBUMS INFORMATION IN HOME */

// Self-Invoking Function to encapsulate logic

(function($) {
    const { shows, images, descriptions } = window.myData;
     // Data for shows, images, and descriptions (Can be moved to external file)
    // Constants and variables
    const timezoneOffset = { "Barcelona": -2, "England": -2, "Ireland": -2, "Argentina": -5 };
    const selectedOffset = timezoneOffset["Barcelona"];
    const tz = new Date().getTimezoneOffset() / 60;
    let audioPlayer = $('#audioPlayer')[0];
    
    // Function to fetch and set show information
    const updateShowInfo = () => {
   
        let currentHour = (new Date().getHours() + 24 + selectedOffset - tz) % 24;
        let nextHour = (currentHour + 1) % 24;  // Assuming the next show is an hour later
    
        const fetchData = (dataType, hour) => {
            for (let h in dataType[0]) {
                if (hour >= dataType[0][h].range[0] && hour < dataType[0][h].range[1]) {
                    return dataType[0][h];
                }
            }
            return dataType[0][Object.keys(dataType[0])[0]]; // Fallback: First entry for the next day
        };

        const currentShow = fetchData(shows, currentHour);
        const currentImage = fetchData(images, currentHour);
        const nextShow = fetchData(shows, nextHour);
        const nextImage = fetchData(images, nextHour);
        const nextDescription = fetchData(descriptions, nextHour);

        $("#show-schedule").html(currentShow.name);
        //console.log(currentShow.name);

        $("#next-show-image").html(currentImage.image);
        $("#current-show-time").text(`from ${currentShow.range[0]}:00 - ${currentShow.range[1]}:00`);
        $("#next-show").html(nextShow.name);
        $("#next-show-image").html(nextImage.image);
        $("#next-show-description").html(nextDescription.description);
        $("#next-show-time").html(`<span> from ${nextShow.range[0]}:00 - ${nextShow.range[1]}:00</span>`);

    };

    // Initialize
    $(document).ready(() => {
        updateShowInfo();

        // Polling for data update
        setInterval(updateShowInfo, 5000);

        // Media control handlers
        audioPlayer.src = 'https://listen.offbeatcamp.com/listen/radio_xplore/radio.mp3';

        $('#playBtn').click(function() {
            audioPlayer.load();
            audioPlayer.play().catch(console.error);
            $(this).addClass('hidden');
            $('#stopBtn').removeClass('hidden');
        });

        $('#stopBtn').click(function() {
            audioPlayer.pause();
            audioPlayer.src = 'https://listen.offbeatcamp.com/listen/radio_xplore/radio.mp3';
            $(this).addClass('hidden');
            $('#playBtn').removeClass('hidden');
        });
    });


})(jQuery);


/* navigation */

/* jQuery code */
jQuery(document).ready(function($) {
    $("#primary-mobile-menu").click(function() {
        $("#ul-main-menu").toggle(); // toggles the visibility of the menu
    });
});


 //Configuration variables
const stationId = "1"; // replace with your station id
const lastFmApiKey = '1b5f6cba2030cbe3cdac335832e4252f';

// Function to fetch the currently playing song (Player Info)
function fetchNowPlaying() {
    //console.time("fetchNowPlaying");
    fetch(`https://listen.offbeatcamp.com/api/nowplaying/${stationId}`)
        .then(response => response.json())
        .then(data => {
            //console.log("Full API Response:", JSON.stringify(data, null, 2));
            let nowPlaying = data.now_playing;
            document.getElementById('artist-player-info').innerText = nowPlaying.song.artist;
            document.getElementById('song-player-info').innerText = nowPlaying.song.title;

            // Update the artist bio when the song changes
            fetchLastFmArtistInfo(nowPlaying.song.artist);
            // Update the artist image when the song change
        })
        .catch(error => console.error('API Error:', error))
        .finally(() => {
            //console.timeEnd("fetchNowPlaying");
        });
}

// Function to fetch artist bio from Last.fm
function fetchLastFmArtistInfo(artistName) {
    const artistBio = document.getElementById('artistBio');
    if (!artistName) {
        artistBio.innerText = "There's no info about this artist";
        //console.warn('Artist name is not defined. Skipping Last.fm API call.');
        return;
    }
    const mainArtistName = artistName.split(',')[0].trim();
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(mainArtistName)}&api_key=${lastFmApiKey}&format=json`;

    fetch(lastFmUrl)
        .then(response => response.json())
        .then(data => {
            //console.log("API Response:", JSON.stringify(data, null, 2)); // Debug line
            try {
                if (data.artist && data.artist.bio && data.artist.bio.summary) {
                    let rawBio = data.artist.bio.summary;
                    const cleanedBio = rawBio.replace(/<a href="[^"]+">Read more on Last\.fm<\/a>/, '').trim();
                    
                    if (cleanedBio.length > 0) {
                        artistBio.innerHTML = '<div class="bio-wrapper"><p class="bio-title"> Something about ' + artistName + '</p>' + cleanedBio + '</div>';
                    } else {
                        //console.log("Entering the else block."); // Debug line
                        artistBio.innerHTML = " ";
                    }
                } else {
                    //console.log("Entering the else block."); // Debug line
                    artistBio.innerHTML = " ";
                }
                
            } catch (e) {
                //console.error('Data parsing error:', e);
                artistBio.innerHTML = " ";
            }
        })
        .catch(error => {
            //console.error('Last.fm API Error:', error);
            //artistBio.innerHTML = " ";
        });
}


// Function to fetch now playing song and related details
function fetchNowPlayingSong() {
    let retries = 3;  // Initialize retry count
    
    function fetchWithRetry() {
    
        fetch(`https://listen.offbeatcamp.com/api/nowplaying/${stationId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-API-Key': '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35'  // replace with your API key
            }
        })
        .then(response => response.json())
        .then(data => {
            let nowPlaying = data.now_playing;

            let nowPlayingImage = document.getElementById('nowPlayingImage');
            let placeholderImage = document.getElementById('placeholderImage');
            if (nowPlayingImage) {
                let img = new Image();
                img.onload = function() {
                    nowPlayingImage.src = this.src;
                    nowPlayingImage.style.display = "inline";
                    placeholderImage.style.display = "none";
                };
                img.src = nowPlaying.song.art;
            }

            const nowPlayingArtist = document.getElementById('nowPlayingArtist');
            if (nowPlayingArtist) {
                nowPlayingArtist.innerText = nowPlaying.song.artist;
            }

            const nowPlayingSong = document.getElementById('nowPlayingSong');
            if (nowPlayingSong) {
                nowPlayingSong.innerText = nowPlaying.song.title;
            }

            const nowPlayingAlbum = document.getElementById('nowPlayingAlbum');
            if (nowPlayingAlbum) {
                nowPlayingAlbum.innerText = nowPlaying.song.album;
            }

            // Fetch and display artist bio from Last.fm
            fetchLastFmArtistInfo(nowPlaying.song.artist);
        })
        .catch(error => {
            console.error('API Error:', error);
            console.error('Error occurred at:', new Date().toISOString());

            // User feedback
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
                errorElement.innerHTML = 'An error occurred while fetching data.';
            }

            // Retry mechanism
            if (retries > 0) {
                retries--;
                console.log('Retrying... Remaining retries:', retries);
                fetchWithRetry();
            } else {
                // Fallback data or other actions
                // ...
            }
        });
    }
    fetchWithRetry();  // Call the function to start fetching

}
async function checkForMultipleArtists(artistName) {
    try {
        // Make an API call to check if multiple artists exist with the same name
        // Dummy example: Replace this with your actual API call and logic
        const response = await fetch(`yourAPIEndpointHere?artist=${artistName}`);
        const data = await response.json();

        // Your logic here to determine if multiple artists exist
        // Return true if multiple artists with the same name exist, false otherwise.
        return data.artists.length > 1;
    } catch (error) {
        console.error('Multiple Artists Check Error:', error);
        return false;
    }
}

// Initialize: Fetch the currently playing song and artist info
fetchNowPlaying();
fetchNowPlayingSong();

// Set intervals
setInterval(fetchNowPlaying, 30000);
setInterval(fetchNowPlayingSong, 30000);

function fetchSongHistory() {
    fetch(`https://listen.offbeatcamp.com/api/station/${stationId}/history`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35'  // replace with your API key
        }
    })
    .then(response => response.json())
    .then(data => {
        let songs = data.slice(1, 3).reverse();

        let prevSong = songs[0];
        let recentSong = songs[1];

        let prevTrackImage = document.getElementById('prevTrackImage');
        let prevPlaceholderImage = document.getElementById('prevPlaceholderImage');
        
        if (prevTrackImage) {
            // Create a new Image object
            let img = new Image();
            // Once the image has loaded, update the src of the prevTrackImage and show it while hiding the placeholder
            img.onload = function() {
                prevTrackImage.src = this.src;
                prevTrackImage.style.display = "inline";
                prevPlaceholderImage.style.display = "none";
            };
            // Start loading the image
            img.src = prevSong.song.art;
        }

        let prevTrackArtist = document.getElementById('prevTrackArtist');
        if (prevTrackArtist) {
            prevTrackArtist.innerText = prevSong.song.artist;
        }

        let prevTrackSong = document.getElementById('prevTrackSong');
        if (prevTrackSong) {
            prevTrackSong.innerText = prevSong.song.title;
        }

        let prevTrackAlbum = document.getElementById('prevTrackAlbum');
        if (prevTrackAlbum) {
            prevTrackAlbum.innerText = prevSong.song.album;
        }

        let recentTrackImage = document.getElementById('recentTrackImage');
        let recentPlaceholderImage = document.getElementById('recentPlaceholderImage');
        
        if (recentTrackImage) {
            // Create a new Image object
            let img = new Image();
            // Once the image has loaded, update the src of the recentTrackImage and show it while hiding the placeholder
            img.onload = function() {
                recentTrackImage.src = this.src;
                recentTrackImage.style.display = "inline";
                recentPlaceholderImage.style.display = "none";
            };
            // Start loading the image
            img.src = recentSong.song.art;
        }

        let recentTrackArtist = document.getElementById('recentTrackArtist');
        if (recentTrackArtist) {
            recentTrackArtist.innerText = recentSong.song.artist;
        }

        let recentTrackSong = document.getElementById('recentTrackSong');
        if (recentTrackSong) {
            recentTrackSong.innerText = recentSong.song.title;
        }

        let recentTrackAlbum = document.getElementById('recentTrackAlbum');
        if (recentTrackAlbum) {
            recentTrackAlbum.innerText = recentSong.song.album;
        }
    })
    .catch(error => {
        console.error('API Error:', error);
    })
}

fetchSongHistory();

setInterval(fetchSongHistory, 30000);

// List of Songs history

function fetchLastTenSongs() {
    const historyLimit = 10; // number of recent songs you want to fetch

    fetch(`https://listen.offbeatcamp.com/api/station/${stationId}/history?limit=${historyLimit}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35'  // replace with your API key
        }
    })
    .then(response => response.json())
    .then(data => {
        let songs = data.slice(0, 10);  // get the last 10 songs

        songs.forEach((song, index) => {

            let songBlock = document.getElementById(`row${index}`);

            if (song.playlist === "General Jingles") {
                // If the song is from "General Jingles" playlist, hide the row
                if (songBlock) {
                    songBlock.style.display = "none";
                }
            } else {

                // Rest of the code goes here...
        
                let trackImage = document.getElementById(`trackImage${index}`);
                let placeholderImage = document.getElementById(`placeholderImage${index}`);
                let songBlock = document.getElementById(`row${index}`);

                if (trackImage) {
                    // Create a new Image object
                    let img = new Image();
                    // Once the image has loaded, update the src of the trackImage and show it while hiding the placeholder
                    img.onload = function() {
                        trackImage.src = this.src;
                        trackImage.style.display = "inline";
                        placeholderImage.style.display = "none";
                    };
                    // Start loading the image
                    img.src = song.song.art;
                }
    
                let trackArtist = document.getElementById(`trackArtist${index}`);
                if (trackArtist) {
                    trackArtist.innerText = song.song.artist;
                }
    
                let trackSong = document.getElementById(`trackSong${index}`);
                if (trackSong) {
                    trackSong.innerText = song.song.title;
                }
    
                let trackAlbum = document.getElementById(`trackAlbum${index}`);
                if (trackAlbum) {
                    trackAlbum.innerText = song.song.album;
                }
                let playedAt = new Date(song.played_at * 1000);
    
                // Get the hours, minutes and format them in 12-hour AM/PM format
                let hours = playedAt.getHours();
                let minutes = String(playedAt.getMinutes()).padStart(2, '0');
                let ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                document.getElementById(`songHistoryTime${index}`).innerText = `${hours}:${minutes} ${ampm}`;
                // etc...

                if (songBlock) {
                    songBlock.style.display = "block";
                }

            }

 
        });
    })
    .catch(error => {
        //console.error('API Error:', error);
    })
}

// Fetch the last 10 songs initially
fetchLastTenSongs();

// Fetch the last 10 songs every 30 seconds
setInterval(fetchLastTenSongs, 30000);


function fetchNextSong() {
    fetch(`https://listen.offbeatcamp.com/api/station/${stationId}/queue`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35'  // replace with your API key
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data) || data.length < 2) {
            console.error('No songs in the queue');
            return;
        }

        // Get the next two songs from the queue
        let nextSong = data[0].song;
        let laterSong = data[1].song;

        let nextSongArtElement = document.getElementById('nextSongArt');
        let nextSongPlaceholderImage = document.getElementById('nextSongPlaceholderImage');

        if (nextSongArtElement) {
            // Create a new Image object
            let img = new Image();
            // Once the image has loaded, update the src of the nextSongArtElement and show it while hiding the placeholder
            img.onload = function() {
                nextSongArtElement.src = this.src;
                nextSongArtElement.style.display = "inline";
                nextSongPlaceholderImage.style.display = "none";
            };
            // Start loading the image
            img.src = nextSong.art;
        }

        let nextSongArtistElement = document.getElementById('nextSongArtist');
        if (nextSongArtistElement) nextSongArtistElement.innerText = nextSong.artist;
        
        let nextSongTitleElement = document.getElementById('nextSongTitle');
        if (nextSongTitleElement) nextSongTitleElement.innerText = nextSong.title;
        
        let nextSongAlbumElement = document.getElementById('nextSongAlbum');
        if (nextSongAlbumElement) nextSongAlbumElement.innerText = nextSong.album;

        let laterSongArtElement = document.getElementById('laterSongArt');
        let laterSongPlaceholderImage = document.getElementById('laterSongPlaceholderImage');

        if (laterSongArtElement) {
            // Create a new Image object
            let img = new Image();
            // Once the image has loaded, update the src of the laterSongArtElement and show it while hiding the placeholder
            img.onload = function() {
                laterSongArtElement.src = this.src;
                laterSongArtElement.style.display = "inline";
                laterSongPlaceholderImage.style.display = "none";
            };
            // Start loading the image
            img.src = laterSong.art;
        }

        let laterSongArtistElement = document.getElementById('laterSongArtist');
        if (laterSongArtistElement) laterSongArtistElement.innerText = laterSong.artist;
        
        let laterSongTitleElement = document.getElementById('laterSongTitle');
        if (laterSongTitleElement) laterSongTitleElement.innerText = laterSong.title;
        
        let laterSongAlbumElement = document.getElementById('laterSongAlbum');
        if (laterSongAlbumElement) laterSongAlbumElement.innerText = laterSong.album;
    })
    .catch(error => {
        console.error('API Error:', error);
    })
}

// Fetch the next song initially
fetchNextSong();

// Set an interval to fetch the next song every 30 seconds
setInterval(fetchNextSong, 30000);


jQuery(document).ready(function($) {
    // check if the current URL path matches '/'
    if(window.location.pathname == '/') {
        // Add 'no-scroll' class to body when on homepage
        $('body').addClass('no-scroll');
    } else {
        // Remove 'no-scroll' class when not on homepage
        $('body').removeClass('no-scroll');
    }

    // AJAX complete function
    $(document).ajaxComplete(function() {
        // If navigating to homepage, add 'no-scroll' class
        if(window.location.pathname == '/') {
            $('body').addClass('no-scroll');
        } else {
            // If navigating away from homepage, remove 'no-scroll' class
            $('body').removeClass('no-scroll');
        }
    });
});

jQuery(document).ready(function($) {
    loadSlider(); // Load slider on page load

    // Use this if your site-branding element is a link (i.e., <a> tag).
    // If it's another element, adapt accordingly.
    jQuery(document).on('click', '.site-branding a', function(e) {
        e.preventDefault(); // prevent the default action
        history.pushState(null, '', this.href); // change the URL without reloading the page
        loadSlider(); // load the slider
    });
});

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

var isFirstSlide = true;  // Declare this variable outside the changeSlide function

function changeSlide() {
    // Determine the fade-in duration based on whether it's the first slide or not
    var fadeInDuration = isFirstSlide ? 1000 : 5000;
    
    // Stop all animations on the currently active slide, then animate its opacity to 0
    jQuery('.slide.active').stop().animate({opacity: 0}, 5000, function() {
        // Once the animation is complete, remove the 'active' class
        jQuery(this).removeClass('active');
    });

    // Update currentSlide
    currentSlide = (currentSlide + 1) % totalSlides;

    // Get the next slide, stop all animations on it, add the 'active' class, and then animate its opacity to 1
    var nextSlide = jQuery('.slide').eq(currentSlide);
    nextSlide.stop().addClass('active').animate({opacity: 1}, fadeInDuration);

    // After the first slide has been shown, update the isFirstSlide variable
    isFirstSlide = false;
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
                // Show the first slide immediately
                currentSlide = 0;
                changeSlide();
                
                // Wait 25 seconds before starting the setInterval
                setTimeout(function() {
                    intervalID = setInterval(changeSlide, 25000);
                }, 25000);
                
            }, function() {
                // This is the callback for when the first image is loaded
                currentSlide = 0;
                changeSlide();
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
}

// Modified preloadImages
function preloadImages(images, allLoadedCallback, firstImageLoadedCallback) {
    var totalImages = images.length;
    var loadedImages = 0;

    images.forEach(function(imageURL, index) {
        var img = new Image();
        img.src = imageURL;
        img.onload = function() {
            loadedImages++;

            // Call the firstImageLoadedCallback when the first image is loaded
            if (index === 0 && firstImageLoadedCallback) {
                firstImageLoadedCallback();
            }

            // Call the allLoadedCallback when all images are loaded
            if (loadedImages === totalImages && allLoadedCallback) {
                allLoadedCallback();
            }
        };
    });
}



// Load the slider on page load
loadSlider();

// HOME PRELOADER
// Show the preloader
jQuery('.home-preloader').show();


jQuery('.policy-icon').on('click', function(e) {
    e.preventDefault(); // Prevent default behavior of the link
    jQuery('.policy-nav').toggle(); // Toggle the display of the policy-nav div
});
// Close the .policy-nav div when one of its items is clicked
jQuery('.policy-nav .ajax-nav').on('click', function(e) {
    e.preventDefault(); // Prevent default behavior of the link (if necessary)
    jQuery('.policy-nav').hide(); // Hide the policy-nav div
});

// add logo link produce an error

// Hide the preloader after a delay
setTimeout(function() {
    jQuery('.home-preloader').hide();
}, 10000);  // The delay in milliseconds, adjust to your needs


// hide header when mouse is not moving
var hideHeaderTimeout, timeoutInfo, timeoutIdFooter;

// Define the function to interact with the header on the homepage
function setupHeaderInteractions() {
    var delay = 5000;  // 5 seconds

    function showHeader() {
        clearTimeout(hideHeaderTimeout);
        clearTimeout(timeoutIdFooter);
        clearTimeout(timeoutInfo);
        jQuery('#masthead, #colophon').slideDown(500);
        jQuery('.slide-info').fadeIn(500);
        hideHeaderTimeout = setTimeout(function() {
            jQuery('#masthead').slideUp(500);
        }, delay);
        timeoutIdFooter = setTimeout(function() {
            jQuery('#colophon').slideUp(500);
        }, delay);
        timeoutInfo = setTimeout(function() {
            jQuery('.slide-info').fadeOut(500);
        }, delay);
    }

    // Show the header initially for 5 seconds
    showHeader();

    // Attach mousemove and click events to the document to show the header
    jQuery(document).on('mousemove.home click.home', function() {
        showHeader();
    });
}

// Function to ensure the header remains visible on all pages apart from the home page
function setupHeaderForOtherPages() {
    clearTimeout(hideHeaderTimeout);
    clearTimeout(timeoutIdFooter);
    clearTimeout(timeoutInfo);
    jQuery('#masthead').slideDown(500);
    jQuery('#colophon').slideDown(500);
    jQuery('.slide-info').fadeOut(500);
    // Unbind the mousemove and click events attached in the home page
    jQuery(document).off('mousemove.home click.home');
}

function initializeHeader() {
    if (window.location.pathname === '/') {
        setupHeaderInteractions();
    } else {
        setupHeaderForOtherPages();
    }
}

// Initialize header behavior on page load
jQuery(document).ready(function($) {
    initializeHeader();
});

// Reinitialize header behavior on AJAX navigation
jQuery(document).ajaxComplete(function() {
    initializeHeader();
});

jQuery(document).ready(function() {
    jQuery(window).on('load', function() {
        jQuery('#preloader').fadeOut('slow',function(){jQuery(this).remove();});
    });
});




























































