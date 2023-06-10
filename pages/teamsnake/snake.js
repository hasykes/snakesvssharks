import { Container, Spacer, Wrapper} from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import styles from './teamsnake.module.css';
import { getCookie } from 'cookies-next';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';


const Snake = () => {
  const [totalSnakeCount,setTotalSnakeCount] = useState(0);
  const [totalVoteCount,setTotalVoteCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [voteCookie, setVoteCookie] = useState(getCookie('vote'));
  const router = useRouter();

  //console.log(totalSnakeCount);

  useEffect(() => {
    setLoading(true)
    if(!voteCookie){ //take them to main page if they haven't voted
      router.push(`/`)
    }
    fetch(`/api/vote?vote=snake`)
      .then((res) => res.json())
      .then((data) => {
        setTotalSnakeCount(data.totalTeamCount)
        setTotalVoteCount(data.totalVoteCount)
        setLoading(false)
      })
  }, [])
  
  if (isLoading) {
    return (
    <>
     <Container column alignItems="center" justifyContent="center">
        <Spacer size={4} axis="vertical"/>
        <h1>Snakes vs Sharks</h1>
        <LoadingDots />
      </Container>
    </>
    )
  }

  return (
      <Wrapper className={styles.root}>
        <h2 className={styles.title}>Welcome to Team Snake!</h2>
        <Spacer size={2} axis="vertical" />
        <p className={styles.tagline}><b className={styles.percent}>{((totalSnakeCount/totalVoteCount)*100).toFixed(1)}%</b> of people agree that Snakes are Scarier than Sharks.</p>
      </Wrapper>
  )
};

export default Snake;

