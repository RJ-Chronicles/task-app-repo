const mongoose = require('mongoose');

//Connection with mongo
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
});









//--------------------------Practice code-------------------------------------


// const User = mongoose.model('User',{
//     name :{
//         type: String,
//         required: true,
//         trim : true
//     },
//     age:{
//         type : Number,
//         default: 0,
//         validate(value){
//             if(value< 0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     email:{
//         type:String,
//         required: true,
//         trim :true,
//         lowerCase: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     password:{
//         type: String,
//         required : true,
//         trim: true,
//        // minLenght: 7,
//        minlenght: 7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error ('Password should not contains password ');
//             }
//         }
//         // validate(value){
//         //     if(value.length < 7){
//         //         throw new Error('Password should have 6 or more characters');
//         //     }
//         // }
//     }
// })

// // const me = new User({
// //     name : ' Shivaji Maharaj  ',
// //     email : '  shiv@gmail.com  ',
// //     age : 250,
// //     password :"PaSsWord123"
// // })

// // me
// //     .save()
// //         .then((result)=> console.log(result))
// //             .catch((error)=>console.log(error))


// const myTask = new tasks({
//     description :"Do meditatiol every day",
// })

// myTask
//     .save()
//         .then((result)=> console.log(result))
//             .catch((error)=> console.log(error));

