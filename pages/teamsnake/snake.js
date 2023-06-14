import { Wrapper} from '@/components/Layout';
import styles from './teamsnake.module.css';
import { getCookie } from 'cookies-next';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import {Loading} from '@/page-components/Loading'
//import { EmailForm } from '@/components/EmailForm';
import { Team } from '@/components/Team';



const Snake = () => {
  const [totalTeamCount,setTotalTeamCount] = useState(0);
  const [totalVoteCount,setTotalVoteCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [voteCookie] = useState(getCookie('vote'));
  const [calledPush, setCalledPush] = useState(false);
  const router = useRouter();

  //console.log(totalSnakeCount);

  useEffect(() => {
    if(calledPush){return;}
    setLoading(true)
    if(!voteCookie){ //take them to main page if they haven't voted
      setCalledPush(true);
      router.push(`/`)
    }
    fetch(`/api/vote?vote=${voteCookie}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalTeamCount(data.totalTeamCount)
        setTotalVoteCount(data.totalVoteCount)
        setLoading(false)
      })
  }, [])
  
  if (isLoading) {
    return <Loading />
  }

  return (
      <Wrapper className={styles.root}>
       <Team teamName={voteCookie} teamVotePercentage={((totalTeamCount/totalVoteCount)*100).toFixed(1)} />
     
      </Wrapper>
  )
};

export default Snake;

