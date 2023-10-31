/* SHOW ALBUMS INFORMATION IN HOME */

jQuery(document).ready(function() {

    

    /* LOAD SHOW NAME AND DESCRIPTION */

    var currentDate = new Date();
    var currentDay = currentDate.getDay();
    var currentHour = currentDate.getHours() % 24;
    var showSchedule = jQuery("#show-schedule");
    var showImage = jQuery("#show-image");
    var showNextImage = jQuery("#show-next-image")

    var shows = {
        0: {
        0: { name: "<p class='ul-show-title'>Spectral</p><span>Idm, Experimental Electronic</span>", range: [0, 2] },
        2: { name: "<p class='ul-show-title'>Twilight</p><span>Ambient, Neo Classical</span>", range: [2, 6] },
        6: { name: "<p class='ul-show-title'>Indietronics</p><span>Early morning, Electronic indie at Urbanlab</span>", range: [6, 8] },
        9: { name: "<p class='ul-show-title'>Morning Circus</p><span>Neo Psychedelic, Experimental Funk, Indie desert</span>", range: [8, 12] },
        12: { name: "<p class='ul-show-title'>Electronic Vibes</p><span>Electronic Music vibes</span>", range: [12, 18] },
        18: { name: "<p class='ul-show-title'>Cocktail</p><span>Jazz, Soul and something in the middle</span>", range: [18, 20] },
        20: { name: "<p class='ul-show-title'>Nightfall</p><span>The eccentrics of music</span>", range: [20, 22] },
        22: { name: "<p class='ul-show-title'>Offbeatcamp Collective</p><span>Experimental Dance</span>", range: [22, 24] }
        }
    };
    var images = {
        0: {
        0: { image: "<img class='ul-show-image' alt='Spectral' src='https://offbeatcamp.com/wp-content/uploads/2023/07/spectral.png'>", range: [0, 2] },
        2: { image: "<img class='ul-show-image' alt='Twilight' src='https://offbeatcamp.com/wp-content/uploads/2023/07/twilight.png'>", range: [2, 6] },
        6: { image: "<img class='ul-show-image' alt='Indietronics' src='https://offbeatcamp.com/wp-content/uploads/2023/07/indietronics.png'>", range: [6, 8] },
        9: { image: "<img class='ul-show-image' alt='Morning Circus' src='https://offbeatcamp.com/wp-content/uploads/2023/07/morning-circus.png'>", range: [8, 12] },
        12: { image: "<img class='ul-show-image' alt='Electronic Vibes' src='https://offbeatcamp.com/wp-content/uploads/2023/07/electronic-vibes.png'>", range: [12, 18] },
        18: { image: "<img class='ul-show-image' alt='Cocktail' src='https://offbeatcamp.com/wp-content/uploads/2023/07/cocktail.png'>", range: [18, 20] },
        20: { image: "<img class='ul-show-image' alt='Nightfall' src='https://offbeatcamp.com/wp-content/uploads/2023/07/nightfall.png'>", range: [20, 22] },
        22: { image: "<img class='ul-show-image' alt='Offbeatcamp Collective' src='https://offbeatcamp.com/wp-content/uploads/2023/07/xplore-collective.png'>", range: [22, 24] }
        }
    };
    var descriptions = {
        0: {
        0: { description: "IDM and experimental electronic music will be with you for 2 hours. It's a time to explore new sounds at the start of a new day.", range: [0, 2] },
        2: { description: "Twilight will take us on a dreamy journey, creating atmospheres that will be accompanied by the soundscapes of ambient or neo-classical music.", range: [2, 6] },
        6: { description: "The early hours of the sun are welcomed with the sounds of independent electronic music and low-speed experimentation.", range: [6, 8] },
        9: { description: "The morning continues on its way, exploring the experimental side of funk, neo-psychedelia, and indie music, pushing boundaries along the way", range: [8, 12] },
        12: { description: "Electronic music that features main guests such as Kompakt, XL Recordings, Ninja Tune, and those emerging labels that contribute to creating new music.", range: [12, 18] },
        18: { description: "Experience a unique fusion of multiple styles driven by the sounds of jazz or soul. Prepare to be transported on a musical journey as you explore a fusion of sounds.", range: [18, 20] },
        20: { description: "Restless musicians who seek to challenge the boundaries of music by playing with styles like electronic, folk, and experimental.", range: [20, 22] },
        22: { description: "This space is where rhythm takes center stage, 2 hours, exploring music whose main ingredient is rhythm. Dance music with many faces.", range: [22, 24] },
        24: { description: "IDM and experimental electronic music will be with you for 2 hours. It's a time to explore new sounds at the start of a new day.", range: [0, 2] }
        }
    };

    var timezone_offset = {
        "Barcelona": -2,
        "England": -2,
        "Ireland": -2,
        "Argentina": -5
    };

    // Get the timezone offset based on the current location
    var tz = new Date().getTimezoneOffset() / 60;

    // Use the selected timezone offset based on the specified places
    var selected_offset = timezone_offset["Barcelona"];
    currentHour = (currentHour + 24 + selected_offset - tz) % 24;

    var currentShow, nextShow;
    var currentImage, nextImage;

    for (var hour in shows[0]) {
        var show = shows[0][hour];
        if (currentHour >= show.range[0] && currentHour < show.range[1]) {
            currentShow = show;
        }
        if (currentHour < show.range[0]) {
            nextShow = show;
            break;
        }
    }

    for (var hour in images[0]) {
        var show = images[0][hour];
        if (currentHour >= show.range[0] && currentHour < show.range[1]) {
            currentImage = show;
        }
        if (currentHour < show.range[0]) {
            nextImage = show;
            break;
        }
    }
    showSchedule.html(currentShow.name);
    showImage.html(currentImage.image);


    // If there's no next show today, get the first show tomorrow
    if (!nextShow) {
        var firstHour = Object.keys(shows[0])[0];
        nextShow = shows[0][firstHour];
    }

    // Show the current and next show time ranges
    var currentShowTimeRange = "";
    if (currentShow) {
        currentShowTimeRange += "<span> from " + currentShow.range[0] + ":00 - " + currentShow.range[1] + ":00</span>";
    } else {
        currentShowTimeRange += "<span>No current show</span>";
    }
    jQuery("#current-show-time").html(currentShowTimeRange);

    var nextShowTimeRange = "";
    if (nextShow) {
        nextShowTimeRange += "<span> from " + nextShow.range[0] + ":00 - " + nextShow.range[1] + ":00</span>";
    } else {
        var firstHour = Object.keys(shows[0])[0];
        var nextShow = shows[0][firstHour];
        nextShowTimeRange += "<span> from " + nextShow.range[0] + ":00 - " + nextShow.range[1] + ":00 (tomorrow)</span>";
    }
    jQuery("#next-show-time").html(nextShowTimeRange);

    // Show the next show name
    var nextShowName = "";
    if (nextShow) {
        nextShowName += "<span>" + nextShow.name + "</span>";
    } else {
        var firstHour = Object.keys(shows[0])[0];
        var nextShow = shows[0][firstHour];
        nextShowName += "<span>" + nextShow.name + " (tomorrow)</span>";
    }
    jQuery("#next-show").html(nextShowName);

    
    function updateShowInfo() {
        var currentDate = new Date();
        var currentHour = currentDate.getHours() % 24;
        // Use the selected timezone offset
        currentHour = (currentHour + 24 + selected_offset - tz) % 24;

        var currentShow, currentImage, currentDescription;
        var nextShow, nextImage, nextDescription;
        var nextShowStart = 24;

        // Get the current and next show, image, and description
        for (let i = 0; i < 24; i++) {
            var show = shows[0][i];
            var image = images[0][i];
            var description = descriptions[0][i];

            if (show && currentHour >= show.range[0] && currentHour < show.range[1]) {
                currentShow = show;
                currentImage = image;
                currentDescription = description;
            }

            if (show && show.range[0] > currentHour && show.range[0] < nextShowStart) {
                nextShow = show;
                nextImage = image;
                nextDescription = description;
                nextShowStart = show.range[0];
            }
        }

        // If no next show, image, or description, get the first show, image, or description of the next day
        if (!nextShow) {
            nextShow = shows[0][0];
        }
        if (!nextImage) {
            nextImage = images[0][0];
        }
        if (!nextDescription) {
            nextDescription = descriptions[0][0];
        }

        // Update the HTML elements with the current and next show's info
        jQuery("#show-schedule").html(currentShow.name);
        jQuery("#show-image").html(currentImage.image);
        jQuery("#current-show-time").html("<span> from " + currentShow.range[0] + ":00 - " + currentShow.range[1] + ":00</span>");
        
        jQuery("#next-show").html(nextShow.name);
        jQuery("#next-show-image").html(nextImage.image);
        jQuery("#next-show-description").html(nextDescription.description);
        jQuery("#next-show-time").html("<span> from " + nextShow.range[0] + ":00 - " + nextShow.range[1] + ":00</span>");

        // Set a timeout to update the show info when the next show begins
        var msUntilNextShow = (nextShowStart - currentHour) * 60 * 60 * 1000;
    }

    // Start the update loop
    updateShowInfo();
    window.recentSongsInterval = setInterval(function () {
        updateShowInfo();
    }, 5000);

    /* FOOTER PLAYER CUSTOMIZED */

    
   // Fetch the .pls file
   let audioPlayer = document.getElementById('audioPlayer');

    // Use the direct URL to set up the audio player
    audioPlayer.src = 'https://listen.offbeatcamp.com/listen/radio_xplore/radio.mp3';

    audioPlayer.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    audioPlayer.addEventListener('error', function() {
        console.log('Error occurred:', this.error);
    }, false);

    // Set up the Play button
    document.getElementById('playBtn').addEventListener('click', function() {
        audioPlayer.load();  // Ensure the latest source is loaded
        audioPlayer.play().then(function() {
            console.log('Play successful');
        }).catch(function(error) {
            console.error('Play failed: ', error);
        });
        this.classList.add('hidden');
        document.getElementById('stopBtn').classList.remove('hidden');
    });
   

    // Set up the Stop button
    document.getElementById('stopBtn').addEventListener('click', function() {
        audioPlayer.pause();
        // Use the direct URL to set up the audio player
        audioPlayer.src = 'https://listen.offbeatcamp.com/listen/radio_xplore/radio.mp3';
        audioPlayer.load();
        this.classList.add('hidden');
        document.getElementById('playBtn').classList.remove('hidden');
    });
    
    // Set up the volume control
    document.getElementById('volumeSlider').addEventListener('input', function() {
        audioPlayer.volume = this.value;
    });
    
    // Set up the volume icon
    document.getElementById('volumeIcon').addEventListener('click', function() {
        let volumeControl = document.getElementById('volumeControl');
        if (volumeControl.classList.contains('hidden')) {
            volumeControl.classList.remove('hidden');
        } else {
            volumeControl.classList.add('hidden');
        }
    });
    
    // Listen for a click event on the entire document
    document.addEventListener('click', function(event) {
        // Get the volume control and volume icon elements
        let volumeControl = document.getElementById('volumeControl');
        let volumeIcon = document.getElementById('volumeIcon');
    
        // Check if the clicked element is the volume icon, its child <i> tag, or inside the volume control
        if (!volumeControl.contains(event.target) && event.target !== volumeIcon && event.target.parentNode !== volumeIcon) {
            // If it isn't, hide the volume control
            volumeControl.classList.add('hidden');
        }
    });

    audioPlayer.addEventListener('error', function() {
        console.log('Error occurred:', this.error);
        // When an error occurs, hide the stop button and show the play button
        document.getElementById('stopBtn').classList.add('hidden');
        document.getElementById('playBtn').classList.remove('hidden');
    }, false);
    
   



});

/* navigation */

/* jQuery code */
jQuery(document).ready(function($) {
    $("#primary-mobile-menu").click(function() {
        $("#ul-main-menu").toggle(); // toggles the visibility of the menu
    });
});


let stationId = 1;  // replace with your station ID

// Function to fetch the currently playing song
function fetchNowPlaying() {
    fetch(`https://listen.offbeatcamp.com/api/nowplaying/${stationId}`)
        .then(response => response.json())
        .then(data => {
            let nowPlaying = data.now_playing;
            // Display these details in your HTML
            document.getElementById('artist-player-info').innerText = nowPlaying.song.artist;
            document.getElementById('song-player-info').innerText = nowPlaying.song.title;
        })
        .catch(error => {
            console.error('API Error:', error);
        })
}

// Fetch the currently playing song and song history initially
fetchNowPlaying();
// Set an interval to fetch the currently playing song and song history every 5 seconds
setInterval(fetchNowPlaying, 30000);


function fetchNowPlayingSong() {
    let nowPlayingImage = document.getElementById('nowPlayingImage');
    let placeholderImage = document.getElementById('placeholderImage');

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

        if (nowPlayingImage) {
            // Create a new Image object
            let img = new Image();
            // Once the image has loaded, update the src of the nowPlayingImage and show it while hiding the placeholder
            img.onload = function() {
                nowPlayingImage.src = this.src;
                nowPlayingImage.style.display = "inline";
                placeholderImage.style.display = "none";
            };
            // Start loading the image
            img.src = nowPlaying.song.art;
        }

        let nowPlayingArtist = document.getElementById('nowPlayingArtist');
        if (nowPlayingArtist) {
            nowPlayingArtist.innerText = nowPlaying.song.artist;
        }

        let nowPlayingSong = document.getElementById('nowPlayingSong');
        if (nowPlayingSong) {
            nowPlayingSong.innerText = nowPlaying.song.title;
        }

        let nowPlayingAlbum = document.getElementById('nowPlayingAlbum');
        if (nowPlayingAlbum) {
            nowPlayingAlbum.innerText = nowPlaying.song.album;
        }
    })
    .catch(error => {
        console.error('API Error:', error);
    });
}

// Fetch the current playing song initially
fetchNowPlayingSong();

// Set an interval to fetch the current playing song every 30 seconds
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
        console.error('API Error:', error);
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


























































