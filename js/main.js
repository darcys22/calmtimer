function ChangeTime(periods) {
  console.log(periods);
  window.periods = periods;
  start();
}

function start() {
  clearInterval(window.x);
  fadeInAudio()
  var timerElement = document.getElementById("timer");
  if (window.periods < 1) {
    timerElement.innerHTML = "&#8734;";
  } else {
    var countDown = moment().add(window.periods, 'minutes').add(5, 'seconds');
    //var countDown = moment().add(5, 'seconds');
    window.x = setInterval(function() {
      var distance = countDown.diff(moment());
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

      if (distance < 0) {
        clearInterval(window.x);
        window.gong.play();
        fadeAudio();
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");

        timerElement.innerHTML = "&#9786;";
      }


    }, 1000);
  }
  
}

function fadeInAudio () {
    var sound = window.water;
    if (window.water.paused)  window.water.play();

    var fadeAudio = setInterval(function () {

        if (sound.volume <= 0.9) {
            sound.volume += 0.1;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume > 0.9) {
            clearInterval(fadeAudio);
            sound.volume = 1;
        }
    }, 200);

}

function fadeAudio () {
    var sound = window.water;

    var fadeAudio = setInterval(function () {

        if (sound.volume >= 0.05) {
            sound.volume -= 0.05;
        }
        // When volume at zero stop all the intervalling
        if (sound.volume < 0.05) {
            clearInterval(fadeAudio);
            sound.pause();
        }
    }, 500);

}


function main() {

  window.water = new Audio('media/water.mp3');
  window.water.loop = true;
  fadeInAudio()
  window.gong = new Audio('media/gong.mp3');
  window.gong.loop = false;

	var btnContainer = document.getElementById("selectPeriod");
	var btns = btnContainer.getElementsByClassName("btn");
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function() {
			var current = document.getElementsByClassName("active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
			this.className += " active";
      clearInterval(window.x);
			start();
		});
	} 

  window.periods = 0;
  start();
}
main();
