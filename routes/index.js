var express = require("express");
var router = express.Router();
var employessDao = require("../repository/employeesDao");
const employeesModel = require("../model/employeesModel");
/* GET home page. */
router.get("/", function(req, res, next) {
    employessDao.findAll(req, res);
});

router.post("/insert", function(req, res, next) {
    console.log('in post');
    employees = new employeesModel({
        username: req.body.username,
        name: req.body.name,
        emDesignation: req.body.designation,
        emSalary: req.body.salary,
    });
    employessDao.insert(req, res, employees);
});

router.post('/update', function(req, res) {
    console.log('in put');
    var employees = new employeesModel({
        username: req.body.username,
        name: req.body.name,
        emDesignation: req.body.designation,
        emSalary: req.body.salary,
    });
    employessDao.update(req, res, employees);
});

router.post("/search", function(req, res) {
    data = {
        name: req.body.name,
        emSalary: req.body.salary,
        emDesignation: req.body.designation,
    };
    employessDao.search(req, res, data);
});

router.get("/update", function(req, res) {
    var username = req.query.username;
    employessDao.findById(req, res, username);
});

router.get('/delete', function(req, res) {
    var username = req.query.username;
    employessDao.delete(req, res, username);
});

module.exports = router;