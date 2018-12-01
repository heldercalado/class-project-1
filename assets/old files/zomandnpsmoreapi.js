

var corsAnywhere = "https://cors-anywhere.herokuapp.com/";


function restaurantInfo(arglat, arglong) {
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
            $("#restaurant").append("<li> "+ response.nearby_restaurants[i].restaurant.name + "</li>")
            $("#restaurant").append("<li>" + response.nearby_restaurants[i].restaurant.user_rating.aggregate_rating + "</li>");
            $("#restaurant").append("<li>" + response.nearby_restaurants[i].restaurant.user_rating.rating_text + "</li>");
            $("#restaurant").append("<li>" + response.nearby_restaurants[i].restaurant.cuisines + "</li>");
            $("#restaurant").append("<li>" + response.nearby_restaurants[i].restaurant.location.locality + "</li>");
            $("#restaurant").append("<li>" + response.nearby_restaurants[i].restaurant.location.address + "</li>");
            $("#restaurant").append("<li>" + response.nearby_restaurants[i].restaurant.events_url + "</li>");
            $("#restaurant").append("<br></br>")
        }
    });
};


// var addToList = document.createElement("li");
restaurantInfo(25.7616798, -80.191790);
// $("#on-screen").


// Call the NPS API
function npsInfo(state, city) {
    npsUrl = "https://api.nps.gov/api/v1/parks?stateCode=" + state + "&limit=50&start=1&key=qpWelJUKpo0rWmkucsjPsEXnvkdRfGwQvja86FWo&fields=addresses"
    var match = false;
    $("#national-parks").empty();
    $.ajax({
        url: npsUrl,
        method: "GET",
        dataType: "JSON",
    }).done(function (response) {
        console.log(response);
        console.log(response.data.length);
        if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
                $("#on-screen").append("<p><strong>" + response.data[i].fullName + "</strong></p>");
                $("#on-screen").append("<p>" + response.data[i].name + "</p>");
                $("#on-screen").append("<p>" + response.data[i].designation + "</p>");
                $("#on-screen").append("<p>" + response.data[i].description + "</p>");
                $("#on-screen").append("<p>" + response.data[i].url + "</p>");
            };
        };
    });
};

        npsInfo("wa", "seattle");
