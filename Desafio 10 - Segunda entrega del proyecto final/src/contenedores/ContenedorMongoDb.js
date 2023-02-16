import { LEGAL_TLS_SOCKET_OPTIONS } from 'mongodb';
import mongoose from 'mongoose'
import config from '../config.js'

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

console.log("base de datos conectadaaa");

class ContenedorMongoDb {

    constructor(productos, esquema) {
        this.coleccion = mongoose.model(productos, esquema)
    }

    async listar(id) {
        try {
            const doc = productos.doc(`${id}`)
            const item = await doc.get()
            const response = item.data()

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    async listarAll() {
        try {
            const querySnapshop = await productos.get()
            let docs = querySnapshop.docs

            const response = docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                price: doc.data().price,
                thumbnail: doc.data(thumbnail)
            }))
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    async guardar(nuevoElem) {
        /* try {
             const doc = productos.doc(`${nuevoElem}`)
             const item = await doc.guardar()
             console.log(item);
         } catch (error) {
             console.log(error);
         }*/
    }



    async actualizar(nuevoElem) {
        try {
            const doc = productos.doc(`${nuevoElem}`)
            const item = await doc.update()
            console.log(item);

        } catch (error) {
            console.log(error);
        }

    }

    async borrar(id) {
        try {
            const doc = productos.doc(`${id}`)
            let item = await doc.delete()
            console.log(item);
        } catch (error) {
            console.log(error);
        }

    }

    async borrarAll() {
        try {
            const doc = productos.doc()
            let item = await doc.delete()
            console.log(item);
        } catch (error) {
            console.log(error);
        }
    }
}


export default ContenedorMongoDb
