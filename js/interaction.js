// Various variables
var videoHalfWay = 0;
var formattedHalfway = 0;

// Choice parts
var choicePart = 7;
var goodChoicePart = 7;
var badChoicePart = 20;
var goodChoiceChosen = false;

// Question variable
var question1Asked = false;

var video1;


$(document).ready(function(){

	$.featherlight.defaults.afterClose = playPauseVideo;

	video1 = $('#video1');
	
	$(".box1").on("click", function(){
		playPauseVideo('.persona1PopUp');
	});

	$(".box2").on("click", function(){
		playPauseVideo('.persona2PopUp')
	});

	$('.goodChoice').on('click', function(){
		goodChoiceChosen = true;
		$.featherlight.close();
		video1[0].currentTime = goodChoicePart;
		
	});

	$('.badChoice').on('click', function(){
		$.featherlight.close();
		video1[0].currentTime = badChoicePart;
	});

	$(video1).on('loadeddata', function(){
		videoHalfWay = Math.round(this.duration/2);
	});

	$(video1).on('timeupdate', function(){
		var currentTime = Math.round(this.currentTime);
		var durationNum = Math.round(this.duration);
		var formattedCurentTime = secondsToHms(currentTime);
		var formattedDurationTime = secondsToHms(durationNum);
		onTrackedVideoFrame(formattedCurentTime, formattedDurationTime);
	
		if (currentTime == choicePart && question1Asked == false){
			question1Asked = true;
			video1[0].pause();
			$.featherlight($('.popUpQuestion1'));
		}

		if (currentTime == badChoicePart && goodChoiceChosen == true){
			video1[0].pause();
		}

		if (currentTime == videoHalfWay){
			// HalfWay point
		}

		if(currentTime == durationNum){
			// Video complete
		}
	})

});

function onTrackedVideoFrame(curretTime, duration){
	$('.duration').text(duration);
	$('.current').text(curretTime);

}


function playPauseVideo(popUp){
	if(video1[0].paused){
		video1[0].play();
	} else {
		video1[0].pause();
		$.featherlight($(popUp));
	}
}


/* DO NOT DELETE: Converting the time into minutes and seconds */
function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}