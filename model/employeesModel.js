var mongoose = require("mongoose");

var employeesSchema = new mongoose.Schema({
    username: { type: String, index: true, unique: true },
    name: String,
    emDesignation: String,
    emSalary: Number,
});
var employeesModel = mongoose.model("Employees", employeesSchema);

module.exports = employeesModel;