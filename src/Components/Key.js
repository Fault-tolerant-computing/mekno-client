import React,{Component} from 'react';
import styles from '../CSS/Keyboard.module.css';

class Key extends Component {
    render () {
        return (
            <div className={`${styles.key} ${styles[this.props.size]} ${styles[this.props.triggered]}`}>
                {this.props.name}
            </div>
        );
    }
};

export default Key;