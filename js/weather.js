call();
var interval = window.setInterval(call, 10000);


function call() {
	var reddit_api = 'https://www.reddit.com/r/news/hot.json?limit=5'
	var y_api = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='ferndale, mi')&format=json"
	var random_number = Math.floor(Math.random() * (5 - 1 + 1)) + 1;

			       $.ajax({
			         url: y_api,
			         dataType: 'json',
			         type: 'GET',

			         // place for handling successful response
			         success: function(data) {
			         	var city = data.query.results.channel.location.city;
						var state = data.query.results.channel.location.region;
						var temp = data.query.results.channel.item.condition.temp;
						var sunrise = data.query.results.channel.astronomy.sunrise;
						var sunset = data.query.results.channel.astronomy.sunset;
						var high = data.query.results.channel.item.forecast[0].high;
						var low = data.query.results.channel.item.forecast[0].low;
						var weather_code = data.query.results.channel.item.forecast[0].code;
						var weather_icon = '';

						switch(parseInt(weather_code)) {
							// Tornado
							case 0:
							case 2:  
								weather_icon = '<i class="wi wi-tornado"></i>';
								break;

							// Storm
							case 1:
							case 3:
							case 4:
							case 37:
							case 38:
							case 39:
							case 40:
							case 45:
							case 47: 
								weather_icon = '<i class="wi wi-storm-showers"></i>';
								break;	

							// Snow
							case 5:
							case 6:
							case 7:
							case 13:
							case 14:
							case 15:
							case 16:
							case 18:
							case 19:
							case 25:
							case 41:
							case 42:
							case 43:
							case 46:
								weather_icon = '<i class="wi wi-snow"></i>';
								break;	

							// Rain
							case 8:
							case 9:
							case 10:
							case 11:
							case 12:
							case 17:
							case 35:
								weather_icon = '<i class="wi wi-sprinkle"></i>';
								break;

							// fog
							case 20:
							case 21:
							case 22:
								weather_icon = '<i class="wi wi-fog"></i>';
								break;

							// wind
							case 23:
							case 24:
								weather_icon = '<i class="wi wi-strong-wind"></i>';
								break;

							// cloudy
							case 26:
							case 27:
							case 28:
							case 29:
							case 30:
							case 44:
								weather_icon = '<i class="wi wi-cloudy"></i>';
								break;
								
							// Night clear
							case 31:
							case 33:
								weather_icon = '<i class="wi wi-night-clear"></i>';
								break;

							// sunny
							case 32:
							case 34:
							case 36: 
								weather_icon = '<i class="wi wi-day-sunny"></i>';
								break;

							case 3200:
								weather_icon = '<i class="wi wi-meteor"></i>';
								break;

							default:
								weather_icon = '<i class="wi wi-meteor"></i>';
								break;
								
						}


						document.getElementById("temp").innerHTML = weather_icon + ' '.concat(temp + '&deg;');
						document.getElementById("highLow").innerHTML = 'High: '.concat(high + '&deg; / ') + 'Low: '.concat(low + '&deg;') 
						document.getElementById("riseSet").innerHTML = sunrise + ' <i class="wi wi-horizon"></i> ' + sunset;
						
						// document.getElementById("riseSet").innerHTML = sunrise + ' <i class="wi wi-horizon"></i> ' + sunset;
						// document.getElementById("reddit").innerHTML = headline;
						// document.getElementById("refresh").innerHTML = 'Refreshed: ' + Date();
			         },

			         // handling error response
			         error: function(data) {
			           error.log(data);
			         }
			     });

					$.ajax({
						url: reddit_api,
						dataType: 'json',
						type: 'GET',

						success: function(data) {
							var r_data = data.data;
							console.log(r_data.children[random_number].data.title)

							var headline = r_data.children[random_number].data.title
							// console.log(data.data.children[1].data.title)
							document.getElementById("reddit").innerHTML = headline;
						},

						error: function(data) {
						  console.log('error');
						}

					});


}