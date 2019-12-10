import React,{Component} from 'react';
import Board from '../components/Board/Board';
import styles from './Game.module.css';
import axios from 'axios';
const winCombos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const Human='X';
const Ai='O';
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
    componentDidMount() {
        console.log('test');
        let myHeaders = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        });
        axios.get('https://api.stocktwits.com/api/2/streams/user/2956810.json',{headers:myHeaders})
        .then(res=>console.log(res.data.user));
    }
    clickSquare=(e)=>{
        const newArr=[...this.state.squares];
        if(!newArr[e.target.id]) {
            newArr[e.target.id]=Human;
            this.setState({squares:newArr},()=>{
                this.turnSquare(Human);//each time clicking, you need to check if it wins, if yes end the game, otherwise check if it draw
                if(!this.checkDraw()) {//if not a draw, AI moving
                   this.setState({squares:this.opponentMove()},()=> this.turnSquare(Ai));
                    }
                }
            ); 
        }   
    }
    clickReplay=()=>{
        const newArr=Array(9).fill(null);
        this.setState({squares:newArr,winnerArr:[],click:true,winner:null,draw:false}); 
    }
    turnSquare=(player)=>{
        let winnerObj=this.checkWin(player);
        if(winnerObj) {this.setState({winnerArr:winCombos[winnerObj.index],click:false,winner:winnerObj});}
    }
    checkWin=(player)=>{
        let playerArr=this.state.squares.reduce((total,val,index)=>val===player?total.concat(index):total,[]);
        let whoWon=this.state.gameWon;
        for (let [index,win] of winCombos.entries()) {
            if(win.every(elem=>playerArr.indexOf(elem)>-1)) {
                whoWon={name:player,index};
                break;
            }
        }
        return whoWon;
    }
    winGame=(player)=>player.name===Human?'You':'Program';
    checkDraw=()=>{
        if(this.availableSquares().length===0) { this.setState({click:false,draw:true}); return true; }
        return false;
    }
    availableSquares=()=>this.state.squares.reduce((total,cur,index)=>(!cur)?total.concat(index):total,[]);
//------------------------------AI section-----------------------------------
    opponentMove=()=> {
        const arr=[...this.state.squares];
        const willAiWin=this.checkWhoWillWin(Ai);
        const willHumanWin=this.checkWhoWillWin(Human);
        const avaiArr=this.availableSquares();
        const newArr=avaiArr.filter(cur=>cur%2===0);//available corner position array
        if(willAiWin) {arr[willAiWin.position]=Ai;}
        else if(willHumanWin) {arr[willHumanWin.position]=Ai;}
        else if(!arr[4]) {arr[4]=Ai;}
        else if(arr[4]===Human) {
            if(newArr.length>0) {arr[newArr[0]]=Ai;}
            else {arr[avaiArr[0]]=Ai;}
        }
        else {//what should do if the middle point is taken by Program
            //decide when to take one of left-top, right-top, left-bottom and right-bottom positions
            //the position should be availabe and has at least one Human neighbor 
            let corner=newArr.filter(val=>(this.findNeighbor(val).filter(val=>arr[val]===Human)).length>0);
            if(corner.length>0) {arr[corner[0]]=Ai;}
            else {//if no such corner position, find avaiable position in red cross direction
                //otherwise, take the available position
                const redCrossArr=avaiArr.filter(cur=>cur%2>0);
                if(redCrossArr.length>0) {arr[redCrossArr[0]]=Ai;}
                else {arr[avaiArr[0]]=Ai;}
            }
        }
     return  arr;   
    }
   
    findNeighbor=(index)=>{
        return [index-1,index+1,index-3,index+3].filter(val=>val>=0&&val<=8);
    }
    
    
    findPosition=(player,arrGroup)=>{
        let positionObj=null;
        let playerArr=this.state.squares.reduce((total,val,index)=>(val===player)?total.concat(index):total,[]);
        for (let elem of arrGroup) {
            let count=0, index=0;
            for (let i=0;i<elem.length;i++) {
                if(playerArr.indexOf(elem[i])>-1) {count++;}
                else {index=i;}
                if(count===2) {
                    if(!this.state.squares[elem[index]]) {//check if it's available
                        positionObj={position:elem[index]};
                        break;
                    }
                }
            }
        }
        return positionObj;
    }
    checkWhoWillWin=(player)=>{
        return this.findPosition(player,winCombos);
    }
//---------------------------------end----------------------------------------
    render() {
        const clickEvent=this.state.click?this.clickSquare:null;
        const guide=this.state.click?'Pick up a square': 'Game ends.';
        let winner=this.state.winner?<span style={{color:'#2ecc71'}}>{this.winGame(this.state.winner)} wins!</span>:null;
        return <div className={styles.Board}>
                    <h1>Tic Tac Toe</h1>
                    <h2>{guide}</h2>
                    <Board squares={this.state.squares} click={clickEvent} winnerItems={this.state.winnerArr} />
                    <p>{winner} {this.state.draw?`It's a draw.`:null}</p>
                    <button className={styles.Replay} onClick={this.clickReplay}>Replay</button>  
                </div>;
    }

}
export default Game;
