'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, Button } from '@/components';
import { getDataFromForm, fetchApi } from '@/helpers';
import { useUser } from '@/contexts';
import styles from './page.module.css';

export default function Admin() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFull, setIsNotFull] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) return;

    router.replace(`/404`);
  }, [user, router]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const body = getDataFromForm(event.target);

    body.userId = (user || {}).id;

    const isFilled = Object.values(body).every(Boolean);

    if (!isFilled) {
      setIsNotFull(true);
      return;
    }

    setIsLoading(true);

    const response = await fetchApi('/dashboard', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  
    setIsLoading(false);

    if (response.ok) {
      setIsCreated(true);
      return;
    }

    setError(true);
  }

  const resetErrors = () => {
    setError(false);
    setIsNotFull(false);
    setIsCreated(false);
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1>Create banner</h1>
      <form className={styles.form} onSubmit={submitHandler} onChange={resetErrors}>
        <FormInput name="title" type="text" placeholder="Title" />
        <FormInput name="description" type="text" placeholder="Description" />
        <FormInput name="buttonText" type="text" placeholder="Text of the button" />
        <FormInput name="imageUrl" type="text" placeholder="URL to the image" />
        <FormInput name="backgroundColor" type="text" placeholder="Banner's color" />
        <FormInput name="textColor" type="text" placeholder="Color of the text" />
        <div className={styles.buttonWrapper}>
          <Button label={isLoading ? 'Loading...' : "Create"} backgroundColor='#00754a' />
        </div>
        {error && <span className={styles.error}>Something went wrong</span>}
        {isNotFull && <span className={styles.error}>Not all fields are filled</span>}
        {isCreated && <span className={styles.accepted}>Banner has been created</span>}
      </form>
    </div>
  )
}
