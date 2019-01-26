Category.create!([
  {name: "Work"},
  {name: "Shopping"},
  {name: "Education"},
  {name: "Entertainment"}
])
Task.create!([
  {title: "Overdue Task", duedate: 1.day.ago.end_of_day.change(sec: 0), completed: false, comments: "Overdue Tasks have their due date colored red.", priority: 3, repeat: false},
  {title: "Medium Priority Task", duedate: Date.today.end_of_day.change(sec: 0), completed: false, comments: "Priorities can be set at four levels, None - Green, Low - Yellow, Medium - Orange and High - Red.\r\nPriority can also be easily changed on the index page. Just hover over the flag and select the new one.", priority: 2, repeat: false},
  {title: "Hover over Me then mark me completed", duedate: Date.today.change(hour: 16), completed: false, comments: "Completion is marked using a checkbox. All completed tasks (excluding those set to repeat daily), can be quickly deleted by clicking on the \"Clear Completed Tasks\" button on the index page.", priority: 3, repeat: false},
  {title: "Comments", duedate: Date.today.end_of_day.change(sec:0), completed: false, comments: "Comments can be used as short descriptions so that you don't need to click into the task to see what some of the details are.\r\nAlso, you can assign a task multiple categories by holding control when you select categories when editing a task!", priority: 2, repeat: false},
  {title: "Click Me First", duedate: 2.day.ago.end_of_day.change(sec:0), completed: false, comments: "Tasks are created from the index page, and more details can be added from the show page by clicking the 'Edit' button on the top right. When creating a task from the index page, you can only select from categories that have already been created. You can create new categories by editing a task or from the Categories tab at the top.", priority: 1, repeat: false},
  {title: "Filters", duedate: Date.today.end_of_day.change(sec: 0), completed: false, comments: "Filter through all tasks using the Filters above the task listings. Click on the \"Reset\" link to go back to the default setting.\r\nYou can filter by due date, priority, category and completion. Try them out!", priority: 3, repeat: false},
  {title: "Subtasks", duedate: Date.today.end_of_day.change(sec: 0), completed: false, comments: "Subtasks can be added to a task to keep track of smaller parts of a task. Similar to tasks, they can be marked as completed. Furthermore, they can be easily edited from the Task Details page.", priority: 1, repeat: false},
  {title: "Repeated Tasks", duedate: Date.today.end_of_day.change(sec:0), completed: false, comments: "If needed, tasks can repeat itself daily. Just Edit the task and check the Repeat Daily checkbox. If the task is marked complete, then after midnight, it, and all it's subtasks, will be marked incomplete again, with the new due date set to the next day! Repeated tasks won't be cleared by the Clear Completed button.", priority: 1, repeat: false},
  {title: "Clear Completed", duedate: Date.today.end_of_day.change(sec:0), completed: false, comments: "Now to end this tutorial off, mark all the tasks as completed and clear them all by clicking on the button in the index page.", priority: 0, repeat: false}
])
Categorising.create!([
  {task_id: 5, category_id: 3},
  {task_id: 5, category_id: 1},
  {task_id: 1, category_id: 4},
  {task_id: 1, category_id: 2},
  {task_id: 4, category_id: 3},
  {task_id: 2, category_id: 1},
  {task_id: 6, category_id: 3},
  {task_id: 3, category_id: 3},
  {task_id: 7, category_id: 3},
  {task_id: 8, category_id: 1},
  {task_id: 9, category_id: 2}
])
Subtask.create!([
  {title: "Mark me completed!", completed: false, task_id: 7},
  {title: "Completed subtask", completed: true, task_id: 7},
  {title: "Incomplete subtask", completed: false, task_id: 7}
])
