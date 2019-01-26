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
    if (name == 'High') {
      elements[i].classList.add('high');
    } else if (name == 'Med') {
      elements[i].classList.add('med');
    } else if (name == 'Low') {
      elements[i].classList.add('low');
    } else if (name == 'None') {
      elements[i].classList.add('none');
    }
  }
}

function editCategory(event) {
  var clicked = event.target;
  var name_ele = document.getElementById('category_name');
  var submit_ele = document.getElementsByClassName('submit')[0];
  submit_ele.value = "Edit Category";
  submit_ele.id = clicked.value;
  submit_ele.dataset.disableWith = "Edit Category";
  submit_ele.onclick = updateCategory;
  name_ele.value = clicked.parentNode.children[0].innerText;
  name_ele.placeholder = "New Category name";
}

function updateCategory(event) {
  event.preventDefault();
  var clicked = event.target;
  var name = document.getElementById('category_name').value;
  if (name == '') {
    alert("Category name cannot be empty");
  } else {
    Rails.ajax({
      type: 'PATCH',
      url: '/categories/' + clicked.id,
      dataType: 'script',
      data: 'name=' + document.getElementById('category_name').value
    });
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
  var flag = clicked.parentNode.parentNode.children[0];
  flag.classList.replace(flag.classList[1], priority);
}

function filterParams() {
  var priority = 
    [document.getElementById('priority_status_0').checked,
     document.getElementById('priority_status_1').checked,
     document.getElementById('priority_status_2').checked,
     document.getElementById('priority_status_3').checked];
  var priority_string = '';
  for (var i = 0; i < 4; i++) {
    if (priority[i]) {
      priority_string += '&priority_status[]=' + i;
    }
  }
  if (priority_string == '') {
    priority_string = '&priority_status=';
  }
     
  var cat = document.getElementById('category_id').value;
  var status = document.getElementById('status').checked;
  var date_group = document.getElementById('date_group').value;
  Rails.ajax({
    type: 'GET',
    url: '/tasks',
    dataType: 'script',
    data: 'category_id=' + cat + '&date_group=' + date_group
          + '&status=' + status + priority_string
  });
}

function categorySearch() {
  Rails.ajax({
    type: 'GET',
    url: '/categories',
    dataType: 'script',
    data: 'search=' + this.value
  });
}

function newTask(event) {
  var form = document.getElementById('task_form');
  event.preventDefault();
  form.style.display = "inline";
  document.getElementById('form_submit').onclick = createTask;
  document.getElementById('form_title').focus();
}

function createTask() {
  var title = document.getElementById('form_title').value;
  var category = document.getElementById('form_category').value;
  var date = document.getElementById('form_date').value;
  var end_of_day = ' 23:59'
  var datetime = date + end_of_day
  var priority = document.getElementById('form_priority').value;
  if (title != '') {
    Rails.ajax({
      type: 'POST',
      url: '/tasks',
      dataType: 'script',
      data: 'title=' + title + '&date=' + datetime + '&priority=' + priority
            + '&category=' + category
    });
  } else {
    alert("Task name cannot be empty");
  }
}

function priorityFunc(){
  replacePriority(document.getElementsByClassName('priority_flag'));
  addEventByClass('dropdown-content', 'click', changePriority);
}

function filterFunc() {
  document.getElementById('priority_status_0').onchange = filterParams;
  document.getElementById('priority_status_1').onchange = filterParams;
  document.getElementById('priority_status_2').onchange = filterParams;
  document.getElementById('priority_status_3').onchange = filterParams;
  document.getElementById('status').onchange = filterParams;
  document.getElementById('category_id').onchange = filterParams;
  document.getElementById('date_group').onchange = filterParams;
}

document.addEventListener("turbolinks:load", function() {
  if (document.getElementById('task_listing')) {
    addEvent(document.getElementById('task_listing'), 'click', markCompleted);
  } 

  if (document.getElementById('subtask_listings')) {
    addEvent(document.getElementById('subtask_listings'), 'click', markCompleted);
    addEventByClass('edit', 'click', editSubtask);
  } 

  if (document.getElementsByClassName('priority_flag')) {
    priorityFunc();
  }

  if (document.getElementById('filters')) {
    filterFunc();
  }

  if (document.getElementById('category_search')) {
    addEvent(document.getElementById('category_search'), 'keyup', categorySearch);
  }

  if (document.getElementById('new_task')) {
    addEvent(document.getElementById('new_task'), 'click', newTask);
  }

  if (document.getElementsByClassName('edit')) {
    addEventByClass('edit', 'click', editCategory);
  }
});


