const sgMail = require('@sendgrid/mail');
//const sendgridAPIKey = '';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to:email,
        from:'rajendra.jondhalekar@cognizant.com',
        subject:'Thanks for joining in!',
        text: `Welcom to the app, ${name}. Let me know how you get along with the app`,
        html:''
    })
}
const cencelationEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from:'',
        subject:'Sorry to see you go!',
        text:`Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}
module.exports ={
    sendWelcomeEmail,
    cencelationEmail
}


/*

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

app.get('/email', (req, res)=>{
    const transporter = nodemailer.createTransport({
        auth:{
            user :"stramdevelopers36@gmail.com",
            pass:"eyzzjntmehsmrkpx"
        }
    })
    
    const options ={
        from :"stramdevelopers36@gmail.com",
        to : "marsraaj45@gmail.com",
        subject:"sending email with node js",
        text:"simple mail sending"
    }
    
    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
            return;
        }
        console.log('send : '+ info.response);
    })
    res.send("hello");
})

app.listen(3000, (req, res)=>{
    console.log("run")
})



*/