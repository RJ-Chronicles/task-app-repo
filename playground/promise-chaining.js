require('../src/db/mongoose')

const User =require('../src/models/User')

//62d244128c01558606f2f08f

// User
//     .findByIdAndUpdate('02d244128c01558606f2f08f',{age: 20})
//     .then((user)=> {
//         console.log(user)
//         return User 
//             .countDocuments({age : 20})
//     })
//     .then((result)=> console.log(result))
//     .catch((err)=> console.log(err));

const updateAndGetCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});
    return count;
}

updateAndGetCount('02d244128c01558606f2f08f',300)
.then((count)=>{
    console.log(count)
})
.catch((err)=>{
    console.log(err);
})