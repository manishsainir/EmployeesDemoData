var mongoose = require("mongoose");
var employeesModel = require("../model/employeesModel");

mongoose.connect("mongodb://localhost:27017/EmployeesTest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

function findAll(req, res) {
    employeesModel.find(function(err, data) {
        if (err) throw err;
        console.log(data);
        res.render("index", { doc: data });
    });
}

module.exports.insert = function(req, res, employees) {
    employees.save(function(err, data) {
        if (err) res.send(403, "username should be unique");
        findAll(req, res);
    });
};

module.exports.search = function(req, res, data) {
    var find = {};
    if (data.name != "" && data.emSalary != "" && data.emDesignation != "") {
        find = data;
        find.name = { '$regex': data.name, $options: 'i' };
        find.emDesignation = { '$regex': data.emDesignation, $options: 'i' };
    } else if (
        data.name != "" &&
        data.emSalary != "" &&
        data.emDesignation == ""
    ) {
        find = {
            name: { '$regex': data.name, $options: 'i' },
            emSalary: data.emSalary
        };
    } else if (
        data.name != "" &&
        data.emSalary == "" &&
        data.emDesignation != ""
    ) {
        find = {
            name: { '$regex': data.name, $options: 'i' },
            emDesignation: { '$regex': data.emDesignation, $options: 'i' }
        };
    } else if (
        data.name != "" &&
        data.emSalary == "" &&
        data.emDesignation == ""
    ) {
        find = {
            name: { '$regex': data.name, $options: 'i' }
        };
    } else if (
        data.name == "" &&
        data.emSalary != "" &&
        data.emDesignation != ""
    ) {
        find = {
            emSalary: data.emSalary,
            emDesignation: { '$regex': data.emDesignation, $options: 'i' }
        };
    } else if (
        data.name == "" &&
        data.emSalary != "" &&
        data.emDesignation == ""
    ) {
        find = {
            emSalary: data.emSalary,
        };
    } else if (
        data.name == "" &&
        data.emSalary == "" &&
        data.emDesignation != ""
    ) {
        find = {
            emDesignation: { '$regex': data.emDesignation, $options: 'i' }
        };
    }

    employeesModel.find(find, function(err, doc) {
        if (err) throw err;
        res.render("index", { doc: doc });
    });
};

module.exports.findAll = findAll;