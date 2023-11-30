import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from '../CSS/MenuLesson.module.css';
import barStyles from '../CSS/Bar.module.css';
import Lesson from './Lesson.js';
import MainMenu from './MainMenu.js';
import FreeMode from './FreeMode.js';

class MenuLesson extends Component {
    state = {
        data : null,
        loaded: false,
        id: -1
    }

    async componentDidMount (){
        await fetch("/menu")
            .then(res => res.json())
            .then(dat => this.setState({data:dat, loaded:true}));
    }

    async apiData () {
    }

    getUrl (pos) {
        this.setState({id: pos});
    }

    render () {
        return (
            <Router>
                <Route exact path="/">
                    <MainMenu/>
                </Route>
                <Route path="/ranked">
                    <FreeMode/>
                </Route>
                <Route path="/menu">
                    <Link to="/" className="link">
                        <div id={barStyles.top_bar}>Menú de lecciones</div>
                    </Link>
                    <div className = {styles.ButtonsWrapper}>
                        {
                            this.state.loaded ? this.state.data.map((item, pos) => {
                            return (
                                <Link to={`/lessons/${pos + 1}`} key={pos}>
                                    <button className={styles.button} onClick={() => this.getUrl(pos + 1)} key = {pos}>Lesson {item.numLess}
                                    <p>{item.name}</p>
                                    </button>
                                </Link>
                            )
                            }): []
                        }
                    </div>
                </Route>
                <Route path={`/lessons/${this.state.id}`}>
                    <Lesson idLesson={this.state.id}/>
                </Route>
            </Router>
        )
    }
}

export default MenuLesson;