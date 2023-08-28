'use client'
import { useState } from 'react';
import styles from './FormInput.module.css';

const FormInput = ({ name, type, placeholder, validate = () => true, errorMessage }) => {
  const [error, setError] = useState(false);

  const changeHolder = (event) => {
    const { value } = event.target;

    const isValid = validate(value);

    setError(!isValid);
  };

  return (
    <div className={styles.inputWrapper}>
      <input  className={styles.input} name={name} onChange={changeHolder} placeholder={placeholder} type={type} />
      {error && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormInput;
