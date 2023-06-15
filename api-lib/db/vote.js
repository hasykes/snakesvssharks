import { ConnectionPoolReadyEvent, ObjectId } from 'mongodb';

export async function insertVote(db,{ content, creatorId, ip, fingerprint,fpConfidence,visitorId },voteId) {
  const vote = {
    content,
    voteId: new ObjectId(voteId),
    creatorId,
    createdAt: new Date(),
    ip,
    fingerprint,
    fpConfidence,
    visitorId
  };

  //const matchingVistorID = await db.collection('votes').countDocuments({visitorId})
 
  const { insertedId } = await db.collection('votes').insertOne(vote);
  vote._id = insertedId;
  return vote;
}

export async function validateVote(db,{ip,creatorId}) {
  const matchingVistorID = await db.collection('votes').find({creatorId}).toArray();//check if a creatorID exists

  return matchingVistorID;
}

export async function getVoteCount(db,vote) {
  if(vote){
    return await db.collection('votes').countDocuments({'content':vote})  
  }
  return await db.collection('votes').countDocuments()
  //console.log(totalVoteCount)
}

export async function updateEmail(db,email,creatorId){
  return await db.collection('votes').updateOne({creatorId:creatorId},{$set:{email:email}})
}

/*
export async function findComments(db, postId, before, limit = 10) {
  return db
    .collection('comments')
    .aggregate([
      {
        $match: {
          postId: new ObjectId(postId),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'creatorId',
          foreignField: '_id',
          as: 'creator',
        },
      },
      { $unwind: '$creator' },
      { $project: dbProjectionUsers('creator.') },
    ])
    .toArray();
}
*/