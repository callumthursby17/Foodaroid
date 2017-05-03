// JavaScript Document
$(document).on('deviceready', function deviceIsReady() {
	console.log('Device is ready!');

	
}); 

$(document).ready(function() {
    console.log( "ready!" );
	setupPush();
    geoLocation(); 
    console.log("navigator.geolocation works well"); 
    imageSelect();  
    console.log("Get image works");
    instagramShare(); 
    console.log("Instgram Feature online ")
});

/*
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){
    console.log(navigator.camera); 
    cameraGetPicture(); 
    console.log("Get image works");
}
*/


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
            saveToPhotoAlbum: true,
            CameraUsesGeolocation: true
		});
	}
	
	
	// Called when a photo is successfully retrieved assumes there is an image 
	function onPhotoDataSuccess(imageData)
	{
		// Get image Handle 
        var image = document.getElementById('myImage');
		//imageCam.src = "data:image/jpeg;base64," + imageData;
        imageCam.src = imageData; 
        alert('Image Saved'); 
        
	}

	//Called if somthing bad happens.
	function onFail(message)
	{
		alert('Failed because: ' + message);
    }

} // End of setupPush 

// Start off Geolocation function

var Lat = undefined; 
var Long = undefined; 

function geoLocation()
{
    navigator.geolocation.getCurrentPosition(onMapSuccess, onMapError, {enableHighAccuracy: true}); 
    
    // Sucess callback 
    function onMapSuccess (postion){
        Lat = postion.coords.latitude;
        Long = postion.coords.longitude; 
        
        console.log("Lat and Log has been received")
        
        getMap(Lat, Long); 
    }
    
    //Get map by using coordinates 
    function getMap (gotlat, gotlong){
        
         var latLong = {lat: gotlat,  lng: gotlong}; 
        
        var mapOptions = {
            center: latLong,
            zoom: 1,
            mapTypeID: "hybrid"
        }; 
        
         var map = new google.maps.Map 
        (document.getElementById('googleMap'), mapOptions); 
        
       
        
        var marker = new google.maps.Marker({
            postion: latLong, 
            //map: map, 
            title: "My Location"
        }); 
        
        marker.setMap(map);
        map.setZoom(15);
        //map.setCenter(marker.getPostion()); 
    }
    
    // Success callback for watching postion changes 
 function onMapWatchSuccess (postion){
        var updatedLat = postion.coords.latitude;
        var updatedLong = postion.coords.longitude; 
        
        if (updatedLat != gotLat && updatedLong != gotLong){
            gotLat = updatedLat;
            gotLong = updatedLong; 
            
            getMap(updatedLat, updatedLong); 
        }
    }
    
    // Error callback 
    function onMapError(error){
        console.log('code: ' + error.code + '\n' + 
                   'message: ' + error.message + '\n'); 
    }
    
    //Watch the changing postion 
    
    function watchMapPostion(){
        return navigator.geolocation.watchPosition ( onMapWatchSuccess, onMapError, {enableHighAccuracy: true}); 
    }
    
    
}// End of Geolocation function 


// INSTAGRAM SHARE 


function instagramShare() {
    
	var imageCam = $('#imagCam');
	
	//Ties a JS function to the click event of the button
	$('#instagramShare').bind("click", function()
	{
		console.log('Sharing'); 
		detectInsta();
	
	}); 

    
function detectInsta (){
        
    
// Detect if the device has the instgram app 
Instagram.isInstalled(function (err, installed){
    if(installed) {
        console.log("Instgram is", installed); 
        alert('Instagram Installed');
    } else {
        console.log("Instgram is not installed");
        alert('Please Install Instgram to use this feature');
    }
        }); 
        
    } 
    
} 


// END of INSTGRAM SHARE

// Start of get photos function 

function imageSelect(){
    
        var userInput = $('#importImage');

        //Ties a JS function to the click event of the button
        $('#importImage').bind("click", function()
        {
            console.log('User wants to import an image '); 
            cameraGetPicture(); 
        }); 


    function cameraGetPicture()
    {


        navigator.camera.getPicture(onSuccess, onFail, 
        {
            quality: 50, 
            destinationType: Camera.DestinationType.DATA_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                    
        }); 

        function onSuccess (imageURI) 
        {
            var image = document.getElementById('insta');
            image.src = imageURI;
        }

        function onFail (message)
        {
            alert('Failed because: ' + message); 
        }
    }
}
// document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture); 
