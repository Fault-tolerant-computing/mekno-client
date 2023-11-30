import React,{Component} from 'react';
import Key from './Key';
import styles from '../CSS/Keyboard.module.css';


class Keyboard extends Component {

    numericRow = ["|","1","2","3","4","5","6","7","8","9","0","'","¿","backspace"];
    topRow = ["tab","q","w","e","r","t","y","u","i","o","p","´","+","keyboard_return"];
    homeRow = ["capslk","a","s","d","f","g","h","j","k","l","ñ","{","}"];
    bottomRow = ["shiftl","<","z","x","c","v","b","n","m",",",".","-","shiftr"];
    finalRow = ["ctrl","home","alt","space_bar","alt","home","fn","ctrl"];
    leftSide = "QWERTASDFGZXCVB°!\"#$%>";
    rightSide = "YUIOPHJKLÑNM&/()=?¡¨*[];:_";

    isTriggered = (e) => {
        var currentChar = this.props.currentChar;
        if (currentChar === undefined || currentChar === "\n"){ //final del texto
            if(e === "keyboard_return")
                return "triggered";
            return "";
        }
        if (e === "space_bar" && currentChar === " ")  //espacio
            return "triggered";
        else if (e === currentChar.toLowerCase()) {
            return "triggered";
        }
        //casos de teclas especiales
        switch(e){
            case "|": if(currentChar === "°") return "triggered"; break;
            case "1": if(currentChar === "!") return "triggered"; break;
            case "2": if(currentChar === "\"") return "triggered";break;
            case "3": if(currentChar === "#") return "triggered"; break;
            case "4": if(currentChar === "$") return "triggered"; break;
            case "5": if(currentChar === "%") return "triggered"; break;
            case "6": if(currentChar === "&") return "triggered"; break;
            case "7": if(currentChar === "/") return "triggered"; break;
            case "8": if(currentChar === "(") return "triggered"; break;
            case "9": if(currentChar === ")") return "triggered"; break;
            case "0": if(currentChar === "=") return "triggered"; break;
            case "'": if(currentChar === "?") return "triggered"; break;
            case "¿": if(currentChar === "¡") return "triggered"; break;
            case "<": if(currentChar === ">") return "triggered"; break;
            case "´": if(currentChar === "¨") return "triggered"; break;
            case "+": if(currentChar === "*") return "triggered"; break;
            case "{": if(currentChar === "[") return "triggered"; break;
            case "}": if(currentChar === "]") return "triggered"; break;
            case ",": if(currentChar === ";") return "triggered"; break;
            case ".": if(currentChar === ":") return "triggered"; break;
            case "-": if(currentChar === "_") return "triggered"; break;
        }
        return "";
    }

    isShiftR = () => {
        if (this.props.upper) {
            for (let i in this.leftSide){
                if (this.props.currentChar === this.leftSide[i])
                return "triggered";
            }
        }
        return "";
    }

    isShiftL = () => {
        if (this.props.upper) {
            for (let i in this.rightSide){
                if (this.props.currentChar === this.rightSide[i])
                    return "triggered";
            }
        }
        return "";
    }

    render () {
        return (
            <div className={styles.container}>
                <div className={styles.keyboard}>
                    {/* parte numerica del teclado*/}
                    <div className={styles.row}>
                        {
                            this.numericRow.map((e) =>{
                                if(e === "backspace")
                                    return <Key key={e} name={<i className="material-icons">{e}</i>} 
                                    size="large" triggered={this.isTriggered(e)}/>
                                else
                                    return <Key key={e} name={e} triggered={this.isTriggered(e)}/>
                            })
                        }
                    </div>
                    {/* parte superior del teclado*/}
                    <div className={styles.row}>
                        {
                            this.topRow.map((e) =>{
                                if(e === "tab")
                                    return <Key key={e} name={e} 
                                    size="tab" triggered={this.isTriggered(e)}/>
                                else if (e === "keyboard_return")
                                    return <Key key={e} name={<i className="material-icons">{e}</i>} 
                                    size="tab" triggered={this.isTriggered(e)}/>
                                else
                                    return <Key key={e} name={e} triggered={this.isTriggered(e)}/>
                            })
                        }
                    </div>
                    {/* parte central del teclado*/}
                    <div className={styles.row}>
                        {
                            this.homeRow.map((e) =>{
                                if(e === "capslk")
                                    return <Key key={e} name={e} size="capsl" triggered={this.isTriggered(e)}/>
                                else
                                    return <Key key={e} name={e} triggered={this.isTriggered(e)}/>
                            })
                        }
                    </div>
                    {/* parte inferior del teclado */}
                    <div className={styles.row}>
                        {
                            this.bottomRow.map((e) =>{
                                if(e === "shiftr")
                                    return <Key key={e} name="shift" size="wider" triggered={this.isShiftR()}/>
                                else if(e === "shiftl")
                                    return <Key key={e} name="shift" size="normal" triggered={this.isShiftL()}/>
                                else
                                    return <Key key={e} name={e} triggered={this.isTriggered(e)}/>
                            })
                        }
                    </div>
                    {/* parte final del teclado */}
                    <div className={styles.row}>
                        {
                            this.finalRow.map((e, i) =>{
                                if(e === "space_bar")
                                    return <Key key={i} name={<i className="material-icons">{e}</i>} size="XL" triggered={this.isTriggered(e)}/>
                                else if (e === "home")
                                    return <Key key={i} name={<i className="material-icons">{e}</i>} size="normal" triggered={this.isTriggered(e)}/>
                                else
                                    return <Key key={i} name={e} size="normal" triggered={this.isTriggered(e)}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
};

export default Keyboard;