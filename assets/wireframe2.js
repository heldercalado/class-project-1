






function anotherquery(requestUrl) {
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).done(function (result) {
        //console.log(result);
        console.log(result)
        console.log("Request Status: " + result.status);
        console.log("Place Name: " + result.results[0].formatted_address);
        console.log("Place ID: " + result.results[0].place_id);
        console.log("Lat: " + result.results[0].geometry.location.lat);
        console.log("Lng: " + result.results[0].geometry.location.lng);
        restaurantInfo(result.results[0].geometry.location.lat, result.results[0].geometry.location.lng);
        getCurrentWeather(result.results[0].formatted_address);
        eventBrite(result.results[0].geometry.location.lat, result.results[0].geometry.location.lng);
        npsInfo(result.results[0].address_components[2].short_name, result.results[0].address_components[0].long_name);
        console.log(result.results[0].address_components[0].long_name);
        console.log(result.results[0].address_components[2].short_name);


        myurl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + result.results[0].place_id + "&fields=photos,name,rating,formatted_phone_number&key=AIzaSyBK9jkFfnWFcee-sTKz_Y14T4RMu_SBbuo"

        "&inputtype=textquery&fields=photos,formatted_address&key=AIzaSyBK9jkFfnWFcee-sTKz_Y14T4RMu_SBbuo&address"
        var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/"
        $.ajax({
            url: corsAnywhereUrl + myurl,
            method: 'GET',
        }).done(function (result) {
            //console.log(result);

            console.log(result)
            $("#carouselExampleSlidesOnly").empty();
            for (var i = 0; i < result.result.photos.length; i++) {
                myurl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                    result.result.photos[i].photo_reference +
                    "&key=AIzaSyBK9jkFfnWFcee-sTKz_Y14T4RMu_SBbuo"
                if (i === 0) {
                    $("#carouselExampleSlidesOnly").append("<div class='carousel-item active'><img class='d-block w-100' src='" + myurl + "' alt='First slide'></div>");
                } else {
                    $("#carouselExampleSlidesOnly").append("<div class='carousel-item'><img class='d-block w-100' src='" + myurl + "' alt='First slide'></div>");

                }

                //$("#demo").append("<img src='"+myurl+"'>");

            }


        }).fail(function (err) {
            throw err;
        });

    }).fail(function (err) {
        throw err;
    });
}
function getCurrentWeather(city) {
    console.log(city);
    var APIKey = "a1419d3616a13603e1c5b962606c26e2";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $("#cityName").text(response.name + " Weather Details:");
            $("#wind").text("Wind Speed: " + response.wind.speed);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#temp").text("Temperature (F) " + response.main.temp);

            // Log the data in the console as well
            console.log(city);
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });


}

function eventBrite(argLatitude, argLongitude) {

    var token = 'SRIRFU3BOMH4X35QFAGN';
    var $events = $("#collapseThree");

    $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + token + '&location.latitude=' + argLatitude + '&location.longitude=' + argLongitude + '&expand=venue', function (res) {
        if (res.events.length) {
            var s = "<ul class='eventList'>";
            for (var i = 0; i < res.events.length; i++) {
                var event = res.events[i];
                // console.dir(event);
                s += "<li><a href='" + event.url + "'>" + event.name.text + "</a> - " + event.description.text + "</li>";
            }
            s += "</ul>";
            $events.html(s);
            $('#exampleModal').modal('toggle');
        } else {
            $events.html("<p>Sorry, there are no upcoming events.</p>");
        }
    });



}

var corsAnywhere = "https://cors-anywhere.herokuapp.com/";
function restaurantInfo(arglat, arglong) {
    console.log('hiiiiiiiiii')
    var zomBaseUrl = "https://developers.zomato.com/api/v2.1";
    var zomCallCity = "/cities&key=";
    var zomKey = "04dffe13574d2caddf0a86ffa64f32a0";
    $("#restaurant").empty();

    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + arglat + "&lon=" + arglong + "&user-key=" + zomKey,
        method: "GET",
        beforeSend: function (xhr) { xhr.setRequestHeader('user-key', '04dffe13574d2caddf0a86ffa64f32a0'); },
    }).then(function (response) {
        console.log(response);
        console.log("length = " + response.nearby_restaurants.length);
        $("#restaurant").append("<ul></ul>")

        for (var i = 0; i < response.nearby_restaurants.length; i++) {
            $("#collapseFour").append("<li> " + response.nearby_restaurants[i].restaurant.name + "</li>")
            $("#collapseFour").append("<li>" + response.nearby_restaurants[i].restaurant.user_rating.aggregate_rating + "</li>");
            $("#collapseFour").append("<li>" + response.nearby_restaurants[i].restaurant.user_rating.rating_text + "</li>");
            $("#collapseFour").append("<li>" + response.nearby_restaurants[i].restaurant.cuisines + "</li>");
            $("#collapseFour").append("<li>" + response.nearby_restaurants[i].restaurant.location.locality + "</li>");
            $("#collapseFour").append("<li>" + response.nearby_restaurants[i].restaurant.location.address + "</li>");
            $("#collapseFour").append("<li>" + response.nearby_restaurants[i].restaurant.events_url + "</li>");
            $("#collapseFour").append("<br></br>")
        }
    });
};


// var addToList = document.createElement("li");

// $("#on-screen").


// Call the NPS API
function npsInfo(state, city) {
    npsUrl = "https://api.nps.gov/api/v1/parks?stateCode=" + state + "&limit=50&start=1&key=qpWelJUKpo0rWmkucsjPsEXnvkdRfGwQvja86FWo&fields=addresses"
    var match = false;
    $("#collapseFive").empty();
    $.ajax({
        url: npsUrl,
        method: "GET",
        dataType: "JSON",
    }).done(function (response) {
        console.log(response);
        console.log(response.data.length);
        if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
                $("#collapseFive").append("<p><strong>" + response.data[i].fullName + "</strong></p>");
                $("#collapseFive").append("<p>" + response.data[i].name + "</p>");
                $("#collapseFive").append("<p>" + response.data[i].designation + "</p>");
                $("#collapseFive").append("<p>" + response.data[i].description + "</p>");
                $("#collapseFive").append("<p>" + response.data[i].url + "</p>");
            };
        };
    });
};