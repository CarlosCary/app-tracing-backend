import mysql from 'promise-mysql';
import keys from './keys';
import mongoose from 'mongoose';
import 'dotenv/config';

const pool = mysql.createPool(keys.database);
const auth:any = process.env.DB_CONNECTION;;
pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log("DB is connected");
    });

mongoose.connect(auth,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("connected to mongoDB")
    );

mongoose.set('useFindAndModify', false);
export default pool;



