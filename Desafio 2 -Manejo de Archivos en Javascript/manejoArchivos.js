const fs = require('fs').promises

class Conteiner {
    constructor(path) {
        this.path = path
    };

    async save(objeto) {
        try {
            const leer = await fs.readFile(this.path, "utf-8");
            const data = JSON.parse(leer)
            let id;
            data.length === 0
                ? (id = 1)
                : (id = data[data.length - 1].id + 1);
            const newProduct = { ...objeto, id };
            data.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(data, null, 2), "utf-8")
            return newProduct.id;
        } catch (e) {
            console.log(e)
        }
    };

    async getById(id) {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            const obj = data.find (obj => obj.id === id);
            if(!obj){
                return null
            }
            return obj
        } catch (e) {
            console.log(e)
        }
    };

    async getAll() {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            return JSON.parse(leer)
        } catch (e) {
            console.log(e)
        }
    };

    async deleteById(id) {
        try {
            const leer = await fs.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            const obj = data.find (obj => obj.id !== id);
            await fs.writeFile(this.path, JSON.stringify(obj, null, 2), "utf-8")

        } catch (e) {
            console.log(e)
        }
    };

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8")
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = Conteiner;