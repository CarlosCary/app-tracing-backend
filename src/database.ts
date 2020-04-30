import mysql from 'promise-mysql';


import mongoose from 'mongoose';
import 'dotenv/config';


const auth:any = process.env.DB_CONNECTION;;

mongoose.connect(auth,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("connected to mongoDB")   
    );

mongoose.set('useFindAndModify', false);
export default mongoose;



