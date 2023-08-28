'use client'
import { Button, FormInput } from '@/components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import validator from 'validator';
import { useUser } from '@/contexts';
import { fetchApi, getDataFromForm } from '@/helpers';
import { INCLUDES_DIGIT_REG_EXP } from '@/constants';

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

  const emailHandler = (value) => {
    setGlobalError(undefined);

    const isValid = validator.isEmail(value);

    setEmailError(!isValid);

    return isValid;
  }

  const passwordHandler = (value) => {
    setGlobalError(undefined);

    const isValidLength = validator.isLength(value, { min: 8, max: 8 });

    const isCapital = value !== value.toLowerCase();

    const isWithNumber = INCLUDES_DIGIT_REG_EXP.test(value);

    setPasswordError(!isValidLength || !isCapital || !isWithNumber);

    return isValidLength && isCapital && isWithNumber;
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
        <FormInput
          type="text"
          name="email"
          placeholder="* Email address"
          errorMessage="Email must be valid email address"
          validate={emailHandler}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="* Password"
          errorMessage="Password must be 8 characters, includes Capital letter and number"
          validate={passwordHandler}
        />
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
