// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function toggle() {
  name = this.name;
  Rails.ajax({
    type: 'POST',
    url: (name === 'subtask' ? '/subtasks/' : '/tasks/')
         + this.value + '/toggle',
    data: "completed=" + this.checked,
    success: function(event) {
      if (name === 'task') {
        console.log(event);
      } else {}
    } 
  });
}

function test() {
  alert(this.name);
}

document.addEventListener("turbolinks:load", function() {
  addEventByClass('completed', 'click', toggle);
  addEvent(document.getElementById("all_tasks"), 'ajax:success', function() {
    alert("works");
  });
});


