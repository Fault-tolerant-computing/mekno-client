import React, { Component } from 'react'
import RankingTable from './RankingTable'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import styles from '../CSS/FreeMode.module.css';
import barStyle from '../CSS/Bar.module.css';
import InputBox from './InputBox';
import MainMenu from './MainMenu';
import MenuLesson from './MenuLesson';
class FreeMode extends Component {
    state = {
        //data rank loaded
        loadedRank: false,
        rankData: null,
        //text data loaded
        text: null,
        loadedText: false,
        //text input
        currentInput: "",
        currentChar: '',
        //know is to be in the top
        minWpm: -1,
        alreadyUpdate: false,
        finish:true,
        isTop:false,
        //to do calculus
        wpm:0,
        percent: 0,
        time: 0,
        canStart:true,
        //to post data
        userName: '',
        showForm:false
    }

    componentDidMount (){
        this.getApiDataRank('/rankedList');
        this.getApiDataText('/randomText');
    }

    componentDidUpdate() {
        if (!this.state.alreadyUpdate && this.state.loadedRank){
            this.getMinRecord();
            this.setState({alreadyUpdate:true})
        }
    }

    async getApiDataRank(url){
        await fetch(url)
            .then(res => res.json())
            .then(dat => this.setState({
                loadedRank: true,
                rankData: dat
            }
            ))
    }

    async getApiDataText(url) {
        await fetch(url)
            .then(res => res.json())
            .then(dat => this.setState({
                loadedText: true,
                text: dat[0]['content']
            }
            ))
    }

    getMinRecord(){
        if (this.state.loadedRank && this.state.rankData.length > 0){
            let min = this.state.rankData[this.state.rankData.length - 1]['wpm'];
            this.setState({minWpm:min})
        }
        this.setState({minWpm: 0})
    }

    podium (){
        console.log("chi che hace el podium");
        if (this.state.wpm >= this.state.minWpm){
            this.setState({isTop: true})
        }
    }
    
    submitData () {
        let data = this.state
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(data)
        }
        fetch('/rankedList', request).then(res=>res.json()).then(dat => console.log(dat));
        this.setState({showForm:true})
    }

    tryAgain () {
        this.setState({
            //data rank loaded
            loadedRank: false,
            rankData: null,
            //text data loaded
            text: null,
            loadedText: false,
            //text input
            currentInput: "",
            currentChar: '',
            //know is to be in the top
            minWpm: -1,
            alreadyUpdate: false,
            finish:true,
            isTop:false,
            //to do calculus
            wpm:0,
            percent: 0,
            time: 0,
            canStart:true,
            //to post data
            userName: '',
            showForm:false
        })
        this.componentDidMount();
        this.componentDidUpdate();
    }

    setFinish = (data) => {
        let x = Number(data.wpm);
        if (x >= this.state.minWpm)
            this.setState({ isTop: true, finish: false, wpm: x, time: data.time, percent: data.percent }, () => console.log(data));
        else
            this.setState({ finish: false, wpm: x, time: data.time, percent: data.percent }, () => console.log(data));
    }

    render () {
        return (
        <Router>
            <Route exact path="/">
                <MainMenu/>
            </Route>
            <Route path="/menu">
                <MenuLesson/>
            </Route>
            <Route path="/ranked">
                <div className={styles.mainDiv}>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <div id={barStyle.top_bar}>Competitivo</div>
                    </Link>
                    {
                        this.state.finish ? 
                        <div className={styles.gameStart}>
                            <div className={styles.gameContainer}>
                            {
                                this.state.loadedText ? 
                                <InputBox text={this.state.text} finish={this.setFinish}/>
                                :
                                <div className={styles.loadinfocontainer}>
                                    <div className={styles.infoContainer}>
                                        <h1>¿No se muestra nada en pantalla?</h1>
                                        <p>Estas son las posibles causas:</p>
                                        <ul>
                                            <li>Hay un error con el servidor, intentalo mas tarde</li>
                                            <li>Estoy cargando los datos, espera</li>
                                        </ul>
                                    </div>
                                    <div className={styles.loader}></div>
                                </div>
                            }
                            </div>
                            
                        </div>
                        :
                        <div className={styles.endGame}>
                            {
                                (this.state.isTop && !this.state.showForm )?
                                <div className={styles.postForm}>
                                    <h1>Genial mereces estar en top 10</h1>
                                    <p>Ingresa el nickname con el que el mundo te reconocera</p>
                                    <p className={styles.postScore}>Tu puntuacion: {this.state.wpm}</p>
                                    <input type = "text" value = {this.state.userName} name = "userName" onChange={(data) => {this.setState({userName:data.target.value})}} placeholder='Ejemplo: MeKNoPet'/>
                                    <br/>
                                    <button className={styles.postBtn} onClick={() => this.submitData()}>Estar en la cima</button>
                                </div>
                                :[]

                            }
                            <div className={styles.wrapperStats}>
                                <div className={styles.containerYourStats}>
                                    <h1>Tus estadisticas</h1>
                                    {
                                        this.state.isTop ? <p>Ya todo el mundo te puede ver, disfruta de la gloria y busca el primer puesto en la tabla</p>:<p>Para ser acredor de una posicion en el podio debes superar la puntaacion minima</p>
                                    }
                                    <div className={styles.scores}>
                                        <p>Tiempo: {this.state.time}</p>
                                        <p>Velocidad: {this.state.wpm}</p>
                                        <p>Porcentaje: {this.state.percent}%</p>    
                                    </div>
                                    <RankingTable />
                                    <br/>
                                    <button className={styles.restartBtn} onClick={() => this.tryAgain()}>Volver a intentarlo</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </Route>
        </Router>
        )
    }
}

export default FreeMode