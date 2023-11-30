import React, { Component } from 'react';

import styles from '../CSS/InputBox.module.css';

class Span extends Component {
    render() {
        return (
            <span className={`${styles.character} ${styles[this.props.color]}`} >
                { this.props.character}
            </span>
        );
    }
}

export default Span;