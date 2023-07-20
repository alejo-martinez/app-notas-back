//MODULOS
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//SOCKET
import { Server } from 'socket.io';

//CONFIG
import initPassport from './config/passport.config.js';
import config from './config/config.js';

//ROUTES
import sessionRouter from './routes/session.router.js';
import notesRouter from './routes/note.router.js';

//ERRORS
import handleErrors from './middlewares/errors.middleware.js';
// console.log(config);

const app = express();
// const PORT = 8000;

const server = app.listen(config.port || 8000, ()=> console.log('server arriba'));
// const io = new Server(server);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl || 'mongodb+srv://alejoomartinex11:o9N7rH01CNM6WxEN@cluster0.bcwkccw.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:20
    }),
    secret: config.secretSession || 'secretSession',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge :1*60*60 * 1000,
        secure: true,
        sameSite: 'none'
    }
}))

initPassport();

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('CoderS3cR3tC0D3'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin:'https://localhost:3000',
    credentials:true
}))

app.use('/api/session/', sessionRouter);
app.use('/api/notes/', notesRouter);

mongoose.connect(config.mongoUrl || 'mongodb+srv://alejoomartinex11:o9N7rH01CNM6WxEN@cluster0.bcwkccw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

app.use(handleErrors);