import { fetcher } from '@/lib/fetch';
import { Vote } from '@/page-components/Vote';
import Head from 'next/head';

/*
export const getStaticProps = async (context) => {
  console.log(context)
  //const totalVoteCount = await fetcher('/api/vote') || 5;

  return {props:{
    totalVoteCount:5
  }}
}
*/

export default function Index(props) {
  return (
    <>
  <Head>
    <title>Vote</title>
  </Head>
  <Vote />
  </>
  );
};

