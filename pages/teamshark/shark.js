import { Spacer, Wrapper} from '@/components/Layout';
import styles from './teamshark.module.css';
import { getCookie } from 'cookies-next';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '@/page-components/Loading'
import { EmailForm } from '@/components/EmailForm';


const Shark = () => {
  const [totalSharkCount,setTotalSharkCount] = useState(0);
  const [totalVoteCount,setTotalVoteCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [voteCookie] = useState(getCookie('vote'));
  const router = useRouter();

  //console.log(totalSharkCount);

  useEffect(() => {
    setLoading(true)
    if(!voteCookie){ //take them to main page if they haven't voted
      router.push(`/`)
    }

    fetch(`/api/vote?vote=shark`)
      .then((res) => res.json())
      .then((data) => {
        setTotalSharkCount(data.totalTeamCount)
        setTotalVoteCount(data.totalVoteCount)
        setLoading(false)
      })
    
    
  }, [])
  
  if (isLoading) {
    return <Loading/>
  }

  return (
      <Wrapper className={styles.root}>
        <h2 className={styles.title}>Welcome to Team Shark!</h2>
        <Spacer size={2} axis="vertical" />
        <p className={styles.tagline}><b className={styles.percent}>{((totalSharkCount/totalVoteCount)*100).toFixed(1)}%</b> of people agree that Sharks are Scarier than Snakes.</p>
        <p className={styles.tagline}>Support your team and <b className={styles.percent}>share with your friends</b></p>
        <Spacer size={2} axis="vertical" />
        <EmailForm/>
      </Wrapper>
  )
};

export default Shark;

