import styles from './EmailForm.module.css';
import { useState } from 'react';
import { fetcher } from '@/lib/fetch';
import { getCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';

export const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [emailSaved, setEmailSaved] = useState(false);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = () => {

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setEmailSaved(true);
      fetcher('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:email,
          creatorId:getCookie('clientId')
        }),
      })
      .then(res => {
        toast.success('Email Saved!')
      })
      .catch(e => {
        toast.error('Error Saving Email - Try Again!')
        setIsValid(false);

      });

      // Perform additional actions, such as submitting the form
    } else {
      setIsValid(false);
    }
  };

  if(!emailSaved){
    return (
      <div className={styles.emailForm} >
        <p><b>Stay updated on the fight...</b></p>
        <input
          className={`${styles.emailInput} ${isValid ? '' : styles.invalid}`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
        />
        <div type="button" onClick={handleEmailSubmit} className={styles.button}>Join the Cause</div>
      </div>
   )
  }

  return <></>
};

