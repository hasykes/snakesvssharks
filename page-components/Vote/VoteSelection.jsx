import { Container, Spacer, Wrapper} from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import { Card } from '@/components/Card'
import { Text } from '@/components/Text';
import styles from './VoteSelection.module.css';
import Link from 'next/link';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { setCookie,getCookie } from 'cookies-next';
import { useState,useEffect } from 'react';



const castVote = async (vote) => {
  const previousVoteCookie = getCookie('vote');

  if(previousVoteCookie){
    toast.error(`You're already on Team ${previousVoteCookie}!`)
  }else{
    const clientIP = await getClientIP();
    try {
      await fetcher('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({vote,clientIP}),
      });
      setCookie('vote',vote,{maxAge:10 * 365 * 24 * 60 * 60})//set a cookie that expires forever from now
      toast.success(`Team ${vote}!`);
    } catch (e) {
      toast.error(e.message);
    }
}
}

const getClientIP = async () => {
  const { ip } = await fetch('https://api.ipify.org?format=json', { method: 'GET' })
      .then(res => res.json())
      .catch(error => console.error(error));
  
  return ip || "0.0.0.0";
}


const VoteSelection = () => {
  const [totalVoteCount,setTotalVoteCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('/api/vote')
      .then((res) => res.json())
      .then((data) => {
        setTotalVoteCount(data.totalVoteCount)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <LoadingDots />
 
  return (
    <Wrapper className={styles.root}>
      <h1 className={styles.title}>Which are Scarier?</h1>
      <Spacer size={2} axis="vertical" />
       <Container row alignItems="center" justifyContent="center">
        <Card
          imageUrl="/images/snake.jpg"
          title="Snakes"
          alt="Slithery little snake"
          onClick={() => castVote('snake')}
        />
        <Spacer size={3} axis="horizontal" />
        <Container>
          <span>OR</span>
        </Container>
        <Spacer size={3} axis="horizontal" />
        <Card
          imageUrl="/images/shark.jpg"
          title="Sharks"
          alt="Spooky shark boi"
          onClick={() => castVote('shark')}
        />
      </Container>
      <Spacer size={2} axis="vertical" />
      <p className={styles.tagline}>{totalVoteCount} people have made their choice...</p>
      <p className={styles.tagline}>Which side will you choose?</p>
    </Wrapper>
  );
};
/*
const VoteSelection = ({ valid }) => {
  return (
    <Wrapper className={styles.root}>
      <Container row alignItems="center" justifyContent="center">
        <Spacer size={4} axis="vertical" />
        <Container column alignItems="center" className={styles.card} onClick={() => castVote('snake')}>
            <Spacer size={1} axis="vertical" />
            <img src="/images/snake.jpg" className={styles.image} alt="Slithery lil Snake" />
            <Spacer size={1} axis="vertical" />
            <span className={styles.cardName}>Snakes</span>
        </Container>
        <Spacer size={3} axis="horizontal" />
        <Container>
          <Text>VS</Text>
        </Container>
        <Spacer size={3} axis="horizontal" />
        <Container column alignItems="center" className={styles.card} onClick={() => castVote('shark')}>
          <Spacer size={1} axis="vertical" />
          <img src="/images/shark.jpg" alt="Spooky shark" className={styles.image} />
          <Spacer size={1} axis="vertical" />
          <span className={styles.cardName}>Sharks</span>
        </Container>
      </Container>
      <p className={styles.tagline}>1,000,000 People have picked their side.</p>
      <p className={styles.tagline}>Which will you choose?</p>
    </Wrapper>
  );
};
*/
export default VoteSelection;