import React, { Component } from 'react';
import styles from '../CSS/RankingTable.module.css';

class RankingTable extends Component {
    state = {
        data: [],
        loaded: false
    }
    intervalID;

    componentDidMount () {
        this.getData()
        
        this.intervalID = setInterval(this.getData.bind(this), 5000);

    }
    
    componentWillUnmount(){
        clearInterval(this.intervalID);
    }
    
     async getData (){
        await fetch('/rankedList')
            .then(res => res.json())
            .then(dat => this.setState({
                loaded: true,
                data: dat
            }));
     }

    render(){
        console.log("ranking", this.state.data);
        return(
            this.state.loaded && this.state.data.length > 0 ? 
            <div className={styles.TableWrapper}>
                <table>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>UserName</th>
                            <th>WPM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.loaded ? this.state.data.map((item, pos) =>{
                                return (
                                    <tr key={pos}>
                                        <td>{pos + 1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.wpm}</td>
                                    </tr>
                                )
                            }): []
                        }
                    </tbody>
                </table>
            </div>
            : []
        )
    }

}

export default RankingTable;