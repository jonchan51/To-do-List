// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// mark tasks / subtasks as completed
function markCompleted(event) {
  var clicked = event.target;
  if (clicked.classList[0] === 'completed') {
    var name = clicked.name;
    Rails.ajax({
      type: 'PATCH',
      url: '/' + name + '/'
           + clicked.value,
      dataType: 'script',
      data: 'completed=' + clicked.checked,
      success: function() {
        if (clicked.classList[1] != 'show') {
          var row = clicked.parentNode;
          fadeOut(row);
        } else {}
      }
    });
  } else {}
}

function fadeOut(elem) {
  var fade = setInterval(function () {
    if (!elem.style.opacity) {
      elem.style.opacity = 1;
    } else {}
    if (elem.style.opacity > 0) {
      elem.style.opacity -= 0.1;
    } else {
      clearInterval(fade)
      elem.style.display = "none";
    }
  }, 50);
}

// make edit subtask form visible
function editSubtask(event){
  var clicked = event.target;
  event.preventDefault();
  var id = clicked.classList[1].substring(13);
  var elements = document.getElementsByClassName("subtask-hide-"+id);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
  elements = document.getElementsByClassName("hidden-form-"+id);
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "inline";
  }
  elements[0].focus();
  elements[0].select();
}

// update priority level
function replacePriority(elements) {
  for (var i = 0; i < elements.length; i++) {
    var name = elements[i].innerHTML;
    elements[i].innerHTML = "<i class='fas fa-flag'></i>";
    var flag = elements[i].parentNode;
    if (name == 'High') {
      flag.className = 'high';
    } else if (name == 'Med') {
      flag.className = 'med';
    } else if (name == 'Low') {
      flag.className = 'low';
    } else {
      flag.className = 'none';
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

function filterParams() {
  var priority = document.getElementById('priority_status').value;
  var cat = document.getElementById('category_id').value;
  var status = document.getElementById('status').value;
  var date_group = document.getElementById('date_group').value;
  Rails.ajax({
    type: 'GET',
    url: '/tasks',
    dataType: 'script',
    data: 'category_id=' + cat + '&date_group=' + date_group
          + '&status=' + status + '&priority_status=' + priority
  });
}

function categorySearch() {
  console.log(this.value);
  Rails.ajax({
    type: 'GET',
    url: '/categories',
    dataType: 'script',
    data: 'search=' + this.value
  });
}

function priorityFunc(){
  replacePriority(document.getElementsByClassName('priority_flag'));
  addEventByClass('dropdown-content', 'click', changePriority);
}

function filterFunc() {
  document.getElementById('priority_status').onchange = filterParams;
  document.getElementById('status').onchange = filterParams;
  document.getElementById('category_id').onchange = filterParams;
  document.getElementById('date_group').onchange = filterParams;
}

document.addEventListener("turbolinks:load", function() {
  if (document.getElementById('task_listing')) {
    addEvent(document.getElementById('task_listing'), 'click', markCompleted);
  } else {}

  if (document.getElementById('subtask_listings')) {
    addEvent(document.getElementById('subtask_listings'), 'click', markCompleted);
    addEventByClass('edit', 'click', editSubtask);
  } else {}

  if (document.getElementsByClassName('priority_flag')) {
    priorityFunc();
  } else {}

  if (document.getElementById('filters')) {
    filterFunc();
  } else {}

  if (document.getElementById('category_search')) {
    addEvent(document.getElementById('category_search'), 'keyup', categorySearch);
  } else {}
});


