function Supermercados(props) {

    let LIsupermercados = makeLiSupers(props.supermercados, props.poblacion)

    return (<ul>{LIsupermercados}</ul>)
}

/**
 * Metodo que genera una lista de elementos JSX con etiquetas li
 * @param {Array.<Object>} supermercados array con los supermercados en tipo Object { nombre: "ej", x: "ej", y: "ej" }
 * @param {Array.<Array.<Number>>} poblacion matriz con la poblacion totoal del mapa
 * @returns array con todas las li de la lista de supermercados
 */
function makeLiSupers(supermercados, poblacion) {

    let lista = []

    if (supermercados != null) {

        let arrayClientes = getClientes(poblacion, supermercados)

        for (let i = 0; i < supermercados.length; i++) {

            let supermercado = supermercados[i]

            let nombre = supermercado.nombre
            let x = supermercado.x
            let y = supermercado.y
            let clientesTotales = arrayClientes[i]

            lista.push(<ul key={i}><li>{nombre}</li><ul><li>Coordenadas: ({x}, {y})</li><li>Clientes totales: {clientesTotales}</li></ul></ul>)
        }
    }

    return lista
}

/**
 * metodo que genera un array que asocia la cantidad de clientes que asistiran a cada supermercado.
 * La forma en la que se devuelve el array sera asociativa, es decir, la posicion 1 del 
 * listado de clientes, equivale a los clientes que asistiran al supermercado en la posicion
 * 1 del array de supermercados
 * @param {Array.<Array.<Number>>} poblacion matriz con la poblacion totoal del mapa
 * @param {Array.<Object>} supermercados Array con los objetos supermercados
 * @returns Array con los clientes para cada supermercado
 */
function getClientes(poblacion, supermercados) {

    //creamos array asociativo con los clientes de cada super
    let listadoClientes = Array(supermercados.length)

    //caso de un solo supermercado
    if (supermercados.length == 1) {

        let clientesSuper = 0

        for (const fila of poblacion) {
            for (const habitantes of fila) {
                clientesSuper += habitantes
            }
        }

        listadoClientes[0] = clientesSuper
    } else {

        //a cada posicion, le asignamos la cantidad de clientes
        listadoClientes = asignarClientes(listadoClientes, poblacion, supermercados)

    }

    return listadoClientes
}

function asignarClientes(listadoClientes, poblacion, supermercados) {

    //vamos recorriendo toda la matriz
    for (let i = 0; i < poblacion.length; i++) {
        for (let j = 0; j < poblacion[i].length; j++) {

            //nos centramos cada vez en una posicion

            //miramos cual es el super mas cercano
            let supermercado = superCercano(i, j, poblacion, supermercados)

            //filtrado de respuesta
            if (Array.isArray(supermercado)) {

                //reparto de clientes
                let clientesARepartir = poblacion[i][j] / supermercado.length

                //asignacion de clientes
                for (const posicion of supermercado) {

                    listadoClientes[posicion] += clientesARepartir
                }

            } else {
                //asignamos todos los clientes
                listadoClientes[supermercado] += poblacion[i][j]
            }
        }
    }

    return listadoClientes
}

/**
 * Metodo que obtiene todas las distancias desde x punto hasta todos los supermercados,
 * y selecciona la o las longitudes mas cercana/s al punto de referencia
 * @param {Number} x coordenada x del punto de referencia
 * @param {Number} y coordenada y del punto de referencia
 * @param {Array.<Array.<Number>>} poblacion matriz con la poblacion totoal del mapa
 * @param {Array.<Object>} supermercados Array con los objetos supermercados
 * @returns posicion | posiciones del supermercado mas cercano en el array supermercados
 */
function superCercano(x, y, poblacion, supermercados) {

    //ALMACENAMOS DISTANCIAS
    let distancias = []

    for (let i = 0; i < poblacion.length; i++) {
        for (let j = 0; j < poblacion[i].length; j++) {

            if (isSuper(i, j, supermercados)) {
                console.log("coordenada super\nMiramos indice");

                let longX = Math.abs(x - i)
                let longY = Math.abs(j - y)

                let cat1 = longX * longX
                let cat2 = longY * longY

                let distancia = Math.sqrt(cat1 + cat2)

                let indice = getIndiceSuper(i, j, supermercados)


                distancias.push({ long: distancia, supermercado: indice })
            }
        }
    }

    let longitudes = distancias.map(e => e.long)

    //OBTENEMOS LA LONGITUD MAS CORTA Y DEVOLVEMOS LA POSICION DEL SUPERMERCADO EN LA LISTA
    let respuesta = distancias.filter(dist => dist.long === Math.min(longitudes))

    if (respuesta.length === 1) {
        return respuesta[0].supermercado
    } else {

        return respuesta.map(pos => pos.supermercado)
    }
}

/**
 * 
 * @param {*} i 
 * @param {*} j 
 * @param {*} supermercados 
 * @returns 
 */
function getIndiceSuper(i, j, supermercados) {

    let thisSuper = supermercados.find(supermer => supermer.x === i && supermer.y === j)
    for (let k = 0; k < supermercados.length; k++) {
        if (supermercados[k] === thisSuper) {
            console.log("Super:");
            console.log(thisSuper);
            console.log(k);
            return k;
        }
    }

    return null;
}

/**
 * Metodo que comprueba si una posicion es o no un supermercado
 * @param {Number} x coordenada x del punto de referencia
 * @param {Number} y coordenada y del punto de referencia
 * @param {Array.<Object>} supermercados Array con los objetos supermercados
 * @returns true => es supermercado | false => no lo es
 */
function isSuper(x, y, supermercados) {
    return supermercados.find(supermer => supermer.x === x && supermer.y === y) !== undefined ? true : false
}

export default Supermercados;