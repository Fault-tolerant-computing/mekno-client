import React, {Component} from 'react';
import styles from '../CSS/InputBox.module.css';
import Span from './Span';
import Keyboard from './Keyboard';
import Hands from './Hands';

class InputBox extends Component {
    //se definen los miembros de la clase
    state = {
        currentInput: "",
        time: 0,
        canStart: true,
        wpm: 0,
        percent: 0,
        currentChar: this.props.text[0]
    };

    //esta función captura los datos que se hayan metido por el teclado
    onChange = (event) => {
        var value = event.target.value;
        var inputLength = this.state.currentInput.length;
        //el ultimo caracter no lo detecta, hasta el proximo input
        var propsLength = this.props.text.length; 

        //validación para que el teclado y el texto vayan a la par
        if (value.length < inputLength)
            this.setState({currentChar: this.props.text[inputLength-1]});
        else
            this.setState({currentChar: this.props.text[inputLength+1]});

        this.setState({currentInput: value});
        //detiene el timer si se quiere comenzar de nuevo
        if (value.length === 0){
            this.stopTimer(true);
        } 
        //comienza el timer, si la bandera "canStart" es verdadera
        else{
            if (this.state.canStart){
                this.startTimer();
            }
        }
        
        //mandamos a calcular las WPM
        this.doCalculus();

        //para el tiempo cuando se escribe el texto completo
        if (inputLength === propsLength){
            this.props.finish(this.state);
            this.stopTimer(false);
        }
    }
    
    //esta función evalua si un caracter es correcto o no
    colorComparer = (char1, char2) => {
        if (char2 === undefined)
            return "defaultColor";
        else if( char1 === char2)
            return "correct";
        else
            return "wrong";
    }
    
    //comienza a contar
    startTimer () {
        //la funcion setInterval, ejecutará una funcion, indefinidamente
        //cada cantidad de milisegundos que se le indiquen como segundo parametro
        this.interval = setInterval(() => {
            this.setState({time: this.state.time + 1})
        }, 1000);
        //si comenzamos el timer, debemos desactivar la bandera de canStart
        this.setState({canStart: false});
    }
 
    //función para parar el timer
    stopTimer (reset) {
        //limpia el retorno de la funcion setInterval
        clearInterval(this.interval);
        //usa una bandera para resetear el tiempo
        if (reset)
            this.setState({time:0, canStart: true});
    }

    //se usa para evitar memory leaks
    componentWillUnmount () {
        clearInterval(this.interval);
    }

    //calcula las palabras por minuto y el porcentaje en tiempo real
    doCalculus () {
        //contadores de palbras
        var correctWords = 0;
        var wrongWords = 0;
        
        //obtenemos arreglos de palabras 
        var arrInput = this.state.currentInput.split(" "); 
        var arrText = this.props.text.split(" ");

        for (let i in arrText){
            if (arrInput[i] === undefined) //ya no hay palabras con las que comparar
                break;
            else if (arrInput[i] === arrText[i]) // si son palabras iguales
                correctWords++;
            else //son palabras diferentes
                wrongWords++;
        }

        //calcula el porcentaje de palabras correctas totales
        var resPercent = 100*(this.state.currentInput.length/this.props.text.length);
        this.setState({percent: resPercent.toFixed(0)});

        //calcula las palabras por minuto
        var resultWpm = (60/this.state.time)*(correctWords-wrongWords);

        //si el resultado es negativo o infinito se setea wpm a 0
        if (resultWpm < 0 || resultWpm === Infinity)
            this.setState({wpm: 0}); 
        //en caso contrario se manda el dato directo
        else   
            this.setState({wpm: resultWpm.toFixed(0)});
    }

    isUpper = () => {
        if (this.state.currentChar === undefined)
            return "";
        var normalChar = this.state.currentChar;
        var upperChar = this.state.currentChar.toUpperCase();
        return normalChar === upperChar;
    }

    render() {
        return (
            <div className={styles.InputBox}> {/* Elemento HTML que se retorna */}
                <textarea  id={styles.InputArea} autoFocus
                           spellCheck = "false" onChange = {this.onChange}>
                </textarea>
                <div id={styles.fullContainer}>
                    <div className={styles.compContainer}>
                        <div className={styles.textDisplay}> {/* engloba el texto que se renderiza */}
                            {
                                //iteramos todos los elementos del texto, y cremos un span para cada uno de ellos
                                this.props.text.split('').map((element, index) => {
                                    const auxChar = this.state.currentInput[index]
                                    return <Span character={element} key={index} 
                                                color={this.colorComparer(element, auxChar)}/>
                                })
                            }
                        </div>
                    {/* muestra un teclado por pantalla */}
                    <div className={styles.infoContainer}>
                        <Keyboard currentChar={this.state.currentChar} upper={this.isUpper()}/>
                        <div className={styles.timerInfo}>
                            <p>Tiempo: { this.state.time } s</p>
                            <p>Velocidad: { this.state.wpm } WPM</p>
                            <p>Porcentaje: { this.state.percent } %</p>
                        </div>
                    </div>
                    <Hands currentChar={this.state.currentChar} upper={this.isUpper()}/>
                    </div>
                </div>
            
                {/* zona de escritura */}

                {/* renderiza un timer, las WPM y el porcentaje de plabras correctas en tiempo real */}
            </div>
        );
    }
  
}

export default InputBox;