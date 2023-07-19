// MODULES
import passport from "passport";
import local from 'passport-local';
import jwt from 'passport-jwt';

//MODELS
import { userModel } from "../DAO/models/user.model.js";

//UTILS
import utils from "../utils/utils.js";

//CONFIG
import config from "./config.js";
import userDTO from "../DAO/DTO/user.dto.js";
import UserManager from "../DAO/class/user.class.js";

const JWTStrategy = jwt.Strategy;
const LocalStrategy = local.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const userManager = new UserManager();

const initPassport = ()=>{
    passport.use('jwt', new JWTStrategy({jwtFromRequest:ExtractJWT.fromExtractors([utils.cookieExtractor]), secretOrKey: config.keyJwt || 'KeyParaJwt'}, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload.user);
        } catch (error) {
            return done(error);
        }
    }))

    passport.use('register', new LocalStrategy({passReqToCallback:true, usernameField:'email'}, async(req, username, passport, done)=>{
        const {name, last_name, nickname, email, password} = req.body;
        try {
            const user = await userManager.getByEmail(username);
            if(user) done(null, false,{message:'Usuario registrado con el email ingresado'});
            else{
                const usuario = new userDTO(name, last_name, nickname, email, password);
                const newUser = await userManager.create(usuario);
                return done(null, newUser);
            }
        } catch (error) {
            return done('Error al hacer el registro ' + error)
        }
    }))

    passport.use('login', new LocalStrategy({passReqToCallback:true, usernameField:'email'}, async(req, username, passport, done)=>{
        try {
        const {password} = req.body || undefined;
        const usuario = await userManager.getByEmail(username);
            if(!password) done(null, false, {message:'Debes ingresar una contraseña'});
            if(!usuario || !utils.isValidPassword(usuario, password)) return done(null, false, {message:'Contraseña o usuario invalido'});
            else done(null, usuario, {message: 'Logued'});
        } catch (error) {
            return done('Error al iniciar sesión ' + error);
        }
    }))

    passport.serializeUser((user, done) =>{
        done(null, user._id)
        })

    passport.deserializeUser(async(id, done) =>{
        let usuario = await userModel.findOne({_id: id})
        done(null, usuario)
        })
}

export default initPassport;