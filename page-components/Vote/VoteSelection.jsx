import { Container, Spacer, Wrapper} from '@/components/Layout';
import { Card } from '@/components/Card'
import styles from './VoteSelection.module.css';
import { fetcher } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { setCookie,getCookie } from 'cookies-next';
import { useState,useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import useWindowDimensions from '../../hooks/windowSize';
import { hashComponents } from '@fingerprintjs/fingerprintjs';
import { Loading } from '../Loading';

function VoteSelection () {
  const [totalVoteCount,setTotalVoteCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [voteCookie, setVoteCookie] = useState(getCookie('vote'));
  const [calledPush, setCalledPush] = useState(false);
  const [fingerPrint,setFingerPrint] = useState()
  const [clientIPCookie,setClientIPCookie] = useState(getCookie('clientIP'))
  const [clientIdCookie,setClientIdCookie] = useState(getCookie('clientId'))
  const router = useRouter();

  const getClientIP = async () => {
    const { ip } = await fetch('https://api.ipify.org?format=json', { method: 'GET' })
        .then(res => res.json())
        .catch(error => console.error(error));
    
    return ip || "0.0.0.0";
  }

  const castVote = async (vote) => {
    if(voteCookie || hasVoted){
      toast.error(`You're already on Team ${voteCookie}!`)
      //router.push(`/team${previousVoteCookie}`);
    }else{
      try {
        const voteRes = await fetcher('/api/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vote,
            clientIP:clientIPCookie,
            fingerprint:fingerPrint.components,
            fpConfidence:fingerPrint.confidence,
            visitorId:fingerPrint.visitorId,
            creatorId:clientIdCookie
          }),
        });
        
        if(voteRes.vote){
          setCookie('vote',voteRes.vote,{maxAge:10 * 365 * 24 * 60 * 60})//set a cookie that expires forever from now
          setCookie('clientIP',voteRes.ip,{maxAge:10 * 365 * 24 * 60 * 60})//set a cookie that expires forever from now
          setCookie('clientId',voteRes.creatorId,{maxAge:10 * 365 * 24 * 60 * 60})//set a cookie that expires forever from now
          setVoteCookie(voteRes.vote);
          toast.error(voteRes.message);
          setHasVoted(true);
        }else{
          setCookie('vote',vote,{maxAge:10 * 365 * 24 * 60 * 60})//set a cookie that expires forever from now
          setVoteCookie(vote);
          toast.success(`Team ${vote}!`);
          setHasVoted(true)
        }

      } catch (e) {
        toast.error(e.message);
      }
  }
  }

  if(typeof window !== "undefined"){ //check if window object is available
    var { height, width } = useWindowDimensions();

    if(!clientIPCookie){
      getClientIP()
      .then(ip => {
        setCookie('clientIP',ip,{maxAge:10 * 365 * 24 * 60 * 60})
        setClientIPCookie(ip)
      })
      .catch(err => console.log(err,"ip fail"))
    }

    if(!fingerPrint){
      import('@fingerprintjs/fingerprintjs')
      .then(FingerprintJS => FingerprintJS.load())
      .then(fp => fp.get())
      .then(result => {
        //results.visitorId contains unique value.  Regen with hash after adding IP
        setFingerPrint(result)
      })
      .catch(err => console.log(err,"fp failed"))
    }
    
 }
  
  useEffect(() => {
    
    setLoading(true);
    if(calledPush){return;}
    //console.log('useEffect',voteCookie)
    if((fingerPrint && clientIPCookie) && !clientIdCookie){ //if both values exist, we have the needed data to hash
      const newFpComponents = {...fingerPrint.components};
      newFpComponents.ip = clientIPCookie;
      const componentHash = hashComponents(newFpComponents)
      setCookie('clientId',componentHash,{maxAge:10 * 365 * 24 * 60 * 60});
      setClientIdCookie(componentHash);      
    } 

    if(voteCookie){
      router.push(`/team${voteCookie}`)
      setCalledPush(true);
    }

    fetch('/api/vote')
    .then((res) => res.json())
    .then((data) => {
      setTotalVoteCount(data.totalVoteCount)
      setLoading(false)
    })

  }, [hasVoted,fingerPrint,clientIPCookie])
 
  if (isLoading || calledPush || voteCookie) {
    return <Loading />  
  }

  if(width > 700){
    return (
      <Wrapper className={styles.root}>
        <h2 className={styles.title}>Which are Scarier?</h2>
        <Spacer size={2} axis="vertical" />
         <Container row alignItems="center" justifyContent="center">
          <Card
            imageUrl="/images/snake.jpg"
            title="Snakes"
            alt="Slithery little snake"
            onClick={() => castVote('snake')}
          />
          <Spacer size={2} axis="horizontal" />
          <Container>
            <span>OR</span>
          </Container>
          <Spacer size={2} axis="horizontal" />
          <Card
            imageUrl="/images/shark.jpg"
            title="Sharks"
            alt="Spooky shark boi"
            onClick={() => castVote('shark')}
          />
        </Container>
        <Spacer size={2} axis="vertical" />
        <p className={styles.tagline}><b className={styles.votecount}>{totalVoteCount}</b> people have made their choice...</p>
        <p className={styles.tagline}>Which side will you choose?</p>
      </Wrapper>
    );
  }else{
    return (
      <Wrapper className={styles.root}>
        <h2 className={styles.title}>Which are Scarier?</h2>
        <Spacer size={1} axis="vertical" />
         <Container column alignItems="center" justifyContent="center">
          <Card
            imageUrl="/images/snake.jpg"
            title="Snakes"
            alt="Slithery little snake"
            onClick={() => castVote('snake')}
          />
          <Spacer size={1} axis="vertical" />
          <Container>
            <span>OR</span>
          </Container>
          <Spacer size={1} axis="vertical" />
          <Card
            imageUrl="/images/shark.jpg"
            title="Sharks"
            alt="Spooky shark boi"
            onClick={() => castVote('shark')}
          />
        </Container>
        <Spacer size={2} axis="vertical" />
        <p className={styles.tagline}><b className={styles.votecount}>{totalVoteCount}</b> people have made their choice...</p>
        <p className={styles.tagline}>Which side will you choose?</p>
      </Wrapper>
    );
  }
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