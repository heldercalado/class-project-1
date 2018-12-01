function npsInfo(argElement , state, city) {
    npsUrl = "https://api.nps.gov/api/v1/parks?stateCode=" + state +
        "&limit=50&start=1&key=qpWelJUKpo0rWmkucsjPsEXnvkdRfGwQvja86FWo&fields=addresses"
    var match = false;
    var targetElement = "#"+argElement;
    $(targetElement).empty();
    $.ajax({
        url: npsUrl,
        method: "GET",
        dataType: "JSON",
    }).done(function (response) {
        // console.log(response);
        // console.log(response.data.length);
        if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].addresses[0] && response.data[i].addresses[0].city == city) {
                    $(targetElement).append("<p>" + response.data[i].fullName + "</p>");
                    match = true;
                }
            }
        }
        if (!match) {
            $(targetElement).append(
                "<p>Sorry, there are no National Parks in this city.</p>");
        }
    });

}