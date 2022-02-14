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

        let i = 0

        let arrayClientes = clientes(poblacion, supermercados)

        supermercados.map(supermercado => {

            let nombre = supermercado.nombre
            let x = supermercado.x
            let y = supermercado.y
            let clientes = arrayClientes[i]

            lista.push(<ul key={i}><li>{nombre}</li><ul><li>Coordenadas: ({x}, {y})</li><li>Clientes totales: {clientes}</li></ul></ul>)

            i++
        })
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
function clientes(poblacion, supermercados) {

    let listadoClientes = Array(supermercados.length)

    if (supermercados.length == 1) {

        let clientes = 0

        for (let i = 0; i < poblacion.length; i++) {
            for (let j = 0; j < poblacion[i].length; j++) {

                clientes += poblacion[i][j]
            }
        }

        listadoClientes[0] = clientes
    } else {

        //vamos recorriendo toda la matriz
        for (let i = 0; i < poblacion.length; i++) {
            for (let j = 0; j < poblacion[i].length; j++) {

                //obtenemos posicion/es
                let supermercado = superCercano(i, j, poblacion, supermercados)

                //filtrado de accion
                if (Array.isArray(supermercado)) {

                    //reparto de clientes
                    let clientesARepartir = poblacion[i][j] / supermercado.length

                    //asignacion de clientes
                    for (let i = 0; i < supermercado.length; i++) {

                        listadoClientes[supermercado[i]] += clientesARepartir
                    }

                } else {
                    //asignamos todos los clientes
                    listadoClientes[supermercado] += poblacion[i][j]
                }
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
                let longX = Math.abs(x - i)
                let longY = Math.abs(j - y)

                let cat1 = longX * longX
                let cat2 = longY * longY

                let distancia = Math.sqrt(cat1 + cat2)

                let indice = 0
                let thisSuper = supermercados.find(supermer => supermer.x === i && supermer.y === j)
                for (let i = 0; i < supermercados.length; i++) {
                    if (supermercados[i] === thisSuper) {
                        indice = i
                        break;
                    }
                }

                distancias.push({ long: distancia, supermercado: indice })
            }
        }
    }

    //OBTENEMOS LA LONGITUD MAS CORTA Y DEVOLVEMOS LA POSICION DEL SUPERMERCADO EN LA LISTA
    let respuesta = distancias.filter(dist => dist === Math.min(distancias))

    if (respuesta.length === 1) {
        return respuesta[0].supermercado
    } else {

        return respuesta.map(pos => pos.supermercado)
    }
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