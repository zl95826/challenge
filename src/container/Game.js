import React,{Component} from 'react';
import Board from '../components/Board/Board';
import styles from './Game.module.css';
const winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
class Game extends Component {
    constructor(props) {
        super(props);
        this.state={
            squares:Array(9).fill(null),
            winnerArr:[],
            click:true
        }
    }
    clickSquare=(e)=>{
        const newArr=[...this.state.squares];
        if(!newArr[e.target.id]) {
            newArr[e.target.id]='X';
            this.setState({squares:newArr},()=>{
                this.turnSquare('X');
                }
            ); 
        }
       
        
    }
    clickReplay=()=>{
        const newArr=Array(9).fill(null);
        this.setState({squares:newArr,winnerArr:[],click:true}); 
    }
    turnSquare=(player)=>{
        let winner=this.checkWin(this.state.squares,player);
        if(winner) {this.winGame(winner); this.setState({winnerArr:winCombos[winner.index],click:false});}
    }
    checkWin=(board,player)=>{
        let playerArr=board.reduce((total,val,index)=>val===player?total.concat(index):total,[]);
        console.log(playerArr);
        let whoWon=this.state.gameWon;
        for (let [index,win] of winCombos.entries()) {
            if(win.every(elem=>playerArr.indexOf(elem)>-1)) {
                whoWon={name:player,index};
                break;
            }
        }
        return whoWon;
    }
    winGame=(winner)=> {
       console.log(winner.name,winner.index);
       
    }
    render() {console.log(this.state.winnerArr);
        const clickEvent=this.state.click?this.clickSquare:null;
        return <div className={styles.Board}>
                    <h1>Tic Tac Toe</h1>
                    <Board squares={this.state.squares} click={clickEvent} winnerItems={this.state.winnerArr} />
                    <button className={styles.Replay} onClick={this.clickReplay}>Replay</button>
                </div>;
    }

}
export default Game;
