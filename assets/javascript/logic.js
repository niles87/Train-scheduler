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

$(document).on("click", ".checkbox", function() {
  deleteNode = $(this).attr("data-id");
  $("#modal").css("display", "block");
  $("#modal-content").css("display", "block");
});

$("#close").on("click", function() {
  $("#modal").css("display", "none");
  $("#modal-content").css("display", "none");
  $(".checkbox").prop("checked", false);
});

$("#delete-row").on("click", function() {
  $("#modal").css("display", "none");
  $("#modal-content").css("display", "none");
  database.ref(deleteNode).remove();
  location.reload();
});

database.ref().on("child_added", function(childSnapShot) {
  var correctedTime = moment(childSnapShot.val().startTime, "hh:mm A");

  var differenceOfTime = moment().diff(moment(correctedTime), "minutes");

  var remainderTime = differenceOfTime % childSnapShot.val().frequency;

  var arrivalMinutes = childSnapShot.val().frequency - remainderTime;

  var nextTrainArrival = moment().add(arrivalMinutes, "minutes");

  var nextTrainTime = moment(nextTrainArrival).format("hh:mm A");

  var tableRow = `
  <tr>
  <th><input type="checkbox" class="checkbox" data-id="${childSnapShot.key}"></th>
 <td>${childSnapShot.val().trainName}</td>
 <td>${childSnapShot.val().destination}</td>
 <td>${childSnapShot.val().frequency} min</td>
 <td>${childSnapShot.val().startTime}</td>
 <td>${nextTrainTime}</td>
 <td>${arrivalMinutes} min</td>
 </tr>
 `;
  $("#tablebody").append(tableRow);
});
