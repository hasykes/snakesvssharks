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
        const dateString = `${localeDate.getFullYear()}-${localeDate.getMonth()+1}-${localeDate.getDate()}` //month is 0 - 11
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

      voteCountByDay.reverse() //newest date first
      
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

      /*
      const yearTickFormatter = (tick) => {
        const dateParts = tick.split("-")
      
        return dateParts[0]; //return 1st date part i.e. year yyyy-mm-dd
      };

      const monthTickFormatter = (tickProps) => {
        const { x, y, payload } = tickProps;
        const { value, offset } = payload;

        const dateParts = value.split("-")
        return <text x={x} y={y - 12} textAnchor="middle">{`${dateParts[1]}`}</text>;
      
       //return 2nd date part i.e. month yyyy-mm-dd
      };

      const dayTickFormatter = (tick) => {
        const dateParts = tick.split("-")
      
        return dateParts[2]; //return last date part i.e. day yyyy-mm-dd
      };
      */
      const barChartWidth = voteCountByDay.length * 75

    return (
    <Container column justifyContent="center" alignItems="center" >
        <Container className={styles.fullWidth}>
            <PieChart width={300} height={300}>
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
            <BarChart width={barChartWidth} height={500} data={voteCountByDay} barCategoryGap="1%" barGap="1%" >
                <CartesianGrid />
                <XAxis dataKey="date" padding={{ left: 0, right: 0}} height={100} angle={-45} textAnchor="end"/>
                <YAxis />
                <Tooltip />
                <Bar dataKey="shark" name="Sharks" stackId="a" fill="crimson" />
                <Bar dataKey="snake" name="Snakes" stackId="a" fill="gray" />
            </BarChart>
        </Container>
  </Container>
    )

};


export default Chart;