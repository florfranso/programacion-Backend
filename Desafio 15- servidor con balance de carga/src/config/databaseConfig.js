//const path = require("path");
import path from 'path';
import minimist from 'minimist';

//definir argumentos y valores por defecto
const argOptions = {alias:{m:"modo",p:"port"}, default:{modo:"FORK", port:8080}};

const objArguments = minimist(process.argv.slice(2), argOptions);
// console.log(objArguments);



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
            filename:path.join("../DB/chatdb.sqlite")
        },
        useNullAsDefault:true
    },

    server:{
        MODO: objArguments.modo,
        PORT: objArguments.port
    },
    mongoDB:{
        mongoUrlSessions:"mongodb+srv://coder_c20:coder_c20_pwd@cluster0.jo23qoz.mongodb.net/sessionsDB?retryWrites=true&w=majority",
    }
}

export default options;