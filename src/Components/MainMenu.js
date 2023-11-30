import React, { Component, Fragment } from 'react';
import barStyle from '../CSS/Bar.module.css';
import logo from '../Imgs/teclado.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MenuLesson from '../Components/MenuLesson.js';
import FreeMode from '../Components/FreeMode.js';

class MainMenu extends Component {
    render() {
        return (
            <div id={barStyle.mainContainer}>
                <Link to="/" className="link">
                    <div id={barStyle.top_bar}>Seleccione un modo</div>
                </Link>
                <div id={barStyle.container}>
                    <img src={logo} alt="logo" id="logo" />
                    <div id={barStyle.buttonContainer}>
                        <Link to="/menu" className="link">
                            <button id={barStyle.boton}>Lecciones</button>
                        </Link>
                        <Link to="/ranked" className="link">
                            <button id={barStyle.boton}>Modo competitivo</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainMenu;