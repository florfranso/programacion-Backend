import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
    }

    async listar(id) {
        try {
            return await this.connection(this.table).where("id", id);
        } catch (error) {
            console.log(`Error buscando objeto con el id: ${error.message}`);
        }
    }

    async listarAll() {
        try {
            return await this.connection(this.table);
        } catch (error) {
            console.log(`Error obteniendo tabla: ${error.message}`);
        }
    }

    async guardar(elem) {

    }

    async actualizar(elem) {
 
    }

    async borrar(id) {
        try {
            return await this.connection(this.table).where("id", id).del();
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando el objeto con el id solicitado: ${error.message}`
            );
        }
    }

    async borrarAll(criterio = {}) {

    }
}

export default ContenedorSQL