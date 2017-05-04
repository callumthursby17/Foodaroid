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
    console.log("Instgram Feature online ");
    instagramSearch();
    console.log("Instagram Search is Active"); 
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

    
function detectInsta(){
        
    
// Detect if the device has the instgram app 
Instagram.isInstalled(function (err, installed){
    if(installed) {
        console.log("Instgram is", installed); 
        alert('Instagram Installed');
        instgramUpload(); 
        
    } else {
        console.log("Instagram is not installed");
        alert('Please Install Instagram to use this feature');
    }
        }); 
        
    } // End of detectInsta Function 
    
    function instgramUpload(){
        
        var instgramImage = document.getElementById('#insta');
        
                Instagram.share(instgramImage, function (err){
            if (err){
                console.log("not shared"); 
                alert('Image has not been shared');
            } else {
                console.log("Shared");
                alert('Image has been shared'); 
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

// MY PHOTOS PAGE 
function imageSelect(){
    
        var userInput = $('#cameraGetPicture');

        //Ties a JS function to the click event of the button
        $('#cameraGetPicture').bind("click", function()
        {
            console.log('User wants to import an image '); 
            cameraGetPicture2(); 
        }); 


    function cameraGetPicture2()
    {


        navigator.camera.getPicture(onSuccess, onFail, 
        {
            quality: 50, 
            destinationType: Camera.DestinationType.DATA_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                                    
        }); 

        function onSuccess (imageURI) 
        {
            var image = document.getElementById('myImage');
            image.src = imageURI;
        }

        function onFail (message)
        {
            alert('Failed because: ' + message); 
        }
    }
}

// INSTAGRAM SEARCH 
function instagramSearch (){

     var params = {
            // Request parameters
            "q": "chips",
            "count": "10",
            //"offset": "0",
            //"mkt": "en-us",
           // "safeSearch": "Moderate",
        };
    
     //Ties a JS function to the click event of the button
        $('#submitSearch').bind("click", function(e)
        {
            console.log('User wants to search for an image '); 
            e.preventDefault(); 
            
            // Getting the value in the user search box and storing inside a variable
            var tagName = $('#userSearch').val(); 
            
            if (typeof(Storage) !== "undefined"){
                
                       
            localStorage.suggestedTag = "#" + tagName; 
                
                document.getElementById('userTags').innerHTML = localStorage.getItem("suggestedTag")
                document.getElementById('userTagsSearch').innerHTML = localStorage.getItem("suggestedTag")
            
            } else {
                alert("No web storage"); 
            }
            
 
             $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","f5e1ff6b17924fe6a6b14f931377d66f");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            alert("success");
                 
                 console.log(data); 
                 
                for (var i = 0; i < data.length; i++){
                    imageUrl = data.value[0].thumbnailUrl; 
                    var output = document.getElementById('#imageResults');
                    output = imageUrl; 
                }
        })
        .fail(function() {
            alert("error");
        });
    
        
        
        });    
            
            
 }; 
 
