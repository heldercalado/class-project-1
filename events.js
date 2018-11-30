// functions for the events tab of our project
// for this we will need a blank accordion element inside the events tab
// argElementTarget refers to the id of that accordion
// argLatitude and arg argLongitude are required to access the eventbrite api
function events(argElementTarget, argLatitude, argLongitude){
// api key to be used on the Ajax call
var token = 'SRIRFU3BOMH4X35QFAGN';
//set the jquery handle for the target element
    var $events = $("#"+argElementTarget);
    $events.empty();
// do the ajax call to get the data from eventbrite api and call a function withe the data results loaded into theres variable
    $.get('https://www.eventbriteapi.com/v3/events/search/?token=' + token + '&location.latitude=' + argLatitude + '&location.longitude=' + argLongitude + '&expand=venue', function (res) {
    // checks if theres any data in the res variable  
    if (res.events.length) {
        
        
       
        
        
        for (var i = 0; i < res.events.length; i++) {
//  creates a variable to hold the card id (each event returned from the query will have a unique card id)
          var cardId ="eventcard" + i;
          var elementCard =""
          var event = res.events[i];
          console.log(event);
          var arrDate = event.start.local.substring(0, 10).split("-");
          var eventDate =arrDate[1] +"-"+arrDate[2]+"-"+arrDate[0];
          var startTime = event.start.local.substring((event.start.local.length -8),event.start.local.length);
          var endTime = event.end.local.substring((event.end.local.length -8),event.end.local.length);
          //console.log(event.start.local);
          elementCard = "#"+cardId;
          //console.log(elementCard);
          $("#"+argElementTarget).append("<div class='card' id='"+cardId+"'></div>");
          $(elementCard).append("<div class='card-header' id='eventcardheader"+i+"'></div>");
          $("#eventcardheader"+i).append("<h5 class='mb-0' id='cardheadtitle"+ i +"'></h5>");
          $("#cardheadtitle"+ i).append("<button class='btn btn-link' type='button' data-toggle='collapse' data-target='#eventcollapse"+i +"' aria-expanded='true' aria-controls='eventcollapse"+i+"'>"+event.name.text+"</button>");
          $(elementCard).append("<div id='eventcollapse"+i+"' class='collapse' aria-labelledby='eventcardheader"+i+"' data-parent='#"+argElementTarget+"'></div>");
          $("#eventcollapse"+ i).append("<div class='card-body' id='eventbody"+i+ "'></div>");
          $("#eventbody"+i).append("<div class='row' id='eventcardbodyrow1"+i+"'></div>") ;
          $("#eventcardbodyrow1"+i).append("<div class='cold-md-3 ml-2'><h6>Date: "+eventDate+"</h6></div>");
          $("#eventcardbodyrow1"+i).append("<div class='cold-md-3 ml-2'><h6>Time Zone: "+event.start.timezone+"</h6></div>");
          $("#eventcardbodyrow1"+i).append("<div class='cold-md-3 ml-2'><h6>Start: "+startTime+"</h6></div>");
          $("#eventcardbodyrow1"+i).append("<div class='cold-md-3 ml-2'><h6>End: "+endTime+"</h6></div>");
          $("#eventbody"+i).append("<div class='row' id='eventcardbodyrow2"+i+"'></div>") ;
          $("#eventcardbodyrow2"+i).append("<div class='cold-md-6 ml-2'><h6>City: "+event.venue.address.city+"</h6></div>");
          $("#eventcardbodyrow2"+i).append("<div class='cold-md-6 ml-2'><h6>Address: "+event.venue.address.address_1+"</h6></div>");
          $("#eventbody"+i).append("<div class='row' id='eventcardbodyrow3"+i+"'></div>") ;
          $("#eventcardbodyrow3"+i).append("<div class='cold-md-12 ml-2'><p>Start: "+event.description.text+"</p></div>");
          $("#eventbody"+i).append("<div class='row' id='eventcardbodyrow4"+i+"'></div>") ;
          $("#eventcardbodyrow4"+i).append("<div class='cold-md-12' md-auto><a href='"+event.url+"' target='_blank' class='btn btn-primary'>View in eventbrite</a></div>");
          
         
        }
        
        $('#exampleModal').modal('toggle');
      } else {
        $events.html("<p>Sorry, there are no upcoming events.</p>");
      }
    });

  }




