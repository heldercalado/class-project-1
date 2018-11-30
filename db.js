//  Firebase and initializing
var config = {
    apiKey: "AIzaSyAV_Z4VZjSYKDCzFfNbpUHzVRgwTyTQClE",
    authDomain: "my-cbc-demo.firebaseapp.com",
    databaseURL: "https://my-cbc-demo.firebaseio.com",
    projectId: "my-cbc-demo",
    storageBucket: "my-cbc-demo.appspot.com",
    messagingSenderId: "856722307438"
};
firebase.initializeApp(config);

/// Create a variable to reference the database
var database = firebase.database();
var topFiveCities = [];
// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var name = "";
var clickCounter = 1;
var arrTest = [];
var dbexixts = false;
// Click Button changes what is stored in firebase
function addCity(argName) {

    console.log("function called for database");


    database.ref().child('recentsearches').orderByChild('name').equalTo(argName).once("value", function (snapshot) {
        if (snapshot.val() === null) {

            var obj = {
                name: argName,
                clickcounter: 1
            }
            database.ref('recentsearches').push(obj);
        } else {
            // snapshot.forEach(function (childSnapshot) {





            var testarr = snapshotToArray(snapshot);


            database.ref("recentsearches/" + testarr[0].key).update({
                clickcounter: testarr[0].clickcounter + 1
            });



        }

    });

}
function statistics(argName) {

    console.log("function called for database");


    database.ref().child('statstabs').orderByChild('name').equalTo(argName).once("value", function (snapshot) {
        if (snapshot.val() === null) {

            var obj = {
                name: argName,
                clickcounter: 1
            }
            database.ref('statstabs').push(obj);
        } else {
            // snapshot.forEach(function (childSnapshot) {





            var testarr = snapshotToArray(snapshot);


            database.ref("statstabs/" + testarr[0].key).update({
                clickcounter: testarr[0].clickcounter + 1
            });



        }

    });

}




database.ref("/recentsearches").on("value", function (snapshot) {


    arrTest = snapshotToArray(snapshot);



    arrTest.sort(function (a, b) {
        return a.clickcounter - b.clickcounter;

    })
    console.log(arrTest);
    getTopFiveCities(arrTest);

}, function (errorObject) {
    console.log("error " + errorObject.code);
});



function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);

    });

    return returnArr;
}

function getTopFiveCities(argArray) {
    $("#topcities").empty();
    for (var i = 0; i < 5; i++) {
        var myIndex = (argArray.length - 1) - i
        topFiveCities.push(argArray[myIndex]);
        $("#topcities").append("<li><a href='#' class='btn btn-primary topcities' data-toggle='modal' data-target='#exampleModal' role='button'>"+ argArray[myIndex].name + "</a></li>")
    }
    console.log(topFiveCities);

}