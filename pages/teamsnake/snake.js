import { Container, Spacer, Wrapper} from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import styles from './teamsnake.module.css';
import { useEffect,useState } from 'react';


const Snake = () => {
  const [totalSnakeCount,setTotalSnakeCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  //console.log(totalSnakeCount);

  useEffect(() => {
    setLoading(true)
    fetch(`/api/vote?vote=snake`)
      .then((res) => res.json())
      .then((data) => {
        setTotalSnakeCount(data.totalVoteCount)
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
        <p className={styles.tagline}>You and {totalSnakeCount} people made the right choice...</p>
      </Wrapper>
  )
};

export default Snake;

