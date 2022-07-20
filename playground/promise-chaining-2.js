require('../src/db/mongoose')

const Task =require('../src/models/task')

// Task
// .findByIdAndDelete('62d25ad8696652f95f4b4f57')
// .then((result)=>{
//     console.log(result)
//     return Task.countDocuments({
//         completed : false
//     });
// })
// .then((res_count)=>{
//     console.log(res_count)
// })
// .catch((error)=>{
//     console.log(error)
// })

const findAndUpdateTaskForCount = async(id, completed)=>{
    const task = await Task.findByIdAndUpdate(id, {completed});
    const count = await Task.countDocuments({completed});
    return count;
}

findAndUpdateTaskForCount('62d25ad6696652f95f4b4f55', true)
.then((count)=> console.log(count))
.catch((err)=> console.log(err));