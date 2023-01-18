class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({ nombre: nombre, autor: autor });
    }

    getBookNames() {
        let nombresLibros = this.libros.map(({ nombre}) => {
            return nombre;
        })
        console.log(nombresLibros);
    }
}


let usuario = new Usuario("Florencia", "Pérez", [{nombre:"Crepúsculo", autor: "Stephenie Meyer" },{nombre:"El Alquimista", autor: "Paulo Coelho" }], ["More", "Tiki"]);

console.log(usuario.getFullName());
usuario.addMascota("Sasha");
console.log(usuario.countMascotas());
usuario.addBook("Lo que el viento se llevo", "Margaret Mitchell");
usuario.getBookNames();