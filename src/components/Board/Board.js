import React,{Fragment} from 'react';
import style from './Board.module.css';
import Square from '../Square/Square';

const Board=(props)=><div>
                        <section className={style.Row}>
                            <Square value={props.squares[0]} index={0} click={props.click}/>
                            <Square value={props.squares[1]} index={1} click={props.click}/>
                            <Square value={props.squares[2]} index={2} click={props.click}/>
                        </section>
                        <section className={style.Row}>
                            <Square value={props.squares[3]} index={3} click={props.click}/>
                            <Square value={props.squares[4]} index={4} click={props.click}/>
                            <Square value={props.squares[5]} index={5} click={props.click}/>
                        </section>
                        <section className={style.Row}>
                            <Square value={props.squares[6]} index={6} click={props.click}/>
                            <Square value={props.squares[7]} index={7} click={props.click}/>
                            <Square value={props.squares[8]} index={8} click={props.click}/>
                        </section>
                    </div>


export default Board;
