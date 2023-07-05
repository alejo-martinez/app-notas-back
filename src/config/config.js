import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    keyJwt: process.env.KEY_JWT,
    secretSession: process.env.SECRET_SESSION
}