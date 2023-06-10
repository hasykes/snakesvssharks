
import {database} from '@/api-lib/middlewares';
import { insertVote,getVoteCount } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';


const handler = nc(ncOpts);
handler.use(database);

handler.post((req, res) => {
  //console.log(req.body)
  insertVote(req.db,{content:req.body.vote,creatorId:'me',ip:req.body.clientIP})
  .then(() => {return res.status(200).json({ vote:req.body.vote})})
  .catch((e) => {return res.status(500).json({e,msg:"Failed to log vote"})}) 
});

handler.get((req,res) => {
  //console.log(req.query)
  getVoteCount(req.db,req.query.vote)
  .then((data) => {
    //console.log(data)
    return res.status(200).json({ totalVoteCount:data})
  })
  .catch((e) => {return res.status(500).json({e,msg:"Failed to log vote"})}) 
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;