import styles from './Social.module.css';
import { Spacer, Container} from '@/components/Layout';
import twitter from "../../public/images/twitter.svg"
//import insta from "../../public/images/insta.svg"
import reddit from "../../public/images/reddit.svg"
import email from "../../public/images/email.svg"
import facebook from "../../public/images/facebook.svg"

export const Social = (props) => {
  const twitterString = `
  ${props.currentTeam}s are scarier than ${props.opposingTeam}s! Which side are you on? 
  https://${props.currentTeam === "Shark" ? "sharksvssnakes.com":"snakesvssharks.com"}
  #Team${props.currentTeam} #SharksvsSnakes #SnakesvsSharks #SharksAreScarierThanSnakes
  `
  const redditString = `https://${props.currentTeam === "Shark" ? "sharksvssnakes.com":"snakesvssharks.com"}&title=${props.currentTeam}s are scarier than ${props.opposingTeam}s! Which side are you on? `
  
  const emailString = `subject=${props.currentTeam}s are scarier than ${props.opposingTeam}s! Which side are you on?&body=Choose your team on https://${props.currentTeam === "Shark" ? "sharksvssnakes.com":"snakesvssharks.com"}`
  
  return <>
  <Container row alignItems="center" justifyContent="center">
    <a  
    href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(twitterString)} 
    target="_blank"
    className={styles.icon}>
        <img src={twitter} />
    </a>
    <a 
    href="https://www.facebook.com/sharer/sharer.php?u=https%3A//snakesvssharks.com"
    target="_blank"
    className={styles.icon}>
        <img src={facebook} />
    </a>
    <a
    href={"https://www.reddit.com/submit?url=" + encodeURIComponent(redditString)}
    target="_blank"
    className={styles.icon}
    >
        <img src={reddit} />
    </a>
    <a 
    href={"mailto:?" + emailString}
    target="_blank"
    className={styles.icon}
    >
        <img src={email} />
    </a>

  </Container>
  </>
};

/*<a class="twitter-share-button"
  href="https://twitter.com/intent/tweet?text=Hello%20world">
Tweet</a> */
