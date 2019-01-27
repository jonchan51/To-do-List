# CVWO Assignment
Chan Wai Hon Jonathan - A0189909E

## Setup

1. Clone this repository
2. Assuming you have Rails set up, run 
```
bundle install
rails db:migrate
rails db:seed [Optional]
rails server
```
3. Go to localhost:3000 on your browser.

## Features

Demo: [Heroku Link](https://to-do-list-9909.herokuapp.com)

- CRUD tasks
- Tasks contain the following information:
  - Name of Task
  - Categories
  - Due Date
  - Priority Level
  - Comments
  - Subtasks
- Tasks can repeat daily
- Filter through tasks by Priority, Category and Completion

## Tutorial

Include ```rails db:seed``` as part of your setup to follow the tutorial.

End it off by marking all tasks as complete and pressing the "Clear Completed
Tasks" button.

