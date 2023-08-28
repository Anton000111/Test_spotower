'use client'
import { Button } from '@/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import validator from 'validator';
import { useUser } from '@/contexts';
import { fetchApi, getDataFromForm } from '@/helpers';

const includesDigitRegExp = new RegExp(/\d/);

export default function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [globalError, setGlobalError] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const { saveUser, user } = useUser();

  const router = useRouter();

  useEffect(() => {
    document.title = 'Sign in';
  }, []);

  useEffect(() => {
    if (user) router.replace(`/`);
  }, [user, router]);

  const emailHandler = (event) => {
    const { value } = event.target;

    setGlobalError(undefined);

    setEmailError(!validator.isEmail(value));
  }

  const passwordHandler = (event) => {
    const { value } = event.target;

    setGlobalError(undefined);

    const isValidLength = validator.isLength(value, { min: 8, max: 8 });

    const isCapital = value !== value.toLowerCase();

    const isWithNumber = includesDigitRegExp.test(value);

    setPasswordError(!isValidLength || !isCapital || !isWithNumber);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const body = getDataFromForm(event.target);

    setIsLoading(true);

    const response = await fetchApi('/signin', {
      method: 'POST',
      body: JSON.stringify(body)
    });

    if (response.ok) {
      const user = await response.json();
  
      saveUser(user);
  
      setIsLoading(false);
  
      return router.replace(`/`);
    }

    const { error } = await response.json();

    setGlobalError(error);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in or create an account</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        <p className={styles.explanation}>
          <span>*&nbsp;</span>
          indicates required field
        </p>
        <div className={styles.inputWrapper}>
          <input className={styles.input} name="email" onChange={emailHandler} placeholder="* Email address" type="text" />
          {emailError && <span className={styles.error}>Email must be valid email address</span>}
        </div>
        <div className={styles.inputWrapper}>
          <input  className={styles.input} name="password" onChange={passwordHandler} placeholder="* Password" type="password" />
          {passwordError && <span className={styles.error}>Password must be 8 characters, includes Capital letter and number</span>}
        </div>
        <div className={styles.buttonWrapper}>
          {globalError && <span className={styles.globalError}>{globalError}</span>}
          <Button
            type="submit"
            label={isLoading ? 'Loading...' : "Sign in"}
            backgroundColor='#00754a'
            disabled={!!(emailError || passwordError) && !isLoading}
          />
        </div>
      </form>
    </div>
  )
}
