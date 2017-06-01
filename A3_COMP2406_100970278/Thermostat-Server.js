
// import modules

var https = require('https');
var http = require('http');
var fs = require('fs');
var url = require('url');

// Declare variables

var roomTemp = 18; // Set the default room temperature to 18
var desiredTemp = 22; // Set the initial target temperature

var furnaceState = 0;
var weather = {
	main: "",
	description: "",
	temp: 0,
	humidity: 0
}

var ROOT_DIR = "html"; // Directory to hold all public files

var options = {
	key: fs.readFileSync('certificates/ServerKey.pem'),
	cert: fs.readFileSync('certificates/ServerCert.crt'),
}


https.createServer( options, function(req, res) {
	var urlObj = url.parse(req.url, true, false);

	if ( req.method == 'GET' ) {
		console.log('\n============================');
		console.log("PATHNAME: " + urlObj.pathname);
		console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
		console.log("METHOD: " + req.method);
		var filePath = ROOT_DIR + urlObj.pathname;
		if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';

		fs.readFile(filePath, function(err,data){
			if(err){
				//report error to console
				console.log('ERROR: ' + JSON.stringify(err));
				//respond with not found 404 to client
				res.writeHead(404);
				res.end(JSON.stringify(err));
				return;
			}
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data);
		});
	}
	else {

		var jsonData = '';

		req.on('data', function(chunk) {
			jsonData += chunk;
		});

		req.on('end', function(){
			var reqObj = JSON.parse(jsonData);
			// console.log('reqObj: ', reqObj);
			//console.log('jsonData: ', jsonData );
			// console.log('typeof jsonData: ', typeof jsonData );

			if ( reqObj.reqType == "fetchUpdate" ) {
				// Web browser fetching update of room information
				resObj = { 
					"roomTemp": roomTemp,
					"desiredTemp": desiredTemp,
					"furnaceState": furnaceState
				}
				res.writeHead(200);
				res.end(JSON.stringify(resObj));
			}
			else if ( reqObj.reqType == "update" ) {
				// updates temperature of the room

				console.log( "room temperature: " + roomTemp + " furnace state: " + furnaceState );

				roomTemp = reqObj.roomTemp;
				furnaceState = reqObj.furnaceStatus;

				var resObj = { 'desiredTemp' : desiredTemp };
				res.writeHead(200);
				res.end(JSON.stringify(resObj));
			}
			else if ( reqObj.reqType == "updateTargetTemperature" ) {
				// Updates the target temperature as set by the user
				desiredTemp = reqObj.newTemp;
				res.writeHead(200);
				res.end(JSON.stringify(resObj));
			}
			else if ( reqObj.reqType == "updateWeather" ) {
				// Gets the weather information from the API
				getWeather("Ottawa", res);
			}
	     });

	}


} ).listen(3000);

// Taken from Notes 13

function parseWeather(weatherResponse, res) {
	// Parse the data received from the API call and send the data back to the client to be parsed
  var weatherData = '';
  weatherResponse.on('data', function (chunk) {
    weatherData += chunk;
  });
  weatherResponse.on('end', function () {
    res.writeHead(200);
    res.end(weatherData);
  });
}

function getWeather(city, res){
	// Make the request to the openweather api

  var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?q=' + city + 
	'&appid=f45b6d23576028c0609371dd5060e010'
  };
  http.request(options, function(weatherResponse){
    parseWeather(weatherResponse, res);
  }).end();
}

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');