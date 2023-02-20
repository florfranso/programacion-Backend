import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
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

    async guardar(objeto) {
        try {
            await this.connection(this.table).insert(objeto);
        } catch (error) {
            console.log(`Error agregando objeto a la tabla: ${error.message}`);
        }
    }

    async actualizar(objeto) {
        try {
            await this.connection(this.table).update(objeto);
        } catch (error) {
            console.log(`Error al actualizar objeto a la tabla: ${error.message}`);
        }
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

    async borrarAll() {
        try {
            await this.connection(this.table).del();
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando los datos: ${error.message}`
            )
        }
    }

    async desconectar() {

    }
}

export default ContenedorSQL