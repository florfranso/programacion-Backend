class Contenedor {
    constructor() {
        this.productos = [];
    }


    getAll() {
        return this.productos;
    }

    getById(id) {
        const obj = this.productos.find((producto) => producto.id === id);
        if (obj) {
            return obj
        } else {
            return "El producto no existe"
        }
    }

    create(obj) {
        const arrayIds = this.productos.map((producto) => producto.id);
        const idMax = arrayIds.length === 0 ? 0 : Math.max(...arrayIds);
        const id = idMax + 1;
        const newObj = { id, ...obj };
        this.productos.push(newObj);
        return newObj;
    }

    updateById(id, obj) {
        const foundObj = this.productos.find((producto) => producto.id === id);
        if (foundObj) {
            const filteredProductos = this.productos.filter(
                (producto) => producto.id !== id);
            const newObj = { id, ...obj };
            this.productos = [...filteredProductos, newObj];
            return newObj

        } else {
            return "ERROR"
        }
    }

    deleteById(id) {
        const foundObj = this.productos.find((producto) => producto.id === id);
        if (foundObj) {
            const filteredProductos = this.productos.filter(
                (producto) => producto.id !== id
            );
            this.productos = [...filteredProductos];
            return this.productos
        } else {
            return "El producto no puede ser eliminado"
        }
    }
}

        module.exports = Contenedor;


