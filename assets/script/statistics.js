/// Create a variable to reference the database
var database = firebase.database();
var topFiveCities = [];
// Initial Variables (SET the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var name = "";
var clickCounter = 1;
var arrTest = [];
var arrStats = [];
var arrRef = [];
var dbexixts = false;
var arrtopCitiesName = [];
var arrTopCitiesClicks = [];
var arrtabsName = [];
var arrtabsClicks = [];
var arrLinksClicks = [];
var arrLinksName = [];
// Click Button changes what is stored in firebase
database.ref("reftabs").on("value", function (snapshot) {


    arrRef = snapshotToArray(snapshot);



    arrRef.sort(function (a, b) {
        return a.clickcounter - b.clickcounter;
    })
    getRefs(arrRef);

});

database.ref("/recentsearches").on("value", function (snapshot) {


    arrTest = snapshotToArray(snapshot);



    arrTest.sort(function (a, b) {
        return a.clickcounter - b.clickcounter;

    })

    //console.log(arrTest);
    getCities(arrTest);

}, function (errorObject) {
    //console.log("error " + errorObject.code);
});

database.ref("statstabs").on("value", function (snapshot) {


    arrStats = snapshotToArray(snapshot);



    arrStats.sort(function (a, b) {
        return a.clickcounter - b.clickcounter;

    })

    //console.log(arrTest);


    getClickedTabs(arrStats);

}, function (errorObject) {
    //console.log("error " + errorObject.code);
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

function getClickedTabs(argArray) {
    $("#clickedtabs").empty();
    arrtabsClicks = [];
    arrtabsName = [];
    for (var i = argArray.length - 1; i >= 0; i--) {
        arrtabsClicks.push(argArray[i].clickcounter);
        arrtabsName.push(argArray[i].name);
        $("#clickedtabs").append("<li>" + argArray[i].name + " Clicks: " + argArray[i].clickcounter + "</li>")
    }
    buildtabsChart();
}

function getCities(argArray) {
    var counter = 0;
    arrTopCitiesClicks = [];
    arrtopCitiesName = [];
    $("#statcities").empty();
    for (var i = argArray.length - 1; i >= 0; i--) {
        if (counter < 5) {
            arrTopCitiesClicks.push(argArray[i].clickcounter);
            arrtopCitiesName.push(argArray[i].name);
            counter++;
        }
        $("#statcities").append("<li>" + argArray[i].name + " Clicks: " + argArray[i].clickcounter + "</li>")
    }
    buildTopFiveCitiesChart();
}

function getRefs(argArray) {
    $("#visitedlinks").empty();
    arrLinksClicks = [];
    arrLinksName = [];

    for (var i = argArray.length - 1; i >= 0; i--) {
        arrLinksName.push(argArray[i].name);
        arrLinksClicks.push(argArray[i].clickcounter);
        $("#visitedlinks").append("<li>" + argArray[i].name + " Clicks: " + argArray[i].clickcounter + "</li>")
    }
    buildlinksChart();
}

function buildTopFiveCitiesChart() {
    var ctx = $("#myChartcities");
    var data = {
        datasets: [{
            data: arrTopCitiesClicks,
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffc300', '#ff5733'],



        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: arrtopCitiesName,

    };


    var topFiveCitiesChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Top 5 most viewed Cities',
            }
        }
    });
}

function buildtabsChart() {
    var ctx = $("#myChartabs");
    var data = {
        datasets: [{
            data: arrtabsClicks,
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffc300', '#ff5733', '#39F213'],
        }],
        labels: arrtabsName,

    };


    var tabsChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Tabs Clicked Tracker',
            }
        }
    });
}

function buildlinksChart() {
    var ctx = $("#myCharlinks");
    var data = {
        datasets: [{
            data: arrLinksClicks,
            backgroundColor: ['#D35400', '#82E0AA', '#5DADE2'],
        }],
        labels: arrLinksName,

    };


    var linksChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'External Links clicked Tracker',
            }
        }
    });
}



