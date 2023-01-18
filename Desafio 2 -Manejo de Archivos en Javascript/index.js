const Conteiner = require('./manejoArchivos');
const products = new Conteiner("./productos.json");

async function test() {

    const objeto1 = {
        title: 'Escuadra',
        price: 100,
        thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Squadra_45.jpg/330px-Squadra_45.jpg'
    }

    const objeto2 = {
        title: "Corrector",
        price: 300,
        thumbnail: "https://www.librerialarubrica.com/wp-content/uploads/2020/03/corrector-liquid-paper-lapiz-lapicera-7ml-paper-mate-main.jpg"
    }
    const objeto3 = {
        title: "Lapiz",
        price: 100,
        thumbnail: "https://http2.mlstatic.com/D_NQ_NP_762219-MLA40198251558_122019-W.jpg",
    }

    const objeto4 = {
        title: "Regla",
        price: 220,
        thumbnail: "https://sifer.com.ar/wp-content/uploads/2020/03/REGLA-ECONM_15-CM.-600x600.jpg"
    }
    const objeto5 = {
        title: "Goma",
        price: 150,
        thumbnail: "https://www.soyvisual.org/sites/default/files/styles/twitter_card/public/images/photos/cole_0017.jpg?itok=0z3myMni"
    }



    //await products.getAll().then(a=> console.log(a))
    await products.deleteAll()
    await products.save(objeto1)
    await products.save(objeto2)
    await products.save(objeto3)

    // await products.getById(2).then(id=>console.log(id))
   // await products.deleteById(1)

}

test()




