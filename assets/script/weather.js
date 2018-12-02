function getCurrentWeather(city) {
    //console.log(city);
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
            // console.log(queryURL);

            // Log the resulting object
            //console.log("Open weather: " + response);

            // Transfer content to HTML
            $("#cityName").text(response.name + " Weather Details:");
            $("#wind").text("Wind Speed: " + response.wind.speed);
            $("#humidity").text("Humidity: " + response.main.humidity);
            $("#temp").text("Temperature (F) " + response.main.temp);
            $("#cardWeather").text("Currently:");
            // Log the data in the console as well
            // console.log(city);
            // console.log("Wind Speed: " + response.wind.speed);
            // console.log("Humidity: " + response.main.humidity);
            // console.log("Temperature (F): " + response.main.temp);
        });


}