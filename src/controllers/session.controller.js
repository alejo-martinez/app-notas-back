import utils from "../utils/utils.js";

const createUser = async(req, res)=>{
    res.send({status:'succes', message:'User created!'})
}

const userLogin = async(req, res)=>{
    try {
        const usuario = req.user;
        const acces_token =  utils.generateToken(usuario);
        res.cookie('accesToken', acces_token, {maxAge:60*60*1000, signed: true, httpOnly: true}).send({status:'succes'})
    } catch (error) {
        res.send({status:'error', error: 'Error al hacer login ' + error})
    }
}

const logOut = async(req, res)=>{
    req.session.destroy(error =>{
        if(error) {
            res.send({status:'error', message: 'no pudimos cerrar la sesion'})
        }
        else{
         res.clearCookie('accesToken').send({status: 'succes', message: 'sesion cerrada con exito'})
        }})
}

const current = async(req, res) =>{
    const user = req.user;
    res.send({status:'succes', payload: user})
}

export default {
    createUser,
    userLogin,
    logOut,
    current
}