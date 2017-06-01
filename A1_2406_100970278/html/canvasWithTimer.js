////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*Most of this cavasWithTImer.js was taken from provided code in tutorial 3, and on Dr Lou Nels website.
Below is his description of some jquery and event handler syntax, I'll leave that in. Credits to Dr Lou Nel. 

JQuery syntax:

$(selector).action();
e.g.
$(this).hide() - hides the current element.
$("p").hide() - hides all <p> elements.
$(".test").hide() - hides all elements with class="test".
$("#test").hide() - hides the element with id="test".

Mouse event handlers are being added and removed using jQuery and
a jQuery event object is being passed to the handlers

Keyboard keyDown handler is being used to move a "moving box" around
Keyboard keyUP handler is used to trigger communication with the 
server via POST message sending JSON data
*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Use javascript array of objects to print an initial screen on the webpage
//Gives used information as well as a prompt.
var words = [];
words.push({word: "Insert the name of a song below into the search bar, and click search.", x:100, y:50});
words.push({word: "If the song is found, it will appear!", x:100, y:150});
words.push({word: "Theo Kachulis S#100970278, 2406A2", x:100, y:250});
		 
					
var timer;
var wordBeingMoved;

var deltaX, deltaY; //location where mouse is pressed
var canvas = document.getElementById('canvas1'); //our drawing canvas

function getWordAtLocation(aCanvasX, aCanvasY){
     //We need canvas to use the measureText method	 
	 var context = canvas.getContext('2d');//gets pixel len

	  for(var i=0; i<words.length; i++){
		  //The mouse location is subtracted from the middle of the text X location using the starting point of the word (words[i].x) and adding half the width of the word
		  //(context.measureText(words[i].word).width/2)) Then see if the mouse location is within the width of the word using ( < context.measureText(words[i].word).width/2))
		 if(Math.abs((words[i].x+context.measureText(words[i].word).width/2) - aCanvasX) <  context.measureText(words[i].word).width/2 && 
		    Math.abs(words[i].y - aCanvasY) < 20) return words[i];
	  }
	  return null;
    }

//draw canvas
var drawCanvas = function(){

    var context = canvas.getContext('2d');
	
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width,canvas.height); //erase canvas
   
    //choose font and colors
    context.font = '15pt Arial';
    context.fillStyle = 'black';
    context.strokeStyle = 'black';

	//loop through my stuff
    for(var i=0; i<words.length; i++){  //note i declared as var
		    
			var data = words[i];
			context.fillText(data.word, data.x, data.y);
            context.strokeText(data.word, data.x, data.y);
		
	}
    context.stroke();
}

function handleMouseDown(e){
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left; //use jQuery event object pageX and pageY
    var canvasY = e.pageY - rect.top;
	console.log("mouse down:" + canvasX + ", " + canvasY);
	
	wordBeingMoved = getWordAtLocation(canvasX, canvasY);
	//console.log(wordBeingMoved.word);
	if(wordBeingMoved != null ){
	   deltaX = wordBeingMoved.x - canvasX; 
	   deltaY = wordBeingMoved.y - canvasY;
	   //document.addEventListener("mousemove", handleMouseMove, true);
       //document.addEventListener("mouseup", handleMouseUp, true);
	$("#canvas1").mousemove(handleMouseMove);
	$("#canvas1").mouseup(handleMouseUp);
	   
	}

    // Stop propagation of the event and stop any default 
    //  browser action

    e.stopPropagation();
    e.preventDefault();
	
	drawCanvas();
	}
	
function handleMouseMove(e){
	
	console.log("mouse move");
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left;
    var canvasY = e.pageY - rect.top;
	
	wordBeingMoved.x = canvasX + deltaX;
	wordBeingMoved.y = canvasY + deltaY;
	
	e.stopPropagation();
	
	drawCanvas();
	}
	
function handleMouseUp(e){
	console.log("mouse up");
  		
	e.stopPropagation();
	
    //$("#canvas1").off(); //remove all event handlers from canvas
    //$("#canvas1").mousedown(handleMouseDown); //add mouse down handler

	//remove mouse move and mouse up handlers but leave mouse down handler
    $("#canvas1").off("mousemove", handleMouseMove); //remove mouse move handler
    $("#canvas1").off("mouseup", handleMouseUp); //remove mouse up handler
		
	drawCanvas(); //redraw the canvas
	}
	
//JQuery Ready function -called when HTML has been parsed and DOM
//created
//can also be just $(function(){...});
//much JQuery code will go in here because the DOM will have been loaded by the time
//this runs

function handleTimer(){

	drawCanvas()
}

    //KEY CODES
	//should clean up these hard coded key codes
	var ENTER = 13;
	var RIGHT_ARROW = 39;
	var LEFT_ARROW = 37;
	var UP_ARROW = 38;
	var DOWN_ARROW = 40;


function handleKeyDown(e){
	
	//console.log("keydown code = " + e.which );//Displays key pressed
		
	var dXY = 5; //amount to move in both X and Y direction
	if(e.which == UP_ARROW && movingBox.y >= dXY) 
	   movingBox.y -= dXY;  //up arrow
	if(e.which == RIGHT_ARROW && movingBox.x + movingBox.width + dXY <= canvas.width) 
	   movingBox.x += dXY;  //right arrow
	if(e.which == LEFT_ARROW && movingBox.x >= dXY) 
	   movingBox.x -= dXY;  //left arrow
	if(e.which == DOWN_ARROW && movingBox.y + movingBox.height + dXY <= canvas.height) 
	   movingBox.y += dXY;  //down arrow
	
    var keyCode = e.which;
    if(keyCode == UP_ARROW | keyCode == DOWN_ARROW){
       //prevent browser from using these with text input drop downs	
       e.stopPropagation();
       e.preventDefault();
	}

}

function handleKeyUp(e){
	//console.log("key UP: " + e.which);//Displays key unpressed
	if(e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW){
	var dataObj = {x: movingBox.x, y: movingBox.y}; 
	//create a JSON string representation of the data object
	var jsonString = JSON.stringify(dataObj);

	$.post("positionData", jsonString, function(data, status){
			console.log("data: " + data);
			console.log("typeof: " + typeof data);
			
			var wayPoint = JSON.parse(data);
			wayPoints.push(wayPoint);
			for(i in wayPoints) console.log(wayPoints[i]);
			});
	}
	
	if(e.which == ENTER){		  
	   handleSubmitButton(); //treat ENTER key like you would a submit
	   $('#userTextField').val(''); //clear the user text field
	}

	e.stopPropagation();
    e.preventDefault();
}

function handleSubmitButton () {
   
    var userText = $('#userTextField').val(); //get text from user text input field
	if(userText && userText != ''){
	   var userRequestObj = {text: userText};
       var userRequestJSON = JSON.stringify(userRequestObj);
	   $('#userTextField').val(''); //clear the user text field

       //alert ("You typed: " + userText);
	   $.post("userText", userRequestJSON, function(data, status){
			console.log("data: " + data);
			console.log("typeof: " + typeof data);
			var responseObj = JSON.parse(data);
			
			for(var i = 0; i < responseObj.wordArray.length; i++){
				console.log("data word array" +responseObj.wordArray[i]);
			}
			if(responseObj.wordArray) words = responseObj.wordArray;
			});
	}					
}
//-------------------------------------------------Update or Save Sonf file button event handler ------------------- TODO: Make it do something 
function updateSaveSongFile () {

}

//---------------------------------------------------------------------------------------------------------------------------------------------

$(document).ready(function(){

	//add mouse down listener to our canvas object
	$("#canvas1").mousedown(handleMouseDown);
	
	//add key handler for the document as a whole, not separate elements.	
	$(document).keydown(handleKeyDown);
	$(document).keyup(handleKeyUp);
		
	timer = setInterval(handleTimer, 100); 
    //timer.clearInterval(); //to stop
	
	drawCanvas();
});

