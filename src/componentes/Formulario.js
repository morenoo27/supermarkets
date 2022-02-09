import React from 'react';
import { Button } from 'reactstrap';

function Formulario(props) {

    const clickaAñadir = () => {

        let inputNombre = document.getElementById('nombre')
        console.log(inputNombre.innerHTML);
    }

    return (
        <React.Fragment>
            <h1>FORMULARIO</h1>
            <form>
                <p>
                    <label htmlFor="nombre">Introduzca nombre del Supermercado:</label> <br />
                    <input type="text" id='nombre' name='nombre' />
                </p>
                <Button onClick={clickaAñadir}>Añadir supermercado</Button>
            </form>
        </React.Fragment>
    )
}

export default Formulario;