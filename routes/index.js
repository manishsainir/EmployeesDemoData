var express = require("express");
var router = express.Router();
var employessDao = require("../repository/employeesDao");
const employeesModel = require("../model/employeesModel");
/* GET home page. */
router.get("/", function(req, res, next) {
    employessDao.findAll(req, res);
});

router.post("/insert", function(req, res, next) {
    employees = new employeesModel({
        username: req.body.username,
        name: req.body.name,
        emDesignation: req.body.designation,
        emSalary: req.body.salary,
    });
    employessDao.insert(req, res, employees);

});

router.post("/search", function(req, res) {
    data = {
        name: req.body.name,
        emSalary: req.body.salary,
        emDesignation: req.body.designation,
    };
    employessDao.search(req, res, data);
});

module.exports = router;