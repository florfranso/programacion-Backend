import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    //databaseURL: 'https://trabajo-backend-2ebce.firebaseio.com'
})

console.log("base de datos conectada");

const db = admin.firestore();

class ContenedorFirebase {

    constructor(productos) {
        this.coleccion = db.collection('productos')
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

    async desconectar() {
        
    }
}

export default ContenedorFirebase