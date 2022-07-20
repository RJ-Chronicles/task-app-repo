const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT 

const multer = require('multer');
const upload = multer({
    dest:'images',
    limits:{
        fileSize : 1000000 // 1mb
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/.(pdf|docx)$/)){//endsWith('.pdf')){
            return cb(new Error("File must be a PDF"));
        }

        cb(undefined, true);
        //cb(undefined, false);
    }
})

app.post('/upload-image',upload.single('upload'), (req, res)=>{
    res.send(200);
})
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     const task = await Task.findById('62d5567202f1bb3f305cf8e2')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

//     const user = await User.findById('62d5566202f1bb3f305cf8dd')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()