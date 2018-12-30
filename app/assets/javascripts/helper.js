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


