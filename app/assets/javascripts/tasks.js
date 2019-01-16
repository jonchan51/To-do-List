// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// mark tasks / subtasks as completed
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

// make edit subtask form visible
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

// update priority level
function replacePriority(elements) {
  for (var i = 0; i < elements.length; i++) {
    var name = elements[i].innerHTML;
    elements[i].innerHTML = "<i class='fas fa-flag'></i>";
    var flag = elements[i].parentNode;
    if (name == 'High') {
      flag.className += 'high';
    } else if (name == 'Med') {
      flag.className += 'med';
    } else if (name == 'Low') {
      flag.className += 'low';
    } else {
      flag.className += 'none';
    }
  }
}

// change color of priority flag on click
function changePriority(event) {
  // ensure clicked variable is the link to extract the priority level from
  // class
  var clicked = event.target;
  if (clicked.localName == 'i') {
    clicked = clicked.parentNode;
  } else {}
  var priority = clicked.className;
  clicked.parentNode.parentNode.className = priority;
}


document.addEventListener("turbolinks:load", function() {
  if (document.getElementById('task_listing')) {
    addEvent(document.getElementById('task_listing'), 'click', markCompleted);
  } else {}

  if (document.getElementById('subtask_listings')) {
    addEvent(document.getElementById('subtask_listings'), 'click', markCompleted);
    addEventByClass('edit', 'click', editSubtask);
  } else {}

  if (document.getElementsByClassName('priority_flag)')) {
    replacePriority(document.getElementsByClassName('priority_flag'));
    addEventByClass('dropdown-content', 'click', changePriority);
  } else {}
});


