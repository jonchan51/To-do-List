// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function addEvent(element, evnt, func) {
  if (element.attachEvent) {
    return element.attachEvent('on'+evnt, func);
  } else {
    return element.addEventListener(evnt, func);
  }
}

function addEventByClass(classname, evnt, func) {
  var class_elements = document.getElementsByClassName(classname);
  for (var i = 0; i < class_elements.length; i++) {
    addEvent(class_elements[i], evnt, func);
  }
}
  
function toggle() {
  Rails.ajax({
    type: 'POST',
    url: '/subtasks/'+this.value+'/toggle',
    data: "completed=" + this.checked
  });
}

function test() {
  alert(this.checked);
}

document.addEventListener("turbolinks:load", function() {
  addEventByClass('completed', 'click', toggle);
});

