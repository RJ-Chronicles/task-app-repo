const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer');
const sharp = require('sharp');
const {sendWelcomeEmail, cencelationEmail} = require('../../emails/account');


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        //sendWelcomeemail(user.email, user.name);
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        //cencelationEmail(req.user.email, req.user.name);
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})
const erroMidleware = (req, res, next)=>{
    throw new Error('Error in the middleware')
}
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, callback){
        if(! file.originalname.match(/\.(png|jpg|jpeg)$/)){
            callback(new Error('File must be image'));
        }
        callback(undefined, true);
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 300}).png().toBuffer()
   
    req.user.avatar = req.file.buffer;
    req.user.avatar = buffer;
    console.log(req.file.buffer);
    await req.user.save();
    res.status(201).send("file created")
}, (error, req, res, next)=>{
    res.status(400).send({
        "error": error.message
    });
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.status(201).send({
        "message": "Profile image deleted"
    })
})

router.get('/users/:id/avatar',  async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }

        res.set('Content-Type','image/png');
        res.send(user.avatar);
    }catch(e){
        res.status(404).send({
            "error": "avatar not found"
        })
    }
})
module.exports = router