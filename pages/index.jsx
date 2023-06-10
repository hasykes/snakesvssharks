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

export default function Index() {
  return (
    <>
  <Head>
    <title>Snakes vs Sharks</title>
  </Head>
  <Vote />
  </>
  );
};

