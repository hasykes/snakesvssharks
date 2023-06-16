import { Spacer, Wrapper} from '@/components/Layout';
import styles from './Team.module.css';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { EmailForm } from '../EmailForm';
import { Loading } from '@/page-components/Loading';
import { Social } from '../Social';

export const Team = (props) => {
    const clientId = getCookie('clientId');
    const [emailExists, setEmailExists] = useState(false);
    const [totalTeamCount,setTotalTeamCount] = useState(0);
    const [totalVoteCount,setTotalVoteCount] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [voteCookie] = useState(getCookie('vote'));
    const [calledPush, setCalledPush] = useState(false);
    const router = useRouter(); 

    const currentTeam = props.teamName === 'shark' ? 'Shark':'Snake';
    const opposingTeam = currentTeam === 'Shark' ? 'Snake':'Shark';

    useEffect(() => {
      if(calledPush){return;}

      setLoading(true)
      if(!voteCookie){ //take them to main page if they haven't voted
          setCalledPush(true)
          router.push(`/`)
      }

      fetch(`/api/vote?vote=${props.teamName}`)
        .then((res) => res.json())
        .then((data) => {
          setTotalTeamCount(data.totalTeamCount)
          setTotalVoteCount(data.totalVoteCount)
          setLoading(false)
      })

      if(clientId){
        fetcher(`/api/email?creatorId=${clientId}`)
        .then(res => {
          if(res){
            setEmailExists(true)
          }
        })
        .catch(e => console.error(e))
      }
      return () => {
        
      }
    },[totalTeamCount])

    if (isLoading) {
      return <Loading/>
    }
  
    if(!emailExists){
      return (
        <Wrapper className={styles.root}>
          <h2 className={styles.title}>Welcome to Team {currentTeam}!</h2>
          <Spacer size={2} axis="vertical" />
          <p className={styles.tagline}><b className={styles.percent}>{((totalTeamCount/totalVoteCount)*100).toFixed(1)}%</b> of people agree that <b className={styles.percent}>{currentTeam}s are Scarier than {opposingTeam}s.</b></p>
          <p className={styles.tagline}>Support your team and <b className={styles.percent}>share with your friends</b></p>
          <Spacer size={.5} axis="vertical" />
          <Social currentTeam={currentTeam} opposingTeam={opposingTeam}/>
          <EmailForm />
        </Wrapper>
      )
    }

    return (
        <Wrapper className={styles.root}>
          <h2 className={styles.title}>Welcome to Team {currentTeam}!</h2>
          <Spacer size={2} axis="vertical" />
          <p className={styles.tagline}><b className={styles.percent}>{((totalTeamCount/totalVoteCount)*100).toFixed(1)}%</b> of people agree that <b className={styles.percent}>{currentTeam}s are Scarier than {opposingTeam}s.</b></p>
          <p className={styles.tagline}>Support your team and <b className={styles.percent}>share with your friends</b></p>
          <Spacer size={.5} axis="vertical" />
          <Social currentTeam={currentTeam} opposingTeam={opposingTeam}/>
        </Wrapper>
    )
};

