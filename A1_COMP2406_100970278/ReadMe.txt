README

Assignment 1: 2406A

	OS Used for development: Windows 10, and also tested on Windows 8.

	Browser Used for Development: Chrome, tested on Firefox as well.

	View pages at http://localhost:3000/Assignement1.html


Notes:
	
	-Save button doesn't work. So I think that means no marks for R1.4 and R3.3. Possibly more but from the list I'm not sure which other requirememnts that affects.

	-There is a modules folder with Colour in it, I had it in there for a while during testing when I was simply printing to my console. If you like, you can remove it 
	 if it interferes with R1.1 (no external modules) but it isnt actually used so I don't think it matters.

	-I give credit to Prof Nel a few times throughout the code; note that it is not formal citation, just pointing out the chunks of code that were mostly taken from his
	 demo code and tutorials.

	-The server console shows the population of the word array. I was using this while trying to get save to work. Not for anything relative to marks so feel free to ignore it.

INSTRUCTIONS

How to START the server:

	>>Go to whatever directory you have put my main folder in, then enter that folder.

	>>An ls command should list the following:


	   		 Directory: C:\A1_2406_100970278


		Mode                LastWriteTime         Length Name
		----                -------------         ------ ----
		d-----       2015-10-06   7:56 PM                html
		d-----       2015-10-06   7:56 PM                node_modules
		d-----       2015-10-06   7:56 PM                songs
		-a----       2015-10-06   7:51 PM          16464 A1_RunMe.js


	>>Run the A1_RunMe.js file using node, example:	"yourDirectory\A1_2406_100979278> node A1_RunMe"

	>>The message "Server Running at http://127.0.0.1:3000  CNTL-C to quit" will (hopefully/most likely) come up verifying the server is online. 

	>>The server is now running.

How to VIEW the server:

	>>The URL for this server uses the localhost with index "Assignement1.html"

	>>Type or copy "http://localhost:3000/Assignement1.html" into the URL bar and enter.

	>>If the server is running, this should take you to the start screen of my web application, and should display some information about me as well as instructions.

How to USE the server:

	>>Type the name of the songs "Sister Golden Hair", "Peaceful Easy Feeling", or "Brown Eyed Girl" into the search bar below the canvas, and click search.
	
	>>Click and drag words around however you like.

	>>Could not get the save button functionality working, so I just took out the code I was trying to implement for that. I have however, left the button in case the 
	  button itself was worth marks. (the R.3.3 said there should be a button for it. Wasn't sure if this meant part marks for a button or not. Worth a try.)

	>>At any time, to request a new file, type its name into the search bar and click the search button to its right.

	>>If the song is not found, the client will continue to display current data, and the server will respond with Not Found: 'StringThatWasntFound'


