const lastFmApiKey = '1b5f6cba2030cbe3cdac335832e4252f';
const imageCache = {};
const spotyClientId = '11136c1dce064dafa8ce2a0734cd97fc';
const clientSpotySecret = 'ca2102206a00485095802596dcce0187';

const stationId = "1"; // replace with your station id
function loadImage(url) {
    if (imageCache[url]) {
        return Promise.resolve(imageCache[url]);
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache[url] = img;
            resolve(img);
        };
        img.onerror = reject;
        img.src = url;
    });
}

 
 // Function to fetch the currently playing song (Player Info)
 function fetchNowPlaying() {
     //console.time("fetchNowPlaying");
     fetch(`https://listen.astra.fm/api/nowplaying/${stationId}`)
         .then(response => response.json())
         .then(data => {
             //console.log("Full API Response:", JSON.stringify(data, null, 2));
             let nowPlaying = data.now_playing;

             fetchSpotifyArtistInfo(nowPlaying.song.artist);
 
             // Update the artist bio when the song changes
             fetchLastFmArtistInfo(nowPlaying.song.artist);
             // Update the artist image when the song change
         })
         .catch(error => {
            // No hagas nada aquí para ocultar los errores en la consola
        })
        .finally(() => {
            //console.timeEnd("fetchNowPlaying");
        });
 }



// Elemento de imagen del artista
let artistImageElement;
const defaultSpotifyImage = 'https://i.scdn.co/image/ab6761610000e5eb11fca9b6dc74199cd6799677';
const placeholderImage = 'https://www.astra.fm/wp-content/uploads/2023/12/aa-placehoplder-V0.png';
const artistImageTempElement = document.getElementById('artistImageTemp');
const nowPlayingImageId = 'artistImage'; // ID del elemento de imagen


function initializeArtistImage() {
    artistImageElement = document.getElementById('artistImage');
    if (artistImageElement) {
        artistImageElement.src = placeholderImage;
        artistImageElement.style.display = "block";
    }
    if (artistImageTempElement) {
        artistImageTempElement.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', initializeArtistImage);


async function fetchSpotifyArtistInfo(artistName) {
    const clientId = spotyClientId;
    const clientSecret = clientSpotySecret;

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const searchData = await searchResponse.json();

    if (searchData.artists.items.length > 0) {
        const artistId = searchData.artists.items[0].id;
        const artist = searchData.artists.items[0];

        const supportLink = artist.external_urls.spotify;
        const supportLinkElement = document.getElementById('supportArtistLink');
        if (supportLinkElement) {
            supportLinkElement.href = supportLink;
            supportLinkElement.style.display = "block";
        }

        const nowPlayingImage = document.getElementById(nowPlayingImageId); // Obtener el elemento de la imagen

        if (googleDriveImages[artistName]) {
            // Si el artista tiene una imagen en Google Drive, mostrar esa imagen
            nowPlayingImage.src = googleDriveImages[artistName];
        } else {
            // Si no hay imagen en Google Drive, obtener la imagen de Spotify
            const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
            const artistData = await artistResponse.json();

            if (artistImageElement && artistData.images && artistData.images.length > 0) {
                const imageUrl = artistData.images[0].url;
                if (imageUrl !== defaultSpotifyImage) {
                    updateArtistImage(imageUrl);
                } else {
                    showArtistImageTemp();
                }
            } else {
                showArtistImageTemp();
            }
        }
    } else {
        showArtistImageTemp();
    }
}


function showArtistImageTemp() {
    if (artistImageTempElement) {
        artistImageTempElement.style.display = "block";
    }
    if (artistImageElement) {
        artistImageElement.style.display = "none";
    }
}

function updateArtistImage(imageUrl) {
    let img = new Image();
    img.onload = function() {
        if (artistImageElement) {
            artistImageElement.src = imageUrl;
            artistImageElement.style.display = "block";
            if (artistImageTempElement) {
                artistImageTempElement.style.display = "none";
            }
        }
    };
    img.src = imageUrl;
}

// Función adicional para verificar si Spotify sobrescribe la imagen
function checkAndReplaceSpotifyImage() {
    if (artistImageElement && artistImageElement.src === defaultSpotifyImage) {
        artistImageElement.src = placeholderImage;
    }
}

// Ejecutar periódicamente para verificar si Spotify ha sobrescrito la imagen
setInterval(checkAndReplaceSpotifyImage, 1000); // Verificar cada segundo



function fetchLastFmArtistInfo(artistName) {
    const artistBio = document.getElementById('artistBio');
    if (!artistBio) {
        return;
    }

    if (!artistName) {
        artistBio.innerText = "There's no info about this artist";
        return;
    }

    const mainArtistName = artistName.split(',')[0].trim();
    const lastFmUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(mainArtistName)}&api_key=${lastFmApiKey}&format=json`;

    fetch(lastFmUrl)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.artist && data.artist.bio && data.artist.bio.summary) {
                    let rawBio = data.artist.bio.summary;

                    // Frases que indican múltiples artistas
                    const phrasesToCheck = [
                        "There are multiple artists called",
                        "There is more than one artist with this name",
                        "There is more than one band with the name",
                        "There are numerous artists with this name",
                        "There are",
                        "there are",
                        "2)",
                        // Puedes añadir más frases aquí
                    ];

                    // Función para verificar si alguna frase está en la biografía
                    const containsAnyPhrase = (bio, phrases) => phrases.some(phrase => bio.includes(phrase));

                    if (containsAnyPhrase(rawBio, phrasesToCheck)) {
                        artistBio.innerHTML = "Multiple artists found with this name. Specific bio not available.";
                        return;
                    }

                    // Eliminar el enlace "Read more on Last.fm"
                    rawBio = rawBio.replace(/<a href="[^"]+">Read more on Last\.fm<\/a>/, '').trim();

                    if (rawBio.length > 0) {
                        artistBio.innerHTML = '<div class="aa-artist-home-bio">' + rawBio + '</div>';
                    } else {
                        artistBio.innerHTML = " ";
                    }
                } else {
                    artistBio.innerHTML = " ";
                }
            } catch (e) {
                artistBio.innerHTML = " ";
            }
        })
        .catch(error => {
            artistBio.innerHTML = " ";
        });
}


function updateNowPlayingImage(nowPlaying) {
    const nowPlayingImage = document.getElementById('nowPlayingImage');

    if (nowPlayingImage && nowPlaying.song.art) {
        loadImage(nowPlaying.song.art)
            .then(img => {
                nowPlayingImage.src = img.src;
                nowPlayingImage.style.display = "inline";
            })
    }
}
 
function fetchNowPlayingSong() {
    fetch(`https://listen.astra.fm/api/nowplaying/${stationId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35'  // replace with your API key
        }
    })
    .then(response => response.json())
    .then(data => {
        let nowPlaying = data.now_playing;
        updateNowPlayingContent(nowPlaying);
    })
    .catch(error => {
        console.error('API Error:', error);
        // Manejo de errores
    });
}

function updateNowPlayingContent(nowPlaying) {
    let nowPlayingImage = document.getElementById('nowPlayingImage');
    if (nowPlayingImage && nowPlayingImage.getAttribute('src') !== nowPlaying.song.art) {
        let img = new Image();
        img.onload = function() {
            nowPlayingImage.src = this.src;
            nowPlayingImage.style.display = "inline";
        };
        img.src = nowPlaying.song.art;
    }

    updateTextContent('nowPlayingArtist', nowPlaying.song.artist);
    updateTextContent('nowPlayingSong', nowPlaying.song.title);
    updateTextContent('nowPlayingAlbum', nowPlaying.song.album);

    // Fetch and display artist bio from Last.fm
    fetchLastFmArtistInfo(nowPlaying.song.artist);
}

function updateTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerText = text;
    }
}

// Set intervals
setInterval(fetchNowPlaying, 20000);
setInterval(fetchNowPlayingSong, 20000);

 // List of Songs history
 
 function fetchLastTenSongs() {
     const historyLimit = 10; // number of recent songs you want to fetch
 
     fetch(`https://listen.astra.fm/api/station/${stationId}/history?limit=${historyLimit}`, {
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
 
             if (song.playlist === "General Jingles" || song.song.album === "presentaciones") {
                 // If the song is from "General Jingles" playlist, hide the row
                 if (songBlock) {
                     songBlock.style.display = "none";
                 }
             } else {
 
                 // Rest of the code goes here...
         
                 let trackImage = document.getElementById(`trackImage${index}`);
                 let songBlock = document.getElementById(`row${index}`);
 
                 if (trackImage) {
                     // Create a new Image object
                     let img = new Image();
                     // Once the image has loaded, update the src of the trackImage and show it while hiding the placeholder
                     img.onload = function() {
                         trackImage.src = this.src;
                         trackImage.style.display = "";
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
                     songBlock.style.display = "";
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
 
 // Fetch the last 10 songs every 20 seconds
 setInterval(fetchLastTenSongs, 20000);
 
 
 function fetchNextSong() {
    fetch(`https://listen.astra.fm/api/station/${stationId}/queue`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-API-Key': '53d14bc1a6ec0a9f:c4b7a7c2db3da8c9bdb8ddbb59c3ab35'  // replace with your API key
        }
    })
    
    .then(response => response.json())
    .then(data => {

        if (!Array.isArray(data) || data.length < 1) {
            //console.log('Data received from API:', data);
            //console.error('No songs in the queue');
            return;
        }

        // Buscar la primera canción que no pertenezca al álbum "jingles"
        let nextSong = data.find(song => song.song.album.toLowerCase() !== 'jingles' && song.song.album.toLowerCase() !== 'presentaciones');
        //console.log('Next song found:', nextSong);
        // Si no hay ninguna canción adecuada, salir de la función
        if (!nextSong) {
            return;
        }

        nextSong = nextSong.song;

        // Mostrar la información de la canción encontrada
        let nextSongArtElement = document.getElementById('nextSongArt');
       
        if (nextSongArtElement) {
            let img = new Image();
            img.onload = function() {
                nextSongArtElement.src = this.src;
                nextSongArtElement.style.display = "inline";
            };
            img.src = nextSong.art;
        }

        let nextSongArtistElement = document.getElementById('nextSongArtist');
        if (nextSongArtistElement) nextSongArtistElement.innerText = nextSong.artist;
         
        let nextSongTitleElement = document.getElementById('nextSongTitle');
        if (nextSongTitleElement) nextSongTitleElement.innerText = nextSong.title;
         
        let nextSongAlbumElement = document.getElementById('nextSongAlbum');
        if (nextSongAlbumElement) nextSongAlbumElement.innerText = nextSong.album;
    })
    .catch(error => {
        //console.error('API Error:', error);
    })
}

// Fetch the next song initially
fetchNextSong();

// Fetch the next song every 20 seconds
setInterval(fetchNextSong, 20000);

