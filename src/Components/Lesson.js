import React, { Component } from 'react';
import InputBox from './InputBox'
import styles from '../CSS/Lesson.module.css';
import barStyles from '../CSS/Bar.module.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Lesson extends Component{
    state = {
        data: [],
        loaded: false,
        teory: true,
        finish: false
    }

    componentDidMount(){
        this.getData(this.props.idLesson);
    }
    
    async getData(numLess=null){
        let route = "/lesson";
        if (numLess){
            route += "/" + numLess;
        }
        // console.log(route);
        await fetch(route)
            .then(res => res.json())
            .then(dat => this.setState({data: dat,
            loaded: true}))
    }

    toggleTeoExe = () => {
        const aux = !this.state.teory;
        this.setState({teory:aux});
    }
    
    setfinish = (data) => {
        this.setState({ finish: true })
    }

    render(){
        if(this.state.loaded){
            console.log(this.state.data);
        }
        return (
            <div className={styles.lessonDiv}>
                <div id={barStyles.top_bar}>{this.state.data.name}</div>
                {
                    this.state.loaded ? 
                        this.state.teory ? 
                        <div className={styles.mainContainer}>
                            <div className={styles.explanationContainer}>
                                <div className={styles.explanationWrapper}>
                                    <p>{this.state.data['explanation']}</p>
                                </div>
                                <button onClick={this.toggleTeoExe} className={styles.goExercise}>Ir al ejercicio</button>
                            </div>
                        </div>
                        :
                        <div className={styles.mainContainer}>
                            <div className={styles.explanationContainer}>
                                <InputBox text={this.state.data['content'][0]} finish={this.setfinish}/>
                            </div>
                            <div id={styles.finalBottonContainer}>
                                {
                                    this.state.finish ? []
                                    : <button onClick={this.toggleTeoExe} className={styles.inLesson}>Regresar a la teoria</button> 
                                }
                                <Link to="/menu">
                                    <button className={styles.goMenu}>Ir a menu</button>
                                </Link>
                            </div>
                        </div>
                    :
                    []
                }
            </div>
        )
    }
}

export default Lesson;