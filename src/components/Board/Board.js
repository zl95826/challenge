import React,{Fragment} from 'react';
import style from './Board.module.css';
import Square from '../Square/Square';

const Board=(props)=><div>
                        <section className={style.Row}>
                            <Square value={0} />
                            <Square value={1} />
                            <Square value={2} />
                        </section>
                        <section className={style.Row}>
                            <Square value={3} />
                            <Square value={4} />
                            <Square value={5} />
                        </section>
                        <section className={style.Row}>
                            <Square value={6} />
                            <Square value={7} />
                            <Square value={8} />
                        </section>
                    </div>


export default Board;
