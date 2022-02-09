import './App.css';
import React, { Component } from 'react';
import Formulario from "./componentes/Formulario";
import Botonera from "./componentes/Botonera";
import Supermercados from "./componentes/Supermercados";


class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      poblacion: [[0, 5, 4, 2, 9, 8, 0, 8, 8],
      [1, 7, 21, 23, 44, 5, 3, 4, 0],
      [2, 6, 32, 22, 33, 8, 4, 2, 8],
      [1, 2, 43, 4, 56, 65, 34, 11, 8],
      [2, 22, 32, 3, 42, 62, 43, 21, 0],
      [2, 2, 23, 34, 64, 24, 42, 15, 7],
      [0, 2, 36, 43, 61, 26, 64, 12, 0],
      [1, 2, 15, 43, 34, 2, 12, 2, 3],
      [1, 0, 12, 3, 0, 0, 21, 2, 3]],

      colores: Array(9).fill(null).map(pos => Array(9).fill("-")),

      supers: [],

      newSuper: { nombre: null, x: null, y: null },

      seVeForm: false
    }
  }

  click(x, y) {

    if (!this.state.seVeForm) {

      let copiaColores = this.state.colores

      copiaColores[x][y] = "warning"

      this.setState({
        colores: copiaColores,
        seVeForm: true
      })

    } else {

      alert("REGISTRE EL NUEVO SUPERMERCADO POR FAVOR")
    }
  }

  nuevoSuper(nombre) {

    console.log("creacion nuevo supermercado");
  }

  render() {

    let seVe = this.state.seVeForm ? 'block' : 'none'

    return (

      <React.Fragment>

        <header id='cabeceraApp'>
          <h1>SUPERMARKETS</h1>
          <h1>LISTA SUPERMERCADO</h1>
        </header>
        <div id='contenedorApp'>
          <div id='botneraForm'>
            <Botonera mapa={this.state.poblacion} color={this.state.colores} accion={(x, y) => this.click(x, y)} />

            <div id='formulario' style={{ display: seVe }}>
              <Formulario accion={(nombre) => this.nuevoSuper(nombre)} />
            </div>
          </div>

          <div id='lista'>
            <Supermercados />
          </div>

        </div>
      </React.Fragment>
    )
  }
}

export default App;
