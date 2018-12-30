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

function editSubtask(event){
  var clicked = event.target;
  event.preventDefault();
  var id = clicked.className.substring(26);
  var elements = document.getElementsByClassName("subtask-hide-"+id);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  elements = document.getElementsByClassName("hidden-form-"+id);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "inline";
  }
}

document.addEventListener("turbolinks:load", function() {
  if (document.getElementById('listings')) {
    addEvent(document.getElementById('listings'), 'click', toggle);
    addEventByClass("subtask-edit", 'click', editSubtask);
  } else {}
});


