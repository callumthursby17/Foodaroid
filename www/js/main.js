// JavaScript Document
$(document).on('deviceready', function deviceIsReady()
{
	console.log('Device is ready!');
	setupPush();
	
}); 

$( document ).ready(function() {
    console.log( "ready!" );
	setupPush(); 
    //cameraGetPicture(); 
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
		//Take Picture using device camra and retrieve image as base64-encoded string 
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, 
		{
			quality: 80,
			correctOrientation: true,
            destinationType: Camera.DestincationType.FILE_URI
		}); 
	}
	
	
	// Called when a photo is successfully retrieved assumes there is an image 
	function onPhotoDataSuccess(imageData)
	{
		// Get image Handle 
        var image = document.getElementById('myImage');
		imageCam.src = "data:image/jpeg;base64," + imageData;
	}

	//Called if somthing bad happens.
	function onFail(message)
	{
		alert('Failed because: ' + message);
    }

} // End of setupPush 



// Start of get photos function 
//function cameraGetPicture()
//{
//    navigator.camera.get.Picture(onSuccess, onFail, 
//    {
//        quality: 50, 
//        destinationType: Camera.DestinationType.DATA_URI,
//        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//    }); 
//    
//    function onSuccess (imageURI) 
//    {
//        var image = document.getElementById('myImage');
//        image.src = imageURI;
//    }
//    
//    function onFail (message)
//    {
//        alert('Failed because: ' + message); 
//    }
//}
//document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture); 
