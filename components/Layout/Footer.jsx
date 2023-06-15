import { Text } from '@/components/Text';
import styles from './Footer.module.css';
import Spacer from './Spacer';
import Wrapper from './Wrapper';

const Footer = () => {

  var d = new Date(); 
  const currentYear = d.getFullYear();

  return (
    <footer className={styles.footer}>
      <Wrapper>
        <Text color="accents-7">
        <small>&copy; Copyright {currentYear}, Hayden Sykes</small>
        </Text>
      </Wrapper>
    </footer>
  );
};

export default Footer;
