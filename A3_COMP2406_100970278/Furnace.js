//Furnace.js

//Require the following for this program
var https = require('https');
var fs = require('fs');

//Declare variables
var furnaceState = 1;    	// 1 for on
var prevFurnaceState = furnaceState;
var desiredTemp = 25;	//what we want the temp to be
var roomTemp = 18;		//room temp start at 18
var furnaceDelay = 2; 	//delay to simulate real furnace start up

//Options and securities
var options = {
	hostname: 'localhost',
	port: '3000',
	path: '/',
	method: 'POST',
	
	//add the key and certificate------------------------
	key: fs.readFileSync('certificates/ClientKey.pem'),
	cert: fs.readFileSync('certificates/ClientCert.crt'),


	rejectUnauthorized: false
}

//Notify server console that server is now running.
console.log('Furnace: On');


function readJSONResponse(response){
		
	var responseData = '';//default
	
	//collect data
	response.on('data', function(chunk){
		responseData += chunk
	});
	
	//get the data
	response.on('end', function(){
        var dataObj = JSON.parse(responseData);
        desiredTemp = Number(dataObj.desiredTemp);
        
        //default desired temp will be reset if user doesnt override
        if(isNaN(desiredTemp)||desiredTemp==undefined)
            desiredTemp = 25;//default desired temp
        else
			//if they did enter a temp, send it and store it
            desiredTemp = Number(dataObj.desiredTemp);
    });
}
      

//get and update data every set interval of the server
setInterval(function(){
    //json gets and parses data
	
	//UPDATE:----Check currentTemp vs desiredTemp----    
	
	if(roomTemp >= desiredTemp){
		//off, temperature is atlease desiredTemp 
		furnaceState = 0;
	}
	if(roomTemp <= desiredTemp - furnaceDelay){
		//on, temperature is under the desiredTemp
		furnaceState = 1;
	}
	//------------------------------------------------
	
	//UPDATE:----Heat up(State:1)/Cool down(State:2)--
	
	if(furnaceState == 1)/*     if furnace is on*/{
		//temperature increases every server interval
		roomTemp++;		 
	}	
	else if(furnaceState == 0)/*if furnace is off*/{
		//temperature decreases every server interval
		roomTemp--;			 
	}
	//--------------------------------------------------

	//UPDATE:----furnaceState status update---	(only if the status has changed since prev loop)
	if(furnaceState != prevFurnaceState){
		//if the furnaceState == 1, is on, then print on
		if(furnaceState == 1){console.log('Furnace: On');}
		
		//if the furnace isn't on, is off, then print off
		else{console.log('Furnace: Off');}
		
		//for next check, update the NEW previous status to the value of current status
		prevFurnaceState = furnaceState;
	}

    //Send the updated furnace status and room temperature to the thermostat
	var req = https.request(options, readJSONResponse);
	var data = {
		'reqType' : 'update',
		'furnaceStatus' : furnaceState,//furnace on/off, 1/0, information
		'roomTemp' : roomTemp		   //current room temperature
    };
	req.write(JSON.stringify(data));
	req.end();

}, 2000);//interval for server to loop these operations