import {type Metadata, type NextPage} from 'next'
import GPTPage from './gpt-page'

export const metadata: Metadata = {
  title: 'inDEX GPT',
}

const Page: NextPage = () => {
  return <GPTPage />
}

export default Page
