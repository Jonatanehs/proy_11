// se importa el modulo de colores de node js
require('colors');

// fs tendra la importacion del modulo de node js filesystem 
const fs = require('fs');

// datosArchivo tendra lo importado de datosArchivo.json 
const datosArchivo = require('./datos.json');

// se crea una funcion flecha que es asincronica 
const main = async () => {
    // se limpia la consola e imprime varios mensajes en consola 
    console.clear();
    console.log(`**********************`);
    console.log(`*   Proyecto clases  *`);
    console.log('**********************');


    // se crea una clase llamada Producto 
    class Producto {

        // se encapsulan las propiedades que brindan una proteccion extra
        #codigoProducto;
        #nombreProducto;
        #inventarioProducto;
        #precioProducto;

        // se crea un metodo constructor que inicializa las propiedades de la clase 
        constructor() {

            // se le agrega un valor a cada propiedad con valores vacios 
            this.#codigoProducto = '';
            this.#nombreProducto = '';
            this.#inventarioProducto = 0;
            this.#precioProducto = 0;
        }

        // el metodo set permite darle un valor a las propiedades 
        set setCodigoProducto(value) {
            this.#codigoProducto = value;
        }

        // el metodo get permite retornar el valor de la propiedad 
        get getCodigoProducto() {
            return this.#codigoProducto;
        }

        set setNombreProducto(value) {
            this.#nombreProducto = value;
        }

        get getNombreProducto() {
            return this.#nombreProducto;
        }

        set setInventarioProducto(value) {
            this.#inventarioProducto = value;
        }

        get getInventarioProducto() {
            return this.#inventarioProducto;
        }

        set setPrecioProducto(value) {
            this.#precioProducto = value;
        }

        get getPrecioProducto() {
            return this.#precioProducto
        }


    }

    // se crea una nueva clase llamada ProductosTienda 
    class ProductosTienda {

        // la propiedad listaProductos estara encapsulada 
        #listaProductos;

        // se crea un metodo constructor que inicializa las propiedades 
        constructor() {

            // la propieda this.#listaProductos obtendra un arreglo vacio como valor 
            this.#listaProductos = [];
        }


        // el metodo get retornara el valor de listaProductos
        get getListaProductos() {
            return this.#listaProductos;
        }

        // se crea un metodo nuevo de la clase 
        cargaArchivoProductos() {

            // la variable contador contendra 0 
            let contador = 0;

            // si el valor datosArchivo es mayor que 0 ejecuta 
            if (datosArchivo.length > 0) {

                // datosArchivo itera el objeto uno en uno con un callback 
                datosArchivo.forEach(objeto => {

                    // el contador aumenta uno en uno 
                    contador++;

                    // producto tendra una instancia de clase Producto
                    let producto = new Producto;

                    // se le asigna un valor al metodo set y es lo que estara en codigoProducto
                    producto.setCodigoProducto = objeto.codigoProducto;
                    producto.setNombreProducto = objeto.nombreProducto;
                    producto.setInventarioProducto = objeto.inventarioProducto;
                    producto.setPrecioProducto = objeto.precioProducto;

                    // se añade los anteriores elementos al arreglo this.#listaProductos 
                    this.#listaProductos.push(producto);
                });

                // se imprime un mensaje en conola que indica el numero de productos cargados 
                console.log(`Total de productos cargados ==> `.bgBlue +
                    ` ${contador} `.bgRed);
                // si es falso imprime un error en la consola 
            } else {
                console.log(`Error, el archivo datos.json no contiene datos\n`.bgRed);
            }

        }

        //Se crea un metodo grabaArchivoProductos de la clase
        grabaArchivoProductos() {

            /*La constante llamada instanciaClaseAObjetos contiene la propiedad  
            getListaProductos haciendole un mapeado que es convertir objetos de clase a 
            objetos de JavaScript  y en su parametro creando una funcion flecha*/
            const instanciaClaseAObjetos = this.getListaProductos.map(producto => {

                // Se crea un return para que retorne las propiedades que se necesitan
                return {

                    //Se utiliza la propiedad codigoProducto que retorna los valores de la propiedad
                    codigoProducto: producto.getCodigoProducto,

                    //Se retorna el valor de la propiedad getNombreProducto
                    nombreProducto: producto.getNombreProducto,

                    //Se retorna el valor de la propiedad getInventarioProducto 
                    inventarioProducto: producto.getInventarioProducto,

                    //Se retorna el valor de la propiedad getPrecioProducto    
                    precioProducto: producto.getPrecioProducto
                };
            });

            /*La constante cadenaJson convierte los objetos de JavaScript a una cadena Json
            Se solicita a la variable instanciaClaseAObjetos, el uso del null no modifica 
            ningun valor del objeto y el 2 es el espacio de la sangria*/
            const cadenaJson = JSON.stringify(instanciaClaseAObjetos, null, 2);

            //La constante nombreArchivo contiene el nombre del archivo json
            const nombreArchivo = 'datos.json';

            /*EL modulo fs interactua con los archivos con una funcion sicronica como lo es 
            writeFileSync que espera a escribir los datos del archivo para continuar con la
            el codigo. dentro de este argumenta esta el nombre del archivo, la constante de 
            la cadenaJson y el estandar de los caracteres especiales*/
            fs.writeFileSync(nombreArchivo, cadenaJson, 'UTF-8');

            // Se imprime un mensaje en la consola que indica donde se guardaron los datos
            console.log(`DATOS GUARDADOS EN ${nombreArchivo}`.bgMagenta);
        }

        // Se crea un metodo de la clase ProductosTienda
        mostrarProductos() {

            // Se solicita a listaProductos donde el forEach itera sobre los archivos encontrados
            this.getListaProductos.forEach(producto => {

                // Se imprime en consola el valor de las propiedades y se les da una interfaz 
                console.log(`|    ` + producto.getCodigoProducto + `      |` +
                    `|      ` + producto.getNombreProducto + `       |` +
                    `|       ` + producto.getInventarioProducto + `     |` +
                    `|       ` + producto.getPrecioProducto + `    |`);
            })
        }
    }

    // se hace una instancia de clase de ProductosTienda 
    let productosTienda = new ProductosTienda;

    // se llama el metodo de la clase ProductosTienda
    productosTienda.cargaArchivoProductos();

    // se imprime un mensaje en consola 
    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    // se llama al metodo de la clase productosTienda
    productosTienda.mostrarProductos();

    // se retorna el valor de getListaProductos que itera uno en uno con un callback 
    productosTienda.getListaProductos.forEach(producto => {

        /* el inventarioProducto seran aleatorios entre 1 a 19 por eso se suma el 1 para que 
        este en el rango 1 20 ya que el numero decimal nunca va a llegar 1 y este resultado
        sera redondeado por un numero entero mas aproximado */
        producto.setInventarioProducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    // se imprime un mensaje en consola 
    console.log(`DATOS CIERRE TIENDA`.bgGreen);

    // se llaman los metodos de la clase ProductosTienda 
    productosTienda.mostrarProductos();

    productosTienda.grabaArchivoProductos();

}

main()