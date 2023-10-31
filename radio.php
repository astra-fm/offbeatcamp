<?php /* Template Name: radio */ 
session_start();
get_header(); ?>

<div class="container">
    <div class="row">
        <div class="col s12 m12 l12 center-align">
            <div class="ul-page-bg-current-song">
                <p class="ul-title-listening">You're listening to</p>
                <span id="show-schedule"></span> <span id="current-show-time"></span>
                <!--<div id="show-image"></div>-->
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col m3 l2 hide-on-med-and-down center-align">
            <div class="ul-previous-track">
                <div class="ul-title-slider"></div>

                <img class="ul-image-opacity next-track-later" id="prevPlaceholderImage" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                <img class="ul-image-opacity next-track-later"  id="prevTrackImage" style="display: none;">

                <div class="ul-artist-info">
                    <div id="prevTrackArtist" class="ul-track-name"></div>
                    <div id="prevTrackSong"></div>
                    <p id="prevTrackAlbum"></p>
                </div>
            </div>
        </div>
        <div class="col m3 l2 hide-on-small-only center-align">
            <div class="ul-previous-track">
                <div class="ul-title-slider">Recent played</div>

                <img class="ul-image-opacity next-track-later" id="recentPlaceholderImage" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                <img class="next-track-later" id="recentTrackImage" style="display: none;">

                <div class="ul-artist-info">
                    <div id="recentTrackArtist" class="ul-track-name"></div>
                    <div id="recentTrackSong"></div>
                    <p id="recentTrackAlbum"></p>
                </div>
            </div>
        </div>
        <div class="col s12 m6 l4 center-align">
            <div class="ul-current-track">              

                <img id="nowPlayingImage" style="display: none;">
                <img id="placeholderImage" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif" alt="Loading image...">

                <div class="ul-artist-info">
                    <div id="nowPlayingArtist" class="ul-track-name"></div>
                    <div id="nowPlayingSong"></div>
                    <p id="nowPlayingAlbum"></p>
                    <div id="nowPlayingYear"></div>
                </div>
            </div>
        </div>
        <div class="col m3 l2 hide-on-small-only center-align">
            <div class="ul-next-track">
            <div class="ul-title-slider">Next song</div>

                <img id="nextSongPlaceholderImage" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                <img id="nextSongArt" style="display: none;">
                
                <div class="ul-artist-info">
                    <div id="nextSongArtist" class="ul-track-name"></div>
                    <div id="nextSongTitle"></div>
                    <p id="nextSongAlbum"></p>
                </div>
            </div>
        </div>
        <div class="col m3 l2 hide-on-med-and-down center-align">
            <div class="ul-next-track">
                <div class="ul-title-slider"></div>

                <img id="laterSongPlaceholderImage" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                <img id="laterSongArt" class="ul-image-opacity next-track-later" style="display: none;">


                <div class="ul-artist-info">
                    <div id="laterSongArtist" class="ul-track-name"></div>
                    <div id="laterSongTitle"></div>
                    <p id="laterSongAlbum"></p>
                </div>
            </div>
        </div>
    </div><!-- Page Content goes here -->
    <div class="row justify-content">
        <div class="col-bio">
        <!--<img id="artistImage" src="" alt="Artist Image" width="200">-->
            <div id="artistBio"></div>
        </div>
    </div>
</div>
<div class="container-full">
<div class="container">
    <div class="row">
        <div class="col m4 l2">
            <b>Next Show</b>
        </div>
    </div>
    <div class="row">
        <div class="bg-next-show">
            <div class="col m12 l2">
                <div id="next-show-image"></div>
            </div>
            <div class="col m12 l5 next-show-content">
                <div id="next-show-time"></div>
                <div id="next-show"></div>
            </div>
            <div class="col m12 l5 next-show-content">
                <div id="next-show-description"></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col m2 l2">
            <b>History</b>
        </div>
    </div>
    <div id="songsHistory">
        <div id="row0" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime0"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage0" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage0" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist0"></div>
                    <div id="trackSong0"></div>
                </div>
                </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum0"></div>
            </div>
        </div>
        <div id="row1" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime1"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage1" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage1" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist1"></div>
                    <div id="trackSong1"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum1"></div>
            </div>
        </div>
        <div id="row2"  class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime2"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage2" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage2" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist2"></div>
                    <div id="trackSong1"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum2"></div>
            </div>
        </div>
        <div id="row3" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime3"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage3" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage3" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist3"></div>
                    <div id="trackSong3"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum3"></div>
            </div>
        </div>
        <div id="row4" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime4"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage4" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage4" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist4"></div>
                    <div id="trackSong4"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum4"></div>
            </div>
        </div>
        <div id="row5" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime5"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage5" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage5" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist5"></div>
                    <div id="trackSong5"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum5"></div>
            </div>
        </div>
        <div id="row6"  class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime6"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage6" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage6" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist6"></div>
                    <div id="trackSong6"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum6"></div>
            </div>
        </div>
        <div id="row7" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime7"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage7" src="https://media.studioxplore.com/wp-content/uploads/2023/06/new-spinner.gif">
                    <img id="trackImage7" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist7"></div>
                    <div id="trackSong7"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum7"></div>
            </div>
        </div>
        <div id="row8" class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime8"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage8" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage8" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist8"></div>
                    <div id="trackSong8"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum8"></div>
            </div>
        </div>
        <div id="row9"  class="row">
            <div class="col m2 l1 hide-on-small-only">
                <div id="songHistoryTime9"></div>
            </div>
            <div class="col m5 l6">
                <div class="historyImg">
                    <img id="placeholderImage9" src="https://www.offbeatcamp.com/wp-content/uploads/2023/08/spinner-new-v2.gif">
                    <img id="trackImage9" src="" alt="Album art" style="display: none;">
                </div>
                <div class="historyInfo">
                    <div class="historyArtist" id="trackArtist9"></div>
                    <div id="trackSong9"></div>
                </div>
            </div>
            <div class="col m5 l5 hide-on-small-only">
                <div class="historyAlbum" id="trackAlbum9"></div>
            </div>
        </div>
    </div>
</div>
</div>
<?php get_footer();?>