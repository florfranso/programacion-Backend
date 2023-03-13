//const path = require("path");
import path from 'path'


const options = {
    mariaDB: {
        client:"mysql",
        connection:{
            host:"127.0.0.1",
            user:"root",
            //password:"",
            database:"MiPrimerDB"
        }
    },
    sqliteDB:{
        client:"sqlite",
        connection:{
            filename:path.join(__dirname, "../DB/chatdb.sqlite")
        },
        useNullAsDefault:true
    },
    mongoDB:{
        mongoUrlSessions:"mongodb+srv://coder_c20:coder_c20_pwd@cluster0.jo23qoz.mongodb.net/sessionsDB?retryWrites=true&w=majority"
    }
}

//module.exports = {options};
export default {options};