//import  styles from './Chart.module.css';
import { Container } from '../Layout';
import { PieChart, Pie, Cell, Legend, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import styles from './Chart.module.css';

const Chart = (props) => {
    
    
    const groupBy = (items, key) => items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [
            ...(result[item[key]] || []),
            item,
          ],
        }), 
        {},
      );
    

    const allVotes = [
        { name: 'Sharks', value: props.sharks },
        { name: 'Snakes', value: props.snakes },
      ];

      //console.log(groupBy(props.votesByDay,'groupDate'))
      
      const reduceToDate = props.votesByDay.map((data) => {
        const localeDate = new Date(data.date)
        const dateString = `${localeDate.getFullYear()}-${localeDate.getDate()}-${localeDate.getMonth()}`
        return {
            vote:data.vote,
            date:dateString,
        }
      })

      const groupedByDate = groupBy(reduceToDate,"date");

      const voteCountByDay = [];
      Object.keys(groupedByDate).forEach((key,i) => {
        voteCountByDay.push({date:key,shark:0,snake:0})
        groupedByDate[key].forEach(voteRecord => {
            if(voteRecord.vote === "shark"){
                return voteCountByDay[i].shark += 1
            }

            return voteCountByDay[i].snake += 1
            
        })
      })
      
      //const groupedVotesByDay = groupBy(correctedLocaleVotesByDay,'date')
      //console.log(correctedLocaleVotesByDay);
      
      const COLORS = ['crimson', 'gray'];

      const RADIAN = Math.PI / 180;

      const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);


        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
            );
      }

    return (
    <Container column justifyContent="center" alignItems="center" >
        <Container className={styles.fullWidth}>
            <PieChart width={300} height={275}>
                <Pie
                    data={allVotes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="black"
                    dataKey="value"
                    nameKey="name"
                >
                    {allVotes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36}/>
            </PieChart> 
        </Container>
        <Container className={styles.fullWidth}>
            <BarChart width={1000} height={275} data={voteCountByDay} >
                <CartesianGrid />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="shark" name="Sharks" stackId="a" fill="crimson" />
                <Bar dataKey="snake" name="Snakes" stackId="a" fill="gray" />
            </BarChart>
        </Container>
  </Container>
    )

};


export default Chart;