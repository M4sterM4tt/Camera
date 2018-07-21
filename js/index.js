// Camera Code


// Variables

var object;
var objectTwo;
var countdownStorage;
var found;
var loop;


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

	
	for(draw = 0; draw < 999; draw+=1) {
		object.push(0);
		objectTwo.push(0);
		countdownStorage.push(0);
	}
	
	
	setUpPhotos();
	document.addEventListener("deviceready",setUp,false);
	
}


function setUpPhotos() {

	// setup listener for change in image input element
	input = document.querySelector('input[type=file]');
	input.onchange = function () {
		console.log("setUpPhotos()");
  		file = input.files[0];
		displayAsImage(file); //call this function with the file name if the image was taken.
	};
	
}


function displayAsImage(file) {
	
	console.log("displayAsImage(file)");
	
	
	//create a HTML image
  	imgURL = URL.createObjectURL(file);
  	img = document.createElement('img');

	//when the image is loading get the URL location of the file.
  	img.onload = function() {
		
    	URL.revokeObjectURL(imgURL);
		
  	};

	//set the img URL
  	img.src = imgURL;
  
  	//fix the size of the image
  	img.width = 200;
  	img.height = 200;
  
  	//insert the image into the DOM so its displayed.
  	$('#imagePreview').html(img);
	
	found = false;
		for	(loop = 1; loop < countdownStorage.length + 1; loop+=1) {
		
			if (loop != countdownStorage[loop] && found == false) {	
				
				countdownStorage[loop] = loop;
				found = { "id":countdownStorage[loop], "url":$('#imagePreview').html(img) }
				countdownJSON = JSON.stringify(found);
				localStorage.setItem(loop, countdownJSON);
				text = localStorage.getItem(loop);
				object[loop] = JSON.parse(text);
				console.log(object[loop])
			}
			
		}
	
	Storing();
	
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

	console.log("onSuccess(imageData)");
	

	image = document.getElementById('image');
	image.src = "data:image/jpeg;base64," + imageData;
	
	found = false;
	for	(loop = 1; loop < countdownStorage.length + 1; loop+=1) {
		
		if (loop != countdownStorage[loop] && found == false) {	
				
			countdownStorage[loop] = loop;
			found = { "id":countdownStorage[loop], "url":image.src }
			countdownJSON = JSON.stringify(found);
			localStorage.setItem(loop, countdownJSON);
			text = localStorage.getItem(loop);
			object[loop] = JSON.parse(text);
			console.log(object[loop])
			
		}
			
	}
	
	Storing();
	
}


// If the Camera fails.
function onFail(message) {
	
	console.log("onFail(message)");
	
	
	alert('Failed because: ' + message);
	  
}




function Storing() {
	
    start = setInterval(function() {
	console.log("Storing");	
		
		
		// Clears HTML Element.
		document.getElementById("imageCollection").innerHTML = "";
		
		// Creates a loop.
		for(loopThree = 1; loopThree < 1000; loopThree+=1) {
			
			text = localStorage.getItem(loopThree);
			objectTwo[loopThree] = JSON.parse(text);	
			
			document.getElementById("imageCollection").innerHTML = document.getElementById("imageCollection").innerHTML + objectTwo[loopThree].url + "<BR>";

		}	
		
	}, 1000);

}