// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD50TiWm3aYApF8zYfzkwK9eCoawNQ_OC4",
  authDomain: "bay-area-train-scheduler.firebaseapp.com",
  databaseURL: "https://bay-area-train-scheduler.firebaseio.com",
  projectId: "bay-area-train-scheduler",
  storageBucket: "bay-area-train-scheduler.appspot.com",
  messagingSenderId: "622155873357",
  appId: "1:622155873357:web:c47582b5e529e3e7e6f004",
  measurementId: "G-GPXXT7GQX0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var trainName = "";
var destination = "";
var time = "";
var frequency = "";
var database = firebase.database();
var rowCounter = 0;

$("#form-submit").on("click", function(event) {
  event.preventDefault();

  trainName = $("#name")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  time = $("#train-time")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  $("#name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");
  rowCounter++;
  database.ref().push({
    trainName: trainName,
    destination: destination,
    startTime: time,
    frequency: frequency,
  });
});
