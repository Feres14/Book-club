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