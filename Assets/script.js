// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  // Function to update the hour dynamically
  function updateHour() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function() {
      var hour = parseInt($(this).attr("id").split("-")[1]);

      $(this).removeClass("past present future");

      if (currentHour > hour) {
        $(this).addClass("past");
      } else if (currentHour === hour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Call the updateHour function initially
  updateHour();

  // Update the hour every minute
  setInterval(updateHour, 60000);

  // Get the current date using Day.js
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Update the HTML element at the top of the calendar with the current date
  $("#current-date").text(currentDate);

  // Retrieve saved events from local storage
  for (var hour = 9; hour <= 17; hour++) {
    var timeblock = $("#hour-" + hour);
    var saveButton = timeblock.find(".saveBtn");

    var savedEvent = localStorage.getItem("event-" + hour);
    var eventInput = timeblock.find(".description");

    eventInput.val(savedEvent || "");

    // Save event to local storage on button click
saveButton.on("click", function(event) {
  event.preventDefault();

  var eventText = $(this).siblings(".description").val();
  var hour = $(this).parent().attr("id").split("-")[1];

  localStorage.setItem("event-" + hour, eventText);

  console.log("Event saved to local storage:", eventText);
});
  }
});
