const TaskContol = require("./db/models/taks_control")

module.exports = {
    async getLasReport() {
        const results = await TaskContol.findOne({}).sort({finish_date: -1}).limit(1)
        return results
    },
    async newReport(report) {
        const newReport = new TaskContol(report)
        const savedReport = await newReport.save()
        return savedReport
    }
}