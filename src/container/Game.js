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
            click:true,
            winner:null,
            draw:false
        }
    }
    clickSquare=(e)=>{
        const newArr=[...this.state.squares];
        if(!newArr[e.target.id]) {
            newArr[e.target.id]='X';
            this.setState({squares:newArr},()=>{
                this.turnSquare('X');//each time clicking, you need to check if it wins, if yes end the game, otherwise check if it draw
                if(!this.checkDraw()) {//if no draw, AI moving
                    console.log('not a draw');
                    }
                }
            ); 
        }
       
        
    }
    clickReplay=()=>{
        const newArr=Array(9).fill(null);
        this.setState({squares:newArr,winnerArr:[],click:true,winner:null}); 
    }
    turnSquare=(player)=>{
        let winnerObj=this.checkWin(player);
        if(winnerObj) {this.setState({winnerArr:winCombos[winnerObj.index],click:false,winner:winnerObj});}
    }
    checkWin=(player)=>{
        let playerArr=this.state.squares.reduce((total,val,index)=>val===player?total.concat(index):total,[]);
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
    winGame=(player)=>player.name==='X'?'You':'AI';
    checkDraw=()=>{
        if(this.availableSquare().length==0) { this.setState({click:false,draw:true}); return true; }
        return false;
    }
    availableSquare=()=>this.state.squares.filter(square=>!square);
//------------------------------AI section-----------------------------------
    opponentMove=()=> {
        let bestSpot;
    }
    checkWhoWillWin=(player)=>{
        let playerArr=this.state.squares.reduce((total,val,index)=>val===player?total.concat(index):total,[]);
        let nextWin=null;
        for (let elem of winCombos) {
            let count=0, index=0;
            for (let i=0;i<elem.length;i++) {
                if(playerArr.indexOf(i)>-1) {count++;}
                else {index=i;}
                if(count==2) {
                    if(!this.state.squares[elem[index]]) {//check if it's available
                        nextWin={position:elem[index]};
                        break;
                    }
                }
            }
        }
        return nextWin;
    }
//---------------------------------end----------------------------------------
    render() {console.log(this.state.winnerArr);
        const clickEvent=this.state.click?this.clickSquare:null;
        let winner=this.state.winner?<span style={{color:'#2ecc71'}}>{this.winGame(this.state.winner)} wins! Game ends.</span>:null;
        return <div className={styles.Board}>
                    <h1>Tic Tac Toe</h1>
                    <Board squares={this.state.squares} click={clickEvent} winnerItems={this.state.winnerArr} />
                    <p>{winner} {this.state.draw?`It's a draw`:null}</p>
                    <button className={styles.Replay} onClick={this.clickReplay}>Replay</button>  
                </div>;
    }

}
export default Game;
