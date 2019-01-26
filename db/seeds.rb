Category.create!([
  {name: "Work"},
  {name: "Shopping"},
  {name: "Education"},
  {name: "Entertainment"}
])
Task.create!([
  {title: "Expired Task", duedate: "2019-01-25 15:59:00", completed: false, comments: "Expired Tasks have their due date colored red.", priority: 3, repeat: false},
  {title: "Medium Priority Task", duedate: "2019-01-28 15:59:00", completed: false, comments: "Priorities can be set at four levels, None - Black, Low - Yellow, Medium - Orange and High - Red.", priority: 2, repeat: false},
  {title: "Completed Task", duedate: "2019-01-27 15:59:00", completed: true, comments: "Completion is marked using a checkbox. All completed tasks (excluding those set to repeat daily), can be quickly deleted by clicking on the \"Clear Completed Tasks\" button on the index page.", priority: 1, repeat: false},
  {title: "Hover over Me", duedate: "2019-01-28 09:59:00", completed: false, comments: "Comments can be used as short descriptions so that you don't need to click into the task to see what some of the details are.", priority: 0, repeat: false},
  {title: "Click Me", duedate: "2019-01-23 15:59:00", completed: false, comments: "Tasks are created from the index page, and more details can be added from the show page by clicking the 'Edit' button on the top right. When creating a task from the index page, you can only select from categories that have already been created.", priority: 1, repeat: false}
])

Categorising.create!([
  {task_id: 5, category_id: 3},
  {task_id: 5, category_id: 1},
  {task_id: 1, category_id: 4},
  {task_id: 1, category_id: 2},
  {task_id: 4, category_id: 3},
  {task_id: 2, category_id: 1}
])
