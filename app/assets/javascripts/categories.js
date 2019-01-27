// Uses new category form to edit current categories
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

function categorySearch() {
  Rails.ajax({
    type: 'GET',
    url: '/categories',
    dataType: 'script',
    data: 'search=' + this.value
  });
}

