import React from 'react';
import styles from './index.scss';

export default function ({ name }) {
  return <span className={styles.name}>I am {name}!</span>;
}
