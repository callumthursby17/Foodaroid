// JavaScript Document
$(document).on('deviceready', function deviceIsReady()
{
	console.log('Device is ready!');
	setupPush();
	
}); 

$( document ).ready(function() {
    console.log( "ready!" );
	setupPush(); 
});


function setupPush()
{

	// CAMERA AND PHOTO
	//Take a photo 
	var imageCam = $('#imagCam');
	
	//Ties a JS function to the click event of the button
	$('#cameraStart').bind("click", function()
	{
		console.log('Camera Live'); 
		capturePhotoWithData();
	
	}); 
	
	// Function to call the camera and take photo
	function capturePhotoWithData() 
	{
		//Take Picture using device camrra and retrieve image as base64-encoded string 
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
		{
			quality: 80,
			correctOrientation: true
		}); 
	}
	
	//Called if somthing bad happens.
	function onFail(message)
	{
		alert('Failed because: ' + message);
	}
	
	// Called when a photo is successfully retrieved assumes there is an image 
	function onPhotoDataSuccess(imageData)
	{
		// Get image Handle 
		imageCam.src = imageData;
	}

} // End of setupPush 
