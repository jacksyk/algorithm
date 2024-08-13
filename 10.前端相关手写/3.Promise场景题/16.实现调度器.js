const scheduler = new Schedular(2)
const addTask = (time, order) => {
    scheduler.add(time, order)
}
addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")
scheduler.taskStart()
