import { connect } from "mongoose";
import { config } from "dotenv";

config();

const mongoUri = process.env.MONGO_URI_SLS; 
let conn = null;

async function connectDatabase () {
    if(conn == null) {
        console.log('Creating new connection to database...');
        conn = connect(`${mongoUri}`, {
          serverSelectionTimeoutMS: 5000,
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        return conn;
    }
    console.log('Connection already established, reusing the connection');
}

const _connectDatabase = connectDatabase;
export { _connectDatabase as connectDatabase };