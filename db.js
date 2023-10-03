const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoUri = process.env.MONGO_URI_SLS; 
let conn = null;

async function connectDatabase () {
    if(conn == null) {
        console.log('Creating new connection to database...');
        conn = await mongoose.connect(`${mongoUri}`, {
          serverSelectionTimeoutMS: 5000,
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        return conn;
    }
    console.log('Connection already established, reusing the connection');
}

module.exports.connectDatabase = connectDatabase;