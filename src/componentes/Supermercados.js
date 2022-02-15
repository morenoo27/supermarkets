function Supermercados(props) {

    let LIsupermercados = makeLiSupers(props.supermercados, props.poblacion)

    return (<ul>{LIsupermercados}</ul>)
}

/**
 * Metodo que genera una lista de elementos JSX con etiquetas li
 * @param {Array.<{nombre: string, x: Number, y:Number, clientes: Number}>} supermercados array con los supermercados
 * @param {Array.<Array.<Number>>} poblacion matriz con la poblacion totoal del mapa
 * @returns array con todas las li de la lista de supermercados
 */
function makeLiSupers(supermercados, poblacion) {

    let lista = []

    if (supermercados.length !== 0) {

        //ANTES DE NADA, CLIENTES TODOS A 0
        for (const supermercado of supermercados) {

            supermercado.clientes = 0
        }

        //COMPLETAMOS ARRAY CON LOS CLIENTES DE CADA SUPER
        supermercados = asignarClientes(supermercados, poblacion)


        let key = 0//key para los elementos
        for (const supermercado of supermercados) {

            //AÑADIMOS SUPERMERCADO A LA LISTA
            lista.push(<ul key={key}><li>{supermercado.nombre}</li><ul><li>Coordenadas: ({supermercado.x}, {supermercado.y})</li><li>Clientes totales: {supermercado.clientes}</li></ul></ul>)
            key++
        }
    }

    //devolvemos lista
    return lista
}

/**
 * Metodo que asigna la cantida de clientes que asistira a cada supermercado y devuelve el array
 * con los supermercados con sus clientes ya asignados
 * @param {Array.<{nombre: string, x: Number, y:Number, clientes: Number}>} supermercados array con los supermercados
 * @param {Array.<Array.<Number>>} poblacion matriz con la poblacion totoal del mapa
 * @returns Array definitivo para la lista
 */
function asignarClientes(supermercados, poblacion) {

    //recorremos toda la poblacion
    for (let i = 0; i < poblacion.length; i++) {
        for (let j = 0; j < poblacion[i].length; j++) {

            //miramos que posiciones del array tiene la distancia mas corta de esta posicion del mapa
            let indiceSupermercados = whatSuper(i, j, supermercados)

            //repartimos la poblacion entre los supermercados que tenemos
            let pobARep = poblacion[i][j] / indiceSupermercados.length

            //asignamos a cada super sus clientes
            for (const indice of indiceSupermercados) {

                //sumamos los clientes
                supermercados[indice].clientes += pobARep
            }
        }
    }

    //devolvemos array final
    return supermercados
}

/**
 * Metodo que identifica cual o cuales son los supermercados que estas mas cercanos al punto de referencia
 * @param {Number} i coordenada x de la matriz
 * @param {Number} j coordenada y de la matriz
 * @param {Array.<{nombre: string, x: Number, y:Number, clientes: Number}>} supermercados array con los supermercados
 * @returns array con los indices correspondientes del array supermercados
 */
function whatSuper(i, j, supermercados) {

    //obtenemos todas las distancias de ese punto hacia todos los supermercados
    let distancias = supermercados.map(supermer => Math.abs(supermer.x - i) + Math.abs(supermer.y - j))

    let indices = []

    let minima = 99

    //obtenemos el valor /valores mas peqeño/s
    for (let k = 0; k < distancias.length; k++) {

        if (minima == distancias[k]) {
            indices.push(k)
        } else if (minima > distancias[k]) {

            indices = []

            minima = distancias[k]

            //almacenamos el indice(que sera la pos del array supermercados)
            indices.push(k)
        }
    }

    //devolvemos indices
    return indices
}

export default Supermercados;