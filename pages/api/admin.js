
import {database} from '@/api-lib/middlewares';
import { getCountOfRecordsWithEmail, getVotesByDay } from '@/api-lib/db';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';


const handler = nc(ncOpts);
handler.use(database);

handler.get(async (req,res) => {
    const numRecordsWithEmail = await getCountOfRecordsWithEmail(req.db)
    const votesByDay = await getVotesByDay(req.db)
    const promises = [numRecordsWithEmail, votesByDay]

    Promise.allSettled(promises)
    .then(() => {
      return res.status(200).json({ numRecordsWithEmail:numRecordsWithEmail,votesByDay:votesByDay})
    })
    .catch((e) => {return res.status(500).json({e,msg:"Failed to get Admin Data"})} )
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export default handler;