import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';


const cookieExtractor = req =>{
    let token = null;
    if(req && req.signedCookies) token = req.signedCookies['accesToken'];
    return token;
};

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const generateToken = (user) =>{
    const token = jwt.sign({user}, config.keyJwt, {expiresIn:'24h'});
    return token; 
}

const actualDate = ()=>{
    const date = new Date()
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const year = date.getFullYear();
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const fecha = {dia: dia, mes: mes, year: year, hora: hora, minutos: minutos};
    return fecha;
}

export default {
    cookieExtractor,
    createHash,
    isValidPassword,
    generateToken,
    actualDate
}