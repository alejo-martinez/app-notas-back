import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import utils from '../utils/utils.js';
export const authToken = (req, res, next)=>{
    const token = utils.cookieExtractor(req);
    if(!token) return res.status(401).send({status:'error', error:'Not authenticated, login please.'})
    else {
        jwt.verify(token, config.keyJwt, (error, credentials)=>{
        if(error) return res.status(403).send({error:'not authorized'})
        else{
            req.user=credentials.user;
            next()
        }
    })
    }}