import React,{Component} from 'react';
import Board from '../components/Board/Board';
import styles from './Game.module.css';
class Game extends Component {
    constructor(props) {
        super(props);
        this.state={
            squares:Array(9).fill(null)
        }
    }
    clickSquare=(e)=>{
        const newArr=[...this.state.squares];
        newArr[e.target.id]='X';
        this.setState({squares:newArr}); 
    }
    clickReplay=()=>{
        const newArr=Array(9).fill(null);
        this.setState({squares:newArr}); 
    }
    render() {
        return <div className={styles.Board}>
                    <h1>Tic Tac Toe</h1>
                    <Board squares={this.state.squares} click={this.clickSquare}/>
                    <button className={styles.Replay} onClick={this.clickReplay}>Replay</button>
                </div>;
    }

}
export default Game;
