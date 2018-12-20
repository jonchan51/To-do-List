# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

  Task.create({ title: 'Run', duedate: 1.day.from_now }).
       categories.first_or_create!({ name: 'Health' })
  Task.create({ title: 'Swim', duedate: 2.day.from_now }).
       categories.first_or_create!({ name: 'Health' })
  Task.create({ title: 'Part-Time', duedate: 2.day.from_now }).
       categories.first_or_create!({ name: 'Money' })
  Task.create({ title: 'Dive', duedate: 1.day.from_now }).
       categories.first_or_create!({ name: 'Health' })
  Task.create({ title: 'Work', duedate: 7.day.from_now }).
       categories.first_or_create!({ name: 'School' })

