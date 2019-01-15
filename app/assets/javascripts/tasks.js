// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function markCompleted(event) {
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

function editSubtask(event){
  var clicked = event.target;
  event.preventDefault();
  var id = clicked.className.substring(18);
  var elements = document.getElementsByClassName("subtask-hide-"+id);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  elements = document.getElementsByClassName("hidden-form-"+id);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "inline";
  }
}

function replacePriority(elements) {
  for (var i = 0; i < elements.length; i++) {
    var name = elements[i].innerHTML;
    elements[i].innerHTML = "<i class='fas fa-flag'></i>";
    if (name == 'High') {
      elements[i].className += ' high';
    } else if (name == 'Med') {
      elements[i].className += ' med';
    } else if (name == 'Low') {
      elements[i].className += ' low';
    } else {
      elements[i].className += ' none';
    }
  }
}

document.addEventListener("turbolinks:load", function() {
  if (document.getElementById('task_listing')) {
    addEvent(document.getElementById('task_listing'), 'click', markCompleted);
  } else {}

  if (document.getElementById('subtask_listings')) {
    addEvent(document.getElementById('subtask_listings'), 'click', markCompleted);
    addEventByClass("edit", 'click', editSubtask);
  } else {}

  if (document.getElementsByClassName('priority)')) {
    replacePriority(document.getElementsByClassName('priority'));
  } else {}
});


