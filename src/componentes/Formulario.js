import React from 'react';
import { Button } from 'reactstrap';

function Formulario(props) {

    const clickaAñadir = () => {

        let inputNombre = document.getElementById('nombre')

        if (inputNombre.value == "") {

            alert("RELLENE EL CAMPO POR FAVOR")
        } else {

            document.getElementById('añadir').disabled = true;

            props.accion(inputNombre.value)

        }


    }

    return (
        <React.Fragment>
            <h1>FORMULARIO</h1>
            <form>
                <p>
                    <label htmlFor="nombre">Introduzca nombre del Supermercado:</label> <br />
                    <input type="text" id='nombre' name='nombre' />
                </p>
                <Button id="añadir" onClick={clickaAñadir}>Añadir supermercado</Button>
            </form>
        </React.Fragment>
    )
}

export default Formulario;