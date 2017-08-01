$(document).ready(function(){

var config = {
    apiKey: "AIzaSyBSFDDOjglj3utLECWui_rc31CVnE1V0GM",
    authDomain: "train-scheduler-ad856.firebaseapp.com",
    databaseURL: "https://train-scheduler-ad856.firebaseio.com",
    projectId: "train-scheduler-ad856",
    storageBucket: "train-scheduler-ad856.appspot.com",
    messagingSenderId: "722376473028"
  };

  firebase.initializeApp(config);

var trainData = firebase.database(); 

$("#addTrainBtn").on("click", function(){
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x") ;
  var frequency = $("#frequencyInput").val().trim();


  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency, 
  }

  trainData.ref().push(newTrain);

  alert("Train added");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");



return false;

})

trainData.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("HH:mm A");


  console.log(remainder);
  console.log(mintues );
  console.log(arrival);

})

})




