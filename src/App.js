import './App.css';
import React, { Component } from 'react';
import MainMenu from './Components/MainMenu';
import InputBox from './Components/InputBox.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import MenuLesson from './Components/MenuLesson.js';
import FreeMode from './Components/FreeMode.js';
import './CSS/InputBox.module.css';
import barStyle from './CSS/Bar.module.css';

const txt = "Es una calle larga y silenciosa. Ando en tinieblas y tropiezo y caigo y me levanto y piso con pies ciegos las piedras mudas y las hojas secas y alguien detrás de mí también las pisa: si me detengo, se detiene;";
class App extends Component {
    render() {
        return (
            <div id="mainDiv">
                <Router>
                    <Route exact path={'/'}>
                        <MainMenu/>
                    </Route>

                    <Route path="/menu">
                        <MenuLesson/>
                    </Route>

                    <Route path="/ranked">
                        <FreeMode/>
                    </Route>

                </Router>
            </div>
        );
    }
}

export default App;
