import type { NextPage } from 'next'
import TimelineContainer from "../client/src/containers/TimelineContainer"

const Home: NextPage = (props: any) => {
  return (
    <TimelineContainer posts={props.posts} />
  )
}

export default Home

export async function getStaticProps({ params }: any) {
  return {
    props: {
      posts: await fetch('https://wsh-2021-tk1024.herokuapp.com/api/v1/posts?offset=0&limit=10').then(res => res.json()),
    },
    revalidate: 60,
  };
}