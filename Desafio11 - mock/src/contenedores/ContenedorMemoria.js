import { promises as fs } from 'fs'

class ContenedorMemoria {
    constructor (path) {
        this.fileName = path;
    }

    async save (mensaje) {
        try {
            let dataSinJSON = await fs.readFile(this.fileName, 'utf-8');
            const data = JSON.parse(dataSinJSON);
            const contenido = data.mensajes
            let idUltimo;
            contenido.length === 0 ? idUltimo = 0 : idUltimo = (contenido[contenido.length-1].id);
            const idNuevo = idUltimo + 1;
            contenido.id = idNuevo;
            contenido.push(mensaje);

            await fs.writeFile(this.fileName, JSON.stringify(data, null, 2), 'utf-8');
            
            let nuevaRawData = await fs.readFile(this.fileName, 'utf-8');
            const nuevaData = JSON.parse(nuevaRawData);
            console.log("El mensaje ha sido guardado correctamente: ", nuevaData);
            return nuevaData;
        }
        catch (err) {
            console.log("Error al escribir: " + err);
        }
    }
    
    async getAll () {
        try {
            const rawData = await fs.readFile(this.fileName, 'utf-8');
            const data = JSON.parse(rawData);
            return data;
        }
        catch (err) {
            console.log("Error al leer el archivo: " + err);
        }

    }

    async deleteAll () {
        try {
            await fs.writeFile(this.fileName, JSON.stringify([], null, 2), 'utf-8');
            console.log("El archivo fue borrado íntegramente.");
            return;
        }
        catch (err) {
            console.log("Error al borrar todo el archivo: " + err);
        }
    }

}

export default ContenedorMemoria



/*
class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    get(id) {
        const elem = this.elementos.find(elem => elem.id == id)
        return elem || { error: `elemento no encontrado` }
    }

    getAll() {
        return [...this.elementos]
    }

    save(elem) {

        let newId
        if (this.elementos.length == 0) {
            newId = 1
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elementos.push(newElem)
        return newElem
    }

    actualizar(elem) {
        const newElem = { ...elem, id: Number(elem.id) }
        const index = this.elementos.findIndex(p => p.id == elem.id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            this.elementos[index] = newElem
            return newElem
        }
    }

    deleteById(id) {
        const index = this.elementos.findIndex(elem => elem.id == id)
        if (index == -1) {
            return { error: `elemento no encontrado` }
        } else {
            return this.elementos.splice(index, 1)
        }
    }

    deleteAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria*/