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

const app = express();
const PORT = 8000;

const server = app.listen(PORT, ()=> console.log('server arriba'));
const io = new Server(server);

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:20
    }),
    secret: config.secretSession,
    resave: false,
    saveUninitialized: false
}))

initPassport();

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('CoderS3cR3tC0D3'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin:'/',methods:['GET','POST','PUT', 'DELETE']}))

app.use('/api/session/', sessionRouter);
app.use('/api/notes/', notesRouter);

mongoose.connect(config.mongoUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

app.use(handleErrors);