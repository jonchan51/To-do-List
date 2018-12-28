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
  let class_elements = document.getElementsByClassName(classname);
  for (let i = 0; i < class_elements.length; i++) {
    addEvent(class_elements[i], evnt, func);
  }
}
  
document.addEventListener("turbolinks:load", function() {
});

