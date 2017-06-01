var currentTemp = 0;
var furnaceState = 0;
var targetTemp = 0;
var weather = {
	description: "",
	high: 0,
	low: 0,
	current: 0,
	humidity: 0
}

var postOptions = {
	url: "https://127.0.0.1:3000"
}


function getData() {
	var reqObject = {'reqType': 'fetchUpdate'}
	$.post(postOptions.url, JSON.stringify(reqObject), function(data){
		//console.log(data);
		var receivedObj = JSON.parse(data);
		console.log(receivedObj);

		if ( targetTemp == 0 ) $("#desired-temp").val(receivedObj.roomTemp);

		//update variables and on screen stuff

		currentTemp = receivedObj.roomTemp;
		$("#current-temp").text(currentTemp);

		furnaceState = receivedObj.furnaceState;
		$("#furnace-status").text(furnaceState == 0 ? "Off" : "On");

		targetTemp = receivedObj.desiredTemp;
		$("#target-temp").text(targetTemp);

	});
}

function updateTargetTemperature() {
	var newTemp = $("#desired-temp")[0].value;

	var reqObject = { 'reqType': 'updateTargetTemperature', 'newTemp': newTemp }

	// Send the new desired room temperature to the server
	$.post(postOptions.url, JSON.stringify(reqObject), function(data){
		//console.log(data);
	});

}

function updateWeather() {
	var reqObject = { 'reqType': 'updateWeather' };

	$.post(postOptions.url, JSON.stringify(reqObject), function(data){
		//console.log(data);
		var receivedObj = JSON.parse(data);
		console.log(receivedObj);

		//Update browser variables
		weather.description = receivedObj.weather[0].description;
		// All temperatures are sent in Kelvin, so must subtract 273.15 to convert to Celcius
		weather.high = Math.floor((receivedObj.main.temp_max - 273.15) * 100) / 100;
		weather.low = Math.floor((receivedObj.main.temp_min - 273.15) * 100) / 100;
		weather.current = Math.floor((receivedObj.main.temp - 273.15) * 100) / 100;
		weather.humidity = receivedObj.main.humidity;

		// Update the values on the screen
		$("#weather-description").text(weather.description);
		$("#weather-daily-high").text(weather.high);
		$("#weather-daily-low").text(weather.low);
		$("#weather-current-temperature").text(weather.current);
		$("#weather-humidity").text(weather.humidity + "%");
	});
}

function update() {
	// Function which loops to update all information on screen and locally
	getData();
	updateWeather();
}

update();

setInterval(update, 2000);