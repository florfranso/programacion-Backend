const path = require("path");

const options = {
    mariaDB: {
        client:"mysql",
        connection:{
            host:"127.0.0.1",
            user:"root",
            password:"",
            database:"corderhousedb"
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
        mongoUrlSessions:"mongodb+srv://fredy:coder@coderbackend.d0kaklh.mongodb.net/sessionsDB?retryWrites=true&w=majority"
    }
}

module.exports = {options};