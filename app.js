const express = require("express"); 
const app = express() 
const mongoose = require("mongoose");
const User =require("./model/User")
const contact =require("./model/Msg")

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");
app.use(express.json())

app.use(express.static("public/img"));
 app.use(express.static("public/css"));

 const { name } = require("ejs");
 const bodyParser = require('body-parser'); 
const Msg = require("./model/Msg");
 app.use(bodyParser.urlencoded({ extended: true }))   

 
 app.get('/', function(req, res) {
    res.render("home.ejs")
    });
    app.get('/reset', function(req, res) {
       
        res.render('reset.ejs');
      });
      app.get('/home', function(req, res) {
       
        res.render('home.ejs');
      });
      app.get('/create', function(req, res) {
     
        res.render('index.ejs');
      });
      app.get('/start', function(req, res) {
     
        res.render('start.ejs');
      });
      app.get('/sommaire', function(req, res) {
     
        res.render('sommaire.ejs');
      });
      app.get('/preface', function(req, res) {
     
        res.render('page1.ejs');
      });
      app.get('/next', function(req, res) {
     
        res.render('page2.ejs');
      });
      app.get('/next2', function(req, res) {
     
        res.render('page3.ejs');
      });
      app.get('/next3', function(req, res) {
     
        res.render('page4.ejs');
      });
      app.get('/next4', function(req, res) {
     
        res.render('page5.ejs');
      });
      app.get('/next5', function(req, res) {
     
        res.render('page6.ejs');
      });
      app.get('/next6', function(req, res) {
     
        res.render('page7.ejs');
      });
      app.get('/next7', function(req, res) {
     
        res.render('quiz1.ejs');
      });
      app.get('/next8', function(req, res) {
     
        res.render('page8.ejs');
      });
      app.get('/next9', function(req, res) {
     
        res.render('page9.ejs');
      });
      app.get('/next10', function(req, res) {
     
        res.render('page10.ejs');
      });
      app.get('/next11', function(req, res) {
     
        res.render('page11.ejs');
      });
      app.get('/next12', function(req, res) {
     
        res.render('page12.ejs');
      });
      app.get('/next13', function(req, res) {
     
        res.render('page13.ejs');
      });
      app.get('/next14', function(req, res) {
     
        res.render('page14.ejs');
      });
      app.get('/next15', function(req, res) {
     
        res.render('page15.ejs');
      });
      app.get('/next16', function(req, res) {
     
        res.render('page16.ejs');
      });
      app.get('/next17', function(req, res) {
     
        res.render('page17.ejs');
      });
      app.get('/next18', function(req, res) {
     
        res.render('page18.ejs');
      });
      app.get('/next19', function(req, res) {
     
        res.render('page19.ejs');
      });
      app.get('/next20', function(req, res) {
     
        res.render('page20.ejs');
      });
      app.get('/next21', function(req, res) {
     
        res.render('page21.ejs');
      });
      app.get('/next22', function(req, res) {
     
        res.render('page22.ejs');
      });
      app.get('/next23', function(req, res) {
     
        res.render('page23.ejs');
      });
      app.get('/next24', function(req, res) {
     
        res.render('page24.ejs');
      });
      app.get('/next25', function(req, res) {
     
        res.render('page25.ejs');
      });
      app.get('/next26', function(req, res) {
     
        res.render('page26.ejs');
      });
      app.get('/next27', function(req, res) {
     
        res.render('page27.ejs');
      });
      app.get('/next28', function(req, res) {
     
        res.render('page28.ejs');
      });
      app.get('/next29', function(req, res) {
     
        res.render('page29.ejs');
      });
      app.get('/next30', function(req, res) {
     
        res.render('page30.ejs');
      });
      app.get('/next31', function(req, res) {
     
        res.render('page31.ejs');
      });
      app.get('/contact', function(req, res) {
     
        res.render('contact.ejs');
      });
      app.get('/next33', function(req, res) {
     
        res.render('page33.ejs');
      });
      app.get('/next34', function(req, res) {
     
        res.render('quiz2.ejs');
      });
      //sing up

    app.post("/signup",(req,res)=>{ 
        const  {name,email,password} =req.body;
         User.findOne({email:email},(err,user)=>{ 
            console.log(User)
            if(user){ 
        res.send({message:"user already exist"}) 
    }else {
        
        const user = new User({name,email,password}) 
        user.save(err=>{ 
            if(err){ 
                res.send(err.message) 
    }else{ 
        res.send({message:"sucessfull"}) 
} 
}) 
} 
}) 
})
app.post("/Login",(req,res)=>{ 
    const {email,password} =req.body; 
    User.findOne({email:email},(err,user)=>{
         if(user){ if(password === user.password){ 
            res.render("start.ejs") 
        }else{ res.send({message:"wrong credentials"}) }
     }else{
     res.send("not register") }
     })
    })

   



    app.post('/reset', function(req, res) {
        // Check if a user with the provided email or username exists
        User.findOne({ $or: [{ email: req.body.email }, { username: req.body.email }] }, function(err, user) {
          if (err) {
            console.error(err);
            req.flash('error', 'An error occurred. Please try again.');
            res.redirect('/reset');
          } else if (!user) {
            req.flash('error', 'No account with that email or username was found.');
            res.redirect('/reset');
          } else {
            // Generate a password reset token
            const token = crypto.randomBytes(20).toString('hex');
      
            // Set the reset token and expiration date for the user
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
            user.save(function(err) {
              if (err) {
                console.error(err);
                req.flash('error', 'An error occurred. Please try again.');
                res.redirect('/reset');
              } else {
                // Send the password reset email
                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS
                  }
                });
                const mailOptions = {
                  from: 'no-reply@example.com',
                  to: user.email,
                  subject: 'Password Reset',
                  text:
                    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' +
                    req.headers.host +
                    '/reset/' +
                    token +
                    '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transporter.sendMail(mailOptions, function(err) {
                  if (err) {
                    console.error(err);
                    req.flash('error', 'An error occurred. Please try again.');
                    res.redirect('/reset');
                  } else {
                    req.flash('success', 'An email has been sent to ' + user.email + ' with further instructions.');
                    res.redirect('/reset');
                  }
                });
              }
            });
          }
        });
      });

      
    app.post("/contact",(req,res)=>{ 
      const  {name,email,message1} =req.body;
       Msg.findOne({email:email},(err,user)=>{ 
          console.log(Msg)
          if(user){ 
      res.send({message:"user already exist"}) 
  }else {
      
      const msg = new Msg({name,email,message1}) 
    msg.save(err=>{ 
          if(err){ 
              res.send(err.message) 
  }else{ 
      res.send({message:"sucessfull"}) 
} 
}) 
} 
}) 
})
//
      
    




app.listen(3000, () => 
{ console.log("Server is Running") })