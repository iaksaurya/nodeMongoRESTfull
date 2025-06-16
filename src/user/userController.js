var userService = require('./userService');

var getDataConntrollerfn = async (req, res) =>
{
    var peoplelists = await userService.getDataFromDBService();
    res.send({ "status": true, "data": peoplelists });
}

var createUserControllerFn = async (req, res) => 
{
    var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}

// var createUserControllerFn = async (req, res) => {
//     userService.createUserDBService(req.body)
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((error) => {
//             res.send(error);
//         });
// };




var updateUserController = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    var result = await userService.updateUserDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "User Updated"} );
     } else {
         res.send({ "status": false, "message": "User Updated Failed" });
     }
}

var deleteUserController = async (req, res) => 
{
     console.log(req.params.id);
     var result = await userService.removeUserDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "User Deleted"} );
     } else {
         res.send({ "status": false, "message": "User Deleted Failed" });
     }
}
module.exports = { getDataConntrollerfn, createUserControllerFn,updateUserController,deleteUserController };

