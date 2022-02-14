function Supermercados(props) {

    let LIsupermercados = makeLiSupers(props.supermercados)

    return (<ul>{LIsupermercados}</ul>)
}

/**
 * metodo que gfenera una lis de elementos JSX con etiquetas li
 * @param {Array.<Object>} supermercados array con los supermercados en tipo Object { nombre: "ej", x: "ej", y: "ej" }
 */
function makeLiSupers(supermercados) {

    let lista = []

    if (supermercados != null) {

        supermercados.map(supermercado => {

            let nombre = supermercado.nombre
            let x = supermercado.x
            let y = supermercado.y
            let clientes = 0

            lista.push(<ul><li>{nombre}</li><li>Coordenadas: ({x}, {y})</li><li>Clientes totales: {clientes}</li></ul>)
        })
    }

    return lista
}

export default Supermercados;