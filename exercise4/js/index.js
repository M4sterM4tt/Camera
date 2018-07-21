$(document).on("pagecreate","#pageone", onPageCreated);

//when page is loaded
function onPageCreated() {
	
	//setup listern for change in image input element
	var input = document.querySelector('input[type=file]');
	input.onchange = function () {
  		var file = input.files[0];
		displayAsImage(file);  //call this fucntion with the file name if the image once taken.
	};
}



function displayAsImage(file) {
	
	//create a HTML image
  	var imgURL = URL.createObjectURL(file);
  	var img = document.createElement('img');

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

