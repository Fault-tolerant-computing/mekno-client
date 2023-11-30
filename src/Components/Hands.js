import React, { Component } from 'react';
import lindex from '../Imgs/LIndex.png';
import lminddle from '../Imgs/LMiddle.png';
import lpalm from '../Imgs/LPalm.png';
import lpinky from '../Imgs/LPinky.png';
import lthumb from '../Imgs/LThumb.png';
import lring from '../Imgs/LRing.png';
import styles from '../CSS/hands.module.css';
import rindex from '../Imgs/RIndex.png';
import rminddle from '../Imgs/RMiddle.png';
import rpalm from '../Imgs/RPalm.png';
import rpinky from '../Imgs/RPinky.png';
import rthumb from '../Imgs/RThumb.png';
import rring from '../Imgs/RRing.png';

class Hands extends Component {

    li = "4rfvbgt5$%RTFGVB";
    lm = "3edc#EDC";
    lp = "|1qaz<>ZAQ!°";
    lr = "2wsxXSW\"";
    ri = "67yuhjnmMNJHUY/&";
    rm = "8ik,;KI(";
    rp = "-ñp0'¿´+{}_ÑP=?¡¨*[]\n";
    rr = "9ol.:LO)";
    leftSide = "QWERTASDFGZXCVB°!\"#$%>";
    rightSide = "YUIOPHJKLÑNM&/()=?¡¨*[];:_";

    isShiftR = () => {
        if (this.props.upper) {
            for (let i in this.leftSide){
                if (this.props.currentChar === this.leftSide[i])
                return styles.selected;
            }
        }
        return "";
    }

    isShiftL = () => {
        if (this.props.upper) {
            for (let i in this.rightSide){
                if (this.props.currentChar === this.rightSide[i])
                    return styles.selected;
            }
        }
        return "";
    }

    selectFinger = (finger) => {
        var currentChar = this.props.currentChar;
        switch (finger) {
            case "li":
                for (let i in this.li) 
                    if(this.li[i] === currentChar)
                        return styles.selected;
            break;
            case "lm":
                for (let i in this.lm) 
                    if(this.lm[i] === currentChar)
                        return styles.selected;
            break;
            case "lp":
                for (let i in this.lp) 
                    if(this.lp[i] === currentChar)
                        return styles.selected;
            break;
            case "lt":
                if (currentChar === " ")
                    return styles.selected;
            break;
            case "lr":
                for (let i in this.lr) 
                    if(this.lr[i] === currentChar)
                        return styles.selected;
            break;
            case "ri":
                for (let i in this.ri) 
                    if(this.ri[i] === currentChar)
                        return styles.selected;
            break;
            case "rm":
                for (let i in this.rm) 
                    if(this.rm[i] === currentChar)
                        return styles.selected;
            break;
            case "rp":
                for (let i in this.rp) 
                    if(this.rp[i] === currentChar)
                        return styles.selected;
            break;
            case "rr":
                for (let i in this.rr) 
                    if(this.rr[i] === currentChar)
                        return styles.selected;
            break;
            default:
            break;
        }
        return "";
    }

    render () {
        return (
            <div className={styles.container}>
                <div className={styles.leftHand}>
                    <img src={lindex} alt="a" className={`${styles.lIndex} ${this.selectFinger("li")}`}/>
                    <img src={lminddle} alt="a" className={`${styles.lMiddle} ${this.selectFinger("lm")}`}/>
                    <img src={lpalm} alt="a" className={styles.lPalm}/>
                    <img src={lpinky} alt="a" className={`${styles.lPinky} ${this.selectFinger("lp")} ${this.isShiftL()}`}/>
                    <img src={lthumb} alt="a" className={`${styles.lThumb} ${this.selectFinger("lt")}`}/>
                    <img src={lring} alt="a" className={`${styles.lRing} ${this.selectFinger("lr")}`}/>
                </div>
                <div className={styles.rightHand}>
                    <img src={rindex}alt="a" className={`${styles.rIndex} ${this.selectFinger("ri")}`}/>
                    <img src={rminddle} alt="a" className={`${styles.rMiddle} ${this.selectFinger("rm")}`}/>
                    <img src={rpalm} alt="a" className={styles.rPalm}/>
                    <img src={rpinky} alt="a" className={`${styles.rPinky} ${this.selectFinger("rp")} ${this.isShiftR()}`}/>
                    <img src={rthumb} alt="a" className={styles.rThumb}/>
                    <img src={rring} alt="a" className={`${styles.rRing} ${this.selectFinger("rr")}`}/>
                </div>
            </div>
        );
    }
}

export default Hands;