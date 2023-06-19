import { useEffect,useState} from 'react';
import { Chart } from '@/components/Chart';
import { Loading } from '@/page-components/Loading';

export async function getServerSideProps(context) {
  
  if(context.query.key === process.env.ADMIN_KEY){
    return {
      props:{isAuth:true,}
    }    
  }else{
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}

const Admin = ({isAuth}) => {

    const [totalSharkCount,setTotalSharkCount] = useState(0);
    const [totalSnakeCount,setTotalSnakeCount] = useState(0);
    const [totalVoteCount,setTotalVoteCount] = useState(0);
    const [totalEmailCount,setTotalEmailCount] = useState(0);
    const [votesByDay,setVotesByDay] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/vote?vote=shark`)
            .then((res) => res.json())
            .then((data) => {
            setTotalSharkCount(data.totalTeamCount)
            setTotalVoteCount(data.totalVoteCount)
            setTotalSnakeCount(data.totalVoteCount - data.totalTeamCount) //snakes is just total minus sharks, don't waste the query
            })

        fetch(`/api/admin`)
        .then((res) => res.json())
        .then((data) => {
          setTotalEmailCount(data.numRecordsWithEmail)
          setVotesByDay(data.votesByDay)
          setIsLoading(false);
        })

    }, [])
    
  if(!isAuth){return <>Unauthorized</>}
  if(isLoading){return <Loading />}
  return (
    <>
        <h1>Admin</h1>
        <p><span>Shark Count: {totalSharkCount} - </span><span>{((totalSharkCount/totalVoteCount)*100).toFixed(1)}%</span></p>
        <p><span>Snake Count: {totalSnakeCount} - </span><span>{((totalSnakeCount/totalVoteCount)*100).toFixed(1)}%</span></p>
        <p>Total Count: {totalVoteCount}</p>
        <p>Total Email Count: {totalEmailCount}</p>
        <Chart sharks={totalSharkCount} snakes={totalSnakeCount} votesByDay={votesByDay}/>
    </>
  )
};

export default Admin;


