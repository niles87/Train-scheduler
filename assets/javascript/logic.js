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

// initial variables
var trainName = "";
var destination = "";
var time = "";
var frequency = "";

var database = firebase.database();

// form submit event
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

  database.ref().push({
    trainName: trainName,
    destination: destination,
    startTime: time,
    frequency: frequency,
  });
});

// checkbox event listener to show modal
$(document).on("click", ".checkbox", function() {
  deleteNode = $(this).attr("data-id");
  $("#modal").css("display", "block");
  $("#modal-content").css("display", "block");
});

// modal close button event listener
$("#close").on("click", function() {
  $("#modal").css("display", "none");
  $("#modal-content").css("display", "none");
  $(".checkbox").prop("checked", false);
});

// modal delete button event listener
$("#delete-row").on("click", function() {
  $("#modal").css("display", "none");
  $("#modal-content").css("display", "none");
  database.ref(deleteNode).remove();
});

// firebase value change event listener
database.ref().on("value", function(snap) {
  $("#tablebody").empty();
  snap.forEach(function(childSnapShot) {
    var correctedTime = moment(childSnapShot.val().startTime, "hh:mm");

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
});
