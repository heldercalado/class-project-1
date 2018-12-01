function anotherquery(requestUrl) {
    $("#searchHelp").text("");
    $.ajax({
        url: requestUrl,
        method: 'GET',
    }).done(function (result) {
        
       if (result.status === "OK"){

      
        console.log(result);
        var address = result.results[0].formatted_address;
        var latitude = result.results[0].geometry.location.lat;
        var longitude = result.results[0].geometry.location.lng;
        var cityName = result.results[0].address_components[0].long_name;
        var state = result.results[0].address_components[2].short_name;
        var googlePlaceId = result.results[0].place_id;

        getCurrentWeather(address);
        events("eventsInnerAccordion", latitude, longitude);
        addCity(cityName.toLowerCase());
        restaurantInformation("restaurantsInnerAccordion", latitude, longitude);
        npsInfo("nationalparkInnerAccordion", cityName, state);
        
        myurl = "https://maps.googleapis.com/maps/api/place/details/json?placeid=" + googlePlaceId +
            "&fields=photos,name,rating,formatted_phone_number&key=AIzaSyBK9jkFfnWFcee-sTKz_Y14T4RMu_SBbuo"
        "&inputtype=textquery&fields=photos,formatted_address&key=AIzaSyBK9jkFfnWFcee-sTKz_Y14T4RMu_SBbuo&address"
        var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/"
        $.ajax({
            url: corsAnywhereUrl + myurl,
            method: 'GET',
        }).done(function (result) {
            //console.log(result);

            //console.log("Google result: " + result)
            $("#target").empty();
            for (var i = 0; i < result.result.photos.length; i++) {
                myurl =
                    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                    result.result.photos[i].photo_reference +
                    "&key=AIzaSyBK9jkFfnWFcee-sTKz_Y14T4RMu_SBbuo"
                if (i === 0) {
                    $("#target").append(
                        "<div class='carousel-item active'><img class='d-block w-100 car-image' src='" +
                        myurl + "' alt='First slide'></div>");
                } else {
                    $("#target").append(
                        "<div class='carousel-item'><img class='d-block w-100 car-image' src='" +
                        myurl +
                        "' alt='First slide'></div>");

                }

                //$("#demo").append("<img src='"+myurl+"'>");

            }


        }).fail(function (err) {
            throw err;
        });
    }else {
        $("#searchHelp").text("** City Not Found **")
        $('#exampleModal').modal('toggle');
    }
    // end of function here
    }).fail(function (err) {
        throw err;
    });

    
}