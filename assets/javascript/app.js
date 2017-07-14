$( document ).ready(function() {
	$("#start").click(function() {
	  $('.start-container').css('display','none');
	  $('.quiz').css('display','block');
	  stopwatch.start();
	});

	$("#done").click(function() {
	  stopwatch.stop();
	  stopwatch.gameOver();
	});
});

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

var stopwatch = {

  time: 45,

  start: function() {

    //Use setInterval to start the count.
    intervalId = setInterval(stopwatch.count, 1000);
  },
  stop: function() {

    //Use clearInterval to stop the count.
    clearInterval(intervalId);
  },

  count: function() {

    //increment time by 1, remember we cant use "this" here.
    stopwatch.time--;

    // Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // Use the variable we just created to show the converted time in the "display" div.
    $("#display").html(converted);

    if (stopwatch.time <= 0){ 
    	stopwatch.stop();
    	$("#display").html("00:00");
    	stopwatch.gameOver();
    	}
  },

  getScore: function() {
  	var selectedRadioValue = [];
  	var correct = 0;
  	var incorrect =0 ; 
  	var unanswered = 0;
  	var totalQuestions = 8;

    $("input:checked").each(function(){
        selectedRadioValue.push($(this).val());
    });
    console.log(selectedRadioValue); 

    unanswered = totalQuestions - selectedRadioValue.length

    for ( var i = 0; i < selectedRadioValue.length; i++){
    	if (selectedRadioValue[i]==="1"){
    		correct++;
    	} else {
    		incorrect++;
    	}
    }
    $("#correct").html(correct);
    $("#incorrect").html(incorrect);
    $("#unanswered").html(unanswered);
  },

  gameOver: function() {
  	 $('.quiz').css('display','none');
	 $('.game-over-container').css('display','block');
	 stopwatch.getScore();
  },
  timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};