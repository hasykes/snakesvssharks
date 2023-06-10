import { Container, Spacer, Wrapper} from '@/components/Layout';
import { useEffect,useState } from 'react';

const Admin = () => {
    const [totalSharkCount,setTotalSharkCount] = useState(0);
    const [totalSnakeCount,setTotalSnakeCount] = useState(0);
    const [totalVoteCount,setTotalVoteCount] = useState(0);

    useEffect(() => {
        fetch(`/api/vote?vote=shark`)
            .then((res) => res.json())
            .then((data) => {
            setTotalSharkCount(data.totalTeamCount)
            setTotalVoteCount(data.totalVoteCount)
            setTotalSnakeCount(data.totalVoteCount - data.totalTeamCount) //snakes is just total minus sharks, don't waste the query
            })
    }, [])

  return (
    <>
        <h1>Admin</h1>
        <p><span>Shark Count: {totalSharkCount} - </span><span>{((totalSharkCount/totalVoteCount)*100).toFixed(1)}%</span></p>
        <p><span>Snake Count: {totalSnakeCount} - </span><span>{((totalSnakeCount/totalVoteCount)*100).toFixed(1)}%</span></p>
        <p>Total Count: {totalVoteCount}</p>
    </>
  )
};

export default Admin;


