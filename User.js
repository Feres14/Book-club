const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
    const userSchema = mongoose.Schema(
        {
         firstName: { 
         type: String,
         required: true, 
         minlength: 5,
         maxlength:30  },
          lastName: { 
            type: String, 
            required: true, 
            minlength: 5,
            maxlength:30 },
          email: { type: String, 
            required: true, 
            unique: true},
          password: { 
            type: String, 
            required: true, 
            minlength: 8 },
        },
)

// Middleware pour hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt (10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})


// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this. password);
    };
    const User = mongoose.model ('User', userSchema);


const jxt = require('jsonwebtoken');

//inscription d'un nouvel utilissateur 
exports.registerUser= async (req, res) => {
    const {username, password} = req.body;

try{
    const newuser =new UserActivation({username,password});
    await newuser.isActive();
    res.status(201).json({message: 'utilisateur crée avec succés'});

} catch(error){
    res.status(400).json ({message: error.message});
}

};

//conexion d'un utilsteur existant

exports.loginUser= async (req, res) => {
const{ username,password} = req.body;

try{
    const user =await user.findOne({username});
    if  (!user) return res.status(404).json({message: 'lutilisateur non trouvée'});
    const isMatch = await user.matchpassword(password);
    if (!isMatch) return res.status(400).json({message:'mots de passe incorrect'});

//generation d'un token jwt(voir l'anex jwt)
const token = jwt.sign ({id: user._id},process.env.JWT_SECRET,
    {expiresIn: '30d'});
    res.json({tosken});



}catch(error){
    res.status(500).json({message:error.message});
}

};

module. exports = User;