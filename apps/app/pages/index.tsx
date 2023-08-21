import type {GetServerSideProps, NextPage} from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/khala',
      permanent: false,
    },
  }
}

const Page: NextPage = () => null

export default Page
