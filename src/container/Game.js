import React,{Component} from 'react';
import Board from '../components/Board/Board';
import styles from './Game.module.css';
class Game extends Component {
    render() {
        return <div className={styles.Board}>
                    <h1>Tic Tac Toe</h1>
                    <Board />
                    <button className={styles.Replay}>Replay</button>
                </div>;
    }

}
export default Game;
