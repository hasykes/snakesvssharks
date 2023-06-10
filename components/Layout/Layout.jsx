import Head from 'next/head';
import { Spacer } from '.';
//import Footer from './Footer';
import styles from './Layout.module.css';
//import Nav from './Nav';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Snakes vs Sharks</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Which are scarier, Snakes or Sharks? You Decide!"
        />
        <meta property="og:title" content="SVS" />
        <meta
          property="og:description"
          content="Which are scarier, Snakes or Sharks? You Decide!"
        />
        <meta
          property="og:image"
          content=""//TODO
        />
      </Head>
      <Spacer size={1} axis="vertical"/> 
      <h1 className={styles.title}>Snakes vs Sharks</h1>
      <main className={styles.main}>{children}</main>
      
    </>
  );
};

export default Layout;
