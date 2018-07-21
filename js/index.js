// Camera Code


// Variables

var pictureSource; // sets the Picture Source.
var destinationType; // sets the formaat of returned value.
var input;
var file;

var imgURL;
var img;


window.onload = function() {
	
	document.addEventListener("deviceready",setUp,false);
	
}


function setUp() {
	
	
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	
	
	// setup listener for change in image input element
	input = document.querySelector('input[type=file]');
	input.onchange = function () {
  		file = input.files[0];
		displayAsImage(file); //call this function with the file name if the image was taken.
	};
	
	
}


function displayAsImage(file) {
	
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
  
  	//insert the image intothe DOM so its displayed.
  	$('#imagePreview').html(img);

}


function capturePhoto() {
	// navigator.camera.getPicture( cameraSuccess, cameraError, [ cameraOptions ] );
	navigator.camera.getPicture( onSuccess , onFail, { quality: 100, destinationType: destinationType.DATA_URL });

}
	

// If the Camera succeeds.	
function onSuccess(imageData) {
	
	var image = document.getElementById('image');
	image.src = "data:image/jpeg;base64," + imageData;
	
}


// If the Camera fails.
function onFail(message) {
	
      alert('Failed because: ' + message);
	  
}