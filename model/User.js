const mongoose = require("mongoose");

// Se connecter à la base de données
const mongoDB="mongodb+srv://fatimaezzahraseffari:FCUGQ3VGLmMZd6V9@cluster0.u2yqw1k.mongodb.net/?retryWrites=true&w=majority"; 
//mongoose.connect(mongoDB, function(err))
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));;
    //if (err) throw err;
//})

//user schema
const userSchema = new mongoose.Schema({  
    name:String,
    email: String,
    password:String
    
   

})
const User = new mongoose.model("membersinfo", userSchema)
 module.exports =User
 


 