// ferndale coords 42.4658949,-83.1523027

var darkskyUrl = "https://api.darksky.net/forecast/3e34eea67e6972bd78ff2a07af4c248f/42.4658949,-83.1523027?exclude=minutely"

call();
var interval = window.setInterval(call, 600000);


function call() {

	$.ajax({
	  url: darkskyUrl,
	  dataType: 'jsonp',
	  type: 'GET',
	  success: function(data) {

	  	var temp = Math.floor(data.currently.temperature);
	  	var high = Math.floor(data.daily.data[0].temperatureMax)
	  	var low = Math.floor(data.daily.data[0].temperatureMin)
	  	var tomorrowHigh = Math.floor(data.daily.data[1].temperatureMax)
	  	var tomorrowLow = Math.floor(data.daily.data[1].temperatureMin)

	  	var sunrise = new Date(data.daily.data[0].sunriseTime * 1000);
	  	sunrise = sunrise.getHours() + ":" + sunrise.getMinutes() + " am";

	  	var sunset = new Date(data.daily.data[0].sunsetTime * 1000);
	  	sunset = ((sunset.getHours() + 11) % 12 + 1) + ":" + sunset.getMinutes() + " pm";
	  	

	  	var weather_icon = data.currently.icon;
	  	document.getElementById("temp").innerHTML = temp + '&deg;';
	  	document.getElementById("highLow").innerHTML = 'High: ' + high + '&deg; / ' + 'Low: ' + low + '&deg;';
	  	document.getElementById("tomorrow").innerHTML = 'High: ' + tomorrowHigh + '&deg; / ' + 'Low: ' + tomorrowLow + '&deg;';
	  	
	  	document.getElementById("riseSet").innerHTML = sunrise + ' <i class="wi wi-horizon"></i> ' + sunset;


	  	var canvas = document.createElement("canvas");
	  	canvas.height = 128;
	  	canvas.width = 128;
	  	canvas.style = "vertical-align: bottom; padding-right: 0.5em;";
	  	canvas.id = "icon"	
	  	document.getElementById("temp").insertBefore(canvas, document.getElementById("temp").firstChild);
	  	var skycons = new Skycons({"color": "white"});
	  	skycons.add("icon", weather_icon);
	  	skycons.play();


	  	var moonPhase = data.daily.data[0].moonPhase;

	  	console.log(moonPhase)
	  	var moonClass;
		var moonDesc;


	  	if (moonPhase <= 0.1249) {
	  		moonClass = "wi-moon-new";
	  		moonDesc = "New Moon";
	  	} else if (0.1250 <= moonPhase <= .2499) {
	  		moonClass = "wi-moon-waxing-crescent-5";
	  		moonDesc = "Waxing Crescent";
	  	} else if (0.25 <= moonPhase <= .3749) {
	  		moonClass = "wi-moon-first-quarter";
	  		moonDesc = "First Quarter Moon";
	  	} else if (0.375 <= moonPhase <= .4999) {
	  		moonClass = "wi-moon-waxing-gibbous-5";
	  		moonDesc = "Waxing Gibbous";
	  	} else if (.5 <= moonPhase <= .6249) {
	  		moonClass = "wi-moon-full";
	  		moonDesc = "Full Moon";
	  	} else if (.625 <= moonPhase <= .7499) {
	  		moonClass = "wi-moon-waning-gibbous-5";
	  		moonDesc = "Waning Gibbous";
	  	} else if (.75 <= moonPhase <= .8749) {
	  		moonClass = "wi-moon-third-quarter";	
	  		moonDesc = "Third Quarter Moon";
	  	} else if (.875 <= moonPhase <= 1) {
	  		moonClass = "wi-moon-waning-crescent-5";
	  		moonDesc = "Waning Crescent";
	  	}

	  	function checkVariable() {

	  	   if (moonDesc != undefined) {
	  	       document.getElementById("moon-desc").innerHTML = moonDesc;
	  	       
	  	    	var moonElement = document.getElementById("moon-icon");
	  	       
				document.getElementById("moon-icon").removeAttribute("class")
				moonElement.classList.add("wi")
	  	    	moonElement.classList.add(moonClass);

	  	   }
	  	 }

	  	 setTimeout(checkVariable, 1000);
	  	
	  	}
	});
}

