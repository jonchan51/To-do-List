desc "Repeat tasks if repeat = true and completed"
task :repeat_tasks => :environment do
  Task.repeat_tasks
end
