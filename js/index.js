// Camera Code


// Variables.

var object;
var objectTwo;
var countdownStorage;
var found;
var loop;
var loopTwo;
var loopThree;


var destinationType;
var input;
var file;


var imgURL;
var img;




window.onload = function() {
	console.log("window.onload");
	
	
	// Setting Arrays.
	object = [0];
	objectTwo = [0];
	countdownStorage = [0];

	
	// Fill the Arrays.
	for(draw = 0; draw < 999; draw+=1) {
		object.push(0);
		objectTwo.push(0);
		countdownStorage.push(0);
	}
	
	
	// Set up listeners.
	setUpPhotos();
	document.addEventListener("deviceready",setUp,false);
	
}


function setUpPhotos() {
	console.log("setUpPhotos");

	
	// Setup listener for change in image input element.
	input = document.querySelector('input[type=file]');
	
	
	// Call this function with the file name if the image was taken.
	input.onchange = function change() {
		console.log("------------------------------");
  		file = input.files[0];
		displayAsImage(file);
	};
	
}


function displayAsImage(file) {
	console.log("displayAsImage");
	
	
	// Create a HTML image.
  	imgURL = URL.createObjectURL(file);
  	img = document.createElement('img');

	
	// Set the img URL and fix the size of the image
  	img.src = imgURL;
  	img.width = 200;
  	img.height = 200;
  
  
  	// Insert the image into the DOM so its displayed.
	$('#imagePreview').html(img);
	
	
	// When the image is loading get the URL location of the file.
  	img.onload = function() {
		console.log("------------------------------");		
    	URL.revokeObjectURL(imgURL);		
  	};
	
	
	// Storing Data.
	found = false;
	for	(loop = 1; loop < countdownStorage.length + 1; loop+=1) {
		
		if (loop != countdownStorage[loop] && found == false) {	
				
			countdownStorage[loop] = loop;
			
			found = {
				"id":countdownStorage[loop], 
				"url":imgURL 
			}
			
			countdownJSON = JSON.stringify(found);
			localStorage.setItem(loop, countdownJSON);
			console.log(loop);
				
		}
			
	}
	Storing();
	
}




function Storing() {
	console.log("Storing");	
	
	
	// Starts a Interval.
    start = setInterval(function() {
		
		
		// Clears HTML Element.
		document.getElementById("imageCollection").innerHTML = "";
		
		
		// Creates a loop.
		for(loopThree = 1; loopThree < 1000; loopThree+=1) {
			
			image = localStorage.getItem(loopThree);
			object[loopThree] = JSON.parse(image);
			document.getElementById("imageCollection").innerHTML = object[loopThree].url;
			
		}	
		
	}, 1000);

	
}










function setUp() {
	console.log("setUp");
	
	destinationType = navigator.camera.DestinationType;
		
}


function capturePhoto() {
	console.log("capturePhoto");
	
	// navigator.camera.getPicture( cameraSuccess, cameraError, [ cameraOptions ] );
	navigator.camera.getPicture( onSuccess , onFail, { quality: 50, destinationType: destinationType.DATA_URL });

}
	

// If the Camera succeeds.	
function onSuccess(imageData) {
	console.log("onSuccess");
	

	image = document.getElementById('image');
	image.src = "data:image/jpg;base64," + imageData;
	
	found = false;
	for	(loop = 1; loop < countdownStorage.length + 1; loop+=1) {
		
		if (loop != countdownStorage[loop] && found == false) {	
				
			countdownStorage[loop] = loop;
			found = { "id":countdownStorage[loop], "url":image.src }
			localStorage.setItem(loop, found);
			console.log(loop);
			
		}
			
	}
	
	Storing();
	
}


// If the Camera fails.
function onFail(message) {
	console.log("onFail");
	
	alert('Failed because: ' + message);
	  
}