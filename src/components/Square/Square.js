import React from 'react';
import styles from './Square.module.css';
const Square=(props)=><button className={styles.Square} id={props.index} onClick={props.click}>{props.value}</button>;

export default Square;
