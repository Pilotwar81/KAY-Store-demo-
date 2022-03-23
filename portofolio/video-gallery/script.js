$(document).ready(function() {
 $(".single-film .play-movie-icon").click(function() {
  var _this = this;
   setTimeout(function() {
      $(_this).parents(".single-film").addClass("single-film-in");
     }, 700);
     $(".single-film").addClass("single-film-animate");
     $(this).parents(".single-film").addClass("single-film-active");
    });
   
 $(".single-film .video-tag-close").click(function() {
  var _this = this;
  setTimeout(function() {
    $(_this).parents(".single-film").removeClass("single-film-active");
   }, 1500);
   setTimeout(function() {
      $(".single-film").removeClass("single-film-animate");
   }, 800);
    $(_this).parents(".single-film").removeClass("single-film-in");
     });
    });

var vid1 = document.getElementById("PlayVideo1");

function pauseVid1() {
    vid1.pause();
};
var vid2 = document.getElementById("PlayVideo2");

function pauseVid2() {
    vid2.pause();
};
var vid3 = document.getElementById("PlayVideo3");

function pauseVid3() {
   vid3.pause();
};
var vid4 = document.getElementById("PlayVideo4");

function pauseVid4() {
   vid4.pause();
};
var vid5 = document.getElementById("PlayVideo5");

function pauseVid5() {
  vid5.pause();
};
var vid6 = document.getElementById("PlayVideo6");

function pauseVid6() {
   vid6.pause();
};