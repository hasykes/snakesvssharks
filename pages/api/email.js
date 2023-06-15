
import {database} from '@/api-lib/middlewares';
import { updateEmail,getEmailExists } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';


const handler = nc(ncOpts);
handler.use(database);

handler.post((req, res) => {
    updateEmail(req.db,req.body.email,req.body.creatorId)
    .then(() => {return res.status(200).json({ msg:"You are Signed Up!"})})
    .catch((e) => {return res.status(500).json({e,msg:"Failed to save Email"})}) 
});

handler.get((req,res) => {
  getEmailExists(req.db,req.query.creatorId)
  .then((data) => {return res.status(200).json({ data })})
  .catch((e) => {return res.status(500).json({e,msg:"Failed to check DB"})}) 
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;