require('dotenv').config();
let app = require('express')(),
    mongoose = require('mongoose'),
    validate = require('mongoose-validator');

mongoose.connect('mongodb://localhost/Assignment')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

// validators for the name and salary
let nameValidator =
    validate({
        validator: 'matches',
        arguments: /[A-Za-z]/,
        message: 'name must be letters'
    }),
    salaryValidator =
    validate({
        validator: 'matches',
        arguments: /[0-9]/,
        message: 'salary must be a a whole number containing 0-9'
    });

// create an a schema for employee
let employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: nameValidator,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        validate: salaryValidator,
        required: true
    },
    updated_at: { type: Date, default: Date.now },
});

// create model based on schema
let employeeModel = mongoose.model('Employee', employeeSchema);

// create employee 
function createEmployee() {
    let employeeObj = new employeeModel({
        name: "Test",
        address: "10th",
        position: "Sr Software engineer",
        salary: 98.98
    });
    // save in db
    employeeObj.save(function(err) {

        if (err.errors.name) {
            console.log(err.errors.name.message);
        } else if (err.errors.salary) {
            console.log(err.errors.salary.message)
        }
    });
};

// get employees list
function getEmployee() {

    employeeModel.find({}).exec(function(err, list) {
        if (err) {
            console.log("Get employee list failed", err);
        } else {
            console.log("Employee List");
            list.forEach(function(item, index) {
                console.log("\n", item);
            });
        }
    });
};

// delete employee
function deleteEmployee(id) {

    employeeModel.remove({ _id: id }, function(err) {
        if (err) {
            console.log("Delete employee failed", err);
        } else {
            console.log("Employee deleted");
        };
    });
};

createEmployee();
//deleteEmployee("595de9a92dcc9832719d9039");
getEmployee();

app.listen(process.env.PORT, function() {
    console.log('listening on localhost:', process.env.PORT);
});