import { Text } from '@/components/Text';
import styles from './Footer.module.css';
import Wrapper from './Wrapper';

const Footer = () => {

  var d = new Date(); 
  const currentYear = d.getFullYear();

  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Text color="accents-7">
        <span><small>&copy; Copyright {currentYear}, Hayden Sykes</small> - <small><a className={styles.buyBeer} href="https://bmc.link/haydensykes">Buy me a Beer</a>🍺</small></span>
        </Text>
      </Wrapper>
    </footer>
  );
};

export default Footer;
