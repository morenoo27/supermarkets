import { Button } from 'reactstrap';

//COMPONENTE QUE RENDERIZA EL TABLERO DEL JUEGO
function Botonera(props) {

    let tabla = []

    for (let i = 0; i < props.mapa.length; i++) {

        let linea = [];

        for (let j = 0; j < props.mapa[i].length; j++) {

            let valor = "";

            if (props.mapa[i][j] < 10) {
                valor = "0" + props.mapa[i][j]
            } else {
                valor = props.mapa[i][j]
            }

            if (props.color[i][j] !== "-") {

                linea.push(<td key={"id" + i + j}><Button color={props.color[i][j]} > {valor} </Button></td>)
            } else {
                linea.push(<td key={"id" + i + j}><Button outline onClick={() => props.accion(i, j)}> {valor} </Button></td>)
            }
        }

        let fila = <tr key={"linea" + i}>{linea}</tr>;
        tabla.push(fila)
    }

    return (<table key={0}><tbody key={1}>{tabla}</tbody></table>)
}

export default Botonera;