var userModel = require('./userModel');




// // Find user by email
// const findUserByEmail = async (email) => {
//     return await peoplelists.findOne({ emailId: email });
// };

// // Update user by email
// const updateUserByEmail = async (email, updatedData) => {
//     return await People.findOneAndUpdate(
//         { emailId: email },
//         { $set: updatedData },
//         { new: true } // return the updated document
//     );
// };

// // Create new user
// const createUserDBService = async (userData) => {
//     try {
//         const user = new People(userData);
//         await user.save();
//         return true;
//     } catch (err) {
//         console.error(err);
//         return false;
//     }
// };

// module.exports = {
//     createUserDBService,
//     findUserByEmail,
//     updateUserByEmail
// };



module.exports.getDataFromDBService = () => {

    return new Promise(function checkURL(resolve, reject) {
 
        userModel.find({}, function returnData(error, result) {
 
            if (error) {
                reject(false);
            } else {
         
                resolve(result);
            }
        });
 
    });
 
 }

//  module.exports.createUserDBService = (userDetails) => {


//     return new Promise(function myFn(resolve, reject) {
 
//         var userModelData = new userModel();
 
//         userModelData.name = userDetails.name;
//         userModelData.gender = userDetails.gender;
//         userModelData.emailId = userDetails.emailId;
//         userModelData.address = userDetails.address;
//         userModelData.phone = userDetails.phone;

//         userModelData.save(function resultHandle(error, result) {
 
//             if (error) {
//                 reject(false);
//             } else {
//                 resolve(result);
//             }
//         });
 
//     });
 
//  }




module.exports.createUserDBService = (userDetails) => {
    return new Promise(async function myFn(resolve, reject) {
        try {
            const existingUser = await userModel.findOne({ emailId: userDetails.emailId });

            if (existingUser) {
                // Check if all fields are the same
                const isSame =
                    existingUser.name === userDetails.name &&
                    existingUser.gender === userDetails.gender &&
                    existingUser.address === userDetails.address &&
                    existingUser.phone === userDetails.phone;

                if (isSame) {
                    return reject({ status: false, message: "User already exists" });
                } else {
                    // Update user
                    await userModel.updateOne(
                        { emailId: userDetails.emailId },
                        {
                            $set: {
                                name: userDetails.name,
                                gender: userDetails.gender,
                                address: userDetails.address,
                                phone: userDetails.phone
                            }
                        }
                    );
                    return resolve({ status: true, message: "existing people list updated successfully" });
                }
            } else {
                // Create new user
                const userModelData = new userModel({
                    name: userDetails.name,
                    gender: userDetails.gender,
                    emailId: userDetails.emailId,
                    address: userDetails.address,
                    phone: userDetails.phone
                });

                userModelData.save(function resultHandle(error, result) {
                    if (error) {
                        reject({ status: false, message: "Error creating user" });
                    } else {
                        resolve({ status: true, message: "New people list created successfully", data: result });
                    }
                });
            }
        } catch (err) {
            console.error(err);
            reject({ status: false, message: "Server error", error: err.message });
        }
    });
};



 module.exports.updateUserDBService = (id,userDetails) => {     
    console.log(userDetails);
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndUpdate(id,userDetails, function returnData(error, result) {
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }
        });
 
    });
 }

 module.exports.removeUserDBService = (id) => { 
    return new Promise(function myFn(resolve, reject) {
        userModel.findByIdAndDelete(id, function returnData(error, result) {
 
          if(error)
          {
                reject(false);
          }
          else
          {
             resolve(result);
          }          
        });
    });
 
 }