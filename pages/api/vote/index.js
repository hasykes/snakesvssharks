
import {database} from '@/api-lib/middlewares';
import { insertVote,getVoteCount } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';


const handler = nc(ncOpts);
handler.use(database);

handler.post((req, res) => {
  //console.log(req.body)
  insertVote(req.db,{
    content:req.body.vote,
    creatorId:req.body.creatorId,
    ip:req.body.clientIP,
    fingerprint:req.body.fingerprint,
    fpConfidence:req.body.fpConfidence,
    visitorId:req.body.visitorId
  })
  .then(() => {return res.status(200).json({ vote:req.body.vote})})
  .catch((e) => {return res.status(500).json({e,msg:"Failed to log vote"})}) 
});

handler.get(async (req,res) => {
  //console.log(req.query)
  //if it contains a vote value, then return total and individual vote quantity
  if(req.query.vote){
    const totalVoteCount = await getVoteCount(req.db);
    const totalTeamCount = await getVoteCount(req.db,req.query.vote)
    const promises = [totalVoteCount,totalTeamCount]
    
    Promise.allSettled(promises)
    .then(() => {
      return res.status(200).json({ totalVoteCount:totalVoteCount,totalTeamCount:totalTeamCount})
    })
    .catch((e) => {return res.status(500).json({e,msg:"Failed to read individual vote"})} )
    
  }else{
    getVoteCount(req.db)
    .then((data) => {
      //console.log(data)
      return res.status(200).json({ totalVoteCount:data})
    })
    .catch((e) => {return res.status(500).json({e,msg:"Failed to log vote"})}) 
  }
  

});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;