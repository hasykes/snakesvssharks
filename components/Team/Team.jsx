import { Spacer, Wrapper} from '@/components/Layout';
import styles from './Team.module.css';
import { useEffect, useState } from 'react';
import { fetcher } from '@/lib/fetch';
import { getCookie } from 'cookies-next';

export const Team = ({teamName,teamVotePercentage}) => {
    const currentTeam = teamName === 'shark' ? 'Shark':'Snake';
    const opposingTeam = teamName === 'shark' ? 'Snake':'Shark';
    const clientId = getCookie('clientId');
    const [emailExists, setEmailExists] = useState(false);

    useEffect(() => {
      if(clientId){
        fetcher(`/api/email?creatorId=${clientId}`)
        .then(res => {
          setEmailExists
        })
        .catch(e => console.error(e))
      }
      return () => {
        
      }
    })
    
    return (
        <Wrapper className={styles.root}>
          <h2 className={styles.title}>Welcome to Team {currentTeam}!</h2>
          <Spacer size={2} axis="vertical" />
          <p className={styles.tagline}><b className={styles.percent}>{teamVotePercentage}%</b> of people agree that <b className={styles.percent}>{currentTeam}s are Scarier than {opposingTeam}s.</b></p>
          <p className={styles.tagline}>Support your team and <b className={styles.percent}>share with your friends</b></p>
          <Spacer size={2} axis="vertical" />
        </Wrapper>
    )
};

