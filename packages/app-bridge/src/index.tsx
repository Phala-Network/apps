import {
  Announcement,
  InputDataStep,
  InputDataStepResult,
  SubmitStepModal,
  WhiteCard,
} from '@phala/react-components'
import React, {useState} from 'react'
import {Helmet} from 'react-helmet'
import {QueryClient, QueryClientProvider} from 'react-query'
import {down} from 'styled-breakpoints'
import styled from 'styled-components'
import Transactions from './transactions/Transactions'

const queryClient = new QueryClient()
const RightContent = styled.div`
  display: grid;
  grid-gap: 30px;
  padding: 48px;
  width: 100%;
  box-sizing: border-box;

  ${down('md')} {
    padding: 20px;
  }

  ${down('sm')} {
    padding: 0 0 20px 0;
  }
`

const BridgePage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [submitData, setSubmitData] = useState<InputDataStepResult>()

  const showSubmitModal = (data: InputDataStepResult) => {
    setSubmitData(data)
    setModalVisible(true)
  }

  return (
    <>
      <Helmet>
        <title>Bridge</title>
      </Helmet>
      <QueryClientProvider contextSharing={true} client={queryClient}>
        <RightContent>
          {/* TODO: need a message api */}
          <Announcement>
            Bridge&apos;s transaction tracking feature is under upgrade and
            maintenance. After you submit your transaction. Please go to{' '}
            <a
              href="https://khala.subscan.io/"
              target="_blank"
              rel="noreferrer"
            >
              Subscan
            </a>{' '}
            and{' '}
            <a href="https://etherscan.io/" target="_blank" rel="noreferrer">
              Etherscan
            </a>{' '}
            to check the progress of your transaction. If you have any
            questions. Please come to our{' '}
            <a
              href="https://discord.com/invite/phala"
              target="_blank"
              rel="noreferrer"
            >
              discord
            </a>{' '}
            channel for support.
          </Announcement>

          <WhiteCard>
            <InputDataStep layout={'flex'} onNext={showSubmitModal} />

            <SubmitStepModal
              setModalVisible={setModalVisible}
              visible={modalVisible}
              submitData={submitData}
            />
          </WhiteCard>

          <Transactions />
        </RightContent>
      </QueryClientProvider>
    </>
  )
}

export default BridgePage
