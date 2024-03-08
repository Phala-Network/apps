import * as Sentry from '@sentry/nextjs'
import type {NextPage} from 'next'
import NextError, {type ErrorProps} from 'next/error'

const CustomErrorComponent: NextPage<ErrorProps> = (props) => {
  return <NextError statusCode={props.statusCode} />
}

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData)

  // This will contain the status code of the response
  return await NextError.getInitialProps(contextData)
}

export default CustomErrorComponent
