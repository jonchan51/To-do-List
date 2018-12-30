// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function toggle(event) {
  var clicked = event.target;
  if (clicked.className === 'completed') {
    var name = clicked.name;
    Rails.ajax({
      type: 'PATCH',
      url: '/' + name + '/'
           + clicked.value,
      dataType: 'script',
      data: 'completed=' + clicked.checked
    });
  } else {}
}

function test(event) {
}

document.addEventListener("turbolinks:load", function() {
  // addEventByClass('completed', 'click', toggle);
  if (document.getElementById('listings')) {
    addEvent(document.getElementById('listings'), 'click', toggle);
  } else {}
});


