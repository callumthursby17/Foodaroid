window.InstagramSearch = {
    config: {}, 
    
    init: function(opt){
        opt = opt || {}; 
        this.config.access_tokeb = opt.access_token;
    }, 
    
    tagByName: function(userInput, callback){
        var endpoint = 'https://api.instagram.com/v1/tags/' + userInput + '/media/recent?client_id=be7cce16e0ce406bb9b9a5652bfcd73f';
        this.getJson(endpoint, callback);
    }, 
    
    getJson: function(url, callback){
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function(response){
                if ( typeof callback == 'function') callback(response);
            }
        });
    }
};

$(document).ready(function(){
    $( '#submitSearch').bind('click', function(e){
        e.preventDefault(); 
        
        // Getting the value in the user search box and storing inside a variable
            var tagName = $('#userSearch').val(); 
        InstagramSearch.tagByName(InstagramSearch.tagByName, function(response){
             var $instagram = $('#imageResults');
                $instagram.html('');
            
            for (var i = 0; i < response.data.length; i++){
                    imageUrl = response.data[i].image.low_resolution.url; 
                    $instagram.append('<img src="' + imageUrl + '"/>')
                }
        });
    });
}); 