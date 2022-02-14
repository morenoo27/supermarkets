import React from 'react';
import { Button } from 'reactstrap';

function Formulario(props) {

    const clickaAñadir = () => {

        let inputNombre = document.getElementById('nombre')

        if (inputNombre.value === "") {

            alert("RELLENE EL CAMPO POR FAVOR")
        } else {

            props.accion(inputNombre.value)

            inputNombre.value = ''
        }
    }

    return (
        <React.Fragment>
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