function restaurantInformation(argElementTarget, arglat, arglong) {
    // var zomBaseUrl = "https://developers.zomato.com/api/v2.1";
    // var zomCallCity = "/cities&key=";
    var zomKey = "04dffe13574d2caddf0a86ffa64f32a0";
    var $restaurants = $("#" + argElementTarget);
    $restaurants.empty();
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + arglat + "&lon=" + arglong + "&user-key=" + zomKey,
        method: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('user-key', '04dffe13574d2caddf0a86ffa64f32a0');
        },
    }).then(function (response) {
        var restaurants = response.nearby_restaurants;
        //console.log(restaurants);
        if (restaurants.length) {


            for (var i = 0; i < restaurants.length; i++) {
                //  creates a variable to hold the card id (each event returned from the query will have a unique card id)
                var cardId = "restaurantcard" + i;
                var elementCard = ""
                var currentRestaurant = restaurants[i].restaurant;
                var restaurantLat = currentRestaurant.location.latitude;
                var restaurantLon = currentRestaurant.location.longitude;


                //console.log(event.start.local);
                elementCard = "#" + cardId;
                //console.log(elementCard);
                $("#" + argElementTarget).append("<div class='card' id='" + cardId + "'></div>");
                $(elementCard).append("<div class='card-header' id='restaurantcardheader" + i + "'></div>");
                $("#restaurantcardheader" + i).append("<h5 class='mb-0' id='restaurantcardheadtitle" + i + "'></h5>");
                $("#restaurantcardheadtitle" + i).append("<button class='btn btn-link' type='button' data-toggle='collapse' data-target='#restaurantcollapse" + i + "' aria-expanded='true' aria-controls='restaurantcollapse" + i + "'>" + currentRestaurant.name + "</button>");
                $(elementCard).append("<div id='restaurantcollapse" + i + "' class='collapse' aria-labelledby='restaurantcardheader" + i + "' data-parent='#" + argElementTarget + "'></div>");
                $("#restaurantcollapse" + i).append("<div class='card-body' id='restaurantbody" + i + "'></div>");
                $("#restaurantbody" + i).append("<div class='row' id='restaurantcardbodyrow1" + i + "'></div>");
                $("#restaurantcardbodyrow1" + i).append("<div class='cold-md-4 ml-2'><h6>Name : " + currentRestaurant.name + "</h6></div>");
                $("#restaurantcardbodyrow1" + i).append("<div class='cold-md-4 ml-2'><h6>Address: " + currentRestaurant.location.address + "</h6></div>");
                //$("#restaurantcardbodyrow1"+i).append("<div class='cold-md-4 ml-2'><a href='https://www.google.com/maps/search/?api=1&query="+restaurantLat+","+restaurantLon +"' target='_blank' class='btn btn-primary'>Open on Maps</a></div>");
                // $("#restaurantcardbodyrow1"+i).append("<div class='cold-md-3 ml-2'><h6>End: "+endTime+"</h6></div>");
                $("#restaurantbody" + i).append("<div class='row' id='restaurantcardbodyrow2" + i + "'></div>");
                $("#restaurantcardbodyrow2" + i).append("<div class='cold-md-6 ml-2'><h6>Cuisine: " + currentRestaurant.cuisines + "</h6></div>");
                $("#restaurantcardbodyrow2" + i).append("<div class='cold-md-6 ml-2'><h6>Rating: " + currentRestaurant.user_rating.aggregate_rating + "</h6></div>");
                $("#restaurantbody" + i).append("<div class='row' id='restaurantcardbodyrow3" + i + "'></div>");
                //$("#restaurantcardbodyrow3"+i).append("<div class='cold-md-12 ml-2'><p>Start: "+restaurant.description.text+"</p></div>");
                $("#restaurantbody" + i).append("<div class='row' id='restaurantcardbodyrow4" + i + "'></div>");
                $("#restaurantcardbodyrow4" + i).append("<div class='cold-md-6' md-auto><a href='" + currentRestaurant.url + "' target='_blank' class='btn btn-primary'>View on Zomato</a></div>");
                $("#restaurantcardbodyrow4" + i).append("<div class='cold-md-6 ml-2'><a href='https://www.google.com/maps/search/?api=1&query=" + restaurantLat + "," + restaurantLon + "' target='_blank' class=''><img class='img_icons' src='./assets/images/gmaps.png'></a></div>");

            }

            



        }
    });
}