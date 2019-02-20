//Theodore Kachulis #100970278

//View pages at http://localhost:3000/Assignement1.html
//Cntl+C to stop server (in Windows CMD console)

//Declare peacefulEasyFeeling array, later to be populated by the
//asynchronus loading of the file
var peacefulEasyFeeling = [];
	/*peacefulEasyFeeling.push({word: "I", x:50, y:50});
	peacefulEasyFeeling.push({word: "like", x:70, y:50});			READ:
	peacefulEasyFeeling.push({word: "the", x:120, y:50});
	peacefulEasyFeeling.push({word: "way", x:170, y:50});			for testing purposes, no longer needed but I left it in for testing
	peacefulEasyFeeling.push({word: "your", x:230, y:50});			the movement registration in the developper tools console in google chrome
	peacefulEasyFeeling.push({word: "sparkling", x:300, y:50});
	peacefulEasyFeeling.push({word: "earrings", x:430, y:50});
	peacefulEasyFeeling.push({word: "lay", x:540, y:50});*/

//Declare sisterGoldenHair array, later to be populated by the
//asynchronus loading of the file
var sisterGoldenHair = [];
	/*sisterGoldenHair.push({word: "Well", x:50, y:50});
	sisterGoldenHair.push({word: "I", x:110, y:50});
	sisterGoldenHair.push({word: "tried", x:130, y:50});			for testing purposes, no longer needed but I left it in for testing
	sisterGoldenHair.push({word: "to", x:190, y:50});				the movement registration in the developper tools console in google chrome
	sisterGoldenHair.push({word: "make", x:220, y:50});
	sisterGoldenHair.push({word: "it", x:290, y:50});
	sisterGoldenHair.push({word: "Sunday", x:320, y:50});*/

//Declare brownEyedGirl array, later to be populated by the
//asynchronus loading of the file
var brownEyedGirl = [];
	/*brownEyedGirl.push({word: "Hey", x:40, y:50});
	brownEyedGirl.push({word: "where", x:100, y:50});
	brownEyedGirl.push({word: "did", x:180, y:50});
	brownEyedGirl.push({word: "we", x:220, y:50});
	brownEyedGirl.push({word: "go", x:260, y:50});
	brownEyedGirl.push({word: "Days", x:40, y:100});				for testing purposes, no longer needed but I left it in for testing
	brownEyedGirl.push({word: "when", x:110, y:100});				the movement registration in the developper tools console in google chrome
	brownEyedGirl.push({word: "the", x:190, y:100});
	brownEyedGirl.push({word: "rains", x:240, y:100});
	brownEyedGirl.push({word: "came", x:320, y:100});*/

//Create array for chords to be put (when extracted from lines)
var chords = [];

//Searchable songs in database given string attribute so that it can be identified by the user
var songs = {"Peaceful Easy Feeling" : peacefulEasyFeeling,	
             "Sister Golden Hair" : sisterGoldenHair,
             "Brown Eyed Girl" : brownEyedGirl
			 };

//Declaring x and y USED FOR:position of lines 
var x = 40;//Position where lines will start in canvas display ---- Gets updated after (songs always start back at first placement)and during song printing (to move down line & new line)
var y = 20;//Position where lines will start in canvas display ---- Gets updated after (songs always start back at first placement)and during song printing (to move down line & new line)

//Declaring variables for string pixel sizing, used for deciding space between strings etc
var size = 0;//Pixel Size var for word spacing in the whole line
var tempSize = 0;//Size of current word to be added to the space before next word

//Declare these two as strings 
var word = "";//Declare word a string for cu
var tempWord = "";//Declare tempWord a string  

//Declare these booleans
var onWord = true;//T/F when pixels check position compared to word pixels ----- If yes then update for move
var firstWord = true;//If first word in line then true, for spacing

//Server Code
var http = require('http'); //force http
var fs = require('fs');     //to read static files
var url = require('url');   //used to parse in url for indexes or html locations etc

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//-------------------------------------------------------------------------------------------------------------//
//-------------------------------Song Loading Below------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------//
//----Load Song Files (Asynch) For Songs and Create Chord Arrays-----------------------------------------------//
//-------------------------------------------------------------------------------------------------------------//
//----Songs to be loaded:--------------------------------------------------------------------------------------//
//------+sister_golden_hair.txt--------------------------------------------------------------------------------//
//------+peaceful_easy_feeling.txt-----------------------------------------------------------------------------//
//------+brown_eyed_girl.txt-----------------------------------------------------------------------------------//
//-------------------------------------------------------------------------------------------------------------//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Read SISTER GOLDEN HAIR documentation, it is the SAME PROCESS for the other two song loads, so I am not 
going to document it twice. Sister Golden Hair's documentation should explain the other 2 song loads perfectly.*/

//----------------------------------------Sister Golden Hair---------------------------------------------------//

//code from tutorial 3 mostly ---- fs.readFile from var fs = require fs, for reading files
var file = fs.readFile('songs/sister_golden_hair.txt', function(err, data) {
  
  //RESET X/y from previous file load
  //Without this every time a song is loaded onto the web page it will be pushed down from last songs spacing
  y = 40;
  x = 20;	

	//Throws err and io errors, from code in tut 3 (the POST JSONData one)
	if(err) throw err;
	var array = data.toString().split("\n");
	
	//Iterate through array and splice at spaces and new lines 
	for(var i in array) {
	var temp = array[i].split("");
		for(var character in temp){
			//(Dont need to read if you're marking this, personal note)../r = new line char so when reading it will see this when needs to skip line
			
			//Checks if the current character it's viewing is a space or new line, if it is, then... V
			if(temp[character] === " "|| temp[character] == "\r"){
				
				//Checks if it is first word.. will always be true for the first time around then gets set to false immediately, until it is updated again
				if(firstWord){
					firstWord = false;//Immediately sets itself false as to not call this again until updated
					sisterGoldenHair.push({word: word,x:20, y:y,isChord:false});//push word into sisterGoldenHair with x/y vals, verify not chord 
					//clears word
					word = " ";
					size = 0;
				}
				//If not first word (usually not) then add word
				else{
					sisterGoldenHair.push({word: word,x:x-size*11, y:y,isChord:false});//verify not chord and push to sisterGoldenHair, with x and y vals updated after iteration
					//clears word
					word = " ";
					size = 0;
				}
			}
			
			// the ] indicates it is at the END of the chord, so it takes the chord that it has built and pushes it to y-20, which is verticaly adjacent by 20p to the words line
			else if(temp[character] === "]"){
				sisterGoldenHair.push({word: word,x:x, y:y-20,isChord:true});//is chord, adjust x so that it is above lyric, push the chord to sisterGoldenHair
				onWord = true; //back to words, end of chord
				x -= size;
				word = tempWord; //gets back the word it was handling before the chord , previously set to temp below
				size = tempSize; //gets back the size for same reasons as word
			}
			
			// the [ indicates BEGINNING of a chord so it starts building the chord until it reads ]...  above^^
			else if(temp[character] === "["){
			  onWord = false; //building a chord now
			  tempWord = word; //to hold until done building the chord, reset at ]
			  word = "";
			  tempSize = size; //to hold until done building the chord, reset at ]
			}
			
			//If it isnt a special character like [,]," ", /r ... then...
			else{
			  word += temp[character]; //adds the current character to the current word
			}
			
			//if this is true then..
			if(onWord){
			  x += 11;//shift the current string over so that it does not hit it 
			}
			size++;//upd8 size 
		  }
		  
		  //after a line is completed-----------------------------------------------------------------//
		  y += 40;	//y gets updated to move down 1 (2 lines actually, because space for chords) line
		  x = 20;		//resets x to the beginning of the line 
		  word = "";//blank/fresh word 
		  firstWord = true;//resets first word so that when looping it will enter that statement above
		  size = 0;//resets size, for fresh line------------------------------------------------------//
		}
		}
		);	 		 
			 
//----------------------------------------Brown Eyed Girl----------------------------------------------//
//-----------------------FOR DOCUMENTATION ON THIS CODE,REFER TO LINE 86 ------------------------------//
//-----------------------------------------------------------------------------------------------------//
var file = fs.readFile('songs/brown_eyed_girl.txt', function(err, data) {

  y = 40;
  x = 20;
  
  if(err) throw err;
  var array = data.toString().split("\n");
  for(var i in array) {
  var temp = array[i].split("");

  for(var character in temp){
    if(temp[character] === " "|| temp[character] == "\r"){
		if(firstWord){
			firstWord=false;
			brownEyedGirl.push({word: word,x:20, y:y,isChord:false});
			word = " ";
			size = 0;
        }
		else{
			brownEyedGirl.push({word: word,x:x-size*11, y:y,isChord:false});
			word = " ";
			size = 0;
        }
    }
    else if(temp[character] === "]"){
		brownEyedGirl.push({word: word,x:x, y:y-20,isChord:true});
		onWord = true;
		x -= size;
		word = tempWord;
		size = tempSize;
	}
    else if(temp[character] === "["){
      onWord = false;
      tempWord = word;
      word = "";
      tempSize = size;
    }
    else{
      word +=temp [character];
    }
		if(onWord){
			x += 11;
		}
	size++;
	}
y += 40;
x = 20;
word = "";
firstWord = true;
size = 0;
}
}
);	 


//-------------------------------------Peaceful Easy Feeling-------------------------------------------//
//-----------------------FOR DOCUMENTATION ON THIS CODE,REFER TO LINE 86 ------------------------------//
//-----------------------------------------------------------------------------------------------------//
var file = fs.readFile('songs/peaceful_easy_feeling.txt', function(err, data) {

  y = 40;
  x = 20;
  
  if(err) throw err;
  var array = data.toString().split("\n");
  for(var i in array) {
  var temp = array[i].split("");

  for(var character in temp){
    if(temp[character] === " "|| temp[character] == "\r"){
		if(firstWord){
			firstWord=false;
			peacefulEasyFeeling.push({word: word,x:20, y:y,isChord:false});
			word = " ";
			size = 0;
        }
		else{
			peacefulEasyFeeling.push({word: word,x:x-size*11, y:y,isChord:false});
			word = " ";
			size = 0;
        }
    }
    else if(temp[character] === "]"){
		peacefulEasyFeeling.push({word: word,x:x, y:y-20,isChord:true});
		onWord = true;
		x -= size;
		word = tempWord;
		size = tempSize;
	}
    else if(temp[character] === "["){
      onWord = false;
      tempWord = word;
      word = "";
      tempSize = size;
    }
    else{
      word +=temp [character];
    }
		if(onWord){
			x += 11;
		}
	size++;
	}
y += 40;
x = 20;
word = "";
firstWord = true;
size = 0;
}
}
);	
		////////////////////////////////////////////////////////////////////////////////////////////////////
		//-------------Now Done With Song Loading Functions, the rest is mostly---------------------------//
		//-------------server code taken from tutorial 3. Most will still be   ---------------------------//
		//-------------documented anyways. Credit to Lou dNel for some server  ---------------------------//
		//-------------code etc.--------------------------------------------------------------------------//		 
		////////////////////////////////////////////////////////////////////////////////////////////////////

		                                                                                                
//-----------------------------------------------------------------------------------------------------------------//


var counter = 1000; //to count invocations of function(req,res)
var ROOT_DIR = 'html'; //dir to serve static files from

//Defining types and interchangeable ext's to use
var MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript', 
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/text'
};

//Finds extension from file when filename is submit
var get_mime = function(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

//Open Server
http.createServer(function (request,response){
     var urlObj = url.parse(request.url, true, false);
     console.log('\n============================');
	 console.log("PATHNAME: " + urlObj.pathname);
     console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
     console.log("METHOD: " + request.method);
	 
     var receivedData = '';

     //attached event handlers to collect the message data
     request.on('data', function(chunk) {
        receivedData += chunk;
     });
	 
	 //event handler for the end of the message
     request.on('end', function(){
        console.log('received data: ', receivedData);
        console.log('type: ', typeof receivedData);
		
		//if it is a POST request then echo back
		if(request.method == "POST"){
		   var dataObj = JSON.parse(receivedData);
           console.log('received data object: ', dataObj);
           console.log('type: ', typeof dataObj);
		   
		   //logs users search in command line for server
		   console.log("USER SONG REQUEST: " + dataObj.text );

		   //Song searched gets printed if it's found
		   if(dataObj.text in songs){ 
			   var returnObj = {};
			   returnObj.wordArray = songs[dataObj.text];
			   //returnObj.text = 'Found';	//Not really needed since the floating thing isnt there anymore
		   }
	   	   
		   //If file doesn't exist
		   else{
			   var returnObj = {};
			   returnObj.text = "Not Found : " + dataObj.text;
		   }
		   console.log(returnObj);
		   //object to return to client
          response.writeHead(200, {'Content-Type': MIME_TYPES["text"]});  //does not work with application/json MIME
           response.end(JSON.stringify(returnObj)); //send just the JSON object
		}
     });
	 
     //Most of the code below here is from the POST_JSONData file that prof Lou supplied us with in Tut3. Credits to Prof Lou dNel--//
	 //I'll try to document it with my best undestanding of what's occuring---------------------------------------------------------//
	 
     if(request.method == "GET"){
	 //handle GET requests as static file requests
	 var filePath = ROOT_DIR + urlObj.pathname;
	 if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';
	 
	 //handles errors with pathnames, tells server console the problem
     fs.readFile(filePath, function(err,data){
       if(err){
		  //report error to console
          console.log('ERROR: ' + JSON.stringify(err));
		  //respond with not found 404 to client
          response.writeHead(404);
          response.end(JSON.stringify(err));
          return;
         }
		 //respond to server
         response.writeHead(200, {'Content-Type': get_mime(filePath)});
         response.end(data);
       });
	 }
 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');