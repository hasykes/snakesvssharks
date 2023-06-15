
import {database} from '@/api-lib/middlewares';
import { updateEmail } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';


const handler = nc(ncOpts);
handler.use(database);

handler.post((req, res) => {
    updateEmail(req.db,req.body.email,req.body.creatorId)
    .then(() => {return res.status(200).json({ msg:"You are Signed Up!"})})
    .catch((e) => {return res.status(500).json({e,msg:"Failed to save Email"})}) 
    /*
    insertEmail(req.db,{
      content:req.body.vote,
      creatorId:req.body.creatorId,
      ip:req.body.clientIP,
      fingerprint:req.body.fingerprint,
      fpConfidence:req.body.fpConfidence,
      visitorId:req.body.visitorId
    })
    .then(() => {return res.status(200).json({ vote:req.body.vote})})
    .catch((e) => {return res.status(500).json({e,msg:"Failed to log vote"})}) 
    */

});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;