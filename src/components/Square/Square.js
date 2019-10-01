import React from 'react';
import styles from './Square.module.css';
const Square=(props)=><button className={styles.Square}>{props.value}</button>;

export default Square;
