var app = require('express')();
require('dotenv').config();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/Assignment')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));


var employeeSchema = new mongoose.Schema({
    name: String,
    address: String,
    position: String,
    salary: Number,
    updated_at: { type: Date, default: Date.now },
});

var employeeModel = mongoose.model('Employee', employeeSchema);


function createEmployee() {

    let employeeObj = new employeeModel({
        name: "RDS one",
        address: "10th",
        position: "Sr Software engineer",
        salary: 2000
    });

    employeeObj.save();

    console.log("Employee Created", employeeObj);
};


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

/*app.listen(process.env.PORT, function() {
    console.log('listening on localhost:', process.env.PORT);
});
*/