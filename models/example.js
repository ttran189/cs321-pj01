// let emailInput = "";
// let classInput = "EXM 999";

// User.findOne({
//         email: emailInput
//     })
//     .then(userFound => {
//         if (userFound) {
//             ClassModel.findOne({
//                 classCode: classInput
//             }).then(classFound => {
//                 // How to a add classFound into userFound record?
//             });
//         }
//     });


// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     class: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'ClassModel'
//     }]
// });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;