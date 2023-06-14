import styles from './EmailForm.module.css';
import { useState } from 'react';

export const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setIsValid(true);
      // Perform additional actions, such as submitting the form
    } else {
      setIsValid(false);
    }
  };

  return (
    <form className={styles.emailForm} onSubmit={handleSubmit}>
      <p><b>Stay updated on the fight...</b></p>
      <input
        className={`${styles.emailInput} ${isValid ? '' : styles.invalid}`}
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
      />
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
};

