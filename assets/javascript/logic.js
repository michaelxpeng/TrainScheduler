// Initialize Firebase
var config = {
    apiKey: "AIzaSyAp5ZDEWmOVN1IRkCj5MQEulllj6YrGhFE",
    authDomain: "trainscheduler-c96f1.firebaseapp.com",
    databaseURL: "https://trainscheduler-c96f1.firebaseio.com",
    projectId: "trainscheduler-c96f1",
    storageBucket: "",
    messagingSenderId: "279919886328"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime;
var trainFrequency;
var nextArrival;
var minutesAway;

$("#addTrain").on("click", function() {
    event.preventDefault();

    trainName = $("#trainNameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrainTime = $("#firstTrainTimeInput").val().trim();
    trainFrequency = $("#trainFrequencyInput").val().trim();

    firebase.database().ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        trainFrequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
    });

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#trainFrequencyInput").val("");
    
});

firebase.database().ref().on("child_added", function(childSnap) {
    
    trainName = childSnap.val().trainName;
    destination = childSnap.val().destination;
    firstTrainTime = childSnap.val().firstTrainTime;
    trainFrequency = childSnap.val().trainFrequency;
    nextArrival = childSnap.val().nextArrival;
    console.log(nextArrival);
    minutesAway = childSnap.val().minutesAway;
    console.log(minutesAway);

    var firstTrainTimeConverted = moment((firstTrainTime), "hh:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log(diffTime);
    var remainder = diffTime % trainFrequency;
    console.log(remainder);
    minutesAway = trainFrequency - remainder;
    console.log(minutesAway);
    nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A");
    console.log(nextArrival);

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

    console.log(childSnap.val().trainName);
    console.log(childSnap.val().destination);
    console.log(childSnap.val().firstTrainTime);
    console.log(childSnap.val().trainFrequency);

});